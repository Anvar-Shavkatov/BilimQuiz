import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Code2, Database, Terminal, Layout, Cpu, ArrowRight, Calculator, BookOpen, Zap, Brain, Lightbulb, TrendingUp, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: "Texnologiyalar",
    desc: "Dasturlash va IT olamiga sho'ng'ing",
    subjects: [
      { id: 'mega_quiz_100', name: '100 Qadam: Bilimlar Cho\'qqisi', icon: Layout, desc: 'Aralash (Oson -> Qiyin) savollar to\'plami' },
      { id: 'it-basics', name: 'IT Asoslari', icon: Code2, desc: 'Kompyuter va dasturlash haqida boshlang\'ich tushunchalar' },
      { id: 'ai-basics', name: 'Sun\'iy Intellekt', icon: Cpu, desc: 'AI, LLM va Machine Learning sirlari' },
      { id: 'automation', name: 'Avtomatlashtirish', icon: Terminal, desc: 'Jarayonlarni va smart-tizimlarni boshqarish' },
      { id: 'frontend', name: 'Frontend (React/Vue)', icon: Layout, desc: 'UI/UX va veb interfeyslar' },
      { id: 'javascript', name: 'JavaScript Asoslari', icon: Code2, desc: 'JS mantiqi va funksiyalari' },
      { id: 'backend', name: 'Backend (Node.js/Python)', icon: Terminal, desc: 'API va server mantig\'i' },
      { id: 'database', name: 'Ma\'lumotlar Bazasi', icon: Database, desc: 'SQL va NoSQL asoslari' },
      { id: 'system', name: 'Tizim Ma\'murligi', icon: Monitor, desc: 'Linux va tarmoqlar' },
      { id: 'algorithms', name: 'Algoritmlar', icon: Cpu, desc: 'Ma\'lumotlar tuzilmalari' },
    ]
  },
  {
    title: "Maktab Fanlari",
    desc: "Aniq va gumanitar fanlardan o'z bilimingizni sinab ko'ring",
    subjects: [
      { id: 'math-basics', name: 'Matematika', icon: Calculator, desc: 'Raqamlar, amallar va mantiqiy hisoblashlar' },
      { id: 'history-uz', name: 'O\'zbekiston Tarixi', icon: BookOpen, desc: 'O\'tmish, xonliklar va qadimiy davlatlar' },
      { id: 'physics', name: 'Fizika', icon: Zap, desc: 'Tabiat qonunlari va harakat' },
    ]
  },
  {
    title: "Mantiq va IQ",
    desc: "Miyangizni charxlovchi ajoyib boshqotirmalar",
    subjects: [
      { id: 'logic-iq', name: 'IQ Test', icon: Brain, desc: 'Fikrlash tezligi va diqqatni sinash' },
      { id: 'riddles', name: 'Qiziqarli Mantiq', icon: Lightbulb, desc: 'Qiziqarli jumboqlar va topishmoqlar' },
    ]
  },
  {
    title: "Biznes va Moliya",
    desc: "Pul, marketing va muvaffaqiyat sirlari",
    subjects: [
      { id: 'finance-101', name: 'Moliyaviy Savodxonlik', icon: TrendingUp, desc: 'Pulni boshqarish va sarmoya' },
      { id: 'business-startups', name: 'Startap va Biznes', icon: Briefcase, desc: 'Tadbirkorlik asoslari va marketing' },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-1 flex flex-col justify-center">
      {/* Hero Section */}
      <section className="text-center max-w-5xl mx-auto px-6 py-20 flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-arena-accent/10 text-arena-accent font-mono text-sm font-medium border border-arena-accent/20 mb-8 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-arena-accent animate-pulse"></span>
            IT ARENA OCHIQ
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-display font-bold mb-6 leading-[1.2] tracking-tight text-white">
            O'z bilim va <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-arena-accent to-orange-400">
              dasturlash mahoratingizni
            </span> isbotlang
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-base md:text-lg text-arena-textMuted mb-10 max-w-2xl mx-auto leading-relaxed">
            Dasturchilar arenasi. Eng qiyin savollarga javob bering, kodlarni tahlil qiling va reytingda birinchi o'ringa chiqing.
          </motion.p>
          
          <div className="flex gap-4">
            <motion.button 
              variants={itemVariants}
              onClick={() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 px-8 py-4 bg-arena-accent text-white font-display font-bold tracking-wider uppercase rounded hover:scale-[1.03] hover:shadow-glow-hover transition-all duration-200"
            >
              Kurashni Boshlash
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button 
              variants={itemVariants}
              onClick={() => navigate('/flashcards')}
              className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-display font-bold tracking-wider uppercase rounded hover:bg-white/10 hover:scale-[1.03] transition-all duration-200"
            >
              Flashcards
            </motion.button>
            <motion.button 
              variants={itemVariants}
              onClick={() => navigate('/battle')}
              className="group flex items-center gap-3 px-8 py-4 bg-red-600/20 border border-red-500/50 text-red-100 font-display font-bold tracking-wider uppercase rounded hover:bg-red-600/40 hover:scale-[1.03] transition-all duration-200"
            >
              1v1 Jang
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="container mx-auto px-6 py-24 border-t border-white/5 space-y-24">
        
        {categories.map((category, catIdx) => (
          <div key={catIdx}>
            <div className="mb-12">
              <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-2 text-white">{category.title}</h3>
              <p className="text-arena-textMuted">{category.desc}</p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {category.subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <motion.div
                    key={subject.id}
                    variants={itemVariants}
                    onClick={() => navigate(`/quiz/${subject.id}`)}
                    className="group relative overflow-hidden rounded-lg bg-arena-card border border-white/5 p-8 cursor-pointer hover:border-arena-accent transition-colors duration-300 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arena-accent"
                    tabIndex={0}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-arena-accent/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    
                    <div className="w-12 h-12 rounded border border-white/10 bg-[#1A1A1D] flex items-center justify-center mb-8 group-hover:border-arena-accent/50 transition-colors">
                      <Icon className="w-6 h-6 text-arena-textMuted group-hover:text-arena-accent transition-colors" />
                    </div>
                    
                    <div className="mt-auto">
                      <h4 className="text-xl font-display font-bold uppercase tracking-wide mb-3">{subject.name}</h4>
                      <div className="flex items-center gap-2 text-arena-textMuted font-mono text-sm">
                        {subject.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}

      </section>
    </div>
  );
}
