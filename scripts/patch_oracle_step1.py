from __future__ import annotations
from pathlib import Path
import re
import sys
from datetime import datetime

ROOT = Path(".")
TS = datetime.now().strftime("%Y%m%d-%H%M%S")

FILES = [
  "app/(app)/dashboard/DashboardClient.tsx",
  "app/(app)/products/ProductsClient.tsx",
  "app/(app)/signals/SignalsClient.tsx",
  "app/(app)/opportunities/page.tsx",
  "app/(app)/opportunities/[id]/page.tsx",
  "app/(app)/_components/OracleTopbar.tsx",
]

DISCLAIMER_BLOCK = (
  '<p className="text-xs text-muted-foreground mt-2">'
  '<span className="block">FR : Oracle est un outil d’aide à la décision e-commerce — pas une plateforme financière.</span>'
  '<span className="block">EN : Oracle is an e-commerce decision intelligence tool — not a financial or investment platform.</span>'
  '</p>'
)

PRODUCTS_DISCLAIMER = (
  '<p className="text-xs text-muted-foreground mb-3">'
  '<span className="block">FR : Indice interne (demande / concurrence / saturation) — pas une promesse de revenus, ni un score financier.</span>'
  '<span className="block">EN : Internal index (demand/competition/saturation) — not a financial score or promise of revenue.</span>'
  '</p>'
)

def backup(path: Path) -> None:
  bdir = ROOT / "backups"
  bdir.mkdir(parents=True, exist_ok=True)
  dst = bdir / f"{path.name}.autoStep1.{TS}.bak"
  try:
    dst.write_text(path.read_text(encoding="utf-8"), encoding="utf-8")
  except UnicodeDecodeError:
    dst.write_bytes(path.read_bytes())

def already_has_disclaimer(s: str) -> bool:
  return ("not a financial or investment platform" in s) or ("pas une plateforme financière" in s)

def replace_labels(s: str) -> str:
  s = s.replace("ORACLE SCORE", "OPPORTUNITY INDEX")
  s = s.replace("Oracle Score", "Opportunity Index")
  s = s.replace("Oracle score", "Opportunity Index")
  return s

def inject_disclaimer_after_first_h1(s: str) -> str:
  if already_has_disclaimer(s):
    return s
  m = re.search(r"(<h1[^>]*>.*?</h1>)", s, flags=re.DOTALL)
  if m:
    i = m.end()
    return s[:i] + "\n" + DISCLAIMER_BLOCK + s[i:]
  m2 = re.search(r"return\s*\(\s*<>\s*", s)
  if m2:
    i = m2.end()
    return s[:i] + "\n" + DISCLAIMER_BLOCK + "\n" + s[i:]
  return DISCLAIMER_BLOCK + "\n" + s

def inject_products_disclaimer(s: str) -> str:
  if "Internal index (demand/competition/saturation)" in s or "Indice interne (demande / concurrence / saturation)" in s:
    return s
  m = re.search(r"return\s*\(\s*<>\s*", s)
  if m:
    i = m.end()
    return s[:i] + "\n" + PRODUCTS_DISCLAIMER + "\n" + s[i:]
  m2 = re.search(r"(<h1[^>]*>.*?</h1>)", s, flags=re.DOTALL)
  if m2:
    i = m2.end()
    return s[:i] + "\n" + PRODUCTS_DISCLAIMER + s[i:]
  return PRODUCTS_DISCLAIMER + "\n" + s

def ensure_useSearchParams_import(s: str) -> str:
  uses = "useSearchParams(" in s
  has_import = bool(re.search(r'import\s*\{\s*[^}]*useSearchParams[^}]*\}\s*from\s*["\']next/navigation["\']', s))
  if uses and not has_import:
    lines = s.splitlines()
    for idx, line in enumerate(lines[:60]):
      if line.startswith("import") and ("react" in line.lower() or "next" in line.lower()):
        lines.insert(idx + 1, 'import { useSearchParams } from "next/navigation";')
        return "\n".join(lines) + ("\n" if not s.endswith("\n") else "")
    return 'import { useSearchParams } from "next/navigation";\n' + s
  return s

def fix_opportunities_signatures(path: str, s: str) -> str:
  if path.endswith("app/(app)/opportunities/page.tsx"):
    s = re.sub(
      r"export\s+default\s+async\s+function\s+OpportunitiesPage\s*\([^)]*\)\s*\{",
      "export default async function OpportunitiesPage() {",
      s,
      flags=re.DOTALL,
    )
    return s

  if path.endswith("app/(app)/opportunities/[id]/page.tsx"):
    s = re.sub(
      r"export\s+default\s+async\s+function\s+OpportunityDetailPage\s*\(\s*props\s*:\s*\{\s*params\s*:\s*Promise<\{\s*id\s*:\s*string\s*\}\s*>\s*\}\s*\)\s*\{",
      "export default async function OpportunityDetailPage({ params }: { params: { id: string } }) {\n  const { id } = params;",
      s,
      flags=re.DOTALL,
    )
    s = re.sub(
      r"export\s+default\s+async\s+function\s+OpportunityDetailPage\s*\(\s*\{\s*params\s*\}\s*:\s*\{\s*params\s*:\s*Promise<\{\s*id\s*:\s*string\s*\}\s*>\s*\}\s*\)\s*\{",
      "export default async function OpportunityDetailPage({ params }: { params: { id: string } }) {\n  const { id } = params;",
      s,
      flags=re.DOTALL,
    )
    return s

  return s

def patch_topbar_labels(s: str) -> str:
  s = s.replace("SIGNAUX", "PRODUCT SIGNALS")
  s = s.replace("OPPORTUNITÉS", "PRODUCT OPPORTUNITIES")
  s = s.replace("Opportunités", "Product Opportunities")
  return s

def main():
  changed_any = False
  for fp in FILES:
    path = ROOT / fp
    if not path.exists():
      print(f"[SKIP] missing: {fp}")
      continue

    original = path.read_text(encoding="utf-8")
    backup(path)

    s = original
    s = replace_labels(s)
    s = ensure_useSearchParams_import(s)
    s = fix_opportunities_signatures(fp, s)

    if fp.endswith("DashboardClient.tsx"):
      s = inject_disclaimer_after_first_h1(s)
    elif fp.endswith("SignalsClient.tsx"):
      s = inject_disclaimer_after_first_h1(s)
    elif fp.endswith("ProductsClient.tsx"):
      s = inject_products_disclaimer(s)
    elif fp.endswith("app/(app)/opportunities/page.tsx"):
      s = inject_disclaimer_after_first_h1(s)
    elif fp.endswith("app/(app)/opportunities/[id]/page.tsx"):
      s = inject_disclaimer_after_first_h1(s)
    elif fp.endswith("OracleTopbar.tsx"):
      s = patch_topbar_labels(s)

    if s != original:
      path.write_text(s, encoding="utf-8")
      changed_any = True
      print(f"[OK] patched: {fp}")
    else:
      print(f"[OK] no change needed: {fp}")

  if not changed_any:
    print("No changes applied (already patched or patterns not found).")

if __name__ == "__main__":
  try:
    main()
  except Exception as e:
    print("PATCH FAILED:", repr(e))
    sys.exit(1)
