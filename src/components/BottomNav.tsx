import React from 'react';
import { Home, BookOpen, Sigma, Calculator, FlaskConical, Gamepad2, Award } from 'lucide-react';
import { Language } from '../types';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  activeSection: string;
  onNavigate: (section: string) => void;
  language: Language;
}

export const BottomNav: React.FC<Props> = ({ activeSection, onNavigate, language }) => {
  const items = [
    { id: 'home', label: t[language].navHome, icon: Home },
    { id: 'topics', label: t[language].navTopics, icon: BookOpen },
    { id: 'formulas', label: t[language].navFormulas, icon: Sigma },
    { id: 'calculator', label: t[language].navCalculator, icon: Calculator },
    { id: 'games', label: t[language].navGames, icon: Gamepad2, highlight: true },
    { id: 'quiz', label: t[language].navQuiz, icon: Award },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/80 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              soundManager.playClick();
              onNavigate(item.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive
                ? item.highlight
                  ? 'text-cyan-300 font-bold'
                  : 'text-cyan-400 font-semibold'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${
              isActive 
                ? item.highlight 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 shadow-sm'
                  : 'bg-cyan-500/15'
                : ''
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
