import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-900 font-bold text-lg">法</span>
              </div>
              <span className="text-xl font-bold text-white">社区法律文书模板库</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              致力于为社区居民提供便捷、专业的法律文书模板服务，帮助大家更好地维护自身合法权益。
            </p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} 社区法律文书模板库 版权所有
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">重要提示</h3>
            <div className="bg-primary-800 rounded-lg p-4">
              <p className="text-amber-300 text-sm leading-relaxed">
                ⚠️ 本网站提供的模板仅供参考，不构成正式法律意见。
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mt-2">
                如有具体法律问题，建议咨询专业律师或相关法律机构。使用模板时请根据实际情况进行调整，必要时请寻求专业法律帮助。
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">社区法律服务热线</p>
                  <p className="text-white font-medium">12348</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">电子邮箱</p>
                  <p className="text-white font-medium">legal@community.gov.cn</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">服务地址</p>
                  <p className="text-white font-medium">社区法律服务中心</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              本网站支持 IPv6访问 | 网站标识码：1234567890
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                使用条款
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                网站地图
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
