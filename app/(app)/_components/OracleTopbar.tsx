"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavLink = { href: string; label: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/oracle") return pathname === "/oracle" || pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function DesktopNavItem({ href, label }: NavLink) {
  const pathname = usePathname() || "/";
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      className={[
        "relative rounded-xl px-3 py-2 text-[12px] tracking-[0.14em] font-semibold transition",
        active
          ? "text-white bg-white/[0.06] border border-white/10"
          : "text-white/60 hover:text-white/85 hover:bg-white/[0.04]",
      ].join(" ")}
    >
      {label}
      {active && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 h-1 w-1 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.45)]"
        />
      )}
    </Link>
  );
}

function MobileNavItem({
  href,
  label,
  onSelect,
}: NavLink & { onSelect: () => void }) {
  const pathname = usePathname() || "/";
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onSelect}
      className={[
        "flex items-center justify-between rounded-xl px-4 py-3 border transition",
        active
          ? "border-white/15 bg-white/[0.06] text-white"
          : "border-white/10 bg-black/25 text-white/75 hover:text-white hover:bg-white/[0.04]",
      ].join(" ")}
    >
      <span className="text-[12px] tracking-[0.14em] font-semibold">{label}</span>
      {active && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-white/85 shadow-[0_0_18px_rgba(255,255,255,0.45)]"
        />
      )}
    </Link>
  );
}

export default function OracleTopbar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  const links: NavLink[] = useMemo(
    () => [
      { href: "/dashboard", label: "DASHBOARD" },
      { href: "/products", label: "PRODUITS" },
      { href: "/opportunities", label: "OPPORTUNITÉS" },
      { href: "/signals", label: "SIGNAUX" },
      { href: "/settings", label: "PARAMÈTRES" },
    ],
    []
  );

  // Auth state
  useEffect(() => {
    try {
      setAuthed(!!localStorage.getItem("oracle_token"));
    } catch {
      setAuthed(false);
    }
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC to close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleAuthClick = () => {
    if (!authed) {
      router.push("/login");
      return;
    }
    try {
      localStorage.removeItem("oracle_token");
    } catch {}
    setAuthed(false);
    router.push("/login");
  };

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/oracle" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl flex items-center justify-center">
              <span className="text-[11px] tracking-[0.22em] text-white/80 font-semibold">
                O
              </span>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.22em] text-white/45">
                ORACLE
              </div>
              <div className="text-sm font-semibold text-white/85 -mt-0.5">
                Intelligence
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <DesktopNavItem key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-xl border border-white/12 bg-white/[0.035] px-3 py-2 text-[12px] tracking-[0.14em] font-semibold text-white/80 hover:bg-white/[0.06] transition"
              aria-expanded={open}
              aria-controls="oracle-mobile-menu"
            >
              {open ? "FERMER" : "MENU"}
            </button>

            <Link
              href="/pricing"
              className={[
                "hidden sm:inline-flex rounded-xl px-3 py-2 text-[12px] tracking-[0.14em] font-semibold transition",
                isActive(pathname, "/pricing")
                  ? "text-white bg-white/[0.06] border border-white/10"
                  : "text-white/60 hover:text-white/85 hover:bg-white/[0.04]",
              ].join(" ")}
            >
              TARIFS
            </Link>

            <button
              type="button"
              onClick={handleAuthClick}
              className={[
                "rounded-xl border px-4 py-2 text-[12px] tracking-[0.14em] font-semibold transition",
                authed
                  ? "border-white/12 bg-white/[0.035] text-white/85 hover:bg-white/[0.06]"
                  : isActive(pathname, "/login")
                    ? "border-white/20 bg-white text-black"
                    : "border-white/12 bg-white text-black hover:opacity-90",
              ].join(" ")}
            >
              {authed ? "DÉCONNEXION" : "CONNEXION"}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="oracle-mobile-menu"
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl px-6 pb-5">
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-3">
              <div className="grid gap-2">
                {links.map((l) => (
                  <MobileNavItem
                    key={l.href}
                    href={l.href}
                    label={l.label}
                    onSelect={() => setOpen(false)}
                  />
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.18em] text-white/45">
                  NAVIGATION
                </span>
                <span className="text-xs text-white/35">oracle.x10commerce.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop (click to close) */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/55 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
