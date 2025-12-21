"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/opportunities", label: "Opportunités", icon: "💎" },
  { href: "/products", label: "Produits", icon: "📦" },
];

export function BottomNav() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t md:hidden" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 transition",
                active ? "" : ""
              )}
              style={active ? { color: 'rgb(212, 165, 116)' } : { color: 'rgb(148, 163, 184)' }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={cn("text-xs font-medium", active && "font-semibold")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
