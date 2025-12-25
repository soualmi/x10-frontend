import OracleShell from "../(app)/_components/OracleShell";
import PricingClient from "./PricingClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PricingPage() {
  return (
    <OracleShell title="Tarifs" subtitle="Choisissez votre niveau d’accès.">
      <PricingClient />
    </OracleShell>
  );
}
