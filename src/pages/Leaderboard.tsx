import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Search, Flame } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Mock Data for Leaderboard (fallback)
const MOCK_LEADERBOARD = [
  { id: 'm1', name: 'Anvar T.', score: 15420, quizzes: 142, streak: 12 },
  { id: 'm2', name: 'Jasur B.', score: 14200, quizzes: 128, streak: 5 },
  { id: 'm3', name: 'Madina K.', score: 13850, quizzes: 130, streak: 8 },
  { id: 'm4', name: 'Otabek R.', score: 12100, quizzes: 105, streak: 2 },
  { id: 'm5', name: 'Sevara A.', score: 11500, quizzes: 98, streak: 4 },
];

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaderboard, setLeaderboard] = useState<any[]>(MOCK_LEADERBOARD);
  
  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);
        
      if (data && data.length > 0) {
        setLeaderboard(data);
      }
    }
    fetchLeaderboard();
  }, []);

  const filteredData = leaderboard.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12 flex-1 max-w-5xl relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
            <Trophy className="text-arena-accent w-10 h-10" /> 
            Reyting
          </h1>
          <p className="text-arena-textMuted">Arenaning eng kuchli bilag'onlari</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-full md:w-auto"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-arena-textMuted" />
          <input 
            type="text" 
            placeholder="Qidirish..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-arena-card border border-white/10 rounded-full py-3 pl-10 pr-4 text-white focus:outline-none focus:border-arena-accent focus:ring-1 focus:ring-arena-accent transition-all"
          />
        </motion.div>
      </div>

      {/* Top 3 Podium (Visible only when not filtering) */}
      {!searchTerm && leaderboard.length >= 3 && (
        <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-6 mb-16 pt-10">
          {/* 2nd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/3 flex flex-col items-center order-2 md:order-1"
          >
            <div className="w-20 h-20 rounded-full bg-arena-card border-4 border-[#C0C0C0] flex items-center justify-center mb-4 relative shadow-[0_0_20px_rgba(192,192,192,0.3)] z-10">
              <span className="text-2xl font-bold text-[#C0C0C0]">{leaderboard[1].name?.charAt(0) || 'U'}</span>
              <div className="absolute -bottom-3 bg-[#C0C0C0] text-arena-bg text-xs font-bold px-2 py-0.5 rounded-full">#2</div>
            </div>
            <div className="bg-arena-card border border-white/5 border-t-[#C0C0C0]/50 rounded-t-xl w-full p-4 text-center pb-8 pt-8 -mt-6">
              <div className="font-bold text-white text-lg">{leaderboard[1].name}</div>
              <div className="text-arena-accent font-mono font-bold mt-1">{leaderboard[1].score}</div>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-1/3 flex flex-col items-center order-1 md:order-2 z-20"
          >
            <div className="w-28 h-28 rounded-full bg-arena-bg border-4 border-[#FFD700] flex items-center justify-center mb-4 relative shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              <span className="text-4xl font-bold text-[#FFD700]">{leaderboard[0].name?.charAt(0) || 'U'}</span>
              <div className="absolute -bottom-4 bg-[#FFD700] text-arena-bg text-sm font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                <Trophy className="w-3 h-3" /> #1
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#FFD700]/10 to-arena-card border border-[#FFD700]/30 rounded-t-xl w-full p-6 text-center pb-12 pt-10 -mt-8">
              <div className="font-bold text-white text-xl">{leaderboard[0].name}</div>
              <div className="text-[#FFD700] font-mono font-bold text-lg mt-1 drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">{leaderboard[0].score}</div>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-1/3 flex flex-col items-center order-3 md:order-3"
          >
            <div className="w-16 h-16 rounded-full bg-arena-card border-4 border-[#CD7F32] flex items-center justify-center mb-4 relative shadow-[0_0_15px_rgba(205,127,50,0.3)] z-10">
              <span className="text-xl font-bold text-[#CD7F32]">{leaderboard[2].name?.charAt(0) || 'U'}</span>
              <div className="absolute -bottom-2 bg-[#CD7F32] text-arena-bg text-xs font-bold px-2 py-0.5 rounded-full">#3</div>
            </div>
            <div className="bg-arena-card border border-white/5 border-t-[#CD7F32]/50 rounded-t-xl w-full p-4 text-center pb-6 pt-6 -mt-4">
              <div className="font-bold text-white text-base">{leaderboard[2].name}</div>
              <div className="text-arena-accent font-mono font-bold mt-1">{leaderboard[2].score}</div>
            </div>
          </motion.div>
        </div>
      )}

      {/* List */}
      <div className="bg-arena-card border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs text-arena-textMuted uppercase tracking-wider font-mono font-bold bg-white/5">
          <div className="col-span-2 sm:col-span-1 text-center">#</div>
          <div className="col-span-6 sm:col-span-5">O'quvchi</div>
          <div className="col-span-4 sm:col-span-3 text-right">Ball</div>
          <div className="hidden sm:block col-span-3 text-right">Testlar</div>
        </div>

        <div>
          {filteredData.length > 0 ? (
            filteredData.map((user, index) => {
              const actualRank = MOCK_LEADERBOARD.findIndex(u => u.id === user.id) + 1;
              return (
                <motion.div 
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors"
                >
                  <div className="col-span-2 sm:col-span-1 text-center font-mono font-bold text-arena-textMuted">
                    {actualRank}
                  </div>
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-arena-bg border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{user.name}</div>
                      {user.streak >= 3 && (
                        <div className="text-xs text-orange-500 flex items-center gap-1 mt-0.5">
                          <Flame className="w-3 h-3" /> {user.streak} kunlik seriya
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-right font-mono font-bold text-arena-accent">
                    {user.score}
                  </div>
                  <div className="hidden sm:block col-span-3 text-right text-arena-textMuted text-sm">
                    {user.quizzes} ta yakunlangan
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-8 text-center text-arena-textMuted">
              Hech kim topilmadi.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
