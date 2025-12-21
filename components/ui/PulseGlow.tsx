"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PulseGlowProps {
  children: ReactNode;
  color?: string;
  intensity?: "low" | "medium" | "high";
}

export function PulseGlow({ children, color = "rgba(212, 165, 116, 0.3)", intensity = "medium" }: PulseGlowProps) {
  return (
    <motion.div
      animate={{
        boxShadow: [`0 0 20px ${color}`, `0 0 40px ${color}`, `0 0 20px ${color}`]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
