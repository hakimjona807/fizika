import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Sigma, Calculator, PlayCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TOPICS } from '../data/topics';
import { FORMULAS } from '../data/formulas';
import { CALCULATORS } from '../data/calculators';
import { t } from '../data/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigate: (section: string, itemId?: string) => void;
  theme: 'dark' | 'light';
}

export const GlobalSearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  onNavigate,
  theme,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search in topics
  const matchingTopics = q
    ? TOPICS.filter(
        (top) =>
          top.categoryUz.toLowerCase().includes(q) ||
          top.categoryRu.toLowerCase().includes(q) ||
          top.summaryUz.toLowerCase().includes(q) ||
          top.summaryRu.toLowerCase().includes(q)
      )
    : [];

  // Search in formulas
  const matchingFormulas = q
    ? FORMULAS.filter(
        (f) =>
          f.titleUz.toLowerCase().includes(q) ||
          f.titleRu.toLowerCase().includes(q) ||
          f.latex.toLowerCase().includes(q) ||
          f.meaningUz.toLowerCase().includes(q) ||
          f.meaningRu.toLowerCase().includes(q)
      )
    : [];

  // Search in calculators
  const matchingCalculators = q
    ? CALCULATORS.filter(
        (c) =>
          c.titleUz.toLowerCase().includes(q) ||
          c.titleRu.toLowerCase().includes(q) ||
          c.formulaDisplay.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchingTopics.length + matchingFormulas.length + matchingCalculators.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl transition-all ${
          theme === 'dark'
            ? 'bg-zinc-900 border-zinc-700/70 text-zinc-100 shadow-cyan-950/40'
            : 'bg-white border-zinc-200 text-zinc-900 shadow-xl'
        }`}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-zinc-700/50">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t[language].searchPlaceholder}
            className="w-full py-4 text-base bg-transparent border-none outline-none placeholder:text-zinc-500 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="py-8 text-center text-sm text-zinc-400">
              <p className="font-medium text-zinc-300 mb-1">
                {language === 'uz' ? 'Qidirishni boshlang' : 'Начните поиск'}
              </p>
              <p className="text-xs text-zinc-500">
                {language === 'uz'
                  ? 'Masalan: "Nyuton", "Tezlik", "Om qonuni", "v = s/t", "Energiya"'
                  : 'Например: "Ньютон", "Скорость", "Закон Ома", "v = s/t", "Энергия"'}
              </p>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="py-8 text-center text-sm text-zinc-400">
              {t[language].noResults}
            </div>
          )}

          {/* Topics matches */}
          {matchingTopics.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2 px-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t[language].navTopics} ({matchingTopics.length})</span>
              </div>
              <div className="space-y-1">
                {matchingTopics.map((top) => (
                  <button
                    key={top.id}
                    onClick={() => {
                      onNavigate('topics', top.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl flex items-center justify-between hover:bg-zinc-800/60 transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                        {language === 'uz' ? top.categoryUz : top.categoryRu}
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1">
                        {language === 'uz' ? top.summaryUz : top.summaryRu}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulas matches */}
          {matchingFormulas.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 px-2 flex items-center gap-1.5">
                <Sigma className="w-3.5 h-3.5" />
                <span>{t[language].navFormulas} ({matchingFormulas.length})</span>
              </div>
              <div className="space-y-1">
                {matchingFormulas.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onNavigate('formulas', f.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl flex items-center justify-between hover:bg-zinc-800/60 transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                        <span>{language === 'uz' ? f.titleUz : f.titleRu}</span>
                        <code className="text-xs font-mono text-cyan-300 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                          {f.latex}
                        </code>
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1">
                        {language === 'uz' ? f.meaningUz : f.meaningRu}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calculators matches */}
          {matchingCalculators.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 px-2 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>{t[language].navCalculator} ({matchingCalculators.length})</span>
              </div>
              <div className="space-y-1">
                {matchingCalculators.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onNavigate('calculator', c.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl flex items-center justify-between hover:bg-zinc-800/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                        {language === 'uz' ? c.titleUz : c.titleRu}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
