import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { Language, Theme } from '../types';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  onProblemSolvedCount?: () => void;
}

interface GeneratedProblem {
  categoryUz: string;
  categoryRu: string;
  textUz: string;
  textRu: string;
  answer: number;
  tolerance: number;
  unit: string;
  formula: string;
  stepsUz: string[];
  stepsRu: string[];
}

export const PracticePage: React.FC<Props> = ({ language, theme, onProblemSolvedCount }) => {
  const [solvedCount, setSolvedCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showSolution, setShowSolution] = useState(false);

  // Procedural Problem Generator
  const generateProblem = (): GeneratedProblem => {
    const types = ['newton2', 'speed', 'ohm', 'potential_energy', 'work'];
    const selected = types[Math.floor(Math.random() * types.length)];

    if (selected === 'newton2') {
      const m = Math.floor(Math.random() * 8) + 2; // 2..10 kg
      const a = Math.floor(Math.random() * 6) + 2; // 2..8 m/s²
      const F = m * a;
      return {
        categoryUz: 'Dinamika',
        categoryRu: 'Динамика',
        textUz: `Massasi ${m} kg bo'lgan jismga ${F} N kuch ta'sir qilmoqda. Jismning tezlanishini toping (m/s² da).`,
        textRu: `Телу массой ${m} кг сообщили силу ${F} Н. Найдите ускорение тела (в м/с²).`,
        answer: a,
        tolerance: 0.1,
        unit: 'm/s²',
        formula: 'a = F / m',
        stepsUz: [`1. Nyuton 2-qonuni: F = m · a`, `2. a = ${F} / ${m} = ${a} m/s²`],
        stepsRu: [`1. Второй закон Ньютона: F = m · a`, `2. a = ${F} / ${m} = ${a} м/с²`],
      };
    } else if (selected === 'speed') {
      const v = (Math.floor(Math.random() * 10) + 5) * 2; // 10..30 m/s
      const time = Math.floor(Math.random() * 5) + 3; // 3..8 s
      const s = v * time;
      return {
        categoryUz: 'Kinematika',
        categoryRu: 'Кинематика',
        textUz: `Avtomobil ${v} m/s tezlik bilan ${time} soniya davomida tekis harakatlandi. Bosib o'tilgan yo'lni toping (metrda).`,
        textRu: `Автомобиль двигался со скоростью ${v} м/с в течение ${time} секунд. Найдите пройденный путь (в метрах).`,
        answer: s,
        tolerance: 1,
        unit: 'm',
        formula: 's = v · t',
        stepsUz: [`1. Formulaga qo'yamiz: s = v · t`, `2. s = ${v} · ${time} = ${s} m`],
        stepsRu: [`1. Подставляем в формулу: s = v · t`, `2. s = ${v} · ${time} = ${s} м`],
      };
    } else if (selected === 'ohm') {
      const R = Math.floor(Math.random() * 8) + 4; // 4..12 Ohm
      const I = Math.floor(Math.random() * 4) + 2; // 2..6 A
      const U = R * I;
      return {
        categoryUz: 'Elektr',
        categoryRu: 'Электричество',
        textUz: `Qarshiligi ${R} Om bo'lgan o'tkazgichdagi kuchlanish ${U} V ga teng. Undan o'tuvchi tok kuchini toping (A da).`,
        textRu: `Напряжение на проводнике сопротивлением ${R} Ом равно ${U} В. Найдите силу тока (в А).`,
        answer: I,
        tolerance: 0.1,
        unit: 'A',
        formula: 'I = U / R',
        stepsUz: [`1. Om qonuni: I = U / R`, `2. I = ${U} / ${R} = ${I} A`],
        stepsRu: [`1. Закон Ома: I = U / R`, `2. I = ${U} / ${R} = ${I} А`],
      };
    } else if (selected === 'potential_energy') {
      const m = Math.floor(Math.random() * 4) + 2; // 2..6 kg
      const h = Math.floor(Math.random() * 5) + 2; // 2..7 m
      const g = 10;
      const Ep = m * g * h;
      return {
        categoryUz: 'Ish va energiya',
        categoryRu: 'Работа и энергия',
        textUz: `Massasi ${m} kg bo'lgan jism ${h} m balandlikda turibdi. Potensial energiyani hisoblang (g = 10 m/s², J da).`,
        textRu: `Тело массой ${m} кг находится на высоте ${h} м. Рассчитайте потенциальную энергию (g = 10 м/с², в Дж).`,
        answer: Ep,
        tolerance: 1,
        unit: 'J',
        formula: 'Ep = m · g · h',
        stepsUz: [`1. Ep = m · g · h`, `2. Ep = ${m} · 10 · ${h} = ${Ep} J`],
        stepsRu: [`1. Ep = m · g · h`, `2. Ep = ${m} · 10 · ${h} = ${Ep} Дж`],
      };
    } else {
      const F = (Math.floor(Math.random() * 8) + 2) * 10; // 20..100 N
      const s = Math.floor(Math.random() * 6) + 2; // 2..8 m
      const A = F * s;
      return {
        categoryUz: 'Ish va energiya',
        categoryRu: 'Работа и энергия',
        textUz: `Jismga ${F} N gorizontal kuch ta'sir etib, uni ${s} m masofaga siljitdi. Bajarilgan ishni toping (J da).`,
        textRu: `Сила ${F} Н переместила тело на расстояние ${s} м. Найдите совершенную работу (в Дж).`,
        answer: A,
        tolerance: 1,
        unit: 'J',
        formula: 'A = F · s',
        stepsUz: [`1. A = F · s`, `2. A = ${F} · ${s} = ${A} J`],
        stepsRu: [`1. A = F · s`, `2. A = ${F} · ${s} = ${A} Дж`],
      };
    }
  };

  const [currentProblem, setCurrentProblem] = useState<GeneratedProblem>(() => generateProblem());

  const handleCheck = () => {
    const parsed = parseFloat(userAnswer.replace(',', '.'));
    if (isNaN(parsed)) {
      soundManager.playError();
      return;
    }

    if (Math.abs(parsed - currentProblem.answer) <= currentProblem.tolerance) {
      soundManager.playSuccess();
      setFeedback('correct');
      setSolvedCount((c) => c + 1);
      if (onProblemSolvedCount) onProblemSolvedCount();
    } else {
      soundManager.playError();
      setFeedback('incorrect');
    }
  };

  const handleNextProblem = () => {
    soundManager.playClick();
    setCurrentProblem(generateProblem());
    setUserAnswer('');
    setFeedback('idle');
    setShowSolution(false);
  };

  const isDark = theme === 'dark';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{language === 'uz' ? 'Jonli Masala Generator' : 'Генератор задач'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {t[language].practiceTitle}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {t[language].practiceSubtitle}
          </p>
        </div>

        {/* Counter badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-800/80 border border-zinc-700 font-mono text-xs text-zinc-300">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>{t[language].problemsSolved}:</span>
          <span className="text-emerald-400 font-bold text-sm">{solvedCount}</span>
        </div>
      </div>

      {/* Main Problem Workstation Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
          isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-800 text-cyan-400 border border-zinc-700/60 font-semibold">
            {language === 'uz' ? currentProblem.categoryUz : currentProblem.categoryRu}
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Tol: ±{currentProblem.tolerance}
          </span>
        </div>

        {/* Problem text */}
        <div className="py-2">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 leading-relaxed">
            {language === 'uz' ? currentProblem.textUz : currentProblem.textRu}
          </h2>
        </div>

        {/* Input & Check Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setFeedback('idle');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCheck();
              }}
              placeholder={t[language].enterAnswer}
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-950 border border-zinc-700 text-sm font-mono text-zinc-100 outline-none focus:border-emerald-500 transition-colors"
            />
            <span className="absolute right-4 top-3.5 text-xs font-mono text-zinc-500">
              {currentProblem.unit}
            </span>
          </div>

          <button
            onClick={handleCheck}
            disabled={!userAnswer.trim()}
            className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {t[language].submitAnswer}
          </button>

          <button
            onClick={handleNextProblem}
            className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-all cursor-pointer"
          >
            <span>{t[language].nextProblem}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Immediate Feedback */}
        {feedback === 'correct' && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{t[language].correct}</span>
            </div>
            <button
              onClick={handleNextProblem}
              className="text-xs underline hover:text-emerald-300"
            >
              {t[language].nextProblem} →
            </button>
          </div>
        )}

        {feedback === 'incorrect' && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-semibold">
              <XCircle className="w-5 h-5" />
              <span>{t[language].incorrect}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">
                Formula: <code className="font-mono text-cyan-300">{currentProblem.formula}</code>
              </span>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="underline hover:text-zinc-200"
              >
                {showSolution ? t[language].close : t[language].showSolution}
              </button>
            </div>
          </div>
        )}

        {/* Revealed Solution Box */}
        {showSolution && (
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 space-y-2 animate-in fade-in duration-200">
            <span className="text-[11px] font-bold text-cyan-400 uppercase font-sans">
              {t[language].steps}:
            </span>
            {(language === 'uz' ? currentProblem.stepsUz : currentProblem.stepsRu).map((step, idx) => (
              <div key={idx}>{step}</div>
            ))}
            <div className="pt-2 text-emerald-400 font-bold">
              {t[language].answer}: {currentProblem.answer} {currentProblem.unit}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
