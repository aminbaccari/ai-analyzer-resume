import React from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '~/components/Accordion';
import { cn } from '~/lib/formatters';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Feedback } from '../../types';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine badge color based on score
  const getBadgeColor = () => {
    if (score > 69) return 'bg-green-100 text-green-600';
    if (score > 39) return 'bg-yellow-100 text-yellow-600';
    return 'bg-red-100 text-red-600';
  };

  // Determine icon based on score
  const getIcon = () => {
    if (score > 69) {
      return <CheckCircle className="w-4 h-4 mr-1" />;
    }
    return null;
  };

  return (
    <div className={cn('flex items-center rounded-full px-2 py-1', getBadgeColor())}>
      {getIcon()}
      <span className="text-xs font-medium">{score}/100</span>
    </div>
  );
};

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, categoryScore }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h3 className="text-sm font-medium">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

interface Tip {
  type: 'good' | 'improve';
  tip: string;
  explanation: string;
}

interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start">
            {tip.type === 'good' ? (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
            )}
            <span className="text-sm">{tip.tip}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={cn(
              'p-3 rounded-md text-sm', 
              tip.type === 'good' 
                ? 'bg-green-50 border border-green-100' 
                : 'bg-red-50 border border-red-100'
            )}
          >
            {tip.explanation}
          </div>
        ))}
      </div>
    </div>
  );
};

interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <div className="w-full">
      <Accordion className="w-full">
        <AccordionItem id="tone-style" className="rounded-md border border-gray-200">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader 
              title="Tone & Style" 
              categoryScore={feedback.toneAndStyle.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content" className="rounded-md border border-gray-200">
          <AccordionHeader itemId="content">
            <CategoryHeader 
              title="Content" 
              categoryScore={feedback.content.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure" className="rounded-md border border-gray-200">
          <AccordionHeader itemId="structure">
            <CategoryHeader 
              title="Structure" 
              categoryScore={feedback.structure.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills" className="rounded-md border border-gray-200">
          <AccordionHeader itemId="skills">
            <CategoryHeader 
              title="Skills" 
              categoryScore={feedback.skills.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
