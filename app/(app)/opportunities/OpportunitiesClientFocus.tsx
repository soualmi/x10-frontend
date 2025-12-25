"use client";

import { useEffect } from "react";

export default function OpportunitiesClientFocus({ focus }: { focus?: string }) {
  useEffect(() => {
    const f = (focus || "").trim();
    if (!f) return;

    const el = document.getElementById(`opp_${f}`);
    if (!el) return;

    try {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      // fallback
      el.scrollIntoView();
    }

    // petite mise en avant (classe temporaire)
    el.classList.add("ring-2", "ring-[#6D5EF6]/60");
    const t = setTimeout(() => el.classList.remove("ring-2", "ring-[#6D5EF6]/60"), 1800);
    return () => clearTimeout(t);
  }, [focus]);

  return null;
}
