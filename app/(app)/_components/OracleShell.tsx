import * as React from "react";

interface OracleShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function OracleShell({ children, title, subtitle }: OracleShellProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            {subtitle && <p className="text-slate-400">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
