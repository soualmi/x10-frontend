import { Sidebar } from "@/components/app/sidebar";
import { BottomNav } from "@/components/app/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'rgb(15, 23, 42)' }}>
      <Sidebar />
      <main className="flex-1 p-6 pb-20 md:pb-6">{children}</main>
      <BottomNav />
    </div>
  );
}
