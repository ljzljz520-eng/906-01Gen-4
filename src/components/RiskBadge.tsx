import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
}

const riskConfig = {
  low: {
    text: '低风险',
    bgClass: 'bg-risk-low/10',
    textClass: 'text-risk-low',
    borderClass: 'border-risk-low/30',
    hasAnimation: false,
  },
  medium: {
    text: '中风险',
    bgClass: 'bg-risk-medium/10',
    textClass: 'text-risk-medium',
    borderClass: 'border-risk-medium/30',
    hasAnimation: false,
  },
  high: {
    text: '高风险',
    bgClass: 'bg-risk-high/10',
    textClass: 'text-risk-high',
    borderClass: 'border-risk-high/30',
    hasAnimation: true,
  },
};

export default function RiskBadge({ level }: RiskBadgeProps) {
  const config = riskConfig[level];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border',
        config.bgClass,
        config.textClass,
        config.borderClass,
        config.hasAnimation && 'animate-breathing'
      )}
    >
      <AlertTriangle className="w-3 h-3" />
      {config.text}
    </span>
  );
}
