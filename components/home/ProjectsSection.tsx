'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'proj-1',
    title: '',
    category: '',
    location: '',
    image:
      'https://7958597.fs1.hubspotusercontent-na1.net/hubfs/7958597/Blog_Mexico/Blog%2085/Veolia_Blog_85_Header.jpg',
    year: '',
  },
  {
    id: 'proj-2',
    title: '',
    category: '',
    location: '',
    image:
      'https://mrfarm.com/wp-content/uploads/2018/03/Picture1.png-scaled.jpg',
    year: '',
  },
  {
    id: 'proj-3',
    title: '',
    category: '',
    location: '',
    image:
      'https://carboninstitute.org/wp-content/uploads/2019/11/Carbon-Institute-Ecosystems-1600x900.jpg',
    year: '',
  },
]

const AUTOPLAY_INTERVAL = 5000

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // We stack all images on top of each other; we animate the incoming one in
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressTweenRef = useRef<gsap.core.Tween | null>(null)

  // ── Transition to a slide ────────────────────────────────────────────
  const goTo = useCallback((next: number, dir: 'auto' | 'click' = 'click') => {
    if (isTransitioning) return
    const total = PROJECTS.length
    const target = ((next % total) + total) % total

    setIsTransitioning(true)

    const incoming = slideRefs.current[target]
    if (!incoming) { setIsTransitioning(false); return }

    // Bring incoming on top, start invisible
    gsap.set(incoming, { zIndex: 10, opacity: 0, scale: 1.06 })

    gsap.to(incoming, {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: 'expo.out',
      onComplete: () => {
        // Reset previous slide to base z-index
        slideRefs.current.forEach((el, i) => {
          if (el) gsap.set(el, { zIndex: i === target ? 5 : 1, opacity: i === target ? 1 : 0 })
        })
        setActiveProject(target)
        setIsTransitioning(false)
      },
    })

    // Progress bar reset + animate
    if (progressRef.current) {
      progressTweenRef.current?.kill()
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })
      progressTweenRef.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: AUTOPLAY_INTERVAL / 1000,
        ease: 'none',
      })
    }
  }, [isTransitioning])

  // ── Auto-advance ─────────────────────────────────────────────────────
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveProject((prev) => {
        const next = (prev + 1) % PROJECTS.length
        goTo(next, 'auto')
        return prev // actual update happens inside goTo via onComplete
      })
    }, AUTOPLAY_INTERVAL)
  }, [goTo])

  // ── Scroll animation for label ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Init slides & autoplay ───────────────────────────────────────────
  useEffect(() => {
    // Set all slides invisible except first
    slideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { zIndex: i === 0 ? 5 : 1, opacity: i === 0 ? 1 : 0 })
    })

    // Start progress bar for first slide
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })
      progressTweenRef.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: AUTOPLAY_INTERVAL / 1000,
        ease: 'none',
      })
    }

    startAutoplay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      progressTweenRef.current?.kill()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Manual slide change ──────────────────────────────────────────────
  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    goTo(index)
    startAutoplay()
  }

  const project = PROJECTS[activeProject]

  return (
    <section
      ref={sectionRef}
      id="our-projects"
      aria-labelledby="projects-heading"
      className="bg-brand-cream"
    >
      {/* ══ CAROUSEL ══════════════════════════════════════════════════════ */}
      {/*
        Desktop: wide cinematic 16:7
        Mobile:  4:3 to show more of the portrait-ish images
      */}
      <div className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[16/7]">

        {/* ── Stacked slides ── */}
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            ref={(el) => { slideRefs.current[i] = el }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${proj.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* ── Mobile blur-vignette overlay (fades edges → sharp center) ── */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)',
            backdropFilter: 'blur(0px)',
          }}
        />
        {/* Subtle blur rings on mobile only via layered pseudo-elements approach */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 40%, black 100%)',
            maskImage:
              'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 40%, black 100%)',
            backdropFilter: 'blur(6px)',
          }}
        />

        {/* ── Gradient overlay (always) ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* ── Progress bar (top edge) ── */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden z-20">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-brand-orange origin-left"
          />
        </div>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20 md:left-8 md:translate-x-0">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              id={`project-dot-${i}`}
              aria-label={`Ver proyecto ${i + 1}`}
              onClick={() => handleDotClick(i)}
              className={`rounded-full transition-all duration-400 ${
                i === activeProject
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* ── Project info overlay ── */}
        <div className="absolute bottom-5 right-6 text-right z-20 hidden md:block">
          <p className="text-white/60 text-sm">{project.category}</p>
          <p className="text-white font-medium">
            {project.location} · {project.year}
          </p>
        </div>
      </div>

      {/* ── Label and title ── */}
      <div className="px-6 md:px-12 lg:px-16 py-16">
        <div ref={labelRef} className="section-label text-label opacity-0 mb-4">
          <span id="projects-heading">WALITAKE</span>
        </div>
        <h2 className="text-headline text-brand-dark max-w-2xl">
          {project.title}
        </h2>
      </div>
    </section>
  )
}
