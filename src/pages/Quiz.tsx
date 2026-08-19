import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Flame } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { MATH_QUIZ } from '../data/mockData';

const TOTAL_TIME = 20; // seconds per question

function ScoreCounter({ from, to }: { from: number, to: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (from === to) return;
    let startTimestamp: number;
    const duration = 800; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out quart
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
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, timeSpent: 0 });

  const question = MATH_QUIZ.questions[currentQIndex];

  // Global time tracking for stats
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnswered) {
        setStats(s => ({ ...s, timeSpent: s.timeSpent + 1 }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isAnswered]);

  // Question Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setCombo(0);
    setStats(s => ({ ...s, wrong: s.wrong + 1 }));
  };

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    
    setSelectedOption(optionId);
    setIsAnswered(true);
    setPrevScore(score);
    
    if (optionId === question.correctOption) {
      const timeBonus = timeLeft * 5;
      const comboMultiplier = combo >= 2 ? (combo >= 5 ? 3 : 2) : 1;
      const pointsEarned = (100 + timeBonus) * comboMultiplier;
      
      setScore(prev => prev + pointsEarned);
      setCombo(prev => prev + 1);
      setStats(s => ({ ...s, correct: s.correct + 1 }));
    } else {
      setCombo(0);
      setStats(s => ({ ...s, wrong: s.wrong + 1 }));
    }
  };

  const handleNext = () => {
    if (currentQIndex < MATH_QUIZ.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setTimeLeft(TOTAL_TIME);
      setSelectedOption(null);
      setIsAnswered(false);
      setPrevScore(score);
    } else {
      // Quiz finished, save to local storage and navigate to result
      localStorage.setItem('lastQuizResult', JSON.stringify({ score, stats, subject: MATH_QUIZ.title }));
      navigate(`/quiz/${id}/result`);
    }
  };

  const progressPercentage = (timeLeft / TOTAL_TIME) * 100;
  const isDanger = timeLeft <= 5 && !isAnswered;
  const showComboParticles = combo >= 3 && isAnswered && selectedOption === question.correctOption;

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
            {/* Simple CSS burst simulation */}
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
            Savol <span className="text-white font-bold text-lg">{currentQIndex + 1}</span> / {MATH_QUIZ.questions.length}
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

        {/* ENERGY BAR */}
        <div className="h-3 w-full bg-arena-card rounded-full overflow-hidden border border-white/5 relative">
          <motion.div 
            className={`h-full bg-gradient-to-r from-arena-accent to-[#ff4d4d] ${isDanger ? 'animate-pulse' : ''}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ ease: "linear", duration: 1 }}
            style={{ 
              boxShadow: isDanger ? '0 0 15px rgba(227, 30, 36, 0.8)' : '0 0 10px rgba(227, 30, 36, 0.4)' 
            }}
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
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.id === question.correctOption;
            
            let statusClass = "border-white/10 bg-arena-card hover:border-arena-accent hover:bg-arena-accent/5";
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

        {/* Explanation & Next */}
        <div className="h-48"> {/* Fixed height wrapper to avoid layout shift */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-6 rounded-lg bg-arena-card border border-white/5"
              >
                <h4 className="font-bold text-arena-text mb-2">Tushuntirish:</h4>
                <p className="text-arena-textMuted leading-relaxed mb-6">
                  {question.explanation}
                </p>
                <button 
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-3 bg-white text-arena-bg font-display font-bold rounded hover:bg-gray-200 transition-colors uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {currentQIndex < MATH_QUIZ.questions.length - 1 ? 'Keyingi Savol' : 'Natijani Ko\'rish'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
