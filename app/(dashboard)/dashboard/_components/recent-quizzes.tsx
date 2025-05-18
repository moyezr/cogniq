"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Game } from "@/lib/types" 
import { QuizCard } from "./quiz-card"
import Link from "next/link"

type RecentQuizzesProps = {
  quizzes: (Game & { score: number; totalQuestions: number })[];
}

export function RecentQuizzes({ quizzes }: RecentQuizzesProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Recent Quizzes</h2>
        <Link href={"/quizzes"} className={buttonVariants({ variant: "ghost", className:"text-slate-400 hover:text-white hover:bg-slate-800"})}>
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <QuizCard key={quiz.id} quiz={quiz} index={index} />
        ))}
        {quizzes.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12 text-slate-400"
          >
            <p>You haven't taken any quizzes yet. Start your first quiz to see your progress!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
