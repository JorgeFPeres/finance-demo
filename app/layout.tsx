import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ReactQueryProvider } from '@/lib/service'
import Image from 'next/image'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Franq Finance',
  description: 'Financial dashboard for Franq, data in real time',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <nav className='border-b'>
          <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image
                src='/franq-logo.png'
                alt='Franq Logo'
                width={120}
                height={40}
                className='h-8 w-auto'
                priority
              />
            </Link>
          </div>
        </nav>
        <main className='flex-1 flex flex-col'>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </body>
    </html>
  )
}
