import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  AlertCircle,
  FileText,
  Clock,
  Download,
  Edit3,
  ChevronRight,
} from 'lucide-react';
import { Category, Template } from '../types';
import { useTemplateStore } from '../store/useTemplateStore';
import { useLawyerStore } from '../store/useLawyerStore';
import RiskBadge from '../components/RiskBadge';
import DownloadModal from '../components/DownloadModal';
import LawyerPanel from '../components/LawyerPanel';
import { cn } from '../lib/utils';

export default function TemplateDetailPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();

  const getTemplateById = useTemplateStore((state) => state.getTemplateById);
  const categories = useTemplateStore((state) => state.categories);
  const isLoggedIn = useLawyerStore((state) => state.isLoggedIn);

  const template = templateId ? getTemplateById(templateId) : undefined;

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isLawyerPanelOpen, setIsLawyerPanelOpen] = useState(false);

  const category = categories.find((c: Category) => c.id === template?.categoryId);

  const getRiskBgColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'bg-risk-low/10 border-risk-low/30';
      case 'medium':
        return 'bg-risk-medium/10 border-risk-medium/30';
      case 'high':
        return 'bg-risk-high/10 border-risk-high/30';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '暂无';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownloadConfirm = () => {
    if (!template) return;
    const blob = new Blob([template.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center opacity-0 animate-fade-in">
          <AlertCircle className="w-16 h-16 text-primary-400 mx-auto mb-4" />
          <p className="text-xl text-primary-600 mb-4">模板不存在</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 pb-32">
      <div className="container py-8">
        <nav
          className="flex items-center gap-2 text-sm text-primary-500 mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <button
            onClick={() => navigate('/')}
            className="hover:text-primary-700 transition-colors"
          >
            首页
          </button>
          <ChevronRight className="w-4 h-4" />
          <button
            onClick={() => navigate(`/category/${category?.id}`)}
            className="hover:text-primary-700 transition-colors"
          >
            {category?.name}
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-900 font-medium">{template.name}</span>
        </nav>

        <div
          className="bg-white rounded-2xl p-8 shadow-sm mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {category && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {category.name}
                  </span>
                )}
                <RiskBadge level={template.riskLevel} />
              </div>
              <h1 className="text-3xl font-bold text-primary-950 mb-3">
                {template.name}
              </h1>
              <div className="flex items-center gap-6 text-sm text-primary-500">
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4" />
                  <span>{template.downloadCount} 次下载</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>更新于 {formatDate(template.updatedAt)}</span>
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => setIsLawyerPanelOpen(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                标注风险
              </button>
            )}
          </div>
          <p className="text-primary-600 text-lg">{template.description}</p>
        </div>

        <div
          className="bg-white rounded-2xl p-8 shadow-sm mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-xl font-bold text-primary-950 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent-500" />
            适用场景
          </h2>
          <ul className="space-y-3">
            {template.applicableScenarios.map((scenario, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-primary-700"
              >
                <CheckCircle className="w-5 h-5 text-risk-low flex-shrink-0 mt-0.5" />
                <span>{scenario}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="bg-white rounded-2xl p-8 shadow-sm mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <h2 className="text-xl font-bold text-primary-950 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent-500" />
            需要准备的证据
          </h2>
          <ol className="space-y-3 list-decimal list-inside">
            {template.evidenceList.map((evidence, index) => (
              <li
                key={index}
                className="text-primary-700 pl-2"
              >
                {evidence}
                {index < 2 && (
                  <span className="text-risk-high ml-1">*</span>
                )}
              </li>
            ))}
          </ol>
          <p className="text-sm text-primary-400 mt-4">
            <span className="text-risk-high">*</span> 标记为重要证据，建议务必准备
          </p>
        </div>

        {template.riskNotes && template.riskNotes.length > 0 && (
          <div
            className="bg-white rounded-2xl p-8 shadow-sm mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <h2 className="text-xl font-bold text-primary-950 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-risk-high" />
              律师风险提示
            </h2>
            <div className="space-y-4">
              {template.riskNotes.map((note) => (
                <div
                  key={note.id}
                  className={cn(
                    'p-5 rounded-xl border',
                    getRiskBgColor(note.level)
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <RiskBadge level={note.level} />
                    <span className="text-xs text-primary-400">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>
                  <p className="text-primary-700 mb-2">{note.content}</p>
                  <p className="text-sm text-primary-500">
                    标注人：{note.lawyerName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {template.updateLogs && template.updateLogs.length > 0 && (
          <div
            className="bg-white rounded-2xl p-8 shadow-sm opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <h2 className="text-xl font-bold text-primary-950 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-500" />
              更新说明
            </h2>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary-200" />
              <div className="space-y-6">
                {[...template.updateLogs].reverse().map((log) => (
                  <div key={log.id} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="bg-primary-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-md text-xs font-medium">
                          {log.version}
                        </span>
                        <span className="text-xs text-primary-400">
                          {formatDate(log.createdAt)}
                        </span>
                      </div>
                      <p className="text-primary-700 mb-2">{log.description}</p>
                      <p className="text-xs text-primary-500">
                        更新人：{log.lawyerName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-200 py-4 px-6 shadow-lg z-40">
        <div className="container">
          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            下载模板
          </button>
        </div>
      </div>

      {template && (
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          template={template}
          onConfirm={handleDownloadConfirm}
        />
      )}

      {templateId && (
        <LawyerPanel
          isOpen={isLawyerPanelOpen}
          onClose={() => setIsLawyerPanelOpen(false)}
          templateId={templateId}
        />
      )}
    </div>
  );
}
