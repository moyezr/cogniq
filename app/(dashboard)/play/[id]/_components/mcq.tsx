"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
export default function MCQ({ quiz, id }: { quiz: any, id: string }) {
    const router = useRouter()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
    const [direction, setDirection] = useState<"next" | "prev">("next")
    const [isLoading, setIsLoading] = useState(false)
    const currentQuestion = quiz?.questions[currentQuestionIndex]
    const isFirstQuestion = currentQuestionIndex === 0
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option)
    }

    const handleNext = async () => {
        if (!selectedOption) {
            toast.error("Please select an answer before proceeding")
            return
        }

        // Save the user's answer
        setUserAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: selectedOption,
        }))

        if (isLastQuestion) {
            // Submit the quiz
            try {
                setIsLoading(true)
                const submitResponse = await fetch(`/api/game/${id}/submit`, {
                    method: "POST",

                    body: JSON.stringify({ answers: userAnswers }),
                })
                if (submitResponse.status != 200) {
                    throw new Error("Failed to submit quiz")
                }
                router.push(`/results/${id}`)
            }
            catch (error) {
                toast.error("Error submitting quiz. Please try again.")
            }
            finally {
                setIsLoading(false)
            }
            return
        }

        // Move to the next question
        setDirection("next")
        setSelectedOption(null)
        setCurrentQuestionIndex((prev) => prev + 1)

    }

    const handlePrev = () => {
        if (isFirstQuestion) return

        setDirection("prev")
        setCurrentQuestionIndex((prev) => prev - 1)
        // Restore the previously selected answer
        setSelectedOption(userAnswers[quiz.questions[currentQuestionIndex - 1].id] || null)
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-bold text-white">{quiz.topic}</h1>
                    <div className="text-slate-400">
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </div>
                </div>
                <Progress value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} className="h-2 bg-slate-900" />
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={currentQuestionIndex}
                    initial={{
                        opacity: 0,
                        x: direction === "next" ? 100 : -100,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                        opacity: 0,
                        x: direction === "next" ? -100 : 100,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <Card className="bg-slate-900 border-slate-800 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl text-white flex items-start gap-3">
                                <HelpCircle className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                                <span>{currentQuestion.question}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {currentQuestion.options.map((option: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                    >
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left p-4 h-auto border-2 ${selectedOption === option
                                                ? "bg-blue-600/20 border-blue-500 text-white"
                                                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                                                }`}
                                            onClick={() => handleOptionSelect(option)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${selectedOption === option
                                                        ? "border-blue-400 bg-blue-500/20"
                                                        : "border-slate-600 bg-slate-700"
                                                        }`}
                                                >
                                                    {String.fromCharCode(65 + index)}
                                                </div>
                                                <span>{option}</span>
                                                {selectedOption === option && <CheckCircle className="ml-auto h-5 w-5 text-blue-400" />}
                                            </div>
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4">
                            <Button
                                variant="outline"
                                onClick={handlePrev}
                                disabled={isFirstQuestion || isLoading}
                                className={`${isFirstQuestion ? "opacity-0 pointer-events-none" : "text-slate-300 border-slate-700"}`}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                            </Button>
                            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
                                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}

                                {isLastQuestion ? "Submit" : "Next"} {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </main>
    )
}