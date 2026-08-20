import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Swords, LogIn, LogOut, Menu, X, UserPlus, Zap } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Dasturlash', path: '/#subjects' },
    { name: 'Reyting', path: '/leaderboard' },
    { name: 'Xatolar', path: '/review' },
    { name: 'Qanday ishlaydi', path: '/how-it-works' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-arena-bg/90 backdrop-blur-md border-b border-arena-accent/30 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LChap tomon: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded bg-arena-card border border-white/5 flex items-center justify-center group-hover:border-arena-accent/50 transition-colors">
            <Zap className="text-arena-accent w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
            BilimQuiz
          </h1>
        </Link>
        
        {/* O'rta qism: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-arena-text hover:text-white font-medium relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-arena-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* O'ng tomon: Auth/Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={user.role === 'teacher' ? '/dashboard' : '/profile'} 
                  className="flex items-center gap-2 text-arena-textMuted text-sm font-mono border border-white/10 px-4 py-2 rounded-full bg-arena-card hover:border-arena-accent/50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-arena-accent/20 flex items-center justify-center text-arena-accent font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-white">{user.name}</span>
                  <span className="text-arena-accent font-bold ml-2 flex items-center gap-1">
                    <Swords className="w-3 h-3" /> {user.score}
                  </span>
                </Link>
                <button 
                  onClick={() => logout()}
                  className="p-2.5 rounded-full text-arena-textMuted bg-arena-card border border-white/10 hover:border-arena-accent/50 hover:text-arena-accent transition-all"
                  title="Chiqish"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="px-6 py-2 rounded-md text-white font-medium bg-transparent border border-white/20 hover:border-white/50 transition-all"
                >
                  Kirish
                </Link>
                <Link 
                  to="/auth" 
                  className="flex items-center gap-2 px-6 py-2 rounded-md text-white font-bold bg-arena-accent hover:bg-arena-accentHover transition-colors shadow-glow"
                >
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>

          {/* Mobile Registration Button (always visible if not authed) */}
          {!isAuthenticated && (
            <Link 
              to="/auth" 
              className="md:hidden flex items-center justify-center p-2 rounded-md text-white font-bold bg-arena-accent hover:bg-arena-accentHover transition-colors"
            >
              <UserPlus className="w-5 h-5" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-arena-card border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-arena-textMuted hover:text-white font-medium py-2 text-lg border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}
              
              {!isAuthenticated && (
                <Link 
                  to="/auth" 
                  className="flex items-center gap-2 text-arena-textMuted hover:text-white font-medium py-2 text-lg"
                >
                  <LogIn className="w-5 h-5" /> Kirish
                </Link>
              )}
              
              {isAuthenticated && user && (
                <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
                  <Link 
                    to={user.role === 'teacher' ? '/dashboard' : '/profile'} 
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-10 h-10 rounded-full bg-arena-accent/20 flex items-center justify-center text-arena-accent font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-arena-accent font-mono text-sm">{user.score} ball</div>
                    </div>
                  </Link>
                  <button 
                    onClick={() => logout()}
                    className="p-3 rounded-full text-arena-textMuted bg-arena-bg border border-white/5 hover:text-arena-accent transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
