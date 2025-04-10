"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  const skills = [
    { name: "Embedded Systems", category: "technical" },
    { name: "IoT", category: "technical" },
    { name: "Prototyping", category: "technical" },
    { name: "UI/UX Design", category: "design" },
    { name: "Design System", category: "design" },
    { name: "Lean", category: "methodology" },
    { name: "Agile", category: "methodology" },
    { name: "Kaizen", category: "methodology" },
    { name: "Altium Designer", category: "tools" },
    { name: "Fusion 360", category: "tools" },
    { name: "Industrial Design", category: "design" },
    { name: "LTSpice", category: "tools" },
    { name: "Figma", category: "tools" },
    { name: "Microsoft Suite", category: "tools" },
    { name: "Asana", category: "tools" },
    { name: "C/C++", category: "programming" },
    { name: "Python", category: "programming" },
    { name: "MATLAB", category: "programming" },
    { name: "System Verilog", category: "programming" },
    { name: "Portuguese", category: "language" },
    { name: "Spanish", category: "language" },
  ]

  // Group skills into rows for better visual arrangement
  const skillRows = [skills.slice(0, 8), skills.slice(8, 16), skills.slice(16)]

  return (
    <main className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Title Section with Gradient and Handwritten Overlay */}
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
            About Me
          </motion.h1>
          <p className="text-2xl md:text-3xl text-white font-bold handwritten absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Among Many Things,
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          {/* Profile Image - Made larger with glowing effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3 flex justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Glowing background effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-600/30 blur-xl"></div>

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                <Image src="/Profile.svg" alt="Luiz F. Grado" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 text-gray-300"
            >
              <p className="text-xl text-justify">
                <span className="handwritten text-3xl text-white">I&apos;m a product-focused engineer and designer</span>{" "}
                passionate about building innovative, user-centered solutions that create real market impact. With a
                background in Electrical Engineering and Mechatronics, I bridge technical depth with strategic design
                thinking—crafting both hardware and digital products from concept to launch.
              </p>

              <p className="text-xl text-justify">
                My experience spans embedded systems and electronics, UI/UX design, venture building, prototyping, and
                product development across diverse industries. I've led initiatives in market research, financial
                modeling, client engagement, and project management, applying methodologies like Agile, Lean
                Manufacturing, and Value Stream Mapping to drive efficiency and innovation.
              </p>

              <p className="text-xl text-justify">
                Whether I&apos;m prototyping IoT devices or designing customer onboarding flows, I approach every challenge
                with a problem-solving mindset and a systems-level perspective. As a naturally extroverted communicator,
                I thrive in collaborative environments and am driven by a commitment to create scalable, user-friendly
                products backed by data and strategic go-to- market insight.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-4xl font-bold text-center mb-10 handwritten text-white">Skills</h2>

          <div className="flex flex-col items-center space-y-4">
            {skillRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center gap-3">
                {row.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + rowIndex * 0.1 + index * 0.05 }}
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
                      {skill.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add keyframes for the gradient animation if not already defined globally */}
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
    </main>
  )
}
