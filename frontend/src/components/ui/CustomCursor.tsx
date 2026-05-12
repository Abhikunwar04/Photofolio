import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)'
      cursor.style.background = 'rgba(99,102,241,0.5)'
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)'
    }

    const onMouseLeaveLink = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      cursor.style.background = 'white'
      follower.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.addEventListener('mousemove', onMouseMove)
    animate()

    const links = document.querySelectorAll('a, button')
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnterLink)
      link.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: 'white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s, background 0.2s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          width: '36px',
          height: '36px',
          border: '1.5px solid rgba(255,255,255,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.3s',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}

export default CustomCursor