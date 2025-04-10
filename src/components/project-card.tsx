"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  subtitle: string
  image: string
  href: string
}

export function ProjectCard({
  title,
  subtitle,
  image,
  href,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={href}>
      <motion.div
        className="relative w-full h-[232px] rounded-[20px] overflow-hidden group"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: "linear-gradient(180deg, #FE9903 0%, #802396 53%, #0444A8 100%)",
        }}
      >
        {/* Card content */}
        <div className="relative h-full w-full rounded-[20px] overflow-hidden flex flex-col z-20 p-2">
          {/* White content area (top part for image) */}
          <div className="bg-white w-full h-[80%] relative rounded-[12px] overflow-hidden mb-2">
            {image && (
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
          </div>
          {/* Text content at bottom */}
          <div className="flex flex-col justify-end h-[47%] px-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-blue-200">{subtitle}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
