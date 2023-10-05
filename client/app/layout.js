'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { redirect } from "next/navigation";
import { useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Conversa',
  description: 'made by mahmoud',
}

export default  function RootLayout({ children }) {


    const [canIn,setcanIn] = useState(false)
    const pathname = usePathname();

// useEffect(()=>{
//   async function fatchData(){

//      const auth = await fetch("http://localhost:4000/auth", {
//        cache: "no-cache",
//      });
//      const authenticated = await auth.json();

//      if (authenticated.isauth=== "No" ) {
//        setcanIn(false)
//        console.log(pathname);
//      }
//      else
//      {setcanIn(true)}
//   }
 
// fatchData()


   
// })
  
// if (!canIn && pathname != "/login" && pathname != "/sign") {
//   redirect("/login");
// }
  
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="scrollbar" id="style-1">
          <div className="force-overflow"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
