import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, Award, Edit2, Check, Copy, X, Star, History } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  
  const [results, setResults] = useState<{ id: string, score: number, accuracy: number, created_at: string }[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (user) {
      setEditName(user.name);
      fetchResults();
    }
  }, [user]);

  const fetchResults = async () => {
    if (!user) return;
    setLoadingStats(true);
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true }); // old to new for chart

    if (!error && data) {
      setResults(data);
    }
    setLoadingStats(false);
  };

  const handleSaveProfile = async () => {
    if (editName.trim() === '') return;
    await updateProfile({ name: editName.trim() });
    setIsEditing(false);
  };

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" />;
  }

  // Calculate real stats
  const quizzesCompleted = results.length;
  const avgAccuracy = quizzesCompleted > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.accuracy, 0) / quizzesCompleted) 
    : 0;

  // Prepare chart data
  const chartData = results.map((r, index) => ({
    name: `Test ${index + 1}`,
    score: r.score,
    accuracy: r.accuracy
  }));

  const badges = [
    { id: 1, name: 'Birinchi Qadam', description: 'Birinchi testni yakunladi', icon: <Target className="text-blue-400" />, unlocked: quizzesCompleted >= 1 },
    { id: 2, name: 'Olovli Seriya', description: 'Ketma-ket 5 marta to\'g\'ri javob', icon: <Flame className="text-orange-500" />, unlocked: user.streak >= 5 },
    { id: 3, name: 'Benuqson G\'alaba', description: '100% aniqlik bilan testni yakunladi', icon: <Award className="text-yellow-400" />, unlocked: results.some(r => r.accuracy === 100) },
    { id: 4, name: 'Bilim Ustasi', description: 'Umumiy ball 5000 dan oshdi', icon: <Trophy className="text-purple-400" />, unlocked: user.score >= 5000 },
  ];

  return (
    <div className="container mx-auto px-6 py-12 flex-1 flex flex-col lg:flex-row gap-8 relative z-10 max-w-6xl">
      
      {/* Left Column: Profile Card */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-arena-card border border-white/10 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-arena-accent/10 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex flex-col items-center text-center mb-6 relative">
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-0 right-0 p-2 text-arena-textMuted hover:text-white transition bg-white/5 rounded-full"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            
            <div className="w-24 h-24 rounded-full bg-arena-bg border-4 border-arena-accent flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(227,30,36,0.3)] overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email || user.name}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {isEditing ? (
              <div className="flex items-center gap-2 mb-1 w-full max-w-[200px]">
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-arena-bg border border-white/20 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-arena-accent"
                />
                <button onClick={handleSaveProfile} className="text-arena-success hover:text-green-400 p-1 bg-white/5 rounded">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => setIsEditing(false)} className="text-red-400 hover:text-red-300 p-1 bg-white/5 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <h2 className="text-2xl font-display font-bold text-white mb-1">{user.name}</h2>
            )}
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-arena-bg border border-white/5 text-sm text-arena-textMuted mb-4 mt-2">
              <Star className="w-4 h-4 text-arena-accent" />
              <span>{user.role === 'teacher' ? 'O\'qituvchi' : 'O\'quvchi'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-arena-accent">{user.score}</div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">Umumiy Ball</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-white">{quizzesCompleted}</div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">Testlar soni</div>
            </div>
            <div className="text-center mt-4">
              <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-orange-500" /> {user.streak}
              </div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">Kunlik Seriya</div>
            </div>
            <div className="text-center mt-4">
              <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
                <Target className="w-5 h-5 text-arena-success" /> {avgAccuracy}%
              </div>
              <div className="text-xs text-arena-textMuted uppercase tracking-wider mt-1">O'rtacha Aniqlik</div>
            </div>
          </div>

          {/* Referral Section */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-sm text-arena-textMuted uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" /> Do'stlarni Chorlash
            </h3>
            <p className="text-sm text-arena-textMuted mb-3">
              Ushbu havola orqali do'stlaringizni taklif qiling va har bir yangi a'zo uchun <span className="text-arena-accent font-bold">+50 ball</span> oling!
            </p>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={`${window.location.origin}/auth?ref=${user.id}`}
                className="flex-1 bg-arena-bg border border-white/10 rounded p-2 text-white text-sm focus:outline-none"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/auth?ref=${user.id}`);
                  alert("Havola nusxalandi!");
                }}
                className="p-2 bg-arena-accent text-white rounded hover:bg-arena-accentHover transition flex-shrink-0"
                title="Nusxa olish"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Content */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        
        {/* Progress Chart Section */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <History className="text-arena-accent" /> O'sish Dinamikasi
            </h3>
          </div>
          
          <div className="bg-arena-card border border-white/10 rounded-xl p-4 sm:p-6 h-[300px]">
            {loadingStats ? (
              <div className="w-full h-full flex justify-center items-center text-arena-textMuted">
                Yuklanmoqda...
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="score" name="Ball" stroke="#e31e24" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', stroke: '#e31e24', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#e31e24' }} />
                  <Line type="monotone" dataKey="accuracy" name="Aniqlik (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', stroke: '#10b981', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center text-arena-textMuted">
                <Target className="w-12 h-12 mb-3 opacity-20" />
                <p>Hali test natijalari yo'q.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Badges Section */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
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
                transition={{ delay: 0.4 + (index * 0.1) }}
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
        
      </div>
    </div>
  );
}
