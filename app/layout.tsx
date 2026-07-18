import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import BottomNav from '@/components/navigation/BottomNav'
import PageWipe from '@/components/ui/PageWipe'

export const metadata: Metadata = {
  title: 'WaliTake — Think Forward',
  description:
    'A boutique family office building long-term value in commercial real estate, timberland, and ranchland.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    title: 'WaliTake — Think Forward',
    description:
      'A boutique family office building long-term value in commercial real estate, timberland, and ranchland.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScrollProvider>
          <PageWipe />
          {children}
          <BottomNav />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
