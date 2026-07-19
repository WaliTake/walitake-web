'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_IMAGES = [
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoinjMSVDEmsNjiRLZ8inDCxF3VHdVNVrC114hD-ig41yJ8GZpfuXPum6X&s=10',
    alt: 'Commercial building exterior',
  },
  {
    src: 'https://solanasrecuperaciones.es/wp-content/uploads/2023/10/Proceso-de-reciclaje-de-papel-y-carton-e1696972851933.jpg',
    alt: 'Modern architecture detail',
  },
  {
    src: 'https://imagenes.elpais.com/resizer/v2/54HMYV77NBHPZO2DB7L625QXQ4.png?auth=02e74b4cfe23dd420c782d47582ca3d99ee8f4c701499b969617018814712d60&width=1200',
    alt: 'Industrial warehouse building',
  },
]

export default function OurStorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Mobile thumbnail slider state
  const [activeImage, setActiveImage] = useState(0)
  const mobileMainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade
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

      // Headline words stagger (Animación en cascada)
      const words = textRef.current?.querySelectorAll('.word')
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              end: 'top 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // Gallery images cascade in — desktop only
      const images = galleryRef.current?.querySelectorAll('.gallery-item')
      if (images) {
        gsap.fromTo(
          images,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 80%',
              end: 'top 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Mobile strip click ──────────────────────────────────────────────
  const handleStripClick = (index: number) => {
    if (index === activeImage) return

    gsap.to(mobileMainRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.25,
      ease: 'expo.in',
      onComplete: () => {
        setActiveImage(index)
        gsap.fromTo(
          mobileMainRef.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'expo.out' }
        )
      },
    })
  }

  // Texto limpio, sin letras extrañas
  const storyText =
    'Lo que para una empresa es un residuo, para otra puede convertirse en su materia prima. Por eso creamos un espacio que conecta negocios para convertir materiales descartados en activos.'

  // División del texto con espacios nativos de React para proteger el salto de línea
  const wordNodes = storyText.trim().split(/\s+/).map((word, i) => (
    <span key={i}>
      <span className="word inline-block">{word}</span>
      {" "}
    </span>
  ))

  const activeImg = GALLERY_IMAGES[activeImage]

  return (
    <section
      ref={sectionRef}
      id="our-story"
      aria-labelledby="our-story-heading"
      className="bg-brand-cream px-8 md:px-12 lg:px-16 py-24 md:py-32"
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16 md:mb-20">

        {/* Columna Izquierda: Etiqueta */}
        <div ref={labelRef} className="section-label opacity-0 shrink-0 md:w-64 pt-2">
          <span
            id="our-story-heading"
            className="text-sm font-bold tracking-wide text-brand-dark uppercase"
          >
            <span className="text-orange-500 mr-1 font-bold">/</span>
            WALITAKE
          </span>
        </div>

        {/* Columna Derecha: Texto Principal */}
        <p
          ref={textRef}
          className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-brand-dark max-w-4xl"
        >
          {wordNodes}
        </p>

      </div>

      {/* ══ MOBILE: Thumbnail Slider ══════════════════════════════════════ */}
      <div className="md:hidden -mx-8 overflow-hidden">
        <div
          className="flex w-full"
          style={{ height: '58vw', minHeight: '230px', maxHeight: '360px' }}
        >
          {/* Main image — active, 4:3-ish */}
          <div
            className="relative flex-shrink-0 overflow-hidden"
            style={{ width: '72%' }}
          >
            <div
              ref={mobileMainRef}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('${activeImg.src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* Pill indicators */}
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {GALLERY_IMAGES.map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-300 ${
                    i === activeImage
                      ? 'w-4 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strips — inactive images */}
          <div className="flex flex-row flex-1 gap-[3px] pl-[3px]">
            {GALLERY_IMAGES.map((img, i) => {
              if (i === activeImage) return null
              return (
                <button
                  key={i}
                  id={`gallery-strip-${i}`}
                  aria-label={img.alt}
                  onClick={() => handleStripClick(i)}
                  className="relative flex-1 overflow-hidden group focus:outline-none"
                  style={{ minWidth: 0 }}
                >
                  {/* Strip background */}
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${img.src}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  {/* Dark scrim — lightens on hover */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-colors duration-300" />
                  {/* "+" hint icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-white drop-shadow"
                    >
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══ DESKTOP: 3-column image grid (original) ══════════════════════ */}
      <div
        ref={galleryRef}
        className="hidden md:grid grid-cols-3 gap-4"
      >
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={i}
            className="gallery-item overflow-hidden rounded-lg aspect-[4/3] bg-stone-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}