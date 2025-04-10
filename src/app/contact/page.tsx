"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to send message')
        }
        return res.json()
      })
      .then(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setShowThankYou(true)

        // Reset form
        if (formRef.current) {
          formRef.current.reset()
        }
        setFormState({ name: "", email: "", message: "" })

        // Hide thank you message after a delay
        setTimeout(() => {
          setShowThankYou(false)
          setTimeout(() => {
            setIsSubmitted(false)
          }, 500)
        }, 2000)
      })
      .catch((error) => {
        console.error('Error sending message:', error)
        setIsSubmitting(false)
        // Here you could also add error handling UI state
      })
  }

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
            Contact Me
          </motion.h1>
          <p className="text-2xl md:text-3xl text-white handwritten font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Let's Talk
          </p>
        </div>

        {/* LinkedIn and Email Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <Link
            href="https://www.linkedin.com/in/luiz-di-grado/"
            target="_blank"
            rel="noopener noreferrer"
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
            <div className="relative px-6 py-2 bg-gray-900 rounded-full text-white z-10 transition-all duration-300 group-hover:bg-transparent">
              LinkedIn
            </div>
          </Link>

          <Link href="mailto:luizf.gdigrado@gmail.com" className="relative group">
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
            <div className="relative px-6 py-2 bg-gray-900 rounded-full text-white z-10 transition-all duration-300 group-hover:bg-transparent">
              Email
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="focus:outline-none disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ width: 48, height: 48 }}
                        animate={{ width: 48, height: 48 }}
                        exit={{ width: 48, height: 48 }}
                        className="relative"
                      >
                        {/* Circular gradient border */}
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #ff8a00, #e53e73, #9747ff, #e53e73)",
                            backgroundSize: "300% 100%",
                            animation: "gradientMove 3s linear infinite",
                          }}
                        ></div>

                        {/* Button inner */}
                        <div className="absolute inset-[2px] bg-gray-900 rounded-full flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      </motion.div>
                    ) : showThankYou ? (
                      <motion.div
                        key="thanks"
                        initial={{ width: 48, height: 48 }}
                        animate={{ width: 120, height: 48 }}
                        exit={{ width: 48, height: 48 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        {/* Circular gradient border */}
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #ff8a00, #e53e73, #9747ff, #e53e73)",
                            backgroundSize: "300% 100%",
                            animation: "gradientMove 3s linear infinite",
                          }}
                        ></div>

                        {/* Button inner */}
                        <div className="absolute inset-[2px] bg-gray-900 rounded-full flex items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-white font-medium"
                          >
                            Thank you!
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrow"
                        initial={{ width: 48, height: 48 }}
                        animate={{ width: 48, height: 48 }}
                        exit={{ width: 48, height: 48 }}
                        className="circular-arrow-button"
                        whileHover={{ scale: 1.1 }}
                      >
                        {/* Circular gradient border with animation */}
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #ff8a00, #e53e73, #9747ff, #e53e73)",
                            backgroundSize: "300% 100%",
                            animation: "gradientMove 3s linear infinite",
                          }}
                        ></div>

                        {/* Button inner */}
                        <div className="absolute inset-[2px] bg-gray-900 rounded-full flex items-center justify-center">
                          {/* Arrow with animated gradient */}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12h14M12 5l7 7-7 7"
                              stroke="url(#sendArrowGradient)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="sendArrowGradient"
                                x1="5"
                                y1="12"
                                x2="19"
                                y2="12"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset="0%" stopColor="#ff8a00">
                                  <animate
                                    attributeName="stop-color"
                                    values="#ff8a00; #e53e73; #9747ff; #ff8a00"
                                    dur="3s"
                                    repeatCount="indefinite"
                                  />
                                </stop>
                                <stop offset="50%" stopColor="#e53e73">
                                  <animate
                                    attributeName="stop-color"
                                    values="#e53e73; #9747ff; #ff8a00; #e53e73"
                                    dur="3s"
                                    repeatCount="indefinite"
                                  />
                                </stop>
                                <stop offset="100%" stopColor="#9747ff">
                                  <animate
                                    attributeName="stop-color"
                                    values="#9747ff; #ff8a00; #e53e73; #9747ff"
                                    dur="3s"
                                    repeatCount="indefinite"
                                  />
                                </stop>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
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
