

import { Navbar } from "@/components/navbar"
import { prisma } from "@/lib/db"
import ResultInterface from "./_components/result-interface"


export default async function Results({ params }: { params: { id: string } }) {
  const quiz = await prisma.game.findUnique({
    where: {
      id: params.id,
    },
    include: {
      questions: true,
    },
  })

  if (!quiz || quiz.questions.length === 0) {
    return <div className="text-center text-red-500">Quiz not found</div>
  }

  quiz.questions = quiz.questions.map((question) => {
    return {
      ...question,
      options: JSON.parse(question.options),
    }
  })


  console.log(quiz)


  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ResultInterface quiz={quiz} id={params.id} />
      </main>
    </div>
  )
}

