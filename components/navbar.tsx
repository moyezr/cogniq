"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Brain, LogIn, LogOut, Menu, Plus, X } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Image from "next/image"
import { signOut } from "@/lib/auth"
import { useSession } from "next-auth/react"
import blankProfile from "../public/blank-profile.webp";
import SignOutButton from "./sign-out-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const session = useSession()


  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Brain className="h-6 w-6 text-blue-400" />
          </motion.div>
          <span className="text-xl font-bold text-white">CogniQ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
              Dashboard
            </Button>
          </Link>
          <Link href="/play/new">
            <Button
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" /> Quiz
            </Button>
          </Link>

          <div className="flex gap-4 items-center">
            {/* <DarkModeToggle /> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session?.data?.user?.image || ''} />
                  <AvatarFallback >
                    <Image
                      alt="fallback image"
                      src={blankProfile}
                      height={40}
                      width={40}
                    />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              {session?.data?.user && (
                <DropdownMenuContent className="cursor-pointer">

                  <DropdownMenuItem
                    className="px-0 py-0"
                  >
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}

            </DropdownMenu>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-800 bg-slate-900/95"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/play/new" onClick={() => setIsMenuOpen(false)}>
              <Button
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Plus className="h-4 w-4 mr-2" /> Quiz
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}
