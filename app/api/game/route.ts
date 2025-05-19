import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
// import { shuffle } from "@/lib/utils";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { topic, questions } = body;

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const userId = session.user.id;

    const gameCreationResponse = await prisma.game.create({
      data: {
        userId: userId as string,
        topic,
        timeStarted: new Date(),
        questions: {
          create: questions.map((question: any) => ({
            question: question.question,
            answer: question.answer,
            options: question.options,
            isCorrect: null,
            userAnswer: null,
          })),
        }
      },
    });

    const gameId = gameCreationResponse.id;

    return Response.json({ message: "OK", gameId: gameId }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return Response.json({ message: error.issues, error }, { status: 403 });
    }

    return NextResponse.json(
      { message: "Internal Server Error", error },
      {
        status: 500,
      }
    );
  }
}
