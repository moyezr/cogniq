
import { Navbar } from "@/components/navbar"
import MCQ from "./_components/mcq"
import { prisma } from "@/lib/db"



export default async function PlayQuiz({ params: { id } }: { params: { id: string } }) {
  const quiz = await prisma.game.findUnique({
    where: {
      id: id,
    },
    include: {
      questions: true,
    },
  })

  if (!quiz) {
    return <div>Quiz not found</div>
  }

  const formattedQuiz = {
    ...quiz,
    questions: quiz.questions.map((question) => ({
      ...question,
      options: JSON.parse(question.options),
    })),
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <MCQ quiz={formattedQuiz} id={id} />
    </div>
  )
}
