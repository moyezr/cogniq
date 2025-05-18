"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, Play } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Game } from "@/lib/types"

type QuizCardProps = {
  quiz: Game & { score: number; totalQuestions: number };
  index: number;
}

export function QuizCard({ quiz, index }: QuizCardProps) {
  const scorePercentage = quiz.totalQuestions > 0 ? (quiz.score / quiz.totalQuestions) * 100 : 0;
  
  return (
    <motion.div
      key={quiz.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.5, duration: 0.5 }}
    >
      <Card className="bg-slate-900 border-slate-800 hover:bg-slate-800 transition-colors duration-300 shadow-lg hover:shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-start">
            <span className="text-white">{quiz.topic}</span>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                scorePercentage >= 70
                  ? "bg-green-500/20 text-green-300"
                  : scorePercentage >= 50
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-red-500/20 text-red-300"
              }`}
            >
              {quiz.score}/{quiz.totalQuestions}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-slate-400 mb-4">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{formatDistanceToNow(new Date(quiz.timeStarted), { addSuffix: true })}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/results/${quiz.id}`}>
            <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
              View Results
            </Button>
          </Link>
          <Link href={`/play/${quiz.id}`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Play className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
