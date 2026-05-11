import React, { useState } from 'react';
import { Search, Mail, Phone, Fingerprint, ShieldCheck, AlertCircle, Scan, History, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function IdentityMonitor() {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'none' | 'found' | null>(null);

  const startScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate deep web scan
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(query.includes('leak') ? 'found' : 'none');
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold glitch-text">مراقب الهوية الرقمية</h2>
          <p className="text-white/60 mt-1">افحص بريدك الإلكتروني أو هاتفك للتأكد من عدم وجود تسريبات في الويب المظلم</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 cyber-border rounded flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyber-cyan" />
            <span className="text-[10px] font-mono">BROWSING 2.4PB DATA</span>
          </div>
        </div>
      </div>

      <div className="cyber-card p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-20" />
        
        <form onSubmit={startScan} className="max-w-2xl mx-auto space-y-6 text-center">
          <div className="inline-flex p-4 rounded-full bg-cyber-cyan/5 border border-cyber-cyan/20 mb-4">
            <Fingerprint className="w-12 h-12 text-cyber-cyan" />
          </div>
          
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بريد إلكتروني، رقم هاتف، أو اسم مستخدم..."
              className="w-full cyber-input text-center text-lg py-5 rounded-2xl group-hover:border-cyber-cyan/40"
              disabled={isScanning}
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Mail className="w-5 h-5 text-white/20 group-hover:text-cyber-cyan transition-colors" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isScanning || !query}
            className="w-full cyber-button py-4 text-lg font-bold flex items-center justify-center gap-3 relative overflow-hidden"
          >
            {isScanning ? (
              <>
                <Scan className="w-6 h-6 animate-pulse" />
                <span>جاري مسح قواعد البيانات...</span>
                <div className="absolute bottom-0 left-0 h-1 bg-cyber-cyan animate-[shimmer_2s_infinite]" style={{ width: '100%' }} />
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                <span>ابدأ الفحص العميق</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
            WE DO NOT STORE YOUR DATA. SCAN IS PERFORMED AGAINST PUBLIC DATA LEAKS.
          </p>
        </form>
      </div>

      <AnimatePresence>
        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              "cyber-card border-2",
              scanResult === 'found' ? "border-cyber-red/50 bg-cyber-red/5" : "border-cyber-green/50 bg-cyber-green/5"
            )}
          >
            <div className="flex items-start gap-6">
              <div className={cn(
                "p-4 rounded-xl",
                scanResult === 'found' ? "bg-cyber-red/20 text-cyber-red" : "bg-cyber-green/20 text-cyber-green"
              )}>
                {scanResult === 'found' ? <AlertCircle className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
              </div>
              <div className="flex-1">
                <h3 className={cn(
                  "text-xl font-bold mb-2",
                  scanResult === 'found' ? "text-cyber-red" : "text-cyber-green"
                )}>
                  {scanResult === 'found' ? 'تم العثور على تهديد محتمل!' : 'بياناتك في أمان تام'}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {scanResult === 'found' 
                    ? `لقد وجدنا ${query} في قاعدة بيانات مسربة بتاريخ يناير 2024. ننصحك بتغيير كلمات المرور فوراً وتفعيل المصادقة الثنائية.`
                    : 'لم نجد أي إشارة لتسريب بياناتك في أي من قواعد البيانات المعروفة للويب المظلم حتى هذه اللحظة.'}
                </p>
                <div className="flex gap-4 mt-6">
                  <button className={cn(
                    "text-xs font-bold px-4 py-2 rounded border transition-all",
                    scanResult === 'found' ? "border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10" : "border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                  )}>
                    تحميل التقرير الكامل
                  </button>
                  <button className="text-xs text-white/40 hover:text-white transition-colors">
                    فحص آخر
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'عمليات البحث اليوم', value: '1,242,503', icon: History },
          { label: 'إجمالي التسريبات', value: '14,029', icon: Globe },
          { label: 'حسابات محمية', value: '8.4M+', icon: ShieldCheck },
        ].map((item, i) => (
          <div key={i} className="cyber-card flex items-center gap-4">
            <div className="p-2 bg-cyber-cyan/10 rounded">
              <item.icon className="w-4 h-4 text-cyber-cyan" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase">{item.label}</p>
              <p className="text-sm font-bold font-mono">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
