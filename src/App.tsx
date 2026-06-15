import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import TemplateListPage from '@/pages/TemplateListPage';
import TemplateDetailPage from '@/pages/TemplateDetailPage';
import SearchPage from '@/pages/SearchPage';
import LawyerLoginPage from '@/pages/LawyerLoginPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
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
