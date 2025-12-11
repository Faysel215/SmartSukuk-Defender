import React from 'react';
import { View } from '../types';
import { LayoutDashboard, Wallet, ShieldCheck, MessageSquare, Menu, X, Hexagon } from 'lucide-react';

interface LayoutProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setCurrentView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        currentView === view
          ? 'bg-emerald-900/30 text-emerald-400 border-r-2 border-emerald-500'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 border-r border-slate-800">
        <div className="p-6 flex items-center gap-2 border-b border-slate-800">
          <div className="text-emerald-500">
            <Hexagon size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-serif-header font-bold text-lg leading-tight tracking-tight">SmartSukuk<br/><span className="text-emerald-500">Defender</span></h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">Platform</div>
          <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Overview" />
          <NavItem view={View.WALLET} icon={Wallet} label="Sukuk Portfolio" />
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-8 px-4">Security</div>
          <NavItem view={View.MIGRATION} icon={ShieldCheck} label="PQC Migration" />
          <NavItem view={View.ADVISOR} icon={MessageSquare} label="Sentinel AI" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
            <div className="flex justify-between mb-1">
              <span>Network Status</span>
              <span className="text-emerald-400">Stable</span>
            </div>
            <div className="flex justify-between">
              <span>Encryption</span>
              <span className="text-indigo-400">Kyber-1024</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
             <Hexagon size={24} className="text-emerald-500" />
             <span className="font-serif-header font-bold">SmartSukuk Defender</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 z-50 border-b border-slate-800 p-4 space-y-2">
             <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Overview" />
             <NavItem view={View.WALLET} icon={Wallet} label="Sukuk Portfolio" />
             <NavItem view={View.MIGRATION} icon={ShieldCheck} label="PQC Migration" />
             <NavItem view={View.ADVISOR} icon={MessageSquare} label="Sentinel AI" />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-gradient-to-br from-slate-950 to-slate-900 relative">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;