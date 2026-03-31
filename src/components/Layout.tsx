import React from 'react';
import { Rocket, LayoutGrid, Settings, LogOut, HelpCircle, User, History, SlidersHorizontal } from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Layout({ children, currentView, onViewChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-nebula-surface selection:bg-nebula-primary/30">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 print-hidden">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-headline">
            Nebula Bingo
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
          <button 
            onClick={() => onViewChange('caller')}
            className={`transition-colors ${currentView === 'caller' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Caller
          </button>
          <button 
            onClick={() => onViewChange('cards')}
            className={`transition-colors ${currentView === 'cards' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Cards
          </button>
          <button 
            onClick={() => onViewChange('generator')}
            className={`transition-colors ${currentView === 'generator' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Generator
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-all text-slate-400">
            <Settings size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-all text-slate-400">
            <User size={20} />
          </button>
        </div>
      </nav>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 pt-20 bg-slate-900/60 backdrop-blur-2xl border-r border-white/5 z-40 print-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-nebula-surface-highest overflow-hidden border border-nebula-primary/20">
              <img 
                alt="Commander Avatar" 
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfkXyOudyx9nQxbX0RKVcdz9EhnNn1GtXz0u296yp-_csRv6WztXP2JeAdpdK1qPbUaQ8RG7trb-o_WUcDh2piL1J0_k1YTPLi3f-51SQZyDYRE_noagl4cEFsOi1MU4PqIKgnbvLZnmAG8odm1pSwLpLjEJkNxr20-Kgu295Fc4Ah8WU_IW6Khb8O8KQojefGG2Cdb-G_8T3ikhjEWqU5zJ4BcpvZWhJUdI7qM_oacVL7U7KeOwihqLcMV7Owb6D765LN041Zjt0"
              />
            </div>
            <div>
              <p className="text-cyan-400 font-black text-xl leading-none font-headline">Commander</p>
              <p className="uppercase tracking-widest text-[10px] text-slate-400 mt-1">Nebula Sector 7G</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 px-2">
          <SidebarItem 
            icon={<Rocket size={18} />} 
            label="Game Lobby" 
            active={currentView === 'generator'} 
            onClick={() => onViewChange('generator')}
          />
          <SidebarItem 
            icon={<History size={18} />} 
            label="Drawing Room" 
            active={currentView === 'caller'} 
            onClick={() => onViewChange('caller')}
          />
          <SidebarItem 
            icon={<LayoutGrid size={18} />} 
            label="My Cards" 
            active={currentView === 'cards'} 
            onClick={() => onViewChange('cards')}
          />
          <SidebarItem 
            icon={<SlidersHorizontal size={18} />} 
            label="Settings" 
            active={false} 
            onClick={() => {}}
          />
        </nav>

        <div className="p-6">
          <button className="w-full py-3 px-4 bg-gradient-to-r from-nebula-secondary to-fuchsia-700 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg shadow-nebula-secondary/20 active:scale-95 transition-transform">
            Buy New Cards
          </button>
        </div>

        <div className="mt-auto border-t border-white/5 p-4">
          <button className="flex items-center gap-3 text-slate-400 px-4 py-2 hover:text-white transition-colors w-full">
            <HelpCircle size={16} />
            <span className="text-xs uppercase tracking-widest">Support</span>
          </button>
          <button className="flex items-center gap-3 text-slate-400 px-4 py-2 hover:text-red-400 transition-colors w-full">
            <LogOut size={16} />
            <span className="text-xs uppercase tracking-widest">Exit</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-24 min-h-screen">
        {children}
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe bg-slate-900/60 backdrop-blur-2xl border-t border-white/5 z-50 print-hidden">
        <MobileNavItem 
          icon={<Rocket size={20} />} 
          label="Lobby" 
          active={currentView === 'generator'} 
          onClick={() => onViewChange('generator')}
        />
        <MobileNavItem 
          icon={<LayoutGrid size={20} />} 
          label="Cards" 
          active={currentView === 'cards'} 
          onClick={() => onViewChange('cards')}
        />
        <div className="relative -top-6">
          <button 
            onClick={() => onViewChange('caller')}
            className="w-14 h-14 bg-gradient-to-br from-nebula-primary to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-nebula-primary/40 border-4 border-nebula-surface text-nebula-surface"
          >
            <History size={24} />
          </button>
        </div>
        <MobileNavItem 
          icon={<SlidersHorizontal size={20} />} 
          label="Draw" 
          active={currentView === 'caller'} 
          onClick={() => onViewChange('caller')}
        />
        <MobileNavItem 
          icon={<Settings size={20} />} 
          label="Menu" 
          active={false} 
          onClick={() => {}}
        />
      </nav>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-30 print-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula-primary rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-nebula-secondary rounded-full blur-[200px]"></div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 transition-all duration-200 ${
        active 
          ? 'bg-gradient-to-r from-nebula-primary/20 to-transparent text-nebula-primary border-l-4 border-nebula-primary' 
          : 'text-slate-400 hover:bg-white/5 hover:translate-x-1'
      }`}
    >
      {icon}
      <span className="font-body uppercase tracking-widest text-xs">{label}</span>
    </button>
  );
}

function MobileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-nebula-primary' : 'text-slate-400'}`}
    >
      {icon}
      <span className="text-[10px] uppercase font-bold tracking-tighter">{label}</span>
    </button>
  );
}
