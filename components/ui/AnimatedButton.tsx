"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "default" | "primary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function AnimatedButton({ children, variant = "default", size = "md", onClick, className = "" }: AnimatedButtonProps) {
  const variants = {
    default: "bg-[rgba(74,95,115,0.1)] text-[rgb(203,213,225)] border border-[rgba(74,95,115,0.2)]",
    primary: "bg-gradient-to-r from-[rgb(74,95,115)] to-[rgb(96,125,149)] text-white shadow-lg",
    accent: "bg-gradient-to-r from-[rgb(212,165,116)] to-[rgb(230,195,150)] text-[rgb(15,23,42)] shadow-lg",
    ghost: "bg-transparent text-[rgb(203,213,225)]"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
