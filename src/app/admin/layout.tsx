export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary/30 selection:text-white">
      {/* Sidebar / Topbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-40 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="font-bold text-slate-100 tracking-tight">
            Admin <span className="text-slate-500 font-normal">| Marchado</span>
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-16 p-6 md:p-10 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
