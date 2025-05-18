"use client"

import { motion } from "framer-motion"
import { ResultsHeader } from "./ResultsHeader"
import { ResultsSummary } from "./ResultsSummary"
import { QuestionReview } from "./QuestionReview"
export default function ResultInterface({ quiz, id }: { quiz: any, id: string }) {

    const score = quiz.questions.reduce((acc: any, question: any) => {
        return acc + (question.isCorrect ? 1 : 0)
    }, 0)



    const totalQuestions = quiz.questions.length


    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
    >
        <ResultsHeader topic={quiz.topic} quizId={id} />
        <ResultsSummary score={score} totalQuestions={totalQuestions} />
        <QuestionReview questions={quiz.questions} />
    </motion.div>
}
