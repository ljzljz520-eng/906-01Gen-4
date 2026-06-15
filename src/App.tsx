import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import TemplateListPage from '@/pages/TemplateListPage';
import TemplateDetailPage from '@/pages/TemplateDetailPage';
import SearchPage from '@/pages/SearchPage';
import LawyerLoginPage from '@/pages/LawyerLoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { useTemplateStore } from '@/store/useTemplateStore';

export default function App() {
  const { loadData, isInitialized } = useTemplateStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-accent-500 mx-auto mb-4" />
          <p className="text-primary-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<TemplateListPage />} />
            <Route path="/template/:templateId" element={<TemplateDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/lawyer/login" element={<LawyerLoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
