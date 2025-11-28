import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-72 min-h-screen transition-all duration-300">
        <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
