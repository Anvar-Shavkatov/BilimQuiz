import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, CheckCircle2, XCircle, Share2, RotateCcw, Home } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('lastQuizResult');
    if (data) {
      setResultData(JSON.parse(data));
    }
  }, []);

  if (!resultData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-arena-textMuted animate-pulse">Yuklanmoqda...</div>
      </div>
    );
  }

  const { score, stats, subject } = resultData;
  const total = stats.correct + stats.wrong;
  const percentage = Math.round((stats.correct / total) * 100);

  // Formatting time (e.g. 65s -> 01:05)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full flex-1 flex flex-col pt-12 pb-24 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-arena-card border border-white/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Confetti / Glow effects in background */}
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-arena-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 relative z-10"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-arena-bg border-4 border-arena-accent flex items-center justify-center mb-6 shadow-glow">
            <Trophy className="w-10 h-10 text-arena-accent" />
          </div>
          <h2 className="text-xl text-arena-textMuted uppercase tracking-widest font-mono mb-2">{subject}</h2>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-2">Test Yakunlandi!</h1>
          <p className="text-lg text-arena-textMuted">Ajoyib natija, Arenada o'z o'rningizni mustahkamladingiz.</p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="my-12 py-8 border-y border-white/5 relative z-10"
        >
          <div className="text-sm text-arena-textMuted uppercase tracking-widest mb-2 font-mono">Umumiy Ball</div>
          <div className="text-7xl font-display font-bold text-arena-accent drop-shadow-[0_0_20px_rgba(227,30,36,0.5)]">
            {score}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 relative z-10"
        >
          <div className="bg-arena-bg rounded-lg p-4 border border-white/5">
            <div className="text-arena-textMuted text-xs uppercase font-mono mb-1">To'g'ri</div>
            <div className="text-2xl font-bold text-arena-success flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> {stats.correct}
            </div>
          </div>
          <div className="bg-arena-bg rounded-lg p-4 border border-white/5">
            <div className="text-arena-textMuted text-xs uppercase font-mono mb-1">Noto'g'ri</div>
            <div className="text-2xl font-bold text-arena-accent flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5" /> {stats.wrong}
            </div>
          </div>
          <div className="bg-arena-bg rounded-lg p-4 border border-white/5">
            <div className="text-arena-textMuted text-xs uppercase font-mono mb-1">Aniqlik</div>
            <div className="text-2xl font-bold text-white">
              {percentage}%
            </div>
          </div>
          <div className="bg-arena-bg rounded-lg p-4 border border-white/5">
            <div className="text-arena-textMuted text-xs uppercase font-mono mb-1">Vaqt</div>
            <div className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-arena-textMuted" /> {formatTime(stats.timeSpent)}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
        >
          <button 
            onClick={() => navigate(`/quiz/${id}`)}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-arena-accent text-white font-bold rounded hover:bg-arena-accentHover transition-colors uppercase tracking-wider"
          >
            <RotateCcw className="w-5 h-5" /> Qayta urinish
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white/10 text-white font-bold rounded hover:bg-white/20 transition-colors uppercase tracking-wider"
          >
            <Home className="w-5 h-5" /> Bosh sahifa
          </button>
          <button 
            className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-bold rounded hover:bg-white/5 transition-colors uppercase tracking-wider"
          >
            <Share2 className="w-5 h-5" /> Ulashish
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}
