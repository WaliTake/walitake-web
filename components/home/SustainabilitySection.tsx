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
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
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
          },
        }
      )

      // Animación del titular
      const words = headlineRef.current?.querySelectorAll('.word')
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Body text
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 82%',
          },
        }
      )

      // Image reveal - Efecto barrido
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
          },
        }
      )

      // Metrics stagger
      const items = metricsRef.current?.querySelectorAll('li')
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
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

  const headlineText = 'Un ecosistema donde nada se desperdicia.'
  const headlineNodes = headlineText.trim().split(/\s+/).map((word, i) => (
    <span key={i}>
      <span className="word inline-block">{word}</span>
      {" "}
    </span>
  ))

  return (
    //AAAAAAA
    <section
      ref={sectionRef}
      id="sustainability"
      aria-labelledby="sustainability-heading"
      // CAMBIO 1: Reducimos px-8 a px-5 en móviles para aprovechar mejor la pantalla
      className="bg-white px-5 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-[1400px] mx-auto">
        
        {/* Columna Izquierda */}
        <div className="flex flex-col lg:sticky lg:top-32 lg:pr-8">
          


          {/* CAMBIO 2: Agregamos w-full en móviles y limitamos el ancho máximo solo en desktop (lg:max-w-xl) */}
          <h2
            ref={headlineRef}
            id="sustainability-heading"
            className="text-[3rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-medium leading-[1.05] tracking-tighter text-[#111111] mb-8 w-full lg:max-w-xl"
          >
            {headlineNodes}
          </h2>

          {/* CAMBIO 3: Agregamos w-full en móviles y limitamos a 420px solo en desktop (lg:max-w-[420px]) */}
          <p
            ref={bodyRef}
            className="text-[#666666] font-light text-2xl md:text-2xl leading-[1.6] w-full lg:max-w-[420px] opacity-0"
          >
            Creemos que el mejor residuo es el que vuelve a ser útil. Facilitamos una red inteligente donde emprendedores y empresas intercambian subproductos, impulsando la sostenibilidad y creando nuevas oportunidades.
          </p>
        </div>
        {/* Columna Derecha */}
        <div className="flex flex-col">
          
          {/* Imagen Rectangular (Sin esquinas redondeadas) */}
          <div
            ref={imageRef}
            className="w-full aspect-[4/3] md:aspect-[3/2] bg-stone-100 opacity-0"
            style={{
              backgroundImage:
                "url('https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2025-PT-Mex/procesos112.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Métricas Minimalistas */}
          <ul ref={metricsRef} className="mt-8 flex flex-col">
            {METRICS.map((metric, i) => (
              <li
                key={i}
                // Bordes delgados y espaciado limpio
                className="flex items-center gap-6 py-5 border-b border-gray-200 last:border-b-0 opacity-0"
              >
                {/* Botón Circular con SVG de Más (+) Fino */}
                <button
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center shrink-0 text-[#ff5a2c] hover:border-[#ff5a2c] transition-colors"
                  aria-label={`Learn more: ${metric.label}`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
                {/* Texto gris para emular la imagen */}
                <span className="text-[#888888] font-light text-base md:text-lg">
                  {metric.label}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}