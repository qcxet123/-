import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ShieldCheck, ShieldAlert, Shield, Info, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [crackTime, setCrackTime] = useState('');

  useEffect(() => {
    evaluatePassword(password);
  }, [password]);

  const evaluatePassword = (val: string) => {
    let score = 0;
    let suggs = [];
    
    if (val.length === 0) {
      setStrength(0);
      setSuggestions([]);
      setCrackTime('');
      return;
    }

    if (val.length < 8) suggs.push("اجعلها أطول من 8 أحرف");
    else score += 25;

    if (/[A-Z]/.test(val)) score += 25;
    else suggs.push("أضف أحرفاً كبيرة (A-Z)");

    if (/[0-9]/.test(val)) score += 25;
    else suggs.push("أضف أرقاماً (0-9)");

    if (/[^A-Za-z0-9]/.test(val)) score += 25;
    else suggs.push("أضف رموزاً خاصة (!@#$)");

    setStrength(score);
    setSuggestions(suggs);

    // Simulated crack time estimation
    if (score <= 25) setCrackTime('ثانية واحدة');
    else if (score <= 50) setCrackTime('5 دقائق');
    else if (score <= 75) setCrackTime('سنة واحدة');
    else setCrackTime('10,000 سنة');
  };

  const generateStrongPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let generated = "";
    for (let i = 0; i < 16; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const getStrengthColor = () => {
    if (strength <= 25) return 'bg-cyber-red';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-cyber-green';
  };

  const getStrengthLabel = () => {
    if (strength <= 25) return 'ضعيفة جداً';
    if (strength <= 50) return 'ضعيفة';
    if (strength <= 75) return 'جيدة';
    return 'ممتازة';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 glitch-text">فاحص قوة كلمة المرور</h2>
        <p className="text-white/60">تأكد من أن مفاتيحك الرقمية غير قابلة للكسر</p>
      </div>

      <div className="cyber-card p-8">
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full cyber-input text-xl pr-12 pl-12"
            placeholder="أدخل كلمة المرور للفحص..."
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-cyber-cyan transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {strength >= 75 ? (
              <ShieldCheck className="w-6 h-6 text-cyber-green" />
            ) : strength >= 50 ? (
              <Shield className="w-6 h-6 text-yellow-500" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-cyber-red" />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">مدى القوة</span>
            <span className={cn("font-bold px-2 py-0.5 rounded text-[10px] uppercase", 
              strength <= 25 ? "bg-cyber-red/20 text-cyber-red" : 
              strength <= 50 ? "bg-orange-500/20 text-orange-500" : 
              strength <= 75 ? "bg-yellow-500/20 text-yellow-500" : 
              "bg-cyber-green/20 text-cyber-green"
            )}>
              {getStrengthLabel()}
            </span>
          </div>
          
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className={cn("h-full cyber-glow", getStrengthColor())}
              initial={{ width: 0 }}
              animate={{ width: `${strength}%` }}
              transition={{ type: 'spring', bounce: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <p className="text-[10px] text-white/40 uppercase mb-1">وقت الكسر التقريبي</p>
              <p className="text-lg font-bold font-mono text-cyber-cyan">{crackTime || '---'}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all group" onClick={generateStrongPassword}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] text-white/40 uppercase">توليد كلمة مرور</p>
                <RefreshCw className="w-3 h-3 text-cyber-cyan group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <p className="text-sm font-bold text-cyber-cyan">اضغط هنا للتوليد</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="cyber-card border-yellow-500/20 bg-yellow-500/5"
          >
            <h3 className="font-bold flex items-center gap-2 mb-4 text-yellow-500">
              <Info className="w-5 h-5" />
              صائح لتحسين كلمة المرور
            </h3>
            <ul className="space-y-2">
              {suggestions.map((s, i) => (
                <li key={i} className="text-sm text-white/70 flex items-center gap-2">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
