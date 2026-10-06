import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import QueryProvider from '@/components/QueryProvider/QueryProvider'
import JanusAuthBoundary from '@/components/Authentication/JanusAuthBoundary'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Janus Journey',
  description: 'Organize your tasks and make progress at your own pace.'
}

/**
 * Provides the shared HTML document structure for the application.
 *
 * @param children - Route content rendered inside the document body.
 * @returns The application root layout.
 */
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col has-[[data-mobile-nav-open]]:overflow-hidden lg:has-[[data-mobile-nav-open]]:overflow-visible">
        <QueryProvider>
          <JanusAuthBoundary>{children}</JanusAuthBoundary>
        </QueryProvider>
      </body>
    </html>
  )
}
