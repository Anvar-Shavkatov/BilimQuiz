import React from 'react';
import { Link } from 'react-router-dom';
import { Swords, Send, Instagram, Youtube, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-arena-bg border-t border-white/5 pt-16 pb-8 px-6 mt-20 relative z-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Ustun 1: Brend */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-8 h-8 rounded bg-arena-card border border-white/5 flex items-center justify-center">
                <Swords className="text-arena-accent w-5 h-5" />
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
              <li><Link to="/teachers" className="hover:text-arena-accent transition-colors">O'qituvchilar uchun</Link></li>
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

          {/* Ustun 4: Bog'lanish */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm font-display">Bog'lanish</h3>
            <a href="mailto:info@bilimquiz.uz" className="flex items-center gap-2 text-arena-textMuted hover:text-white transition-colors text-sm mb-6">
              <Mail className="w-4 h-4" /> info@bilimquiz.uz
            </a>
            
            <div className="flex items-center gap-4">
              <a href="https://t.me/bilimquiz_uz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-arena-card border border-white/5 flex items-center justify-center text-arena-textMuted hover:text-white hover:bg-arena-accent hover:border-arena-accent transition-all">
                <Send className="w-4 h-4" /> {/* Telegram icon placeholder */}
              </a>
              <a href="https://instagram.com/bilimquiz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-arena-card border border-white/5 flex items-center justify-center text-arena-textMuted hover:text-white hover:bg-arena-accent hover:border-arena-accent transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@bilimquiz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-arena-card border border-white/5 flex items-center justify-center text-arena-textMuted hover:text-white hover:bg-arena-accent hover:border-arena-accent transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/bilimquiz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-arena-card border border-white/5 flex items-center justify-center text-arena-textMuted hover:text-white hover:bg-arena-accent hover:border-arena-accent transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
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
