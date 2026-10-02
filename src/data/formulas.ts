import { FormulaItem } from '../types';

export const FORMULAS: FormulaItem[] = [
  // Mexanika & Kinematika
  {
    id: 'f_speed',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    latex: 'v = \\frac{s}{t}',
    titleUz: 'Tezlik formulasi',
    titleRu: 'Формула скорости',
    meaningUz: "Jismning vaqt birligi ichida bosib o'tgan masofasini aniqlaydi.",
    meaningRu: 'Определяет расстояние, пройденное телом за единицу времени.',
    variables: [
      { symbol: 'v', nameUz: 'Tezlik', nameRu: 'Скорость', unit: 'm/s' },
      { symbol: 's', nameUz: 'Bosib o\'tilgan masofa', nameRu: 'Пройденный путь', unit: 'm' },
      { symbol: 't', nameUz: 'Harakat vaqti', nameRu: 'Время движения', unit: 's' }
    ],
    siUnit: 'm/s',
    whenToUseUz: "Jism tekis to'g'ri chiziqli harakat qilganda masofa va vaqt ma'lum bo'lsa.",
    whenToUseRu: 'При прямолинейном равномерном движении, когда известны путь и время.',
    exampleUz: 's = 100 m, t = 10 s bo\'lsa: v = 100 / 10 = 10 m/s.',
    exampleRu: 'Если s = 100 м, t = 10 с, то v = 100 / 10 = 10 м/с.'
  },
  {
    id: 'f_distance',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    latex: 's = v \\cdot t',
    titleUz: 'Bosib o\'tilgan masofa',
    titleRu: 'Пройденный путь',
    meaningUz: "O'zgarmas tezlik bilan harakatlanayotgan jismning bosib o'tgan yo'li.",
    meaningRu: 'Путь, пройденный телом при постоянной скорости движения.',
    variables: [
      { symbol: 's', nameUz: 'Masofa', nameRu: 'Путь', unit: 'm' },
      { symbol: 'v', nameUz: 'Tezlik', nameRu: 'Скорость', unit: 'm/s' },
      { symbol: 't', nameUz: 'Vaqt', nameRu: 'Время', unit: 's' }
    ],
    siUnit: 'm',
    whenToUseUz: "Tezlik va vaqt berilgan bo'lib, bosib o'tilgan yo'lni topish zarur bo'lganda.",
    whenToUseRu: 'Когда известны скорость и время, и нужно найти пройденный путь.',
    exampleUz: 'v = 15 m/s, t = 4 s bo\'lsa: s = 15 * 4 = 60 m.',
    exampleRu: 'Если v = 15 м/с, t = 4 с, то s = 15 * 4 = 60 м.'
  },
  {
    id: 'f_time',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    latex: 't = \\frac{s}{v}',
    titleUz: 'Harakat vaqti',
    titleRu: 'Время движения',
    meaningUz: "Berilgan tezlikda ma'lum masofani bosib o'tish uchun ketgan vaqt.",
    meaningRu: 'Время, требуемое для прохождения расстояния с постоянной скоростью.',
    variables: [
      { symbol: 't', nameUz: 'Vaqt', nameRu: 'Время', unit: 's' },
      { symbol: 's', nameUz: 'Masofa', nameRu: 'Путь', unit: 'm' },
      { symbol: 'v', nameUz: 'Tezlik', nameRu: 'Скорость', unit: 'm/s' }
    ],
    siUnit: 's',
    whenToUseUz: "Masofa va tezlik ma'lum bo'lganda safar vaqtini hisoblashda.",
    whenToUseRu: 'Для расчета длительности пути при известном расстоянии и скорости.',
    exampleUz: 's = 500 m, v = 25 m/s bo\'lsa: t = 500 / 25 = 20 s.',
    exampleRu: 'Если s = 500 м, v = 25 м/с, то t = 500 / 25 = 20 с.'
  },
  {
    id: 'f_acceleration',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    latex: 'a = \\frac{v - v_0}{t}',
    titleUz: 'Tezlanish',
    titleRu: 'Ускорение',
    meaningUz: "Tezlikning vaqt birligi ichidagi o'zgarish kattaligi.",
    meaningRu: 'Величина изменения скорости за единицу времени.',
    variables: [
      { symbol: 'a', nameUz: 'Tezlanish', nameRu: 'Ускорение', unit: 'm/s²' },
      { symbol: 'v', nameUz: 'Oxirgi tezlik', nameRu: 'Конечная скорость', unit: 'm/s' },
      { symbol: 'v0', nameUz: 'Boshlang\'ich tezlik', nameRu: 'Начальная скорость', unit: 'm/s' },
      { symbol: 't', nameUz: 'Vaqt', nameRu: 'Время', unit: 's' }
    ],
    siUnit: 'm/s²',
    whenToUseUz: "Tezlik bir tekis o'zgarayotganda vaqt bo'yicha tezlanishni topishda.",
    whenToUseRu: 'При равноускоренном или равнозамедленном прямолинейном движении.',
    exampleUz: 'v0 = 0 m/s, v = 20 m/s, t = 5 s bo\'lsa: a = (20 - 0) / 5 = 4 m/s².',
    exampleRu: 'Если v0 = 0 м/с, v = 20 м/с, t = 5 с, то a = 20 / 5 = 4 м/с².'
  },
  {
    id: 'f_accel_distance',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    latex: 's = v_0 t + \\frac{a t^2}{2}',
    titleUz: 'Tezlanuvchan harakatda yo\'l',
    titleRu: 'Путь при равноускоренном движении',
    meaningUz: "Boshlang'ich tezlik va o'zgarmas tezlanish bilan o'tilgan to'liq masofa.",
    meaningRu: 'Полный путь при равноускоренном прямолинейном движении с начальной скоростью.',
    variables: [
      { symbol: 's', nameUz: 'Masofa', nameRu: 'Путь', unit: 'm' },
      { symbol: 'v0', nameUz: 'Boshlang\'ich tezlik', nameRu: 'Начальная скорость', unit: 'm/s' },
      { symbol: 'a', nameUz: 'Tezlanish', nameRu: 'Ускорение', unit: 'm/s²' },
      { symbol: 't', nameUz: 'Vaqt', nameRu: 'Время', unit: 's' }
    ],
    siUnit: 'm',
    whenToUseUz: "Boshlang'ich tezlik, tezlanish va vaqt berilganda o'tilgan masofani topishda.",
    whenToUseRu: 'Для нахождения расстояния при известном ускорении и времени разгона.',
    exampleUz: 'v0 = 0, a = 2 m/s², t = 3 s bo\'lsa: s = (2 * 9) / 2 = 9 m.',
    exampleRu: 'При v0 = 0, a = 2 м/с², t = 3 с: s = (2 * 9) / 2 = 9 м.'
  },

  // Dinamika
  {
    id: 'f_newton2',
    category: 'dinamika',
    categoryUz: 'Dinamika',
    categoryRu: 'Динамика',
    latex: 'F = m \\cdot a',
    titleUz: 'Nyutonning ikkinchi qonuni',
    titleRu: 'Второй закон Ньютона',
    meaningUz: "Jismga ta'sir qiluvchi kuch uning massasi va olgan tezlanishi ko'paytmasiga teng.",
    meaningRu: 'Сила равна произведению массы тела на сообщаемое ему ускорение.',
    variables: [
      { symbol: 'F', nameUz: 'Kuch', nameRu: 'Сила', unit: 'N' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'a', nameUz: 'Tezlanish', nameRu: 'Ускорение', unit: 'm/s²' }
    ],
    siUnit: 'N (Nyuton)',
    whenToUseUz: "Massa va tezlanish ma'lum bo'lganda kuchni yoki kuch va massa berilganda tezlanishni topishda.",
    whenToUseRu: 'Основной закон динамики для связи силы, массы и ускорения.',
    exampleUz: 'm = 5 kg, a = 4 m/s² bo\'lsa: F = 5 * 4 = 20 N.',
    exampleRu: 'При m = 5 кг, a = 4 м/с²: F = 5 * 4 = 20 Н.'
  },
  {
    id: 'f_gravity_weight',
    category: 'dinamika',
    categoryUz: 'Dinamika',
    categoryRu: 'Динамика',
    latex: 'P = m \\cdot g',
    titleUz: 'Og\'irlik kuchi',
    titleRu: 'Сила тяжести',
    meaningUz: "Yer (yoki boshqa osmon jismi) tomonidan jismga beriladigan gravitatsion tortishish kuchi.",
    meaningRu: 'Сила, с которой Земля притягивает к себе тело массы m.',
    variables: [
      { symbol: 'P', nameUz: 'Og\'irlik kuchi', nameRu: 'Сила тяжести', unit: 'N' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'g', nameUz: 'Erkin tushish tezlanishi (~9.8)', nameRu: 'Ускорение своб. падения', unit: 'm/s²' }
    ],
    siUnit: 'N (Nyuton)',
    whenToUseUz: "Jismning Yer sirtidagi og'irligi yoki tortishish kuchini hisoblashda.",
    whenToUseRu: 'Для расчета веса тела и силы притяжения на поверхности планеты.',
    exampleUz: 'm = 10 kg, g = 9.8 m/s² bo\'lsa: P = 10 * 9.8 = 98 N.',
    exampleRu: 'При m = 10 кг, g = 9.8 м/с²: P = 10 * 9.8 = 98 Н.'
  },
  {
    id: 'f_friction',
    category: 'dinamika',
    categoryUz: 'Dinamika',
    categoryRu: 'Динамика',
    latex: 'F_{ishq} = \\mu \\cdot N',
    titleUz: 'Ishqalanish kuchi',
    titleRu: 'Сила трения скольжения',
    meaningUz: "Sirtlar orasidagi nisbiy sirpanishga qarshilik ko'rsatuvchi kuch.",
    meaningRu: 'Сила, возникающая при соприкосновении тел и препятствующая их относительному движению.',
    variables: [
      { symbol: 'Fishq', nameUz: 'Ishqalanish kuchi', nameRu: 'Сила трения', unit: 'N' },
      { symbol: 'μ', nameUz: 'Ishqalanish koeffitsienti', nameRu: 'Коэффициент трения', unit: 'o\'lchovsiz' },
      { symbol: 'N', nameUz: 'Normal reaksiya kuchi', nameRu: 'Сила реакции опоры', unit: 'N' }
    ],
    siUnit: 'N (Nyuton)',
    whenToUseUz: "Sirtlar orasidagi ishqalanishni va tormozlanish kuchini hisoblashda.",
    whenToUseRu: 'Для расчета сопротивления скольжению между контактирующими поверхностями.',
    exampleUz: 'μ = 0.2, N = 50 N bo\'lsa: Fishq = 0.2 * 50 = 10 N.',
    exampleRu: 'При μ = 0.2, N = 50 Н: Fтр = 0.2 * 50 = 10 Н.'
  },
  {
    id: 'f_hooke',
    category: 'dinamika',
    categoryUz: 'Dinamika',
    categoryRu: 'Динамика',
    latex: 'F_{el} = -k \\cdot x',
    titleUz: 'Guk qonuni (Elastiklik kuchi)',
    titleRu: 'Закон Гука (Сила упругости)',
    meaningUz: "Prujinaning deformatsiyalanishida yuzaga keladigan va cho'zilishga qarama-qarshi yo'nalgan kuch.",
    meaningRu: 'Сила упругости, возникающая при малой деформации пружины или стержня.',
    variables: [
      { symbol: 'Fel', nameUz: 'Elastiklik kuchi', nameRu: 'Сила упругости', unit: 'N' },
      { symbol: 'k', nameUz: 'Bikrlik koeffitsienti', nameRu: 'Жесткость пружины', unit: 'N/m' },
      { symbol: 'x', nameUz: 'Deformatsiya (cho\'zilish)', nameRu: 'Абсолютная деформация', unit: 'm' }
    ],
    siUnit: 'N (Nyuton)',
    whenToUseUz: "Prujina, amortizator yoki rezina cho'zilishi yoki siqilishini hisoblashda.",
    whenToUseRu: 'При расчете растяжения и сжатия пружин и амортизаторов.',
    exampleUz: 'k = 100 N/m, x = 0.05 m bo\'lsa: F = 100 * 0.05 = 5 N.',
    exampleRu: 'При k = 100 Н/м, x = 0.05 м: F = 100 * 0.05 = 5 Н.'
  },

  // Ish va energiya
  {
    id: 'f_work',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    latex: 'A = F \\cdot s \\cdot \\cos(\\alpha)',
    titleUz: 'Mexanik ish',
    titleRu: 'Механическая работа',
    meaningUz: "Kuch ta'sirida jism ko'chganda bajarilgan ish miqdori.",
    meaningRu: 'Мера действия силы на перемещение тела в пространстве.',
    variables: [
      { symbol: 'A', nameUz: 'Ish', nameRu: 'Работа', unit: 'J (Joul)' },
      { symbol: 'F', nameUz: 'Kuch', nameRu: 'Сила', unit: 'N' },
      { symbol: 's', nameUz: 'Ko\'chish', nameRu: 'Перемещение', unit: 'm' },
      { symbol: 'α', nameUz: 'Kuch va ko\'chish orasidagi burchak', nameRu: 'Угол между F и s', unit: 'gradus' }
    ],
    siUnit: 'J (Joul)',
    whenToUseUz: "Kuch ta'sirida jism harakatlanganda bajarilgan ishni aniqlashda.",
    whenToUseRu: 'Для нахождения затраченной механической работы при перемещении груза.',
    exampleUz: 'F = 20 N, s = 5 m, α = 0° (cos 0° = 1): A = 20 * 5 = 100 J.',
    exampleRu: 'При F = 20 Н, s = 5 м, α = 0°: A = 20 * 5 = 100 Дж.'
  },
  {
    id: 'f_power',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    latex: 'P = \\frac{A}{t}',
    titleUz: 'Mexanik quvvat',
    titleRu: 'Механическая мощность',
    meaningUz: "Bajarilgan ishning shu ish bajarilgan vaqtga nisbati (ish bajarish tezligi).",
    meaningRu: 'Скорость совершения механической работы во времени.',
    variables: [
      { symbol: 'P', nameUz: 'Quvvat', nameRu: 'Мощность', unit: 'W (Vatt)' },
      { symbol: 'A', nameUz: 'Ish', nameRu: 'Работа', unit: 'J' },
      { symbol: 't', nameUz: 'Vaqt', nameRu: 'Время', unit: 's' }
    ],
    siUnit: 'W (Vatt)',
    whenToUseUz: "Dvigatel, mashina yoki odamning quvvatini aniqlashda.",
    whenToUseRu: 'Для оценки производительности двигателя или устройства.',
    exampleUz: 'A = 5000 J, t = 10 s bo\'lsa: P = 5000 / 10 = 500 W.',
    exampleRu: 'При A = 5000 Дж, t = 10 с: P = 5000 / 10 = 500 Вт.'
  },
  {
    id: 'f_kinetic_energy',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    latex: 'E_k = \\frac{m v^2}{2}',
    titleUz: 'Kinetik energiya',
    titleRu: 'Кинетическая энергия',
    meaningUz: "Harakatdagi jismning tezligi hisobiga ega bo'lgan mexanik energiyasi.",
    meaningRu: 'Энергия, которой обладает тело вследствие своего движения.',
    variables: [
      { symbol: 'Ek', nameUz: 'Kinetik energiya', nameRu: 'Кинетическая энергия', unit: 'J' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'v', nameUz: 'Tezlik', nameRu: 'Скорость', unit: 'm/s' }
    ],
    siUnit: 'J (Joul)',
    whenToUseUz: "Harakatdagi avtomobil, to'p yoki zarrachaning harakat energiyasini hisoblashda.",
    whenToUseRu: 'При расчете энергии движущихся транспортных средств или тел.',
    exampleUz: 'm = 2 kg, v = 6 m/s bo\'lsa: Ek = (2 * 36) / 2 = 36 J.',
    exampleRu: 'При m = 2 кг, v = 6 м/с: Ek = (2 * 36) / 2 = 36 Дж.'
  },
  {
    id: 'f_potential_energy',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    latex: 'E_p = m \\cdot g \\cdot h',
    titleUz: 'Potensial energiya',
    titleRu: 'Потенциальная энергия',
    meaningUz: "Jismning yer sirtidan ma'lum balandlikka ko'tarilishi tufayli to'plagan zaxira energiyasi.",
    meaningRu: 'Энергия взаимодействия тела с Землей, зависящая от высоты подъема.',
    variables: [
      { symbol: 'Ep', nameUz: 'Potensial energiya', nameRu: 'Потенциальная энергия', unit: 'J' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'g', nameUz: 'Erkin tushish tezlanishi (~9.8)', nameRu: 'g (~9.8)', unit: 'm/s²' },
      { symbol: 'h', nameUz: 'Balandlik', nameRu: 'Высота', unit: 'm' }
    ],
    siUnit: 'J (Joul)',
    whenToUseUz: "Balandlikdagi jismning to'plagan gravitatsion energiyasini hisoblashda.",
    whenToUseRu: 'Для нахождения запаса потенциальной энергии поднятого груза или воды в плотине.',
    exampleUz: 'm = 5 kg, g = 9.8 m/s², h = 4 m: Ep = 5 * 9.8 * 4 = 196 J.',
    exampleRu: 'При m = 5 кг, g = 9.8 м/с², h = 4 м: Ep = 5 * 9.8 * 4 = 196 Дж.'
  },

  // Impuls
  {
    id: 'f_momentum',
    category: 'impuls',
    categoryUz: 'Impuls',
    categoryRu: 'Импульс',
    latex: 'p = m \\cdot v',
    titleUz: 'Jism impulsi (Harakat miqdori)',
    titleRu: 'Импульс тела',
    meaningUz: "Jism massasi va uning tezligining vektor ko'paytmasi.",
    meaningRu: 'Мера механического движения тела, равная произведению массы на скорость.',
    variables: [
      { symbol: 'p', nameUz: 'Impuls', nameRu: 'Импульс', unit: 'kg·m/s' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'v', nameUz: 'Tezlik', nameRu: 'Скорость', unit: 'm/s' }
    ],
    siUnit: 'kg·m/s',
    whenToUseUz: "To'qnashuvlar, zarbalar va reaktiv harakatni tahlil qilishda.",
    whenToUseRu: 'При анализе ударов, соударений и реактивного движения.',
    exampleUz: 'm = 3 kg, v = 8 m/s bo\'lsa: p = 3 * 8 = 24 kg·m/s.',
    exampleRu: 'При m = 3 кг, v = 8 м/с: p = 3 * 8 = 24 кг·м/с.'
  },

  // Zichlik va Bosim
  {
    id: 'f_density',
    category: 'mexanika',
    categoryUz: 'Mexanika',
    categoryRu: 'Механика',
    latex: '\\rho = \\frac{m}{V}',
    titleUz: 'Modda zichligi',
    titleRu: 'Плотность вещества',
    meaningUz: "Moddaning hajm birligidagi massasi.",
    meaningRu: 'Масса вещества, содержащаяся в единице объема.',
    variables: [
      { symbol: 'ρ', nameUz: 'Zichlik', nameRu: 'Плотность', unit: 'kg/m³' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'V', nameUz: 'Hajm', nameRu: 'Объем', unit: 'm³' }
    ],
    siUnit: 'kg/m³',
    whenToUseUz: "Jismning massasi va hajmi orqali modda turini yoki zichligini aniqlashda.",
    whenToUseRu: 'Для вычисления плотности материала по массе и объему.',
    exampleUz: 'm = 800 kg, V = 1 m³ bo\'lsa: ρ = 800 kg/m³ (moy zichligi).',
    exampleRu: 'При m = 800 кг, V = 1 м³: ρ = 800 кг/м³.'
  },
  {
    id: 'f_pressure',
    category: 'mexanika',
    categoryUz: 'Mexanika',
    categoryRu: 'Механика',
    latex: 'p = \\frac{F}{S}',
    titleUz: 'Bosim formulasi',
    titleRu: 'Давление твердых тел',
    meaningUz: "Sirtga tik ta'sir qiluvchi kuchning sirt yuziga nisbati.",
    meaningRu: 'Отношение силы, действующей перпендикулярно поверхности, к площади этой поверхности.',
    variables: [
      { symbol: 'p', nameUz: 'Bosim', nameRu: 'Давление', unit: 'Pa (Paskal)' },
      { symbol: 'F', nameUz: 'Kuch', nameRu: 'Сила давления', unit: 'N' },
      { symbol: 'S', nameUz: 'Yuza', nameRu: 'Площадь', unit: 'm²' }
    ],
    siUnit: 'Pa (Paskal)',
    whenToUseUz: "Jismning tayanch yuziga beradigan bosimini aniqlashda.",
    whenToUseRu: 'При расчете давления опор, колес или фундамента на грунт.',
    exampleUz: 'F = 1000 N, S = 0.5 m² bo\'lsa: p = 1000 / 0.5 = 2000 Pa (2 kPa).',
    exampleRu: 'При F = 1000 Н, S = 0.5 м²: p = 1000 / 0.5 = 2000 Па.'
  },
  {
    id: 'f_hydrostatic',
    category: 'mexanika',
    categoryUz: 'Mexanika',
    categoryRu: 'Механика',
    latex: 'p = \\rho \\cdot g \\cdot h',
    titleUz: 'Gidrostatik bosim',
    titleRu: 'Гидростатическое давление',
    meaningUz: "Suyuqlik ustunining o'z og'irligi hisobiga idish tubiga va devorlariga ko'rsatadigan bosimi.",
    meaningRu: 'Давление столба покоящейся жидкости на дно и стенки сосуда.',
    variables: [
      { symbol: 'p', nameUz: 'Gidrostatik bosim', nameRu: 'Давление жидкости', unit: 'Pa' },
      { symbol: 'ρ', nameUz: 'Suyuqlik zichligi', nameRu: 'Плотность жидкости', unit: 'kg/m³' },
      { symbol: 'g', nameUz: 'g (~9.8)', nameRu: 'g (~9.8)', unit: 'm/s²' },
      { symbol: 'h', nameUz: 'Chuqurlik', nameRu: 'Глубина столба', unit: 'm' }
    ],
    siUnit: 'Pa (Paskal)',
    whenToUseUz: "Dengiz, suv ombori yoki idishdagi suyuqlik bosimini hisoblashda.",
    whenToUseRu: 'Для расчета давления воды на глубине или в гидравлических системах.',
    exampleUz: 'Suvda (ρ = 1000 kg/m³) h = 10 m chuqurlikda: p = 1000 * 9.8 * 10 = 98 000 Pa (~1 atm).',
    exampleRu: 'В воде при h = 10 м: p = 1000 * 9.8 * 10 = 98 000 Па.'
  },
  {
    id: 'f_archimedes',
    category: 'mexanika',
    categoryUz: 'Mexanika',
    categoryRu: 'Механика',
    latex: 'F_A = \\rho \\cdot g \\cdot V_{botgan}',
    titleUz: 'Arximed kuchi',
    titleRu: 'Сила Архимеда',
    meaningUz: "Suyuqlik yoki gazga botirilgan jismni yuqoriga itarib chiqaruvchi ko'tarish kuchi.",
    meaningRu: 'Выталкивающая сила, действующая на погруженное в жидкость или газ тело.',
    variables: [
      { symbol: 'FA', nameUz: 'Arximed kuchi', nameRu: 'Сила Архимеда', unit: 'N' },
      { symbol: 'ρ', nameUz: 'Suyuqlik zichligi', nameRu: 'Плотность среды', unit: 'kg/m³' },
      { symbol: 'V', nameUz: 'Botgan qism hajmi', nameRu: 'Погруженный объем', unit: 'm³' }
    ],
    siUnit: 'N (Nyuton)',
    whenToUseUz: "Kemalar suzishi, havo sharlarining ko'tarilishi yoki jismning suyuqlikda cho'kishini hisoblashda.",
    whenToUseRu: 'При расчете плавания судов и подъемной силы аэростатов.',
    exampleUz: 'ρ = 1000 kg/m³, V = 0.02 m³ bo\'lsa: FA = 1000 * 9.8 * 0.02 = 196 N.',
    exampleRu: 'При ρ = 1000 кг/м³, V = 0.02 м³: FA = 1000 * 9.8 * 0.02 = 196 Н.'
  },

  // Termodinamika
  {
    id: 'f_heat_capacity',
    category: 'termodinamika',
    categoryUz: 'Termodinamika',
    categoryRu: 'Термодинамика',
    latex: 'Q = c \\cdot m \\cdot \\Delta T',
    titleUz: 'Isitishdagi issiqlik miqdori',
    titleRu: 'Теплота при нагревании / охлаждении',
    meaningUz: "Jismni ma'lum haroratgacha isitish yoki sovutishda beriladigan / ajraladigan issiqlik miqdori.",
    meaningRu: 'Количество теплоты, необходимое для изменения температуры тела массы m на ΔT.',
    variables: [
      { symbol: 'Q', nameUz: 'Issiqlik miqdori', nameRu: 'Количество теплоты', unit: 'J' },
      { symbol: 'c', nameUz: 'Solishtirma issiqlik sig\'imi', nameRu: 'Удельная теплоемкость', unit: 'J/(kg·°C)' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'ΔT', nameUz: 'Harorat o\'zgarishi (T2 - T1)', nameRu: 'Изменение температуры', unit: '°C yoki K' }
    ],
    siUnit: 'J (Joul)',
    whenToUseUz: "Suv yoki metallni qizdirishda sarflanadigan issiqlik energiyasini hisoblashda.",
    whenToUseRu: 'Для расчета теплоты при нагревании или охлаждении любых тел.',
    exampleUz: 'c = 4200 (suv), m = 1 kg, ΔT = 50 °C: Q = 4200 * 1 * 50 = 210 000 J = 210 kJ.',
    exampleRu: 'Для воды: c = 4200, m = 1 кг, ΔT = 50 °C: Q = 4200 * 1 * 50 = 210 кДж.'
  },
  {
    id: 'f_combustion',
    category: 'termodinamika',
    categoryUz: 'Termodinamika',
    categoryRu: 'Термодинамика',
    latex: 'Q = q \\cdot m',
    titleUz: 'Yoqilg\'i yonishidagi issiqlik',
    titleRu: 'Теплота сгорания топлива',
    meaningUz: "m massali yoqilg'i to'liq yonganda ajralib chiqadigan umumiy issiqlik miqdori.",
    meaningRu: 'Количество теплоты, выделяющееся при полном сгорании топлива массой m.',
    variables: [
      { symbol: 'Q', nameUz: 'Issiqlik', nameRu: 'Теплота сгорания', unit: 'J' },
      { symbol: 'q', nameUz: 'Solishtirma yonish issiqligi', nameRu: 'Удельная теплота сгорания', unit: 'J/kg' },
      { symbol: 'm', nameUz: 'Yoqilg\'i massasi', nameRu: 'Масса топлива', unit: 'kg' }
    ],
    siUnit: 'J (Joul)',
    whenToUseUz: "Benzin, gaz yoki ko'mir yonganda qancha energiya ajralishini hisoblashda.",
    whenToUseRu: 'При расчете энергии от сгорания бензина, угля или газа.',
    exampleUz: 'q = 44×10⁶ J/kg (benzin), m = 2 kg bo\'lsa: Q = 88×10⁶ J = 88 MJ.',
    exampleRu: 'При q = 44×10⁶ Дж/кг, m = 2 кг: Q = 88 МДж.'
  },

  // Elektr & Om qonuni
  {
    id: 'f_ohm',
    category: 'elektr',
    categoryUz: 'Elektr',
    categoryRu: 'Электричество',
    latex: 'I = \\frac{U}{R}',
    titleUz: 'Om qonuni',
    titleRu: 'Закон Ома',
    meaningUz: "Zanjir qismidagi tok kuchi kuchlanishga to'g'ri, qarshilikka teskari proportsional.",
    meaningRu: 'Сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению цепи.',
    variables: [
      { symbol: 'I', nameUz: 'Tok kuchi', nameRu: 'Сила тока', unit: 'A (Amper)' },
      { symbol: 'U', nameUz: 'Kuchlanish', nameRu: 'Напряжение', unit: 'V (Volt)' },
      { symbol: 'R', nameUz: 'Qarshilik', nameRu: 'Сопротивление', unit: 'Ω (Om)' }
    ],
    siUnit: 'A (Amper)',
    whenToUseUz: "Elektr zanjiridagi tok, kuchlanish yoki qarshilikni aniqlashda asosiy qonun.",
    whenToUseRu: 'Главный закон для расчета электрических цепей постоянного тока.',
    exampleUz: 'U = 220 V, R = 11 Ω bo\'lsa: I = 220 / 11 = 20 A.',
    exampleRu: 'При U = 220 В, R = 11 Ом: I = 220 / 11 = 20 А.'
  },
  {
    id: 'f_electric_power',
    category: 'elektr',
    categoryUz: 'Elektr',
    categoryRu: 'Электричество',
    latex: 'P = U \\cdot I',
    titleUz: 'Elektr toki quvvati',
    titleRu: 'Мощность электрического тока',
    meaningUz: "Vaqt birligida elektr maydoni bajargan ish tezligi.",
    meaningRu: 'Произведение напряжения на концах участка цепи на силу тока в нем.',
    variables: [
      { symbol: 'P', nameUz: 'Elektr quvvati', nameRu: 'Мощность', unit: 'W (Vatt)' },
      { symbol: 'U', nameUz: 'Kuchlanish', nameRu: 'Напряжение', unit: 'V' },
      { symbol: 'I', nameUz: 'Tok kuchi', nameRu: 'Сила тока', unit: 'A' }
    ],
    siUnit: 'W (Vatt)',
    whenToUseUz: "Maishiy asboblar (lampochka, dazmol, choynak) quvvatini hisoblashda.",
    whenToUseRu: 'Для расчета энергопотребления электрических приборов.',
    exampleUz: 'U = 220 V, I = 2 A bo\'lsa: P = 220 * 2 = 440 W.',
    exampleRu: 'При U = 220 В, I = 2 А: P = 220 * 2 = 440 Вт.'
  },
  {
    id: 'f_joule_lenz',
    category: 'elektr',
    categoryUz: 'Elektr',
    categoryRu: 'Электричество',
    latex: 'Q = I^2 \\cdot R \\cdot t',
    titleUz: 'Joul - Lens qonuni',
    titleRu: 'Закон Джоуля — Ленца',
    meaningUz: "O'tkazgichdan tok o'tganda ajralib chiqadigan issiqlik miqdori.",
    meaningRu: 'Теплота, выделяемая проводником с током при протекании через него электричества.',
    variables: [
      { symbol: 'Q', nameUz: 'Ajralgan issiqlik', nameRu: 'Теплота', unit: 'J' },
      { symbol: 'I', nameUz: 'Tok kuchi', nameRu: 'Сила тока', unit: 'A' },
      { symbol: 'R', nameUz: 'Qarshilik', nameRu: 'Сопротивление', unit: 'Ω' },
      { symbol: 't', nameUz: 'Vaqt', nameRu: 'Время', unit: 's' }
    ],
    siUnit: 'J (Joul)',
    whenToUseUz: "Elektr isitgichlar, simlarning qizishi yoki eruvchan saqlagichlarni hisoblashda.",
    whenToUseRu: 'При расчете нагрева проводов, спиралей электроплиток и тепловыделения.',
    exampleUz: 'I = 2 A, R = 10 Ω, t = 5 s: Q = (2²) * 10 * 5 = 4 * 50 = 200 J.',
    exampleRu: 'При I = 2 А, R = 10 Ом, t = 5 с: Q = 4 * 10 * 5 = 200 Дж.'
  },

  // To'lqinlar & Optika
  {
    id: 'f_wave_speed',
    category: 'tolqinlar',
    categoryUz: 'To‘lqinlar',
    categoryRu: 'Волны',
    latex: 'v = \\lambda \\cdot f',
    titleUz: 'To\'lqin tarqalish tezligi',
    titleRu: 'Скорость распространения волны',
    meaningUz: "To'lqin uzunligi va tebranish chastotasining ko'paytmasi.",
    meaningRu: 'Произведение длины волны на частоту колебаний.',
    variables: [
      { symbol: 'v', nameUz: 'Tezlik', nameRu: 'Скорость', unit: 'm/s' },
      { symbol: 'λ', nameUz: 'To\'lqin uzunligi', nameRu: 'Длина волны', unit: 'm' },
      { symbol: 'f', nameUz: 'Chastota', nameRu: 'Частота', unit: 'Hz' }
    ],
    siUnit: 'm/s',
    whenToUseUz: "Tovush, radio yoki yorug'lik to'lqinlarining uzunligi va chastotasini bog'lashda.",
    whenToUseRu: 'Для связи частоты и длины звуковых, радио- и световых волн.',
    exampleUz: 'λ = 0.5 m, f = 680 Hz bo\'lsa: v = 0.5 * 680 = 340 m/s (havoda tovush tezligi).',
    exampleRu: 'При λ = 0.5 м, f = 680 Гц: v = 340 м/с (скорость звука).'
  },
  {
    id: 'f_period_frequency',
    category: 'tolqinlar',
    categoryUz: 'To‘lqinlar',
    categoryRu: 'Волны',
    latex: 'T = \\frac{1}{f}',
    titleUz: 'Tebranish davri va chastotasi',
    titleRu: 'Период и частота колебаний',
    meaningUz: "Davr (bir to'liq tebranish vaqti) chastotaga teskari proportsional.",
    meaningRu: 'Связь периода одного полного колебания и циклической частоты.',
    variables: [
      { symbol: 'T', nameUz: 'Davr', nameRu: 'Период', unit: 's' },
      { symbol: 'f', nameUz: 'Chastota', nameRu: 'Частота', unit: 'Hz' }
    ],
    siUnit: 's',
    whenToUseUz: "Mayatnik yoki to'lqinning davri va chastotasi o'rtasida o'tishda.",
    whenToUseRu: 'При пересчете периода колебаний маятника в частоту и наоборот.',
    exampleUz: 'f = 50 Hz (tarmoq chastotasi) bo\'lsa: T = 1 / 50 = 0.02 s (20 ms).',
    exampleRu: 'При f = 50 Гц: T = 1 / 50 = 0.02 с (20 мс).'
  },
  {
    id: 'f_lens_power',
    category: 'optika',
    categoryUz: 'Optika',
    categoryRu: 'Оптика',
    latex: 'D = \\frac{1}{F}',
    titleUz: 'Linzaning optik kuchi',
    titleRu: 'Оптическая сила линзы',
    meaningUz: "Linzaning fokus masofasiga teskari miqdor bo'lib, nurlarni sindirish quvvatini bildiradi.",
    meaningRu: 'Величина, обратная фокусному расстоянию, мера преломляющей способности.',
    variables: [
      { symbol: 'D', nameUz: 'Optik kuch', nameRu: 'Оптическая сила', unit: 'dptr (dioptriya)' },
      { symbol: 'F', nameUz: 'Fokus masofasi', nameRu: 'Фокусное расстояние', unit: 'm' }
    ],
    siUnit: 'dptr',
    whenToUseUz: "Ko'zoynak, mikroskop va linzalarning optik kuchini hisoblashda.",
    whenToUseRu: 'Для подбора очковых и контактных линз и расчета оптических систем.',
    exampleUz: 'F = 0.5 m bo\'lsa: D = 1 / 0.5 = +2 dptr.',
    exampleRu: 'При F = 0.5 м: D = 1 / 0.5 = +2 дптр.'
  },

  // Zamonaviy fizika
  {
    id: 'f_einstein_mass_energy',
    category: 'yadro_fizikasi',
    categoryUz: 'Yadro fizikasi',
    categoryRu: 'Ядерная физика',
    latex: 'E = m \\cdot c^2',
    titleUz: 'Massa va energiya ekvivalentligi',
    titleRu: 'Эквивалентность массы и энергии',
    meaningUz: "Har qanday massaga ega jism o'zida yorug'lik tezligi kvadrati bilan o'lchanadigan ulkan energiya saqlaydi.",
    meaningRu: 'Фундаментальное соотношение между массой покоя и полной энергией вещества.',
    variables: [
      { symbol: 'E', nameUz: 'To\'liq energiya', nameRu: 'Полная энергия', unit: 'J' },
      { symbol: 'm', nameUz: 'Massa', nameRu: 'Масса', unit: 'kg' },
      { symbol: 'c', nameUz: 'Yorug\'lik tezligi (~3×10⁸)', nameRu: 'Скорость света (~3×10⁸)', unit: 'm/s' }
    ],
    siUnit: 'J (Joul)',
    whenToUseUz: "Yadro reaksiyalari, massa defekti va yadro energiyasini aniqlashda.",
    whenToUseRu: 'В ядерных реакциях и расчетах выделения энергии в звездах и реакторах.',
    exampleUz: 'm = 1 kg materiya uchun: E = 1 * (3×10⁸)² = 9×10¹⁶ J.',
    exampleRu: 'Для 1 кг массы: E = 1 * 9×10¹⁶ = 9×10¹⁶ Дж.'
  }
];
