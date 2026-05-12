import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../lib/gsap-config'
import { ArrowRight, Camera, Film, Star } from 'lucide-react'
import ParticleField from '../components/three/ParticleField'
import useScrollReveal from '../hooks/useScrollReveal'
import MasonryGrid from '../components/portfolio/MasonryGrid'

const Home = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const scrollRef = useScrollReveal()

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(headingRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' })
      .fromTo(subRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
      .fromTo(btnRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const services = [
    { icon: Camera, title: 'Photography', desc: 'Portrait, Wedding, Commercial — har moment ko perfectly capture karta hoon' },
    { icon: Film, title: 'Videography', desc: 'Cinematic reels aur brand films jo kahani kehte hain' },
    { icon: Star, title: 'Creative Direction', desc: 'Visual storytelling jo brand identity ko define kare' },
  ]

  const stats = [
    { number: '500+', label: 'Projects' },
    { number: '200+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Awards' },
  ]

  return (
    <main ref={scrollRef}>

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <ParticleField />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.6))', zIndex: -1 }} />

        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#818cf8', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '13px', marginBottom: '24px' }}>
            Creative Portfolio
          </p>

          <h1 ref={headingRef} style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: '800', lineHeight: 1, marginBottom: '24px', opacity: 0 }}>
            Visual
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #818cf8, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Storyteller
            </span>
          </h1>

          <p ref={subRef} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.8, opacity: 0 }}>
            Photography, Videography aur Creative Direction mein specialization — har frame ek kahani kehta hai
          </p>

          <div ref={btnRef} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}>
            <Link to="/portfolio" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#4f46e5', color: 'white', borderRadius: '100px', fontSize: '14px', letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase', transition: 'all 0.3s' }}>
              View Work <ArrowRight size={16} />
            </Link>
            <Link to="/contact" style={{ padding: '14px 32px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '100px', fontSize: '14px', letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}>
              Contact Me
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)', animation: 'pulse 2s infinite' }} />
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="reveal">
              <p style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', background: 'linear-gradient(135deg, #818cf8, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px' }}>
                {stat.number}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Work - Pinterest Style */}
<MasonryGrid />

      {/* Services Section */}
      <section style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: '#818cf8', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '13px', marginBottom: '16px' }}>What I Do</p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '700', margin: 0 }}>Services</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {services.map((service, i) => (
            <div
              key={i}
              className="reveal"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '40px 32px', transition: 'all 0.3s', cursor: 'default' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.08)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <div style={{ width: '56px', height: '56px', background: 'rgba(99,102,241,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <service.icon size={24} color="#818cf8" />
              </div>
              <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>{service.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="reveal" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(168,85,247,0.2))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '28px', padding: '64px 40px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', marginBottom: '16px' }}>Kaam Karein Saath?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.7 }}>
            Aapka vision hai, mera kaam hai use reality mein laana
          </p>
          <Link
            to="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 40px', background: '#4f46e5', color: 'white', borderRadius: '100px', fontSize: '15px', textDecoration: 'none', fontWeight: '600', transition: 'all 0.3s' }}
          >
            Baat Karte Hain <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Home