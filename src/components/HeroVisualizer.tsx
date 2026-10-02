import React, { useState, useEffect } from 'react';
import { Atom, Orbit, Waves, ArrowDownCircle, Activity, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface Props {
  language: Language;
  theme: 'dark' | 'light';
  animations: boolean;
}

export const HeroVisualizer: React.FC<Props> = ({ language, theme, animations }) => {
  const [activeTab, setActiveTab] = useState<'atom' | 'planet' | 'wave' | 'fall'>('atom');
  const [fallTime, setFallTime] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    if (!animations) return;
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 0.1) % (Math.PI * 4));
      setFallTime((prev) => (prev + 0.05) % 3);
    }, 50);
    return () => clearInterval(interval);
  }, [animations]);

  const isDark = theme === 'dark';

  return (
    <div className={`relative w-full max-w-xl mx-auto rounded-3xl p-6 border transition-all duration-300 shadow-2xl ${
      isDark 
        ? 'bg-zinc-900/80 border-cyan-500/20 backdrop-blur-xl shadow-cyan-950/30' 
        : 'bg-white/90 border-cyan-500/30 backdrop-blur-xl shadow-zinc-200'
    }`}>
      {/* Visualizer Mode Switcher */}
      <div className="flex items-center justify-between gap-1 p-1 mb-6 rounded-2xl bg-zinc-800/40 border border-zinc-700/40">
        <button
          onClick={() => setActiveTab('atom')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'atom'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Atom className="w-3.5 h-3.5" />
          <span>{language === 'uz' ? 'Atom' : 'Атом'}</span>
        </button>

        <button
          onClick={() => setActiveTab('planet')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'planet'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Orbit className="w-3.5 h-3.5" />
          <span>{language === 'uz' ? 'Sayyora' : 'Планета'}</span>
        </button>

        <button
          onClick={() => setActiveTab('wave')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'wave'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Waves className="w-3.5 h-3.5" />
          <span>{language === 'uz' ? 'To‘lqin' : 'Волна'}</span>
        </button>

        <button
          onClick={() => setActiveTab('fall')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'fall'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ArrowDownCircle className="w-3.5 h-3.5" />
          <span>{language === 'uz' ? 'Erkin tushish' : 'Падение'}</span>
        </button>
      </div>

      {/* Main Canvas / Visual Graphic */}
      <div className="relative h-64 w-full flex items-center justify-center rounded-2xl overflow-hidden bg-zinc-950/60 border border-zinc-800/80">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

        {/* 1. Atom Model */}
        {activeTab === 'atom' && (
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Nucleus */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)] flex items-center justify-center z-10 animate-pulse">
              <span className="text-[9px] font-bold text-white">Z=6</span>
            </div>

            {/* Orbit 1 */}
            <div
              className={`absolute w-44 h-20 rounded-[50%] border border-cyan-400/50 ${
                animations ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
              style={{ transform: 'rotate(30deg)' }}
            >
              <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            </div>

            {/* Orbit 2 */}
            <div
              className={`absolute w-44 h-20 rounded-[50%] border border-indigo-400/50 ${
                animations ? 'animate-[spin_5s_linear_infinite_reverse]' : ''
              }`}
              style={{ transform: 'rotate(-45deg)' }}
            >
              <div className="absolute -top-1.5 left-1/3 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
            </div>

            {/* Orbit 3 */}
            <div
              className={`absolute w-44 h-20 rounded-[50%] border border-emerald-400/50 ${
                animations ? 'animate-[spin_6s_linear_infinite]' : ''
              }`}
              style={{ transform: 'rotate(85deg)' }}
            >
              <div className="absolute -bottom-1.5 left-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            </div>

            <div className="absolute bottom-2 left-3 px-2 py-1 rounded-md bg-zinc-900/80 border border-zinc-700/60 text-[10px] text-cyan-300 font-mono">
              E = h·f | r_Bohr = 5.29×10⁻¹¹ m
            </div>
          </div>
        )}

        {/* 2. Planet Orbit */}
        {activeTab === 'planet' && (
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Sun */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_30px_rgba(251,191,36,0.9)] flex items-center justify-center">
              <span className="text-[10px] font-bold text-amber-950">M☉</span>
            </div>

            {/* Orbit Path */}
            <div className="absolute w-48 h-32 rounded-[50%] border border-dashed border-indigo-500/40" />

            {/* Planet Body with animation */}
            <div
              className={`absolute w-48 h-32 rounded-[50%] ${
                animations ? 'animate-[spin_7s_linear_infinite]' : ''
              }`}
            >
              <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_12px_#38bdf8] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
            </div>

            <div className="absolute bottom-2 left-3 px-2 py-1 rounded-md bg-zinc-900/80 border border-zinc-700/60 text-[10px] text-indigo-300 font-mono">
              F = G·(M·m)/R² | Keppler III
            </div>
          </div>
        )}

        {/* 3. Wave Simulation */}
        {activeTab === 'wave' && (
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <svg className="w-full h-32 overflow-visible" viewBox="0 0 400 120">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>

              {/* Axis */}
              <line x1="10" y1="60" x2="390" y2="60" stroke="#3f3f46" strokeDasharray="4,4" />

              {/* Sine Wave */}
              <path
                d={Array.from({ length: 80 }).reduce<string>((acc, _, i) => {
                  const x = 10 + i * 4.75;
                  const y = 60 + Math.sin(i * 0.25 - waveOffset) * 35;
                  return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                }, '')}
                fill="none"
                stroke="url(#waveGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Particle nodes on the wave */}
              {[15, 35, 55].map((idx) => {
                const px = 10 + idx * 4.75;
                const py = 60 + Math.sin(idx * 0.25 - waveOffset) * 35;
                return (
                  <circle
                    key={idx}
                    cx={px}
                    cy={py}
                    r="4"
                    fill="#ffffff"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            <div className="flex items-center gap-4 text-xs font-mono text-emerald-400">
              <span>v = λ·f = 340 m/s</span>
              <span>λ = 0.68 m</span>
              <span>f = 500 Hz</span>
            </div>
          </div>
        )}

        {/* 4. Free Fall Simulation */}
        {activeTab === 'fall' && (
          <div className="relative w-full h-full flex items-center justify-between px-10">
            {/* Height meter scale */}
            <div className="h-44 w-12 border-r border-zinc-700 flex flex-col justify-between py-1 text-[10px] font-mono text-zinc-400">
              <span>45 m</span>
              <span>30 m</span>
              <span>15 m</span>
              <span>0 m</span>
            </div>

            {/* Falling ball animation */}
            <div className="relative w-28 h-44 flex justify-center">
              {/* Ground line */}
              <div className="absolute bottom-0 w-full h-1 bg-amber-500 shadow-[0_0_10px_#f59e0b]" />

              {/* Falling mass */}
              <div
                className="absolute w-7 h-7 rounded-full bg-gradient-to-b from-amber-400 to-rose-500 shadow-[0_0_15px_#f59e0b] flex items-center justify-center text-[10px] font-bold text-white transition-all duration-75"
                style={{
                  top: `${Math.min((fallTime / 3) * 140, 140)}px`,
                }}
              >
                m
              </div>
            </div>

            {/* Live Ticker */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono space-y-1.5 text-zinc-300">
              <div className="text-amber-400 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                <span>{language === 'uz' ? 'Jonli telemetriya' : 'Телеметрия'}</span>
              </div>
              <div>t: <span className="text-white font-bold">{fallTime.toFixed(2)} s</span></div>
              <div>v = g·t: <span className="text-cyan-400 font-bold">{(fallTime * 9.8).toFixed(1)} m/s</span></div>
              <div>h = gt²/2: <span className="text-emerald-400 font-bold">{(0.5 * 9.8 * Math.pow(fallTime, 2)).toFixed(1)} m</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Badge */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1 text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FizikaLab Interactive Core v2.5</span>
        </span>
        <span className="font-mono">SI standard verification: 100% OK</span>
      </div>
    </div>
  );
};
