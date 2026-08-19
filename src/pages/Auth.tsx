import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, Shield } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    login({
      id: '1',
      name: isLogin ? 'Test O\'quvchi' : 'Yangi O\'quvchi',
      email: 'test@example.com',
      role: role,
      score: 1250,
      streak: 3
    });
    navigate('/');
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-arena-card border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          {/* Decorative blur */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-arena-accent/20 rounded-full blur-[60px]" />

          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-display font-bold mb-2 uppercase tracking-wide">
              {isLogin ? 'Xush Kelibsiz' : 'Jamoaga Qo\'shiling'}
            </h2>
            <p className="text-arena-textMuted">
              Arena eshiklari siz uchun doim ochiq
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-arena-textMuted group-focus-within:text-arena-accent transition-colors" />
                    <input 
                      type="text" 
                      placeholder="To'liq ismingiz" 
                      required
                      className="w-full bg-arena-bg border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-arena-accent focus:ring-1 focus:ring-arena-accent transition-all"
                    />
                  </div>

                  <div className="flex bg-arena-bg rounded-lg border border-white/10 p-1">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`flex-1 py-2 rounded-md font-medium text-sm transition-all ${role === 'student' ? 'bg-white/10 text-white' : 'text-arena-textMuted hover:text-white'}`}
                    >
                      O'quvchi
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('teacher')}
                      className={`flex-1 py-2 rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 ${role === 'teacher' ? 'bg-arena-accent/20 text-arena-accent' : 'text-arena-textMuted hover:text-white'}`}
                    >
                      <Shield className="w-3 h-3" /> O'qituvchi
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-arena-textMuted group-focus-within:text-arena-accent transition-colors" />
              <input 
                type="email" 
                placeholder="Elektron pochta" 
                required
                className="w-full bg-arena-bg border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-arena-accent focus:ring-1 focus:ring-arena-accent transition-all"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-arena-textMuted group-focus-within:text-arena-accent transition-colors" />
              <input 
                type="password" 
                placeholder="Parol" 
                required
                className="w-full bg-arena-bg border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-arena-accent focus:ring-1 focus:ring-arena-accent transition-all"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-xs text-arena-textMuted hover:text-arena-accent transition-colors">
                  Parolni unutdingizmi?
                </a>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 mt-2 bg-arena-accent text-white font-display font-bold rounded-lg hover:bg-arena-accentHover transition-colors flex items-center justify-center gap-2 uppercase tracking-widest shadow-glow"
            >
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {isLogin ? 'Kirish' : 'Ro\'yxatdan O\'tish'}
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-sm text-arena-textMuted">
              {isLogin ? 'Hali hisobingiz yo\'qmi?' : 'Allaqachon hisobingiz bormi?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-white font-medium hover:text-arena-accent transition-colors focus:outline-none"
              >
                {isLogin ? 'Ro\'yxatdan O\'tish' : 'Kirish'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
