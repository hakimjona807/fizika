import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Sigma,
  Calculator,
  Compass,
  LineChart,
  BrainCircuit,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Atom,
  Gamepad2
} from 'lucide-react';
import { Language, Theme } from '../types';
import { t } from '../data/translations';
import { HeroVisualizer } from '../components/HeroVisualizer';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  animations: boolean;
  onNavigate: (section: string) => void;
}

export const HomePage: React.FC<Props> = ({ language, theme, animations, onNavigate }) => {
  const isDark = theme === 'dark';

  const stats = [
    { value: '16', label: t[language].statTopics, icon: BookOpen, color: 'text-cyan-400' },
    { value: '50+', label: t[language].statFormulas, icon: Sigma, color: 'text-indigo-400' },
    { value: '20+', label: t[language].statCalculators, icon: Calculator, color: 'text-emerald-400' },
    { value: '100+', label: t[language].statProblems, icon: CheckCircle2, color: 'text-amber-400' },
  ];

  const features = [
    {
      id: 'topics',
      titleUz: '16 ta Fizika Bo‘limi',
      titleRu: '16 Разделов Физики',
      descUz: 'Mexanikadan tortib kvant va yadro fizikasigacha chuqur, tushunarli nazariya va ta\'riflar.',
      descRu: 'От механики и оптики до квантовой физики: ясная теория, определения и формулы.',
      icon: BookOpen,
      gradient: 'from-cyan-500/10 to-blue-500/10',
      border: 'border-cyan-500/20',
      iconColor: 'text-cyan-400',
    },
    {
      id: 'calculator',
      titleUz: 'Interaktiv Kalkulyatorlar',
      titleRu: 'Физические Калькуляторы',
      descUz: 'Real vaqtda bosqichma-bosqich hisoblash, birliklarni tekshirish va formulalar ko\'rsatgichi.',
      descRu: 'Мгновенный пошаговый расчет с автоматической подстановкой единиц СИ.',
      icon: Calculator,
      gradient: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      id: 'solver',
      titleUz: 'Aqlli Masala Yechuvchi',
      titleRu: 'Решатель Задач',
      descUz: 'Berilgan, Topish kerak, Formula va yakuniy javobni to\'liq tahlil qilib beradi.',
      descRu: 'Полный разбор: Дано, Найти, Формула, Вычисления и подробное физическое объяснение.',
      icon: BrainCircuit,
      gradient: 'from-purple-500/10 to-indigo-500/10',
      border: 'border-purple-500/20',
      iconColor: 'text-purple-400',
    },
    {
      id: 'lab',
      titleUz: 'Virtual Laboratoriya',
      titleRu: 'Виртуальная Лаборатория',
      descUz: 'Erkin tushish, gorizontal otish, Nyuton qonunlari va Om elektr zanjiri jonli simulyatsiyasi.',
      descRu: 'Интерактивные физические опыты: броски, свободное падение и электрические цепи.',
      icon: Compass,
      gradient: 'from-amber-500/10 to-orange-500/10',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-400',
    },
    {
      id: 'graph',
      titleUz: 'Dinamik Grafiklar',
      titleRu: 'Интерактивные Графики',
      descUz: 'Parametrlarni o\'zgartiring va fizik bog\'liqliklarni koordinata tekisligida ko\'ring.',
      descRu: 'Живые графики s(t), v(t), F(m), I(U) с возможностью масштабирования и подсказками.',
      icon: LineChart,
      gradient: 'from-rose-500/10 to-pink-500/10',
      border: 'border-rose-500/20',
      iconColor: 'text-rose-400',
    },
    {
      id: 'games',
      titleUz: 'Fizika O‘yinlari',
      titleRu: 'Игры по Физике',
      descUz: 'Formulalar juftligi, koinotga qo‘nish va zanjir yig‘ish mini-o‘yinlari orqali qiziqarli o‘rganish.',
      descRu: 'Интерактивные мини-игры: лунная посадка, пары формул и сборка электрических цепей.',
      icon: Gamepad2,
      gradient: 'from-amber-500/10 to-rose-500/10',
      border: 'border-rose-500/20',
      iconColor: 'text-rose-400',
    },
    {
      id: 'ai-tutor',
      titleUz: 'AI Fizika Repetitori',
      titleRu: 'AI Репетитор по Физике',
      descUz: 'Murakkab qonunlarni oddiy misollar orqali, bosqichma-bosqich tushuntirib beruvchi yordamchi.',
      descRu: 'Умный помощник для ответа на любые вопросы по физике с живыми жизненными примерами.',
      icon: Sparkles,
      gradient: 'from-sky-500/10 to-indigo-500/10',
      border: 'border-sky-500/20',
      iconColor: 'text-sky-400',
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Atom className="w-4 h-4 animate-spin" />
                <span>{language === 'uz' ? 'Zamonaviy Ilmiy Ta’lim Portali' : 'Современный Образовательный Портал'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                {t[language].tagline}{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  FizikaLab
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed">
                {t[language].subtagline}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigate('topics');
                  }}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer"
                >
                  <span>{t[language].heroStartBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigate('solver');
                  }}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-100 font-semibold text-sm transition-all active:scale-95 cursor-pointer"
                >
                  <span>{t[language].heroSolveBtn}</span>
                  <BrainCircuit className="w-4 h-4 text-purple-400" />
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onNavigate('lab');
                  }}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-zinc-400 hover:text-zinc-100 font-medium text-sm transition-all"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>{t[language].heroLabBtn}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'uz' ? '100% Aniq Hisob' : '100% Точный расчет'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'uz' ? 'Xalqaro SI Tizimi' : 'Система единиц СИ'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'uz' ? 'Oflayn Ishlash' : 'Работает офлайн'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Physics Visualizer */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroVisualizer language={language} theme={theme} animations={animations} />
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl border ${
          isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-center gap-4 p-2">
                <div className={`p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-zinc-100">
                    {s.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'uz' ? 'Platforma Imkoniyatlari' : 'Возможности платформы'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'uz' ? 'Fizikani Qulay va Jonli O‘rganing' : 'Изучайте физику наглядно и глубоко'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            {language === 'uz'
              ? 'Nazariya, formulalar kutubxonasi, laboratoriya tajribalari va interaktiv grafiklar bir platformada.'
              : 'Теория, библиотека формул, лабораторные опыты и интерактивные графики в одном месте.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => {
                  soundManager.playClick();
                  onNavigate(feat.id);
                }}
                className={`group p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isDark
                    ? `bg-gradient-to-br ${feat.gradient} bg-zinc-900/40 hover:bg-zinc-800/80 border-zinc-800 hover:${feat.border}`
                    : 'bg-white hover:bg-zinc-50 border-zinc-200 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 ${feat.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                      <span>{t[language].details}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-zinc-100 group-hover:text-cyan-300 transition-colors">
                    {language === 'uz' ? feat.titleUz : feat.titleRu}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {language === 'uz' ? feat.descUz : feat.descRu}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Physics Principles Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-indigo-950/40 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-zinc-100 flex items-center justify-center md:justify-start gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              <span>{language === 'uz' ? 'Bugun o‘z bilimingizni sinab ko‘ring' : 'Проверьте свои знания прямо сейчас'}</span>
            </h3>
            <p className="text-sm text-zinc-400 max-w-xl">
              {language === 'uz'
                ? 'Testlar va mustaqil mashq bo\'limida haqiqiy fizik masalalarni yeching va yutuq ballarini to\'plang.'
                : 'Решайте задачи в разделах Тесты и Практика, зарабатывайте баллы и отслеживайте прогресс.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('quiz');
              }}
              className="px-6 py-3 rounded-2xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors shadow-md"
            >
              {t[language].navQuiz}
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('practice');
              }}
              className="px-6 py-3 rounded-2xl bg-zinc-800 text-zinc-100 font-semibold text-sm hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              {t[language].navPractice}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
