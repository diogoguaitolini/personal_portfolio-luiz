"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { getProjectById } from "@/lib/projects"
import type { Project } from "@/lib/projects"

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const projectData = getProjectById(params.id as string)
      if (projectData) {
        setProject(projectData)
      } else {
        // Project not found, redirect to work page
        router.push("/work")
      }
      setLoading(false)
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Image and Project Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-white rounded-lg overflow-hidden aspect-square">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold mb-1">{project.title}</h1>
              <p className="text-xl text-gray-400 mb-2">{project.subtitle}</p>
              <p className="text-sm text-gray-500 mb-6">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </p>

              {/* Technology Tags - Styled like About page */}
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="relative group"
                  >
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

                    {/* Skill tag content */}
                    <div className="relative px-4 py-2 bg-gray-900 rounded-full text-sm text-white z-10 transition-all duration-300 group-hover:bg-transparent">
                      {tech}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Project Details */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Overview Section */}
              <section>
                <h2 className="text-xl font-bold mb-3">Overview</h2>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">{project.content.overview}</p>
              </section>

              {/* Background Section */}
              <section>
                <h2 className="text-xl font-bold mb-3">Background</h2>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">{project.content.background}</p>
              </section>

              {/* Objectives Section */}
              <section>
                <h2 className="text-xl font-bold mb-3">Objectives</h2>
                <p className="text-gray-300 text-sm mb-2 text-justify">
                  List the specific goals of the project. These should be clear and measurable, providing a target for
                  what the project aimed to accomplish.
                </p>
                <div className="pl-5">
                  <ol className="list-decimal text-gray-300 text-sm space-y-1">
                    {project.content.objectives.map((objective, index) => (
                      <li key={index} className="text-justify">{objective}</li>
                    ))}
                  </ol>
                </div>
              </section>

              {/* Implementation Section */}
              <section>
                <h2 className="text-xl font-bold mb-3">Implementation</h2>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">{project.content.implementation}</p>
              </section>

              {/* Challenges and Solutions Section */}
              <section>
                <h2 className="text-xl font-bold mb-3">Challenges and Solutions</h2>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">{project.content.challenges}</p>
              </section>

              {/* Results and Impact Section */}
              <section>
                <h2 className="text-xl font-bold mb-3">Results and Impact</h2>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">{project.content.results}</p>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
