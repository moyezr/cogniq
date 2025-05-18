"use server"

import { signIn } from "@/lib/auth";

export async function signInWithGoogle() {
    try {
        await signIn("google", { redirectTo: "/dashboard" });
   
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
}