import { type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface EmptyProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export default function Empty({
  icon: Icon,
  title = '暂无数据',
  description = '当前页面暂无相关内容',
  actionText,
  actionHref,
}: EmptyProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16')}>
      {Icon && (
        <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-primary-400" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-primary-900 mb-2">{title}</h3>
      <p className="text-primary-600 text-center max-w-md mb-6">{description}</p>
      {actionText && actionHref && (
        <Link
          to={actionHref}
          className="btn-primary"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
