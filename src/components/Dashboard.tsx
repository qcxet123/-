import React from 'react';
import { motion } from 'motion/react';
import { Shield, Smartphone, Globe, AlertTriangle, CheckCircle2, ChevronRight, Activity, Zap, Lock } from 'lucide-react';
import { SecurityEvent } from '../types';

const INITIAL_EVENTS: SecurityEvent[] = [
  { id: '1', type: 'success', title: 'تم فحص النظام', description: 'كل الأنظمة تعمل بشكل طبيعي ولا يوجد تهديدات مباشرة.', timestamp: 'منذ دقيقتين' },
  { id: '2', type: 'warning', title: 'محاولة دخول مشبوهة', description: 'تم رصد محاولة دخول من موقع غير معروف. تم الحظر تلقائياً.', timestamp: 'منذ ساعة' },
  { id: '3', type: 'danger', title: 'تسريب محتمل للبيانات', description: 'تم العثور على بريدك الإلكتروني في قاعدة بيانات مسربة حديثاً.', timestamp: 'منذ يوم' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold glitch-text">نظرة عامة على الأمان</h2>
          <p className="text-white/50 mt-1">حالة الحماية الرقمية لهويتك وأجهزتك</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 cyber-border rounded-lg flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyber-cyan animate-pulse" />
            <span className="text-xs font-mono text-cyber-cyan">LIVE MONITORING</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'مستوى الأمان', value: '88%', icon: Shield, color: 'text-cyber-green' },
          { label: 'الأجهزة المحمية', value: '4/4', icon: Smartphone, color: 'text-cyber-cyan' },
          { label: 'الشبكة حيوية', value: '99.9%', icon: Globe, color: 'text-cyber-cyan' },
          { label: 'تهديدات مكتشفة', value: '12', icon: AlertTriangle, color: 'text-cyber-red' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="cyber-card group hover:border-cyber-cyan/40 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/40 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 font-mono">{stat.value}</p>
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="cyber-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyber-cyan" />
                آخر النشاطات الأمنية
              </h3>
              <button className="text-xs text-cyber-cyan hover:underline">عرض الكل</button>
            </div>
            <div className="space-y-4">
              {INITIAL_EVENTS.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyber-cyan/20 transition-all group">
                  <div className={`mt-1 p-2 rounded-full ${
                    event.type === 'success' ? 'bg-cyber-green/10 text-cyber-green' :
                    event.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-cyber-red/10 text-cyber-red'
                  }`}>
                    {event.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">{event.title}</h4>
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{event.timestamp}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">{event.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-cyber-cyan transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="cyber-card overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-cyber-cyan" />
                  قوة التشفير اليوم
                </h3>
                <p className="text-sm text-white/60 mb-4">يتم استخدام AES-256 لحماية كافة بياناتك المخزنة محلياً.</p>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-cyan w-[92%] cyber-glow" />
                </div>
              </div>
            </div>
            <div className="cyber-card flex items-center justify-center text-center p-8 border-dashed">
              <div>
                <div className="w-12 h-12 rounded-full bg-cyber-cyan/10 flex items-center justify-center mx-auto mb-4 border border-cyber-cyan/20">
                  <Activity className="w-6 h-6 text-cyber-cyan" />
                </div>
                <h3 className="font-bold mb-1">بدء فحص عميق</h3>
                <p className="text-xs text-white/40 mb-4">فحص الثغرات الأمنية في الشبكة والأجهزة</p>
                <button className="cyber-button text-xs w-full">بدء الفحص</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="cyber-card bg-cyber-cyan/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl scale-150 rotate-12">
              <Shield className="w-24 h-24 text-cyber-cyan" />
            </div>
            <h3 className="font-bold text-cyber-cyan mb-2">نصيحة اليوم الأمنية</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              "استخدم دائماً المصادقة الثنائية (2FA) عبر تطبيقات المصادقة وليس الرسائل النصية المباشرة لضمان مستوى أمان أعلى."
            </p>
            <button className="text-xs font-bold text-cyber-cyan flex items-center gap-1 group">
              اقرأ المزيد 
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="cyber-card border-cyber-red/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-cyber-red">تحذيرات حرجة</h3>
              <span className="px-2 py-1 bg-cyber-red/10 text-cyber-red text-[10px] font-mono rounded">1 CRITICAL</span>
            </div>
            <div className="p-3 bg-cyber-red/5 rounded border border-cyber-red/10">
              <h4 className="text-xs font-bold mb-1">تسريب كلمة مرور</h4>
              <p className="text-[10px] text-white/50">تم رصد كلمة مرور "OldAccount22" في تسريب LinkedIn الأخير.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
