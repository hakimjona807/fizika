/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { PhysicsBackground } from './components/PhysicsBackground';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { HomePage } from './pages/HomePage';
import { TopicsPage } from './pages/TopicsPage';
import { FormulasPage } from './pages/FormulasPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { ProblemSolverPage } from './pages/ProblemSolverPage';
import { InteractiveGraphPage } from './pages/InteractiveGraphPage';
import { VirtualLabPage } from './pages/VirtualLabPage';
import { GamesPage } from './pages/GamesPage';
import { QuizPage } from './pages/QuizPage';
import { PracticePage } from './pages/PracticePage';
import { AiTutorPage } from './pages/AiTutorPage';
import { ProgressPage } from './pages/ProgressPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';

import {
  loadSettings,
  saveSettings,
  loadProgress,
  saveProgress,
  clearAllData,
  defaultProgress,
  defaultSettings,
} from './utils/storage';
import { soundManager } from './utils/sound';
import { AppSettings, UserProgress, Language, Theme } from './types';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedSubItemId, setSelectedSubItemId] = useState<string | undefined>(undefined);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync sound manager with loaded settings
  useEffect(() => {
    soundManager.enabled = settings.sound;
  }, [settings.sound]);

  // Save settings on update
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
  };

  const handleLanguageChange = (lang: Language) => {
    handleUpdateSettings({ language: lang });
  };

  const handleThemeToggle = () => {
    const nextTheme: Theme = settings.theme === 'dark' ? 'light' : 'dark';
    handleUpdateSettings({ theme: nextTheme });
  };

  const handleSoundToggle = () => {
    handleUpdateSettings({ sound: !settings.sound });
  };

  const handleResetAllData = () => {
    clearAllData();
    setSettings(defaultSettings);
    setProgress(defaultProgress);
    soundManager.enabled = defaultSettings.sound;
  };

  // Toggle Favorite for Formula
  const handleToggleFavoriteFormula = (id: string) => {
    setProgress((prev) => {
      const isFav = prev.favoriteFormulaIds.includes(id);
      const updated = {
        ...prev,
        favoriteFormulaIds: isFav
          ? prev.favoriteFormulaIds.filter((fid) => fid !== id)
          : [...prev.favoriteFormulaIds, id],
      };
      saveProgress(updated);
      return updated;
    });
  };

  // Toggle Favorite for Topic
  const handleToggleFavoriteTopic = (id: string) => {
    setProgress((prev) => {
      const isFav = prev.favoriteTopicIds.includes(id);
      const updated = {
        ...prev,
        favoriteTopicIds: isFav
          ? prev.favoriteTopicIds.filter((tid) => tid !== id)
          : [...prev.favoriteTopicIds, id],
      };
      saveProgress(updated);
      return updated;
    });
  };

  // Record completed topic
  const handleTopicVisited = (id: string) => {
    setProgress((prev) => {
      if (prev.completedTopicIds.includes(id)) return prev;
      const updated = {
        ...prev,
        completedTopicIds: [...prev.completedTopicIds, id],
      };
      saveProgress(updated);
      return updated;
    });
  };

  // Record calculator used
  const handleCalculatorUsed = () => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        calculatorsUsed: prev.calculatorsUsed + 1,
      };
      saveProgress(updated);
      return updated;
    });
  };

  // Record problem solved
  const handleProblemSolved = () => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        problemsSolvedCount: prev.problemsSolvedCount + 1,
      };
      saveProgress(updated);
      return updated;
    });
  };

  // Record quiz score
  const handleQuizCompleted = (score: number, total: number, diff: string) => {
    const today = new Date().toISOString().split('T')[0];
    setProgress((prev) => {
      const updated = {
        ...prev,
        quizScores: [
          ...prev.quizScores,
          {
            date: today,
            difficulty: diff,
            score,
            total,
            percentage: Math.round((score / (total || 1)) * 100),
          },
        ],
      };
      saveProgress(updated);
      return updated;
    });
  };

  // Navigation handler
  const handleNavigate = (section: string, subItemId?: string) => {
    setActiveSection(section);
    setSelectedSubItemId(subItemId);
    if (section === 'topics' && subItemId) {
      handleTopicVisited(subItemId);
    }
    window.scrollTo({ top: 0, behavior: settings.animations ? 'smooth' : 'auto' });
  };

  const favoriteTotal = progress.favoriteFormulaIds.length + progress.favoriteTopicIds.length;
  const isDark = settings.theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative flex flex-col justify-between ${
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
      } ${settings.fontSize === 'large' ? 'text-base' : 'text-sm'}`}
    >
      {/* Subtle Physics Particle Canvas */}
      <PhysicsBackground
        animationsEnabled={settings.animations}
        theme={settings.theme}
      />

      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        language={settings.language}
        onLanguageChange={handleLanguageChange}
        theme={settings.theme}
        onThemeToggle={handleThemeToggle}
        soundEnabled={settings.sound}
        onSoundToggle={handleSoundToggle}
        onOpenSearch={() => setSearchModalOpen(true)}
        favoriteCount={favoriteTotal}
      />

      {/* Main Page Body */}
      <main className="flex-1 relative z-10">
        {activeSection === 'home' && (
          <HomePage
            language={settings.language}
            theme={settings.theme}
            animations={settings.animations}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'topics' && (
          <TopicsPage
            language={settings.language}
            theme={settings.theme}
            favoriteTopics={progress.favoriteTopicIds}
            onToggleFavorite={handleToggleFavoriteTopic}
            selectedTopicId={selectedSubItemId}
            onNavigateToCalculator={(cat) => handleNavigate('calculator', cat)}
          />
        )}

        {activeSection === 'formulas' && (
          <FormulasPage
            language={settings.language}
            theme={settings.theme}
            favoriteFormulas={progress.favoriteFormulaIds}
            onToggleFavorite={handleToggleFavoriteFormula}
            onNavigateToCalculator={() => handleNavigate('calculator')}
          />
        )}

        {activeSection === 'calculator' && (
          <CalculatorsPage
            language={settings.language}
            theme={settings.theme}
            selectedCalcId={selectedSubItemId}
            onCalculatorUsed={handleCalculatorUsed}
          />
        )}

        {activeSection === 'solver' && (
          <ProblemSolverPage
            language={settings.language}
            theme={settings.theme}
            onProblemSolved={handleProblemSolved}
          />
        )}

        {activeSection === 'graph' && (
          <InteractiveGraphPage
            language={settings.language}
            theme={settings.theme}
          />
        )}

        {activeSection === 'lab' && (
          <VirtualLabPage
            language={settings.language}
            theme={settings.theme}
            animations={settings.animations}
          />
        )}

        {activeSection === 'games' && (
          <GamesPage
            language={settings.language}
            theme={settings.theme}
          />
        )}

        {activeSection === 'quiz' && (
          <QuizPage
            language={settings.language}
            theme={settings.theme}
            onQuizCompleted={handleQuizCompleted}
          />
        )}

        {activeSection === 'practice' && (
          <PracticePage
            language={settings.language}
            theme={settings.theme}
            onProblemSolvedCount={handleProblemSolved}
          />
        )}

        {activeSection === 'ai-tutor' && (
          <AiTutorPage
            language={settings.language}
            theme={settings.theme}
          />
        )}

        {activeSection === 'progress' && (
          <ProgressPage
            language={settings.language}
            theme={settings.theme}
            progress={progress}
          />
        )}

        {activeSection === 'favorites' && (
          <FavoritesPage
            language={settings.language}
            theme={settings.theme}
            favoriteFormulaIds={progress.favoriteFormulaIds}
            favoriteTopicIds={progress.favoriteTopicIds}
            onToggleFormulaFav={handleToggleFavoriteFormula}
            onToggleTopicFav={handleToggleFavoriteTopic}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === 'settings' && (
          <SettingsPage
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        language={settings.language}
        onNavigate={handleNavigate}
        theme={settings.theme}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        language={settings.language}
      />

      {/* Professional Footer */}
      <footer
        className={`w-full py-8 border-t transition-colors duration-200 text-xs text-zinc-500 relative z-10 mb-14 xl:mb-0 ${
          isDark ? 'bg-zinc-950/80 border-zinc-900' : 'bg-white border-zinc-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              FizikaLab
            </span>
            <span>—</span>
            <span>
              {settings.language === 'uz'
                ? 'Zamonaviy interaktiv fizika ta’lim platformasi'
                : 'Современная интерактивная образовательная платформа по физике'}
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span>SI Standards: Validated</span>
            <span>Calculators: 17+ Active</span>
            <span>Version: 2.5.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
