import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Template } from '../types';
import { cn } from '@/lib/utils';
import RiskBadge from './RiskBadge';

interface TemplateCardProps {
  template: Template;
  delay?: number;
}

export default function TemplateCard({ template, delay = 0 }: TemplateCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/template/${template.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        'bg-white rounded-xl p-5 cursor-pointer shadow-md card-hover opacity-0 animate-fade-in-up',
        'border border-gray-100 flex flex-col h-full'
      )}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-primary-900 line-clamp-1 flex-1">
            {template.name}
          </h3>
          <RiskBadge level={template.riskLevel} />
        </div>
        <p className="text-sm text-primary-600 mb-4 line-clamp-2">
          {template.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-sm text-primary-500">
          <Download className="w-4 h-4" />
          <span>{template.downloadCount} 次下载</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {template.applicableScenarios.slice(0, 2).map((scenario) => (
            <span
              key={scenario}
              className="text-xs px-2 py-0.5 rounded bg-primary-50 text-primary-600"
            >
              {scenario}
            </span>
          ))}
          {template.applicableScenarios.length > 2 && (
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
              +{template.applicableScenarios.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
