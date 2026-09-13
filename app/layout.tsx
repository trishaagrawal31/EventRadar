import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EventRadar: Find your people. Find your next thing.',
  description: 'A centralized campus event discovery hub for finding clubs, free food, workshops, and the moments that make campus feel like home.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/eventradar-favicon.svg', type: 'image/svg+xml' }],
    apple: '/eventradar-favicon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f1e9',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
