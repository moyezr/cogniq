"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Play } from "lucide-react"

type QuizStarterProps = {
  averageScore: number
}

export function QuizStarter({ averageScore }: QuizStarterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-12"
    >
      <Card className="bg-slate-900 border-slate-800 shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready for a challenge?</h2>
              <p className="text-slate-400 mb-4">
                Test your knowledge with our AI-powered quizzes tailored to your interests.
              </p>
              <Link
                href={"/play/new"}
                className={buttonVariants({ size: "lg", className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" })}
              >
                <Play className="mr-2 h-5 w-5" /> Start New Quiz
              </Link>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-inner">
              <div className="text-center">
                <p className="text-slate-400 mb-1">Your Average Score</p>
                <div className="text-4xl font-bold text-white mb-2">
                  {averageScore}%
                </div>
                <p className="text-slate-500 text-sm">Based on your last 10 quizzes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
