import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, Calendar, Award, Zap, History, Star } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" />;
  }

  // Mock Data for Profile
  const stats = {
    rank: 42,
    accuracy: 85,
    quizzesCompleted: 15,
    joined: '2026-08-01'
  };

  const recentHistory = [
    { id: 1, subject: 'JavaScript Asoslari', date: 'Bugun', score: 950, accuracy: 90 },
    { id: 2, subject: 'Frontend: CSS Grid va Flexbox', date: 'Kecha', score: 820, accuracy: 80 },
    { id: 3, subject: 'React Hooks asoslari', date: '3 kun oldin', score: 1050, accuracy: 100 },
  ];

  const badges = [
    { id: 1, name: 'Birinchi Qadam', description: 'Birinchi testni yakunladi', icon: <Target className="text-blue-400" />, unlocked: true },
    { id: 2, name: 'Olovli Seriya', description: 'Ketma-ket 5 marta to\'g\'ri javob', icon: <Flame className="text-orange-500" />, unlocked: true },
    { id: 3, name: 'Benuqson G\'alaba', description: '100% aniqlik bilan testni yakunladi', icon: <Award className="text-yellow-400" />, unlocked: true },
    { id: 4, name: 'Bilim Ustasi', description: 'Umumiy ball 5000 dan oshdi', icon: <Trophy className="text-purple-400" />, unlocked: false },
  ];

  return (
    <div className="container mx-auto px-6 py-12 flex-1 flex flex-col md:flex-row gap-8 relative z-10 max-w-6xl">
      
      {/* Left Column: Profile Card */}
      <div className="w-full md:w-1/3 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-arena-card border border-white/10 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-arena-accent/10 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-arena-bg border-4 border-arena-accent flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(227,30,36,0.3)]">
              <span className="text-4xl font-bold text-arena-accent">{user.name.charAt(0)}</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-1">{user.name}</h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-arena-bg border border-white/5 text-sm text-arena-textMuted mb-4">
              <Star className="w-4 h-4 text-arena-accent" />
              <span>O'quvchi</span>
            </div>
            <p className="text-sm text-arena-textMuted flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" /> {stats.joined} dan beri arenada
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-arena-accent">{user.score}</div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">Umumiy Ball</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-white">#{stats.rank}</div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">Reyting</div>
            </div>
            <div className="text-center mt-4">
              <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-orange-500" /> {user.streak}
              </div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">Kunlik Seriya</div>
            </div>
            <div className="text-center mt-4">
              <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                <Target className="w-5 h-5 text-arena-success" /> {stats.accuracy}%
              </div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">Aniqlik</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Content */}
      <div className="w-full md:w-2/3 flex flex-col gap-8">
        
        {/* Badges Section */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Award className="text-arena-accent" /> Yutuqlar (Badges)
            </h3>
            <span className="text-sm text-arena-textMuted font-mono">
              {badges.filter(b => b.unlocked).length} / {badges.length}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <motion.div 
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                  badge.unlocked 
                    ? 'bg-arena-card border-white/10 hover:border-arena-accent/30' 
                    : 'bg-arena-bg border-white/5 opacity-50 grayscale'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.unlocked ? 'bg-white/5' : 'bg-transparent'}`}>
                  {React.cloneElement(badge.icon as React.ReactElement, { className: 'w-6 h-6 ' + (badge.icon as any).props.className })}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-arena-textMuted">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent History Section */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <History className="text-arena-accent" /> Oxirgi Testlar
            </h3>
            <button className="text-sm text-arena-textMuted hover:text-white transition-colors">Barchasini ko'rish</button>
          </div>
          
          <div className="bg-arena-card border border-white/10 rounded-xl overflow-hidden">
            {recentHistory.map((history, index) => (
              <div 
                key={history.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors ${
                  index !== recentHistory.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div>
                  <h4 className="font-bold text-white mb-1">{history.subject}</h4>
                  <div className="text-xs text-arena-textMuted flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {history.date}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-bold text-arena-success">{history.accuracy}%</div>
                    <div className="text-xs text-arena-textMuted uppercase">Aniqlik</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-arena-accent flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {history.score}
                    </div>
                    <div className="text-xs text-arena-textMuted uppercase">Ball</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
        
      </div>
    </div>
  );
}
