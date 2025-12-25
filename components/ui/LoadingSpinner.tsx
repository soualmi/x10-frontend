"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <motion.div
      className={`${sizes[size]} rounded-full border-2 border-t-transparent`}
      style={{ borderColor: 'rgb(212, 165, 116)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}
