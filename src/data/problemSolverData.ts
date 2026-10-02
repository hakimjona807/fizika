export interface SolvedAnalysis {
  titleUz: string;
  titleRu: string;
  given: { key: string; value: string; labelUz: string; labelRu: string }[];
  findUz: string;
  findRu: string;
  formula: string;
  variablesBreakdown: { symbol: string; nameUz: string; nameRu: string; unit: string }[];
  calculationStepsUz: string[];
  calculationStepsRu: string[];
  finalAnswer: string;
  unit: string;
  explanationUz: string;
  explanationRu: string;
}

export const SAMPLE_PROBLEMS = [
  {
    id: 'sample_1',
    textUz: "Massasi 5 kg bo'lgan jismga 20 N kuch ta'sir qilmoqda. Tezlanishni toping.",
    textRu: "Телу массой 5 кг сообщили силу 20 Н. Найдите ускорение.",
    analysis: {
      titleUz: "Nyutonning ikkinchi qonuni bo'yicha tezlanishni aniqlash",
      titleRu: "Определение ускорения по второму закону Ньютона",
      given: [
        { key: "m", value: "5 kg", labelUz: "Jism massasi (m)", labelRu: "Масса тела (m)" },
        { key: "F", value: "20 N", labelUz: "Ta'sir qiluvchi kuch (F)", labelRu: "Приложенная сила (F)" }
      ],
      findUz: "a (Tezlanish)",
      findRu: "a (Ускорение)",
      formula: "a = F / m",
      variablesBreakdown: [
        { symbol: "F", nameUz: "Jismga ta'sir qiluvchi kuch", nameRu: "Приложенная сила", unit: "N (Nyuton)" },
        { symbol: "m", nameUz: "Jism massasi", nameRu: "Масса тела", unit: "kg (kilogramm)" },
        { symbol: "a", nameUz: "Olingan tezlanish", nameRu: "Сообщаемое ускорение", unit: "m/s²" }
      ],
      calculationStepsUz: [
        "1. Nyutonning ikkinchi qonunining asosiy formulasi: F = m · a",
        "2. Noma'lum tezlanish (a) ni formuladan ajratamiz: a = F / m",
        "3. Berilgan sonli qiymatlarni o'rniga qo'yamiz: a = 20 N / 5 kg = 4 m/s²"
      ],
      calculationStepsRu: [
        "1. Основной закон динамики (второй закон Ньютона): F = m · a",
        "2. Выражаем искомое ускорение (a): a = F / m",
        "3. Подставляем численные значения: a = 20 Н / 5 кг = 4 м/с²"
      ],
      finalAnswer: "4",
      unit: "m/s²",
      explanationUz: "Jismga ta'sir qiluvchi kuch uning harakat holatini o'zgartiradi. 5 kg massali jism 20 N kuch ostida har soniyada tezligini 4 m/s ga oshirib boradi.",
      explanationRu: "Приложенная постоянная сила сообщает телу постоянное ускорение. Скорость тела каждую секунду возрастает на 4 м/с."
    }
  },
  {
    id: 'sample_2',
    textUz: "Avtomobil 25 m/s tezlik bilan 8 soniya davomida harakatlandi. Bosib o'tilgan yo'lni toping.",
    textRu: "Автомобиль двигался со скоростью 25 м/с в течение 8 секунд. Найдите пройденный путь.",
    analysis: {
      titleUz: "Tekis to'g'ri chiziqli harakatda yo'lni topish",
      titleRu: "Нахождение пути при прямолинейном равномерном движении",
      given: [
        { key: "v", value: "25 m/s", labelUz: "Tezlik (v)", labelRu: "Скорость (v)" },
        { key: "t", value: "8 s", labelUz: "Vaqt (t)", labelRu: "Время (t)" }
      ],
      findUz: "s (Bosib o'tilgan masofa)",
      findRu: "s (Пройденный путь)",
      formula: "s = v · t",
      variablesBreakdown: [
        { symbol: "v", nameUz: "Harakat tezligi", nameRu: "Скорость движения", unit: "m/s" },
        { symbol: "t", nameUz: "Harakat davomiyligi", nameRu: "Время движения", unit: "s" },
        { symbol: "s", nameUz: "Bosib o'tilgan yo'l", nameRu: "Пройденный путь", unit: "m" }
      ],
      calculationStepsUz: [
        "1. Tekis harakat formulasi: s = v · t",
        "2. Berilgan qiymatlarni qo'yamiz: s = 25 m/s · 8 s",
        "3. Hisoblash: s = 200 m"
      ],
      calculationStepsRu: [
        "1. Формула равномерного движения: s = v · t",
        "2. Подстановка данных: s = 25 м/с · 8 с",
        "3. Вычисление: s = 200 м"
      ],
      finalAnswer: "200",
      unit: "m",
      explanationUz: "Avtomobil o'zgarmas 25 m/s tezlikda (90 km/h) 8 soniya davomida to'g'ri chiziq bo'ylab jami 200 metr masofa bosib o'tadi.",
      explanationRu: "Автомобиль, двигаясь со скоростью 25 м/с (90 км/ч), за 8 секунд преодолевает ровно 200 метров."
    }
  },
  {
    id: 'sample_3',
    textUz: "220 V kuchlanishli tarmoqqa ulangan isitgichning qarshiligi 55 Om. Undan o'tuvchi tok kuchini toping.",
    textRu: "Электрический нагреватель сопротивлением 55 Ом включен в сеть 220 В. Найдите силу тока.",
    analysis: {
      titleUz: "Om qonuni bo'yicha tok kuchini hisoblash",
      titleRu: "Расчет силы тока по закону Ома",
      given: [
        { key: "U", value: "220 V", labelUz: "Kuchlanish (U)", labelRu: "Напряжение (U)" },
        { key: "R", value: "55 Ω", labelUz: "Qarshilik (R)", labelRu: "Сопротивление (R)" }
      ],
      findUz: "I (Tok kuchi)",
      findRu: "I (Сила тока)",
      formula: "I = U / R",
      variablesBreakdown: [
        { symbol: "U", nameUz: "Elektr kuchlanishi", nameRu: "Электрическое напряжение", unit: "V (Volt)" },
        { symbol: "R", nameUz: "O'tkazgich qarshiligi", nameRu: "Сопротивление проводника", unit: "Ω (Om)" },
        { symbol: "I", nameUz: "Tok kuchi", nameRu: "Сила электрического тока", unit: "A (Amper)" }
      ],
      calculationStepsUz: [
        "1. Zanjir qismi uchun Om qonuni: I = U / R",
        "2. Qiymatlarni formulaga qo'yamiz: I = 220 V / 55 Ω",
        "3. Natija: I = 4 A"
      ],
      calculationStepsRu: [
        "1. Закон Ома для участка цепи: I = U / R",
        "2. Подставляем значения: I = 220 В / 55 Ом",
        "3. Результат: I = 4 А"
      ],
      finalAnswer: "4",
      unit: "A",
      explanationUz: "Tarmoqdagi 220 V kuchlanish 55 Om qarshilikka ega spiral orqali 4 Amperlik elektr tokini harakatga keltiradi.",
      explanationRu: "Напряжение сети 220 В создает в проводнике сопротивлением 55 Ом электрический ток силой 4 Ампера."
    }
  },
  {
    id: 'sample_4',
    textUz: "Massasi 3 kg bo'lgan tosh 10 m balandlikda turibdi. Toshning potensial energiyasini toping (g = 9.8 m/s²).",
    textRu: "Камень массой 3 кг поднят на высоту 10 м. Найдите его потенциальную энергию (g = 9.8 м/с²).",
    analysis: {
      titleUz: "Gravitatsiya maydonidagi potensial energiya",
      titleRu: "Потенциальная энергия тела в поле силы тяжести",
      given: [
        { key: "m", value: "3 kg", labelUz: "Massa (m)", labelRu: "Масса (m)" },
        { key: "h", value: "10 m", labelUz: "Balandlik (h)", labelRu: "Высота (h)" },
        { key: "g", value: "9.8 m/s²", labelUz: "Erkin tushish tezlanishi (g)", labelRu: "Ускорение своб. падения (g)" }
      ],
      findUz: "Ep (Potensial energiya)",
      findRu: "Ep (Потенциальная энергия)",
      formula: "Ep = m · g · h",
      variablesBreakdown: [
        { symbol: "m", nameUz: "Jism massasi", nameRu: "Масса тела", unit: "kg" },
        { symbol: "g", nameUz: "Erkin tushish tezlanishi", nameRu: "Ускорение свободного падения", unit: "m/s²" },
        { symbol: "h", nameUz: "Ko'tarilish balandligi", nameRu: "Высота подъема", unit: "m" },
        { symbol: "Ep", nameUz: "Potensial energiya", nameRu: "Потенциальная энергия", unit: "J (Joul)" }
      ],
      calculationStepsUz: [
        "1. Potensial energiya formulasi: Ep = m · g · h",
        "2. Qiymatlarni qo'yamiz: Ep = 3 kg · 9.8 m/s² · 10 m",
        "3. Hisoblash: Ep = 294 J"
      ],
      calculationStepsRu: [
        "1. Формула потенциальной энергии: Ep = m · g · h",
        "2. Подстановка данных: Ep = 3 кг · 9.8 м/с² · 10 м",
        "3. Вычисление: Ep = 294 Дж"
      ],
      finalAnswer: "294",
      unit: "J",
      explanationUz: "Jism yuqoriga ko'tarilganda Yer gravitatsiya kuchiga qarshi ish bajariladi va bu energiya jismda potensial zaxira shaklida saqlanadi.",
      explanationRu: "При подъеме тела против силы тяжести совершается работа, накапливаемая в виде потенциальной энергии."
    }
  }
];

export function analyzeCustomProblem(inputText: string): SolvedAnalysis {
  const text = inputText.toLowerCase();

  // Pattern 1: Force and Mass -> Acceleration (F, m -> a)
  const massMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|кг)/i) || text.match(/massa[a-z]*\s*(\d+(?:[.,]\d+)?)/i);
  const forceMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:n|н)/i) || text.match(/kuch[a-z]*\s*(\d+(?:[.,]\d+)?)/i);

  if (massMatch && forceMatch) {
    const m = parseFloat(massMatch[1].replace(',', '.'));
    const F = parseFloat(forceMatch[1].replace(',', '.'));
    if (m > 0) {
      const a = F / m;
      return {
        titleUz: "Nyutonning ikkinchi qonuni bo'yicha tezlanishni topish",
        titleRu: "Определение ускорения по второму закону Ньютона",
        given: [
          { key: "m", value: `${m} kg`, labelUz: "Jism massasi (m)", labelRu: "Масса тела (m)" },
          { key: "F", value: `${F} N`, labelUz: "Ta'sir qiluvchi kuch (F)", labelRu: "Приложенная сила (F)" }
        ],
        findUz: "a (Tezlanish, m/s²)",
        findRu: "a (Ускорение, м/с²)",
        formula: "a = F / m",
        variablesBreakdown: [
          { symbol: "F", nameUz: "Kuch", nameRu: "Сила", unit: "N" },
          { symbol: "m", nameUz: "Massa", nameRu: "Масса", unit: "kg" },
          { symbol: "a", nameUz: "Tezlanish", nameRu: "Ускорение", unit: "m/s²" }
        ],
        calculationStepsUz: [
          "1. Nyuton 2-qonuni: F = m · a",
          "2. Tezlanishni topish: a = F / m",
          `3. Hisob: a = ${F} / ${m} = ${a.toFixed(3).replace(/\.?0+$/, '')} m/s²`
        ],
        calculationStepsRu: [
          "1. Второй закон Ньютона: F = m · a",
          "2. Выражаем ускорение: a = F / m",
          `3. Расчет: a = ${F} / ${m} = ${a.toFixed(3).replace(/\.?0+$/, '')} м/с²`
        ],
        finalAnswer: a.toFixed(3).replace(/\.?0+$/, ''),
        unit: "m/s²",
        explanationUz: `Jism massasi ${m} kg bo'lib, unga ${F} N kuch qo'yilganda, hosil bo'ladigan tezlanish ${a.toFixed(2)} m/s² ga teng bo'ladi.`,
        explanationRu: `При воздействии силы ${F} Н на тело массой ${m} кг ускорение составит ${a.toFixed(2)} м/с².`
      };
    }
  }

  // Pattern 2: Speed and Time -> Distance (v, t -> s)
  const speedMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:m\/s|м\/с)/i);
  const timeMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:s|soniya|sekund|сек)/i);

  if (speedMatch && timeMatch) {
    const v = parseFloat(speedMatch[1].replace(',', '.'));
    const t = parseFloat(timeMatch[1].replace(',', '.'));
    const s = v * t;
    return {
      titleUz: "Tekis harakatda masofani aniqlash",
      titleRu: "Определение пройденного пути",
      given: [
        { key: "v", value: `${v} m/s`, labelUz: "Tezlik (v)", labelRu: "Скорость (v)" },
        { key: "t", value: `${t} s`, labelUz: "Vaqt (t)", labelRu: "Время (t)" }
      ],
      findUz: "s (Bosib o'tilgan yo'l, m)",
      findRu: "s (Пройденный путь, м)",
      formula: "s = v · t",
      variablesBreakdown: [
        { symbol: "v", nameUz: "Tezlik", nameRu: "Скорость", unit: "m/s" },
        { symbol: "t", nameUz: "Vaqt", nameRu: "Время", unit: "s" },
        { symbol: "s", nameUz: "Yo'l", nameRu: "Путь", unit: "m" }
      ],
      calculationStepsUz: [
        "1. Masofa formulasi: s = v · t",
        `2. Qiymatlarni qo'yamiz: s = ${v} · ${t}`,
        `3. Hisob: s = ${s.toFixed(2)} metr`
      ],
      calculationStepsRu: [
        "1. Формула пути: s = v · t",
        `2. Подставляем значения: s = ${v} · ${t}`,
        `3. Расчет: s = ${s.toFixed(2)} метров`
      ],
      finalAnswer: s.toFixed(2),
      unit: "m",
      explanationUz: `Jism o'zgarmas ${v} m/s tezlikda ${t} soniya harakatlanganda ${s.toFixed(2)} metr yo'l bosadi.`,
      explanationRu: `При равномерном движении со скоростью ${v} м/с за время ${t} с тело преодолеет ${s.toFixed(2)} м.`
    };
  }

  // Pattern 3: Voltage and Resistance -> Current (U, R -> I)
  const voltMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:v|в|volt|вольт)/i);
  const ohmMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:om|ом|ohm|Ω)/i);

  if (voltMatch && ohmMatch) {
    const U = parseFloat(voltMatch[1].replace(',', '.'));
    const R = parseFloat(ohmMatch[1].replace(',', '.'));
    if (R > 0) {
      const I = U / R;
      return {
        titleUz: "Om qonuni bo'yicha tok kuchini topish",
        titleRu: "Определение силы тока по закону Ома",
        given: [
          { key: "U", value: `${U} V`, labelUz: "Kuchlanish (U)", labelRu: "Напряжение (U)" },
          { key: "R", value: `${R} Ω`, labelUz: "Qarshilik (R)", labelRu: "Сопротивление (R)" }
        ],
        findUz: "I (Tok kuchi, A)",
        findRu: "I (Сила тока, А)",
        formula: "I = U / R",
        variablesBreakdown: [
          { symbol: "U", nameUz: "Kuchlanish", nameRu: "Напряжение", unit: "V" },
          { symbol: "R", nameUz: "Qarshilik", nameRu: "Сопротивление", unit: "Ω" },
          { symbol: "I", nameUz: "Tok kuchi", nameRu: "Сила тока", unit: "A" }
        ],
        calculationStepsUz: [
          "1. Om qonuni: I = U / R",
          `2. Qiymatlarni qo'yamiz: I = ${U} / ${R}`,
          `3. Natija: I = ${I.toFixed(3).replace(/\.?0+$/, '')} A`
        ],
        calculationStepsRu: [
          "1. Закон Ома: I = U / R",
          `2. Подставляем: I = ${U} / ${R}`,
          `3. Результат: I = ${I.toFixed(3).replace(/\.?0+$/, '')} А`
        ],
        finalAnswer: I.toFixed(3).replace(/\.?0+$/, ''),
        unit: "A",
        explanationUz: `Zanjirdagi tok kuchi kuchlanishga to'g'ri va qarshilikka teskari proportsional. U / R = ${I.toFixed(2)} A.`,
        explanationRu: `Сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению: I = ${I.toFixed(2)} А.`
      };
    }
  }

  // Default fallback sample analysis
  return SAMPLE_PROBLEMS[0].analysis;
}
