import React from 'react';
import { LayoutDashboard, ShieldCheck, KeyRound, MessageSquareCode, Bell, LogOut, Terminal, Globe } from 'lucide-react';
import { View } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

export default function Sidebar({ currentView, setView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'identity', label: 'مراقب الهوية', icon: ShieldCheck },
    { id: 'password', label: 'فاحص المرور', icon: KeyRound },
    { id: 'assistant', label: 'مساعد الأمن', icon: MessageSquareCode },
    { id: 'news', label: 'أخبار الأمن', icon: Bell },
  ] as const;

  return (
    <div className="w-64 cyber-border h-screen flex flex-col bg-cyber-dark/80 backdrop-blur-xl">
      <div className="p-6 flex items-center gap-3 border-b border-cyber-cyan/10">
        <div className="p-2 bg-cyber-cyan/10 rounded-lg">
          <Terminal className="w-6 h-6 text-cyber-cyan" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight text-cyber-cyan">حماية المجهول</h1>
          <p className="text-[10px] font-mono text-cyber-cyan/50 tracking-[0.2em]">ANONYMOUS PROTECTION</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all group relative overflow-hidden",
              currentView === item.id 
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            {currentView === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-cyan" />
            )}
            <item.icon className={cn("w-5 h-5", currentView === item.id ? "text-cyber-cyan" : "group-hover:text-cyber-cyan")} />
            <span className="font-sans">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-cyber-cyan/10 space-y-3">
        <div className="px-4 py-2">
          <p className="text-[10px] font-mono text-white/30 uppercase mb-3 tracking-widest">تواصل مع المطور</p>
          <div className="flex flex-col gap-2">
            <a 
              href="https://t.me/HIKR7" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 text-xs text-white/60 hover:text-cyber-cyan transition-colors"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>تليجرام: @HIKR7</span>
            </a>
            <a 
              href="https://www.tiktok.com/@termax_whot.is" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 text-xs text-white/60 hover:text-cyber-cyan transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>تيك توك: @termax_whot.is</span>
            </a>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-cyber-red/60 hover:text-cyber-red hover:bg-cyber-red/10 transition-all font-sans">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}
