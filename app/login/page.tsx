import OracleShell from "../(app)/_components/OracleShell";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function LoginPage() {
  return (
    <OracleShell title="Accès" subtitle="Authentification.">
      <LoginClient />
    </OracleShell>
  );
}
