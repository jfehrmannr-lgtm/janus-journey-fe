import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import QueryProvider from '@/components/QueryProvider/QueryProvider'
import ToastProvider from '@/components/ToastProvider/ToastProvider'

import './globals.css'
import '../index.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: 'Janus Journey',
    template: '%s | Janus Journey'
  },
  icons: {
    icon: '/janus-journey-logo.svg'
  },
  description: 'Organize your journeys, folders, and tasks in one place.'
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
      <body className="flex min-h-full flex-col has-data-mobile-nav-open:overflow-hidden lg:has-data-mobile-nav-open:overflow-visible">
        <QueryProvider>{children}</QueryProvider>
        <ToastProvider />
      </body>
    </html>
  )
}
