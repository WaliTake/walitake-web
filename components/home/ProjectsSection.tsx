'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

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
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleProjectChange = (index: number) => {
    if (!imageRef.current || index === activeProject) return

    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 1.03,
      duration: 0.3,
      ease: 'expo.in',
      onComplete: () => {
        setActiveProject(index)
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' }
        )
      },
    })
  }

  const project = PROJECTS[activeProject]

  return (
    <section
      ref={sectionRef}
      id="our-projects"
      aria-labelledby="projects-heading"
      className="bg-brand-cream"
    >
      {/* Full-width hero image */}
      <div className="relative w-full aspect-[16/7] overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${project.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Dot indicators */}
        <div ref={dotsRef} className="absolute bottom-6 left-8 flex gap-3">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              id={`project-dot-${i}`}
              aria-label={`View project ${i + 1}`}
              onClick={() => handleProjectChange(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeProject
                  ? 'bg-brand-orange scale-110'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Project info overlay */}
        <div className="absolute bottom-6 right-8 text-right">
          <p className="text-white/60 text-sm">{project.category}</p>
          <p className="text-white font-medium">{project.location} · {project.year}</p>
        </div>
      </div>

      {/* Label and title */}
      <div className="px-8 md:px-12 lg:px-16 py-16">
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
