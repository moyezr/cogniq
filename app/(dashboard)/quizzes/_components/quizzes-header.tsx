"use client"
import { motion } from "framer-motion"

type QuizzesHeaderProps = {
  title: string
  subtitle: string
  quizCount: number
}

export function QuizzesHeader({ title, subtitle, quizCount }: QuizzesHeaderProps) {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-slate-400 mt-2">{subtitle}</p>
        </div>
        <motion.div 
          className="mt-4 md:mt-0 bg-slate-800 rounded-lg px-4 py-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <span className="text-white font-medium">{quizCount}</span>
          <span className="text-slate-400 ml-2">
            {quizCount === 1 ? 'quiz' : 'quizzes'} in total
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
