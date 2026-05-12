import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onClear: () => void
  uploading: boolean
}

const UploadZone = ({ onFileSelect, selectedFile, onClear, uploading }: Props) => {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    onFileSelect(file)
    const url = URL.createObjectURL(file)
    setPreview(url)
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    maxFiles: 1,
    disabled: uploading,
  })

  const handleClear = () => {
    setPreview(null)
    onClear()
  }

  return (
    <div>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? '#6366f1' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragActive ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.02)',
            transition: 'all 0.3s',
          }}
        >
          <input {...getInputProps()} />
          <Upload size={40} color={isDragActive ? '#6366f1' : 'rgba(255,255,255,0.2)'} style={{ margin: '0 auto 16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', margin: '0 0 8px' }}>
            {isDragActive ? 'File drop karo!' : 'Drag & drop karo ya click karo'}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', margin: 0 }}>
            JPG, PNG, WEBP, MP4, MOV support hai
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {preview && (
              selectedFile.type.startsWith('video') ? (
                <video src={preview} style={{ width: '100%', maxHeight: '280px', objectFit: 'cover' }} muted />
              ) : (
                <img src={preview} alt="preview" style={{ width: '100%', maxHeight: '280px', objectFit: 'cover' }} />
              )
            )}

            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} color="#22c55e" />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{selectedFile.name}</span>
              </div>
              {!uploading && (
                <button onClick={handleClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={18} />
                </button>
              )}
            </div>

            {uploading && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: 'white', fontSize: '14px' }}>Uploading...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default UploadZone