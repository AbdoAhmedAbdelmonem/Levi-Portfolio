import type React from "react"
import type { Metadata } from "next"
import { Syne, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Abdo Ahmed | Full Stack Developer",
  description: "Full Stack Developer from Alexandria, Egypt. Building digital experiences that make an impact with React, Next.js, Python, and more.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "Python", "Alexandria", "Egypt", "Abdo Ahmed"],
  authors: [{ name: "Abdo Ahmed" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
