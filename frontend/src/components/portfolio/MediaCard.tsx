import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Play } from 'lucide-react'
import api from '../../lib/api'

interface Media {
  _id: string
  title: string
  type: 'image' | 'video' | 'reel'
  url: string
  thumbnail: string
  views: number
  category: { name: string; color: string }
}

interface Props {
  media: Media
  onClick: (media: Media) => void
}

const MediaCard = ({ media, onClick }: Props) => {
  const [hovered, setHovered] = useState(false)

  const handleClick = async () => {
    await api.patch(`/media/${media._id}/views`)
    onClick(media)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl cursor-pointer group mb-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Image / Video Thumbnail */}
      {media.type === 'image' ? (
        <img
          src={media.url}
          alt={media.title}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="relative">
          <img
            src={media.thumbnail}
            alt={media.title}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          </div>
        </div>
      )}

      {/* Hover Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4"
      >
        <h3 className="text-white font-medium text-sm mb-1">{media.title}</h3>
        <div className="flex items-center justify-between">
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: media.category?.color + '40', color: media.category?.color }}
          >
            {media.category?.name}
          </span>
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <Eye className="w-3 h-3" />
            <span>{media.views}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MediaCard