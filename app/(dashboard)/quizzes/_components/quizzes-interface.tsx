"use client"
import { Game } from "@/lib/types"
import { QuizList } from "./quiz-list"
import { QuizzesHeader } from "./quizzes-header"

type QuizzesInterfaceProps = {
    quizzes: (Game & { score: number; totalQuestions: number })[]
}

export default function QuizzesInterface({
    quizzes
}: QuizzesInterfaceProps) {
    return (
        <>
            <QuizzesHeader
                title="Your Quizzes"
                subtitle="All the quizzes you've created"
                quizCount={quizzes.length}
            />
            <QuizList quizzes={quizzes} />
        </>
    )
}
