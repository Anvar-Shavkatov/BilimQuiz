import React, { useState } from 'react';
import { MessageSquare, X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    
    // We insert into feedbacks table (User must create this table in Supabase)
    const { error } = await supabase.from('feedbacks').insert({
      user_id: user?.id || null, // null if not logged in
      message: message.trim(),
    });

    if (error) {
      setStatus('error');
      console.error(error);
    } else {
      setStatus('success');
      setMessage('');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-arena-accent text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(227,30,36,0.5)] hover:scale-110 transition-transform z-40"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-arena-card border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-arena-accent p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Fikr va Shikoyatlar
              </h3>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-4">
              <p className="text-sm text-arena-textMuted">
                Sayt ishlashida xatolik bormi yoki qandaydir taklifingiz bormi? Bizga yozing!
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Xabaringizni yozing..."
                  required
                  rows={4}
                  className="w-full bg-arena-bg border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-arena-accent resize-none"
                />
                
                <button
                  type="submit"
                  disabled={status === 'loading' || !message.trim()}
                  className="w-full bg-arena-accent text-white font-bold py-2 rounded-lg hover:bg-arena-accentHover transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Yuborilmoqda...' : <><Send className="w-4 h-4" /> Yuborish</>}
                </button>
              </form>

              {status === 'success' && (
                <div className="text-arena-success text-sm text-center font-medium mt-2">
                  Xabaringiz muvaffaqiyatli yuborildi! Rahmat.
                </div>
              )}
              {status === 'error' && (
                <div className="text-arena-accent text-sm text-center font-medium mt-2">
                  Xatolik yuz berdi. Iltimos qayta urinib ko'ring. (feedbacks jadvali bormi?)
                </div>
              )}

              <div className="border-t border-white/10 pt-4 mt-2">
                <p className="text-xs text-center text-arena-textMuted mb-2">
                  Yoki bevosita Telegram bot orqali yozing:
                </p>
                <a
                  href="https://t.me/BilimQuizBot" // Foydalanuvchi buni o'zgartiradi
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0088cc] text-white font-bold py-2 rounded-lg hover:bg-[#0077b3] transition flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Telegram orqali bog'lanish
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
