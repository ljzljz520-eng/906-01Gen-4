import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, Download, Gavel, Search } from 'lucide-react';
import { useTemplateStore } from '../store/useTemplateStore';
import CategoryCard from '../components/CategoryCard';
import TemplateCard from '../components/TemplateCard';
import type { Category, Template } from '../types';
import { cn } from '../lib/utils';

export default function HomePage() {
  const navigate = useNavigate();
  const { loadData, categories, templates, loading } = useTemplateStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, [loadData]);

  const hotTemplates = [...templates]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const features = [
    {
      icon: Shield,
      title: '专业权威',
      description: '由执业律师审核，符合最新法律法规要求',
      color: '#3b82f6',
    },
    {
      icon: AlertTriangle,
      title: '风险提示',
      description: '每篇文书标注风险等级，提供法律风险提示',
      color: '#f59e0b',
    },
    {
      icon: Download,
      title: '免费下载',
      description: '所有模板免费下载，支持 Word、PDF 格式导出',
      color: '#10b981',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-accent-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-50 via-primary-50 to-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
        
        <div className="container relative max-w-4xl mx-auto text-center">
          <div 
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 text-accent-700 mb-6">
              <Gavel className="w-4 h-4" />
              <span className="text-sm font-medium">专业法律文书 · 免费使用</span>
            </div>
          </div>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-950 mb-6 text-balance opacity-0 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            社区法律文书模板库
          </h1>
          
          <p 
            className="text-lg md:text-xl text-primary-600 mb-10 max-w-2xl mx-auto text-balance opacity-0 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            涵盖租房、劳动、消费、邻里等常见纠纷类型，专业律师审核，助您高效解决法律问题
          </p>

          <form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索模板，如：劳动合同、租房合同、投诉信..."
                className="w-full pl-12 pr-32 py-4 rounded-xl border-2 border-primary-200 bg-white shadow-lg focus:border-accent-400 focus:ring-4 focus:ring-accent-100 transition-all duration-200 outline-none text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-all duration-200"
              >
                搜索
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div 
            className="text-center mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <h2 className="text-3xl font-bold text-primary-950 mb-3">
              按纠纷类型查找
            </h2>
            <p className="text-primary-600">
              选择您遇到的纠纷类型，快速找到合适的法律文书模板
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category: Category, index: number) => (
              <CategoryCard
                key={category.id}
                category={category}
                delay={500 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div 
            className="text-center mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '700ms' }}
          >
            <h2 className="text-3xl font-bold text-primary-950 mb-3">
              热门模板
            </h2>
            <p className="text-primary-600">
              下载量最高的法律文书模板，千万用户的共同选择
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotTemplates.map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template as unknown as Template}
                delay={800 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-primary-50">
        <div className="container max-w-6xl mx-auto">
          <div 
            className="text-center mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '1100ms' }}
          >
            <h2 className="text-3xl font-bold text-primary-950 mb-3">
              为什么选择我们
            </h2>
            <p className="text-primary-600">
              专业、安全、便捷的法律文书解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                style={{ animationDelay: `${1200 + index * 100}ms` }}
                className={cn(
                  'bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100',
                  'opacity-0 animate-fade-in-up card-hover'
                )}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon 
                    className="w-8 h-8" 
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
