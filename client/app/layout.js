import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import man from './media/man.png'

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
      <nav>
          <div>Conversa</div>
            <div>
                <Link className='Link' href="/">Home</Link>
                <Link className='Link' href="/posts">posts</Link> 
                <Link className='Link' href="/login">login</Link>
                <Link className='Link' href="/sign">Sign up</Link>
            </div>
          <div><div className='avatar'><img height={32} width={32} src={man.src}/></div></div>
      </nav>
      {children}</body>
    </html>
  )
}
