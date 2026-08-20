import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import TeacherDashboard from './pages/TeacherDashboard';
import Leaderboard from './pages/Leaderboard';
import HowItWorks from './pages/HowItWorks';
import Flashcards from './pages/Flashcards';
import SmartReview from './pages/SmartReview';
import Battle from './pages/Battle';
import FeedbackModal from './components/FeedbackModal';
import AIChatbot from './components/AIChatbot';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <div className="min-h-screen bg-arena-bg text-arena-text font-sans relative flex flex-col selection:bg-arena-accent/30">
        {/* Global Noise and Gradient */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-arena-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-1 flex flex-col mt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/quiz/:id/result" element={<Result />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<TeacherDashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/review" element={<SmartReview />} />
              <Route path="/battle" element={<Battle />} />
              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Newsletter />
          <Footer />
        
        {/* Global Modals & Components */}
        <FeedbackModal />
        <AIChatbot />
      </div>

        <CookieBanner />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
