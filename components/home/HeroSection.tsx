'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance timeline ─────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // Hero image: zoom from grayscale to color
      tl.fromTo(
        imageRef.current,
        { scale: 1.15, filter: 'grayscale(100%)' },
        { scale: 1, filter: 'grayscale(0%)', duration: 1.6 },
        0
      )

      // Logo fade in
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      )

      // Headline letter-by-letter
      const chars = headlineRef.current?.querySelectorAll('.char')
      if (chars) {
        tl.fromTo(
          chars,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
          },
          0.6
        )
      }

      // Subtitle fade
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.0
      )

      // ── Parallax on scroll ────────────────────────────────────────────
      gsap.to(imageRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headline = 'Think Forward'
  const chars = headline.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  ))

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="relative w-full h-svh min-h-[600px] overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="hero-img absolute inset-0 w-full h-[115%] -top-[7.5%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Logo */}
      <div
        ref={logoRef}
        className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0"
      >
        <span className="text-white text-lg font-light tracking-widest select-none">
          WaliTake™
        </span>
      </div>

      {/* Text block */}
      <div className="absolute bottom-40 left-8 md:left-12 lg:left-16 max-w-[55%]">
        <h1
          ref={headlineRef}
          className="text-display text-white mb-4 leading-none"
        >
          {chars}
        </h1>
        <p
          ref={subtitleRef}
          className="text-white/90 text-lg md:text-xl font-light max-w-lg leading-relaxed opacity-0"
        >
          A boutique family office building long-term value in commercial
          real estate, timberland, and ranchland.
        </p>
      </div>
    </section>
  )
}
