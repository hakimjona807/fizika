import React, { useState } from 'react';
import {
  Sigma,
  Search,
  Bookmark,
  Copy,
  Check,
  Filter,
  CheckCircle2,
  Info,
  ExternalLink
} from 'lucide-react';
import { Language, Theme, FormulaItem } from '../types';
import { FORMULAS } from '../data/formulas';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  favoriteFormulas: string[];
  onToggleFavorite: (id: string) => void;
  onNavigateToCalculator?: (calcId?: string) => void;
}

export const FormulasPage: React.FC<Props> = ({
  language,
  theme,
  favoriteFormulas,
  onToggleFavorite,
  onNavigateToCalculator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelUz: 'Barcha formulalar', labelRu: 'Все формулы' },
    { id: 'kinematika', labelUz: 'Kinematika', labelRu: 'Кинематика' },
    { id: 'dinamika', labelUz: 'Dinamika', labelRu: 'Динамика' },
    { id: 'ish_va_energiya', labelUz: 'Ish va energiya', labelRu: 'Работа и энергия' },
    { id: 'impuls', labelUz: 'Impuls', labelRu: 'Импульс' },
    { id: 'mexanika', labelUz: 'Mexanika & Gidrostatika', labelRu: 'Механика и жидкости' },
    { id: 'termodinamika', labelUz: 'Termodinamika', labelRu: 'Термодинамика' },
    { id: 'elektr', labelUz: 'Elektr', labelRu: 'Электричество' },
    { id: 'tolqinlar', labelUz: 'To‘lqinlar', labelRu: 'Волны' },
    { id: 'optika', labelUz: 'Optika', labelRu: 'Оптика' },
    { id: 'yadro_fizikasi', labelUz: 'Kvant & Yadro', labelRu: 'Квантовая и ядерная' },
  ];

  const handleCopyFormula = (f: FormulaItem) => {
    soundManager.playTick();
    navigator.clipboard.writeText(`${f.titleUz}: ${f.latex}`);
    setCopiedId(f.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredFormulas = FORMULAS.filter((f) => {
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      f.titleUz.toLowerCase().includes(q) ||
      f.titleRu.toLowerCase().includes(q) ||
      f.latex.toLowerCase().includes(q) ||
      f.meaningUz.toLowerCase().includes(q) ||
      f.meaningRu.toLowerCase().includes(q) ||
      f.siUnit.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const isDark = theme === 'dark';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sigma className="w-4 h-4" />
            <span>{language === 'uz' ? 'Qonunlar va Formulalar' : 'Справочник формул'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {t[language].navFormulas}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {language === 'uz'
              ? 'Fizika qonunlarining matematik ifodasi, kattaliklar va SI o‘lchov birliklari'
              : 'Математические выражения физических законов, расшифровка переменных и единицы СИ'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'uz' ? 'Formula yoki kattalikni qidiring...' : 'Поиск формулы или величины...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 text-xs text-zinc-100 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-zinc-400 shrink-0 ml-1 mr-1" />
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-950/40'
                  : 'bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {language === 'uz' ? cat.labelUz : cat.labelRu}
            </button>
          );
        })}
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormulas.map((f) => {
          const isFav = favoriteFormulas.includes(f.id);
          const isCopied = copiedId === f.id;

          return (
            <div
              key={f.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between group ${
                isDark
                  ? 'bg-zinc-900/70 border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-850'
                  : 'bg-white border-zinc-200 hover:border-indigo-400 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                {/* Top action row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-zinc-800 text-indigo-400 font-semibold border border-zinc-700/60">
                    {language === 'uz' ? f.categoryUz : f.categoryRu}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopyFormula(f)}
                      title={t[language].copy}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onToggleFavorite(f.id);
                      }}
                      title={t[language].saveToFavorites}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFav
                          ? 'text-amber-400 hover:bg-zinc-800'
                          : 'text-zinc-400 hover:text-amber-400 hover:bg-zinc-800'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Big Formula Display */}
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center">
                  <code className="text-xl sm:text-2xl font-bold font-mono tracking-wide text-cyan-300">
                    {f.latex}
                  </code>
                </div>

                {/* Title & Meaning */}
                <div>
                  <h3 className="text-base font-bold text-zinc-100">
                    {language === 'uz' ? f.titleUz : f.titleRu}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {language === 'uz' ? f.meaningUz : f.meaningRu}
                  </p>
                </div>

                {/* Variables List */}
                {f.variables.length > 0 && (
                  <div className="p-3 rounded-2xl bg-zinc-800/30 border border-zinc-700/40 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                      {t[language].variables}:
                    </span>
                    {f.variables.map((v, idx) => (
                      <div key={idx} className="flex items-center justify-between text-zinc-300">
                        <span className="font-mono text-cyan-400 font-semibold">{v.symbol}</span>
                        <span className="text-[11px] truncate max-w-[150px]">
                          {language === 'uz' ? v.nameUz : v.nameRu}
                        </span>
                        <span className="text-zinc-500 font-mono text-[11px]">[{v.unit}]</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* When to use it */}
                <div className="text-xs text-zinc-400 space-y-1">
                  <span className="font-semibold text-zinc-300 flex items-center gap-1 text-[11px]">
                    <Info className="w-3 h-3 text-indigo-400" />
                    <span>{language === 'uz' ? 'Qachon qo‘llaniladi:' : 'Когда применяется:'}</span>
                  </span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {language === 'uz' ? f.whenToUseUz : f.whenToUseRu}
                  </p>
                </div>

                {/* Concrete Example */}
                <div className="text-xs p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-200 font-mono">
                  <span className="text-[10px] uppercase font-sans text-indigo-400 font-bold block mb-0.5">
                    {language === 'uz' ? 'Misol:' : 'Пример:'}
                  </span>
                  {language === 'uz' ? f.exampleUz : f.exampleRu}
                </div>
              </div>

              {/* SI Unit Footer */}
              <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  {t[language].unit}:{' '}
                  <span className="font-mono text-zinc-300 font-semibold">{f.siUnit}</span>
                </span>

                {onNavigateToCalculator && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onNavigateToCalculator(f.category);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>{t[language].calculate}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
