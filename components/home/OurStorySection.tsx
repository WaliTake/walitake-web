'use client'

import { useEffect, useRef } from 'react'
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
            },
          }
        )
      }

      // Gallery images cascade in
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
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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

  return (
    <section
      ref={sectionRef}
      id="our-story"
      aria-labelledby="our-story-heading"
      // Nota: Si quieres que el fondo sea 100% blanco como en tu inspiración, 
      // cambia "bg-brand-cream" por "bg-white"
      className="bg-brand-cream px-8 md:px-12 lg:px-16 py-24 md:py-32"
    >
      {/* Header row - Estructura ajustada para alinear con la inspiración */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16 md:mb-20">
        
        {/* Columna Izquierda: Etiqueta con ancho fijo en desktop (md:w-64) */}
        <div ref={labelRef} className="section-label opacity-0 shrink-0 md:w-64 pt-2">
          <span 
            id="our-story-heading" 
            className="text-sm font-bold tracking-wide text-brand-dark uppercase"
          >
            <span className="text-orange-500 mr-1 font-bold">/</span> 
            WALITAKe
          </span>
        </div>

        {/* Columna Derecha: Texto Principal más grande y en un bloque */}
        <p 
          ref={textRef} 
          className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-brand-dark max-w-4xl"
        >
          {wordNodes}
        </p>

      </div>

      {/* 3-column image grid */}
      <div
        ref={galleryRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
              className="w-full h-full object-cover transition-transform duration-700 ease-expo-out hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}