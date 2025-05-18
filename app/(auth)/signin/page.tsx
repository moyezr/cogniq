"use client"
import { signInWithGoogle } from "@/actions/signin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Loader } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import googleLogo from "../../../public/google.svg"

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false)
    const handleSignIn = async () => {
        try {
            setIsLoading(true)
            await signInWithGoogle()
        } catch (error) {
            toast.error("Error signing in. Please try again.")
            console.error("Error signing in:", error);
        }
        finally {
            setIsLoading(false)

            console.log("Sign in attempt finished");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl font-bold text-white mb-2">CogniQ</h1>
                <p className="text-slate-400">AI-Powered Quiz Application</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="w-full max-w-md bg-slate-900 border-slate-800 shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-white">Let's Quiz</CardTitle>
                        <CardDescription className="text-slate-400 text-center">
                            Sign in to continue to CogniQ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button
                            onClick={handleSignIn}
                            variant="outline"
                            className="w-full relative flex items-center justify-center gap-2 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors py-6"
                            disabled={isLoading}
                        >
                            {!isLoading && (
                                <div className="absolute left-3">
                                    <Image src={googleLogo} alt="Google" width={20} height={20} className="text-white" />
                                </div>
                            )}

                            {isLoading && <Loader className="h-4 w-4 animate-spin mr-2" />}
                            {isLoading ? "Signing in..." : "Sign in with Google"}
                        </Button>
                    </CardContent>
                    <CardFooter className="text-center text-xs text-slate-500 pt-0">
                        <p className="w-full">Test your knowledge with AI-generated quizzes</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}