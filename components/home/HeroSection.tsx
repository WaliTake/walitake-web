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
      // ── Entrance timeline (plays once on load) ────────────────────────
      const entranceTl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // Hero image: zoom from grayscale to color
      entranceTl.fromTo(
        imageRef.current,
        { scale: 1.15, filter: 'grayscale(100%)' },
        { scale: 1, filter: 'grayscale(0%)', duration: 1.6 },
        0
      )

      // Logo fade in
      entranceTl.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      )

      // Headline letter-by-letter
      const chars = headlineRef.current?.querySelectorAll('.char')
      if (chars) {
        entranceTl.fromTo(
          chars,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.04 },
          0.6
        )
      }

      // Subtitle fade
      entranceTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.0
      )

      // ── Parallax on scroll (image only — never reverses) ─────────────
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

      // ── Bidirectional text: hide on leave, cascade back on enterBack ──
      const heroChars = headlineRef.current?.querySelectorAll('.char')

      // Timeline reusable for re-entry (letters + subtitle + logo)
      const textInTl = gsap.timeline({ paused: true })
      if (heroChars) {
        textInTl.fromTo(
          heroChars,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'expo.out' }
        )
      }
      textInTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' },
        0.1
      )
      textInTl.fromTo(
        logoRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out' },
        0
      )

      // ── Trigger: fires when Sustainability (#section 4) enters view ───
      const sustainabilityEl = document.getElementById('sustainability')
      const ourStoryEl       = document.getElementById('our-story')

      // EXIT: letters stagger out when sustainability comes into view (both devices)
      ScrollTrigger.create({
        trigger: sustainabilityEl ?? sectionRef.current,
        start: 'top 90%',
        end:   'top 30%',
        onEnter: () => {
          if (heroChars) {
            gsap.to(heroChars, {
              opacity: 0,
              y: -28,
              duration: 0.45,
              stagger: 0.025,
              ease: 'expo.in',
            })
          }
          gsap.to(subtitleRef.current, { opacity: 0, y: -18, duration: 0.35, ease: 'expo.in', delay: 0.05 })
          gsap.to(logoRef.current,     { opacity: 0, y: -10, duration: 0.3,  ease: 'expo.in' })
        },
      })

      // RE-ENTRY: different trigger per screen size
      const mm = gsap.matchMedia()

      // ── MOBILE: re-appear at 50% of section 2 (#our-story) ───────────
      mm.add('(max-width: 767px)', () => {
        ScrollTrigger.create({
          trigger: ourStoryEl,
          start: 'center bottom',   // 50% of our-story crosses bottom of viewport (scrolling up)
          onLeaveBack: () => {
            textInTl.restart()
          },
        })
      })

      // ── DESKTOP: re-appear when scrolling back out of sustainability ──
      mm.add('(min-width: 768px)', () => {
        ScrollTrigger.create({
          trigger: sustainabilityEl ?? sectionRef.current,
          start: 'top 90%',
          onLeaveBack: () => {
            textInTl.restart()
          },
        })
      })

      // ── Safety snap: fast-scroll guard once hero is fully off screen ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'bottom top',
        onEnter: () => {
          if (heroChars) gsap.set(heroChars, { opacity: 0, y: -30 })
          gsap.set(subtitleRef.current, { opacity: 0 })
          gsap.set(logoRef.current,     { opacity: 0 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])


  const headline = 'Ayuda al planeta'
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
      className="relative w-full h-svh min-h-[600px] overflow-hidden bg-black"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="hero-img absolute inset-0 w-full h-[115%] -top-[7.5%]"
        style={{
          backgroundImage:
            "url('https://tallerecologista.org.ar/wp-content/uploads/2025/04/MG_5587-Credito_-Gisela-Ardit.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* ── OVERLAYS PARA MEJORAR LA LECTURA ── */}
      {/* 1. Filtro general sutil para apagar el brillo de la foto */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* 2. Gradiente radial/lineal desde abajo (protege el subtítulo) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* 3. Gradiente desde la izquierda (protege el título en pantallas grandes) */}
      <div className="absolute inset-0 w-full md:w-3/4 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />


      {/* Logo */}
      <div
        ref={logoRef}
        className="absolute top-8 left-8 md:left-12 lg:left-16 opacity-0"
      >
        {/* Alineado a la izquierda para seguir la estructura editorial */}
        <span className="text-white text-sm font-bold tracking-widest uppercase select-none">
          WaliTake
        </span>
      </div>

      {/* Text block */}
      <div className="absolute bottom-20 md:bottom-32 left-6 md:left-12 lg:left-16 w-full max-w-[92%] md:max-w-[75%] lg:max-w-[60%]">
        
        {/* Título Masivo - Tipografía unificada */}
        <h1
          ref={headlineRef}
          className="text-[4.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-medium leading-[1.05] tracking-tighter text-white mb-6"
        >
          {chars}
        </h1>
        
        {/* Subtítulo ajustado con font-light */}
        <p
          ref={subtitleRef}
          className="text-white/80 font-light text-2xl md:text-2xl leading-[1.6] max-w-2xl opacity-0"
        >
          Tirar tus residuos es botar tus ganancias. Conecta con miles de emprendedores que usan los residuos como materia prima.
        </p>
        
      </div>
    </section>
  )
}