"use client";
import { z, ZodError } from "zod";
import { quizCreationSchema } from "@/schemas/quizSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios"
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// import LoadingQuestions from "./LoadingQuestions";
import { useRouter } from "next/navigation";
import { Question } from "@prisma/client";
import { promptGenerator } from "@/lib/utils";
import { apiResponseSchema } from "@/schemas/questionSchema";
import { useToast } from "./ui/use-toast";
import LoadingQuestions from "./loading-questions";

type openAiResponse = {
    question: string;
    answer: string;
    options: string[];
};

type Props = {};

const QuizCreationForm = (props: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(true);

    const { toast } = useToast();

    const form = useForm<z.infer<typeof quizCreationSchema>>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            topic: "Javascript",
            questionNumber: 5,
        },
    });

    async function onSubmit({
        topic,
        questionNumber,
    }: z.infer<typeof quizCreationSchema>) {
        setIsLoading(true);
        setFinished(false);
        try {
            const prompt = promptGenerator(topic, questionNumber); // Generates the prompt by prompt engineering for generating questions

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions", // directly using the rest api from openai due to limited timeout capacity of nextjs serverless functions
                {
                    model: "gpt-4.1-mini", // model of chatgpt.
                    messages: [{ role: "user", content: prompt }],
                    response_format: {
                        type: "json_object",
                    },
                },
                {
                    headers: {
                        "Content-Type": "application/json",

                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
                    },
                }
            );

            // console.log("RESPONSE FROM OPEN AI", response.data);


            let questions = JSON.parse(response.data.choices[0].message.content);

            // console.log("GENERATAED QUESTIONS", questions) // testing purpose -> logging out the response generated from openai

            let parsedQuestions = apiResponseSchema.parse(questions); // parsing with zod to see if there are any type errors
            // console.log("parsed questions", parsedQuestions)
            let formattedQuestions = parsedQuestions.questions.map((item: openAiResponse) => {
                // formatting the questions to post it into the database
                return {
                    question: item.question,
                    answer: item.answer,
                    options: JSON.stringify(item.options),
                  
                };
            }) as Question[];

            console.log("formatted questions", formattedQuestions)
            const gameCreationResponse = await axios.post("/api/game", {
                // creating the game to get the gameId
                topic,
                questionNumber,
                questions: formattedQuestions,
            });
            console.log("game creation response", gameCreationResponse.data)
            const { gameId } = gameCreationResponse.data; // getting the gameId


            router.push(`/play/${gameId}`); // pushing to the play page
        } catch (error) {
            toast({
                title: "Error Generating Questions",
                description: "Couldn't generate quesitons",
                variant: "destructive",
            });
            console.log("Some error in generating questions", error);
            if (error instanceof ZodError) {
                console.log(error.message)
            }
        } finally {
            setIsLoading(false);
            setFinished(true);
        }
    }

    if (!finished || isLoading) {
        return <LoadingQuestions />;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-8 p-6 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Create Quiz</h2>
                    <p className="text-slate-400">Generate questions about any topic</p>
                </div>

                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-200">Topic</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter a topic (e.g., Javascript)"
                                    className="bg-slate-900 border-slate-700 focus:border-blue-600"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-sm text-red-400" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="questionNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-200">Number of Questions</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Choose between 3-10"
                                    type="number"
                                    min={3}
                                    max={10}
                                    className="bg-slate-900 border-slate-700 focus:border-blue-600"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-sm text-red-400" />
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    type="submit"
                >
                    Generate Quiz
                </Button>
            </form>
        </Form>
    );
};

export default QuizCreationForm;
