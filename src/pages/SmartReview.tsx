import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trash2, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SmartReview() {
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMistakes = JSON.parse(localStorage.getItem('quiz_mistakes') || '[]');
    setMistakes(savedMistakes);
  }, []);

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    setIsAnswered(true);

    const question = mistakes[currentQIndex];
    if (optionId === question.correct_option) {
      // Remove from mistakes if answered correctly in review mode
      const newMistakes = mistakes.filter(m => m.id !== question.id);
      localStorage.setItem('quiz_mistakes', JSON.stringify(newMistakes));
      // update state after a delay
      setTimeout(() => {
        setMistakes(newMistakes);
        setSelectedOption(null);
        setIsAnswered(false);
        // adjust index if we removed the current one
        if (currentQIndex >= newMistakes.length && newMistakes.length > 0) {
          setCurrentQIndex(newMistakes.length - 1);
        }
      }, 1500);
    }
  };

  const handleNext = () => {
    if (currentQIndex < mistakes.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };
  
  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }

  const clearMistakes = () => {
    if(confirm("Barcha xatolarni o'chirib tashlamoqchimisiz?")) {
      localStorage.removeItem('quiz_mistakes');
      setMistakes([]);
    }
  };

  if (mistakes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <CheckCircle2 className="w-20 h-20 text-arena-success mb-6" />
        <h2 className="text-3xl font-display font-bold mb-4">Xatolar Yo'q!</h2>
        <p className="text-arena-textMuted text-center max-w-md mb-8">
          Sizda hozircha ustida ishlash uchun xato qilingan savollar yo'q. Ajoyib natija!
        </p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-arena-accent text-white rounded font-bold uppercase tracking-wider hover:bg-arena-accentHover transition-colors">
          Bosh Sahifaga Qaytish
        </button>
      </div>
    );
  }

  const question = mistakes[currentQIndex];
  let options = [];
  try {
    options = typeof question.options === 'string' ? JSON.parse(question.options) : question.options;
  } catch (e) {}

  return (
    <div className="container mx-auto px-4 py-12 flex-1 flex flex-col max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-arena-accent" />
          <h2 className="text-3xl font-display font-bold uppercase tracking-wide">
            Xatolar Ustida Ishlash
          </h2>
        </div>
        <button onClick={clearMistakes} className="text-arena-textMuted hover:text-arena-accent flex items-center gap-2 transition-colors">
          <Trash2 className="w-5 h-5" /> Tozalash
        </button>
      </div>

      <div className="bg-arena-card border border-white/5 rounded-xl p-8 flex-1 flex flex-col relative">
        <div className="absolute top-4 right-4 text-arena-textMuted font-mono">
          {currentQIndex + 1} / {mistakes.length}
        </div>
        
        <h3 className="text-2xl md:text-3xl font-display font-medium leading-relaxed mb-10 mt-4">
          {question.text}
        </h3>

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
                className={`relative flex items-center justify-between p-6 rounded-lg border-2 text-left font-medium text-lg transition-all focus:outline-none ${statusClass}`}
              >
                <span>{option.text}</span>
                {icon && <span>{icon}</span>}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="mt-auto flex justify-between items-center">
              {selectedOption === question.correct_option ? (
                <p className="text-arena-success font-bold flex items-center gap-2"><CheckCircle2/> Barakalla! Bu savol xatolar ro'yxatidan o'chirildi.</p>
              ) : (
                <p className="text-arena-accent font-bold flex items-center gap-2"><XCircle/> Yana xato. Qayta urinib ko'ring (keyingi safar).</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-6">
           <button 
             onClick={handlePrev} 
             disabled={currentQIndex === 0}
             className="px-6 py-2 border border-white/20 rounded hover:bg-white/10 disabled:opacity-30"
           >
             Oldingi
           </button>
           <button 
             onClick={handleNext}
             disabled={currentQIndex === mistakes.length - 1}
             className="px-6 py-2 border border-white/20 rounded hover:bg-white/10 disabled:opacity-30"
           >
             Keyingi
           </button>
        </div>
      </div>
    </div>
  );
}
