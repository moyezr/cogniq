import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import QuizzesInterface from "./_components/quizzes-interface";

export default async function Quizzes() {
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
    });    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <QuizzesInterface quizzes={processedGames} />
            </main>
        </div>
    );
}