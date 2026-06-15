import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, ChevronRight, Download, Clock, AlertTriangle, Filter } from 'lucide-react';
import { useTemplateStore } from '../store/useTemplateStore';
import TemplateCard from '../components/TemplateCard';
import Empty from '../components/Empty';
import type { Template } from '../types';
import { cn } from '../lib/utils';

type SortOption = 'download' | 'update' | 'risk';

export default function TemplateListPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { loadData, categories, getTemplatesByCategory, loading } = useTemplateStore();
  const [sortBy, setSortBy] = useState<SortOption>('download');

  useEffect(() => {
    loadData();
  }, [loadData]);

  const category = useMemo(() => {
    return categories.find((c) => c.id === categoryId);
  }, [categories, categoryId]);

  const templates = useMemo(() => {
    if (!categoryId) return [];
    return getTemplatesByCategory(categoryId);
  }, [categoryId, getTemplatesByCategory]);

  const sortedTemplates = useMemo(() => {
    const list = [...templates];
    switch (sortBy) {
      case 'download':
        return list.sort((a, b) => b.downloadCount - a.downloadCount);
      case 'update':
        return list.sort((a, b) => {
          const aDate = a.updateLogs.length > 0 
            ? new Date(a.updateLogs[a.updateLogs.length - 1].createdAt).getTime()
            : 0;
          const bDate = b.updateLogs.length > 0
            ? new Date(b.updateLogs[b.updateLogs.length - 1].createdAt).getTime()
            : 0;
          return bDate - aDate;
        });
      case 'risk':
        const riskOrder = { high: 0, medium: 1, low: 2 };
        return list.sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel]);
      default:
        return list;
    }
  }, [templates, sortBy]);

  const sortOptions = [
    { value: 'download', label: '按下载量', icon: Download },
    { value: 'update', label: '按更新时间', icon: Clock },
    { value: 'risk', label: '按风险等级', icon: AlertTriangle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-accent-500" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-primary-600 mb-4">分类不存在</p>
          <Link to="/" className="text-accent-600 hover:text-accent-700 font-medium">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <nav 
          className="flex items-center gap-2 text-sm mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0ms' }}
        >
          <Link 
            to="/" 
            className="flex items-center gap-1 text-primary-600 hover:text-accent-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>首页</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-primary-400" />
          <span className="text-primary-900 font-medium">{category.name}</span>
        </nav>

        <header 
          className="mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary-950 mb-3">
            {category.name}
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl">
            {category.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-accent-100 text-accent-700">
              共 {templates.length} 个模板
            </span>
          </div>
        </header>

        <div 
          className="flex flex-wrap items-center gap-4 mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex items-center gap-2 text-primary-700">
            <Filter className="w-4 h-4" />
            <span className="font-medium">排序方式：</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as SortOption)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  sortBy === option.value
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-white text-primary-600 border border-gray-200 hover:border-accent-400 hover:text-accent-600'
                )}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {sortedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTemplates.map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template as unknown as Template}
                delay={300 + index * 100}
              />
            ))}
          </div>
        ) : (
          <div 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <Empty />
            <p className="text-center text-primary-600 mt-4">
              该分类下暂无模板
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
