import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Physics Knowledge Base for intelligent fallback when API key is not configured or in offline mode
const PHYSICS_FALLBACKS: Record<string, { uz: string; ru: string }> = {
  newton2: {
    uz: `**Nyutonning ikkinchi qonuni (Dinamikaning asosiy qonuni):**\n\nJismga ta'sir qiluvchi kuchlar teng ta'sir etuvchisi jism massasi bilan uning olgan tezlanishining ko'paytmasiga teng:\n\n$$\\vec{F} = m \\cdot \\vec{a}$$\n\n* **F** — jismga ta'sir qiluvchi kuch (Nyuton, N)\n* **m** — jism massasi (kilogramm, kg)\n* **a** — jism tezlanishi (m/s²)\n\n**Fizik ma'nosi:** Kuch — jismning harakat holatini (tezligini) o'zgartiruvchi sababdir. Agar massasi 2 kg jismga 10 N kuch berilsa, uning tezlanishi $a = F/m = 10 / 2 = 5\\text{ m/s}^2$ bo'ladi.`,
    ru: `**Второй закон Ньютона (Основной закон динамики):**\n\nРавнодействующая всех сил, действующих на тело, равна произведению массы тела на его ускорение:\n\n$$\\vec{F} = m \\cdot \\vec{a}$$\n\n* **F** — сила (Ньютон, Н)\n* **m** — масса тела (килограмм, кг)\n* **a** — ускорение тела (м/с²)\n\n**Физический смысл:** Сила является причиной изменения скорости тела. Если к телу массой 2 кг приложена сила 10 Н, то ускорение составит $a = F/m = 10 / 2 = 5\\text{ м/с}^2$.`
  },
  sky_blue: {
    uz: `**Nega osmon ko'k rangda ko'rinadi?**\n\nBu hodisa **Reley sochilishi (Rayleigh scattering)** bilan tushuntiriladi:\n\n1. Quyosh nuri oq rangda bo'lib, u kamalakning barcha ranglarini (turli to'lqin uzunlikdagi nurlarni) o'z ichiga oladi.\n2. Yer atmosferasi kislorod va azot molekulalaridan iborat.\n3. Reley qonuniga ko'ra, yorug'likning sochilishi to'lqin uzunligining to'rtinchi darajasiga teskari proportsional: $I \\sim 1/\\lambda^4$.\n4. Qisqa to'lqinli nurlar (ko'k va binafsha, $\\lambda \\approx 400-480\\text{ nm}$) uzun to'lqinli (qizil va sariq, $\\lambda \\approx 650-700\\text{ nm}$) nurlarga qaraganda atmosferada taxminan 10-16 barobar kuchliroq sochiladi.\n5. Inson ko'zi ko'k rangga binafsha rangga qaraganda ancha sezgir bo'lgani uchun biz osmonni moviy-ko'k ko'ramiz!`,
    ru: `**Почему небо голубое?**\n\nЭто явление объясняется **рэлеевским рассеянием света**:\n\n1. Солнечный свет — белый, состоящий из спектра всех цветов с разными длинами волн.\n2. Атмосфера Земли заполнена молекулами азота и кислорода.\n3. По закону Рэлея интенсивность рассеяния обратно пропорциональна четвёртой степени длины волны: $I \\sim 1/\\lambda^4$.\n4. Коротковолновой свет (синий и фиолетовый) рассеивается молекулами воздуха примерно в 10–16 раз сильнее, чем длинноволновой (красный).\n5. Человеческий глаз наиболее чувствителен именно к синему спектру, поэтому дневное небо видится нам лазурно-голубым!`
  },
  ohm: {
    uz: `**Zanjir qismi uchun Om qonuni:**\n\nZanjir qismidagi tok kuchi ($I$) shu qism uchlaridagi kuchlanishga ($U$) to'g'ri, qarshilikka ($R$) teskari proportsionaldir:\n\n$$I = \\frac{U}{R}$$\n\n* **I** — tok kuchi (Amper, A)\n* **U** — elektr kuchlanishi (Volt, V)\n* **R** — o'tkazgich qarshiligi (Om, $\\Omega$)\n\n**Amaliy misol:** 220 V kuchlanishli tarmoqqa 44 Om qarshilikka ega isitgich ulansa, undan o'tadigan tok: $I = 220 / 44 = 5\\text{ A}$ bo'ladi.`,
    ru: `**Закон Ома для участка цепи:**\n\nСила тока в участке цепи прямо пропорциональна напряжению на концах этого участка и обратно пропорциональна его сопротивлению:\n\n$$I = \\frac{U}{R}$$\n\n* **I** — сила тока (Ампер, А)\n* **U** — напряжение (Вольт, В)\n* **R** — электрическое сопротивление (Ом, $\\Omega$)\n\n**Пример:** Если к сети 220 В подключить нагреватель с сопротивлением 44 Ом, сила тока составит: $I = 220 / 44 = 5\\text{ А}$.`
  },
  gravity: {
    uz: `**Butun olam tortishish qonuni (Nyuton):**\n\nIkkita moddiy nuqta orasidagi gravitatsion tortishish kuchi ularning massalari ko'paytmasiga to'g'ri va ular orasidagi masofa kvadratiga teskari proportsionaldir:\n\n$$F = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}$$\n\n* **G** — gravitatsion doimiy: $6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$\n* **m1, m2** — jismlar massalari (kg)\n* **r** — jismlar markazlari orasidagi masofa (m)`,
    ru: `**Закон всемирного тяготения (Ньютон):**\n\nСила гравитационного притяжения между двумя телами прямо пропорциональна произведению их масс и обратно пропорциональна квадрату расстояния между ними:\n\n$$F = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}$$\n\n* **G** — гравитационная постоянная: $6.674 \\times 10^{-11}\\text{ Н}\\cdot\\text{м}^2/\\text{кг}^2$\n* **m1, m2** — массы взаимодействующих тел (кг)\n* **r** — расстояние между их центрами масс (м)`
  }
};

function getFallbackAnswer(prompt: string, mode: string, language: 'uz' | 'ru'): string {
  const p = prompt.toLowerCase();
  let key: string | null = null;
  if (p.includes('newton') || p.includes('nyuton') || p.includes('ikkinchi qonun') || p.includes('второй закон') || p.includes('f=ma')) {
    key = 'newton2';
  } else if (p.includes('osmon') || p.includes('ko\'k') || p.includes('kok') || p.includes('небо') || p.includes('голубое') || p.includes('синее')) {
    key = 'sky_blue';
  } else if (p.includes('om') || p.includes('ohm') || p.includes('tok') || p.includes('kuchlanish') || p.includes('ток') || p.includes('напряжение')) {
    key = 'ohm';
  } else if (p.includes('gravitats') || p.includes('tortishish') || p.includes('тяготени')) {
    key = 'gravity';
  }

  if (key && PHYSICS_FALLBACKS[key]) {
    return PHYSICS_FALLBACKS[key][language];
  }

  if (language === 'uz') {
    if (mode === 'short') {
      return `Savol: "${prompt}". Fizik nuqtai nazardan bu jarayon tabiatning fundamental saqlanish qonunlari va o'zaro ta'sir kuchlari bilan boshqariladi. Formulalar bo'limidan tegishli qonunni qidirib topishingiz mumkin.`;
    }
    return `Siz so'ragan mavzu: "${prompt}".\n\n**Asosiy fizik mohiyat:**\nFizikada bu hodisa energiya, impuls va zaryad saqlanish qonunlari hamda elementar zarrachalarning o'zaro ta'siri bilan tushuntiriladi.\n\n**Amaliy ahamiyati:**\nUshbu hodisa muhandislikda, texnikada va kundalik hayotimizda keng qo'llaniladi. FizikaLab formulalar kutubxonasi va interaktiv simulyatorlar yordamida uni chuqurroq o'rganishingiz mumkin!`;
  } else {
    if (mode === 'short') {
      return `Вопрос: "${prompt}". С физической точки зрения данное явление подчиняется фундаментальным законам сохранения энергии и импульса. Вы можете изучить формулу в библиотеке формул FizikaLab.`;
    }
    return `Тема запроса: "${prompt}".\n\n**Физическая сущность:**\nВ физике это явление описывается фундаментальными законами сохранения энергии, импульса и взаимодействия полей.\n\n**Практическое применение:**\nЭтот принцип лежит в основе современных инженерных технологий и природных явлений. Изучите интерактивные симуляции и калькуляторы FizikaLab для наглядного понимания!`;
  }
}

// AI Physics Tutor endpoint
app.post('/api/ai-tutor', async (req, res) => {
  try {
    const { prompt, mode = 'normal', language = 'uz' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const lang = language === 'ru' ? 'ru' : 'uz';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const fallback = getFallbackAnswer(prompt, mode, lang);
      return res.json({ answer: fallback, source: 'fallback' });
    }

    const ai = new GoogleGenAI();

    let styleInstruction = '';
    if (mode === 'simple') {
      styleInstruction = lang === 'uz' 
        ? 'Tushuntirishni eng oddiy, maktab o\'quvchisi ham oson tushunadigan tilda, murakkab terminlarsiz va qiziqarli metaforalar bilan yoz.'
        : 'Объясни максимально просто и доступно, без сложной академической терминологии, используя понятные аналогии из жизни.';
    } else if (mode === 'example') {
      styleInstruction = lang === 'uz'
        ? 'Tushuntirishni hayotiy, kundalik turmushdan olingan aniq va qiziqarli fizik misollar orqali ko\'rsatib ber.'
        : 'Построй объяснение вокруг наглядных практических примеров из повседневной жизни и техники.';
    } else if (mode === 'steps') {
      styleInstruction = lang === 'uz'
        ? 'Tushuntirishni 1, 2, 3 tartibida bosqichma-bosqich, mantiiqiy ketma-ketlikda yozib ber.'
        : 'Разбей объяснение на чёткие последовательные шаги с нумерацией 1, 2, 3.';
    } else if (mode === 'short') {
      styleInstruction = lang === 'uz'
        ? 'Juda ixcham, londa va aniq, 2-3 ta asosiy gapda javob ber.'
        : 'Дай краткий, ёмкий и чёткий ответ в 2-3 предложениях.';
    } else {
      styleInstruction = lang === 'uz'
        ? 'Fizik tushunchani ilmiy aniq, lekin o\'quvchiga tushunarli tarzda, formula va SI birliklarini keltirgan holda tushuntir.'
        : 'Объясни физическое понятие научно и точно, но понятно, приведя формулы и единицы СИ.';
    }

    const systemPrompt = `You are "FizikaLab AI Tutor" — an expert, friendly, and pedagogical physics tutor for high school and university students.
The user language is ${lang === 'uz' ? 'Uzbek (O\'zbek tili)' : 'Russian (Русский язык)'}.
Always respond in ${lang === 'uz' ? 'Uzbek' : 'Russian'}.
Use clear Markdown formatting with bold titles, bullet points, and clean formulas (e.g. F = ma, E = mc²).
Style instruction: ${styleInstruction}
Keep the tone encouraging, inspiring, and scientifically accurate.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }] }
      ]
    });

    const reply = response.text || getFallbackAnswer(prompt, mode, lang);
    return res.json({ answer: reply, source: 'gemini' });
  } catch (error) {
    console.error('AI Tutor error:', error);
    const { prompt = '', mode = 'normal', language = 'uz' } = req.body || {};
    const lang = language === 'ru' ? 'ru' : 'uz';
    const fallback = getFallbackAnswer(prompt, mode, lang);
    return res.json({ answer: fallback, source: 'fallback_on_error' });
  }
});

// Configure Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FizikaLab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
