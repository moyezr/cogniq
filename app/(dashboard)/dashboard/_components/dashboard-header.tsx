"use client"
import { motion } from "framer-motion"
import { Game } from "@/lib/types"

type HeaderProps = {
  title: string
  subtitle: string
}

export function DashboardHeader({ title, subtitle }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-slate-400">{subtitle}</p>
    </motion.div>
  )
}
