"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
    id: string
    question: string
    options: string[]
    answer: string
    userAnswer: string
    isCorrect: boolean
}

interface QuestionReviewProps {
    questions: Question[]
}

export function QuestionReview({ questions }: QuestionReviewProps) {


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-white mb-6">Question Review</h2>

            <div className="space-y-6">
                {questions.map((question, index) => (
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.5, duration: 0.5 }}
                    >
                        <Card
                            className={`border-l-4 ${question.isCorrect ? "border-l-green-500" : "border-l-red-500"
                                } bg-slate-900 border-slate-800 shadow-lg`}
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg text-white flex items-start gap-3">
                                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-white">
                                        {index + 1}
                                    </span>
                                    <span>{question.question}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 pl-11">
                                    {question.options.map((option) => (
                                        <div
                                            key={option}
                                            className={`p-3 rounded-md flex items-center ${option === question.userAnswer && question.isCorrect
                                                ? "bg-green-500/20 border border-green-500/30"
                                                : option === question.userAnswer && !question.isCorrect
                                                    ? "bg-red-500/20 border border-red-500/30"
                                                    : "bg-slate-800 border border-slate-700"
                                                }`}
                                        >
                                            <span
                                                className={
                                                    option === question.answer
                                                        ? "text-green-300"
                                                        : option === question.userAnswer && !question.isCorrect
                                                            ? "text-red-300"
                                                            : "text-slate-300"
                                                }
                                            >
                                                {option}
                                            </span>
                                            {option === question.answer && <CheckCircle className="ml-auto h-5 w-5 text-green-400" />}
                                            {option === question.userAnswer && !question.isCorrect && (
                                                <XCircle className="ml-auto h-5 w-5 text-red-400" />
                                            )}
                                        </div>
                                    ))}

                                    {!question.isCorrect && (
                                        <div className="mt-4 p-3 bg-slate-800 border border-slate-700 rounded-md">
                                            <p className="text-sm text-blue-300 font-medium mb-1">Correct Answer:</p>
                                            <p className="text-green-300">{question.answer}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
