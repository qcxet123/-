import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PasswordChecker from './components/PasswordChecker';
import AiAssistant from './components/AiAssistant';
import IdentityMonitor from './components/IdentityMonitor';
import { View } from './types';
import { Bell, Search, User } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'password':
        return <PasswordChecker />;
      case 'assistant':
        return <AiAssistant />;
      case 'identity':
        return <IdentityMonitor />;
      case 'news':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <Bell className="w-16 h-16 text-cyber-cyan opacity-20" />
            <div>
              <h3 className="text-2xl font-bold">آخر أخبار الأمن السيبراني</h3>
              <p className="text-white/40">جاري جلب آخر الأخبار من المصادر العالمية...</p>
            </div>
            <button className="cyber-button">تحديث الأخبار</button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-cyber-black text-white selection:bg-cyber-cyan/30 overflow-hidden matrix-bg">
      {/* Sidebar */}
      <Sidebar currentView={currentView} setView={setCurrentView} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-cyber-cyan/10 bg-cyber-dark/40 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="بحث سريع..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 pr-10 pl-4 text-xs focus:border-cyber-cyan/50 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-white/60 hover:text-cyber-cyan transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyber-red rounded-full" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-cyber-cyan">Anonymous_User</p>
                <p className="text-[10px] text-white/40 text-right">مستوى الحماية: 88%</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-cyber-gray border border-cyber-cyan/30 flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-cyber-cyan" />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>

        {/* Footer Bar */}
        <footer className="h-8 border-t border-cyber-cyan/10 bg-cyber-dark flex items-center px-8 justify-between text-[10px] font-mono text-white/30 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-green shadow-[0_0_5px_rgba(0,255,65,0.5)]" />
              ENCRYPTION ACTIVE
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-[0_0_5px_rgba(0,240,255,0.5)]" />
              VPN SECURE
            </span>
          </div>
          <div>
            © 2026 ANONYMOUS DIGITAL PROTECTION - VER 4.0.2
          </div>
        </footer>
      </main>
    </div>
  );
}
