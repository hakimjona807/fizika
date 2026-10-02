import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Flame,
  Award,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Language, Theme, TopicItem } from '../types';
import { TOPICS } from '../data/topics';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  favoriteTopics: string[];
  onToggleFavorite: (id: string) => void;
  selectedTopicId?: string;
  onNavigateToCalculator?: (catId: string) => void;
}

export const TopicsPage: React.FC<Props> = ({
  language,
  theme,
  favoriteTopics,
  onToggleFavorite,
  selectedTopicId,
  onNavigateToCalculator,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicItem>(() => {
    if (selectedTopicId) {
      const found = TOPICS.find((top) => top.id === selectedTopicId);
      if (found) return found;
    }
    return TOPICS[0];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [userPracticeAnswer, setUserPracticeAnswer] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showPracticeSolution, setShowPracticeSolution] = useState(false);
  const [miniQuizSelected, setMiniQuizSelected] = useState<number | null>(null);
  const [miniQuizSubmitted, setMiniQuizSubmitted] = useState(false);

  const isDark = theme === 'dark';

  const filteredTopics = TOPICS.filter((top) => {
    const q = searchQuery.toLowerCase();
    return (
      top.categoryUz.toLowerCase().includes(q) ||
      top.categoryRu.toLowerCase().includes(q) ||
      top.summaryUz.toLowerCase().includes(q) ||
      top.summaryRu.toLowerCase().includes(q)
    );
  });

  const handleSelectTopic = (top: TopicItem) => {
    soundManager.playClick();
    setSelectedTopic(top);
    setUserPracticeAnswer('');
    setPracticeFeedback('idle');
    setShowPracticeSolution(false);
    setMiniQuizSelected(null);
    setMiniQuizSubmitted(false);
  };

  const handleCheckPractice = () => {
    const userVal = parseFloat(userPracticeAnswer.replace(',', '.'));
    if (isNaN(userVal)) {
      soundManager.playError();
      return;
    }
    const expected = selectedTopic.practiceProblem.answer;
    const tol = selectedTopic.practiceProblem.tolerance || 0.1;
    if (Math.abs(userVal - expected) <= tol) {
      soundManager.playSuccess();
      setPracticeFeedback('correct');
    } else {
      soundManager.playError();
      setPracticeFeedback('incorrect');
    }
  };

  const isFav = favoriteTopics.includes(selectedTopic.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>{language === 'uz' ? 'Fizika ensiklopediyasi' : 'Энциклопедия физики'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {t[language].navTopics}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {language === 'uz'
              ? 'Maktab va universitet bosqichidagi barcha 16 ta fundamental bo‘lim'
              : 'Все 16 фундаментальных разделов физики с формулами и практическими задачами'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t[language].search}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 text-xs text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Main Layout: Left Sidebar (Topic List) + Right Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic Selector List */}
        <div className="lg:col-span-4 space-y-2 max-h-[780px] overflow-y-auto pr-1">
          {filteredTopics.map((top) => {
            const isSelected = top.id === selectedTopic.id;
            const topIsFav = favoriteTopics.includes(top.id);
            return (
              <div
                key={top.id}
                onClick={() => handleSelectTopic(top)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-950/20'
                    : isDark
                    ? 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700'
                    : 'bg-white border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
                      isSelected
                        ? 'bg-cyan-500 text-black'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {top.number}
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isSelected ? 'text-cyan-400' : 'text-zinc-200'
                      }`}
                    >
                      {language === 'uz' ? top.categoryUz : top.categoryRu}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 max-w-[190px]">
                      {language === 'uz' ? top.summaryUz : top.summaryRu}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {topIsFav && (
                    <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-zinc-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Topic Detailed Study Card */}
        <div className="lg:col-span-8 space-y-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  {language === 'uz' ? `BO‘LIM #${selectedTopic.number}` : `РАЗДЕЛ #${selectedTopic.number}`}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 mt-1">
                  {language === 'uz' ? selectedTopic.categoryUz : selectedTopic.categoryRu}
                </h2>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                  {language === 'uz' ? selectedTopic.summaryUz : selectedTopic.summaryRu}
                </p>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onToggleFavorite(selectedTopic.id);
                }}
                className={`p-3 rounded-2xl border transition-all ${
                  isFav
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-amber-400'
                }`}
                title={t[language].saveToFavorites}
              >
                <Bookmark className={`w-5 h-5 ${isFav ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            {/* Content Sections */}
            <div className="pt-6 space-y-8">
              {/* 1. Definitions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{t[language].definitions}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedTopic.definitions.map((def, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 space-y-1.5"
                    >
                      <span className="text-xs font-bold text-zinc-100 block">
                        {language === 'uz' ? def.termUz : def.termRu}
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {language === 'uz' ? def.defUz : def.defRu}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Main Formulas */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>{t[language].formula}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTopic.mainFormulas.map((mf, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-300">
                          {language === 'uz' ? mf.titleUz : mf.titleRu}
                        </span>
                        <code className="text-base font-bold font-mono text-cyan-300 px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-700">
                          {mf.latex}
                        </code>
                      </div>

                      {mf.variables.length > 0 && (
                        <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                          {mf.variables.map((v, vidx) => (
                            <div key={vidx} className="flex items-center justify-between">
                              <span className="font-mono text-cyan-400 font-semibold">{v.symbol}:</span>
                              <span>{language === 'uz' ? v.nameUz : v.nameRu}</span>
                              <span className="text-zinc-500 font-mono">[{v.unit}]</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Real-life Examples */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>{t[language].realLife}</span>
                </h3>
                <div className="space-y-2">
                  {(language === 'uz' ? selectedTopic.realLifeUz : selectedTopic.realLifeRu).map(
                    (rl, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-2xl bg-zinc-800/30 border border-zinc-700/40 text-xs text-zinc-300"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                          ✓
                        </span>
                        <span>{rl}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* 4. Solved Example Problem */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{t[language].solvedExample}</span>
                </h3>
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/25 space-y-4">
                  <div className="font-semibold text-xs text-zinc-200">
                    {language === 'uz'
                      ? selectedTopic.solvedExample.problemUz
                      : selectedTopic.solvedExample.problemRu}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                      <span className="font-bold text-amber-400 text-[11px] uppercase">
                        {t[language].given}:
                      </span>
                      {selectedTopic.solvedExample.given.map((g, idx) => (
                        <div key={idx} className="text-zinc-300 font-mono text-[11px]">
                          {language === 'uz' ? g.labelUz : g.labelRu}: {g.value}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                      <span className="font-bold text-amber-400 text-[11px] uppercase">
                        {t[language].find}:
                      </span>
                      <div className="text-zinc-300 font-mono text-[11px]">
                        {language === 'uz'
                          ? selectedTopic.solvedExample.findUz
                          : selectedTopic.solvedExample.findRu}
                      </div>
                      <div className="text-cyan-400 font-mono font-semibold pt-1">
                        Formula: {selectedTopic.solvedExample.formula}
                      </div>
                    </div>
                  </div>

                  {/* Solution steps */}
                  <div className="space-y-1 text-xs text-zinc-300 font-mono bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase font-sans font-bold block mb-1">
                      {t[language].steps}:
                    </span>
                    {(language === 'uz'
                      ? selectedTopic.solvedExample.solutionUz
                      : selectedTopic.solvedExample.solutionRu
                    ).map((step, idx) => (
                      <div key={idx}>{step}</div>
                    ))}
                    <div className="pt-2 text-emerald-400 font-bold font-sans">
                      {t[language].answer}: {selectedTopic.solvedExample.answer}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Practice Problem with Check */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{t[language].practice}</span>
                </h3>
                <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/25 space-y-3">
                  <p className="text-xs text-zinc-200">
                    {language === 'uz'
                      ? selectedTopic.practiceProblem.questionUz
                      : selectedTopic.practiceProblem.questionRu}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={userPracticeAnswer}
                        onChange={(e) => {
                          setUserPracticeAnswer(e.target.value);
                          setPracticeFeedback('idle');
                        }}
                        placeholder={t[language].enterAnswer}
                        className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-100 outline-none focus:border-purple-400 font-mono w-40"
                      />
                      <span className="absolute right-3 top-2 text-xs font-mono text-zinc-500">
                        {selectedTopic.practiceProblem.unit}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckPractice}
                      className="px-4 py-2 rounded-xl bg-purple-500 text-white font-semibold text-xs hover:bg-purple-400 transition-colors"
                    >
                      {t[language].checkAnswer}
                    </button>

                    <button
                      onClick={() => setShowPracticeSolution(!showPracticeSolution)}
                      className="text-xs text-zinc-400 hover:text-zinc-200 underline"
                    >
                      {showPracticeSolution ? t[language].close : t[language].showSolution}
                    </button>
                  </div>

                  {practiceFeedback === 'correct' && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t[language].correct}</span>
                    </div>
                  )}

                  {practiceFeedback === 'incorrect' && (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 font-semibold">
                      <span>{t[language].incorrect}</span>
                      <span className="block font-normal text-[11px] text-zinc-400 mt-1">
                        {t[language].hint}:{' '}
                        {language === 'uz'
                          ? selectedTopic.practiceProblem.hintUz
                          : selectedTopic.practiceProblem.hintRu}
                      </span>
                    </div>
                  )}

                  {showPracticeSolution && (
                    <div className="p-3 rounded-xl bg-zinc-900 text-xs font-mono text-zinc-300 border border-zinc-800">
                      <span className="text-zinc-500 block mb-1">{t[language].solution}:</span>
                      {language === 'uz'
                        ? selectedTopic.practiceProblem.solutionUz
                        : selectedTopic.practiceProblem.solutionRu}
                    </div>
                  )}
                </div>
              </div>

              {/* 6. Mini Quiz Item */}
              {selectedTopic.miniQuiz.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>{language === 'uz' ? 'Mavzu bo‘yicha mini-test' : 'Мини-тест по теме'}</span>
                  </h3>
                  <div className="p-5 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 space-y-4">
                    <p className="text-xs font-semibold text-zinc-200">
                      {language === 'uz'
                        ? selectedTopic.miniQuiz[0].questionUz
                        : selectedTopic.miniQuiz[0].questionRu}
                    </p>

                    <div className="space-y-2">
                      {(language === 'uz'
                        ? selectedTopic.miniQuiz[0].optionsUz
                        : selectedTopic.miniQuiz[0].optionsRu
                      ).map((opt, oidx) => {
                        const isChosen = miniQuizSelected === oidx;
                        const isCorrect = selectedTopic.miniQuiz[0].correctIndex === oidx;
                        return (
                          <button
                            key={oidx}
                            disabled={miniQuizSubmitted}
                            onClick={() => {
                              soundManager.playClick();
                              setMiniQuizSelected(oidx);
                            }}
                            className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all border ${
                              miniQuizSubmitted
                                ? isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                                  : isChosen
                                  ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                : isChosen
                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {!miniQuizSubmitted ? (
                      <button
                        disabled={miniQuizSelected === null}
                        onClick={() => {
                          if (miniQuizSelected === selectedTopic.miniQuiz[0].correctIndex) {
                            soundManager.playSuccess();
                          } else {
                            soundManager.playError();
                          }
                          setMiniQuizSubmitted(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-colors disabled:opacity-50"
                      >
                        {t[language].checkAnswer}
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                        <div className="font-semibold text-cyan-400">
                          {miniQuizSelected === selectedTopic.miniQuiz[0].correctIndex
                            ? t[language].correct
                            : t[language].incorrect}
                        </div>
                        <p className="text-[11px] text-zinc-400">
                          {language === 'uz'
                            ? selectedTopic.miniQuiz[0].explanationUz
                            : selectedTopic.miniQuiz[0].explanationRu}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
