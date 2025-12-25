import { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  trend?: string;
  className?: string;
}

export default function KpiCard({ label, value, icon, color = "#d4a574", trend, className = "" }: KpiCardProps) {
  return (
    <div 
      className={`rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, rgb(30, 41, 59), rgb(15, 23, 42))',
        borderColor: 'rgb(51, 65, 85)'
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgb(148, 163, 184)' }}>
          {label}
        </div>
        {icon && <div className="text-lg">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold" style={{ color }}>
          {value}
        </div>
        {trend && (
          <div className="text-sm font-medium" style={{ color: trend.startsWith('+') ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)' }}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
