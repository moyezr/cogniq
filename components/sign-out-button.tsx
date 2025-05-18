"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { signOutAction } from "@/actions/sign-out";
import { toast } from "sonner";
import { Loader, LogOut } from "lucide-react";

export default function SignOutButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignout = async () => {
        try {

            setIsLoading(true);
            await signOutAction();
        } catch (error) {
            console.error("Error signing out:", error);
            toast.error("Error signing out. Please try again.");
        } finally {

            setIsLoading(false);
        }
    }
    return (
        <Button variant={"ghost"} onClick={handleSignout} className="w-full justify-start">
            {
                isLoading ? (
                    <Loader className="mr-2 animate-spin" />
                ) : (
                    <LogOut className="mr-2 " />
                )
            }
            Sign Out
        </Button>
    )
}