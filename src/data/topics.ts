import { TopicItem } from '../types';

export const TOPICS: TopicItem[] = [
  {
    id: 'mexanika',
    number: 1,
    categoryUz: 'Mexanika',
    categoryRu: 'Механика',
    summaryUz: "Jismlarning fazoda vaqt bo'yicha bir-biriga nisbatan o'zaro joylashuvi va harakatini, shuningdek harakat sabablarini o'rganuvchi fizika bo'limi.",
    summaryRu: 'Раздел физики, изучающий движение материальных тел во времени и пространстве, а также взаимодействия между ними.',
    definitions: [
      {
        termUz: "Mexanik harakat",
        termRu: "Механическое движение",
        defUz: "Vaqt o'tishi bilan jismning fazodagi vaziyatining boshqa jismlarga nisbatan o'zgarishi.",
        defRu: "Изменение положения тела в пространстве относительно других тел с течением времени."
      },
      {
        termUz: "Moddiy nuqta",
        termRu: "Материальная точка",
        defUz: "Berilgan sharoitda o'lchamlari va shakli hisobga olinmasa ham bo'ladigan jism.",
        defRu: "Тело, размерами и формой которого в данных условиях движения можно пренебречь."
      }
    ],
    mainFormulas: [
      {
        latex: "v = \\frac{s}{t}",
        titleUz: "Tekis harakat tezligi",
        titleRu: "Скорость равномерного движения",
        variables: [
          { symbol: "v", nameUz: "Tezlik", nameRu: "Скорость", unit: "m/s" },
          { symbol: "s", nameUz: "Yo'l", nameRu: "Путь", unit: "m" },
          { symbol: "t", nameUz: "Vaqt", nameRu: "Время", unit: "s" }
        ]
      }
    ],
    realLifeUz: [
      "Poyezdning Toshkentdan Samarqandgacha harakati va jadval bo'yicha tezligi.",
      "Soat strelkasining sirkulyar mexanik harakati."
    ],
    realLifeRu: [
      "Движение скоростного поезда по маршруту с постоянной скоростью.",
      "Вращательное движение стрелок механических часов."
    ],
    solvedExample: {
      problemUz: "Poyezd 180 km masofani 2 soatda bosib o'tdi. Uning o'rtacha tezligini toping (m/s da).",
      problemRu: "Поезд преодолел расстояние 180 км за 2 часа. Найдите его среднюю скорость в м/с.",
      given: [
        { key: "s", value: "180 km = 180 000 m", labelUz: "Yo'l (s)", labelRu: "Путь (s)" },
        { key: "t", value: "2 h = 7 200 s", labelUz: "Vaqt (t)", labelRu: "Время (t)" }
      ],
      findUz: "v (Tezlik, m/s)",
      findRu: "v (Скорость, м/с)",
      formula: "v = s / t",
      solutionUz: [
        "1. Xalqaro birliklar sistemasiga o'tamiz: 180 km = 180 000 m, 2 soat = 7200 s.",
        "2. v = 180 000 / 7 200 = 25 m/s (yoki 90 km/h)."
      ],
      solutionRu: [
        "1. Переводим величины в СИ: 180 км = 180 000 м, 2 ч = 7200 с.",
        "2. v = 180 000 / 7200 = 25 м/с (или 90 км/ч)."
      ],
      answer: "v = 25 m/s"
    },
    practiceProblem: {
      questionUz: "Avtomobil 36 km/h tezlik bilan 30 soniya davomida harakatlandi. U qancha masofani bosib o'tgan (metrda)?",
      questionRu: "Автомобиль двигался со скоростью 36 км/ч в течение 30 секунд. Какой путь он прошел (в метрах)?",
      answer: 300,
      tolerance: 1,
      unit: "m",
      hintUz: "36 km/h ni m/s ga aylantirish uchun 3.6 ga bo'ling: 36 / 3.6 = 10 m/s.",
      hintRu: "Для перевода 36 км/ч в м/с разделите на 3.6: 36 / 3.6 = 10 м/с.",
      solutionUz: "v = 10 m/s, t = 30 s. s = v * t = 10 * 30 = 300 m.",
      solutionRu: "v = 10 м/с, t = 30 с. s = v * t = 10 * 30 = 300 м."
    },
    miniQuiz: [
      {
        questionUz: "Quyidagilardan qaysi biri moddiy nuqta deb qaralishi mumkin?",
        questionRu: "Какое тело из перечисленных можно считать материальной точкой?",
        optionsUz: [
          "Yer atrofida aylanayotgan sun'iy yo'ldosh",
          "Kichik qutida aylanayotgan sharik",
          "Gimnastikachi mashq bajarayotganda",
          "Samolyotning o'z o'lchami salon ichida o'lchanayotganda"
        ],
        optionsRu: [
          "Искусственный спутник, движущийся вокруг Земли",
          "Шарик, вращающийся внутри маленькой коробочки",
          "Гимнаст при выполнении упражнений на перекладине",
          "Самолет при измерении размеров его пассажирского салона"
        ],
        correctIndex: 0,
        explanationUz: "Sun'iy yo'ldoshning o'lchamlari Yer radiusi va uning orbitasining uzunligiga nisbatan juda kichik bo'lgani sababli u moddiy nuqtadir.",
        explanationRu: "Размеры спутника ничтожно малы по сравнению с радиусом Земли и протяженностью орбиты."
      }
    ]
  },
  {
    id: 'kinematika',
    number: 2,
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    summaryUz: "Harakatni keltirib chiqaruvchi kuchlar va sabablarni hisobga olmasdan, jismlarning fazodagi geometrik harakatini o'rganuvchi mexanika bo'limi.",
    summaryRu: 'Раздел механики, изучающий движение тел без учета причин и сил, вызывающих это движение.',
    definitions: [
      {
        termUz: "Tezlanish (a)",
        termRu: "Ускорение (a)",
        defUz: "Vaqt birligi ichida tezlikning o'zgarish tezligini ifodalovchi vektor kattalik.",
        defRu: "Векторная величина, характеризующая быстроту изменения скорости тела во времени."
      },
      {
        termUz: "Trayektoriya",
        termRu: "Траектория",
        defUz: "Jism harakati davomida fazoda chizgan uzluksiz chizig'i.",
        defRu: "Непрерывная линия в пространстве, которую описывает точка при своем движении."
      }
    ],
    mainFormulas: [
      {
        latex: "a = \\frac{v - v_0}{t}",
        titleUz: "Tezlanish formulasi",
        titleRu: "Формула ускорения",
        variables: [
          { symbol: "a", nameUz: "Tezlanish", nameRu: "Ускорение", unit: "m/s²" },
          { symbol: "v", nameUz: "Oxirgi tezlik", nameRu: "Конечная скорость", unit: "m/s" },
          { symbol: "v₀", nameUz: "Boshlang'ich tezlik", nameRu: "Начальная скорость", unit: "m/s" },
          { symbol: "t", nameUz: "Vaqt", nameRu: "Время", unit: "s" }
        ]
      },
      {
        latex: "s = v_0 t + \\frac{a t^2}{2}",
        titleUz: "Tekis tezlanuvchan harakatda yo'l",
        titleRu: "Путь при равноускоренном движении",
        variables: [
          { symbol: "s", nameUz: "Yo'l", nameRu: "Путь", unit: "m" }
        ]
      }
    ],
    realLifeUz: [
      "Svetaforda turgan mashinaning o'rnidan qo'zg'alib tezlashishi.",
      "Samolyotning uchish yo'lagida tezlanish olishi."
    ],
    realLifeRu: [
      "Разгон автомобиля от светофора на зеленый свет.",
      "Разгон авиалайнера по взлетно-посадочной полосе."
    ],
    solvedExample: {
      problemUz: "Tinch holatdan (v₀ = 0) boshlab harakatlangan poyezd 10 s ichida 20 m/s tezlikka erishdi. Tezlanishni va bosib o'tilgan yo'lni toping.",
      problemRu: "Поезд, начав движение из состояния покоя (v₀ = 0), за 10 с набрал скорость 20 м/с. Найдите ускорение и пройденный путь.",
      given: [
        { key: "v0", value: "0 m/s", labelUz: "Boshlang'ich tezlik", labelRu: "Начальная скорость" },
        { key: "v", value: "20 m/s", labelUz: "Oxirgi tezlik", labelRu: "Конечная скорость" },
        { key: "t", value: "10 s", labelUz: "Vaqt", labelRu: "Время" }
      ],
      findUz: "a (m/s²), s (m)",
      findRu: "a (м/с²), s (м)",
      formula: "a = (v - v0)/t;  s = a * t² / 2",
      solutionUz: [
        "1. Tezlanish: a = (20 - 0) / 10 = 2 m/s².",
        "2. Yo'l: s = (2 * 10²) / 2 = (2 * 100) / 2 = 100 m."
      ],
      solutionRu: [
        "1. Ускорение: a = (20 - 0) / 10 = 2 м/с².",
        "2. Путь: s = (2 * 10²) / 2 = 100 м."
      ],
      answer: "a = 2 m/s², s = 100 m"
    },
    practiceProblem: {
      questionUz: "Tinch holatdan a = 3 m/s² tezlanish bilan harakatlanayotgan mototsikl 4 soniyada necha metr masofa bosadi?",
      questionRu: "Мотоцикл начинает движение из покоя с ускорением 3 м/с². Какой путь он пройдет за 4 секунды?",
      answer: 24,
      tolerance: 0.1,
      unit: "m",
      hintUz: "s = a * t² / 2 formulasidan foydalaning: (3 * 16) / 2.",
      hintRu: "Используйте s = a * t² / 2: (3 * 16) / 2.",
      solutionUz: "s = (3 * 4²) / 2 = 48 / 2 = 24 m.",
      solutionRu: "s = (3 * 4²) / 2 = 48 / 2 = 24 м."
    },
    miniQuiz: [
      {
        questionUz: "Agar jismning tezlanishi nolga teng bo'lsa (a = 0), uning harakati qanday bo'ladi?",
        questionRu: "Если ускорение тела равно нулю (a = 0), каков характер его движения?",
        optionsUz: [
          "Tekis to'g'ri chiziqli harakat yoki tinch holat",
          "Tezlanuvchan harakat",
          "Sekinlanuvchan harakat",
          "Aylanma harakat"
        ],
        optionsRu: [
          "Равномерное прямолинейное движение или покой",
          "Равноускоренное движение",
          "Равнозамедленное движение",
          "Движение по окружности"
        ],
        correctIndex: 0,
        explanationUz: "Tezlanish nol bo'lsa, tezlik o'zgarmaydi (v = const), ya'ni jism tekis harakat qiladi yoki tinch turadi.",
        explanationRu: "При нулевом ускорении скорость не меняется, тело сохраняет равномерное движение либо покоится."
      }
    ]
  },
  {
    id: 'dinamika',
    number: 3,
    categoryUz: 'Dinamika',
    categoryRu: 'Динамика',
    summaryUz: "Jismlarning o'zaro ta'siri natijasida yuzaga keladigan kuchlar va bu kuchlarning harakatga ta'sirini o'rganuvchi mexanika bo'limi.",
    summaryRu: 'Раздел механики, изучающий причины изменения механического движения под действием приложенных сил.',
    definitions: [
      {
        termUz: "Kuch (F)",
        termRu: "Сила (F)",
        defUz: "Jismlarning bir-biriga mexanik ta'sirining miqdoriy o'lchovi bo'lgan vektor kattalik. Birligi Nyuton (N).",
        defRu: "Векторная физическая величина, являющаяся мерой механического воздействия одного тела на другое. Единица: Ньютон (Н)."
      },
      {
        termUz: "Massa (m)",
        termRu: "Масса (m)",
        defUz: "Jismning inertlik va gravitatsion xossalarini xarakterlovchi skalyar fizik kattalik.",
        defRu: "Скалярная величина, мера инертности и гравитационных свойств тела."
      }
    ],
    mainFormulas: [
      {
        latex: "F = m \\cdot a",
        titleUz: "Nyutonning ikkinchi qonuni",
        titleRu: "Второй закон Ньютона",
        variables: [
          { symbol: "F", nameUz: "Kuch", nameRu: "Сила", unit: "N" },
          { symbol: "m", nameUz: "Massa", nameRu: "Масса", unit: "kg" },
          { symbol: "a", nameUz: "Tezlanish", nameRu: "Ускорение", unit: "m/s²" }
        ]
      },
      {
        latex: "F_{ishq} = \\mu \\cdot N",
        titleUz: "Sirpanish ishqalanish kuchi",
        titleRu: "Сила трения скольжения",
        variables: [
          { symbol: "μ", nameUz: "Ishqalanish koeffitsienti", nameRu: "Коэффициент трения", unit: "birliksiz" },
          { symbol: "N", nameUz: "Tayanch reaksiyasi", nameRu: "Сила реакции опоры", unit: "N" }
        ]
      }
    ],
    realLifeUz: [
      "Mashina tormoz berganida yo'lovchilarning inersiya tufayli oldinga intilishi.",
      "Qor ustida chang'ining oson sirpanishi (ishqalanish kamligi)."
    ],
    realLifeRu: [
      "Движение пассажиров вперед по инерции при резком торможении автобуса.",
      "Скольжение лыж по снегу за счет малого коэффициента трения."
    ],
    solvedExample: {
      problemUz: "Massasi 12 kg bo'lgan aravachaga 36 N gorizontal kuch ta'sir qilmoqda. Ishqalanishni hisobga olmaganda uning tezlanishini toping.",
      problemRu: "К тележке массой 12 кг приложена горизонтальная сила 36 Н. Пренебрегая трением, найдите ускорение тележки.",
      given: [
        { key: "m", value: "12 kg", labelUz: "Massa (m)", labelRu: "Масса (m)" },
        { key: "F", value: "36 N", labelUz: "Kuch (F)", labelRu: "Сила (F)" }
      ],
      findUz: "a (Tezlanish, m/s²)",
      findRu: "a (Ускорение, м/с²)",
      formula: "a = F / m",
      solutionUz: [
        "Nyutonning 2-qonunidan: a = F / m = 36 / 12 = 3 m/s²."
      ],
      solutionRu: [
        "Из второго закона Ньютона: a = F / m = 36 / 12 = 3 м/с²."
      ],
      answer: "a = 3 m/s²"
    },
    practiceProblem: {
      questionUz: "Massasi 5 kg jismga qanday kuch ta'sir qilsa, u 4 m/s² tezlanish oladi (N da)?",
      questionRu: "Какую силу необходимо приложить к телу массой 5 кг, чтобы сообщить ему ускорение 4 м/с² (в Н)?",
      answer: 20,
      tolerance: 0.1,
      unit: "N",
      hintUz: "F = m * a formulasidan foydalaning.",
      hintRu: "Используйте формулу F = m * a.",
      solutionUz: "F = 5 * 4 = 20 N.",
      solutionRu: "F = 5 * 4 = 20 Н."
    },
    miniQuiz: [
      {
        questionUz: "Nyutonning uchinchi qonuniga ko'ra o'zaro ta'sir kuchlari qanday yo'nalgan?",
        questionRu: "Как направлены силы взаимодействия тел согласно третьему закону Ньютона?",
        optionsUz: [
          "Qiymati teng va qarama-qarshi yo'nalgan",
          "Qiymati turlicha va bir tomonga yo'nalgan",
          "Faqat bitta jismga qo'yilgan",
          "Tezlikka perpendikulyar"
        ],
        optionsRu: [
          "Равны по модулю и противоположны по направлению",
          "Различны по модулю и сонаправлены",
          "Приложены к одному и тому же телу",
          "Перпендикулярны скорости"
        ],
        correctIndex: 0,
        explanationUz: "Har bir ta'sirga unga teng va qarama-qarshi aks ta'sir mavjud: F1 = -F2.",
        explanationRu: "Действию всегда есть равное и противоположное противодействие: F1 = -F2."
      }
    ]
  },
  {
    id: 'ish_va_energiya',
    number: 4,
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    summaryUz: "Mexanik ish, kinetik va potensial energiya hamda energiyaning saqlanish va aylanish fundamental qonunini o'rganuvchi bo'lim.",
    summaryRu: 'Раздел физики, посвященный механической работе, кинетической и потенциальной энергии, а также закону сохранения энергии.',
    definitions: [
      {
        termUz: "Mexanik ish (A)",
        termRu: "Механическая работа (A)",
        defUz: "Kuch va uning ta'sirida bosib o'tilgan ko'chishning skalyar ko'paytmasi. Birligi Joul (J).",
        defRu: "Скалярная величина, равная произведению модуля силы на модуль перемещения и косинус угла между ними. Единица: Джоуль (Дж)."
      },
      {
        termUz: "Kinetik energiya (Ek)",
        termRu: "Кинетическая энергия (Ek)",
        defUz: "Jismning harakati tufayli ega bo'lgan energiyasi: Ek = mv² / 2.",
        defRu: "Энергия механического движения тела: Ek = mv² / 2."
      }
    ],
    mainFormulas: [
      {
        latex: "A = F \\cdot s \\cdot \\cos(\\alpha)",
        titleUz: "Mexanik ish",
        titleRu: "Механическая работа",
        variables: [
          { symbol: "A", nameUz: "Ish", nameRu: "Работа", unit: "J" },
          { symbol: "F", nameUz: "Kuch", nameRu: "Сила", unit: "N" },
          { symbol: "s", nameUz: "Ko'chish", nameRu: "Перемещение", unit: "m" }
        ]
      },
      {
        latex: "E_k = \\frac{m v^2}{2}",
        titleUz: "Kinetik energiya",
        titleRu: "Кинетическая энергия",
        variables: [
          { symbol: "Ek", nameUz: "Kinetik energiya", nameRu: "Кинетическая энергия", unit: "J" },
          { symbol: "m", nameUz: "Massa", nameRu: "Масса", unit: "kg" },
          { symbol: "v", nameUz: "Tezlik", nameRu: "Скорость", unit: "m/s" }
        ]
      },
      {
        latex: "E_p = m g h",
        titleUz: "Og'irlik kuchi maydonidagi potensial energiya",
        titleRu: "Потенциальная энергия в поле тяжести",
        variables: [
          { symbol: "Ep", nameUz: "Potensial energiya", nameRu: "Потенциальная энергия", unit: "J" },
          { symbol: "h", nameUz: "Balandlik", nameRu: "Высота", unit: "m" }
        ]
      }
    ],
    realLifeUz: [
      "Gidroelektr stansiyada (GES) suvning potensial energiyasining elektr energiyasiga aylanishi.",
      "Kamondan o'q uzilganda tarang tortilgan ip energiyasining o'q kinetik energiyasiga aylanishi."
    ],
    realLifeRu: [
      "Превращение потенциальной энергии падающей воды в гидроэлектростанциях в электрическую.",
      "Переход энергии натянутой тетивы лука в кинетическую энергию летящей стрелы."
    ],
    solvedExample: {
      problemUz: "Massasi 2 kg bo'lgan tosh 15 m balandlikdan tushmoqda. Toshning yerga urilish paytidagi kinetik energiyasini toping (g = 9.8 m/s²).",
      problemRu: "Камень массой 2 кг падает с высоты 15 м. Найдите кинетическую энергию камня в момент падения на землю (g = 9.8 м/с²).",
      given: [
        { key: "m", value: "2 kg", labelUz: "Massa", labelRu: "Масса" },
        { key: "h", value: "15 m", labelUz: "Balandlik", labelRu: "Высота" },
        { key: "g", value: "9.8 m/s²", labelUz: "Erkin tushish tezlanishi", labelRu: "Ускорение своб. падения" }
      ],
      findUz: "Ek (Kinetik energiya, J)",
      findRu: "Ek (Кинетическая энергия, Дж)",
      formula: "Ek = Ep = m * g * h",
      solutionUz: [
        "Energiyaning saqlanish qonuniga ko'ra: to'liq dastlabki potensial energiya yerga yetganda to'liq kinetik energiyaga aylanadi.",
        "Ek = m * g * h = 2 * 9.8 * 15 = 294 J."
      ],
      solutionRu: [
        "По закону сохранения энергии начальная потенциальная энергия переходит в кинетическую у поверхности земли.",
        "Ek = m * g * h = 2 * 9.8 * 15 = 294 Дж."
      ],
      answer: "Ek = 294 J"
    },
    practiceProblem: {
      questionUz: "Massasi 1000 kg bo'lgan avtomobil 20 m/s tezlik bilan harakatlanmoqda. Uning kinetik energiyasini toping (kiloJoul, kJ da)?",
      questionRu: "Автомобиль массой 1000 кг едет со скоростью 20 м/с. Какова его кинетическая энергия (в кДж)?",
      answer: 200,
      tolerance: 1,
      unit: "kJ",
      hintUz: "Ek = (m * v²) / 2 = (1000 * 400) / 2 = 200 000 J = 200 kJ.",
      hintRu: "Ek = (m * v²) / 2 = (1000 * 400) / 2 = 200 000 Дж = 200 кДж.",
      solutionUz: "Ek = (1000 * 20²) / 2 = 200 000 J = 200 kJ.",
      solutionRu: "Ek = (1000 * 20²) / 2 = 200 000 Дж = 200 кДж."
    },
    miniQuiz: [
      {
        questionUz: "Agar jismning tezligi 2 marta oshirilsa, uning kinetik energiyasi qanday o'zgaradi?",
        questionRu: "Как изменится кинетическая энергия тела, если его скорость увеличить в 2 раза?",
        optionsUz: [
          "4 marta ortadi",
          "2 marta ortadi",
          "O'zgarmaydi",
          "2 marta kamayadi"
        ],
        optionsRu: [
          "Увеличится в 4 раза",
          "Увеличится в 2 раза",
          "Не изменится",
          "Уменьшится в 2 раза"
        ],
        correctIndex: 0,
        explanationUz: "Kinetik energiya tezlikning kvadratiga to'g'ri proportsional: Ek ~ v². Shuning uchun (2)² = 4 marta ortadi.",
        explanationRu: "Кинетическая энергия пропорциональна квадрату скорости: (2v)² = 4v²."
      }
    ]
  },
  {
    id: 'impuls',
    number: 5,
    categoryUz: 'Impuls',
    categoryRu: 'Импульс',
    summaryUz: "Jismning harakat miqdori (impuls), kuch impulsi va berk tizimlarda impulsning saqlanish qonunini o'rganuvchi bo'lim.",
    summaryRu: 'Раздел физики, изучающий количество движения (импульс тела), импульс силы и фундаментальный закон сохранения импульса.',
    definitions: [
      {
        termUz: "Harakat miqdori (Impuls, p)",
        termRu: "Импульс тела (p)",
        defUz: "Jism massasi va uning tezligi ko'paytmasiga teng vektor kattalik: p = m * v.",
        defRu: "Векторная величина, равная произведению массы тела на его скорость: p = m * v."
      },
      {
        termUz: "Reaktiv harakat",
        termRu: "Реактивное движение",
        defUz: "Jismdan uning bir qismi ma'lum tezlik bilan ajralib chiqishi natijasida hosil bo'ladigan harakat (raketa harakati).",
        defRu: "Движение, возникающее при отделении от тела некоторой его части с определённой скоростью (движение ракеты)."
      }
    ],
    mainFormulas: [
      {
        latex: "p = m \\cdot v",
        titleUz: "Jism impulsi",
        titleRu: "Импульс тела",
        variables: [
          { symbol: "p", nameUz: "Impuls", nameRu: "Импульс", unit: "kg·m/s" },
          { symbol: "m", nameUz: "Massa", nameRu: "Масса", unit: "kg" },
          { symbol: "v", nameUz: "Tezlik", nameRu: "Скорость", unit: "m/s" }
        ]
      },
      {
        latex: "m_1 \\vec{v}_1 + m_2 \\vec{v}_2 = m_1 \\vec{v}'_1 + m_2 \\vec{v}'_2",
        titleUz: "Impulsning saqlanish qonuni",
        titleRu: "Закон сохранения импульса",
        variables: []
      }
    ],
    realLifeUz: [
      "Kosmik raketaning gazlarni katta tezlikda chiqarib koinotga ko'tarilishi.",
      "Bilyard sharlarining to'qnashuvi."
    ],
    realLifeRu: [
      "Старт космической ракеты за счет реактивной струи раскаленных газов.",
      "Упругий удар и разлет шаров на бильярдном столе."
    ],
    solvedExample: {
      problemUz: "Massasi 0.5 kg bo'lgan to'p 10 m/s tezlik bilan devorga to'g'ri burchak ostida kelib urildi va xuddi shunday tezlik bilan orqaga qaytdi. Impuls o'zgarishini toping.",
      problemRu: "Мяч массой 0.5 кг со скоростью 10 м/с ударяется перпендикулярно в стену и отскакивает с той же скоростью. Найдите изменение импульса.",
      given: [
        { key: "m", value: "0.5 kg", labelUz: "Massa", labelRu: "Масса" },
        { key: "v1", value: "+10 m/s", labelUz: "Dastlabki tezlik", labelRu: "Начальная скорость" },
        { key: "v2", value: "-10 m/s", labelUz: "Qaytgan tezlik", labelRu: "Конечная скорость" }
      ],
      findUz: "Δp (Impuls o'zgarishi, kg·m/s)",
      findRu: "Δp (Изменение импульса, кг·м/с)",
      formula: "Δp = m * (v2 - v1)",
      solutionUz: [
        "Yo'nalishni hisobga olsak: v1 = 10 m/s, orqaga qaytganda v2 = -10 m/s.",
        "Δp = 0.5 * (-10 - 10) = 0.5 * (-20) = -10 kg·m/s (moduli 10 kg·m/s)."
      ],
      solutionRu: [
        "С учетом направления: v1 = 10 м/с, v2 = -10 м/с.",
        "Δp = 0.5 * (-10 - 10) = -10 кг·м/с (по модулю 10 кг·м/с)."
      ],
      answer: "|Δp| = 10 kg·m/s"
    },
    practiceProblem: {
      questionUz: "Massasi 4 kg bo'lgan tosh 5 m/s tezlikda uchmoqda. Uning impulsini toping (kg·m/s da).",
      questionRu: "Камень массой 4 кг летит со скоростью 5 м/с. Найдите его импульс (в кг·м/с).",
      answer: 20,
      tolerance: 0.1,
      unit: "kg·m/s",
      hintUz: "p = m * v formulasiga qo'ying.",
      hintRu: "Используйте формулу p = m * v.",
      solutionUz: "p = 4 * 5 = 20 kg·m/s.",
      solutionRu: "p = 4 * 5 = 20 кг·м/с."
    },
    miniQuiz: [
      {
        questionUz: "Impulsning saqlanish qonuni qanday tizimlar uchun o'rinli?",
        questionRu: "Для каких систем справедлив закон сохранения импульса?",
        optionsUz: [
          "Tashqi kuchlar ta'sir qilmaydigan berk (yopiq) tizimlar uchun",
          "Faqat harakatsiz tizimlar uchun",
          "Faqat ishqalanish kuchi juda katta bo'lgan ochiq tizimlar uchun",
          "Har qanday ochiq va berk tizimlar uchun cheklovsiz"
        ],
        optionsRu: [
          "Для замкнутых систем, не испытывающих действия внешних сил",
          "Только для неподвижных тел",
          "Только при наличии огромных сил трения",
          "Для любых систем без каких-либо условий"
        ],
        correctIndex: 0,
        explanationUz: "Impulsning saqlanish qonuni berk tizimlarda (tashqi kuchlar teng ta'sir etuvchisi nolga teng bo'lganda) bajariladi.",
        explanationRu: "Закон выполняется строго в замкнутых системах, где внешние силы отсутствуют или скомпенсированы."
      }
    ]
  },
  {
    id: 'gravitatsiya',
    number: 6,
    categoryUz: 'Gravitatsiya',
    categoryRu: 'Гравитация',
    summaryUz: "Olamdagi barcha jismlar o'rtasidagi tortishish qonuniyati, sayyoralar harakati va og'irlik kuchi tabiati.",
    summaryRu: 'Всемирное тяготение, гравитационное взаимодействие тел, законы движения планет и природа силы тяжести.',
    definitions: [
      {
        termUz: "Butun olam tortishish qonuni",
        termRu: "Закон всемирного тяготения",
        defUz: "Koinotdagi istalgan ikkita jism massalari ko'paytmasiga to'g'ri, ular orasidagi masofa kvadratiga teskari proportsional kuch bilan tortishadi.",
        defRu: "Сила тяготения между телами пропорциональна их массам и обратно пропорциональна квадрату расстояния между ними."
      },
      {
        termUz: "Erkin tushish tezlanishi (g)",
        termRu: "Ускорение свободного падения (g)",
        defUz: "Gravitatsiya kuchi ta'sirida jism oladigan tezlanish (Yer sirtida o'rtacha 9.81 m/s²).",
        defRu: "Ускорение, сообщаемое телу силой тяжести в вакууме (на поверхности Земли около 9.81 м/с²)."
      }
    ],
    mainFormulas: [
      {
        latex: "F = G \\frac{m_1 m_2}{R^2}",
        titleUz: "Butun olam tortishish qonuni",
        titleRu: "Закон всемирного тяготения",
        variables: [
          { symbol: "G", nameUz: "Gravitatsion doimiy (6.674×10⁻¹¹)", nameRu: "Гравитационная постоянная", unit: "N·m²/kg²" },
          { symbol: "R", nameUz: "Masofa", nameRu: "Расстояние", unit: "m" }
        ]
      },
      {
        latex: "P = m \\cdot g",
        titleUz: "Og'irlik kuchi",
        titleRu: "Сила тяжести",
        variables: [
          { symbol: "P", nameUz: "Og'irlik kuchi", nameRu: "Сила тяжести", unit: "N" },
          { symbol: "g", nameUz: "g = 9.8 m/s²", nameRu: "g = 9.8 м/с²", unit: "m/s²" }
        ]
      }
    ],
    realLifeUz: [
      "Oyning Yer atrofida orbitada uzluksiz aylanishi.",
      "Okean va dengizlarda Oy gravitatsiyasi tufayli sodir bo'ladigan suv ko'tarilishi va qaytishi (to'lqinlar)."
    ],
    realLifeRu: [
      "Движение Луны по стабильной орбите вокруг Земли.",
      "Приливы и отливы в океанах под действием гравитации Луны."
    ],
    solvedExample: {
      problemUz: "Massasi 70 kg bo'lgan astronavtning Oydagi og'irligini toping (Oyda g = 1.62 m/s²).",
      problemRu: "Найдите вес космонавта массой 70 кг на Луне (на Луне g = 1.62 м/с²).",
      given: [
        { key: "m", value: "70 kg", labelUz: "Massa", labelRu: "Масса" },
        { key: "g_oy", value: "1.62 m/s²", labelUz: "Oyda erkin tushish tezlanishi", labelRu: "Ускорение на Луне" }
      ],
      findUz: "P (Og'irlik kuchi, N)",
      findRu: "P (Вес, Н)",
      formula: "P = m * g",
      solutionUz: [
        "P = 70 * 1.62 = 113.4 N.",
        "Taqqoslash uchun, Yerda uning og'irligi: 70 * 9.8 = 686 N bo'lar edi (Oyda taxminan 6 marta yengil)."
      ],
      solutionRu: [
        "P = 70 * 1.62 = 113.4 Н.",
        "Для сравнения, на Земле вес составил бы 686 Н (на Луне легче примерно в 6 раз)."
      ],
      answer: "P = 113.4 N"
    },
    practiceProblem: {
      questionUz: "Massasi 50 kg bo'lgan bolaning Yer sirtidagi og'irlik kuchini hisoblang (g = 9.8 m/s² deb oling, N da).",
      questionRu: "Рассчитайте силу тяжести, действующую на ребенка массой 50 кг на поверхности Земли (примите g = 9.8 м/с², в Н).",
      answer: 490,
      tolerance: 1,
      unit: "N",
      hintUz: "P = m * g = 50 * 9.8.",
      hintRu: "P = m * g = 50 * 9.8.",
      solutionUz: "P = 50 * 9.8 = 490 N.",
      solutionRu: "P = 50 * 9.8 = 490 Н."
    },
    miniQuiz: [
      {
        questionUz: "Agar ikki jism orasidagi masofa 3 marta oshirilsa, ularning gravitatsion tortishish kuchi qanday o'zgaradi?",
        questionRu: "Как изменится сила гравитационного притяжения двух тел, если расстояние между ними увеличить в 3 раза?",
        optionsUz: [
          "9 marta kamayadi",
          "3 marta kamayadi",
          "9 marta ortadi",
          "O'zgarmaydi"
        ],
        optionsRu: [
          "Уменьшится в 9 раз",
          "Уменьшится в 3 раза",
          "Увеличится в 9 раз",
          "Не изменится"
        ],
        correctIndex: 0,
        explanationUz: "Tortishish kuchi masofa kvadratiga teskari proportsional: F ~ 1/R². Agar masofa 3 marta oshsa, kuch 3² = 9 marta kamayadi.",
        explanationRu: "Сила обратно пропорциональна квадрату расстояния: при увеличении R в 3 раза сила падает в 3² = 9 раз."
      }
    ]
  },
  {
    id: 'molekulyar_fizika',
    number: 7,
    categoryUz: 'Molekulyar fizika',
    categoryRu: 'Молекулярная физика',
    summaryUz: "Moddalarning ichki tuzilishi, molekulalar harakati, diffuziya, Broun harakati va gazlarning mikroskopik xossalarini o'rganuvchi bo'lim.",
    summaryRu: 'Раздел физики, изучающий строение и свойства вещества исходя из молекулярно-кинетических представлений.',
    definitions: [
      {
        termUz: "Diffuziya",
        termRu: "Диффузия",
        defUz: "Bir modda molekulalarining ikkinchi modda molekulalari orasiga o'z-o'zidan tarqalishi hodisasi.",
        defRu: "Процесс взаимного проникновения молекул одного вещества между молекулами другого за счет теплового движения."
      },
      {
        termUz: "Ideal gaz",
        termRu: "Идеальный газ",
        defUz: "Molekulalari moddiy nuqta deb qaraladigan va ular orasidagi o'zaro ta'sir faqat elastik to'qnashuvda namoyon bo'ladigan gaz modeli.",
        defRu: "Модель газа, в которой пренебрегают объемом молекул и дальнодействующими силами между ними."
      }
    ],
    mainFormulas: [
      {
        latex: "p = n k T",
        titleUz: "Ideal gaz bosimi",
        titleRu: "Основное уравнение МКТ",
        variables: [
          { symbol: "p", nameUz: "Bosim", nameRu: "Давление", unit: "Pa" },
          { symbol: "n", nameUz: "Konsentratsiya", nameRu: "Концентрация", unit: "m⁻³" },
          { symbol: "k", nameUz: "Boltsman doimiysi (1.38×10⁻²³)", nameRu: "Постоянная Больцмана", unit: "J/K" },
          { symbol: "T", nameUz: "Mutlaq harorat", nameRu: "Абсолютная температура", unit: "K" }
        ]
      },
      {
        latex: "p V = \\frac{m}{M} R T",
        titleUz: "Mendeleyev-Klapeyron tenglamasi",
        titleRu: "Уравнение Менделеева — Клапейрона",
        variables: [
          { symbol: "R", nameUz: "Universal gaz doimiysi (8.314)", nameRu: "Газовая постоянная", unit: "J/(mol·K)" },
          { symbol: "M", nameUz: "Molyar massa", nameRu: "Молярная масса", unit: "kg/mol" }
        ]
      }
    ],
    realLifeUz: [
      "Xonada sepilgan atir hidining butun xona bo'ylab tezda tarqalishi (gazlarda diffuziya).",
      "Avtomobil shinalarida havo haroratining ko'tarilishi bilan ichki bosimning oshishi."
    ],
    realLifeRu: [
      "Быстрое распространение аромата духов по всей комнате за счет диффузии.",
      "Увеличение давления в автомобильных шинах при нагреве во время быстрой езды."
    ],
    solvedExample: {
      problemUz: "Hajmi 0.05 m³ bo'lgan idishda 300 K haroratda 2 mol ideal gaz bor. Gaz bosimini toping (R = 8.31 J/(mol·K)).",
      problemRu: "В сосуде объемом 0.05 м³ находится 2 моль идеального газа при температуре 300 К. Найдите давление (R = 8.31 Дж/(моль·К)).",
      given: [
        { key: "V", value: "0.05 m³", labelUz: "Hajm", labelRu: "Объем" },
        { key: "ν", value: "2 mol", labelUz: "Modda miqdori", labelRu: "Количество вещества" },
        { key: "T", value: "300 K", labelUz: "Harorat", labelRu: "Температура" }
      ],
      findUz: "p (Bosim, Pa)",
      findRu: "p (Давление, Па)",
      formula: "p = (ν * R * T) / V",
      solutionUz: [
        "p = (2 * 8.31 * 300) / 0.05 = 4986 / 0.05 = 99 720 Pa (taxminan 100 kPa yoki 1 atmosfera)."
      ],
      solutionRu: [
        "p = (2 * 8.31 * 300) / 0.05 = 99 720 Па (около 100 кПа, почти 1 атмосфера)."
      ],
      answer: "p = 99.72 kPa"
    },
    practiceProblem: {
      questionUz: "0 °C harorat Kelvindagi mutlaq shkalada qanchaga teng?",
      questionRu: "Какова абсолютная температура по шкале Кельвина, соответствующая 0 °C?",
      answer: 273.15,
      tolerance: 0.2,
      unit: "K",
      hintUz: "T (K) = t (°C) + 273.15.",
      hintRu: "T (К) = t (°C) + 273.15.",
      solutionUz: "T = 0 + 273.15 = 273.15 K.",
      solutionRu: "T = 0 + 273.15 = 273.15 К."
    },
    miniQuiz: [
      {
        questionUz: "Harorat ko'tarilganda molekulalarning o'rtacha tezligi qanday o'zgaradi?",
        questionRu: "Как меняется средняя скорость движения молекул при повышении температуры?",
        optionsUz: [
          "Ortadi",
          "Kamayadi",
          "O'zgarmaydi",
          "Oldin kamayadi, keyin ortadi"
        ],
        optionsRu: [
          "Увеличивается",
          "Уменьшается",
          "Не меняется",
          "Сначала уменьшается, затем растет"
        ],
        correctIndex: 0,
        explanationUz: "Harorat molekulalarning betartib issiqlik harakati kinetik energiyasining o'lchovidir: T ~ v². Harorat ortishi bilan molekulalar tezlashadi.",
        explanationRu: "Температура является мерой кинетической энергии теплового движения молекул: при нагреве скорость молекул растет."
      }
    ]
  },
  {
    id: 'termodinamika',
    number: 8,
    categoryUz: 'Termodinamika',
    categoryRu: 'Термодинамика',
    summaryUz: "Issiqlik hodisalari, ichki energiya, termodinamikaning 1- va 2-qonunlari hamda issiqlik dvigatellarining foydali ish koeffitsienti.",
    summaryRu: 'Раздел физики, изучающий тепловые процессы, внутреннюю энергию, первое и второе начала термодинамики и КПД тепловых машин.',
    definitions: [
      {
        termUz: "Termodinamikaning birinchi qonuni",
        termRu: "Первое начало термодинамики",
        defUz: "Tizimga berilgan issiqlik miqdori uning ichki energiyasini oshirishga va tashqi kuchlarga qarshi ish bajarishga sarflanadi: Q = ΔU + A.",
        defRu: "Количество теплоты, переданное системе, идет на изменение ее внутренней энергии и совершение работы против внешних сил: Q = ΔU + A."
      },
      {
        termUz: "Foydali ish koeffitsienti (FIK / КПД)",
        termRu: "Коэффициент полезного действия (КПД)",
        defUz: "Bajarilgan foydali ishning sarflangan umumiy energiyaga (issiqlikka) nisbati: η = A / Q1.",
        defRu: "Отношение полезной работы к затраченному количеству теплоты."
      }
    ],
    mainFormulas: [
      {
        latex: "Q = c \\cdot m \\cdot \\Delta T",
        titleUz: "Isitish yoki sovutishdagi issiqlik miqdori",
        titleRu: "Количество теплоты при нагревании",
        variables: [
          { symbol: "Q", nameUz: "Issiqlik miqdori", nameRu: "Количество теплоты", unit: "J" },
          { symbol: "c", nameUz: "Solishtirma issiqlik sig'imi", nameRu: "Удельная теплоемкость", unit: "J/(kg·°C)" },
          { symbol: "m", nameUz: "Massa", nameRu: "Масса", unit: "kg" },
          { symbol: "ΔT", nameUz: "Harorat o'zgarishi", nameRu: "Разность температур", unit: "°C yoki K" }
        ]
      },
      {
        latex: "\\eta_{karno} = \\frac{T_1 - T_2}{T_1}",
        titleUz: "Karno siklining maksimal FIKi",
        titleRu: "Максимальный КПД цикла Карно",
        variables: [
          { symbol: "T1", nameUz: "Isitgich harorati", nameRu: "Температура нагревателя", unit: "K" },
          { symbol: "T2", nameUz: "Sovutgich harorati", nameRu: "Температура холодильника", unit: "K" }
        ]
      }
    ],
    realLifeUz: [
      "Choynakdagi suvni qaynatish uchun zarur bo'lgan gaz yoki elektr energiyasini hisoblash.",
      "Avtomobil dvigatelining (ichki yonuv dvigateli) samaradorligi va sovutish radiatorining ishlashi."
    ],
    realLifeRu: [
      "Расчет расхода энергии на нагревание воды в электрическом чайнике.",
      "Работа двигателей внутреннего сгорания автомобилей и тепловых электростанций."
    ],
    solvedExample: {
      problemUz: "Massasi 3 kg bo'lgan suvni 20 °C dan 80 °C gacha isitish uchun qancha issiqlik miqdori kerak? (Suvning solishtirma issiqlik sig'imi c = 4200 J/(kg·°C)).",
      problemRu: "Какое количество теплоты требуется для нагрева 3 кг воды от 20 °C до 80 °C? (Удельная теплоемкость воды c = 4200 Дж/(кг·°C)).",
      given: [
        { key: "m", value: "3 kg", labelUz: "Suv massasi", labelRu: "Масса воды" },
        { key: "ΔT", value: "80 - 20 = 60 °C", labelUz: "Harorat farqi", labelRu: "Разность температур" },
        { key: "c", value: "4200 J/(kg·°C)", labelUz: "Solishtirma issiqlik sig'imi", labelRu: "Удельная теплоемкость" }
      ],
      findUz: "Q (Issiqlik miqdori, kJ)",
      findRu: "Q (Количество теплоты, кДж)",
      formula: "Q = c * m * ΔT",
      solutionUz: [
        "Q = 4200 * 3 * 60 = 756 000 J = 756 kJ."
      ],
      solutionRu: [
        "Q = 4200 * 3 * 60 = 756 000 Дж = 756 кДж."
      ],
      answer: "Q = 756 kJ"
    },
    practiceProblem: {
      questionUz: "Karno ideal dvigatelida isitgich harorati 500 K, sovutgich harorati 300 K. Dvigatelning FIKini foizda hisoblang (%).",
      questionRu: "В идеальном двигателе Карно температура нагревателя 500 К, а холодильника 300 К. Найдите КПД в процентах (%).",
      answer: 40,
      tolerance: 0.1,
      unit: "%",
      hintUz: "η = (500 - 300) / 500 = 200 / 500 = 0.40 -> 40%.",
      hintRu: "η = (500 - 300) / 500 = 200 / 500 = 0.40 -> 40%.",
      solutionUz: "η = (T1 - T2) / T1 = (500 - 300) / 500 = 0.4 (40%).",
      solutionRu: "η = (T1 - T2) / T1 = 200 / 500 = 0.4 (40%)."
    },
    miniQuiz: [
      {
        questionUz: "Issiqlik o'z-o'zidan sovuq jismdan issiq jismga o'tishi mumkinmi?",
        questionRu: "Может ли теплота самопроизвольно переходить от холодного тела к горячему?",
        optionsUz: [
          "Yo'q, bu termodinamikaning 2-qonuniga ziddir",
          "Ha, agar jismlar juda katta bo'lsa",
          "Ha, vakuumda mumkin",
          "Faqat suyuqliklarda mumkin"
        ],
        optionsRu: [
          "Нет, это противоречит второму началу термодинамики",
          "Да, если тела очень массивные",
          "Да, исключительно в вакууме",
          "Только в жидкостях"
        ],
        correctIndex: 0,
        explanationUz: "Termodinamikaning 2-qonuni (Klauzius ifodasi): issiqlik hech qachon o'z-o'zidan sovuq jismdan issiq jismga o'ta olmaydi.",
        explanationRu: "Второе начало термодинамики утверждает невозможность самопроизвольного переноса тепла от холодного тела к горячему."
      }
    ]
  },
  {
    id: 'elektr',
    number: 9,
    categoryUz: 'Elektr',
    categoryRu: 'Электричество',
    summaryUz: "Elektr zaryadlari, doimiy elektr toki, Om qonuni, o'tkazgichlarni ulash va elektr quvvati qonuniyatlari.",
    summaryRu: 'Раздел физики, изучающий электрические заряды, постоянный ток, закон Ома, соединения проводников и мощность цепи.',
    definitions: [
      {
        termUz: "Elektr toki",
        termRu: "Электрический ток",
        defUz: "Zaryadlangan zarrachalarning (elektronlar, ionlar) tartibli (yo'naltirilgan) harakati.",
        defRu: "Упорядоченное (направленное) движение свободных электрических зарядов."
      },
      {
        termUz: "Elektr qarshiligi (R)",
        termRu: "Электрическое сопротивление (R)",
        defUz: "O'tkazgichning elektr toki o'tishiga ko'rsatadigan to'sqinlik xususiyati. Birligi Om (Ω).",
        defRu: "Свойство проводника препятствовать прохождению электрического тока. Единица: Ом (Ом)."
      }
    ],
    mainFormulas: [
      {
        latex: "I = \\frac{U}{R}",
        titleUz: "Om qonuni",
        titleRu: "Закон Ома для участка цепи",
        variables: [
          { symbol: "I", nameUz: "Tok kuchi", nameRu: "Сила тока", unit: "A" },
          { symbol: "U", nameUz: "Kuchlanish", nameRu: "Напряжение", unit: "V" },
          { symbol: "R", nameUz: "Qarshilik", nameRu: "Сопротивление", unit: "Ω" }
        ]
      },
      {
        latex: "P = U \\cdot I",
        titleUz: "Elektr toki quvvati",
        titleRu: "Мощность электрического тока",
        variables: [
          { symbol: "P", nameUz: "Quvvat", nameRu: "Мощность", unit: "W (Vatt)" }
        ]
      }
    ],
    realLifeUz: [
      "Uy elektr tarmog'iga ulangan maishiy texnikalarning (televizor, dazmol) tok iste'moli.",
      "Smartfon batareyasini zaryadlash moslamasining volt va amper ko'rsatkichlari."
    ],
    realLifeRu: [
      "Работа бытовых приборов, подключенных параллельно к домашней розетке 220 В.",
      "Характеристики зарядного устройства для смартфона (например, 5 В и 2 А дают 10 Вт)."
    ],
    solvedExample: {
      problemUz: "220 V kuchlanishga ulangan elektr choynakning qarshiligi 44 Om. Choynakdan o'tayotgan tok kuchi va uning quvvatini toping.",
      problemRu: "Электрический чайник с сопротивлением спирали 44 Ом включен в розетку 220 В. Найдите силу тока и потребляемую мощность.",
      given: [
        { key: "U", value: "220 V", labelUz: "Kuchlanish", labelRu: "Напряжение" },
        { key: "R", value: "44 Ω", labelUz: "Qarshilik", labelRu: "Сопротивление" }
      ],
      findUz: "I (A), P (W)",
      findRu: "I (А), P (Вт)",
      formula: "I = U / R;  P = U * I",
      solutionUz: [
        "1. Tok kuchi: I = 220 / 44 = 5 A.",
        "2. Quvvat: P = 220 * 5 = 1100 W (1.1 kW)."
      ],
      solutionRu: [
        "1. Сила тока: I = 220 / 44 = 5 А.",
        "2. Мощность: P = 220 * 5 = 1100 Вт (1.1 кВт)."
      ],
      answer: "I = 5 A, P = 1100 W"
    },
    practiceProblem: {
      questionUz: "12 V akkumulyatorga qarshiligi 6 Om bo'lgan lampochka ulandi. Zanjirdagi tok kuchi necha Amper?",
      questionRu: "К аккумулятору напряжением 12 В подключена лампа сопротивлением 6 Ом. Какова сила тока в цепи (в А)?",
      answer: 2,
      tolerance: 0.1,
      unit: "A",
      hintUz: "Om qonuni: I = U / R = 12 / 6.",
      hintRu: "Закон Ома: I = U / R = 12 / 6.",
      solutionUz: "I = 12 / 6 = 2 A.",
      solutionRu: "I = 12 / 6 = 2 А."
    },
    miniQuiz: [
      {
        questionUz: "O'tkazgichlar ketma-ket ulanganda qaysi kattalik barchasida bir xil bo'ladi?",
        questionRu: "Какая величина одинакова во всех проводниках при их последовательном соединении?",
        optionsUz: [
          "Tok kuchi (I)",
          "Kuchlanish (U)",
          "Qarshilik (R)",
          "Quvvat (P)"
        ],
        optionsRu: [
          "Сила тока (I)",
          "Напряжение (U)",
          "Сопротивление (R)",
          "Мощность (P)"
        ],
        correctIndex: 0,
        explanationUz: "Ketma-ket ulanishda barcha elementlardan bir xil miqdordagi elektr zaryadlari o'tadi, shuning uchun tok kuchi bir xil bo'ladi: I1 = I2 = I.",
        explanationRu: "При последовательном соединении через все участки проходит один и тот же заряд в единицу времени: I = const."
      }
    ]
  },
  {
    id: 'elektr_maydoni',
    number: 10,
    categoryUz: 'Elektr maydoni',
    categoryRu: 'Электрическое поле',
    summaryUz: "Qo'zg'almas elektr zaryadlari orasidagi Kulon ta'siri, elektr maydon kuchlanganligi, potensial va kondensatorlar.",
    summaryRu: 'Электростатика: взаимодействие зарядов, закон Кулона, напряженность поля, потенциал и электрическая емкость.',
    definitions: [
      {
        termUz: "Kulon qonuni",
        termRu: "Закон Кулона",
        defUz: "Ikki nuqtaviy zaryadning o'zaro ta'sir kuchi ularning modullari ko'paytmasiga to'g'ri va oralaridagi masofa kvadratiga teskari proportsional.",
        defRu: "Сила взаимодействия двух точечных зарядов пропорциональна их произведению и обратно пропорциональна квадрату расстояния между ними."
      },
      {
        termUz: "Kondensator",
        termRu: "Конденсатор",
        defUz: "Elektr zaryadi va elektr maydon energiyasini to'plashga mo'ljallangan ikki o'tkazgichdan iborat tizim.",
        defRu: "Система из двух проводников, разделенных диэлектриком, предназначенная для накопления электрического заряда и энергии."
      }
    ],
    mainFormulas: [
      {
        latex: "F = k \\frac{|q_1 q_2|}{r^2}",
        titleUz: "Kulon qonuni",
        titleRu: "Закон Кулона",
        variables: [
          { symbol: "k", nameUz: "Kulon doimiysi (9×10⁹)", nameRu: "Коэффициент Кулона", unit: "N·m²/C²" },
          { symbol: "q1, q2", nameUz: "Zaryadlar", nameRu: "Заряды", unit: "C (Kulon)" },
          { symbol: "r", nameUz: "Masofa", nameRu: "Расстояние", unit: "m" }
        ]
      },
      {
        latex: "C = \\frac{q}{U}",
        titleUz: "Elektr sig'imi",
        titleRu: "Электроемкость",
        variables: [
          { symbol: "C", nameUz: "Sig'im", nameRu: "Емкость", unit: "F (Farad)" }
        ]
      }
    ],
    realLifeUz: [
      "Yung kiyimni yechganda qisirlagan tovush va uchqun chiqishi (statik elektr).",
      "Kamera chirog'ining (vspyshka) kondensatorda to'plangan energiyani lahzada chiqarishi."
    ],
    realLifeRu: [
      "Электризация волос при расчесывании пластиковой расческой.",
      "Мгновенная вспышка фотокамеры за счет разряда мощного конденсатора."
    ],
    solvedExample: {
      problemUz: "Kondensator qoplamalaridagi kuchlanish 50 V bo'lganda u 0.002 C zaryad to'pladi. Kondensator sig'imini toping (mikrofaradda, μF).",
      problemRu: "При напряжении 50 В конденсатор накопил заряд 0.002 Кл. Найдите емкость конденсатора в микрофарадах (мкФ).",
      given: [
        { key: "U", value: "50 V", labelUz: "Kuchlanish", labelRu: "Напряжение" },
        { key: "q", value: "0.002 C", labelUz: "Zaryad", labelRu: "Заряд" }
      ],
      findUz: "C (Sig'im, μF)",
      findRu: "C (Емкость, мкФ)",
      formula: "C = q / U",
      solutionUz: [
        "C = 0.002 / 50 = 0.00004 F = 40 μF."
      ],
      solutionRu: [
        "C = 0.002 / 50 = 0.00004 Ф = 40 мкФ."
      ],
      answer: "C = 40 μF"
    },
    practiceProblem: {
      questionUz: "Sig'imi 10 μF (10×10⁻⁶ F) bo'lgan kondensatorga 100 V kuchlanish berildi. U qancha zaryad to'playdi (miliKulon, mC da)?",
      questionRu: "Конденсатор емкостью 10 мкФ заряжен до 100 В. Какой заряд он накопит (в милликулонах, мКл)?",
      answer: 1,
      tolerance: 0.05,
      unit: "mC",
      hintUz: "q = C * U = 10×10⁻⁶ * 100 = 10⁻³ C = 1 mC.",
      hintRu: "q = C * U = 10×10⁻⁶ * 100 = 10⁻³ Кл = 1 мКл.",
      solutionUz: "q = 10×10⁻⁶ * 100 = 0.001 C = 1 mC.",
      solutionRu: "q = 10×10⁻⁶ * 100 = 0.001 Кл = 1 мКл."
    },
    miniQuiz: [
      {
        questionUz: "Bir xil ishorali ikkita zaryad bir-biriga qanday ta'sir qiladi?",
        questionRu: "Как взаимодействуют два одноименных электрических заряда?",
        optionsUz: [
          "Bir-birini itaradi",
          "Bir-birini tortadi",
          "O'zaro ta'sirlashmaydi",
          "Aylanma harakat qiladi"
        ],
        optionsRu: [
          "Отталкиваются друг от друга",
          "Притягиваются друг к другу",
          "Не взаимодействуют вовсе",
          "Начинают вращаться"
        ],
        correctIndex: 0,
        explanationUz: "Elektrostatikaning asosiy qoidasi: bir xil ishorali (+ va + yoki - va -) zaryadlar itariladi, qarama-qarshi ishorali zaryadlar tortishadi.",
        explanationRu: "Одноименные заряды взаимно отталкиваются, а разноименные притягиваются."
      }
    ]
  },
  {
    id: 'magnit_maydon',
    number: 11,
    categoryUz: 'Magnit maydon',
    categoryRu: 'Магнитное поле',
    summaryUz: "Harakatlanuvchi zaryadlar va tokli o'tkazgichlar atrofida vujudga keluvchi magnit maydoni, Amper va Lorens kuchlari, elektromagnit induksiya hodisasi.",
    summaryRu: 'Магнитное поле токов, сила Ампера, сила Лоренца и фундаментальное явление электромагнитной индукции Фарадея.',
    definitions: [
      {
        termUz: "Lorens kuchi",
        termRu: "Сила Лоренца",
        defUz: "Magnit maydonida harakatlanayotgan zaryadlangan zarrachaga ta'sir qiluvchi kuch: F = q * v * B * sin(α).",
        defRu: "Сила, действующая на заряженную частицу, движущуюся в магнитном поле."
      },
      {
        termUz: "Elektromagnit induksiya",
        termRu: "Электромагнитная индукция",
        defUz: "Konturdan o'tuvchi magnit oqimi o'zgarganda unda induksion elektr toki hosil bo'lish hodisasi.",
        defRu: "Явление возникновения электрического тока в замкнутом проводящем контуре при изменении магнитного потока."
      }
    ],
    mainFormulas: [
      {
        latex: "F_A = I \\cdot B \\cdot L \\cdot \\sin(\\alpha)",
        titleUz: "Amper kuchi",
        titleRu: "Сила Ампера",
        variables: [
          { symbol: "FA", nameUz: "Amper kuchi", nameRu: "Сила Ампера", unit: "N" },
          { symbol: "I", nameUz: "Tok kuchi", nameRu: "Сила тока", unit: "A" },
          { symbol: "B", nameUz: "Magnit induksiyasi", nameRu: "Магнитная индукция", unit: "T (Tesla)" },
          { symbol: "L", nameUz: "O'tkazgich uzunligi", nameRu: "Длина проводника", unit: "m" }
        ]
      },
      {
        latex: "\\mathcal{E}_i = -\\frac{\\Delta \\Phi}{\\Delta t}",
        titleUz: "Faradey qonuni",
        titleRu: "Закон Фарадея",
        variables: [
          { symbol: "Φ", nameUz: "Magnit oqimi", nameRu: "Магнитный поток", unit: "Wb (Veber)" }
        ]
      }
    ],
    realLifeUz: [
      "Elektr dvigatellari va avtomobil starterining aylanishi (Amper kuchi hisobiga).",
      "Gidro va issiqlik elektr stansiyalaridagi generatorlarning elektr ishlab chiqarishi (induksiya hodisasi)."
    ],
    realLifeRu: [
      "Вращение роторов электродвигателей бытовых приборов и электромобилей под действием силы Ампера.",
      "Генерация электричества турбинами электростанций по закону Фарадея."
    ],
    solvedExample: {
      problemUz: "Magnit induksiyasi 0.4 T bo'lgan bir jinsli maydonda uzunligi 0.5 m o'tkazgich maydon chiziqlariga perpendikulyar joylashgan. O'tkazgichdan 5 A tok o'tganda unga ta'sir qiluvchi Amper kuchini toping.",
      problemRu: "Проводник длиной 0.5 м расположен перпендикулярно линиям магнитного поля с индукцией 0.4 Тл. Найдите силу Ампера при токе 5 А.",
      given: [
        { key: "B", value: "0.4 T", labelUz: "Magnit induksiyasi", labelRu: "Индукция поля" },
        { key: "L", value: "0.5 m", labelUz: "Uzunlik", labelRu: "Длина" },
        { key: "I", value: "5 A", labelUz: "Tok", labelRu: "Ток" },
        { key: "α", value: "90° (sin 90° = 1)", labelUz: "Burchak", labelRu: "Угол" }
      ],
      findUz: "Fa (Amper kuchi, N)",
      findRu: "Fa (Сила Ампера, Н)",
      formula: "Fa = I * B * L * sin(α)",
      solutionUz: [
        "Fa = 5 * 0.4 * 0.5 * 1 = 1 N."
      ],
      solutionRu: [
        "Fa = 5 * 0.4 * 0.5 * 1 = 1 Н."
      ],
      answer: "Fa = 1 N"
    },
    practiceProblem: {
      questionUz: "B = 0.2 T maydonda L = 2 m uzunlikdagi simga 5 A tok berildi (perpendikulyar). Kuchni toping (N da).",
      questionRu: "В поле с B = 0.2 Тл находится провод длиной 2 м с током 5 А (перпендикулярно). Найдите силу (в Н).",
      answer: 2,
      tolerance: 0.1,
      unit: "N",
      hintUz: "F = I * B * L = 5 * 0.2 * 2.",
      hintRu: "F = I * B * L = 5 * 0.2 * 2.",
      solutionUz: "F = 5 * 0.2 * 2 = 2 N.",
      solutionRu: "F = 5 * 0.2 * 2 = 2 Н."
    },
    miniQuiz: [
      {
        questionUz: "Magnit maydonida harakatsiz turgan zaryadlangan zarrachaga Lorens kuchi ta'sir qiladimi?",
        questionRu: "Действует ли сила Лоренца на неподвижный электрический заряд в магнитном поле?",
        optionsUz: [
          "Yo'q, chunki zarracha tezligi nolga teng (v = 0)",
          "Ha, har doim maksimal kuch bilan ta'sir qiladi",
          "Faqat zaryad musbat bo'lsa ta'sir qiladi",
          "Faqat o'ta kuchli magnitlarda ta'sir qiladi"
        ],
        optionsRu: [
          "Нет, так как скорость частицы равна нулю (v = 0)",
          "Да, действует с постоянной силой",
          "Только если заряд положителен",
          "Только в сверхсильных магнитных полях"
        ],
        correctIndex: 0,
        explanationUz: "Lorens kuchi formulasida tezlik ko'paytuvchi sifatida qatnashadi: F = q*v*B*sin(α). v = 0 bo'lsa, F = 0 bo'ladi.",
        explanationRu: "Сила Лоренца пропорциональна скорости частицы: при v = 0 сила равна нулю."
      }
    ]
  },
  {
    id: 'optika',
    number: 12,
    categoryUz: 'Optika',
    categoryRu: 'Оптика',
    summaryUz: "Yorug'likning to'lqin va korpuskulyar tabiati, qaytish, sinish qonunlari, linzalar, interferensiya va difraksiya hodisalari.",
    summaryRu: 'Раздел физики, изучающий природу света, законы отражения и преломления, линзы, интерференцию и дифракцию.',
    definitions: [
      {
        termUz: "Yorug'likning sinish qonuni (Snellius)",
        termRu: "Закон преломления света (Снеллиус)",
        defUz: "Tushish burchagi sinusi bilan sinish burchagi sinusi nisbati ikki muhitning nisbiy sindirish ko'rsatkichiga teng: sin(α)/sin(β) = n2/n1.",
        defRu: "Отношение синуса угла падения к синусу угла преломления равно отношению показателей преломления двух сред."
      },
      {
        termUz: "Linza optik kuchi (D)",
        termRu: "Оптическая сила линзы (D)",
        defUz: "Linza fokus masofasiga teskari bo'lgan kattalik: D = 1 / F. Birligi dioptriya (dptr).",
        defRu: "Величина, обратная фокусному расстоянию линзы: D = 1 / F. Единица: диоптрия (дптр)."
      }
    ],
    mainFormulas: [
      {
        latex: "D = \\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}",
        titleUz: "Yupqa linza formulasi",
        titleRu: "Формула тонкой линзы",
        variables: [
          { symbol: "D", nameUz: "Optik kuch", nameRu: "Оптическая сила", unit: "dptr" },
          { symbol: "F", nameUz: "Fokus masofasi", nameRu: "Фокусное расстояние", unit: "m" },
          { symbol: "d", nameUz: "Jismdan linzagacha masofa", nameRu: "Расстояние от предмета", unit: "m" },
          { symbol: "f", nameUz: "Tasvirdan linzagacha masofa", nameRu: "Расстояние до изображения", unit: "m" }
        ]
      }
    ],
    realLifeUz: [
      "Ko'zoynak va kontakt linzalar orqali ko'rish quvvatini to'g'irlash.",
      "Mikroskop va teleskoplar orqali mikroolam va koinotni kuzatish."
    ],
    realLifeRu: [
      "Коррекция зрения очками и контактными линзами с нужной оптической силой в диоптриях.",
      "Построение увеличенных изображений в объективах фотоаппаратов и микроскопах."
    ],
    solvedExample: {
      problemUz: "Yig'uvchi linzaning fokus masofasi 0.2 m (20 cm). Uning optik kuchini toping.",
      problemRu: "Фокусное расстояние собирающей линзы равно 0.2 м. Найдите её оптическую силу.",
      given: [
        { key: "F", value: "0.2 m", labelUz: "Fokus masofasi", labelRu: "Фокусное расстояние" }
      ],
      findUz: "D (Optik kuch, dptr)",
      findRu: "D (Оптическая сила, дптр)",
      formula: "D = 1 / F",
      solutionUz: [
        "D = 1 / 0.2 = 5 dptr (dioptriya)."
      ],
      solutionRu: [
        "D = 1 / 0.2 = 5 дптр (диоптрий)."
      ],
      answer: "D = 5 dptr"
    },
    practiceProblem: {
      questionUz: "Optik kuchi D = 4 dptr bo'lgan linzaning fokus masofasi necha santimetr (cm)?",
      questionRu: "Каково фокусное расстояние линзы оптической силой 4 дптр в сантиметрах (см)?",
      answer: 25,
      tolerance: 0.5,
      unit: "cm",
      hintUz: "F = 1 / D = 1 / 4 = 0.25 m = 25 cm.",
      hintRu: "F = 1 / D = 1 / 4 = 0.25 м = 25 см.",
      solutionUz: "F = 1 / 4 = 0.25 m = 25 cm.",
      solutionRu: "F = 1 / 4 = 0.25 м = 25 см."
    },
    miniQuiz: [
      {
        questionUz: "Yorug'likning tekis ko'zgudan qaytishida tushish burchagi 30° bo'lsa, qaytish burchagi necha gradus bo'ladi?",
        questionRu: "Если угол падения луча света на плоское зеркало равен 30°, каков угол отражения?",
        optionsUz: [
          "30°",
          "60°",
          "90°",
          "15°"
        ],
        optionsRu: [
          "30°",
          "60°",
          "90°",
          "15°"
        ],
        correctIndex: 0,
        explanationUz: "Yorug'likning qaytish qonuniga ko'ra, tushish burchagi doimo qaytish burchagiga tengdir: α = γ.",
        explanationRu: "По закону отражения угол падения всегда равен углу отражения: α = γ."
      }
    ]
  },
  {
    id: 'tolqinlar',
    number: 13,
    categoryUz: 'To‘lqinlar',
    categoryRu: 'Волны',
    summaryUz: "Fazoda tebranishlarning tarqalish jarayoni, ko'ndalang va bo'ylama to'lqinlar, to'lqin uzunligi va chastotasi.",
    summaryRu: 'Процесс распространения механических и электромагнитных колебаний в среде, длина волны, скорость и частота.',
    definitions: [
      {
        termUz: "To'lqin uzunligi (λ)",
        termRu: "Длина волны (λ)",
        defUz: "To'lqinning bir tebranish davri (T) ichida bosib o'tgan masofasi: λ = v * T = v / f.",
        defRu: "Расстояние, на которое распространяется волна за время одного периода колебаний: λ = v / f."
      },
      {
        termUz: "Chastota (f)",
        termRu: "Частота (f)",
        defUz: "Bir soniya ichida sodir bo'ladigan to'liq tebranishlar soni. Birligi Gers (Hz).",
        defRu: "Число полных колебаний в одну секунду. Единица: Герц (Гц)."
      }
    ],
    mainFormulas: [
      {
        latex: "v = \\lambda \\cdot f",
        titleUz: "To'lqin tezligi",
        titleRu: "Скорость волны",
        variables: [
          { symbol: "v", nameUz: "To'lqin tarqalish tezligi", nameRu: "Скорость волны", unit: "m/s" },
          { symbol: "λ", nameUz: "To'lqin uzunligi", nameRu: "Длина волны", unit: "m" },
          { symbol: "f", nameUz: "Chastota", nameRu: "Частота", unit: "Hz" }
        ]
      }
    ],
    realLifeUz: [
      "Wi-Fi va mobil aloqaning 2.4 GHz va 5 GHz radio to'lqinlari orqali ma'lumot uzatishi.",
      "Suv yuzasiga tosh tashlanganda markazdan chetga tarqaluvchi halqasimon to'lqinlar."
    ],
    realLifeRu: [
      "Передача данных через Wi-Fi и сотовую связь с помощью электромагнитных волн.",
      "Расходящиеся круги на поверхности воды от брошенного камня."
    ],
    solvedExample: {
      problemUz: "Radio stansiya f = 100 MHz (100×10⁶ Hz) chastotada eshittirish bermoqda. To'lqin uzunligini toping (elektromagnit to'lqin tezligi c = 3×10⁸ m/s).",
      problemRu: "Радиостанция вещает на частоте 100 МГц (100×10⁶ Гц). Найдите длину волны в эфире (скорость света c = 3×10⁸ м/с).",
      given: [
        { key: "f", value: "100×10⁶ Hz", labelUz: "Chastota", labelRu: "Частота" },
        { key: "c", value: "3×10⁸ m/s", labelUz: "To'lqin tezligi", labelRu: "Скорость" }
      ],
      findUz: "λ (To'lqin uzunligi, m)",
      findRu: "λ (Длина волны, м)",
      formula: "λ = c / f",
      solutionUz: [
        "λ = (3×10⁸) / (100×10⁶) = 3 m."
      ],
      solutionRu: [
        "λ = (3×10⁸) / (100×10⁶) = 3 м."
      ],
      answer: "λ = 3 m"
    },
    practiceProblem: {
      questionUz: "Suv to'lqini 4 m/s tezlikda harakatlanmoqda. Agar to'lqin uzunligi 2 metr bo'lsa, uning chastotasi necha Hz?",
      questionRu: "Волна движется со скоростью 4 м/с. При длине волны 2 м какова её частота (в Гц)?",
      answer: 2,
      tolerance: 0.1,
      unit: "Hz",
      hintUz: "f = v / λ = 4 / 2.",
      hintRu: "f = v / λ = 4 / 2.",
      solutionUz: "f = 4 / 2 = 2 Hz.",
      solutionRu: "f = 4 / 2 = 2 Гц."
    },
    miniQuiz: [
      {
        questionUz: "Elektromagnit to'lqinlar bo'shliqda (vakuumda) tarqala oladimi?",
        questionRu: "Могут ли электромагнитные волны распространяться в абсолютном вакууме?",
        optionsUz: [
          "Ha, yorug'lik tezligida (300 000 km/s)",
          "Yo'q, faqat havoda tarqaladi",
          "Faqat suvda tarqaladi",
          "Faqat o'tkazgich ichida"
        ],
        optionsRu: [
          "Да, со скоростью света (300 000 км/с)",
          "Нет, только в воздушной среде",
          "Только в жидких средах",
          "Только внутри проводников"
        ],
        correctIndex: 0,
        explanationUz: "Elektromagnit to'lqinlar mexanik to'lqinlardan farqli o'laroq moddiy muhitga muhtoj emas va vakuumda ham 300 000 km/s tezlikda tarqaladi.",
        explanationRu: "Электромагнитным волнам не нужна среда — они свободно распространяются в космическом вакууме со скоростью света."
      }
    ]
  },
  {
    id: 'akustika',
    number: 14,
    categoryUz: 'Akustika',
    categoryRu: 'Акустика',
    summaryUz: "Tovush to'lqinlarining hosil bo'lishi, tarqalishi, qaytishi, aks-sado, ultratovush va infratovush hodisalari.",
    summaryRu: 'Учение о звуке: природа звуковых волн, скорость звука в средах, громкость, высота тона, эхо и ультразвук.',
    definitions: [
      {
        termUz: "Tovush to'lqini",
        termRu: "Звуковая волна",
        defUz: "Elastik muhitda (gaz, suyuqlik, qattiq jism) tarqaluvchi va inson qulog'i (16 - 20 000 Hz) eshita oladigan bo'ylama mexanik to'lqin.",
        defRu: "Продольные механические волны в упругой среде, воспринимаемые человеческим ухом в диапазоне 16 – 20 000 Гц."
      },
      {
        termUz: "Aks-sado (Exo)",
        termRu: "Эхо",
        defUz: "Tovush to'lqinining to'siqdan qaytib, manbaga yetib kelishi natijasida eshitiladigan hodisa.",
        defRu: "Звуковая волна, отраженная от препятствия и возвращенная к источнику."
      }
    ],
    mainFormulas: [
      {
        latex: "s = \\frac{v_{tovush} \\cdot t}{2}",
        titleUz: "Exolot (aks-sado) masofa formulasi",
        titleRu: "Эхолокация (расстояние до преграды)",
        variables: [
          { symbol: "s", nameUz: "To'siqqacha masofa", nameRu: "Расстояние до преграды", unit: "m" },
          { symbol: "v", nameUz: "Tovush tezligi (havoda ~340 m/s)", nameRu: "Скорость звука в среде", unit: "m/s" },
          { symbol: "t", nameUz: "Borib-qaytish vaqti", nameRu: "Время туда и обратно", unit: "s" }
        ]
      }
    ],
    realLifeUz: [
      "Ko'rshapalaklarning qorong'uda to'siqlarni ultratovush exolokatsiyasi orqali aniqlashi.",
      "Tibbiyotda ichki a'zolarni zararsiz tekshirish uchun qo'llaniladigan UTT (УЗИ) apparati."
    ],
    realLifeRu: [
      "Ориентация летучих мышей в темноте с помощью ультразвуковой эхолокации.",
      "Ультразвуковое исследование (УЗИ) в современной медицине."
    ],
    solvedExample: {
      problemUz: "Momaqaldiroq chaqnagandan 4 soniya o'tib gumburlash eshitildi. Chaqmoq chaqqan joygacha bo'lgan masofani toping (havoda tovush tezligi 340 m/s).",
      problemRu: "Гром прогремел через 4 секунды после вспышки молнии. На каком расстоянии произошел разряд (скорость звука в воздухе 340 м/с)?",
      given: [
        { key: "v", value: "340 m/s", labelUz: "Tovush tezligi", labelRu: "Скорость звука" },
        { key: "t", value: "4 s", labelUz: "Kechikish vaqti", labelRu: "Время задержки" }
      ],
      findUz: "s (Masofa, m)",
      findRu: "s (Расстояние, м)",
      formula: "s = v * t",
      solutionUz: [
        "Yorug'lik lahzada yetib keladi deb hisoblasak, tovush 4 soniya harakatlangan.",
        "s = 340 * 4 = 1360 m (1.36 km)."
      ],
      solutionRu: [
        "Свет распространяется практически мгновенно, звук дошел за 4 с.",
        "s = 340 * 4 = 1360 м (1.36 км)."
      ],
      answer: "s = 1360 m"
    },
    practiceProblem: {
      questionUz: "Kema exoloti dengiz tubiga ultratovush yubordi va 2 soniyadan so'ng aks-sadoni qabul qildi. Suvda tovush tezligi 1500 m/s bo'lsa, dengiz chuqurligini toping (metrda).",
      questionRu: "Эхолот корабля уловил отраженный сигнал со дна моря через 2 секунды. Скорость звука в воде 1500 м/с. Найдите глубину (в метрах).",
      answer: 1500,
      tolerance: 10,
      unit: "m",
      hintUz: "s = (v * t) / 2 = (1500 * 2) / 2 = 1500 m.",
      hintRu: "s = (v * t) / 2 = (1500 * 2) / 2 = 1500 м.",
      solutionUz: "s = (1500 * 2) / 2 = 1500 m.",
      solutionRu: "s = (1500 * 2) / 2 = 1500 м."
    },
    miniQuiz: [
      {
        questionUz: "Tovush tezligi qaysi muhitda eng yuqori bo'ladi?",
        questionRu: "В какой среде скорость звука максимальна?",
        optionsUz: [
          "Qattiq jismlarda (masalan, po'latda)",
          "Gazlarda (havoda)",
          "Vakuumda",
          "Hamma muhitda bir xil"
        ],
        optionsRu: [
          "В твердых телах (например, в стали)",
          "В газах (в воздухе)",
          "В вакууме",
          "Одинакова во всех средах"
        ],
        correctIndex: 0,
        explanationUz: "Qattiq jismlarda molekulalar bir-biriga juda zich joylashgani tufayli tovush to'lqini eng tez (po'latda ~5000 m/s) tarqaladi. Havoda esa bor-yo'g'i ~340 m/s.",
        explanationRu: "В твердых телах упругие силы связи между атомами максимальны, скорость звука в стали достигает ~5000 м/с."
      }
    ]
  },
  {
    id: 'atom_fizikasi',
    number: 15,
    categoryUz: 'Atom fizikasi',
    categoryRu: 'Атомная физика',
    summaryUz: "Atom tuzilishi, Bor postulatlari, fotoeffekt hodisasi va yorug'lik fotonlarining kvant xususiyatlari.",
    summaryRu: 'Строение атома, постулаты Бора, фотоэффект и квантовая природа электромагнитного излучения (фотоны).',
    definitions: [
      {
        termUz: "Foton energiyasi",
        termRu: "Энергия фотона",
        defUz: "Yorug'lik kvantining chastotaga proportsional bo'lgan energiyasi: E = h * f.",
        defRu: "Энергия неделимого кванта света: E = h * f, где h — постоянная Планка."
      },
      {
        termUz: "Tashqi fotoeffekt",
        termRu: "Внешний фотоэффект",
        defUz: "Yorug'lik ta'sirida moddadan elektronlarning urib chiqarilishi hodisasi.",
        defRu: "Явление испускания электронов веществом под действием падающего света."
      }
    ],
    mainFormulas: [
      {
        latex: "E = h \\cdot f = \\frac{h c}{\\lambda}",
        titleUz: "Plank formulasi",
        titleRu: "Формула Планка",
        variables: [
          { symbol: "h", nameUz: "Plank doimiysi (6.626×10⁻³⁴)", nameRu: "Постоянная Планка", unit: "J·s" },
          { symbol: "f", nameUz: "Chastota", nameRu: "Частота", unit: "Hz" }
        ]
      },
      {
        latex: "h f = A_{chiq} + \\frac{m v^2}{2}",
        titleUz: "Eynshteynning fotoeffekt tenglamasi",
        titleRu: "Уравнение Эйнштейна для фотоэффекта",
        variables: [
          { symbol: "Achiq", nameUz: "Chiqish ishi", nameRu: "Работа выхода", unit: "J" }
        ]
      }
    ],
    realLifeUz: [
      "Quyosh panellarining quyosh nurlaridan bevosita elektr toki ishlab chiqarishi (fotoeffekt).",
      "Savdo markazlarida eshiklarning odam yaqinlashganda avtomatik ochilishi (fotoelementlar)."
    ],
    realLifeRu: [
      "Работа солнечных батарей, превращающих кванты солнечного света в электричество.",
      "Фотоэлементы и сенсоры движения, открывающие автоматические двери."
    ],
    solvedExample: {
      problemUz: "Chastotasi 5×10¹⁴ Hz bo'lgan yashil rangli yorug'lik fotonining energiyasini hisoblang (h = 6.63×10⁻³⁴ J·s).",
      problemRu: "Рассчитайте энергию фотона зеленого света с частотой 5×10¹⁴ Гц (h = 6.63×10⁻³⁴ Дж·с).",
      given: [
        { key: "f", value: "5×10¹⁴ Hz", labelUz: "Chastota", labelRu: "Частота" },
        { key: "h", value: "6.63×10⁻³⁴ J·s", labelUz: "Plank doimiysi", labelRu: "Постоянная Планка" }
      ],
      findUz: "E (Foton energiyasi, J)",
      findRu: "E (Энергия фотона, Дж)",
      formula: "E = h * f",
      solutionUz: [
        "E = 6.63×10⁻³⁴ * 5×10¹⁴ = 3.315×10⁻¹⁹ J (taxminan 2.07 eV)."
      ],
      solutionRu: [
        "E = 6.63×10⁻³⁴ * 5×10¹⁴ = 3.315×10⁻¹⁹ Дж (примерно 2.07 эВ)."
      ],
      answer: "E = 3.315×10⁻¹⁹ J"
    },
    practiceProblem: {
      questionUz: "Agar yorug'lik chastotasi 2 marta oshsa, foton energiyasi necha marta ortadi?",
      questionRu: "Во сколько раз увеличится энергия фотона при увеличении частоты света в 2 раза?",
      answer: 2,
      tolerance: 0,
      unit: "marta",
      hintUz: "E = h * f to'g'ri proportsional bog'liqlik.",
      hintRu: "E = h * f — прямая пропорциональность.",
      solutionUz: "E ~ f, demak chastota 2 marta oshsa, energiya ham 2 marta ortadi.",
      solutionRu: "E ~ f, энергия пропорциональна частоте и вырастет в 2 раза."
    },
    miniQuiz: [
      {
        questionUz: "Bor postulati bo'yicha atom qachon foton nurlatadi?",
        questionRu: "Согласно постулатам Бора, когда атом испускает фотон света?",
        optionsUz: [
          "Elektron yuqori energetik sathdan pastki sathga o'tganda",
          "Elektron pastki sathdan yuqoriga o'tganda",
          "Statsionar orbitada tinch turganda",
          "Faqat atom parchalanganda"
        ],
        optionsRu: [
          "При переходе электрона с более высокого энергетического уровня на более низкий",
          "При переходе электрона с нижнего уровня на верхний",
          "При стационарном движении по неизменной орбите",
          "Только при делении ядра"
        ],
        correctIndex: 0,
        explanationUz: "Borning 2-postulati: elektron yuqori energiya sathidan pastki sathga sakraganda oradagi farq foton shaklida ajralib chiqadi: hf = E2 - E1.",
        explanationRu: "При переходе с возбужденного уровня на более низкий излучается квант с энергией hf = E2 - E1."
      }
    ]
  },
  {
    id: 'yadro_fizikasi',
    number: 16,
    categoryUz: 'Yadro fizikasi',
    categoryRu: 'Ядерная физика',
    summaryUz: "Atom yadrosi tuzilishi, radioaktiv yemirilish qonuni, yadro reaksiyalari, massa defekti va yadro energetikasi.",
    summaryRu: 'Строение атомного ядра, радиоактивный распад, ядерные реакции, дефект масс и энергия связи ядра.',
    definitions: [
      {
        termUz: "Yadro bog'lanish energiyasi",
        termRu: "Энергия связи ядра",
        defUz: "Yadroni uni tashkil etuvchi ayrim proton va neytronlarga to'liq ajratish uchun zarur bo'lgan minimal energiya.",
        defRu: "Минимальная энергия, необходимая для полного расщепления ядра на отдельные нуклоны."
      },
      {
        termUz: "Eynshteyn formulasi (Massa va energiya ekvivalentligi)",
        termRu: "Эквивалентность массы и энергии (Эйнштейн)",
        defUz: "Jismning tinchlikdagi massasi va uning to'liq energiyasi o'rtasidagi universal bog'liqlik: E = m * c².",
        defRu: "Фундаментальный закон, связывающий массу покоя и полную энергию: E = m * c²."
      }
    ],
    mainFormulas: [
      {
        latex: "E = m \\cdot c^2",
        titleUz: "Eynshteynning mashhur formulasi",
        titleRu: "Формула Эйнштейна",
        variables: [
          { symbol: "E", nameUz: "Energiya", nameRu: "Энергия", unit: "J" },
          { symbol: "m", nameUz: "Massa", nameRu: "Масса", unit: "kg" },
          { symbol: "c", nameUz: "Yorug'lik tezligi (3×10⁸)", nameRu: "Скорость света", unit: "m/s" }
        ]
      },
      {
        latex: "N(t) = N_0 \\cdot 2^{-\\frac{t}{T}}",
        titleUz: "Radioaktiv yemirilish qonuni",
        titleRu: "Закон радиоактивного распада",
        variables: [
          { symbol: "N0", nameUz: "Dastlabki yadrolar soni", nameRu: "Начальное число ядер", unit: "dona" },
          { symbol: "T", nameUz: "Yarim yemirilish davri", nameRu: "Период полураспада", unit: "s yoki yil" }
        ]
      }
    ],
    realLifeUz: [
      "Atom elektr stansiyalarida (AES) uran yadrolarining bo'linishi hisobiga ulkan toza elektr energiyasi olish.",
      "Arxeologiyada qadimiy suyaklar va buyumlarning yoshini aniqlovchi Radiouglerod (C-14) usuli."
    ],
    realLifeRu: [
      "Выработка огромного объема электроэнергии на современных атомных станциях (АЭС).",
      "Радиоуглеродный анализ в археологии для точного определения возраста находок."
    ],
    solvedExample: {
      problemUz: "Radioaktiv elementning yarim yemirilish davri 10 kun. 30 kundan so'ng dastlabki yadrolarning qancha qismi qoladi?",
      problemRu: "Период полураспада радиоактивного изотопа равен 10 дней. Какая доля исходных ядер останется через 30 дней?",
      given: [
        { key: "T", value: "10 kun", labelUz: "Yarim yemirilish davri", labelRu: "Период полураспада" },
        { key: "t", value: "30 kun", labelUz: "O'tgan vaqt", labelRu: "Время" }
      ],
      findUz: "N / N0 (Qolgan ulush)",
      findRu: "N / N0 (Оставшаяся доля)",
      formula: "N / N0 = (1/2)^(t / T)",
      solutionUz: [
        "Yarim yemirilishlar soni: n = t / T = 30 / 10 = 3 marta.",
        "Qolgan ulush: (1/2)³ = 1/8 qismi (yoki 12.5%)."
      ],
      solutionRu: [
        "Число периодов распада: n = 30 / 10 = 3.",
        "Останется: (1/2)³ = 1/8 часть (или 12.5% от первоначального количества)."
      ],
      answer: "1/8 (12.5%)"
    },
    practiceProblem: {
      questionUz: "1 gramm modda to'liq energiyaga aylansa (E = mc²), necha TeraJoul (TJ = 10¹² J) energiya hosil bo'ladi? (c = 3×10⁸ m/s, m = 0.001 kg).",
      questionRu: "Если 1 грамм массы полностью превратится в энергию (E = mc²), сколько ТераДжоулей (ТДж = 10¹² Дж) выделится?",
      answer: 90,
      tolerance: 1,
      unit: "TJ",
      hintUz: "E = 0.001 * (3×10⁸)² = 0.001 * 9×10¹⁶ = 9×10¹³ J = 90×10¹² J = 90 TJ.",
      hintRu: "E = 0.001 * (3×10⁸)² = 9×10¹³ Дж = 90 ТДж.",
      solutionUz: "E = 0.001 * 9×10¹⁶ = 9×10¹³ J = 90 TJ.",
      solutionRu: "E = 0.001 * 9×10¹⁶ = 9×10¹³ Дж = 90 ТДж."
    },
    miniQuiz: [
      {
        questionUz: "Atom yadrosi qanday zarralardan tashkil topgan?",
        questionRu: "Из каких элементарных частиц состоит атомное ядро?",
        optionsUz: [
          "Protonlar va neytronlardan",
          "Protonlar va elektronlardan",
          "Faqat neytronlardan",
          "Fotonlar va elektronlardan"
        ],
        optionsRu: [
          "Из протонов и нейтронов",
          "Из протонов и электронов",
          "Только из нейтронов",
          "Из фотонов и позитронов"
        ],
        correctIndex: 0,
        explanationUz: "Atom yadrosi nuklonlar — musbat zaryadli protonlar va zaryadsiz neytronlardan tashkil topgan bo'lib, ular kuchli yadroviy o'zaro ta'sir kuchlari bilan birga tutib turiladi.",
        explanationRu: "Атомное ядро состоит из нуклонов — положительных протонов и нейтральных нейтронов, связанных ядерными силами."
      }
    ]
  }
];
