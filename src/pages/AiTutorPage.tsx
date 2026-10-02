import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  Zap,
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { Language, Theme } from '../types';
import { t } from '../data/translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  theme: Theme;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiTutorPage: React.FC<Props> = ({ language, theme }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text:
        language === 'uz'
          ? "Salom! Men FizikaLab AI repetitoriman. Sizga istalgan fizik hodisa, qonun, formula yoki masalani tushunarli tarzda tushuntirib berishim mumkin. Qanday savolingiz bor?"
          : "Привет! Я AI репетитор FizikaLab. Я помогу разобраться в любом физическом явлении, законе, формуле или задаче. Какой у вас вопрос?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [promptInput, setPromptInput] = useState('');
  const [mode, setMode] = useState<'normal' | 'simple' | 'example' | 'steps' | 'short'>('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    language === 'uz' ? "Newtonning 2-qonuni nima?" : "Что такое второй закон Ньютона?",
    language === 'uz' ? "Nega osmon ko‘k?" : "Почему небо голубое?",
    language === 'uz' ? "Elektr toki qanday ishlaydi?" : "Как работает электрический ток?",
    language === 'uz' ? "Kinetik va potensial energiya farqi" : "Разница между кинетической и потенциальной энергией",
  ];

  const handleSend = async (customPrompt?: string) => {
    const q = (customPrompt || promptInput).trim();
    if (!q || isLoading) return;

    soundManager.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: q,
          mode: mode,
          language: language,
        }),
      });

      const data = await response.json();
      const aiReply = data.answer || (language === 'uz' ? 'Kechirasiz, javob olishda xatolik yuz berdi.' : 'Извините, произошла ошибка при формировании ответа.');

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      soundManager.playSuccess();
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text:
          language === 'uz'
            ? 'Tarmoq xatosi yuz berdi. Iltimos qaytadan urinib ko‘ring.'
            : 'Произошла ошибка сети. Попробуйте еще раз.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      soundManager.playError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    soundManager.playTick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const isDark = theme === 'dark';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'uz' ? 'Aqlli Repetitor' : 'Интеллектуальный репетитор'}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {t[language].aiTutorTitle}
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          {t[language].aiTutorSubtitle}
        </p>
      </div>

      {/* Mode Switcher Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-zinc-400 mr-1">
          {language === 'uz' ? 'Tushuntirish usuli:' : 'Стиль объяснения:'}
        </span>
        {[
          { id: 'simple', label: t[language].aiModeSimple },
          { id: 'example', label: t[language].aiModeExample },
          { id: 'steps', label: t[language].aiModeSteps },
          { id: 'short', label: t[language].aiModeShort },
        ].map((m) => {
          const isSelected = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                soundManager.playClick();
                setMode(isSelected ? 'normal' : (m.id as typeof mode));
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-sky-500 text-black border-sky-400 shadow-md shadow-sky-500/20'
                  : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Quick Questions Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
          {t[language].aiQuickPromptTitle}
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 hover:text-white border border-zinc-700/70 transition-all text-left"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div
        className={`p-6 rounded-3xl border min-h-[420px] max-h-[580px] overflow-y-auto space-y-4 ${
          isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}
      >
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isAi ? 'justify-start' : 'justify-end'
              }`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-black shrink-0 mt-0.5 shadow-md shadow-sky-500/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  isAi
                    ? 'bg-zinc-800/80 border border-zinc-700/60 text-zinc-100 rounded-tl-sm'
                    : 'bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-medium rounded-tr-sm shadow-md shadow-sky-500/20'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div
                  className={`flex items-center justify-between pt-1 text-[10px] ${
                    isAi ? 'text-zinc-500' : 'text-zinc-800'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isAi && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-white"
                      title={t[language].copy}
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>{t[language].aiThinking}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Message Form */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder={t[language].aiInputPlaceholder}
          disabled={isLoading}
          className="w-full pl-5 pr-14 py-4 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-sm text-zinc-100 outline-none focus:border-sky-400 transition-colors shadow-lg shadow-black/20"
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !promptInput.trim()}
          className="absolute right-2.5 p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold transition-all disabled:opacity-40 cursor-pointer shadow-md shadow-sky-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
