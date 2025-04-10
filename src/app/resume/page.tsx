"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"

export default function ResumePage() {
  const experiences = [
    {
      title: "Senior Product Engineer",
      company: "Tech Innovations Inc.",
      period: "2020 - Present",
      description:
        "Led cross-functional teams in developing IoT solutions for industrial applications. Designed and implemented embedded systems using C/C++ and Python. Created UI/UX designs for control interfaces.",
    },
    {
      title: "Product Designer",
      company: "Design Solutions Co.",
      period: "2018 - 2020",
      description:
        "Designed user interfaces for mobile and web applications. Conducted user research and usability testing. Created design systems and component libraries.",
    },
    {
      title: "Electrical Engineer",
      company: "Engineering Systems Ltd.",
      period: "2016 - 2018",
      description:
        "Designed and tested electronic circuits for consumer products. Developed firmware for microcontrollers. Collaborated with mechanical engineers on product integration.",
    },
  ]

  const education = [
    {
      degree: "Master of Science in Electrical Engineering",
      institution: "Technical University",
      year: "2016",
      description: "Specialized in embedded systems and IoT. Thesis on energy-efficient wireless sensor networks.",
    },
    {
      degree: "Bachelor of Engineering in Mechatronics",
      institution: "Engineering Institute",
      year: "2014",
      description: "Graduate with honors. Coursework included robotics, control systems, and product design.",
    },
  ]

  const skills = [
    {
      category: "Technical Skills",
      items: ["C/C++", "Python", "Embedded Systems", "IoT", "PCB Design", "Altium", "Fusion 360"],
    },
    { category: "Design Skills", items: ["UI/UX Design", "Figma", "Design Systems", "Prototyping", "User Research"] },
    { category: "Languages", items: ["English (Fluent)", "Portuguese (Native)", "Spanish (Intermediate)"] },
  ]

  return (
    <main className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Title Section with Gradient and Handwritten Overlay */}
        <div className="relative text-center mb-16">
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Resume
          </motion.h1>
          <p className="text-2xl md:text-3xl text-white handwritten absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            My Experience
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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

            {/* Button content */}
            <button className="relative px-6 py-3 bg-gray-900 rounded-full text-white z-10 transition-all duration-300 group-hover:bg-transparent flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-2">Experience</h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  {/* Subtle gradient line on the left */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-500 via-purple-500 to-blue-600 rounded-full"></div>

                  <div className="pl-4">
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-transparent bg-clip-text font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-400">{exp.period}</p>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education and Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-2">Education</h2>

            <div className="space-y-8 mb-12">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="relative group"
                >
                  {/* Subtle gradient line on the left */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-500 via-purple-500 to-blue-600 rounded-full"></div>

                  <div className="pl-4">
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-transparent bg-clip-text font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-400">{edu.year}</p>
                    </div>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-white border-b border-gray-800 pb-2">Skills</h2>

            <div className="space-y-6">
              {skills.map((skillGroup, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="font-medium text-white mb-3">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + groupIndex * 0.1 + index * 0.05 }}
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
                        <div className="relative px-3 py-1 bg-gray-900 rounded-full text-sm text-white z-10 transition-all duration-300 group-hover:bg-transparent">
                          {skill}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
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
