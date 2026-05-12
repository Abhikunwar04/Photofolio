import { useEffect, useState } from 'react'
import { useAdminStore } from '../stores/adminStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, X, Image, Video } from 'lucide-react'
import UploadZone from '../components/upload/UploadZone'
import api from '../lib/api'

interface UploadForm {
  title: string
  type: 'image' | 'video' | 'reel'
  category: string
}

const defaultForm: UploadForm = { title: '', type: 'image', category: '' }

const Media = () => {
  const { media, categories, fetchMedia, fetchCategories, deleteMedia } = useAdminStore()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<UploadForm>(defaultForm)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMedia()
    fetchCategories()
  }, [])

  const handleClose = () => {
    setShowModal(false)
    setForm(defaultForm)
    setSelectedFile(null)
    setError('')
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) { setError('File select karo'); return }
    if (!form.category) { setError('Category select karo'); return }
    if (!form.title) { setError('Title likho'); return }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('title', form.title)
      formData.append('type', form.type)
      formData.append('category', form.category)

      await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      await fetchMedia()
      handleClose()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Media delete karna chahte ho?')) {
      await deleteMedia(id)
    }
  }

  return (
    <div style={{ padding: '32px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', margin: 0 }}>Media</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: '4px 0 0' }}>
            {media.length} files uploaded
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#4f46e5', border: 'none', borderRadius: '12px', padding: '12px 20px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          <Plus size={18} />
          Upload Media
        </button>
      </div>

      {/* Media Grid */}
      {media.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '48px', margin: '0 0 16px' }}>📷</p>
          <p style={{ fontSize: '18px' }}>Koi media nahi — Upload karo!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          <AnimatePresence>
            {media.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                  <img
                    src={item.url}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Type badge */}
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', borderRadius: '6px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.type === 'image' ? <Image size={12} color="white" /> : <Video size={12} color="white" />}
                    <span style={{ color: 'white', fontSize: '11px' }}>{item.type}</span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239,68,68,0.8)', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Trash2 size={14} color="white" />
                  </button>
                </div>

                {/* Info */}
                <div style={{ padding: '10px 12px' }}>
                  <p style={{ color: 'white', fontSize: '13px', fontWeight: '500', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', margin: 0 }}>
                    {item.category?.name} • {item.views} views
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>Media Upload</h2>
                <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpload}>

                {/* Upload Zone */}
                <div style={{ marginBottom: '20px' }}>
                  <UploadZone
                    onFileSelect={setSelectedFile}
                    selectedFile={selectedFile}
                    onClear={() => setSelectedFile(null)}
                    uploading={uploading}
                  />
                </div>

                {/* Title */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Sunset at Marine Drive"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Type */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Type</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(['image', 'video', 'reel'] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: form.type === t ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)', background: form.type === t ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)', color: form.type === t ? '#a5b4fc' : 'rgba(255,255,255,0.4)', fontSize: '13px', cursor: 'pointer', textTransform: 'capitalize' }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    style={{ width: '100%', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: form.category ? 'white' : 'rgba(255,255,255,0.3)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="">Category select karo</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '10px', textAlign: 'center', color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={uploading}
                  style={{ width: '100%', background: '#4f46e5', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }}
                >
                  {uploading ? 'Uploading...' : 'Upload Karo'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Media