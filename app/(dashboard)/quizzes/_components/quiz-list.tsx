"use client"
import { Game } from "@/lib/types"
import { motion } from "framer-motion"
import { QuizItem } from "./quiz-item"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

type QuizListProps = {
  quizzes: (Game & { score: number; totalQuestions: number })[]
}

export function QuizList({ quizzes }: QuizListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div>
      {quizzes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-16 bg-slate-900 rounded-xl border border-slate-800"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">No quizzes yet</h3>
            <p className="text-slate-400 mb-6">You haven't created any quizzes yet. Start by creating your first quiz.</p>
            <Link href="/play/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create New Quiz
              </motion.button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quizzes.map((quiz, index) => (
            <QuizItem key={quiz.id} quiz={quiz} index={index} />
          ))}
          <Link href="/play/new">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer h-full min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            >
              <PlusCircle className="w-12 h-12 mb-3" />
              <p className="font-medium">Create New Quiz</p>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
