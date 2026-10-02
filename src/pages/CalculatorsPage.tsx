import React, { useState, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  Copy,
  Check,
  Zap,
  ArrowRight,
  AlertCircle,
  Sigma,
  Search
} from 'lucide-react';
import { Language, Theme, CalculatorConfig, CalculationResult } from '../types';
import { CALCULATORS } from '../data/calculators';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
  selectedCalcId?: string;
  onCalculatorUsed?: () => void;
}

export const CalculatorsPage: React.FC<Props> = ({
  language,
  theme,
  selectedCalcId,
  onCalculatorUsed,
}) => {
  const [selectedCalc, setSelectedCalc] = useState<CalculatorConfig>(() => {
    if (selectedCalcId) {
      const found = CALCULATORS.find((c) => c.id === selectedCalcId);
      if (found) return found;
    }
    return CALCULATORS[0];
  });

  const [inputValues, setInputValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    CALCULATORS[0].inputs.forEach((inp) => {
      init[inp.id] = inp.defaultValue;
    });
    return init;
  });

  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Handle switching calculator
  const handleSelectCalc = (calc: CalculatorConfig) => {
    soundManager.playClick();
    setSelectedCalc(calc);
    const newVals: Record<string, number> = {};
    calc.inputs.forEach((inp) => {
      newVals[inp.id] = inp.defaultValue;
    });
    setInputValues(newVals);
    setErrorMessage(null);
    setCopied(false);
  };

  // Perform calculation automatically on input changes
  useEffect(() => {
    try {
      // Validate
      for (const inp of selectedCalc.inputs) {
        const val = inputValues[inp.id];
        if (val === undefined || isNaN(val)) {
          setErrorMessage(t[language].errorInvalidNumber);
          setCalculation(null);
          return;
        }
        if (inp.min !== undefined && val < inp.min) {
          setErrorMessage(`${language === 'uz' ? inp.labelUz : inp.labelRu}: minimum ${inp.min}`);
          setCalculation(null);
          return;
        }
      }

      const res = selectedCalc.calculate(inputValues);
      setCalculation(res);
      setErrorMessage(null);
      if (onCalculatorUsed) onCalculatorUsed();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t[language].errorEmpty;
      setErrorMessage(msg);
      setCalculation(null);
    }
  }, [inputValues, selectedCalc, language, onCalculatorUsed]);

  const handleInputChange = (id: string, rawVal: string) => {
    const parsed = parseFloat(rawVal.replace(',', '.'));
    setInputValues((prev) => ({
      ...prev,
      [id]: isNaN(parsed) ? 0 : parsed,
    }));
  };

  const handleReset = () => {
    soundManager.playClick();
    const defVals: Record<string, number> = {};
    selectedCalc.inputs.forEach((inp) => {
      defVals[inp.id] = inp.defaultValue;
    });
    setInputValues(defVals);
    setErrorMessage(null);
  };

  const handleCopyResult = () => {
    if (!calculation) return;
    soundManager.playTick();
    const textToCopy = `${selectedCalc.formulaDisplay} => ${calculation.formattedResult} ${calculation.unit}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === 'dark';

  const filteredCalculators = CALCULATORS.filter((c) => {
    const q = searchFilter.toLowerCase();
    return (
      c.titleUz.toLowerCase().includes(q) ||
      c.titleRu.toLowerCase().includes(q) ||
      c.formulaDisplay.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>{language === 'uz' ? 'Aniqlik va Formulalar' : 'Точные расчеты'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {t[language].navCalculator}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {language === 'uz'
              ? 'Real formulalar bo‘yicha avtomatik hisoblash va bosqichma-bosqich tahlil'
              : 'Автоматический расчет по физическим законам с пошаговыми математическими выкладками'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={language === 'uz' ? 'Kalkulyatorni qidirish...' : 'Поиск калькулятора...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 text-xs text-zinc-100 outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: List of calculators */}
        <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredCalculators.map((c) => {
            const isSelected = c.id === selectedCalc.id;
            return (
              <div
                key={c.id}
                onClick={() => handleSelectCalc(c)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                    : isDark
                    ? 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700'
                    : 'bg-white border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
                      isSelected
                        ? 'bg-emerald-500 text-black'
                        : 'bg-zinc-800 text-emerald-400'
                    }`}
                  >
                    <Sigma className="w-4 h-4" />
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isSelected ? 'text-emerald-400' : 'text-zinc-200'
                      }`}
                    >
                      {language === 'uz' ? c.titleUz : c.titleRu}
                    </h4>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {c.formulaDisplay}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-emerald-400 translate-x-1' : 'text-zinc-600'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Right column: Interactive calculation workstation */}
        <div className="lg:col-span-7 space-y-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                  {selectedCalc.categoryUz}
                </span>
                <h2 className="text-2xl font-extrabold text-zinc-100 mt-1">
                  {language === 'uz' ? selectedCalc.titleUz : selectedCalc.titleRu}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  title={t[language].reset}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="py-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCalc.inputs.map((inp) => (
                  <div key={inp.id} className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                      <span>{language === 'uz' ? inp.labelUz : inp.labelRu}</span>
                      <span className="font-mono text-zinc-500">[{inp.unit}]</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step={inp.step || 'any'}
                        value={inputValues[inp.id] ?? ''}
                        onChange={(e) => handleInputChange(inp.id, e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-950/80 border border-zinc-700/80 text-sm font-mono text-zinc-100 outline-none focus:border-emerald-500 transition-colors"
                      />
                      <span className="absolute right-4 top-3 text-xs font-mono text-zinc-500">
                        {inp.symbol}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Error warning */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Result Display Box */}
            {calculation && (
              <div className="space-y-5 pt-4 border-t border-zinc-800">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-zinc-950 to-zinc-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      {t[language].result} ({selectedCalc.formulaDisplay}):
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mt-1 flex items-baseline gap-2">
                      <span>{calculation.formattedResult}</span>
                      <span className="text-lg font-sans text-emerald-300 font-semibold">
                        {calculation.unit}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyResult}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">{t[language].copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{t[language].copy}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Step-by-step breakdown */}
                <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{t[language].steps}</span>
                  </h4>
                  <div className="space-y-1.5 font-mono text-xs text-zinc-300">
                    {(language === 'uz' ? calculation.stepsUz : calculation.stepsRu).map(
                      (step, idx) => (
                        <div key={idx} className="leading-relaxed">
                          {step}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
