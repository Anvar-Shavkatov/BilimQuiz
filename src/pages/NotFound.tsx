import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertOctagon, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center bg-arena-card border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-arena-accent/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            className="w-24 h-24 mx-auto text-arena-accent mb-6"
          >
            <AlertOctagon className="w-full h-full" />
          </motion.div>
          
          <h1 className="text-7xl font-display font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-display font-medium text-white mb-4">Uzr, xatolik yuz berdi</h2>
          <p className="text-arena-textMuted mb-8">
            Bu sahifa arenadan chiqib ketgan ko'rinadi. Yoki raqiblar uni butunlay yo'q qilib yuborishgan.
          </p>
          
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-arena-accent text-white font-bold rounded hover:bg-arena-accentHover transition-colors uppercase tracking-wider shadow-glow"
          >
            <Home className="w-5 h-5" /> Bosh sahifaga qaytish
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
