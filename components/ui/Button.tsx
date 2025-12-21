import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "default" | "primary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function Button({ children, variant = "default", size = "md", onClick, className = "" }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200";
  
  const variants = {
    default: "bg-[rgba(74,95,115,0.1)] text-[rgb(203,213,225)] border border-[rgba(74,95,115,0.2)] hover:bg-[rgba(74,95,115,0.2)]",
    primary: "bg-gradient-to-r from-[rgb(74,95,115)] to-[rgb(96,125,149)] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    accent: "bg-gradient-to-r from-[rgb(212,165,116)] to-[rgb(230,195,150)] text-[rgb(15,23,42)] shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    ghost: "bg-transparent text-[rgb(203,213,225)] hover:bg-[rgba(74,95,115,0.1)]"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
