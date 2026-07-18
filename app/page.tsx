import HeroSection from '@/components/home/HeroSection'
import OurStorySection from '@/components/home/OurStorySection'
import ProjectsSection from '@/components/home/ProjectsSection'
import SustainabilitySection from '@/components/home/SustainabilitySection'
import MarqueeFooter from '@/components/home/MarqueeFooter'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <OurStorySection />
      <ProjectsSection />
      <SustainabilitySection />
      <MarqueeFooter />
    </main>
  )
}
