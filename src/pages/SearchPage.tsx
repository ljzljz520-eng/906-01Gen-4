import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, FileText } from 'lucide-react';
import { Template } from '../types';
import { useTemplateStore } from '../store/useTemplateStore';
import TemplateCard from '../components/TemplateCard';

const hotSearches = [
  '房屋租赁合同',
  '劳动合同',
  '借款合同',
  '离婚协议',
  '遗嘱',
  '委托书',
  '起诉状',
  '答辩状',
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';

  const searchTemplates = useTemplateStore((state) => state.searchTemplates);

  const [searchInput, setSearchInput] = useState(query);
  const [searchResults, setSearchResults] = useState<Template[]>([]);

  useEffect(() => {
    setSearchInput(query);
    if (query) {
      const results = searchTemplates(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query, searchTemplates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const handleHotSearch = (keyword: string) => {
    setSearchInput(keyword);
    setSearchParams({ q: keyword });
  };

  return (
    <div className="min-h-screen bg-primary-50 pt-24 pb-12">
      <div className="container">
        <div
          className="max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="搜索法律文书模板..."
              className="w-full pl-14 pr-32 py-4 rounded-full text-lg border-2 border-primary-200 focus:border-accent-400 focus:ring-4 focus:ring-accent-100 transition-all outline-none"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-2.5 px-6 rounded-full"
            >
              搜索
            </button>
          </form>
        </div>

        {query ? (
          <>
            <div
              className="mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <p className="text-primary-600">
                找到 <span className="font-bold text-primary-900">{searchResults.length}</span> 个相关模板
                {query && (
                  <span>
                    ，关键词：<span className="font-medium text-accent-600">"{query}"</span>
                  </span>
                )}
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    delay={200 + index * 100}
                  />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-16 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.3s' }}
              >
                <FileText className="w-20 h-20 text-primary-300 mx-auto mb-4" />
                <p className="text-xl text-primary-600 mb-2">
                  未找到相关模板
                </p>
                <p className="text-primary-400 mb-6">请尝试其他关键词</p>
                <button
                  onClick={() => navigate('/')}
                  className="btn-secondary"
                >
                  返回首页
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            className="max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent-500" />
                热门搜索推荐
              </h3>
              <div className="flex flex-wrap gap-3">
                {hotSearches.map((keyword, index) => (
                  <button
                    key={keyword}
                    onClick={() => handleHotSearch(keyword)}
                    className="px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-full text-sm transition-colors opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
