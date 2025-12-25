"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

function IconGrid(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.95"
      />
    </svg>
  );
}

function IconBox(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M4.5 8.2 12 4l7.5 4.2V16L12 20l-7.5-4V8.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 4v16"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M4.5 8.2 12 12l7.5-3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}

function IconSpark(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M12 2l1.4 6.1L20 10l-6.6 1.9L12 18l-1.4-6.1L4 10l6.6-1.9L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 18l.7 3L9 22l-3-1.1L5 18Zm14-8l.7 3L23 14l-3-1.1L19 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
    </svg>
  );
}

function IconRadar(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M12 21a9 9 0 1 1 9-9"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <path
        d="M12 21a5 5 0 1 1 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M12 12l7-7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function IconCog(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.4 13.2a7.8 7.8 0 0 0 0-2.4l2-1.6-2-3.5-2.4 1a8.6 8.6 0 0 0-2.1-1.2l-.4-2.6H10l-.4 2.6a8.6 8.6 0 0 0-2.1 1.2l-2.4-1-2 3.5 2 1.6a7.8 7.8 0 0 0 0 2.4l-2 1.6 2 3.5 2.4-1c.65.5 1.35.9 2.1 1.2l.4 2.6h4.2l.4-2.6c.76-.3 1.46-.7 2.1-1.2l2.4 1 2-3.5-2-1.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}

const items: Item[] = [
  { href: "/dashboard", label: "Dashboard", icon: <IconGrid className="h-[18px] w-[18px]" /> },
  { href: "/products", label: "Produits", icon: <IconBox className="h-[18px] w-[18px]" /> },
  { href: "/opportunities", label: "Opportunités", icon: <IconSpark className="h-[18px] w-[18px]" /> },
  { href: "/signals", label: "Signaux", icon: <IconRadar className="h-[18px] w-[18px]" /> },
  { href: "/settings", label: "Paramètres", icon: <IconCog className="h-[18px] w-[18px]" /> },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen w-[260px] shrink-0 md:flex md:flex-col",
        "border-r border-white/10 bg-black/35 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-black/35"
      )}
    >
      {/* Header */}
      <div className="px-4 pt-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_24px_rgba(255,255,255,0.25)]" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-tight text-white/90">
                Oracle
              </div>
              <div className="text-[11px] leading-4 text-white/50">
                Intelligence Platform
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-4 px-3">
        <div className="space-y-1">
          {items.map((it) => {
            const active =
              pathname === it.href || pathname?.startsWith(it.href + "/");

            return (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5",
                  "text-sm font-medium transition",
                  "text-white/70 hover:text-white/90",
                  "hover:bg-white/[0.04]",
                  active && "bg-white/[0.06] text-white/95",
                  active && "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]"
                )}
              >
                {/* subtle active glow */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.06), 0 0 22px rgba(255,255,255,0.06)",
                    }}
                  />
                )}

                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "border border-white/10 bg-white/[0.03]",
                    "text-white/70 group-hover:text-white/85",
                    active && "text-white/90"
                  )}
                >
                  {it.icon}
                </span>

                <span className="truncate">{it.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 pb-5 pt-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
          <div className="text-[11px] leading-4 text-white/45">
            © {new Date().getFullYear()} x10commerce
          </div>
          <div className="mt-1 text-[11px] leading-4 text-white/35">
            Signal avant le bruit.
          </div>
        </div>
      </div>
    </aside>
  );
}
