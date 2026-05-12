import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Masonry from 'react-masonry-css'
import { usePortfolioStore } from '../stores/portfolioStore'
import CategoryCluster from '../components/portfolio/CategoryCluster'
import MediaCard from '../components/portfolio/MediaCard'
import LightBox from '../components/portfolio/LightBox'

const breakpointColumns = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
}

const Portfolio = () => {
  const { categories, media, selectedCategory, fetchCategories, fetchMedia, setSelectedCategory } = usePortfolioStore()
  const [lightboxMedia, setLightboxMedia] = useState<any>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    fetchCategories()
    fetchMedia()
  }, [])

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(id)
    fetchMedia(id || undefined)
  }

  const handleMediaClick = (media: any) => {
    const index = filteredMedia.findIndex((m) => m._id === media._id)
    setLightboxIndex(index)
    setLightboxMedia(media)
  }

  const filteredMedia = selectedCategory
    ? media.filter((m) => m.category?._id === selectedCategory)
    : media

  const handlePrev = () => {
    const newIndex = (lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length
    setLightboxIndex(newIndex)
    setLightboxMedia(filteredMedia[newIndex])
  }

  const handleNext = () => {
    const newIndex = (lightboxIndex + 1) % filteredMedia.length
    setLightboxIndex(newIndex)
    setLightboxMedia(filteredMedia[newIndex])
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-400 tracking-[0.3em] uppercase text-sm mb-3">My Work</p>
          <h1 className="text-5xl md:text-6xl font-bold">Portfolio</h1>
        </div>

        {/* Category Filter */}
        <CategoryCluster
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />

        {/* Masonry Grid */}
        <AnimatePresence>
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex gap-4"
            columnClassName="flex flex-col"
          >
            {filteredMedia.map((item) => (
              <MediaCard
                key={item._id}
                media={item}
                onClick={handleMediaClick}
              />
            ))}
          </Masonry>
        </AnimatePresence>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="text-center text-white/30 py-20">
            <p className="text-6xl mb-4">📷</p>
            <p className="text-xl">Koi media nahi mila</p>
          </div>
        )}

      </div>

      {/* Lightbox */}
      <LightBox
        media={lightboxMedia}
        onClose={() => setLightboxMedia(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}

export default Portfolio