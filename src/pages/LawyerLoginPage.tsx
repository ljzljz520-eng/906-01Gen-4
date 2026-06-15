import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLawyerStore } from '@/store/useLawyerStore';
import lawyers from '@/data/lawyers.json';

export default function LawyerLoginPage() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useLawyerStore();
  const [licenseNumber, setLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!licenseNumber.trim()) {
      setError('请输入执业证号');
      return;
    }

    if (!password.trim()) {
      setError('请输入密码');
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(licenseNumber.trim(), password.trim());

    if (success) {
      navigate('/');
    } else {
      setError('执业证号或密码不正确，请检查后重试');
    }

    setIsLoading(false);
  };

  const demoAccounts = lawyers.slice(0, 3);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-900 mb-8 transition-colors opacity-0 animate-fade-in-up"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 opacity-0 animate-fade-in-up stagger-1">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-700" />
            </div>
            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              律师登录
            </h1>
            <p className="text-primary-600 text-sm">
              请输入您的执业证号登录系统进行模板标注
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-scale-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">登录失败</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-primary-900 mb-2">
                执业证号
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="请输入您的执业证号"
                  className="input-field pl-12"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-900 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入您的登录密码"
                  className="input-field pl-12"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  登录
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-primary-600 mb-4">
              💡 演示账号提示：点击下方账号快速填充（默认密码：lawyer2024）
            </p>
            <div className="space-y-2">
              {demoAccounts.map((lawyer) => (
                <button
                  key={lawyer.id}
                  type="button"
                  onClick={() => {
                    setLicenseNumber(lawyer.licenseNumber);
                    setPassword('lawyer2024');
                  }}
                  className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors group"
                >
                  <p className="font-medium text-primary-900 group-hover:text-primary-700">
                    {lawyer.name}
                  </p>
                  <p className="text-sm text-primary-600 font-mono">
                    {lawyer.licenseNumber}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
