import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Toast, Footer } from './components/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LanguageDetailPage from './pages/LanguageDetailPage';
import AudioArchivePage from './pages/AudioArchivePage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import ContributePage from './pages/ContributePage';
import WordSearchPage from './pages/WordSearchPage';
import LanguageMapPage from './pages/LanguageMapPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/language/:id" element={<LanguageDetailPage />} />
              <Route path="/audio" element={<AudioArchivePage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/stories/:id" element={<StoryDetailPage />} />
              <Route path="/contribute" element={<ContributePage />} />
              <Route path="/word-search" element={<WordSearchPage />} />
              <Route path="/map" element={<LanguageMapPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* 404 */}
              <Route path="*" element={
                <div className="min-h-screen pt-16 flex items-center justify-center pattern-bg">
                  <div className="text-center">
                    <div className="text-8xl mb-4 opacity-30">🔤</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Page not found</h1>
                    <p className="text-slate-400 mb-6">This page doesn't exist in our archive.</p>
                    <a href="/" className="btn-primary">
                      Return Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
