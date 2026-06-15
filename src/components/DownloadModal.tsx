import { useState, useEffect } from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';
import { Template } from '../types';
import { useTemplateStore } from '../store/useTemplateStore';
import { cn } from '../lib/utils';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template;
  onConfirm: () => void;
}

export default function DownloadModal({
  isOpen,
  onClose,
  template,
  onConfirm,
}: DownloadModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const incrementDownload = useTemplateStore((state) => state.incrementDownload);

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
      setIsChecked(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleConfirm = () => {
    if (!isChecked) return;
    incrementDownload(template.id);
    onConfirm();
    handleClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-primary-950/60 backdrop-blur-sm',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
    >
      <div
        className={cn(
          'relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden',
          'animate-scale-in'
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          aria-label="关闭"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2
            id="download-modal-title"
            className="text-2xl font-bold text-primary-950 mb-6 pr-10"
          >
            下载确认
          </h2>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-red-700 mb-2">重要提示</p>
                <div className="text-sm text-red-600 space-y-1">
                  <p>本模板仅供参考，不构成正式法律意见。</p>
                  <p>使用前请仔细阅读模板内容，根据实际情况进行修改。</p>
                  <p>建议在重要法律事务中咨询专业律师。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-primary-600 mb-1">即将下载</p>
            <p className="font-semibold text-primary-900">{template.name}</p>
          </div>

          <label className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl cursor-pointer hover:bg-primary-100 transition-colors mb-6">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-primary-300 text-accent-500 focus:ring-accent-400 cursor-pointer"
            />
            <span className="text-sm text-primary-700">
              我已阅读并理解上述声明，自愿下载使用本模板
            </span>
          </label>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 btn-secondary"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isChecked}
              className={cn(
                'flex-1 btn-primary flex items-center justify-center gap-2',
                !isChecked && 'opacity-50 cursor-not-allowed hover:bg-accent-500 hover:translate-y-0 hover:shadow-none'
              )}
            >
              <Check size={18} />
              确认下载
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
