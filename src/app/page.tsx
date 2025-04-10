"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCarousel } from "@/components/project-carousel"
import { getFeaturedProjects } from "@/lib/projects"
import { ArrowRight } from "lucide-react"

// Typing animation component
const TypewriterText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    // Start typing after the specified delay
    const startTimer = setTimeout(() => {
      setStartTyping(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!startTyping) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 80) // Typing speed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, startTyping])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && <span className="inline-block w-[2px] h-[1em] bg-white animate-pulse ml-1"></span>}
    </span>
  )
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showUpButton, setShowUpButton] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const secondSectionRef = useRef<HTMLDivElement>(null)

  // Get featured projects from the data file
  const featuredProjects = getFeaturedProjects()

  // Handle scroll events to determine which section is visible
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !secondSectionRef.current) return

      const heroRect = heroRef.current.getBoundingClientRect()
      const secondSectionRect = secondSectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Hero section is visible if its top is in view or just above
      const heroVisible = heroRect.top > -windowHeight / 2 && heroRect.bottom > 0

      // Second section is visible if it occupies most of the viewport
      const secondSectionVisible =
        secondSectionRect.top < windowHeight / 3 && secondSectionRect.bottom > windowHeight / 2

      if (heroVisible && !secondSectionVisible) {
        setCurrentSection(0)
        setShowUpButton(false)
      } else if (secondSectionVisible) {
        setCurrentSection(1)

        // Only show up button after a delay when second section is fully visible
        if (secondSectionRect.top <= 0) {
          setTimeout(() => {
            setShowUpButton(true)
          }, 1000) // 1 second delay
        } else {
          setShowUpButton(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle arrow click
  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex === 0 && heroRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (sectionIndex === 1 && secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="relative">
      {/* Hero Section */}
      <div ref={heroRef} className="min-h-screen flex flex-col relative overflow-hidden" id="hero-section">
        {/* Main content centered vertically and horizontally */}
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center z-10">
            <div className="relative">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-7xl font-bold mb-12 font-montserrat leading-normal pb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: 'linear-gradient(180deg, #FE9903 0%, #802396 53%, #0444A8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Luiz Felipe Gama Di Grado
              </motion.h1>
              <AnimatePresence>
                <motion.p
                  className="text-2xl md:text-3xl font-bold text-white handwritten absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <TypewriterText text="Designing with Purpose, Engineering for Impact" delay={200} />
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Arrow positioned at bottom - only show when in hero section */}
        {currentSection === 0 && (
          <div className="flex justify-center pb-12 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              onClick={() => scrollToSection(1)}
            >
              <div className="inline-block cursor-pointer">
                <motion.div
                  className="circular-arrow-button"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Circular gradient border with color animation but no rotation */}
                    <circle cx="32" cy="32" r="31" stroke="url(#animatedCircleGradient)" strokeWidth="2" />

                    {/* Arrow with animated gradient */}
                    <path
                      d="M32 20V44M32 44L22 34M32 44L42 34"
                      stroke="url(#animatedArrowGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animated-arrow"
                    />

                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient
                        id="animatedCircleGradient"
                        x1="0"
                        y1="0"
                        x2="64"
                        y2="64"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#ec4899">
                          <animate
                            attributeName="stop-color"
                            values="#ec4899; #f97316; #3b82f6; #a855f7; #ec4899"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="33%" stopColor="#f97316">
                          <animate
                            attributeName="stop-color"
                            values="#f97316; #3b82f6; #a855f7; #ec4899; #f97316"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="66%" stopColor="#3b82f6">
                          <animate
                            attributeName="stop-color"
                            values="#3b82f6; #a855f7; #ec4899; #f97316; #3b82f6"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="100%" stopColor="#a855f7">
                          <animate
                            attributeName="stop-color"
                            values="#a855f7; #ec4899; #f97316; #3b82f6; #a855f7"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                      </linearGradient>

                      <linearGradient
                        id="animatedArrowGradient"
                        x1="32"
                        y1="20"
                        x2="32"
                        y2="44"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#a855f7">
                          <animate
                            attributeName="stop-color"
                            values="#a855f7; #3b82f6; #ec4899; #f97316; #a855f7"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="100%" stopColor="#3b82f6">
                          <animate
                            attributeName="stop-color"
                            values="#3b82f6; #ec4899; #f97316; #a855f7; #3b82f6"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[#121212]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Second Section - My Work */}
      <div ref={secondSectionRef} className="min-h-screen py-20 relative bg-[#121212]" id="work-section">
        {/* Up Arrow Button - Only show when second section is visible and after delay */}
        {showUpButton && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="inline-block cursor-pointer" onClick={() => scrollToSection(0)}>
              <motion.div
                className="circular-arrow-button"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Circular gradient border with color animation but no rotation */}
                  <circle cx="32" cy="32" r="31" stroke="url(#upCircleGradient)" strokeWidth="2" />

                  {/* Arrow with animated gradient */}
                  <path
                    d="M32 44V20M32 20L22 30M32 20L42 30"
                    stroke="url(#upArrowGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animated-arrow"
                  />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="upCircleGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ec4899">
                        <animate
                          attributeName="stop-color"
                          values="#ec4899; #f97316; #3b82f6; #a855f7; #ec4899"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="33%" stopColor="#f97316">
                        <animate
                          attributeName="stop-color"
                          values="#f97316; #3b82f6; #a855f7; #ec4899; #f97316"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="66%" stopColor="#3b82f6">
                        <animate
                          attributeName="stop-color"
                          values="#3b82f6; #a855f7; #ec4899; #f97316; #3b82f6"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#a855f7">
                        <animate
                          attributeName="stop-color"
                          values="#a855f7; #ec4899; #f97316; #3b82f6; #a855f7"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>

                    <linearGradient id="upArrowGradient" x1="32" y1="44" x2="32" y2="20" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#a855f7">
                        <animate
                          attributeName="stop-color"
                          values="#a855f7; #3b82f6; #ec4899; #f97316; #a855f7"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#3b82f6">
                        <animate
                          attributeName="stop-color"
                          values="#3b82f6; #ec4899; #f97316; #a855f7; #3b82f6"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 mt-20">
          {/* Title with gradient and handwritten overlay */}
          <div className="text-center mb-16 relative">
            <h2 
              className="text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-normal pb-3"
              style={{
                background: 'linear-gradient(180deg, #FE9903 0%, #802396 53%, #0444A8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              My Work
            </h2>
            <p className="text-2xl md:text-3xl text-white font-bold handwritten absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              What I&apos;ve Been Up To
            </p>
          </div>

          {/* Project Carousel */}
          <div className="mb-16">
            <ProjectCarousel projects={featuredProjects} />
          </div>

          {/* More Work Button */}
          <div className="flex justify-center mt-10">
            <Link href="/work">
              <motion.div className="relative group" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                {/* Glowing border */}
                <div
                  className="absolute -inset-[1px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, #ff8a00, #e53e73, #9747ff, #e53e73)",
                    backgroundSize: "300% 100%",
                    animation: "gradientMove 3s linear infinite",
                    filter: "blur(2px)",
                  }}
                ></div>

                {/* Button content */}
                <div className="relative px-6 py-3 bg-gray-900 rounded-full text-white z-10 transition-all duration-300 group-hover:bg-transparent flex items-center">
                  <span>More Work</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
