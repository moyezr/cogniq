"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"
import { triggerSuccessConfetti } from "./confettiUtils"

interface ResultsSummaryProps {
  score: number
  totalQuestions: number
}

export function ResultsSummary({ score, totalQuestions }: ResultsSummaryProps) {

    console.log("score", score)
  console.log("totalQuestions", totalQuestions)
  const scorePercentage = (score / totalQuestions) * 100
    useEffect(() => {  
    // Trigger confetti if score is good
    triggerSuccessConfetti(scorePercentage)
  }, [scorePercentage])
  // Determine feedback based on score
  const getFeedback = () => {
    if (scorePercentage >= 80) {
      return {
        title: "Outstanding!",
        message: "You're a quiz genius! Your knowledge is truly impressive.",
        color: "text-green-400",
      }
    } else if (scorePercentage >= 60) {
      return {
        title: "Good Job!",
        message: "You've got solid knowledge. A bit more study and you'll be an expert!",
        color: "text-blue-400",
      }
    } else if (scorePercentage >= 40) {
      return {
        title: "Not Bad!",
        message: "You're on the right track. Keep learning and you'll improve!",
        color: "text-yellow-400",
      }
    } else {
      return {
        title: "Room for Improvement",
        message: "Don't worry! Everyone starts somewhere. Keep practicing!",
        color: "text-red-400",
      }
    }
  }

  const feedback = getFeedback()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-12"
    >
      <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className={`text-3xl font-bold mb-2 ${feedback.color}`}>{feedback.title}</h2>
              <p className="text-slate-400 mb-4 max-w-md">{feedback.message}</p>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400">Score</p>
                  <p className="text-2xl font-bold text-white">
                    {score}/{totalQuestions}
                  </p>
                </div>
                <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400">Percentage</p>
                  <p className="text-2xl font-bold text-white">{scorePercentage}%</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                <circle
                  className="text-slate-800 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <motion.circle
                  className={`${
                    scorePercentage >= 70
                      ? "text-green-500"
                      : scorePercentage >= 40
                        ? "text-yellow-500"
                        : "text-red-500"
                  } stroke-current`}
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{
                    strokeDashoffset: 251.2 - (scorePercentage / 100) * 251.2,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                ></motion.circle>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-3xl font-bold text-white"
                >
                  {scorePercentage}%
                </motion.p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
