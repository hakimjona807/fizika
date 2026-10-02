import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Rocket,
  Zap,
  Sparkles,
  Trophy,
  RotateCcw,
  Play,
  Flame,
  CheckCircle2,
  XCircle,
  Timer as TimerIcon,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language, Theme } from '../types';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
}

export const GamesPage: React.FC<Props> = ({ language, theme }) => {
  const [activeGame, setActiveGame] = useState<'matcher' | 'lander' | 'circuit'>('matcher');

  // ==========================================
  // GAME 1: FORMULA MATCHER
  // ==========================================
  interface MatchCard {
    id: string;
    text: string;
    type: 'formula' | 'name';
    pairId: string;
  }

  const initialPairs = [
    { pairId: 'newton', formula: 'F = m · a', nameUz: 'Nyutonning II qonuni', nameRu: 'Второй закон Ньютона' },
    { pairId: 'ohm', formula: 'I = U / R', nameUz: 'Om qonuni', nameRu: 'Закон Ома' },
    { pairId: 'kinetic', formula: 'Ek = m·v² / 2', nameUz: 'Kinetik energiya', nameRu: 'Кинетическая энергия' },
    { pairId: 'einstein', formula: 'E = m · c²', nameUz: 'Massa va energiya', nameRu: 'Эквивалентность массы' },
    { pairId: 'momentum', formula: 'p = m · v', nameUz: 'Jism impulsi', nameRu: 'Импульс тела' },
    { pairId: 'potential', formula: 'Ep = m · g · h', nameUz: 'Potensial energiya', nameRu: 'Потенциальная энергия' },
  ];

  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState(0);
  const [matcherTime, setMatcherTime] = useState(0);
  const [matcherActive, setMatcherActive] = useState(false);

  const initMatcherGame = () => {
    soundManager.playClick();
    const generated: MatchCard[] = [];
    initialPairs.forEach((p) => {
      generated.push({ id: `f_${p.pairId}`, text: p.formula, type: 'formula', pairId: p.pairId });
      generated.push({
        id: `n_${p.pairId}`,
        text: language === 'uz' ? p.nameUz : p.nameRu,
        type: 'name',
        pairId: p.pairId,
      });
    });
    // Shuffle
    generated.sort(() => Math.random() - 0.5);
    setCards(generated);
    setSelectedCards([]);
    setMatchedPairs([]);
    setMatchScore(0);
    setMatcherTime(0);
    setMatcherActive(true);
  };

  useEffect(() => {
    if (activeGame === 'matcher' && cards.length === 0) {
      initMatcherGame();
    }
  }, [activeGame, language]);

  useEffect(() => {
    if (!matcherActive || matchedPairs.length === initialPairs.length) return;
    const interval = setInterval(() => {
      setMatcherTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [matcherActive, matchedPairs.length]);

  const handleCardClick = (card: MatchCard) => {
    if (matchedPairs.includes(card.pairId) || selectedCards.find((c) => c.id === card.id) || selectedCards.length >= 2) {
      return;
    }
    soundManager.playTick();
    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.pairId === second.pairId && first.type !== second.type) {
        // Matched!
        soundManager.playSuccess();
        setMatchedPairs((prev) => {
          const updated = [...prev, first.pairId];
          if (updated.length === initialPairs.length) {
            try {
              confetti({ particleCount: 90, spread: 70 });
            } catch {}
          }
          return updated;
        });
        setMatchScore((s) => s + 100);
        setSelectedCards([]);
      } else {
        // Mismatched
        soundManager.playError();
        setMatchScore((s) => Math.max(0, s - 10));
        setTimeout(() => setSelectedCards([]), 800);
      }
    }
  };

  // ==========================================
  // GAME 2: PLANETARY LUNAR LANDER
  // ==========================================
  const [landerPlanet, setLanderPlanet] = useState<{ nameUz: string; nameRu: string; g: number }>({
    nameUz: 'Oy (Moon)',
    nameRu: 'Луна',
    g: 1.62,
  });
  const [altitude, setAltitude] = useState<number>(100); // meters
  const [landerVelocity, setLanderVelocity] = useState<number>(0); // m/s downwards
  const [fuel, setFuel] = useState<number>(100); // %
  const [thrustActive, setThrustActive] = useState<boolean>(false);
  const [landerStatus, setLanderStatus] = useState<'idle' | 'flying' | 'landed' | 'crashed'>('idle');

  const startLander = () => {
    soundManager.playClick();
    setAltitude(100);
    setLanderVelocity(0);
    setFuel(100);
    setLanderStatus('flying');
    setThrustActive(false);
  };

  useEffect(() => {
    if (landerStatus !== 'flying') return;
    const interval = setInterval(() => {
      const dt = 0.05; // 50ms tick
      const thrustAccel = thrustActive && fuel > 0 ? 5.0 : 0;
      const netA = landerPlanet.g - thrustAccel;

      if (thrustActive && fuel > 0) {
        setFuel((f) => Math.max(0, f - 1.2));
      }

      setLanderVelocity((v) => v + netA * dt);
      setAltitude((alt) => {
        const nextAlt = alt - landerVelocity * dt;
        if (nextAlt <= 0) {
          // Touchdown
          if (Math.abs(landerVelocity) <= 3.5) {
            soundManager.playSuccess();
            setLanderStatus('landed');
            try {
              confetti({ particleCount: 80, spread: 60 });
            } catch {}
          } else {
            soundManager.playError();
            setLanderStatus('crashed');
          }
          return 0;
        }
        return nextAlt;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [landerStatus, thrustActive, fuel, landerVelocity, landerPlanet.g]);

  // ==========================================
  // GAME 3: CIRCUIT POWER CHALLENGE
  // ==========================================
  const [circuitTargetCurrent, setCircuitTargetCurrent] = useState<number>(3.0); // Target: 3.0 A
  const [circuitVoltage] = useState<number>(24); // 24 V
  const [circuitMode, setCircuitMode] = useState<'series' | 'parallel'>('series');
  const [r1, setR1] = useState<number>(4);
  const [r2, setR2] = useState<number>(4);
  const [circuitWon, setCircuitWon] = useState<boolean>(false);

  const calculateReq = () => {
    if (circuitMode === 'series') {
      return r1 + r2;
    } else {
      return (r1 * r2) / (r1 + r2);
    }
  };

  const currentReq = calculateReq();
  const actualCurrent = circuitVoltage / currentReq;
  const isTargetMatched = Math.abs(actualCurrent - circuitTargetCurrent) < 0.08;

  useEffect(() => {
    if (isTargetMatched && !circuitWon) {
      soundManager.playSuccess();
      setCircuitWon(true);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } else if (!isTargetMatched && circuitWon) {
      setCircuitWon(false);
    }
  }, [isTargetMatched]);

  const newCircuitTarget = () => {
    soundManager.playClick();
    const targets = [2.0, 2.4, 3.0, 4.0, 6.0];
    const pick = targets[Math.floor(Math.random() * targets.length)];
    setCircuitTargetCurrent(pick);
    setCircuitWon(false);
  };

  const isDark = theme === 'dark';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>{language === 'uz' ? 'Qiziqarli fizika o‘yinlari' : 'Физические мини-игры'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {language === 'uz' ? 'Fizika O‘yinlari Laboratoriyasi' : 'Игровая лаборатория физики'}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {language === 'uz'
              ? 'Qonuniyatlarni yodlash emas, o‘yin orqali jonli his qiling va yuqori ball to‘plang!'
              : 'Проверьте интуицию и физические законы в увлекательных интерактивных играх.'}
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 text-xs font-semibold">
          {[
            { id: 'matcher', label: language === 'uz' ? 'Formulalar juftligi' : 'Пары формул', icon: Sparkles },
            { id: 'lander', label: language === 'uz' ? 'Koinot qo‘nishi' : 'Лунная посадка', icon: Rocket },
            { id: 'circuit', label: language === 'uz' ? 'Zanjir ustasi' : 'Мастер цепей', icon: Zap },
          ].map((g) => {
            const Icon = g.icon;
            return (
              <button
                key={g.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveGame(g.id as typeof activeGame);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  activeGame === g.id
                    ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-950/40'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. FORMULA MATCHER GAME */}
      {/* ======================================================== */}
      {activeGame === 'matcher' && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
          }`}
        >
          {/* Header Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <span>{language === 'uz' ? 'Formulalar va Qonunlar Mosligi' : 'Найди пару: Формула и Закон'}</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {language === 'uz'
                  ? 'Formulani uning tegishli nomi bilan juftlab bosing.'
                  : 'Кликайте по формуле и её правильному названию, чтобы найти пару.'}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-amber-400 flex items-center gap-1.5 font-bold">
                <TimerIcon className="w-3.5 h-3.5" />
                <span>{matcherTime}s</span>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center gap-1.5 font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>{matchScore} ball</span>
              </div>

              <button
                onClick={initMatcherGame}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300"
                title="Qaytadan boshlash"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {cards.map((card) => {
              const isMatched = matchedPairs.includes(card.pairId);
              const isSelected = selectedCards.find((c) => c.id === card.id);

              let style = 'bg-zinc-850 hover:bg-zinc-800 border-zinc-700/80 text-zinc-200';
              if (isMatched) {
                style = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold opacity-60 cursor-default';
              } else if (isSelected) {
                style = 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-950/30 scale-102';
              }

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleCardClick(card)}
                  className={`min-h-[100px] p-4 rounded-2xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer ${style}`}
                >
                  <span className={card.type === 'formula' ? 'font-mono text-base font-bold text-cyan-300' : 'text-xs font-semibold'}>
                    {card.text}
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-1 uppercase font-mono">
                    {card.type === 'formula' ? (language === 'uz' ? 'Formula' : 'Формула') : (language === 'uz' ? 'Qonun' : 'Закон')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Winning Banner */}
          {matchedPairs.length === initialPairs.length && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-cyan-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in duration-300">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-xl font-extrabold text-zinc-100">
                {language === 'uz' ? 'Tabriklaymiz! Barcha juftliklar topildi!' : 'Поздравляем! Все пары собраны!'}
              </h3>
              <p className="text-xs text-zinc-400">
                {language === 'uz' ? `Vaqt: ${matcherTime}s | Yakuniy ball: ${matchScore}` : `Время: ${matcherTime}с | Счет: ${matchScore}`}
              </p>
              <button
                onClick={initMatcherGame}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md"
              >
                {language === 'uz' ? 'Yana o‘ynash' : 'Играть снова'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PLANETARY LUNAR LANDER */}
      {/* ======================================================== */}
      {activeGame === 'lander' && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-amber-400" />
                <span>{language === 'uz' ? 'Koinot Modulini Xavfsiz Qo‘ndirish' : 'Гравитационная посадка модуля'}</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {language === 'uz'
                  ? 'Reaktiv dvigatel yordamida tezlikni kamaytiring (|v| ≤ 3.5 m/s) va xavfsiz qo‘ning!'
                  : 'Включайте тормозные двигатели, чтобы скорость при касании была не более 3.5 м/с.'}
              </p>
            </div>

            {/* Planet Selector */}
            <div className="flex items-center gap-1.5">
              {[
                { nameUz: 'Oy', nameRu: 'Луна', g: 1.62 },
                { nameUz: 'Mars', nameRu: 'Марс', g: 3.71 },
                { nameUz: 'Yer', nameRu: 'Земля', g: 9.8 },
              ].map((p) => (
                <button
                  key={p.nameUz}
                  onClick={() => {
                    soundManager.playClick();
                    setLanderPlanet(p);
                    setLanderStatus('idle');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                    landerPlanet.g === p.g
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {language === 'uz' ? p.nameUz : p.nameRu} (g={p.g})
                </button>
              ))}
            </div>
          </div>

          {/* Lander Simulation Arena */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 relative h-[360px] rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between p-6">
              {/* Stars texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

              {/* Altitude indicator line */}
              <div className="absolute left-6 top-6 bottom-12 w-1 bg-zinc-800 flex flex-col justify-between py-1 text-[10px] font-mono text-zinc-500">
                <span>100m</span>
                <span>50m</span>
                <span>0m</span>
              </div>

              {/* Lander Capsule Model */}
              <div
                className="relative ml-16 w-16 flex flex-col items-center transition-all duration-75"
                style={{
                  top: `${Math.min(240, ((100 - altitude) / 100) * 240)}px`,
                }}
              >
                <div className="w-12 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-xl flex items-center justify-center font-bold text-black text-xs">
                  🚀
                </div>
                {/* Thrust flame */}
                {thrustActive && fuel > 0 && landerStatus === 'flying' && (
                  <div className="w-4 h-6 bg-gradient-to-b from-amber-400 via-rose-500 to-transparent rounded-full animate-pulse -mt-1 shadow-[0_0_15px_#f59e0b]" />
                )}
              </div>

              {/* Target landing pad */}
              <div className="relative w-full flex justify-center">
                <div className="w-48 h-3 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 shadow-[0_0_15px_#22d3ee] flex items-center justify-center text-[9px] font-mono font-bold text-black">
                  LANDING ZONE
                </div>
              </div>
            </div>

            {/* Controls & Instrument Cockpit */}
            <div className="md:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">{language === 'uz' ? 'Balandlik' : 'Высота'}:</span>
                  <span className="text-base font-bold text-cyan-400">{altitude.toFixed(1)} m</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">{language === 'uz' ? 'Tezlik' : 'Скорость'}:</span>
                  <span className={`text-base font-bold ${Math.abs(landerVelocity) > 3.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {landerVelocity.toFixed(1)} m/s
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">{language === 'uz' ? 'Xavfsiz chegara' : 'Предел'}:</span>
                  <span className="text-zinc-500">≤ 3.5 m/s</span>
                </div>

                {/* Fuel Gauge */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">{language === 'uz' ? 'Yoqilg‘i' : 'Топливо'}:</span>
                    <span className="text-amber-400 font-bold">{fuel.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${fuel}%` }} />
                  </div>
                </div>
              </div>

              {/* Flight Status message */}
              {landerStatus === 'landed' && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold text-xs text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'uz' ? 'Ajoyib! Xavfsiz qo‘nish amalga oshirildi!' : 'Успешная мягкая посадка!'}</span>
                </div>
              )}
              {landerStatus === 'crashed' && (
                <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-300 font-bold text-xs text-center flex items-center justify-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>{language === 'uz' ? 'Halokat! Tezlik juda yuqori edi.' : 'Крушение! Скорость превысила норму.'}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                {landerStatus !== 'flying' ? (
                  <button
                    onClick={startLander}
                    className="w-full py-3.5 rounded-2xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>{language === 'uz' ? 'Parvozni Boshlash' : 'Начать полет'}</span>
                  </button>
                ) : (
                  <button
                    onMouseDown={() => setThrustActive(true)}
                    onMouseUp={() => setThrustActive(false)}
                    onTouchStart={() => setThrustActive(true)}
                    onTouchEnd={() => setThrustActive(false)}
                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 select-none ${
                      thrustActive
                        ? 'bg-amber-400 text-black shadow-amber-500/50 scale-102'
                        : 'bg-zinc-800 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    <Flame className="w-5 h-5 animate-pulse" />
                    <span>{language === 'uz' ? 'Dvigatelni Bosib Turing (Thrust)' : 'Удерживайте тягу (Thrust)'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CIRCUIT POWER CHALLENGE */}
      {/* ======================================================== */}
      {activeGame === 'circuit' && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
            isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                <span>{language === 'uz' ? 'Elektr Zanjiri Qidiruvi' : 'Мастер электрических цепей'}</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {language === 'uz'
                  ? 'Qarshiliklarni ketma-ket yoki parallel ulab, kerakli tok kuchiga erishing!'
                  : 'Подбирайте конфигурацию резисторов, чтобы получить целевой ток.'}
              </p>
            </div>

            <button
              onClick={newCircuitTarget}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'uz' ? 'Yangi topshiriq' : 'Новая цель'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Circuit Schema View */}
            <div className="md:col-span-7 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
              {/* Target Goal Banner */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 border border-zinc-700">
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">
                    {language === 'uz' ? 'Maqsadli tok kuchi' : 'Целевой ток'}:
                  </span>
                  <div className="text-2xl font-extrabold font-mono text-amber-400">
                    I_maqsad = {circuitTargetCurrent.toFixed(1)} A
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">
                    {language === 'uz' ? 'Zanjirdagi haqiqiy tok' : 'Текущий ток'}:
                  </span>
                  <div className={`text-2xl font-extrabold font-mono ${isTargetMatched ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'}`}>
                    I = {actualCurrent.toFixed(2)} A
                  </div>
                </div>
              </div>

              {/* Visual circuit components */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center font-mono space-y-2">
                <div className="text-xs text-zinc-400">
                  U = 24 V | Req = {currentReq.toFixed(2)} Ω | P = {(circuitVoltage * actualCurrent).toFixed(1)} W
                </div>
                <div className="text-sm font-bold text-indigo-300">
                  {circuitMode === 'series'
                    ? `Ketma-ket: Req = R1 + R2 = ${r1} + ${r2} = ${r1 + r2} Ω`
                    : `Parallel: Req = (R1·R2)/(R1+R2) = (${r1}·${r2})/(${r1}+${r2}) = ${((r1 * r2) / (r1 + r2)).toFixed(2)} Ω`}
                </div>
              </div>

              {circuitWon && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{language === 'uz' ? 'To‘g‘ri! Zanjir stansiyasi to‘liq quvvat bilan yondi!' : 'В точку! Станция успешно запитана!'}</span>
                </div>
              )}
            </div>

            {/* Right: Controls for R1, R2, and Connection Mode */}
            <div className="md:col-span-5 space-y-5">
              {/* Connection Mode Switch */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  {language === 'uz' ? 'Ulanish turi:' : 'Тип соединения:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setCircuitMode('series');
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      circuitMode === 'series'
                        ? 'bg-indigo-500 text-white border-indigo-400 shadow-md'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    {language === 'uz' ? 'Ketma-ket' : 'Последовательно'}
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setCircuitMode('parallel');
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      circuitMode === 'parallel'
                        ? 'bg-indigo-500 text-white border-indigo-400 shadow-md'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    {language === 'uz' ? 'Parallel' : 'Параллельно'}
                  </button>
                </div>
              </div>

              {/* R1 Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span>Rezistor R1</span>
                  <span className="font-mono text-cyan-400">{r1} Ω</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={r1}
                  onChange={(e) => setR1(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* R2 Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span>Rezistor R2</span>
                  <span className="font-mono text-cyan-400">{r2} Ω</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={r2}
                  onChange={(e) => setR2(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
