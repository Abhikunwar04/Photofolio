import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '12px 40px' : '20px 40px',
          transition: 'all 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
          background: scrolled ? 'rgba(8,8,12,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: '16px', fontWeight: '800' }}>P</span>
            </div>
            <span style={{ color: 'white', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.02em' }}>
              Portfolio<span style={{ color: '#6366f1' }}>.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', padding: '6px' }}>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredLink(link.path)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ position: 'relative', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: '500', letterSpacing: '0.02em', textDecoration: 'none', color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.5)', background: location.pathname === link.path ? 'rgba(99,102,241,0.3)' : hoveredLink === link.path ? 'rgba(255,255,255,0.06)' : 'transparent', transition: 'all 0.2s ease', display: 'block' }}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    style={{ position: 'absolute', inset: 0, borderRadius: '100px', background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.4)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/contact"
              style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '100px', color: 'white', fontSize: '13px', fontWeight: '600', textDecoration: 'none', letterSpacing: '0.02em', boxShadow: '0 4px 20px rgba(99,102,241,0.3)', transition: 'all 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
            >
              Hire Me
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
              className="mobile-menu-btn"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={menuOpen ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 7 : i === 2 ? -7 : 0, opacity: i === 1 ? 0 : 1 } : { rotate: 0, y: 0, opacity: 1 }}
                  style={{ display: 'block', width: '22px', height: '1.5px', background: 'white', borderRadius: '2px' }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: '70px', left: '16px', right: '16px', zIndex: 999, background: 'rgba(8,8,12,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  style={{ display: 'block', padding: '14px 20px', borderRadius: '12px', color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.5)', background: location.pathname === link.path ? 'rgba(99,102,241,0.2)' : 'transparent', fontSize: '15px', fontWeight: '500', textDecoration: 'none' }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          nav > div > div:nth-child(2) { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar