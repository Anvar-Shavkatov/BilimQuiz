import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Flame, Clock } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { getTutorExplanation } from '../lib/gemini';
import { Bot, Sparkles } from 'lucide-react';

import { staticQuizzes } from '../data/staticQuizzes';

function ScoreCounter({ from, to }: { from: number, to: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (from === to) return;
    let startTimestamp: number;
    const duration = 800; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to]);

  return <>{count}</>;
}

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  
  // Data states
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Quiz progress states
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [globalTimeLeft, setGlobalTimeLeft] = useState<number | null>(null);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, timeSpent: 0 });
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchQuizData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 1. Check local static quizzes first
        if (id && staticQuizzes[id]) {
          const staticQuiz = staticQuizzes[id];
          setQuiz(staticQuiz);
          setQuestions(staticQuiz.questions);
          setGlobalTimeLeft((staticQuiz.time_limit || 10) * 60);
          setIsLoading(false);
          return;
        }

        // 2. Fetch Quiz details from Supabase
        const { data: quizData, error: quizError } = await supabase
          .from('quizzes')
          .select('*')
          .eq('subject_id', id)
          .limit(1)
          .single();
          
        if (quizError || !quizData) throw new Error('Test topilmadi. Baza bilan tekshirib ko\'ring (quizzes jadvali).');
        
        // 3. Fetch Questions from Supabase
        const { data: qData, error: qError } = await supabase
          .from('questions')
          .select('*')
          .eq('quiz_id', quizData.id)
          .order('order_num', { ascending: true });
          
        if (qError || !qData || qData.length === 0) throw new Error('Ushbu test uchun savollar topilmadi.');
        
        setQuiz(quizData);
        setQuestions(qData);
        setGlobalTimeLeft(quizData.time_limit * 60);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchQuizData();
  }, [id]);

  // Global Timer Logic
  useEffect(() => {
    if (globalTimeLeft === null || isLoading || error) return;
    
    if (globalTimeLeft > 0) {
      const timer = setTimeout(() => setGlobalTimeLeft(prev => (prev as number) - 1), 1000);
      return () => clearTimeout(timer);
    } else if (globalTimeLeft === 0) {
      handleFinish(); // Auto submit when time is up
    }
  }, [globalTimeLeft, isLoading, error]);

  // Time spent tracker
  useEffect(() => {
    if (isLoading || error || isAnswered) return;
    const timer = setInterval(() => {
      setStats(s => ({ ...s, timeSpent: s.timeSpent + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, [isAnswered, isLoading, error]);

  const handleFinish = async () => {
    const total = questions.length;
    const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;

    if (user) {
      try {
        await supabase.from('results').insert({
          user_id: user.id,
          quiz_id: id || 'unknown',
          score: score,
          accuracy: accuracy
        });

        const newScore = user.score + score;
        await supabase.from('profiles').update({ score: newScore }).eq('id', user.id);
        setUser({ ...user, score: newScore });
      } catch (e) {
        console.error("Xatolik", e);
      }
    }

    localStorage.setItem('lastQuizResult', JSON.stringify({ 
      score, 
      stats, 
      subject: quiz?.title || 'Noma\'lum Test' 
    }));
    navigate(`/quiz/${id}/result`);
  };

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    
    const question = questions[currentQIndex];
    setSelectedOption(optionId);
    setIsAnswered(true);
    setPrevScore(score);
    
    if (optionId === question.correct_option) {
      // Points calculation
      const comboMultiplier = combo >= 2 ? (combo >= 5 ? 3 : 2) : 1;
      const pointsEarned = 100 * comboMultiplier; // Simple points calculation
      
      setScore(prev => prev + pointsEarned);
      setCombo(prev => prev + 1);
      setStats(s => ({ ...s, correct: s.correct + 1 }));
    } else {
      setCombo(0);
      setStats(s => ({ ...s, wrong: s.wrong + 1 }));
      
      // Save mistake to localStorage
      const mistakes = JSON.parse(localStorage.getItem('quiz_mistakes') || '[]');
      if (!mistakes.some((m: any) => m.id === question.id)) {
        mistakes.push(question);
        localStorage.setItem('quiz_mistakes', JSON.stringify(mistakes));
      }
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setAiExplanation(null);
      setIsAiLoading(false);
      setPrevScore(score);
    } else {
      handleFinish();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="text-arena-accent font-display text-2xl animate-pulse flex flex-col items-center gap-4">
          <Clock className="w-12 h-12 animate-spin" />
          Test ma'lumotlari bazadan yuklanmoqda...
        </div>
      </div>
    );
  }

  if (error || !quiz || questions.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-4">
        <XCircle className="w-16 h-16 text-arena-accent" />
        <h2 className="text-2xl font-bold text-white text-center">{error || 'Test topilmadi'}</h2>
        <button onClick={() => navigate('/')} className="px-6 py-2 mt-4 bg-white/10 hover:bg-white/20 rounded text-white transition font-bold">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  const question = questions[currentQIndex];
  let options = [];
  try {
    options = typeof question.options === 'string' ? JSON.parse(question.options) : question.options;
  } catch (e) {
    console.error("Options parse error", e);
  }

  // Format global timer
  const minutes = Math.floor((globalTimeLeft || 0) / 60);
  const seconds = (globalTimeLeft || 0) % 60;
  const isTimeDanger = (globalTimeLeft || 0) <= 60; // 60 sekund qolganda qizil
  
  const progressPercentage = ((currentQIndex) / questions.length) * 100;
  const showComboParticles = combo >= 3 && isAnswered && selectedOption === question.correct_option;

  return (
    <div className="w-full flex-1 flex flex-col pt-12 pb-24 px-4 max-w-4xl mx-auto relative">
      {/* Particles for 3+ Combo */}
      <AnimatePresence>
        {showComboParticles && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ 
                    x: Math.cos((i * 30) * Math.PI / 180) * window.innerWidth/2, 
                    y: Math.sin((i * 30) * Math.PI / 180) * window.innerHeight/2,
                    scale: 0,
                    opacity: 0
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-arena-accent shadow-glow"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header - Energy Bar & Stats */}
      <header className="mb-12">
        <div className="flex justify-between items-end mb-4 font-mono">
          <div className="text-arena-textMuted uppercase tracking-widest text-sm">
            Savol <span className="text-white font-bold text-lg">{currentQIndex + 1}</span> / {questions.length}
          </div>
          
          {/* Global Timer */}
          <div className={`flex items-center gap-2 font-bold text-xl px-4 py-2 rounded-lg border ${
            isTimeDanger ? 'bg-arena-accent/10 border-arena-accent text-arena-accent animate-pulse shadow-[0_0_15px_rgba(227,30,36,0.3)]' : 'bg-arena-card border-white/10 text-white'
          }`}>
            <Clock className={`w-5 h-5 ${isTimeDanger ? 'animate-bounce' : ''}`} />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="flex items-end gap-6">
            {combo >= 2 && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 text-orange-500 font-bold text-xl drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
              >
                <Flame className="w-6 h-6 animate-pulse" />
                {combo}x
              </motion.div>
            )}
            <div className="text-right">
              <div className="text-arena-textMuted text-xs uppercase tracking-wider mb-1">Score</div>
              <div className="text-3xl text-arena-accent font-bold leading-none">
                <ScoreCounter from={prevScore} to={score} />
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-2 w-full bg-arena-card rounded-full overflow-hidden border border-white/5 relative">
          <motion.div 
            className="h-full bg-arena-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            style={{ boxShadow: '0 0 10px rgba(227, 30, 36, 0.4)' }}
          />
        </div>
      </header>

      {/* Question Context */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium leading-relaxed">
              {question.text}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {options.map((option: any, index: number) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.id === question.correct_option;
            
            const colorClasses = [
              "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/50 hover:bg-blue-500/10 text-blue-50",
              "border-purple-500/20 bg-purple-500/5 hover:border-purple-500/50 hover:bg-purple-500/10 text-purple-50",
              "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10 text-amber-50",
              "border-teal-500/20 bg-teal-500/5 hover:border-teal-500/50 hover:bg-teal-500/10 text-teal-50"
            ];
            
            let statusClass = colorClasses[index % 4];
            let icon = null;

            if (isAnswered) {
              if (isCorrect) {
                statusClass = "border-arena-success bg-arena-success/10 text-arena-success shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                icon = <CheckCircle2 className="w-6 h-6" />;
              } else if (isSelected && !isCorrect) {
                statusClass = "border-arena-accent bg-arena-accent/10 text-arena-accent shadow-[0_0_15px_rgba(227,30,36,0.2)]";
                icon = <XCircle className="w-6 h-6" />;
              } else {
                statusClass = "border-white/5 bg-arena-bg opacity-40";
              }
            }

            return (
              <motion.button
                key={`${currentQIndex}-${option.id}`}
                onClick={() => handleSelect(option.id)}
                disabled={isAnswered}
                initial={{ opacity: 0, y: 20 }}
                animate={isAnswered && isSelected && !isCorrect ? { x: [-5, 5, -5, 5, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0, x: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: isAnswered && isSelected && !isCorrect ? 0.4 : 0.3 
                }}
                className={`relative flex items-center justify-between p-6 rounded-lg border-2 text-left font-medium text-lg transition-all focus:outline-none focus:ring-2 focus:ring-arena-accent ${statusClass}`}
              >
                <span>{option.text}</span>
                {icon && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {icon}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Next Button Wrapper & AI Tutor */}
        <div className="h-auto min-h-[6rem]">
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col gap-4"
              >
                {/* AI Tutor Section (only show if answered incorrectly) */}
                {selectedOption !== question.correct_option && (
                  <div className="bg-arena-card border border-arena-accent/20 rounded-xl p-4 flex flex-col gap-3">
                    {!aiExplanation && !isAiLoading ? (
                      <button 
                        onClick={async () => {
                          setIsAiLoading(true);
                          const wrongOptText = options.find((o: any) => o.id === selectedOption)?.text || "Noma'lum";
                          const correctOptText = options.find((o: any) => o.id === question.correct_option)?.text || "Noma'lum";
                          const expl = await getTutorExplanation(question.text, wrongOptText, correctOptText);
                          setAiExplanation(expl);
                          setIsAiLoading(false);
                        }}
                        className="flex items-center justify-center gap-2 text-arena-accent hover:text-white transition-colors py-2 border border-arena-accent/20 rounded-lg hover:bg-arena-accent/10"
                      >
                        <Bot className="w-5 h-5" /> AI Ustozdan so'rash
                      </button>
                    ) : isAiLoading ? (
                      <div className="flex items-center gap-2 text-arena-textMuted justify-center py-2">
                        <Sparkles className="w-5 h-5 animate-spin text-arena-accent" /> AI yechim tayyorlamoqda...
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-arena-text leading-relaxed text-sm bg-arena-bg p-4 rounded border border-white/5 whitespace-pre-wrap flex gap-3"
                      >
                        <Bot className="w-6 h-6 text-arena-accent flex-shrink-0 mt-1" />
                        <div>{aiExplanation}</div>
                      </motion.div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button 
                    onClick={handleNext}
                    className="w-full sm:w-auto px-10 py-4 bg-white text-arena-bg font-display font-bold rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-wider focus:outline-none shadow-glow text-lg"
                  >
                    {currentQIndex < questions.length - 1 ? 'Keyingi Savol' : 'Natijani Ko\'rish'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
