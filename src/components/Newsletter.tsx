import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Here you would normally send the email to your backend
    }
  };

  return (
    <div className="w-full bg-arena-card border-y border-white/5 py-16 relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-arena-accent/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Yangi testlar haqida birinchilardan xabardor bo'ling
        </h2>
        <p className="text-arena-textMuted mb-8 max-w-lg mx-auto">
          Arenaga yangi texnologiyalar va musobaqalar qo'shilganda elektron pochtangizga xabar yuboramiz. Hech qanday spam yo'q.
        </p>
        
        {subscribed ? (
          <div className="inline-block bg-arena-success/10 border border-arena-success text-arena-success px-6 py-3 rounded-lg font-medium">
            Obuna muvaffaqiyatli rasmiylashtirildi! Rahmat.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-arena-textMuted" />
              <input 
                type="email" 
                placeholder="Email manzilingiz"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-arena-bg border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-arena-accent focus:ring-1 focus:ring-arena-accent transition-all"
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-3 bg-arena-accent text-white font-bold rounded-lg hover:bg-arena-accentHover transition-colors uppercase tracking-wider shadow-glow"
            >
              Obuna bo'lish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
