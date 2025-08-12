# Resumind - AI Resume Analyzer

Resumind is a smart resume analysis tool that provides AI-powered feedback to help you improve your resume and increase your chances of landing your dream job.

![Resumind](public/images/resume-scan-2.gif)

## Features

- 📄 **Resume Upload**: Easily upload your resume in PDF format
- 🎯 **Job Targeting**: Specify company name, job title, and job description for tailored analysis
- 🤖 **AI Analysis**: Get comprehensive AI-powered feedback on your resume
- 📊 **ATS Compatibility**: Check how well your resume performs against Applicant Tracking Systems
- 📱 **Responsive Design**: Access from any device with a fully responsive interface
- 🔒 **User Authentication**: Secure login to track and manage your resume submissions
- 📈 **Resume Tracking**: Keep track of all your uploaded resumes and their ratings
- 🔍 **Detailed Feedback**: Receive specific suggestions to improve your resume

## Technologies Used

- **Frontend**: React 19, React Router 7, TailwindCSS 4
- **PDF Processing**: PDF.js
- **File Handling**: React Dropzone
- **State Management**: Zustand
- **Authentication**: Puter authentication system
- **Storage**: Puter KV store and filesystem

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t resumind .

# Run the container
docker run -p 3000:3000 resumind
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Usage

1. **Sign In**: Create an account or sign in to access the application
2. **Upload Resume**: Click on "Upload Resume" and select your PDF resume file
3. **Enter Job Details**: Provide the company name, job title, and job description for targeted analysis
4. **View Analysis**: Once processed, view the detailed analysis of your resume
5. **Review Feedback**: Check the ATS compatibility score and detailed feedback
6. **Make Improvements**: Use the suggestions to improve your resume
7. **Track Progress**: Upload revised versions to track improvements

## Project Structure

```
ai-resume-analyzer/
├── app/                  # Main application code
│   ├── components/       # React components
│   ├── lib/              # Utility functions and hooks
│   ├── routes/           # Application routes
├── constants/            # Application constants
├── public/               # Static assets
├── types/                # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using React Router and modern web technologies.