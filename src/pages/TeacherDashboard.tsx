import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Plus, ArrowLeft, Save, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { generateQuizByTopic } from '../lib/gemini';
import { Bot, Sparkles } from 'lucide-react';

export default function TeacherDashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('quizzes');
  
  // Data states
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // UI states
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  
  // Forms state
  const [newQuiz, setNewQuiz] = useState({ id: '', title: '', time_limit: 10 });
  
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correct: 'a'
  });

  useEffect(() => {
    if (activeTab === 'quizzes') {
      fetchQuizzes();
    }
  }, [activeTab]);

  const fetchQuizzes = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('quizzes').select('*').order('created_at', { ascending: false });
    if (data) setQuizzes(data);
    setIsLoading(false);
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuiz.id || !newQuiz.title || newQuiz.time_limit <= 0) return;
    
    // Check if ID contains only lowercase letters and dashes
    const validId = newQuiz.id.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    const { error } = await supabase.from('quizzes').insert({
      id: validId,
      title: newQuiz.title,
      time_limit: newQuiz.time_limit
    });

    if (!error) {
      setIsCreatingQuiz(false);
      setNewQuiz({ id: '', title: '', time_limit: 10 });
      fetchQuizzes();
    } else {
      alert("Xatolik yuz berdi: " + error.message);
    }
  };

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic || !newQuiz.id) return;
    setIsLoading(true);
    
    try {
      const validId = newQuiz.id.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      
      // 1. Generate questions
      const generatedQuestions = await generateQuizByTopic(aiTopic);
      if (!generatedQuestions || generatedQuestions.length === 0) throw new Error("AI savollar tuza olmadi.");

      // 2. Insert Quiz
      const { data: qData, error: qError } = await supabase.from('quizzes').insert({
        title: aiTopic + ' (AI)',
        subject_id: validId,
        level: 'O\'rta'
      }).select().single();
      
      // (Using default uuid for id, and validId for subject_id so it matches correctly)
      
      if (qError) throw qError;

      // 3. Insert Questions
      const questionsToInsert = generatedQuestions.map((q, idx) => ({
        quiz_id: qData.id,
        text: q.text,
        options: q.options,
        correct_option: q.correct,
        explanation: q.expl,
        order_num: idx + 1
      }));

      const { error: insertErr } = await supabase.from('questions').insert(questionsToInsert);
      if (insertErr) throw insertErr;

      alert("AI muvaffaqiyatli testlarni yaratdi!");
      setIsAiGenerating(false);
      setAiTopic('');
      setNewQuiz({ id: '', title: '', time_limit: 10 });
      fetchQuizzes();
    } catch (err: any) {
      alert("Xato: " + err.message);
    }
    setIsLoading(false);
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuiz || !newQuestion.text || !newQuestion.optionA || !newQuestion.optionB) return;

    const options = [
      { id: 'a', text: newQuestion.optionA },
      { id: 'b', text: newQuestion.optionB },
      { id: 'c', text: newQuestion.optionC },
      { id: 'd', text: newQuestion.optionD },
    ].filter(opt => opt.text.trim() !== ''); // ignore empty options if any

    const { error } = await supabase.from('questions').insert({
      quiz_id: selectedQuiz.id,
      text: newQuestion.text,
      options: options,
      correct_option: newQuestion.correct
    });

    if (!error) {
      setIsAddingQuestion(false);
      setNewQuestion({ text: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 'a' });
      alert("Savol muvaffaqiyatli qo'shildi!");
    } else {
      alert("Xatolik: " + error.message);
    }
  };

  if (!isAuthenticated || user?.role !== 'teacher') {
    return <Navigate to="/" />;
  }

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Xulosa Paneli</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-arena-card border border-white/5 p-6 rounded-xl flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-arena-bg flex items-center justify-center border border-white/10"><Users className="w-6 h-6 text-blue-500" /></div>
              <div><div className="text-3xl font-display font-bold text-white mb-1">...</div><div className="text-sm text-arena-textMuted">O'quvchilar</div></div>
            </div>
            <div className="bg-arena-card border border-white/5 p-6 rounded-xl flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-arena-bg flex items-center justify-center border border-white/10"><FileText className="w-6 h-6 text-green-500" /></div>
              <div><div className="text-3xl font-display font-bold text-white mb-1">{quizzes.length}</div><div className="text-sm text-arena-textMuted">Faol Testlar</div></div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'quizzes') {
      if (selectedQuiz) {
        // Quiz Details View
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button 
              onClick={() => setSelectedQuiz(null)} 
              className="flex items-center gap-2 text-arena-textMuted hover:text-white mb-6 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Orqaga
            </button>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedQuiz.title}</h2>
                <p className="text-arena-textMuted">ID: {selectedQuiz.id} | Vaqt: {selectedQuiz.time_limit} daqiqa</p>
              </div>
              <button 
                onClick={() => setIsAddingQuestion(true)}
                className="flex items-center gap-2 px-4 py-2 bg-arena-accent text-white font-bold rounded hover:bg-arena-accentHover transition shadow-glow"
              >
                <Plus className="w-4 h-4" /> Savol Qo'shish
              </button>
            </div>

            {isAddingQuestion && (
              <div className="bg-arena-card border border-arena-accent/30 p-6 rounded-xl mb-6 relative">
                <button onClick={() => setIsAddingQuestion(false)} className="absolute top-4 right-4 text-arena-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-white mb-4">Yangi Savol</h3>
                <form onSubmit={handleAddQuestion} className="space-y-4">
                  <div>
                    <label className="block text-sm text-arena-textMuted mb-1">Savol matni</label>
                    <textarea 
                      required
                      value={newQuestion.text}
                      onChange={e => setNewQuestion({...newQuestion, text: e.target.value})}
                      className="w-full bg-arena-bg border border-white/10 rounded p-3 text-white focus:outline-none focus:border-arena-accent min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-arena-textMuted mb-1">Variant A</label>
                      <input required type="text" value={newQuestion.optionA} onChange={e => setNewQuestion({...newQuestion, optionA: e.target.value})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                    </div>
                    <div>
                      <label className="block text-sm text-arena-textMuted mb-1">Variant B</label>
                      <input required type="text" value={newQuestion.optionB} onChange={e => setNewQuestion({...newQuestion, optionB: e.target.value})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                    </div>
                    <div>
                      <label className="block text-sm text-arena-textMuted mb-1">Variant C</label>
                      <input type="text" value={newQuestion.optionC} onChange={e => setNewQuestion({...newQuestion, optionC: e.target.value})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                    </div>
                    <div>
                      <label className="block text-sm text-arena-textMuted mb-1">Variant D</label>
                      <input type="text" value={newQuestion.optionD} onChange={e => setNewQuestion({...newQuestion, optionD: e.target.value})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-arena-textMuted mb-1">To'g'ri javob</label>
                    <select 
                      value={newQuestion.correct}
                      onChange={e => setNewQuestion({...newQuestion, correct: e.target.value})}
                      className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent"
                    >
                      <option value="a">Variant A</option>
                      <option value="b">Variant B</option>
                      {newQuestion.optionC && <option value="c">Variant C</option>}
                      {newQuestion.optionD && <option value="d">Variant D</option>}
                    </select>
                  </div>
                  <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-arena-success text-white font-bold rounded hover:bg-green-600 transition">
                    <Save className="w-4 h-4" /> Saqlash
                  </button>
                </form>
              </div>
            )}

            <div className="text-arena-textMuted text-sm">Savollar ro'yxatini chiqarish uchun bu yerga "questions" jadvalidan ma'lumot tortish mumkin (keyingi bosqichda). Yuqoridagi formadan savol qo'shsangiz u to'g'ridan to'g'ri bazaga tushadi va testda ko'rinadi!</div>
          </motion.div>
        );
      }

      // Quizzes List
      return (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Mening Testlarim</h2>
            <div className="flex gap-3">
              <button 
                onClick={() => { setIsCreatingQuiz(true); setIsAiGenerating(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-arena-card border border-white/10 text-white font-bold rounded hover:bg-white/5 transition"
              >
                <Plus className="w-4 h-4" /> Qo'lda Yaratish
              </button>
              <button 
                onClick={() => { setIsAiGenerating(true); setIsCreatingQuiz(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-arena-accent text-white font-bold rounded hover:bg-arena-accentHover transition shadow-glow"
              >
                <Bot className="w-4 h-4" /> AI Yaratish
              </button>
            </div>
          </div>

          {isAiGenerating && (
            <div className="bg-arena-card border border-arena-accent/30 p-6 rounded-xl mb-6 relative">
              <button onClick={() => setIsAiGenerating(false)} className="absolute top-4 right-4 text-arena-textMuted hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Bot className="text-arena-accent w-6 h-6" /> AI yordamida Test yaratish
              </h3>
              <p className="text-arena-textMuted text-sm mb-6">Siz kiritgan mavzu bo'yicha Gemini AI avtomatik ravishda 10 ta savol-javob tuzib beradi.</p>
              <form onSubmit={handleAiGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm text-arena-textMuted mb-1">Test mavzusi (Masalan: React Hooks, Ingliz tili grammatikasi)</label>
                  <input required type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} placeholder="React asinxron funksiyalar" className="w-full bg-arena-bg border border-white/10 rounded p-3 text-white focus:outline-none focus:border-arena-accent" />
                </div>
                <div>
                  <label className="block text-sm text-arena-textMuted mb-1">Qisqa ID (Kichik harflarda, bo'sh joysiz, masalan: `react-hooks`)</label>
                  <input required type="text" value={newQuiz.id} onChange={e => setNewQuiz({...newQuiz, id: e.target.value})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                </div>
                <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 w-full py-3 bg-arena-accent text-white font-bold rounded hover:bg-arena-accentHover transition disabled:opacity-50">
                  {isLoading ? <><Sparkles className="w-5 h-5 animate-spin" /> Yaratilmoqda...</> : <><Bot className="w-5 h-5" /> Sehrni boshlash</>}
                </button>
              </form>
            </div>
          )}

          {isCreatingQuiz && (
            <div className="bg-arena-card border border-arena-accent/30 p-6 rounded-xl mb-6 relative">
              <button onClick={() => setIsCreatingQuiz(false)} className="absolute top-4 right-4 text-arena-textMuted hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-white mb-4">Yangi Test Yaratish</h3>
              <form onSubmit={handleCreateQuiz} className="space-y-4">
                <div>
                  <label className="block text-sm text-arena-textMuted mb-1">Test ID (faqat lotin harflar, bo'sh joysiz, masalan: `python-asoslari`)</label>
                  <input required type="text" value={newQuiz.id} onChange={e => setNewQuiz({...newQuiz, id: e.target.value})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                </div>
                <div>
                  <label className="block text-sm text-arena-textMuted mb-1">Test Nomi</label>
                  <input required type="text" value={newQuiz.title} onChange={e => setNewQuiz({...newQuiz, title: e.target.value})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                </div>
                <div>
                  <label className="block text-sm text-arena-textMuted mb-1">Vaqt (daqiqa)</label>
                  <input required type="number" min="1" max="120" value={newQuiz.time_limit} onChange={e => setNewQuiz({...newQuiz, time_limit: parseInt(e.target.value)})} className="w-full bg-arena-bg border border-white/10 rounded p-2 text-white focus:outline-none focus:border-arena-accent" />
                </div>
                <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-arena-success text-white font-bold rounded hover:bg-green-600 transition">
                  <Save className="w-4 h-4" /> Yaratish
                </button>
              </form>
            </div>
          )}

          <div className="bg-arena-card border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-arena-bg border-b border-white/5">
                  <th className="p-4 text-sm font-medium text-arena-textMuted">Test Nomi</th>
                  <th className="p-4 text-sm font-medium text-arena-textMuted">ID</th>
                  <th className="p-4 text-sm font-medium text-arena-textMuted">Vaqt</th>
                  <th className="p-4 text-sm font-medium text-arena-textMuted">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={4} className="p-4 text-center text-arena-textMuted">Yuklanmoqda...</td></tr>
                ) : quizzes.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center text-arena-textMuted">Testlar topilmadi.</td></tr>
                ) : (
                  quizzes.map((quiz) => (
                    <tr key={quiz.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white cursor-pointer hover:text-arena-accent" onClick={() => setSelectedQuiz(quiz)}>{quiz.title}</td>
                      <td className="p-4 text-arena-textMuted font-mono text-sm">{quiz.id}</td>
                      <td className="p-4 text-arena-textMuted">{quiz.time_limit} daqiqa</td>
                      <td className="p-4 flex items-center gap-3">
                        <button onClick={() => setSelectedQuiz(quiz)} className="text-arena-accent hover:text-white transition-colors text-sm border border-arena-accent/30 px-3 py-1 rounded">Boshqarish</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    return <div className="text-arena-textMuted">Bu bo'lim tayyorlanmoqda...</div>;
  };

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
              onClick={() => { setActiveTab(tab); setSelectedQuiz(null); }}
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
        {renderContent()}
      </main>
    </div>
  );
}
