import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Activity,
  Zap,
  ArrowDownCircle,
  Lightbulb,
  Gauge
} from 'lucide-react';
import { Language, Theme } from '../types';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  animations: boolean;
}

export const VirtualLabPage: React.FC<Props> = ({ language, theme, animations }) => {
  const [activeSim, setActiveSim] = useState<'free_fall' | 'projectile' | 'newton' | 'ohm'>('free_fall');
  const [isRunning, setIsRunning] = useState(false);

  // Simulation 1: Free Fall state
  const [ffHeight, setFfHeight] = useState<number>(45); // m
  const [ffGravity, setFfGravity] = useState<number>(9.8); // m/s²
  const [ffV0, setFfV0] = useState<number>(0); // m/s
  const [ffTime, setFfTime] = useState<number>(0); // current elapsed s

  // Simulation 2: Projectile Motion state
  const [pmV0, setPmV0] = useState<number>(25); // m/s
  const [pmAngle, setPmAngle] = useState<number>(45); // degrees
  const [pmGravity, setPmGravity] = useState<number>(9.8); // m/s²
  const [pmTime, setPmTime] = useState<number>(0);

  // Simulation 3: Newton & Friction state
  const [nMass, setNMass] = useState<number>(5); // kg
  const [nForce, setNForce] = useState<number>(30); // N
  const [nFrictionCoeff, setNFrictionCoeff] = useState<number>(0.2); // μ
  const [nPos, setNPos] = useState<number>(0); // px
  const [nVelocity, setNVelocity] = useState<number>(0);

  // Simulation 4: Ohm Circuit state
  const [ohmVoltage, setOhmVoltage] = useState<number>(12); // V
  const [ohmResistance, setOhmResistance] = useState<number>(6); // Ω
  const [circuitClosed, setCircuitClosed] = useState<boolean>(true);

  // Animation frame loop
  useEffect(() => {
    let animId: number;
    let lastStamp = performance.now();

    const loop = (stamp: number) => {
      const dt = Math.min((stamp - lastStamp) / 1000, 0.05); // cap dt
      lastStamp = stamp;

      if (isRunning && animations) {
        // Free fall physics
        if (activeSim === 'free_fall') {
          setFfTime((prevT) => {
            const nextT = prevT + dt;
            const currentDist = ffV0 * nextT + 0.5 * ffGravity * Math.pow(nextT, 2);
            if (currentDist >= ffHeight) {
              soundManager.playTick();
              setIsRunning(false);
              return Math.sqrt((2 * ffHeight) / ffGravity);
            }
            return nextT;
          });
        }

        // Projectile motion physics
        if (activeSim === 'projectile') {
          const rad = (pmAngle * Math.PI) / 180;
          const totalFlightTime = (2 * pmV0 * Math.sin(rad)) / pmGravity;
          setPmTime((prevT) => {
            const nextT = prevT + dt;
            if (nextT >= totalFlightTime) {
              soundManager.playTick();
              setIsRunning(false);
              return totalFlightTime;
            }
            return nextT;
          });
        }

        // Newton law sliding physics
        if (activeSim === 'newton') {
          const normalForce = nMass * 9.8;
          const frictionForce = nFrictionCoeff * normalForce;
          const netForce = Math.max(0, nForce - frictionForce);
          const accel = netForce / nMass;

          setNVelocity((prevV) => prevV + accel * dt);
          setNPos((prevX) => {
            const nextX = prevX + nVelocity * dt * 25;
            if (nextX > 400) {
              setIsRunning(false);
              return 400;
            }
            return nextX;
          });
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [
    isRunning,
    animations,
    activeSim,
    ffHeight,
    ffGravity,
    ffV0,
    pmAngle,
    pmGravity,
    pmV0,
    nForce,
    nFrictionCoeff,
    nMass,
    nVelocity,
  ]);

  const handleToggleRun = () => {
    soundManager.playClick();
    setIsRunning(!isRunning);
  };

  const handleResetSim = () => {
    soundManager.playClick();
    setIsRunning(false);
    setFfTime(0);
    setPmTime(0);
    setNPos(0);
    setNVelocity(0);
  };

  const isDark = theme === 'dark';

  // Calculations for Free Fall
  const ffCurrentDistance = Math.min(ffHeight, ffV0 * ffTime + 0.5 * ffGravity * Math.pow(ffTime, 2));
  const ffCurrentVelocity = ffV0 + ffGravity * ffTime;

  // Calculations for Projectile
  const pmRad = (pmAngle * Math.PI) / 180;
  const pmTotalFlightTime = (2 * pmV0 * Math.sin(pmRad)) / pmGravity;
  const pmMaxHeight = Math.pow(pmV0 * Math.sin(pmRad), 2) / (2 * pmGravity);
  const pmRange = (Math.pow(pmV0, 2) * Math.sin(2 * pmRad)) / pmGravity;
  const pmCurrentX = pmV0 * Math.cos(pmRad) * pmTime;
  const pmCurrentY = Math.max(0, pmV0 * Math.sin(pmRad) * pmTime - 0.5 * pmGravity * Math.pow(pmTime, 2));

  // Calculations for Ohm Circuit
  const ohmCurrent = circuitClosed ? ohmVoltage / ohmResistance : 0;
  const ohmPower = circuitClosed ? ohmVoltage * ohmCurrent : 0;
  const bulbBrightness = circuitClosed ? Math.min(1, ohmPower / 30) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>{language === 'uz' ? 'Virtual tajribalar' : 'Виртуальные эксперименты'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {t[language].labTitle}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {t[language].labSubtitle}
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleRun}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-md active:scale-95 ${
              isRunning
                ? 'bg-amber-500 text-black shadow-amber-500/25'
                : 'bg-emerald-500 text-black shadow-emerald-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>{t[language].pauseSim}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" />
                <span>{t[language].startSim}</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetSim}
            className="p-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300"
            title={t[language].resetSim}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'free_fall', label: t[language].simFreeFall },
          { id: 'projectile', label: t[language].simProjectile },
          { id: 'newton', label: t[language].simNewton },
          { id: 'ohm', label: t[language].simOhm },
        ].map((sim) => (
          <button
            key={sim.id}
            onClick={() => {
              soundManager.playClick();
              setActiveSim(sim.id as typeof activeSim);
              handleResetSim();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSim === sim.id
                ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                : 'bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {sim.label}
          </button>
        ))}
      </div>

      {/* Main Simulation Viewport & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Canvas / Visual Display */}
        <div className="lg:col-span-8">
          <div
            className={`relative min-h-[420px] rounded-3xl p-6 border overflow-hidden flex flex-col justify-between ${
              isDark
                ? 'bg-zinc-950/80 border-zinc-800/90 shadow-2xl'
                : 'bg-zinc-100 border-zinc-300 shadow-inner'
            }`}
          >
            {/* Grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

            {/* SIMULATION 1: FREE FALL */}
            {activeSim === 'free_fall' && (
              <div className="relative w-full h-[360px] flex items-center justify-between px-8 sm:px-16">
                {/* Metric scale bar */}
                <div className="h-[300px] w-14 border-r-2 border-zinc-700 flex flex-col justify-between py-1 font-mono text-[11px] text-zinc-400">
                  <span>{ffHeight} m</span>
                  <span>{(ffHeight * 0.75).toFixed(1)} m</span>
                  <span>{(ffHeight * 0.5).toFixed(1)} m</span>
                  <span>{(ffHeight * 0.25).toFixed(1)} m</span>
                  <span>0 m (Yer)</span>
                </div>

                {/* Dropping object */}
                <div className="relative w-40 h-[300px] flex justify-center">
                  {/* Ground plate */}
                  <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-full shadow-[0_0_15px_#f59e0b]" />

                  {/* Mass Ball */}
                  <div
                    className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)] flex items-center justify-center font-bold text-xs text-white"
                    style={{
                      top: `${Math.min((ffCurrentDistance / ffHeight) * 268, 268)}px`,
                    }}
                  >
                    m
                  </div>
                </div>

                {/* Telemetry Dashboard */}
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2.5 shadow-xl">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    <span>{language === 'uz' ? 'Jonli telemetriya' : 'Телеметрия'}</span>
                  </div>
                  <div>
                    {t[language].time}:{' '}
                    <span className="text-white font-bold">{ffTime.toFixed(2)} s</span>
                  </div>
                  <div>
                    {t[language].velocity}:{' '}
                    <span className="text-cyan-400 font-bold">{ffCurrentVelocity.toFixed(1)} m/s</span>
                  </div>
                  <div>
                    {language === 'uz' ? 'Tushgan yo‘li' : 'Пройдено'}:{' '}
                    <span className="text-emerald-400 font-bold">{ffCurrentDistance.toFixed(1)} m</span>
                  </div>
                  <div>
                    {language === 'uz' ? 'Qolgan balandlik' : 'Высота'}:{' '}
                    <span className="text-amber-400 font-bold">
                      {(ffHeight - ffCurrentDistance).toFixed(1)} m
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATION 2: PROJECTILE MOTION */}
            {activeSim === 'projectile' && (
              <div className="relative w-full h-[360px] flex flex-col justify-between">
                {/* SVG Canvas for Trajectory Arc */}
                <svg viewBox="0 0 500 260" className="w-full h-[260px] overflow-visible">
                  {/* Axes */}
                  <line x1="30" y1="230" x2="480" y2="230" stroke="#52525b" strokeWidth="2" />
                  <line x1="30" y1="230" x2="30" y2="20" stroke="#52525b" strokeWidth="2" />

                  {/* Theoretical Trajectory Path */}
                  <path
                    d={Array.from({ length: 60 }).reduce<string>((acc, _, idx) => {
                      const tFrac = idx / 59;
                      const simT = tFrac * pmTotalFlightTime;
                      const simX = pmV0 * Math.cos(pmRad) * simT;
                      const simY = pmV0 * Math.sin(pmRad) * simT - 0.5 * pmGravity * Math.pow(simT, 2);

                      const px = 30 + (simX / (pmRange || 1)) * 430;
                      const py = 230 - (simY / (pmMaxHeight * 1.2 || 1)) * 190;
                      return idx === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
                    }, '')}
                    fill="none"
                    stroke="#38bdf8"
                    strokeDasharray="4,4"
                    strokeWidth="2"
                    opacity="0.6"
                  />

                  {/* Current Projectile Ball Position */}
                  {(() => {
                    const px = 30 + (pmCurrentX / (pmRange || 1)) * 430;
                    const py = 230 - (pmCurrentY / (pmMaxHeight * 1.2 || 1)) * 190;
                    return (
                      <g>
                        <circle cx={px} cy={py} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                        <line x1={px} y1={py} x2={px} y2="230" stroke="#f59e0b" strokeDasharray="2,2" />
                      </g>
                    );
                  })()}
                </svg>

                {/* Telemetry Footer */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-zinc-300 bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800">
                  <div>
                    <span className="text-zinc-500 block">t (Vaqt):</span>
                    <span className="text-white font-bold">{pmTime.toFixed(2)} s</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">t_jami:</span>
                    <span className="text-cyan-400 font-bold">{pmTotalFlightTime.toFixed(2)} s</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">H_max:</span>
                    <span className="text-emerald-400 font-bold">{pmMaxHeight.toFixed(1)} m</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">L_uchish:</span>
                    <span className="text-amber-400 font-bold">{pmRange.toFixed(1)} m</span>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATION 3: NEWTON & FRICTION */}
            {activeSim === 'newton' && (
              <div className="relative w-full h-[360px] flex flex-col justify-between">
                <div className="relative w-full h-[220px] flex items-end">
                  {/* Sliding Surface */}
                  <div className="w-full h-3 bg-zinc-700 rounded-full" />

                  {/* Block Object */}
                  <div
                    className="absolute bottom-3 w-20 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 border border-cyan-400 shadow-xl flex flex-col items-center justify-center font-mono font-bold text-white transition-all duration-75"
                    style={{ left: `${20 + nPos}px` }}
                  >
                    <span>{nMass} kg</span>
                    <span className="text-[10px] text-cyan-200">v: {nVelocity.toFixed(1)}</span>
                  </div>

                  {/* Force Arrow Vector */}
                  <div
                    className="absolute bottom-11 flex items-center text-rose-400 font-bold font-mono text-xs transition-all duration-75"
                    style={{ left: `${105 + nPos}px` }}
                  >
                    <span>F = {nForce} N</span>
                    <span className="text-lg -ml-1">➔</span>
                  </div>
                </div>

                {/* Telemetry info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-zinc-300 bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800">
                  <div>
                    <span className="text-zinc-500 block">N (Normal):</span>
                    <span className="text-white font-bold">{(nMass * 9.8).toFixed(1)} N</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">F_ishq (μ·N):</span>
                    <span className="text-rose-400 font-bold">
                      {(nFrictionCoeff * nMass * 9.8).toFixed(1)} N
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">F_teng:</span>
                    <span className="text-cyan-400 font-bold">
                      {Math.max(0, nForce - nFrictionCoeff * nMass * 9.8).toFixed(1)} N
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Tezlanish (a):</span>
                    <span className="text-emerald-400 font-bold">
                      {(Math.max(0, nForce - nFrictionCoeff * nMass * 9.8) / nMass).toFixed(2)} m/s²
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATION 4: OHM CIRCUIT & LIGHT BULB */}
            {activeSim === 'ohm' && (
              <div className="relative w-full h-[360px] flex flex-col justify-between">
                <div className="relative w-full h-[260px] flex items-center justify-around">
                  {/* Battery Source */}
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col items-center gap-1 font-mono">
                    <span className="text-amber-400 font-bold text-sm">🔋 Manba</span>
                    <span className="text-xl font-extrabold text-white">{ohmVoltage} V</span>
                  </div>

                  {/* Schematic wires with animated current electrons */}
                  <div className="relative flex-1 h-2 bg-cyan-500/40 mx-4 overflow-hidden rounded">
                    {circuitClosed && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent w-full"
                        style={{
                          animation: `spin 1s linear infinite`,
                        }}
                      />
                    )}
                  </div>

                  {/* Resistor */}
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col items-center gap-1 font-mono">
                    <span className="text-indigo-400 font-bold text-sm">⚡ Rezistor</span>
                    <span className="text-xl font-extrabold text-white">{ohmResistance} Ω</span>
                  </div>

                  <div className="relative flex-1 h-2 bg-cyan-500/40 mx-4 overflow-hidden rounded" />

                  {/* Light Bulb */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="p-5 rounded-full transition-all duration-300 flex items-center justify-center"
                      style={{
                        backgroundColor: circuitClosed
                          ? `rgba(251, 191, 36, ${0.15 + bulbBrightness * 0.85})`
                          : 'rgba(39, 39, 42, 0.5)',
                        boxShadow: circuitClosed
                          ? `0 0 ${bulbBrightness * 45}px rgba(251, 191, 36, 0.9)`
                          : 'none',
                      }}
                    >
                      <Lightbulb
                        className={`w-10 h-10 ${
                          circuitClosed ? 'text-amber-300' : 'text-zinc-600'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-mono font-semibold text-zinc-300">
                      Lampochka ({circuitClosed ? `${(bulbBrightness * 100).toFixed(0)}%` : '0%'})
                    </span>
                  </div>
                </div>

                {/* Circuit Telemetry Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-zinc-300 bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800">
                  <div>
                    <span className="text-zinc-500 block">Kalit holati:</span>
                    <button
                      onClick={() => setCircuitClosed(!circuitClosed)}
                      className={`font-bold ${circuitClosed ? 'text-emerald-400' : 'text-rose-400'}`}
                    >
                      {circuitClosed ? '● Ulangan (Yoqiq)' : '○ Uzilgan'}
                    </button>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Tok kuchi (I = U/R):</span>
                    <span className="text-cyan-400 font-bold">{ohmCurrent.toFixed(2)} A</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Quvvat (P = U·I):</span>
                    <span className="text-amber-400 font-bold">{ohmPower.toFixed(1)} W</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Yorug‘lik:</span>
                    <span className="text-emerald-400 font-bold">
                      {(bulbBrightness * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sliders Controller Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div
            className={`p-6 rounded-3xl border transition-all space-y-6 ${
              isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sliders className="w-4 h-4" />
              <span>{language === 'uz' ? 'Tajriba Sozlamalari' : 'Параметры эксперимента'}</span>
            </div>

            {/* Sliders for Free Fall */}
            {activeSim === 'free_fall' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].height} (h)</span>
                    <span className="font-mono text-cyan-400">{ffHeight} m</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={ffHeight}
                    onChange={(e) => {
                      setFfHeight(parseFloat(e.target.value));
                      handleResetSim();
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].gravity}</span>
                    <span className="font-mono text-cyan-400">{ffGravity} m/s²</span>
                  </div>
                  {/* Planet Presets */}
                  <div className="flex gap-1.5 pt-1">
                    {[
                      { name: 'Yer', g: 9.8 },
                      { name: 'Oy', g: 1.62 },
                      { name: 'Mars', g: 3.71 },
                      { name: 'Yupiter', g: 24.79 },
                    ].map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          setFfGravity(p.g);
                          handleResetSim();
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono font-semibold ${
                          ffGravity === p.g
                            ? 'bg-amber-500 text-black'
                            : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {p.name} ({p.g})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{language === 'uz' ? 'Boshlang‘ich tezlik' : 'Начальная скорость'}</span>
                    <span className="font-mono text-cyan-400">{ffV0} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={ffV0}
                    onChange={(e) => {
                      setFfV0(parseFloat(e.target.value));
                      handleResetSim();
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Sliders for Projectile */}
            {activeSim === 'projectile' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].velocity} (v₀)</span>
                    <span className="font-mono text-cyan-400">{pmV0} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="1"
                    value={pmV0}
                    onChange={(e) => {
                      setPmV0(parseFloat(e.target.value));
                      handleResetSim();
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].angle} (θ)</span>
                    <span className="font-mono text-cyan-400">{pmAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    step="5"
                    value={pmAngle}
                    onChange={(e) => {
                      setPmAngle(parseFloat(e.target.value));
                      handleResetSim();
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Sliders for Newton */}
            {activeSim === 'newton' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].mass} (m)</span>
                    <span className="font-mono text-cyan-400">{nMass} kg</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={nMass}
                    onChange={(e) => {
                      setNMass(parseFloat(e.target.value));
                      handleResetSim();
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].force} (F)</span>
                    <span className="font-mono text-cyan-400">{nForce} N</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={nForce}
                    onChange={(e) => {
                      setNForce(parseFloat(e.target.value));
                      handleResetSim();
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].friction} (μ)</span>
                    <span className="font-mono text-cyan-400">{nFrictionCoeff}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={nFrictionCoeff}
                    onChange={(e) => {
                      setNFrictionCoeff(parseFloat(e.target.value));
                      handleResetSim();
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Sliders for Ohm Circuit */}
            {activeSim === 'ohm' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].voltage} (U)</span>
                    <span className="font-mono text-cyan-400">{ohmVoltage} V</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="48"
                    step="2"
                    value={ohmVoltage}
                    onChange={(e) => setOhmVoltage(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{t[language].resistance} (R)</span>
                    <span className="font-mono text-cyan-400">{ohmResistance} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="1"
                    value={ohmResistance}
                    onChange={(e) => setOhmResistance(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
