import { ReactNode } from "react";

interface SectionHeaderProps {
  icon?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeader({ icon, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
