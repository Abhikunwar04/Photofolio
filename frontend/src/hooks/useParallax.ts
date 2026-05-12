import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'

const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      y: () => ref.current!.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [speed])

  return ref
}

export default useParallax