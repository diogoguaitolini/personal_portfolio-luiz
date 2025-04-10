"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/lib/projects"

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-advance carousel
  useEffect(() => {
    const startTimer = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
      }, 5000) // Change slide every 5 seconds
    }

    startTimer()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, projects.length])

  const handlePrevious = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  // Get indices for visible cards (5 cards visible at a time with center focus)
  const getVisibleIndices = () => {
    const indices = []
    const prev2 = (currentIndex - 2 + projects.length) % projects.length
    const prev1 = (currentIndex - 1 + projects.length) % projects.length
    const next1 = (currentIndex + 1) % projects.length
    const next2 = (currentIndex + 2) % projects.length

    indices.push(prev2, prev1, currentIndex, next1, next2)
    return indices
  }

  const visibleIndices = getVisibleIndices()

  // Handle drag events for the carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.clientX)
    // Don't set the global flag immediately to allow card clicks
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab"
    }
  }

  return (
    <div className="relative h-[400px] w-full">
      {/* Background with dark gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#080818] rounded-xl -z-10"></div>

      {/* Cards container - Enhanced 3D perspective */}
      <div 
        className="absolute inset-0 flex items-center justify-center perspective-[2000px] overflow-hidden"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Render cards from back to front */}
        {visibleIndices.map((index, i) => {
          // Position: -2 (far left), -1 (left), 0 (center), 1 (right), 2 (far right)
          const position = i - 2

          // Calculate z-index - higher value = closer to viewer
          const zIndex = 10 - Math.abs(position) * 2
          
          // Calculate scale and opacity based on position
          const scale = position === 0 ? 1 : position === -1 || position === 1 ? 0.85 : 0.7
          const opacity = position === 0 ? 1 : position === -1 || position === 1 ? 0.7 : 0.5

          // Calculate x-position for proper spacing
          let xPos = 0
          if (position === -2) xPos = -500
          else if (position === -1) xPos = -300
          else if (position === 1) xPos = 300
          else if (position === 2) xPos = 500

          // Apply blur to non-focused cards
          const blurAmount = position === 0 ? 0 : 1

          return (
            <motion.div 
              key={`card-${index}`}
              className="absolute"
              style={{ 
                zIndex: position === 0 ? 50 : zIndex,
                pointerEvents: position === 0 ? "auto" : "none"
              }}
              animate={{
                x: xPos,
                scale,
                opacity,
                rotateY: position * -8, // More pronounced rotation for better 3D effect
                z: position === 0 ? 100 : position * -50, // Enhanced 3D positioning
              }}
              transition={{
                duration: 0.5,
                ease: [0.19, 1.0, 0.22, 1.0], // Custom easing for smoother animation
              }}
            >
              <Link 
                href={`/work/${projects[index].id}`} 
                className={`block ${position === 0 ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <div
                  className="overflow-hidden cursor-pointer transform-gpu"
                  style={{
                    width: "625px", 
                    height: "375px",
                    transformStyle: "preserve-3d",
                    filter: `blur(${blurAmount}px)`,
                  }}
                >
                  {/* Card with clean borders */}
                  <div className="relative w-full h-full">
                    {/* Card content */}
                    <div className="relative h-full w-full rounded-[20px] overflow-hidden flex flex-col z-20 p-2"
                         style={{
                          background: "linear-gradient(180deg, #FE9903 0%, #802396 53%, #0444A8 100%)",
                         }}>
                      {/* White content area for image */}
                      <div className="bg-white w-full h-[60%] relative rounded-[12px] overflow-hidden">
                        {/* Add image here if available */}
                        {projects[index].image && (
                          <img 
                            src={projects[index].image}
                            alt={projects[index].title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Text content at bottom */}
                      <div className="px-3 pb-3 flex flex-col justify-center h-[37%]">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{projects[index].title}</h3>
                        <p className="text-lg text-blue-200">{projects[index].subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-[200]"
        aria-label="Previous project"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-[200]"
        aria-label="Next project"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators - moved lower */}
      <div className="absolute bottom-[-20px] left-0 right-0 flex justify-center mt-4 z-[200]">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
              }
            }}
            className={`mx-1 h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-6" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Add keyframes for the gradient animation */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}
