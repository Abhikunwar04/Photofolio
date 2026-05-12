import { useEffect } from 'react'
import { useAdminStore } from '../stores/adminStore'
import { Image, FolderOpen, Eye } from 'lucide-react'

const Dashboard = () => {
  const { categories, media, fetchCategories, fetchMedia } = useAdminStore()

  useEffect(() => {
    fetchCategories()
    fetchMedia()
  }, [])

  const totalViews = media.reduce((acc, m) => acc + m.views, 0)

  const stats = [
    { label: 'Total Media', value: media.length, icon: Image, color: 'indigo' },
    { label: 'Categories', value: categories.length, icon: FolderOpen, color: 'purple' },
    { label: 'Total Views', value: totalViews, icon: Eye, color: 'pink' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-white/40 mb-8">Portfolio ka overview</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-white/40 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Media */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Uploads</h2>
        {media.length === 0 ? (
          <p className="text-white/30 text-center py-8">Koi media nahi hai abhi</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {media.slice(0, 12).map((item) => (
              <div key={item._id} className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard