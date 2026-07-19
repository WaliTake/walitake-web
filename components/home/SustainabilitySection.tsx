'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { label: '4,000 acres of grasslands restored' },
  { label: '2 miles of streams restored' },
  { label: 'Sustainable building practices' },
  { label: '16,000+ acres under stewardship' },
]

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline split
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          },
        }
      )

      // Body text
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 82%',
          },
        }
      )

      // Image reveal from right
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 78%',
          },
        }
      )

      // Metrics stagger
      const items = metricsRef.current?.querySelectorAll('li')
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sustainability"
      aria-labelledby="sustainability-heading"
      className="bg-brand-cream px-8 md:px-12 lg:px-16 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left col */}
        <div>
          <h2
            ref={headlineRef}
            id="sustainability-heading"
            className="text-headline text-brand-dark mb-8 opacity-0"
          >
            Un ecosistema donde nada se desperdicia.
          </h2>
          <p
            ref={bodyRef}
            className="text-brand-muted text-lg leading-relaxed max-w-md opacity-0"
          >
            Creemos que el mejor residuo es el que vuelve a ser útil. Facilitamos una red inteligente donde emprendedores y empresas intercambian subproductos, impulsando la sostenibilidad y creando nuevas oportunidades.
          </p>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-8">
          <div
            ref={imageRef}
            className="rounded-xl overflow-hidden aspect-[4/3] bg-stone-200 opacity-0"
            style={{
              backgroundImage:
                "url('https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2025-PT-Mex/procesos112.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <ul ref={metricsRef} className="divide-y divide-brand-border">
            {METRICS.map((metric, i) => (
              <li
                key={i}
                className="flex items-center gap-4 py-4 opacity-0"
              >
                <button
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center shrink-0 text-brand-orange hover:border-brand-orange transition-colors"
                  aria-label={`Learn more: ${metric.label}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <span className="text-brand-dark text-base">{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
