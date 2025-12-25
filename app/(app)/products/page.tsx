import OracleShell from "../_components/OracleShell";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ProductsPage() {
  return (
    <OracleShell
      title="Produits"
      subtitle="Base des produits scannés — Oracle Score en temps réel."
    >
          <p className="text-xs text-muted-foreground mt-2">
            <span className="block">
              FR : Indice interne (demande / concurrence / saturation) — pas une promesse de revenus, ni un score financier.
            </span>
            <span className="block">
              EN : Internal index (demand/competition/saturation) — not a financial score or promise of revenue.
            </span>
          </p>

      <ProductsClient />
    </OracleShell>
  );
}
