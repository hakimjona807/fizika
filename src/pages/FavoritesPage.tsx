import React from 'react';
import { Bookmark, Sigma, BookOpen, Trash2, ArrowRight } from 'lucide-react';
import { Language, Theme } from '../types';
import { FORMULAS } from '../data/formulas';
import { TOPICS } from '../data/topics';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  favoriteFormulaIds: string[];
  favoriteTopicIds: string[];
  onToggleFormulaFav: (id: string) => void;
  onToggleTopicFav: (id: string) => void;
  onNavigate: (section: string, itemId?: string) => void;
}

export const FavoritesPage: React.FC<Props> = ({
  language,
  theme,
  favoriteFormulaIds,
  favoriteTopicIds,
  onToggleFormulaFav,
  onToggleTopicFav,
  onNavigate,
}) => {
  const savedFormulas = FORMULAS.filter((f) => favoriteFormulaIds.includes(f.id));
  const savedTopics = TOPICS.filter((top) => favoriteTopicIds.includes(top.id));

  const isDark = theme === 'dark';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Bookmark className="w-4 h-4 fill-amber-400" />
          <span>{language === 'uz' ? 'Shaxsiy to‘plam' : 'Личная коллекция'}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {t[language].navFavorites}
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          {language === 'uz'
            ? 'Tez ko‘rish uchun saqlab qo‘yilgan barcha formulalar va mavzular'
            : 'Все сохраненные формулы и разделы для быстрого повторения'}
        </p>
      </div>

      {savedFormulas.length === 0 && savedTopics.length === 0 && (
        <div
          className={`p-12 text-center rounded-3xl border ${
            isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <Bookmark className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-zinc-300">
            {language === 'uz' ? 'Hozircha hech narsa saqlanmagan' : 'Пока нет сохраненных элементов'}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
            {language === 'uz'
              ? 'Formulalar yoki mavzular yonidagi xatcho‘p belgisini bosib, ularni bu yerga qo‘shishingiz mumkin.'
              : 'Нажмите на значок закладки рядом с любой формулой или темой, чтобы добавить её сюда.'}
          </p>
        </div>
      )}

      {/* Saved Formulas Section */}
      {savedFormulas.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Sigma className="w-5 h-5 text-indigo-400" />
            <span>{t[language].navFormulas} ({savedFormulas.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedFormulas.map((f) => (
              <div
                key={f.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between ${
                  isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-indigo-400">
                      {language === 'uz' ? f.categoryUz : f.categoryRu}
                    </span>
                    <button
                      onClick={() => onToggleFormulaFav(f.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1"
                      title={t[language].removeFromFavorites}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 font-mono text-center text-lg font-bold text-cyan-300">
                    {f.latex}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-100">
                      {language === 'uz' ? f.titleUz : f.titleRu}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                      {language === 'uz' ? f.meaningUz : f.meaningRu}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between mt-3 text-xs">
                  <span className="text-zinc-500 font-mono">[{f.siUnit}]</span>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('formulas', f.id);
                    }}
                    className="text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>{t[language].details}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Topics Section */}
      {savedTopics.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>{t[language].navTopics} ({savedTopics.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTopics.map((top) => (
              <div
                key={top.id}
                className={`p-5 rounded-3xl border flex items-center justify-between ${
                  isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div>
                  <div className="text-xs font-mono text-cyan-400">
                    #{top.number} {language === 'uz' ? 'Bo‘lim' : 'Раздел'}
                  </div>
                  <h4 className="text-base font-bold text-zinc-100 mt-0.5">
                    {language === 'uz' ? top.categoryUz : top.categoryRu}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-1 max-w-sm mt-1">
                    {language === 'uz' ? top.summaryUz : top.summaryRu}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleTopicFav(top.id)}
                    className="p-2 text-zinc-500 hover:text-rose-400"
                    title={t[language].removeFromFavorites}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNavigate('topics', top.id);
                    }}
                    className="p-2 text-cyan-400 hover:text-cyan-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
