"use client"

import type React from "react"
import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getProjectsByCategory, Project } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"

export default function WorkPage() {
  // Get projects by category
  const engineeringProjects = getProjectsByCategory("engineering")
  const digitalProjects = getProjectsByCategory("digital")

  // Refs for scrolling containers
  const engineeringRowRef = useRef<HTMLDivElement>(null)
  const digitalRowRef = useRef<HTMLDivElement>(null)

  // Function to handle button scroll
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (!ref.current) return
    const scrollAmount = 800 // Adjust scroll amount as needed
    const scrollLeft = ref.current.scrollLeft
    const newScrollLeft = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount
    ref.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  // Row Component with horizontal scrolling (no drag functionality)
  const ProjectRow = ({
    title,
    projects,
    scrollRef,
  }: {
    title: string
    projects: Project[]
    scrollRef: React.RefObject<HTMLDivElement>
  }) => {
    return (
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={() => scroll(scrollRef, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white -ml-5"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Scrollable container - no drag handling */}
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide py-4 px-1"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-[350px] project-card-wrapper">
                  <ProjectCard
                    title={project.title}
                    subtitle={project.subtitle}
                    image={project.image}
                    href={`/work/${project.id}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll(scrollRef, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white -mr-5"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-8">
        {/* Title Section */}
        <div className="relative text-center mb-16">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat leading-normal pb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(180deg, #FE9903 0%, #802396 53%, #0444A8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            My Work
          </motion.h1>
          <p className="text-2xl md:text-3xl text-white handwritten font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            What I&apos;ve Been Up To
          </p>
        </div>

        {/* Projects Rows */}
        <ProjectRow title="Engineering & Prototyping" projects={engineeringProjects} scrollRef={engineeringRowRef} />
        <ProjectRow title="Digital Products & UI/UX Design" projects={digitalProjects} scrollRef={digitalRowRef} />
      </div>

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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}
