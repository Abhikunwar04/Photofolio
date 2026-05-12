import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact = () => {
  const scrollRef = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  const info = [
    { icon: Mail, label: 'Email', value: 'aap@email.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
  ]

  return (
    <main ref={scrollRef} style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <section style={{ padding: '60px 24px 120px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ color: '#818cf8', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '13px', marginBottom: '16px' }}>Get In Touch</p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '800', lineHeight: 1.1, margin: '0 0 16px' }}>
            Baat Karte
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #818cf8, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Hain
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Koi project hai? Collaboration chahiye? Ya bas hello bolna hai — sab welcome hai!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>

          {/* Contact Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
              {info.map((item) => (
                <div key={item.label} className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(99,102,241,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={20} color="#818cf8" />
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>{item.label}</p>
                    <p style={{ color: 'white', fontSize: '16px', margin: 0 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Aapka Naam</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="aap@email.com"
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Aapka project kya hai?"
                  required
                  rows={5}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '15px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', background: sent ? '#22c55e' : '#4f46e5', border: 'none', borderRadius: '12px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                {sent ? '✓ Message Bhej Diya!' : <><Send size={18} /> Message Bhejo</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact