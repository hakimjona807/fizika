import React, { useState } from 'react';
import {
  Settings,
  Languages,
  Moon,
  Sun,
  Sparkles,
  Volume2,
  VolumeX,
  Type,
  Trash2,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Language, Theme, AppSettings } from '../types';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetAllData: () => void;
}

export const SettingsPage: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  onResetAllData,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const language = settings.language;
  const lang = settings.language;
  const isDark = settings.theme === 'dark';

  const handleLangToggle = (newLang: Language) => {
    soundManager.playClick();
    onUpdateSettings({ language: newLang });
  };

  const handleThemeToggle = (newTheme: Theme) => {
    soundManager.playClick();
    onUpdateSettings({ theme: newTheme });
  };

  const handleAnimToggle = () => {
    soundManager.playClick();
    onUpdateSettings({ animations: !settings.animations });
  };

  const handleSoundToggle = () => {
    onUpdateSettings({ sound: !settings.sound });
    soundManager.enabled = !settings.sound;
    soundManager.playClick();
  };

  const handleFontSizeChange = (size: 'normal' | 'large') => {
    soundManager.playClick();
    onUpdateSettings({ fontSize: size });
  };

  const handleExecuteReset = () => {
    soundManager.playError();
    onResetAllData();
    setShowResetConfirm(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-zinc-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>{language === 'uz' ? 'Tizim parametrlari' : 'Параметры системы'}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {t[lang].settingsTitle}
        </h1>
      </div>

      <div
        className={`p-6 sm:p-8 rounded-3xl border divide-y divide-zinc-800 ${
          isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
        }`}
      >
        {/* 1. Language Setting */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-zinc-100">
              <Languages className="w-4 h-4 text-cyan-400" />
              <span>{t[lang].settingsLanguage}</span>
            </div>
            <p className="text-xs text-zinc-400">
              {language === 'uz'
                ? 'Dastur interfeysi, tushuntirishlar va formulalar tilini tanlang.'
                : 'Выберите язык интерфейса, теории, тестов и пояснений.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLangToggle('uz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                lang === 'uz'
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🇺🇿 O‘zbekcha
            </button>
            <button
              onClick={() => handleLangToggle('ru')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                lang === 'ru'
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🇷🇺 Русский
            </button>
          </div>
        </div>

        {/* 2. Theme Setting */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-zinc-100">
              {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{t[lang].settingsTheme}</span>
            </div>
            <p className="text-xs text-zinc-400">
              {language === 'uz'
                ? 'Ilmiy qorong‘u (Dark) yoki yorug‘ (Light) rejimni tanlang.'
                : 'Переключение между темной научной и светлой темами.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleThemeToggle('dark')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                isDark
                  ? 'bg-zinc-800 text-cyan-400 border-cyan-500/40 shadow-sm'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{t[lang].settingsDark}</span>
            </button>
            <button
              onClick={() => handleThemeToggle('light')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                !isDark
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t[lang].settingsLight}</span>
            </button>
          </div>
        </div>

        {/* 3. Animations Setting */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-zinc-100">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>{t[lang].settingsAnimations}</span>
            </div>
            <p className="text-xs text-zinc-400">
              {language === 'uz'
                ? 'Fon zarrachalari, atom va simulyatsiya harakatlari.'
                : 'Плавные анимации частиц фона, орбитальных моделей и симуляций.'}
            </p>
          </div>

          <button
            onClick={handleAnimToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              settings.animations
                ? 'bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-500/20'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400'
            }`}
          >
            {settings.animations ? 'On (Yoqilgan)' : 'Off (O‘chirilgan)'}
          </button>
        </div>

        {/* 4. Sound Effects Setting */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-zinc-100">
              {settings.sound ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
              <span>{t[lang].settingsSound}</span>
            </div>
            <p className="text-xs text-zinc-400">
              {language === 'uz'
                ? 'Tugmalar bosilganda va test javoblarida nozik tovush effektlari.'
                : 'Звуковые сигналы при нажатиях, верных ответах и переключениях.'}
            </p>
          </div>

          <button
            onClick={handleSoundToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              settings.sound
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400'
            }`}
          >
            {settings.sound ? 'On (Yoqilgan)' : 'Off (O‘chirilgan)'}
          </button>
        </div>

        {/* 5. Font Size Setting */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-zinc-100">
              <Type className="w-4 h-4 text-cyan-400" />
              <span>{t[lang].settingsFontSize}</span>
            </div>
            <p className="text-xs text-zinc-400">
              {language === 'uz'
                ? 'Matn va formulalarning qulay o‘qilishi uchun shrif o‘lchami.'
                : 'Размер шрифта для комфортного чтения формул и теории.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFontSizeChange('normal')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                settings.fontSize === 'normal'
                  ? 'bg-zinc-800 text-cyan-400 border-cyan-500/40'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}
            >
              {t[lang].settingsFontNormal}
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                settings.fontSize === 'large'
                  ? 'bg-zinc-800 text-cyan-400 border-cyan-500/40'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}
            >
              {t[lang].settingsFontLarge}
            </button>
          </div>
        </div>

        {/* 6. Reset Saved Data */}
        <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-400">
              <Trash2 className="w-4 h-4" />
              <span>{t[lang].settingsResetData}</span>
            </div>
            <p className="text-xs text-zinc-400">
              {language === 'uz'
                ? 'Barcha yechilgan masalalar, test natijalari va saqlangan sevimlilarni tozalaydi.'
                : 'Очистка всего локального прогресса, результатов тестов и закладок.'}
            </p>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            {t[lang].reset}
          </button>
        </div>
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-zinc-900 border border-zinc-700 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-zinc-100">
                {t[lang].settingsResetData}
              </h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {t[lang].settingsResetConfirm}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
              >
                {t[lang].close}
              </button>
              <button
                onClick={handleExecuteReset}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-400 shadow-md shadow-rose-950/40"
              >
                {t[lang].reset}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset success toast */}
      {resetSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{t[lang].settingsResetSuccess}</span>
        </div>
      )}
    </div>
  );
};
