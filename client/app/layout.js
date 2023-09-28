import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import man from './media/1.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Conversa',
  description: 'made by mahmoud',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
      <div className="scrollbar" id="style-1">
      <div className="force-overflow"></div>
      </div>
     
      {children}</body>
    </html>
  )
}
