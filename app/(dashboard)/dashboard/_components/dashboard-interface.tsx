"use client"
import { Game } from "@/lib/types"
import { DashboardHeader } from "./dashboard-header"
import { QuizStarter } from "./quiz-starter"
import { RecentQuizzes } from "./recent-quizzes"

type DashboardInterfaceProps = {
  recentQuizzes: (Game & { score: number; totalQuestions: number })[]
  averageScore: number
}

export default function DashboardInterface({ 
  recentQuizzes, 
  averageScore 
}: DashboardInterfaceProps) {
  return (
    <>
      <DashboardHeader 
        title="Your Dashboard" 
        subtitle="Track your progress and start new quizzes" 
      />
      <QuizStarter averageScore={averageScore} />
      <RecentQuizzes quizzes={recentQuizzes} />
    </>
  )
}