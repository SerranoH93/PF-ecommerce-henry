"use client"

// import type { Metadata } from "next";
import NavBar from '@/components/NavBar'
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Moda Urbana",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <NavBar />
        {children}
        
       <Footer/>
        </body>
    </html>
  );
}
