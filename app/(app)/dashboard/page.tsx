import OracleShell from "../_components/OracleShell";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DashboardPage() {
  return (
    <OracleShell title="Intelligence Dashboard" subtitle="Détection et analyse précoce du marché.">
      <DashboardClient />
    </OracleShell>
  );
}
