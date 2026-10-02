import React from 'react';
import {
  Award,
  Flame,
  CheckCircle2,
  BookOpen,
  Sigma,
  Calculator,
  TrendingUp,
  Sparkles,
  Zap
} from 'lucide-react';
import { Language, Theme, UserProgress } from '../types';
import { t } from '../data/translations';

interface Props {
  language: Language;
  theme: Theme;
  progress: UserProgress;
}

export const ProgressPage: React.FC<Props> = ({ language, theme, progress }) => {
  const isDark = theme === 'dark';

  // Calculate stats
  const totalTopics = 16;
  const topicsCompletedCount = progress.completedTopicIds.length;
  const topicsPercent = Math.min(100, Math.round((topicsCompletedCount / totalTopics) * 100));

  const quizScores = progress.quizScores;
  const totalQuizzes = quizScores.length;
  const totalScorePoints = quizScores.reduce((acc, q) => acc + q.score, 0);
  const totalPossiblePoints = quizScores.reduce((acc, q) => acc + q.total, 0);
  const averageAccuracy = totalPossiblePoints > 0 ? Math.round((totalScorePoints / totalPossiblePoints) * 100) : 0;

  // Determine Level Title
  let levelTitle = t[language].levelNovice;
  let levelColor = 'text-cyan-400';
  let levelProgress = 25;

  if (progress.problemsSolvedCount >= 15 || topicsCompletedCount >= 10) {
    levelTitle = t[language].levelMaster;
    levelColor = 'text-amber-400';
    levelProgress = 100;
  } else if (progress.problemsSolvedCount >= 8 || topicsCompletedCount >= 5) {
    levelTitle = t[language].levelExpert;
    levelColor = 'text-purple-400';
    levelProgress = 75;
  } else if (progress.problemsSolvedCount >= 3 || topicsCompletedCount >= 2) {
    levelTitle = t[language].levelApprentice;
    levelColor = 'text-emerald-400';
    levelProgress = 50;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>{language === 'uz' ? 'O‘quvchi ko‘rsatkichlari' : 'Академический прогресс'}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {t[language].progressTitle}
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          {t[language].progressSubtitle}
        </p>
      </div>

      {/* Main Level Mastery Banner */}
      <div
        className={`p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-indigo-950/40 border-cyan-500/30'
            : 'bg-white border-zinc-200 shadow-md'
        }`}
      >
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-black shadow-lg shadow-cyan-500/25 shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
              {t[language].levelMastery}
            </span>
            <h2 className={`text-2xl font-extrabold ${levelColor}`}>
              {levelTitle}
            </h2>
            <p className="text-xs text-zinc-400">
              {language === 'uz'
                ? `Muntazam mashqlar va testlar orqali darajangizni oshirib boring.`
                : 'Повышайте уровень, решая задачи и проходя тесты.'}
            </p>
          </div>
        </div>

        {/* Streak & Accuracy Badges */}
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <Flame className="w-7 h-7 text-amber-400 animate-pulse" />
            <div>
              <div className="text-xl font-bold font-mono text-zinc-100">
                {progress.streak} {language === 'uz' ? 'kun' : 'дней'}
              </div>
              <div className="text-[11px] text-zinc-400">{t[language].streak}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <Zap className="w-7 h-7 text-cyan-400" />
            <div>
              <div className="text-xl font-bold font-mono text-cyan-400">
                {averageAccuracy}%
              </div>
              <div className="text-[11px] text-zinc-400">{t[language].quizAccuracy}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Topics */}
        <div
          className={`p-6 rounded-3xl border space-y-3 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>{t[language].completedTopics}</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-zinc-100">
            {topicsCompletedCount} / {totalTopics}
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${topicsPercent}%` }}
            />
          </div>
        </div>

        {/* Problems Solved */}
        <div
          className={`p-6 rounded-3xl border space-y-3 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>{t[language].problemsSolved}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {progress.problemsSolvedCount}
          </div>
          <div className="text-[11px] text-zinc-500">
            {language === 'uz' ? 'Mustaqil yechilgan masalalar' : 'Успешно решенных задач'}
          </div>
        </div>

        {/* Calculators Used */}
        <div
          className={`p-6 rounded-3xl border space-y-3 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>{language === 'uz' ? 'Hisob-kitoblar' : 'Расчетов выполнено'}</span>
            <Calculator className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-indigo-400">
            {progress.calculatorsUsed}
          </div>
          <div className="text-[11px] text-zinc-500">
            {language === 'uz' ? 'Kalkulyator yordamida' : 'С помощью калькуляторов'}
          </div>
        </div>

        {/* Favorites */}
        <div
          className={`p-6 rounded-3xl border space-y-3 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>{t[language].navFavorites}</span>
            <Sigma className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-400">
            {progress.favoriteFormulaIds.length + progress.favoriteTopicIds.length}
          </div>
          <div className="text-[11px] text-zinc-500">
            {language === 'uz' ? 'Saqlangan formulalar va mavzular' : 'Закладок в избранном'}
          </div>
        </div>
      </div>

      {/* Recent Quiz Attempts Log */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
          isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200'
        }`}
      >
        <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>{language === 'uz' ? 'So‘nggi test natijalari' : 'История тестирования'}</span>
        </h3>

        {quizScores.length === 0 ? (
          <div className="p-6 text-center text-xs text-zinc-500">
            {language === 'uz'
              ? 'Hali testlar topshirilmagan. "Testlar" bo‘limiga o‘tib bilimingizni sinab ko‘ring!'
              : 'Тесты еще не пройдены. Перейдите в раздел "Тесты" для проверки знаний!'}
          </div>
        ) : (
          <div className="space-y-2">
            {quizScores.slice(-5).reverse().map((qs, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-cyan-400 uppercase font-semibold">
                    {qs.difficulty}
                  </span>
                  <span className="text-zinc-400">{qs.date}</span>
                </div>
                <div className="font-mono font-bold text-emerald-400">
                  {qs.score} / {qs.total} ({qs.percentage}%)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
