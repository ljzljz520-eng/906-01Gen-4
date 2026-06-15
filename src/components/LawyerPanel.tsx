import { useState, useEffect } from 'react';
import { X, AlertCircle, FileText, Save, Plus } from 'lucide-react';
import { useLawyerStore } from '../store/useLawyerStore';
import { useTemplateStore } from '../store/useTemplateStore';
import { cn } from '../lib/utils';

interface LawyerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: string;
}

type TabType = 'risk' | 'update';

type RiskLevel = 'low' | 'medium' | 'high';

export default function LawyerPanel({
  isOpen,
  onClose,
  templateId,
}: LawyerPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('risk');
  const [isVisible, setIsVisible] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('low');
  const [riskContent, setRiskContent] = useState('');
  const [version, setVersion] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [riskErrors, setRiskErrors] = useState<{ content?: string }>({});
  const [updateErrors, setUpdateErrors] = useState<{
    version?: string;
    content?: string;
  }>({});

  const currentLawyer = useLawyerStore((state) => state.currentLawyer);
  const getTemplateById = useTemplateStore((state) => state.getTemplateById);
  const addRiskNote = useTemplateStore((state) => state.addRiskNote);
  const addUpdateLog = useTemplateStore((state) => state.addUpdateLog);

  const template = getTemplateById(templateId);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setRiskLevel('low');
      setRiskContent('');
      setVersion('');
      setUpdateContent('');
      setRiskErrors({});
      setUpdateErrors({});
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const validateRiskForm = (): boolean => {
    const errors: { content?: string } = {};
    if (!riskContent.trim()) {
      errors.content = '请输入风险说明';
    }
    setRiskErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateUpdateForm = (): boolean => {
    const errors: { version?: string; content?: string } = {};
    if (!version.trim()) {
      errors.version = '请输入版本号';
    }
    if (!updateContent.trim()) {
      errors.content = '请输入更新说明';
    }
    setUpdateErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveRiskNote = () => {
    if (!validateRiskForm() || !currentLawyer) return;

    addRiskNote(templateId, {
      level: riskLevel,
      content: riskContent.trim(),
      lawyerName: currentLawyer.name,
    });

    setRiskLevel('low');
    setRiskContent('');
    setRiskErrors({});
  };

  const handleSaveUpdateLog = () => {
    if (!validateUpdateForm() || !currentLawyer) return;

    addUpdateLog(templateId, {
      version: version.trim(),
      description: updateContent.trim(),
      lawyerName: currentLawyer.name,
    });

    setVersion('');
    setUpdateContent('');
    setUpdateErrors({});
  };

  const getRiskLevelColor = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return 'text-risk-low bg-risk-low/10';
      case 'medium':
        return 'text-risk-medium bg-risk-medium/10';
      case 'high':
        return 'text-risk-high bg-risk-high/10';
    }
  };

  const getRiskLevelText = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return '低风险';
      case 'medium':
        return '中风险';
      case 'high':
        return '高风险';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'bg-primary-950/40 backdrop-blur-sm',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl',
          'transition-transform duration-300 ease-out',
          isVisible ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-primary-100">
            <h2 className="text-xl font-bold text-primary-950">律师标注面板</h2>
            <button
              onClick={handleClose}
              className="p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              aria-label="关闭"
            >
              <X size={20} />
            </button>
          </div>

          {currentLawyer && (
            <div className="px-6 py-3 bg-accent-50 border-b border-accent-100">
              <p className="text-sm text-accent-700">
                当前律师：<span className="font-medium">{currentLawyer.name}</span>
              </p>
            </div>
          )}

          <div className="flex border-b border-primary-100">
            <button
              onClick={() => setActiveTab('risk')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'risk'
                  ? 'text-primary-900 border-b-2 border-primary-900'
                  : 'text-primary-500 hover:text-primary-700'
              )}
            >
              <AlertCircle size={16} />
              风险标注
            </button>
            <button
              onClick={() => setActiveTab('update')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'update'
                  ? 'text-primary-900 border-b-2 border-primary-900'
                  : 'text-primary-500 hover:text-primary-700'
              )}
            >
              <FileText size={16} />
              更新说明
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {activeTab === 'risk' && (
              <div className="p-6 space-y-6">
                <div className="bg-primary-50 rounded-xl p-4">
                  <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                    <Plus size={18} />
                    添加风险标注
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        风险等级
                      </label>
                      <select
                        value={riskLevel}
                        onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                        className="input-field"
                      >
                        <option value="low">低风险</option>
                        <option value="medium">中风险</option>
                        <option value="high">高风险</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        风险说明
                      </label>
                      <textarea
                        value={riskContent}
                        onChange={(e) => {
                          setRiskContent(e.target.value);
                          if (riskErrors.content) {
                            setRiskErrors({});
                          }
                        }}
                        placeholder="请详细描述风险点及注意事项..."
                        rows={4}
                        className={cn('input-field resize-none', riskErrors.content && 'border-red-400 focus:ring-red-100')}
                      />
                      {riskErrors.content && (
                        <p className="mt-1 text-sm text-red-500">{riskErrors.content}</p>
                      )}
                    </div>
                    <button
                      onClick={handleSaveRiskNote}
                      disabled={!currentLawyer}
                      className={cn(
                        'w-full btn-primary flex items-center justify-center gap-2',
                        !currentLawyer && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <Save size={16} />
                      保存风险标注
                    </button>
                    {!currentLawyer && (
                      <p className="text-sm text-red-500 text-center">请先登录律师账号</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-900 mb-4">
                    历史风险标注 ({template?.riskNotes.length || 0})
                  </h3>
                  {template?.riskNotes && template.riskNotes.length > 0 ? (
                    <div className="space-y-3">
                      {[...template.riskNotes].reverse().map((note) => (
                        <div
                          key={note.id}
                          className="bg-white border border-primary-100 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={cn(
                                'px-2 py-1 rounded-md text-xs font-medium',
                                getRiskLevelColor(note.level)
                              )}
                            >
                              {getRiskLevelText(note.level)}
                            </span>
                            <span className="text-xs text-primary-400">
                              {formatDate(note.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-primary-700 mb-2">{note.content}</p>
                          <p className="text-xs text-primary-500">标注人：{note.lawyerName}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-primary-400">
                      <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                      <p>暂无风险标注</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'update' && (
              <div className="p-6 space-y-6">
                <div className="bg-primary-50 rounded-xl p-4">
                  <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                    <Plus size={18} />
                    添加更新说明
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        版本号
                      </label>
                      <input
                        type="text"
                        value={version}
                        onChange={(e) => {
                          setVersion(e.target.value);
                          if (updateErrors.version) {
                            setUpdateErrors((prev) => ({ ...prev, version: undefined }));
                          }
                        }}
                        placeholder="例如：v1.0.1"
                        className={cn('input-field', updateErrors.version && 'border-red-400 focus:ring-red-100')}
                      />
                      {updateErrors.version && (
                        <p className="mt-1 text-sm text-red-500">{updateErrors.version}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        更新说明
                      </label>
                      <textarea
                        value={updateContent}
                        onChange={(e) => {
                          setUpdateContent(e.target.value);
                          if (updateErrors.content) {
                            setUpdateErrors((prev) => ({ ...prev, content: undefined }));
                          }
                        }}
                        placeholder="请详细描述本次更新的内容..."
                        rows={4}
                        className={cn('input-field resize-none', updateErrors.content && 'border-red-400 focus:ring-red-100')}
                      />
                      {updateErrors.content && (
                        <p className="mt-1 text-sm text-red-500">{updateErrors.content}</p>
                      )}
                    </div>
                    <button
                      onClick={handleSaveUpdateLog}
                      disabled={!currentLawyer}
                      className={cn(
                        'w-full btn-primary flex items-center justify-center gap-2',
                        !currentLawyer && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <Save size={16} />
                      保存更新说明
                    </button>
                    {!currentLawyer && (
                      <p className="text-sm text-red-500 text-center">请先登录律师账号</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-900 mb-4">
                    历史更新记录 ({template?.updateLogs.length || 0})
                  </h3>
                  {template?.updateLogs && template.updateLogs.length > 0 ? (
                    <div className="space-y-3">
                      {[...template.updateLogs].reverse().map((log) => {
                        return (
                          <div
                            key={log.id}
                            className="bg-white border border-primary-100 rounded-xl p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-md text-xs font-medium">
                                {log.version}
                              </span>
                              <span className="text-xs text-primary-400">
                                {formatDate(log.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-primary-700 mb-2">{log.description}</p>
                            <p className="text-xs text-primary-500">更新人：{log.lawyerName}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-primary-400">
                      <FileText size={32} className="mx-auto mb-2 opacity-50" />
                      <p>暂无更新记录</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
