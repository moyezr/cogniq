
import { Navbar } from "@/components/navbar"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import DashboardInterface from "./_components/dashboard-interface";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  // Fetch games with their questions
  const games = await prisma.game.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      questions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10
  });

  // Process the games to calculate scores
  const processedGames = games.map(game => {
    const totalQuestions = game.questions.length;
    const correctAnswers = game.questions.filter(q => q.isCorrect === true).length;

    return {
      ...game,
      score: correctAnswers,
      totalQuestions,
    };
  });

  // Calculate average score if there are any games
  const averageScore = processedGames.length > 0
    ? Math.round(processedGames.reduce((acc, game) => {
      return acc + ((game.score || 0) / (game.totalQuestions || 1)) * 100;
    }, 0) / processedGames.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <DashboardInterface
          recentQuizzes={processedGames}
          averageScore={averageScore}
        />
      </main>
    </div>
  )
}

