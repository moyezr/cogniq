"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, Brain, Sparkles } from "lucide-react"

export default function Home() {
  
  const router = useRouter()
  const controls = useAnimation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    controls.start("visible")
  }, [controls])

  const handleGetStarted = () => {
   
      router.push("/dashboard")
  
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Particle animation */}
      <ParticleAnimation />

      {/* Glowing orb */}
      <div className="absolute top-1/4 -right-28 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-28 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10 max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 flex items-center justify-center gap-2"
          >
            <Sparkles className="text-blue-400 h-6 w-6" />
            <span className="text-blue-400 font-medium">AI-Powered Quiz Platform</span>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">
              CogniQ
            </h1>
            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600 mx-auto mb-10 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50"
              />
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.8, duration: 0.8 },
              },
            }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20"></div>
            <p className="relative text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-slate-300 leading-relaxed">
              Challenge your intellect with our AI-generated quizzes,
              <span className="text-blue-300"> tailored to expand your knowledge</span> and test your cognitive
              abilities.
            </p>
          </motion.div>

          <AnimatePresence>
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex justify-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="relative px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full shadow-lg shadow-blue-700/20 hover:shadow-blue-700/40 transition-all duration-300 text-lg"
                  >
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>


      </div>
    </main>
  )
}

// Particle animation component
function ParticleAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-0">
      {/* Floating particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500"
          initial={{
            opacity: Math.random() * 0.3 + 0.1,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.2 + 0.1,
          }}
          animate={{
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2, Math.random() * 0.3 + 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          initial={{
            opacity: Math.random() * 0.05 + 0.02,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 1 + 1,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: Math.random() * 50 + 50,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)`,
          }}
        />
      ))}

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  )
}
