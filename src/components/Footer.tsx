import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swords, Send, Instagram, Youtube, Facebook, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export default function Footer() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { user } = useAuthStore();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    
    // We insert into feedbacks table
    const { error } = await supabase.from('feedbacks').insert({
      user_id: user?.id || null,
      message: message.trim(),
    });

    if (error) {
      setStatus('error');
      console.error(error);
    } else {
      setStatus('success');
      setMessage('');
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-arena-bg border-t border-white/5 pt-16 pb-8 px-6 mt-20 relative z-20">
      <div className="container mx-auto max-w-6xl">
        
        {/* Aloqa / Feedback Form Qismi */}
        <div className="bg-arena-card border border-white/5 rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-arena-accent/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex-1">
            <h3 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="text-arena-accent w-6 h-6" /> Bizga yozing!
            </h3>
            <p className="text-arena-textMuted text-sm mb-4">
              Sayt ishlashida xatolik bormi yoki taklifingiz bormi? Botga to'g'ridan-to'g'ri shu yerdan xabar yuboring. Biz albatta o'qib chiqamiz!
            </p>
            
            <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Xabar yoki shikoyatingizni yozing..."
                className="flex-1 bg-arena-bg border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-arena-accent transition-colors"
                required
              />
              <button 
                type="submit"
                disabled={status === 'loading' || !message.trim()}
                className="px-6 py-3 bg-arena-accent text-white font-bold rounded-lg hover:bg-arena-accentHover transition-colors flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Yuborilmoqda...' : <><Send className="w-4 h-4" /> Yuborish</>}
              </button>
            </form>
            
            {status === 'success' && (
              <div className="text-arena-success text-sm font-medium mt-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Xabaringiz muvaffaqiyatli yuborildi! Rahmat.
              </div>
            )}
            {status === 'error' && (
              <div className="text-arena-accent text-sm font-medium mt-3">
                Xatolik yuz berdi. Iltimos qayta urinib ko'ring yoki to'g'ridan-to'g'ri telegram orqali yozing.
              </div>
            )}
          </div>
          
          <div className="hidden md:block w-[1px] h-32 bg-white/10 mx-4"></div>
          
          <div className="flex-shrink-0 text-center md:text-left">
            <p className="text-arena-textMuted text-sm mb-3">Yoki Telegram orqali bog'laning:</p>
            <a 
              href="https://t.me/Bilimquiz_AloqaBot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white font-bold rounded-lg hover:bg-[#0077b3] transition-colors"
            >
              <Send className="w-4 h-4" /> @Bilimquiz_AloqaBot
            </a>
          </div>
        </div>

        {/* Asosiy Footer Linklar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Ustun 1: Brend */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-8 h-8 rounded bg-arena-card border border-white/5 flex items-center justify-center group-hover:border-arena-accent/50 transition-colors">
                <Swords className="text-arena-accent w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                BilimQuiz
              </h2>
            </Link>
            <p className="text-arena-textMuted leading-relaxed text-sm">
              O'quvchilar uchun bilimni o'yin orqali mustahkamlash platformasi. Arenaga kiring va o'z bilimingizni sinab ko'ring.
            </p>
          </div>

          {/* Ustun 2: Navigatsiya */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm font-display">Navigatsiya</h3>
            <ul className="space-y-3 text-sm text-arena-textMuted">
              <li><Link to="/#subjects" className="hover:text-arena-accent transition-colors">Dasturlash</Link></li>
              <li><Link to="/leaderboard" className="hover:text-arena-accent transition-colors">Reyting jadvali</Link></li>
              <li><Link to="/how-it-works" className="hover:text-arena-accent transition-colors">Qanday ishlaydi</Link></li>
            </ul>
          </div>

          {/* Ustun 3: Yordam */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm font-display">Yordam</h3>
            <ul className="space-y-3 text-sm text-arena-textMuted">
              <li><Link to="/faq" className="hover:text-arena-accent transition-colors">Ko'p so'raladigan savollar</Link></li>
              <li><Link to="/terms" className="hover:text-arena-accent transition-colors">Foydalanish shartlari</Link></li>
              <li><Link to="/privacy" className="hover:text-arena-accent transition-colors">Maxfiylik siyosati</Link></li>
            </ul>
          </div>

          {/* Ustun 4: Bog'lanish ijtimoiy tarmoqlar */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm font-display">Ijtimoiy Tarmoqlar</h3>
            <div className="flex items-center gap-4">
              <a href="https://t.me/bilimquiz_uz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-arena-card border border-white/5 flex items-center justify-center text-arena-textMuted hover:text-white hover:bg-[#0088cc] hover:border-[#0088cc] transition-all">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/bilimquiz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-arena-card border border-white/5 flex items-center justify-center text-arena-textMuted hover:text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:border-transparent transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@bilimquiz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-arena-card border border-white/5 flex items-center justify-center text-arena-textMuted hover:text-white hover:bg-red-600 hover:border-red-600 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <a href="mailto:info@bilimquiz.uz" className="flex items-center gap-2 text-arena-textMuted hover:text-white transition-colors text-sm mt-6">
              <Mail className="w-4 h-4" /> info@bilimquiz.uz
            </a>
          </div>
          
        </div>

        {/* Pastki qator */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-arena-textMuted font-mono">
          <p>© 2026 BilimQuiz. Barcha huquqlar himoyalangan.</p>
          <p className="uppercase tracking-widest text-white/50">Bilim bilan qurilgan</p>
        </div>
      </div>
    </footer>
  );
}
