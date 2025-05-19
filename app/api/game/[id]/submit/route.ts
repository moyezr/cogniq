import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {

    const quiz = await prisma.game.findUnique({
        where: {
            id: params.id,
        },
        include: {
            questions: true,
        },

    })
    const body = await request.json()
    const { answers } = body
    if (!quiz) {
        return NextResponse.json({ message: "Quiz not found" }, {
            status: 404,
        })
    }


    const updatedQuestoinsWithAnswers = quiz.questions.map((question) => ({
        ...question,
        isCorrect: (question.id in answers && answers[question.id] === question.answer) ? true : false,
        userAnswer: question.id in answers ? answers[question.id] : null,
    }))
    const updateTransaction = await prisma.$transaction(async (tx) => {
        const updateResponse = Promise.all(updatedQuestoinsWithAnswers.map((question) => {
            return tx.question.update({
                where: {
                    id: question.id,
                },
                data: {
                    isCorrect: question.isCorrect,
                    userAnswer: question.userAnswer,
                },
            })
        }))

        return updateResponse
    })

    return NextResponse.json(updateTransaction, {
        status: 200,

    })
}