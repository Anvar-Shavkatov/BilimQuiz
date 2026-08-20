import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, User, Zap, Shield, Crown } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Battle() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [stage, setStage] = useState<'search' | 'found' | 'battle' | 'result'>('search');
  const [opponent, setOpponent] = useState<any>(null);
  
  // Battle states
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (stage === 'search') {
      // Simulate matchmaking
      const timer = setTimeout(() => {
        setOpponent({
          name: "Sardor_Dev",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sardor",
          level: 15
        });
        setStage('found');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (stage === 'found') {
      const timer = setTimeout(() => {
        setStage('battle');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (stage === 'battle') {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        
        // Simulate opponent scoring randomly
        if (Math.random() > 0.6) {
          setOpponentScore(s => s + Math.floor(Math.random() * 20));
        }

        return () => clearTimeout(timer);
      } else {
        setStage('result');
      }
    }
  }, [stage, timeLeft, user, navigate]);

  const handleTap = () => {
    if (stage === 'battle') {
      setPlayerScore(s => s + Math.floor(Math.random() * 15) + 5);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden h-[calc(100vh-80px)]">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500/5 transition-opacity ${stage === 'battle' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 right-0 w-1/2 h-full bg-red-500/5 transition-opacity ${stage === 'battle' ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-arena-accent/30 border-t-arena-accent animate-spin absolute inset-0"></div>
              <div className="w-24 h-24 rounded-full bg-arena-card flex items-center justify-center z-10 relative border-2 border-arena-accent shadow-glow">
                <Swords className="w-10 h-10 text-arena-accent animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-2">Raqib qidirilmoqda</h2>
            <p className="text-arena-textMuted">Teng kuchli raqib tanlanmoqda...</p>
          </motion.div>
        )}

        {stage === 'found' && (
          <motion.div
            key="found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="flex flex-col items-center w-full max-w-4xl"
          >
            <h2 className="text-4xl font-display font-bold text-arena-accent uppercase mb-16 shadow-glow">Jang Boshlanmoqda!</h2>
            
            <div className="flex items-center justify-between w-full px-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-4 border-blue-500 bg-arena-bg mb-4 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`} alt="You" />
                </div>
                <h3 className="text-2xl font-bold">{user?.name}</h3>
                <span className="text-blue-400 font-mono">Siz</span>
              </div>
              
              <div className="text-6xl font-display font-black text-arena-textMuted italic mx-8">
                VS
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-4 border-red-500 bg-arena-bg mb-4 overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  <img src={opponent?.avatar} alt="Opponent" />
                </div>
                <h3 className="text-2xl font-bold">{opponent?.name}</h3>
                <span className="text-red-400 font-mono">Lvl {opponent?.level}</span>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'battle' && (
          <motion.div
            key="battle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full h-full justify-center relative z-10"
          >
            <div className="absolute top-10 text-4xl font-mono font-black text-white">
              {timeLeft}s
            </div>

            <div className="flex w-full h-[60vh] gap-4">
              {/* Player Side */}
              <button 
                onClick={handleTap}
                className="flex-1 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-500 hover:bg-blue-500/20 transition-all active:scale-95"
              >
                <div className="absolute bottom-0 w-full bg-blue-500/30 transition-all duration-300 ease-out" style={{ height: `${Math.min(playerScore / 10, 100)}%` }}></div>
                <Zap className="w-16 h-16 text-blue-400 mb-4 group-hover:scale-125 transition-transform relative z-10" />
                <h3 className="text-4xl font-black text-blue-100 relative z-10">{playerScore}</h3>
                <p className="text-blue-300 mt-2 relative z-10 font-bold uppercase tracking-widest">Bosish!</p>
              </button>

              {/* Opponent Side */}
              <div className="flex-1 rounded-3xl border-2 border-red-500/30 bg-red-500/10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-red-500/30 transition-all duration-300 ease-out" style={{ height: `${Math.min(opponentScore / 10, 100)}%` }}></div>
                <Shield className="w-16 h-16 text-red-400 mb-4 relative z-10" />
                <h3 className="text-4xl font-black text-red-100 relative z-10">{opponentScore}</h3>
                <p className="text-red-300 mt-2 relative z-10 uppercase tracking-widest">{opponent?.name}</p>
              </div>
            </div>
            <p className="mt-8 text-arena-textMuted uppercase tracking-widest font-bold animate-pulse">Tezkor kod yozish simulyatsiyasi (Ko'proq bosing!)</p>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center bg-arena-card p-12 rounded-3xl border-2 border-white/10 shadow-2xl relative overflow-hidden"
          >
            {playerScore > opponentScore ? (
              <div className="absolute inset-0 bg-gradient-to-t from-arena-success/20 to-transparent pointer-events-none" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-arena-accent/20 to-transparent pointer-events-none" />
            )}

            <Crown className={`w-24 h-24 mb-6 ${playerScore > opponentScore ? 'text-yellow-400' : 'text-gray-500'}`} />
            
            <h2 className="text-5xl font-display font-black uppercase tracking-tight mb-2">
              {playerScore > opponentScore ? "G'alaba!" : "Mag'lubiyat"}
            </h2>
            
            <div className="text-2xl font-mono mb-8 text-arena-textMuted">
              Siz: <span className="text-white font-bold">{playerScore}</span> - <span className="text-white font-bold">{opponentScore}</span> :{opponent?.name}
            </div>

            {playerScore > opponentScore && (
              <div className="text-arena-success font-bold mb-8 text-xl animate-bounce">
                +100 Ball va Yangi Nishon!
              </div>
            )}

            <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition"
            >
              Asosiy Menyu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
