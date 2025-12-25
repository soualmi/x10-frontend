import { Sidebar } from "@/components/app/sidebar";
import { BottomNav } from "@/components/app/bottom-nav";
import { SettingsProvider } from "@/app/settings-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <div className="flex min-h-screen" style={{ background: 'rgb(15, 23, 42)' }}>
        <Sidebar />
        <main className="flex-1 p-6 pb-24 md:pb-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        <BottomNav />
      </div>
    </SettingsProvider>
  );
}
