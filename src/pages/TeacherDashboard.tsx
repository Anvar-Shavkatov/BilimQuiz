import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Activity, Plus, MoreVertical, Search, Edit, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Strictly check for teacher role (for MVP we'll just check if role === 'teacher')
  if (!isAuthenticated || user?.role !== 'teacher') {
    // If not a teacher, just redirect to home or login
    return <Navigate to="/" />;
  }

  const metrics = [
    { title: "Umumiy O'quvchilar", value: "1,248", icon: <Users className="w-6 h-6 text-blue-500" /> },
    { title: "Faol Testlar", value: "32", icon: <FileText className="w-6 h-6 text-green-500" /> },
    { title: "O'rtacha Ball", value: "84%", icon: <Activity className="w-6 h-6 text-arena-accent" /> },
  ];

  const recentQuizzes = [
    { id: 1, title: 'JavaScript: ES6+ imkoniyatlari', plays: 156, avgScore: 78, status: 'Active' },
    { id: 2, title: 'React Hooks asoslari', plays: 92, avgScore: 82, status: 'Active' },
    { id: 3, title: 'Frontend: CSS Grid va Flexbox', plays: 245, avgScore: 91, status: 'Active' },
    { id: 4, title: 'Backend: Node.js va Express', plays: 54, avgScore: 65, status: 'Draft' },
  ];

  return (
    <div className="w-full flex-1 flex flex-col md:flex-row relative z-10 border-t border-white/5 mt-[1px]">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-arena-card border-r border-white/5 md:min-h-[calc(100vh-80px)] p-6">
        <div className="mb-8 hidden md:block">
          <div className="text-xs text-arena-textMuted uppercase tracking-wider mb-2 font-mono">Boshqaruv Paneli</div>
          <div className="font-bold text-white text-lg">{user.name}</div>
        </div>
        
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
          {['overview', 'quizzes', 'students', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-arena-accent/10 text-arena-accent border border-arena-accent/20' 
                  : 'text-arena-textMuted hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab === 'overview' && 'Xulosa'}
              {tab === 'quizzes' && 'Mening Testlarim'}
              {tab === 'students' && 'O\'quvchilar'}
              {tab === 'settings' && 'Sozlamalar'}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Xulosa Paneli</h1>
            <p className="text-arena-textMuted">Tizimdagi so'nggi ma'lumotlar va statistika</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-arena-accent text-white font-bold rounded-lg hover:bg-arena-accentHover transition-colors shadow-glow">
            <Plus className="w-5 h-5" /> Yangi Test Yaratish
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-arena-card border border-white/5 p-6 rounded-xl flex items-center gap-6"
            >
              <div className="w-14 h-14 rounded-full bg-arena-bg flex items-center justify-center border border-white/10">
                {metric.icon}
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-arena-textMuted">{metric.title}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Quizzes Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-arena-card border border-white/5 rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-xl font-bold text-white">So'nggi Testlar</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-arena-textMuted" />
              <input 
                type="text" 
                placeholder="Testni qidirish..."
                className="bg-arena-bg border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-arena-accent w-full sm:w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-arena-bg border-b border-white/5">
                  <th className="p-4 text-sm font-medium text-arena-textMuted">Test Nomi</th>
                  <th className="p-4 text-sm font-medium text-arena-textMuted">O'ynalgan</th>
                  <th className="p-4 text-sm font-medium text-arena-textMuted">O'rtacha Ball</th>
                  <th className="p-4 text-sm font-medium text-arena-textMuted">Status</th>
                  <th className="p-4 text-sm font-medium text-arena-textMuted">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {recentQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{quiz.title}</td>
                    <td className="p-4 text-arena-textMuted">{quiz.plays} marta</td>
                    <td className="p-4 text-arena-textMuted">{quiz.avgScore}%</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        quiz.status === 'Active' ? 'bg-arena-success/10 text-arena-success border border-arena-success/20' : 'bg-white/10 text-arena-textMuted'
                      }`}>
                        {quiz.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <button className="text-arena-textMuted hover:text-white transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="text-arena-textMuted hover:text-arena-accent transition-colors"><Trash2 className="w-4 h-4" /></button>
                      <button className="text-arena-textMuted hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
