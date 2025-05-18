"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface ResultsHeaderProps {
  topic: string
  quizId: string
}

export function ResultsHeader({ topic, quizId }: ResultsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Quiz Results</h1>
        <p className="text-slate-400">{topic}</p>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <Link href={`/play/${quizId}`}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
