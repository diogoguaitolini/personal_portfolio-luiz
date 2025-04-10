"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Resume", path: "/LUIZ_DI_GRADO_RESUME_2025.pdf", download: true },
  { name: "Contact", path: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Filter out Home button when on home page
  const displayedNavItems = navItems.filter((item) => {
    if (pathname === "/" && item.name === "Home") {
      return false
    }
    return true
  })

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md py-3" : "py-5",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-end items-center">
          <ul className="flex space-x-6">
            {displayedNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="nav-item relative px-4 py-2 rounded-full text-sm font-medium text-gray-400 transition-all duration-300"
                  {...(item.download ? { download: true, target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}
