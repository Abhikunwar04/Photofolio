import { useEffect, useState } from 'react'
import { useAdminStore } from '../stores/adminStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

interface CategoryForm {
  name: string
  icon: string
  color: string
}

const defaultForm: CategoryForm = { name: '', icon: '📁', color: '#6366f1' }

const Categories = () => {
  const { categories, fetchCategories, createCategory, updateCategory, deleteCategory } = useAdminStore()
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<CategoryForm>(defaultForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleOpen = (cat?: any) => {
    if (cat) {
      setEditId(cat._id)
      setForm({ name: cat.name, icon: cat.icon, color: cat.color })
    } else {
      setEditId(null)
      setForm(defaultForm)
    }
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditId(null)
    setForm(defaultForm)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (editId) {
      await updateCategory(editId, form)
    } else {
      await createCategory(form)
    }
    await fetchCategories()
    setLoading(false)
    handleClose()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Category delete karna chahte ho?')) {
      await deleteCategory(id)
    }
  }

  const emojis = ['📁', '📷', '🎥', '🎬', '🌄', '🏙️', '👤', '🎨', '✈️', '🍕', '💼', '🎭']

  return (
    <div style={{ padding: '32px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', margin: 0 }}>Categories</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: '4px 0 0' }}>Portfolio categories manage karo</p>
        </div>
        <button
          onClick={() => handleOpen()}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#4f46e5', border: 'none', borderRadius: '12px', padding: '12px 20px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {/* Grid */}
      {categories.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '48px', margin: '0 0 16px' }}>📁</p>
          <p style={{ fontSize: '18px' }}>Koi category nahi hai — New Category banao</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {categories.map((cat) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Color bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: cat.color }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: cat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>{cat.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: '2px 0 0' }}>/{cat.slug}</p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleOpen(cat)}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer' }}
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '420px' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                  {editId ? 'Category Edit Karo' : 'Nayi Category'}
                </h2>
                <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Category Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Wedding, Portrait, Travel"
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Icon */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Icon choose karo</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {emojis.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setForm({ ...form, icon: emoji })}
                        style={{ width: '40px', height: '40px', borderRadius: '8px', border: form.icon === emoji ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)', background: form.icon === emoji ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)', fontSize: '20px', cursor: 'pointer' }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Color</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="color"
                      value={form.color}
                      onChange={e => setForm({ ...form, color: e.target.value })}
                      style={{ width: '48px', height: '48px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'none' }}
                    />
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>{form.color}</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', background: '#4f46e5', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'Saving...' : editId ? 'Update Category' : 'Create Category'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Categories