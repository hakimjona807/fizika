import React from 'react';
import {
  Atom,
  Search,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Bookmark,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { Language, Theme } from '../types';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  activeSection: string;
  onNavigate: (section: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onOpenSearch: () => void;
  favoriteCount: number;
}

export const Navbar: React.FC<Props> = ({
  activeSection,
  onNavigate,
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  soundEnabled,
  onSoundToggle,
  onOpenSearch,
  favoriteCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: t[language].navHome },
    { id: 'topics', label: t[language].navTopics },
    { id: 'formulas', label: t[language].navFormulas },
    { id: 'calculator', label: t[language].navCalculator },
    { id: 'solver', label: t[language].navProblemSolver },
    { id: 'lab', label: t[language].navLab },
    { id: 'games', label: t[language].navGames, badge: 'GAME' },
    { id: 'graph', label: t[language].navGraph },
    { id: 'quiz', label: t[language].navQuiz },
    { id: 'practice', label: t[language].navPractice },
    { id: 'ai-tutor', label: t[language].navAiTutor, badge: 'AI' },
    { id: 'progress', label: t[language].navProgress },
    { id: 'settings', label: t[language].navSettings },
  ];

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b backdrop-blur-xl ${
        isDark
          ? 'bg-zinc-950/85 border-zinc-800/80 text-zinc-100'
          : 'bg-white/90 border-zinc-200 text-zinc-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Atom className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                FizikaLab
              </span>
              <span className="text-[10px] text-zinc-400 -mt-1 font-mono tracking-widest uppercase">
                Interactive Core
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 9).map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all relative flex items-center gap-1.5 ${
                    active
                      ? isDark
                        ? 'bg-zinc-800 text-cyan-400 border border-zinc-700/60 shadow-sm'
                        : 'bg-zinc-100 text-cyan-600 border border-zinc-300'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge === 'GAME' && (
                    <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-400 text-[9px] font-mono font-bold">
                      🎮
                    </span>
                  )}
                </button>
              );
            })}

            {/* AI Tutor Button Highlighting */}
            <button
              onClick={() => handleNavClick('ai-tutor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                activeSection === 'ai-tutor'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t[language].navAiTutor}</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenSearch();
              }}
              title="Global Search (Ctrl + K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-100 bg-zinc-800/40 border border-zinc-700/40 hover:border-zinc-600 transition-all"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline font-sans">{t[language].search}</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center rounded-xl bg-zinc-800/50 p-0.5 border border-zinc-700/50 text-xs font-semibold">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onLanguageChange('uz');
                }}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === 'uz'
                    ? 'bg-cyan-500 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="O'zbek tili"
              >
                🇺🇿 UZ
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onLanguageChange('ru');
                }}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === 'ru'
                    ? 'bg-cyan-500 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Русский язык"
              >
                🇷🇺 RU
              </button>
            </div>

            {/* Favorites Icon */}
            <button
              onClick={() => handleNavClick('favorites')}
              title={t[language].navFavorites}
              className={`relative p-2 rounded-xl border transition-all ${
                activeSection === 'favorites'
                  ? 'bg-zinc-800 text-amber-400 border-amber-500/40'
                  : 'bg-zinc-800/40 border-zinc-700/40 text-zinc-400 hover:text-amber-400 hover:border-zinc-600'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onSoundToggle();
                soundManager.playClick();
              }}
              title={soundEnabled ? 'Ovozni o\'chirish' : 'Ovozni yoqish'}
              className="p-2 rounded-xl bg-zinc-800/40 border border-zinc-700/40 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                soundManager.playClick();
                onThemeToggle();
              }}
              title={isDark ? 'Yorug\' rejim' : 'To\'q rejim'}
              className="p-2 rounded-xl bg-zinc-800/40 border border-zinc-700/40 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-zinc-800/50 border border-zinc-700 text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[9px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
