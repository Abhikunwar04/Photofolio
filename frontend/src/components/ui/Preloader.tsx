import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {count <= 100 && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, background: '#0a0a0a',
            zIndex: 999999, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'white', fontSize: '48px', fontWeight: '700', marginBottom: '48px' }}
          >
            PORTFOLIO<span style={{ color: '#6366f1' }}>.</span>
          </motion.h1>

          {/* Progress bar */}
          <div style={{ width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                width: `${count}%`,
                transition: 'width 0.03s linear',
              }}
            />
          </div>

          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '16px', fontVariantNumeric: 'tabular-nums' }}>
            {count}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader