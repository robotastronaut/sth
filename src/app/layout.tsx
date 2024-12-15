import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AdvocateFilterProvider } from './advocates'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solace Candidate Assignment',
  description: 'Show us what you got',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AdvocateFilterProvider>{children}</AdvocateFilterProvider>
      </body>
    </html>
  )
}
