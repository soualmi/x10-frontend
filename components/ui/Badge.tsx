import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "hot";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium";
  
  const variants = {
    default: "bg-[rgba(74,95,115,0.15)] border border-[rgba(74,95,115,0.3)] text-[rgb(96,125,149)]",
    success: "bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.3)] text-[rgb(34,197,94)]",
    warning: "bg-[rgba(251,191,36,0.15)] border border-[rgba(251,191,36,0.3)] text-[rgb(251,191,36)]",
    danger: "bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[rgb(239,68,68)]",
    info: "bg-[rgba(96,165,250,0.15)] border border-[rgba(96,165,250,0.3)] text-[rgb(96,165,250)]",
    hot: "bg-[rgb(239,68,68)] text-white font-bold uppercase"
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
