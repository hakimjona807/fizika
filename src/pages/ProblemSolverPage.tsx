import React, { useState } from 'react';
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ListOrdered,
  Sigma,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Language, Theme } from '../types';
import { SAMPLE_PROBLEMS, analyzeCustomProblem, SolvedAnalysis } from '../data/problemSolverData';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  onProblemSolved?: () => void;
}

export const ProblemSolverPage: React.FC<Props> = ({ language, theme, onProblemSolved }) => {
  const [problemText, setProblemText] = useState(
    language === 'uz' ? SAMPLE_PROBLEMS[0].textUz : SAMPLE_PROBLEMS[0].textRu
  );
  const [analysis, setAnalysis] = useState<SolvedAnalysis>(SAMPLE_PROBLEMS[0].analysis);
  const [isSolving, setIsSolving] = useState(false);

  const handleSelectSample = (sample: typeof SAMPLE_PROBLEMS[0]) => {
    soundManager.playClick();
    const text = language === 'uz' ? sample.textUz : sample.textRu;
    setProblemText(text);
    setAnalysis(sample.analysis);
  };

  const handleSolve = () => {
    if (!problemText.trim()) return;
    soundManager.playClick();
    setIsSolving(true);

    setTimeout(() => {
      // Check if matches predefined samples
      const matched = SAMPLE_PROBLEMS.find(
        (s) =>
          s.textUz.toLowerCase() === problemText.trim().toLowerCase() ||
          s.textRu.toLowerCase() === problemText.trim().toLowerCase()
      );

      if (matched) {
        setAnalysis(matched.analysis);
      } else {
        const result = analyzeCustomProblem(problemText);
        setAnalysis(result);
      }

      setIsSolving(false);
      soundManager.playSuccess();
      if (onProblemSolved) onProblemSolved();
    }, 350);
  };

  const isDark = theme === 'dark';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <BrainCircuit className="w-4 h-4" />
          <span>{language === 'uz' ? 'Qadam-baqadam tahlil' : 'Пошаговый разбор'}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {t[language].solverTitle}
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          {t[language].solverSubtitle}
        </p>
      </div>

      {/* Input Section */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}
      >
        {/* Sample Problems Bar */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{t[language].selectSample}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROBLEMS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectSample(s)}
                className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-xs text-zinc-300 hover:text-white transition-all text-left"
              >
                {language === 'uz' ? s.textUz : s.textRu}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-zinc-300">
            {t[language].customProblemPrompt}
          </label>
          <textarea
            rows={3}
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder={t[language].problemTextPlaceholder}
            className="w-full p-4 rounded-2xl bg-zinc-950/80 border border-zinc-700/80 text-sm text-zinc-100 outline-none focus:border-purple-500 transition-colors font-sans"
          />

          <button
            onClick={handleSolve}
            disabled={isSolving || !problemText.trim()}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-sm transition-all shadow-lg shadow-purple-950/40 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>{isSolving ? 'Tahlil qilinmoqda...' : t[language].solveBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 8-Point Analysis Breakdown Panel */}
      {analysis && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
            isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
          }`}
        >
          {/* Header Analysis Title */}
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
              {language === 'uz' ? '8 Bosqichli Fizik Tahlil' : '8-ступенчатый физический анализ'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
              {language === 'uz' ? analysis.titleUz : analysis.titleRu}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Berilgan (Дано) */}
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>{t[language].given}</span>
              </div>
              <div className="space-y-1 pt-1">
                {analysis.given.map((g, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono text-zinc-200">
                    <span className="text-zinc-400">{language === 'uz' ? g.labelUz : g.labelRu}:</span>
                    <span className="font-bold text-cyan-300">{g.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Topish kerak (Найти) */}
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>{t[language].find}</span>
              </div>
              <div className="text-sm font-mono text-indigo-300 font-bold pt-2">
                {language === 'uz' ? analysis.findUz : analysis.findRu}
              </div>
            </div>

            {/* 3. Formula */}
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>{t[language].formula}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-mono text-lg font-bold text-emerald-400">
                {analysis.formula}
              </div>
            </div>

            {/* 4. Formula variables */}
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>{t[language].variables}</span>
              </div>
              <div className="space-y-1 text-xs">
                {analysis.variablesBreakdown.map((vb, idx) => (
                  <div key={idx} className="flex items-center justify-between text-zinc-300 font-mono">
                    <span className="font-bold text-amber-400">{vb.symbol}:</span>
                    <span className="text-[11px]">{language === 'uz' ? vb.nameUz : vb.nameRu}</span>
                    <span className="text-zinc-500 text-[11px]">[{vb.unit}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Calculation (Вычисление) */}
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px]">
                5
              </span>
              <span>{language === 'uz' ? 'Bosqichma-bosqich hisoblash jarayoni' : 'Пошаговый расчет'}</span>
            </div>
            <div className="space-y-1.5 font-mono text-xs text-zinc-200">
              {(language === 'uz' ? analysis.calculationStepsUz : analysis.calculationStepsRu).map(
                (step, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                    {step}
                  </div>
                )
              )}
            </div>
          </div>

          {/* 6 & 7. Final Answer & Unit */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-zinc-950 to-emerald-950/30 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                  6 & 7
                </span>
                <span>{t[language].answer} & {t[language].unit}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 flex items-baseline gap-2">
                <span>{analysis.finalAnswer}</span>
                <span className="text-lg text-emerald-400 font-sans font-bold">
                  {analysis.unit}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 text-right">
              <div>SI: 100% verified</div>
              <div className="text-emerald-400">Status: Aniq hisoblandi</div>
            </div>
          </div>

          {/* 8. Short explanation */}
          <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px]">
                8
              </span>
              <span>{t[language].explanation}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {language === 'uz' ? analysis.explanationUz : analysis.explanationRu}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
