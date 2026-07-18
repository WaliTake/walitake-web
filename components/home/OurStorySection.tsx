'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
    alt: 'Commercial building exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    alt: 'Modern architecture detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80',
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

      // Headline words stagger
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

  const storyText =
    'After more than twenty years in the wood products industry, the Bertch family founded its capital venture in 2009 — investing in real estate in the western United States.'

  const wordNodes = storyText.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em]">
      {word}
    </span>
  ))

  return (
    <section
      ref={sectionRef}
      id="our-story"
      aria-labelledby="our-story-heading"
      className="bg-brand-cream px-8 md:px-12 lg:px-16 py-24 md:py-32"
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16 md:mb-20">
        <div ref={labelRef} className="section-label text-label opacity-0 shrink-0 pt-1">
          <span id="our-story-heading">OUR<br />STORY</span>
        </div>
        <p ref={textRef} className="text-headline text-brand-dark max-w-3xl">
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
