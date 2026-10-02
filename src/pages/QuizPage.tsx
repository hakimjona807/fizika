import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Timer as TimerIcon,
  Zap,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Language, Theme } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  onQuizCompleted?: (score: number, total: number, diff: string) => void;
}

export const QuizPage: React.FC<Props> = ({ language, theme, onQuizCompleted }) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer option (can be enabled or disabled)
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  const questions = QUIZ_QUESTIONS.filter((q) => q.difficulty === difficulty);
  const currentQ = questions[currentIdx] || questions[0];

  useEffect(() => {
    if (!timerEnabled || isAnswered || quizFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerEnabled, isAnswered, quizFinished, timeLeft]);

  const handleTimeOut = () => {
    soundManager.playError();
    setIsAnswered(true);
    setSelectedOption(-1); // timed out without answer
  };

  const handleSelectDifficulty = (diff: 'easy' | 'medium' | 'hard') => {
    soundManager.playClick();
    setDifficulty(diff);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(30);
  };

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQ.correctAnswer;
    if (isCorrect) {
      soundManager.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      if (onQuizCompleted) {
        onQuizCompleted(score, questions.length, difficulty);
      }
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(30);
  };

  const isDark = theme === 'dark';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>{language === 'uz' ? 'Bilimni mustahkamlash' : 'Проверка знаний'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {t[language].quizTitle}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {t[language].quizSubtitle}
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center p-1 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 text-xs font-semibold">
          {[
            { id: 'easy', label: t[language].easy },
            { id: 'medium', label: t[language].medium },
            { id: 'hard', label: t[language].hard },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelectDifficulty(d.id as typeof difficulty)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                difficulty === d.id
                  ? 'bg-cyan-500 text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quiz Window */}
      {!quizFinished ? (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          }`}
        >
          {/* Progress & Timer Top Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs font-mono font-semibold text-zinc-400">
              {t[language].question}{' '}
              <span className="text-cyan-400 font-bold">{currentIdx + 1}</span>{' '}
              {t[language].of} {questions.length}
            </div>

            <div className="flex items-center gap-3">
              {/* Score indicator */}
              <div className="text-xs font-mono text-zinc-300">
                {t[language].score}:{' '}
                <span className="text-emerald-400 font-bold">{score}</span>
              </div>

              {/* Timer Toggle */}
              <button
                onClick={() => setTimerEnabled(!timerEnabled)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-mono font-bold transition-all ${
                  timerEnabled
                    ? 'bg-zinc-800 border-zinc-700 text-amber-400'
                    : 'bg-zinc-850 border-zinc-800 text-zinc-500'
                }`}
                title={language === 'uz' ? 'Taymerni yoqish/o‘chirish' : 'Вкл/выкл таймер'}
              >
                <TimerIcon className="w-3.5 h-3.5" />
                <span>{timerEnabled ? `${timeLeft}s` : 'Off'}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
              {language === 'uz' ? currentQ.categoryUz : currentQ.categoryRu}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 leading-snug">
              {language === 'uz' ? currentQ.questionUz : currentQ.questionRu}
            </h2>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {(language === 'uz' ? currentQ.optionsUz : currentQ.optionsRu)?.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = currentQ.correctAnswer === idx;

              let btnStyles = 'bg-zinc-800/40 border-zinc-700/60 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyles = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyles = 'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold';
                } else {
                  btnStyles = 'bg-zinc-900 border-zinc-800/60 text-zinc-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer ${btnStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-zinc-400 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Formula Explanation Card */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className={selectedOption === currentQ.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}>
                    {selectedOption === currentQ.correctAnswer
                      ? t[language].correct
                      : t[language].incorrect}
                  </span>
                </span>
                {currentQ.formula && (
                  <code className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700">
                    {currentQ.formula}
                  </code>
                )}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {language === 'uz' ? currentQ.explanationUz : currentQ.explanationRu}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <span>
                    {currentIdx + 1 < questions.length
                      ? language === 'uz'
                        ? 'Keyingi savol'
                        : 'Следующий вопрос'
                      : language === 'uz'
                      ? 'Natijalarni ko‘rish'
                      : 'Посмотреть результаты'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div
          className={`p-8 rounded-3xl border text-center space-y-6 ${
            isDark ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-black mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              {t[language].quizComplete}
            </h2>
            <p className="text-sm text-zinc-400">
              {difficulty.toUpperCase()} {language === 'uz' ? 'darajadagi barcha savollar yakunlandi' : 'уровень успешно пройден'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 inline-block">
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-400">
              {score} / {questions.length}
            </div>
            <div className="text-xs font-mono text-zinc-400 mt-2">
              {((score / (questions.length || 1)) * 100).toFixed(0)}% {language === 'uz' ? 'aniqlik darajasi' : 'точность'}
            </div>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t[language].restartQuiz}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
