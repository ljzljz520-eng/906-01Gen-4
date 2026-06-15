import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="text-center max-w-md">
        <div className="relative mb-8 opacity-0 animate-fade-in-up">
          <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <FileQuestion className="w-16 h-16 text-primary-400" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-primary-200/30 select-none">
              404
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-primary-900 mb-4 opacity-0 animate-fade-in-up stagger-1">
          页面未找到
        </h1>

        <p className="text-primary-600 mb-8 text-balance opacity-0 animate-fade-in-up stagger-2">
          抱歉，您访问的页面不存在或已被移除
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 btn-primary opacity-0 animate-fade-in-up stagger-3"
        >
          <Home className="w-5 h-5" />
          返回首页
        </Link>
      </div>
    </div>
  );
}
