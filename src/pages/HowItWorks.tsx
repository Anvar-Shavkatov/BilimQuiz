import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Swords, Zap, Gift, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-400" />,
      title: "1. Yo'nalishni tanlang",
      desc: "O'zingizga yoqqan yoki o'rganmoqchi bo'lgan dasturlash tili yoki sohani tanlang. Bizda Frontend, Backend, English va boshqa ko'plab toifalar bor."
    },
    {
      icon: <Swords className="w-8 h-8 text-arena-accent" />,
      title: "2. Jangga kiring",
      desc: "Tanlangan yo'nalish bo'yicha qiziqarli testlarni yeching. Har bir to'g'ri javob uchun ballarni qo'lga kiriting. Vaqt bilan bellashing!"
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      title: "3. Reytingda ko'tariling",
      desc: "Yig'ilgan ballar asosida umumiy peshqadamlar jadvalida (Leaderboard) ishtirok eting va o'z o'rningizni mustahkamlang."
    },
    {
      icon: <Gift className="w-8 h-8 text-green-400" />,
      title: "4. Do'stlarni chorlang",
      desc: "Profil sahifangizdagi shaxsiy referal havola orqali do'stlaringizni taklif qiling va har bir yangi ishtirokchi uchun +50 ball oling."
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12 pt-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-arena-bg border border-white/10 text-sm text-arena-textMuted mb-6">
          <Zap className="w-4 h-4 text-arena-accent" />
          <span className="uppercase tracking-wider font-semibold">Qo'llanma</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
          BilimQuiz <span className="text-arena-accent">Qanday Ishlaydi?</span>
        </h1>
        <p className="text-lg text-arena-textMuted max-w-2xl mx-auto">
          BilimQuiz - bu dasturlash va boshqa sohalar bo'yicha bilimingizni sinab ko'rish, raqobatlashish va o'sish uchun yaratilgan interaktiv platforma.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-arena-card border border-white/5 rounded-2xl p-8 hover:border-arena-accent/30 transition-all group"
          >
            <div className="w-16 h-16 rounded-xl bg-arena-bg border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
            <p className="text-arena-textMuted leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-3xl mx-auto bg-gradient-to-r from-arena-accent/20 to-transparent border border-arena-accent/30 rounded-2xl p-8 text-center"
      >
        <Target className="w-12 h-12 text-arena-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Tayyormisiz?</h2>
        <p className="text-arena-textMuted mb-8">
          Bilimingizni sinashni hoziroq boshlang va eng kuchlilar qatoridan joy oling.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-white font-bold bg-arena-accent hover:bg-arena-accentHover transition-colors shadow-[0_0_20px_rgba(227,30,36,0.3)] hover:shadow-[0_0_30px_rgba(227,30,36,0.5)]"
        >
          Testlarni boshlash
        </Link>
      </motion.div>
    </div>
  );
}
