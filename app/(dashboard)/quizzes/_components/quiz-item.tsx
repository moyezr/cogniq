"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Game } from "@/lib/types"
import { Clock, ArrowRight, Eye, Play, BarChart } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type QuizItemProps = {
  quiz: Game & { score: number; totalQuestions: number }
  index: number
}

export function QuizItem({ quiz, index }: QuizItemProps) {
  const scorePercentage = quiz.totalQuestions > 0 ? (quiz.score / quiz.totalQuestions) * 100 : 0
  
  // Animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      variants={item}
      layout
    >
      <Card className="h-full bg-slate-900 border-slate-800 hover:bg-slate-800/80 transition-colors duration-300 shadow-lg hover:shadow-xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-start">
            <span className="text-white truncate">{quiz.topic}</span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`text-sm px-2 py-1 rounded-full ${
                scorePercentage >= 70
                  ? "bg-green-500/20 text-green-300"
                  : scorePercentage >= 50
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-red-500/20 text-red-300"
              }`}
            >
              {quiz.score}/{quiz.totalQuestions}
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-slate-400 mb-4">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatDistanceToNow(new Date(quiz.timeStarted), { addSuffix: true })}</span>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-2.5 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scorePercentage}%` }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className={`h-2.5 rounded-full ${
                scorePercentage >= 70
                  ? "bg-green-500"
                  : scorePercentage >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            ></motion.div>
          </div>
          
          <div className="text-sm text-slate-400">
            <span>{quiz.questions?.length || 0} questions</span>
            {quiz.timeEnded && (
              <span className="ml-2">• Completed</span>
            )}
            {!quiz.timeEnded && (
              <span className="ml-2">• In progress</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Link href={`/results/${quiz.id}`} className="flex-1">
            <Button variant="outline" className="w-full text-slate-400 hover:text-white border-slate-700 hover:bg-slate-700">
              <Eye className="h-4 w-4 mr-2" /> Results
            </Button>
          </Link>
          <Link href={`/play/${quiz.id}`} className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Play className="h-4 w-4 mr-2" /> Play Again
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
