import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import api from '../../lib/api'

interface Media {
  _id: string
  title: string
  type: 'image' | 'video' | 'reel'
  url: string
  thumbnail: string
  category: { name: string; color: string }
}

const MasonryCard = ({ item, index }: { item: Media; index: number }) => {
  const [hovered, setHovered] = useState(false)

  const heights = ['280px', '340px', '300px', '380px', '260px', '320px']
  const height = heights[index % heights.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        height,
        cursor: 'pointer',
        marginBottom: '16px',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image */}
      <img
        src={item.url}
        alt={item.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
        loading="lazy"
      />

      {/* Video play icon */}
      {item.type !== 'image' && (
        <div style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={14} color="white" fill="white" />
        </div>
      )}

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}
      />

      {/* Info */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px' }}
      >
        <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: '0 0 6px' }}>{item.title}</p>
        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', background: (item.category?.color || '#6366f1') + '30', color: item.category?.color || '#818cf8', border: `1px solid ${item.category?.color || '#6366f1'}40` }}>
          {item.category?.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

const MasonryGrid = () => {
  const [media, setMedia] = useState<Media[]>([])

  useEffect(() => {
    api.get('/media').then(res => {
      setMedia(res.data.data.slice(0, 9))
    }).catch(console.error)
  }, [])

  if (media.length === 0) return null

  const col1 = media.filter((_, i) => i % 3 === 0)
  const col2 = media.filter((_, i) => i % 3 === 1)
  const col3 = media.filter((_, i) => i % 3 === 2)

  return (
    <section style={{ padding: '80px 24px', maxWidth: '1300px', margin: '0 auto' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}
      >
        <div>
          <p style={{ color: '#818cf8', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px' }}>Recent Work</p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
            Latest{' '}
            <span style={{ background: 'linear-gradient(135deg, #818cf8, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Captures
            </span>
          </h2>
        </div>
        <Link
          to="/portfolio"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', textDecoration: 'none', fontSize: '14px', fontWeight: '500', border: '1px solid rgba(99,102,241,0.3)', padding: '10px 20px', borderRadius: '100px', transition: 'all 0.3s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.6)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)' }}
        >
          View All <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Masonry Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'start' }}>
        <div>{col1.map((item, i) => <MasonryCard key={item._id} item={item} index={i * 3} />)}</div>
        <div style={{ marginTop: '40px' }}>{col2.map((item, i) => <MasonryCard key={item._id} item={item} index={i * 3 + 1} />)}</div>
        <div>{col3.map((item, i) => <MasonryCard key={item._id} item={item} index={i * 3 + 2} />)}</div>
      </div>
    </section>
  )
}

export default MasonryGrid