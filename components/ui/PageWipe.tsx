'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export default function PageWipe() {
  const wipeRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    if (!wipeRef.current) return

    // Skip wipe on first load (hero handles entrance)
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const tl = gsap.timeline()
    tl.set(wipeRef.current, { scaleY: 0, transformOrigin: 'top' })
      .to(wipeRef.current, {
        scaleY: 1,
        duration: 0.5,
        ease: 'expo.inOut',
      })
      .to(wipeRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.5,
        ease: 'expo.inOut',
        delay: 0.1,
      })
  }, [pathname])

  return (
    <div
      ref={wipeRef}
      aria-hidden="true"
      className="page-wipe"
    />
  )
}
