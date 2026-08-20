import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Shuffle, BookOpen, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { staticQuizzes } from '../data/staticQuizzes';

export default function Flashcards() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      let mergedSubjects: any[] = [];
      // 1. Get static subjects
      const staticList = Object.values(staticQuizzes).map(sq => ({
        id: sq.id,
        title: sq.title,
        level: sq.level || 'Boshlang\'ich',
        isStatic: true
      }));
      mergedSubjects = [...staticList];

      // 2. Get DB subjects
      const { data, error } = await supabase.from('quizzes').select('*');
      if (data && !error) {
        mergedSubjects = [...mergedSubjects, ...data];
      }
      setSubjects(mergedSubjects);
    };
    fetchSubjects();
  }, []);

  const handleSelectSubject = async (quizId: string) => {
    setIsLoading(true);
    setSelectedSubject(quizId);
    
    if (staticQuizzes[quizId]) {
      setQuestions(staticQuizzes[quizId].questions);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.from('questions').select('*').eq('quiz_id', quizId);
    if (data && !error) {
      setQuestions(data);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
    setIsLoading(false);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(c => c + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(c => c - 1), 150);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex-1 flex flex-col max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-8 h-8 text-arena-accent" />
        <h2 className="text-3xl font-display font-bold uppercase tracking-wide">
          Bilim Kartochkalari
        </h2>
      </div>

      {!selectedSubject ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map(s => (
            <button
              key={s.id}
              onClick={() => handleSelectSubject(s.id)}
              className="bg-arena-card border border-white/5 p-6 rounded-xl hover:border-arena-accent hover:bg-arena-accent/5 transition-all text-left flex flex-col h-full group"
            >
              <h3 className="font-bold text-xl mb-2 group-hover:text-arena-accent transition-colors">{s.title}</h3>
              <p className="text-arena-textMuted text-sm mt-auto">Daraja: {s.level}</p>
            </button>
          ))}
        </div>
      ) : isLoading ? (
        <div className="flex-1 flex justify-center items-center h-64 text-arena-accent">
          <Clock className="w-8 h-8 animate-spin" />
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-20 text-arena-textMuted">
          Bu mavzuda savollar topilmadi.
          <br />
          <button onClick={() => setSelectedSubject(null)} className="mt-4 text-arena-accent underline">Ortga qaytish</button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setSelectedSubject(null)} className="text-arena-textMuted hover:text-white transition-colors">
              &larr; Mavzularga qaytish
            </button>
            <div className="font-mono text-arena-textMuted">
              {currentIndex + 1} / {questions.length}
            </div>
          </div>

          <div className="relative flex-1 min-h-[400px] w-full max-w-2xl mx-auto perspective-1000 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex + (isFlipped ? '-flipped' : '')}
                initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsFlipped(!isFlipped)}
                className={`absolute inset-0 w-full h-full p-8 md:p-12 rounded-2xl cursor-pointer flex flex-col justify-center items-center text-center shadow-2xl border-2 transition-colors ${
                  isFlipped 
                    ? 'bg-arena-card/80 border-arena-success/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]' 
                    : 'bg-arena-card border-arena-accent/30 shadow-[0_0_30px_rgba(227,30,36,0.1)] hover:border-arena-accent/60'
                }`}
              >
                {!isFlipped ? (
                  <>
                    <span className="absolute top-4 left-4 text-xs font-mono text-arena-textMuted uppercase">Savol</span>
                    <h3 className="text-2xl md:text-3xl font-display font-medium leading-relaxed">
                      {questions[currentIndex].text}
                    </h3>
                    <p className="mt-8 text-sm text-arena-textMuted animate-pulse">Javobni ko'rish uchun bosing</p>
                  </>
                ) : (
                  <>
                    <span className="absolute top-4 left-4 text-xs font-mono text-arena-success uppercase">Javob</span>
                    {(() => {
                      const q = questions[currentIndex];
                      let opts = [];
                      try { opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options; } catch(e){}
                      const correctText = opts.find((o:any) => o.id === q.correct_option)?.text || "Noma'lum";
                      
                      return (
                        <div className="flex flex-col gap-6 items-center">
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-arena-success">
                            {correctText}
                          </h3>
                          {q.explanation && (
                            <p className="text-arena-textMuted text-lg border-t border-white/10 pt-6">
                              {q.explanation}
                            </p>
                          )}
                        </div>
                      )
                    })()}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="p-4 rounded-full bg-arena-card border border-white/10 hover:border-white hover:bg-white/5 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleShuffle}
              className="p-4 rounded-full bg-arena-card border border-white/10 hover:border-arena-accent hover:text-arena-accent transition-all"
              title="Aralashtirish"
            >
              <Shuffle className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="p-4 rounded-full bg-arena-card border border-white/10 hover:border-white hover:bg-white/5 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
