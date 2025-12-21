"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  variant?: "default" | "gradient" | "glass";
  hover?: boolean;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, variant = "default", hover = true, delay = 0, className = "" }: AnimatedCardProps) {
  const variants = {
    default: "bg-[rgb(30,41,59)] border-[rgb(51,65,85)]",
    gradient: "bg-gradient-to-br from-[rgb(30,41,59)] to-[rgb(15,23,42)] border-[rgb(51,65,85)]",
    glass: "bg-[rgba(30,41,59,0.6)] backdrop-blur-xl border-[rgba(74,95,115,0.2)]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" } : {}}
      className={`rounded-xl border p-6 transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
