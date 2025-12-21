"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/opportunities", label: "Opportunités", icon: "💎" },
  { href: "/products", label: "Produits", icon: "📦" },
  { href: "/signals", label: "Signaux", icon: "📡" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r px-4 py-5 md:block" style={{ background: 'rgb(30, 41, 59)', borderColor: 'rgb(51, 65, 85)' }}>
      <div className="mb-6">
        <div className="text-sm font-semibold tracking-tight" style={{ background: 'linear-gradient(135deg, rgb(96, 125, 149), rgb(212, 165, 116))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Oracle</div>
        <div className="text-xs" style={{ color: 'rgb(148, 163, 184)' }}>Intelligence Platform</div>
      </div>
      <nav className="space-y-1">
        {items.map((it) => {
          const active = pathname === it.href || pathname?.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active ? "text-white" : "hover:bg-opacity-50"
              )}
              style={active ? { background: 'linear-gradient(135deg, rgb(74, 95, 115), rgb(96, 125, 149))', color: 'white' } : { color: 'rgb(248, 250, 252)' }}
            >
              <span className="text-base">{it.icon}</span>
              <span className="truncate">{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 text-xs" style={{ color: 'rgb(148, 163, 184)' }}>
        © {new Date().getFullYear()} x10commerce
      </div>
    </aside>
  );
}
