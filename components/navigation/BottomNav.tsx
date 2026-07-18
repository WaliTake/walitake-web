'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Contact', href: '/contact' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  // Detect scroll to collapse nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mount animation — slide up from below
  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.6 }
    )
  }, [])

  const toggleMenu = () => setIsExpanded((prev) => !prev)

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 opacity-0"
    >
      <div
        ref={pillRef}
        className={`
          pill transition-all duration-500
          ${isExpanded ? 'shadow-2xl' : 'shadow-lg'}
          ${isScrolled && !isExpanded ? 'opacity-70 hover:opacity-100' : 'opacity-100'}
        `}
      >
        {/* Orange dot trigger */}
        <button
          id="nav-toggle"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
          className="pill-dot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <span
            className="block transition-transform duration-300"
            style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              {isExpanded ? (
                // × icon
                <>
                  <line x1="3" y1="3" x2="15" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="3" x2="3" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                // ↓ arrow
                <>
                  <line x1="9" y1="2" x2="9" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="4,9 9,14 14,9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
          </span>
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'text-brand-dark font-semibold'
                    : 'text-stone-600 hover:text-brand-dark'
                  }
                `}
                onClick={() => setIsExpanded(false)}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
