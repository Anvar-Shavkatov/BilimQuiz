import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-arena-card border border-white/10 rounded-xl p-5 shadow-2xl z-50"
        >
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-white font-bold mb-1">Maxfiylik Siyosati</h4>
              <p className="text-sm text-arena-textMuted leading-relaxed">
                Saytdan foydalanish orqali siz qulaylikni oshirish uchun cookie fayllaridan foydalanishimizga rozilik bildirasiz.
              </p>
            </div>
            <button 
              onClick={handleAccept}
              className="w-full py-2.5 bg-arena-accent text-white font-bold rounded hover:bg-arena-accentHover transition-colors text-sm uppercase tracking-wider"
            >
              Qabul qilish
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
