export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
    usedFallback?: boolean;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    try {
        // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
        loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
            // Set the worker source to use local file
            // Use a relative path to ensure it works in all deployment environments
            const workerSrc = new URL('/pdf.worker.min.mjs', window.location.origin).href;
            console.log('PDF.js worker source:', workerSrc);
            lib.GlobalWorkerOptions.workerSrc = workerSrc;
            pdfjsLib = lib;
            isLoading = false;
            return lib;
        });

        return loadPromise;
    } catch (error) {
        console.error('Error loading PDF.js library:', error);
        isLoading = false;
        throw error;
    }
}

/**
 * Creates a placeholder image for a PDF file when the primary conversion method fails
 */
async function createPlaceholderImage(file: File): Promise<PdfConversionResult> {
    console.log('Creating placeholder image for PDF file:', file.name);
    
    try {
        // Create a canvas with a simple placeholder
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
            console.error('Failed to get canvas context for placeholder');
            return {
                imageUrl: "",
                file: null,
                error: "Failed to get canvas context for placeholder",
                usedFallback: true
            };
        }
        
        // Set canvas dimensions
        canvas.width = 800;
        canvas.height = 1000;
        
        // Fill background
        context.fillStyle = "#f5f5f5";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add PDF icon or placeholder text
        context.fillStyle = "#333333";
        context.font = "bold 24px Arial";
        context.textAlign = "center";
        context.fillText("PDF Document", canvas.width / 2, 100);
        
        context.font = "18px Arial";
        context.fillText(file.name, canvas.width / 2, 150);
        context.fillText("(Preview not available)", canvas.width / 2, 200);
        
        // Draw a PDF icon outline
        context.strokeStyle = "#666666";
        context.lineWidth = 2;
        const iconSize = 200;
        const iconX = (canvas.width - iconSize) / 2;
        const iconY = 250;
        
        // Document outline
        context.strokeRect(iconX, iconY, iconSize, iconSize * 1.3);
        
        // PDF text
        context.fillStyle = "#cc0000";
        context.font = "bold 40px Arial";
        context.fillText("PDF", canvas.width / 2, iconY + iconSize * 0.7);
        
        // Convert canvas to blob
        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        console.log('Placeholder image created successfully');
                        
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });
                        
                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                            usedFallback: true
                        });
                    } else {
                        console.error('Failed to create placeholder image blob');
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create placeholder image blob",
                            usedFallback: true
                        });
                    }
                },
                "image/png",
                1.0
            );
        });
    } catch (err) {
        console.error('Error creating placeholder image:', err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to create placeholder image: ${err}`,
            usedFallback: true
        };
    }
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        console.log('Starting PDF conversion for file:', file.name, 'size:', file.size);
        
        // Check if file is actually a PDF
        if (!file.type.includes('pdf')) {
            console.error('File is not a PDF:', file.type);
            return {
                imageUrl: "",
                file: null,
                error: `File is not a PDF: ${file.type}`
            };
        }
        
        // Load PDF.js library
        console.log('Loading PDF.js library...');
        const lib = await loadPdfJs();
        console.log('PDF.js library loaded successfully');
        
        // Convert file to array buffer
        console.log('Converting file to array buffer...');
        const arrayBuffer = await file.arrayBuffer();
        console.log('File converted to array buffer, size:', arrayBuffer.byteLength);
        
        // Load PDF document
        console.log('Loading PDF document...');
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        console.log('PDF document loaded successfully, pages:', pdf.numPages);
        
        // Get first page
        console.log('Getting first page...');
        const page = await pdf.getPage(1);
        console.log('First page retrieved successfully');
        
        // Set up canvas
        console.log('Setting up canvas...');
        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
            console.error('Failed to get canvas context');
            // Use fallback method
            return createPlaceholderImage(file);
        }
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
        
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        
        // Render page to canvas
        console.log('Rendering page to canvas...');
        await page.render({ canvasContext: context, viewport }).promise;
        console.log('Page rendered to canvas successfully');

        // Convert canvas to blob
        console.log('Converting canvas to blob...');
        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        console.log('Canvas converted to blob successfully, size:', blob.size);
                        
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });
                        
                        console.log('Image file created successfully');
                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        console.error('Failed to create image blob');
                        // Use fallback method
                        createPlaceholderImage(file).then(resolve);
                    }
                },
                "image/png",
                1.0
            ); // Set quality to maximum (1.0)
        });
    } catch (err) {
        console.error('Error in PDF to image conversion:', err);
        // Use fallback method
        return createPlaceholderImage(file);
    }
}