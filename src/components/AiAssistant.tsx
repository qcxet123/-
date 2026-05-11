import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { askSecurityExpert } from '../lib/gemini';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'مرحباً بك! أنا مساعد حماية المجهول الرقمي. كيف يمكنني مساعدتك في تأمين وجودك الرقمي اليوم؟ يمكنك سؤالي عن التشفير، حماية الخصوصية، أو كيفية استعادة حساب مخترق.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askSecurityExpert(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'لم أتمكن من الحصول على إجابة، يرجى المحاولة مرة أخرى.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg cyber-border flex items-center justify-center bg-cyber-cyan/10">
            <Bot className="w-6 h-6 text-cyber-cyan" />
          </div>
          <div>
            <h3 className="font-bold text-lg">مساعد حماية المجهول</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-cyber-green uppercase">AI SEC-AGENT ONLINE</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
          {['الخصوصية', 'التشفير', 'الفيروسات'].map((tag) => (
            <button 
              key={tag}
              onClick={() => setInput(prev => `${prev}حدثني عن ${tag}`)}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/50 hover:border-cyber-cyan/30 hover:text-cyber-cyan transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 cyber-border rounded-xl overflow-hidden flex flex-col bg-cyber-dark/40">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "mr-auto flex-row-reverse" : "ml-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                msg.role === 'assistant' ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20" : "bg-white/10 text-white/40 border border-white/10"
              )}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === 'assistant' 
                  ? "bg-cyber-gray border border-white/5 text-white/90 rounded-tr-none" 
                  : "bg-cyber-cyan text-cyber-black font-medium rounded-tl-none"
              )}>
                <div className="markdown-body prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 ml-auto"
            >
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-cyber-gray border border-white/5 p-4 rounded-2xl rounded-tr-none flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-bounce" />
                </div>
                <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest">تحليل البيانات...</span>
              </div>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-cyber-black/20">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اطرح سؤالك الأمني هنا..."
              className="w-full cyber-input pr-12 pl-4 py-4 rounded-xl"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyber-cyan text-cyber-black rounded-lg flex items-center justify-center hover:bg-cyber-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-white/30 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SECURE CHANNEL</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI EMPOWERED</span>
            <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> NO PII STORAGE</span>
          </div>
        </form>
      </div>
    </div>
  );
}
