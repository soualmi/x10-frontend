import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "gradient" | "glass";
  hover?: boolean;
  className?: string;
}

export default function Card({ children, variant = "default", hover = false, className = "" }: CardProps) {
  const baseStyles = "rounded-xl border p-6 transition-all duration-300";
  
  const variants = {
    default: "bg-[rgb(30,41,59)] border-[rgb(51,65,85)]",
    gradient: "bg-gradient-to-br from-[rgb(30,41,59)] to-[rgb(15,23,42)] border-[rgb(51,65,85)]",
    glass: "bg-[rgba(30,41,59,0.6)] backdrop-blur-xl border-[rgba(74,95,115,0.2)]"
  };
  
  const hoverStyles = hover ? "hover:border-blue-500/30 hover:scale-[1.01] cursor-pointer" : "";
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
