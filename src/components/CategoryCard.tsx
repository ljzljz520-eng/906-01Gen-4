import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Category } from '../types';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  delay?: number;
}

export default function CategoryCard({ category, delay = 0 }: CategoryCardProps) {
  const navigate = useNavigate();
  const [Icon, setIcon] = useState<LucideIcon | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const icons = await import('lucide-react');
        const iconName = category.icon as keyof typeof icons;
        if (iconName in icons) {
          setIcon(icons[iconName] as LucideIcon);
        }
      } catch (error) {
        console.error('Failed to load icon:', error);
      }
    };
    loadIcon();
  }, [category.icon]);

  const handleClick = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        'bg-white rounded-xl p-6 cursor-pointer shadow-md card-hover opacity-0 animate-fade-in-up',
        'border border-gray-100'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${category.color}20` }}
        >
          {Icon && <Icon className="w-6 h-6" style={{ color: category.color }} />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-primary-900 mb-1 truncate">
            {category.name}
          </h3>
          <p className="text-sm text-primary-600 mb-3 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
              {category.templateCount} 个模板
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
