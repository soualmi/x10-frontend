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
      <ProductsClient />
    </OracleShell>
  );
}
