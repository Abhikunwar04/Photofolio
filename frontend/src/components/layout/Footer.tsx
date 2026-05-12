import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 24px 40px', marginTop: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '60px' }}>

          {/* Brand */}
          <div>
            <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>
              PORTFOLIO<span style={{ color: '#6366f1' }}>.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>
              Visual storytelling through photography and videography.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '18px' }}>
                📸
              </a>
              <a href="#" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '18px' }}>
                🎬
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ color: 'white', fontSize: '14px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Pages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', textDecoration: 'none' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: 'white', fontSize: '14px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>aap@email.com</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>+91 98765 43210</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>Mumbai, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', margin: 0 }}>
            © 2025 Portfolio. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', margin: 0 }}>
            Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer