import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Media {
  _id: string
  title: string
  type: 'image' | 'video' | 'reel'
  url: string
  category: { name: string; color: string }
}

interface Props {
  media: Media | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const LightBox = ({ media, onClose, onPrev, onNext }: Props) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-6 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Media */}
          <motion.div
            key={media._id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {media.type === 'image' ? (
              <img
                src={media.url}
                alt={media.title}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <video
                src={media.url}
                controls
                autoPlay
                className="w-full h-full object-contain rounded-xl"
              />
            )}

            {/* Info */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-medium">{media.title}</h3>
              <span
                className="text-xs px-3 py-1 rounded-full mt-2 inline-block"
                style={{ backgroundColor: media.category?.color + '40', color: media.category?.color }}
              >
                {media.category?.name}
              </span>
            </div>
          </motion.div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-6 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LightBox