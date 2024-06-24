"use client"

import type { Metadata } from "next";
import NavBar from '@/components/NavBar'
import { Inter } from "next/font/google";
import "./globals.css";
import Cards from '@/components/Cards/Cards'
import Footer from "@/components/Footer/Footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';


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
      <UserProvider>
        <body className={inter.className}>
        <NavBar />
        {children}
        
        <Footer/>
        </body>
      </UserProvider>
      </UserProvider>
    </html>
  );
}
