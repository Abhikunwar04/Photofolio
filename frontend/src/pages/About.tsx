import useScrollReveal from '../hooks/useScrollReveal'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  const scrollRef = useScrollReveal()

  const skills = [
    { name: 'Photography', level: 95 },
    { name: 'Videography', level: 90 },
    { name: 'Photo Editing', level: 92 },
    { name: 'Video Editing', level: 85 },
    { name: 'Creative Direction', level: 88 },
    { name: 'Color Grading', level: 87 },
  ]

  return (
    <main ref={scrollRef} style={{ minHeight: '100vh', paddingTop: '100px' }}>

      {/* Hero */}
      <section style={{ padding: '60px 24px 120px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>

          {/* Image */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
                📷
              </div>
            </div>
            {/* Floating badge */}
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#4f46e5', borderRadius: '16px', padding: '16px 24px', boxShadow: '0 20px 40px rgba(79,70,229,0.4)' }}>
              <p style={{ color: 'white', fontSize: '28px', fontWeight: '800', margin: 0 }}>5+</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', margin: 0 }}>Years Exp.</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="reveal" style={{ color: '#818cf8', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '13px', marginBottom: '16px' }}>About Me</p>
            <h1 className="reveal" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.1, marginBottom: '24px' }}>
              Main Hoon Ek
              <span style={{ display: 'block', background: 'linear-gradient(135deg, #818cf8, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Visual Artist
              </span>
            </h1>
            <p className="reveal" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              5 saal se zyada experience ke saath main photography aur videography mein apna hunar nikhaar raha hoon. Har project mein main ek naya nazariya lekar aata hoon.
            </p>
            <p className="reveal" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
              Mera kaam sirf tasveerin nahi khenchta — main zindagi ke khoobsurat lamhon ko abad kar deta hoon.
            </p>
            <div className="reveal">
              <Link
                to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#4f46e5', color: 'white', borderRadius: '100px', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}
              >
                Kaam Karein Saath <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="reveal" style={{ color: '#818cf8', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>My Skills</p>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', textAlign: 'center', marginBottom: '56px' }}>Expertise</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {skills.map((skill) => (
              <div key={skill.name} className="reveal">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'white', fontSize: '15px', fontWeight: '500' }}>{skill.name}</span>
                  <span style={{ color: '#818cf8', fontSize: '15px', fontWeight: '600' }}>{skill.level}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${skill.level}%`, background: 'linear-gradient(90deg, #4f46e5, #a855f7)', borderRadius: '4px', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}

export default About