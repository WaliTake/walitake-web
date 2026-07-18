'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MarqueeFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee
      const track = trackRef.current
      if (!track) return

      const totalWidth = track.scrollWidth / 2
      gsap.to(track, {
        x: -totalWidth,
        duration: 22,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % totalWidth}px`,
        },
      })

      // Section entrance
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const BRAND_TEXT = 'BertchCapital™'
  // Duplicate enough times to fill the marquee loop
  const items = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="inline-block px-8 text-[8vw] md:text-[6vw] font-light tracking-tight leading-none whitespace-nowrap text-brand-dark">
      {BRAND_TEXT}
    </span>
  ))

  return (
    <footer ref={footerRef} className="bg-brand-orange overflow-hidden pb-0 opacity-0">
      {/* Marquee */}
      <div className="py-10 md:py-14 overflow-hidden">
        <div ref={trackRef} className="flex items-center w-max">
          {items}
          {/* Duplicate for seamless loop */}
          {items}
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="px-8 md:px-12 lg:px-16 py-6 flex items-center justify-between border-t border-black/10">
        <p className="text-brand-dark text-sm font-light">
          ©{new Date().getFullYear()} WaliTake
        </p>
        <div className="flex gap-6">
          <Link
            href="/privacy"
            id="footer-privacy"
            className="text-brand-dark text-sm hover:opacity-70 transition-opacity"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            id="footer-terms"
            className="text-brand-dark text-sm hover:opacity-70 transition-opacity"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
