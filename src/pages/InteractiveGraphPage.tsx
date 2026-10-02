import React, { useState } from 'react';
import {
  LineChart,
  Sliders,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  Maximize2
} from 'lucide-react';
import { Language, Theme } from '../types';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
}

export const InteractiveGraphPage: React.FC<Props> = ({ language, theme }) => {
  const [graphType, setGraphType] = useState<
    'distance' | 'velocity' | 'accel' | 'force_mass' | 'ohm' | 'heat'
  >('distance');

  // Sliders state
  const [v0, setV0] = useState<number>(5); // m/s
  const [accel, setAccel] = useState<number>(2); // m/s²
  const [force, setForce] = useState<number>(40); // N
  const [resistance, setResistance] = useState<number>(20); // Ohm
  const [heatRate, setHeatRate] = useState<number>(1.5); // °C / s
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label: string } | null>(null);

  const isDark = theme === 'dark';

  const handleReset = () => {
    soundManager.playClick();
    setV0(5);
    setAccel(2);
    setForce(40);
    setResistance(20);
    setHeatRate(1.5);
    setZoomLevel(1);
    setHoveredPoint(null);
  };

  // Generate data points based on graphType
  const pointsCount = 40;
  const timeMax = 10 * zoomLevel;

  let points: { x: number; y: number; labelX: string; labelY: string }[] = [];
  let xTitle = 'Vaqt, t (s)';
  let yTitle = 'Yo‘l, s (m)';
  let formulaLabel = 's(t) = v₀·t + a·t²/2';

  if (graphType === 'distance') {
    xTitle = language === 'uz' ? 'Vaqt, t (s)' : 'Время, t (с)';
    yTitle = language === 'uz' ? 'Yo‘l, s (m)' : 'Путь, s (м)';
    formulaLabel = `s(t) = ${v0}·t + (${accel}/2)·t²`;
    points = Array.from({ length: pointsCount }, (_, i) => {
      const tVal = (i / (pointsCount - 1)) * timeMax;
      const sVal = v0 * tVal + 0.5 * accel * Math.pow(tVal, 2);
      return {
        x: tVal,
        y: sVal,
        labelX: `${tVal.toFixed(1)} s`,
        labelY: `${sVal.toFixed(1)} m`,
      };
    });
  } else if (graphType === 'velocity') {
    xTitle = language === 'uz' ? 'Vaqt, t (s)' : 'Время, t (с)';
    yTitle = language === 'uz' ? 'Tezlik, v (m/s)' : 'Скорость, v (м/с)';
    formulaLabel = `v(t) = ${v0} + ${accel}·t`;
    points = Array.from({ length: pointsCount }, (_, i) => {
      const tVal = (i / (pointsCount - 1)) * timeMax;
      const vVal = v0 + accel * tVal;
      return {
        x: tVal,
        y: vVal,
        labelX: `${tVal.toFixed(1)} s`,
        labelY: `${vVal.toFixed(1)} m/s`,
      };
    });
  } else if (graphType === 'accel') {
    xTitle = language === 'uz' ? 'Vaqt, t (s)' : 'Время, t (с)';
    yTitle = language === 'uz' ? 'Tezlanish, a (m/s²)' : 'Ускорение, a (м/с²)';
    formulaLabel = `a(t) = const = ${accel} m/s²`;
    points = Array.from({ length: pointsCount }, (_, i) => {
      const tVal = (i / (pointsCount - 1)) * timeMax;
      return {
        x: tVal,
        y: accel,
        labelX: `${tVal.toFixed(1)} s`,
        labelY: `${accel} m/s²`,
      };
    });
  } else if (graphType === 'force_mass') {
    xTitle = language === 'uz' ? 'Massa, m (kg)' : 'Масса, m (кг)';
    yTitle = language === 'uz' ? 'Tezlanish, a = F/m (m/s²)' : 'Ускорение, a = F/m (м/с²)';
    formulaLabel = `a = ${force} / m`;
    points = Array.from({ length: pointsCount }, (_, i) => {
      const mVal = 1 + (i / (pointsCount - 1)) * 19 * zoomLevel;
      const aVal = force / mVal;
      return {
        x: mVal,
        y: aVal,
        labelX: `${mVal.toFixed(1)} kg`,
        labelY: `${aVal.toFixed(2)} m/s²`,
      };
    });
  } else if (graphType === 'ohm') {
    xTitle = language === 'uz' ? 'Kuchlanish, U (V)' : 'Напряжение, U (В)';
    yTitle = language === 'uz' ? 'Tok kuchi, I = U/R (A)' : 'Сила тока, I = U/R (А)';
    formulaLabel = `I = U / ${resistance} Ω`;
    points = Array.from({ length: pointsCount }, (_, i) => {
      const uVal = (i / (pointsCount - 1)) * 250 * zoomLevel;
      const iVal = uVal / resistance;
      return {
        x: uVal,
        y: iVal,
        labelX: `${uVal.toFixed(0)} V`,
        labelY: `${iVal.toFixed(2)} A`,
      };
    });
  } else if (graphType === 'heat') {
    xTitle = language === 'uz' ? 'Vaqt, t (min)' : 'Время, t (мин)';
    yTitle = language === 'uz' ? 'Harorat, T (°C)' : 'Температура, T (°C)';
    formulaLabel = `T(t) = 20°C + ${heatRate} · t`;
    points = Array.from({ length: pointsCount }, (_, i) => {
      const tVal = (i / (pointsCount - 1)) * 60 * zoomLevel;
      const tempVal = 20 + heatRate * tVal;
      return {
        x: tVal,
        y: tempVal,
        labelX: `${tVal.toFixed(0)} min`,
        labelY: `${tempVal.toFixed(1)} °C`,
      };
    });
  }

  // Calculate SVG scales
  const minY = 0;
  const maxY = Math.max(...points.map((p) => p.y), 1) * 1.15;
  const minX = points[0]?.x || 0;
  const maxX = points[points.length - 1]?.x || 1;

  const svgWidth = 600;
  const svgHeight = 320;
  const padding = { top: 30, right: 30, bottom: 40, left: 60 };

  const scaleX = (x: number) =>
    padding.left + ((x - minX) / (maxX - minX || 1)) * (svgWidth - padding.left - padding.right);

  const scaleY = (y: number) =>
    svgHeight - padding.bottom - ((y - minY) / (maxY - minY || 1)) * (svgHeight - padding.top - padding.bottom);

  // SVG path definition
  const pathD = points.reduce((acc, p, idx) => {
    const px = scaleX(p.x);
    const py = scaleY(p.y);
    return idx === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
  }, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <LineChart className="w-4 h-4" />
            <span>{language === 'uz' ? 'Interaktiv vizualizatsiya' : 'Интерактивная визуализация'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {t[language].graphTitle}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {t[language].graphSubtitle}
          </p>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-zinc-400 px-1">{(1 / zoomLevel).toFixed(1)}x</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            title={t[language].reset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Graph Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'distance', label: t[language].graphDistanceTime },
          { id: 'velocity', label: t[language].graphVelocityTime },
          { id: 'accel', label: t[language].graphAccelTime },
          { id: 'force_mass', label: t[language].graphForceMass },
          { id: 'ohm', label: t[language].graphOhm },
          { id: 'heat', label: t[language].graphHeat },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              soundManager.playClick();
              setGraphType(item.id as typeof graphType);
              setHoveredPoint(null);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
              graphType === item.id
                ? 'bg-rose-500 text-white shadow-md shadow-rose-950/40'
                : 'bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Graph Display Card */}
        <div className="lg:col-span-8">
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            {/* Graph Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 font-mono text-sm text-cyan-400 font-bold">
                <span>{formulaLabel}</span>
              </div>
              {hoveredPoint && (
                <div className="px-3 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200">
                  {hoveredPoint.label}
                </div>
              )}
            </div>

            {/* SVG Plot */}
            <div className="relative w-full overflow-x-auto pt-4">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto min-h-[300px]"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0.25, 0.5, 0.75, 1].map((ratio) => {
                  const yVal = minY + (maxY - minY) * ratio;
                  const yPos = scaleY(yVal);
                  return (
                    <g key={ratio}>
                      <line
                        x1={padding.left}
                        y1={yPos}
                        x2={svgWidth - padding.right}
                        y2={yPos}
                        stroke="#27272a"
                        strokeDasharray="4,4"
                      />
                      <text
                        x={padding.left - 8}
                        y={yPos + 4}
                        fill="#71717a"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="end"
                      >
                        {yVal.toFixed(yVal > 10 ? 0 : 1)}
                      </text>
                    </g>
                  );
                })}

                {/* X Axis Ticks */}
                {[0.25, 0.5, 0.75, 1].map((ratio) => {
                  const xVal = minX + (maxX - minX) * ratio;
                  const xPos = scaleX(xVal);
                  return (
                    <g key={ratio}>
                      <line
                        x1={xPos}
                        y1={padding.top}
                        x2={xPos}
                        y2={svgHeight - padding.bottom}
                        stroke="#27272a"
                        strokeDasharray="4,4"
                      />
                      <text
                        x={xPos}
                        y={svgHeight - padding.bottom + 16}
                        fill="#71717a"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {xVal.toFixed(xVal > 10 ? 0 : 1)}
                      </text>
                    </g>
                  );
                })}

                {/* Main Axes */}
                <line
                  x1={padding.left}
                  y1={svgHeight - padding.bottom}
                  x2={svgWidth - padding.right}
                  y2={svgHeight - padding.bottom}
                  stroke="#71717a"
                  strokeWidth="1.5"
                />
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={svgHeight - padding.bottom}
                  stroke="#71717a"
                  strokeWidth="1.5"
                />

                {/* Axis Titles */}
                <text
                  x={svgWidth - padding.right}
                  y={svgHeight - padding.bottom - 8}
                  fill="#a1a1aa"
                  fontSize="11"
                  textAnchor="end"
                >
                  {xTitle}
                </text>
                <text
                  x={padding.left + 8}
                  y={padding.top - 10}
                  fill="#a1a1aa"
                  fontSize="11"
                  textAnchor="start"
                >
                  {yTitle}
                </text>

                {/* Graph Curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Interactive Points on curve */}
                {points.map((p, idx) => {
                  if (idx % 4 !== 0 && idx !== points.length - 1) return null;
                  const px = scaleX(p.x);
                  const py = scaleY(p.y);
                  return (
                    <circle
                      key={idx}
                      cx={px}
                      cy={py}
                      r="5"
                      fill="#ffffff"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() =>
                        setHoveredPoint({
                          x: p.x,
                          y: p.y,
                          label: `${xTitle}: ${p.labelX} | ${yTitle}: ${p.labelY}`,
                        })
                      }
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Sliders Controller Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div
            className={`p-6 rounded-3xl border transition-all space-y-6 ${
              isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Sliders className="w-4 h-4" />
              <span>{language === 'uz' ? 'Jonli Parametrlar' : 'Параметры графиков'}</span>
            </div>

            {/* Kinematics Sliders */}
            {(graphType === 'distance' || graphType === 'velocity' || graphType === 'accel') && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{language === 'uz' ? 'Boshlang‘ich tezlik (v₀)' : 'Начальная скорость (v₀)'}</span>
                    <span className="font-mono text-cyan-400">{v0} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={v0}
                    onChange={(e) => setV0(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>{language === 'uz' ? 'Tezlanish (a)' : 'Ускорение (a)'}</span>
                    <span className="font-mono text-cyan-400">{accel} m/s²</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.2"
                    value={accel}
                    onChange={(e) => setAccel(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </>
            )}

            {/* Force vs Mass Slider */}
            {graphType === 'force_mass' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span>{language === 'uz' ? 'Qo‘yilgan kuch (F)' : 'Приложенная сила (F)'}</span>
                  <span className="font-mono text-cyan-400">{force} N</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={force}
                  onChange={(e) => setForce(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            )}

            {/* Ohm Law Slider */}
            {graphType === 'ohm' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span>{language === 'uz' ? 'Zanjir qarshiligi (R)' : 'Сопротивление цепи (R)'}</span>
                  <span className="font-mono text-cyan-400">{resistance} Ω</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={resistance}
                  onChange={(e) => setResistance(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            )}

            {/* Heat Slider */}
            {graphType === 'heat' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                  <span>{language === 'uz' ? 'Isitish tezligi (dT/dt)' : 'Скорость нагрева'}</span>
                  <span className="font-mono text-cyan-400">{heatRate} °C/min</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={heatRate}
                  onChange={(e) => setHeatRate(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            )}

            {/* Educational note */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400 space-y-1">
              <span className="font-semibold text-zinc-300 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-rose-400" />
                <span>{language === 'uz' ? 'Fizik tushuntirish:' : 'Физическое пояснение:'}</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                {graphType === 'distance' &&
                  (language === 'uz'
                    ? 'Tezlanuvchan harakatda yo‘l vaqtning kvadratiga bog‘liq bo‘lib, parabola chizig‘ini hosil qiladi.'
                    : 'При равноускоренном движении зависимость пути от времени квадратичная (парабола).')}
                {graphType === 'velocity' &&
                  (language === 'uz'
                    ? 'Tezlanish o‘zgarmas bo‘lganda tezlik to‘g‘ri chiziq bo‘yicha tekis ortib boradi.'
                    : 'При постоянном ускорении скорость растет линейно.')}
                {graphType === 'accel' &&
                  (language === 'uz'
                    ? 'Tekis tezlanuvchan harakatda tezlanish doimiy qiymatga ega bo‘lib, vaqt o‘qiga parallel to‘g‘ri chiziq beradi.'
                    : 'Ускорение неизменно во времени — горизонтальная прямая.')}
                {graphType === 'force_mass' &&
                  (language === 'uz'
                    ? 'Kuch o‘zgarmas bo‘lganda massa ortishi bilan jism oladigan tezlanish teskari proportsional kamayadi (giperbola).'
                    : 'При постоянной силе ускорение обратно пропорционально массе тела (гипербола).')}
                {graphType === 'ohm' &&
                  (language === 'uz'
                    ? 'Qarshilik o‘zgarmas bo‘lsa, kuchlanish oshishi bilan tok kuchi to‘g‘ri proportsional oshadi.'
                    : 'Ток в цепи прямо пропорционален приложенному напряжению.')}
                {graphType === 'heat' &&
                  (language === 'uz'
                    ? 'Doimiy issiqlik quvvati berilganda modda harorati vaqt o‘tishi bilan tekis ko‘tariladi.'
                    : 'При постоянном потоке тепла температура растет линейно.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
