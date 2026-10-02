import { CalculatorConfig } from '../types';

export const CALCULATORS: CalculatorConfig[] = [
  // 1. Velocity: v = s / t
  {
    id: 'calc_v',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    titleUz: 'Tezlik: v = s / t',
    titleRu: 'Скорость: v = s / t',
    formulaDisplay: 'v = s / t',
    inputs: [
      { id: 's', labelUz: 'Masofa (s)', labelRu: 'Путь (s)', symbol: 's', unit: 'm', defaultValue: 100, min: 0 },
      { id: 't', labelUz: 'Vaqt (t)', labelRu: 'Время (t)', symbol: 't', unit: 's', defaultValue: 5, min: 0.0001 }
    ],
    calculate: (inputs) => {
      const { s, t } = inputs;
      if (t === 0) throw new Error('Vaqt nol bo\'lishi mumkin emas!');
      const v = s / t;
      return {
        result: v,
        formattedResult: v.toFixed(3).replace(/\.?0+$/, ''),
        unit: 'm/s',
        formulaUsed: 'v = s / t',
        stepsUz: [
          `1. Berilgan kattaliklar: s = ${s} m, t = ${t} s`,
          `2. Formulaga qo'yamiz: v = ${s} / ${t}`,
          `3. Natija: v = ${(s / t).toFixed(3).replace(/\.?0+$/, '')} m/s (${((s / t) * 3.6).toFixed(2)} km/h)`
        ],
        stepsRu: [
          `1. Исходные данные: s = ${s} м, t = ${t} с`,
          `2. Подставляем в формулу: v = ${s} / ${t}`,
          `3. Результат: v = ${(s / t).toFixed(3).replace(/\.?0+$/, '')} м/с (${((s / t) * 3.6).toFixed(2)} км/ч)`
        ]
      };
    }
  },

  // 2. Distance: s = v * t
  {
    id: 'calc_s',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    titleUz: 'Masofa: s = v · t',
    titleRu: 'Путь: s = v · t',
    formulaDisplay: 's = v · t',
    inputs: [
      { id: 'v', labelUz: 'Tezlik (v)', labelRu: 'Скорость (v)', symbol: 'v', unit: 'm/s', defaultValue: 20 },
      { id: 't', labelUz: 'Vaqt (t)', labelRu: 'Время (t)', symbol: 't', unit: 's', defaultValue: 10, min: 0 }
    ],
    calculate: (inputs) => {
      const { v, t } = inputs;
      const s = v * t;
      return {
        result: s,
        formattedResult: s.toFixed(3).replace(/\.?0+$/, ''),
        unit: 'm',
        formulaUsed: 's = v · t',
        stepsUz: [
          `1. Berilgan kattaliklar: v = ${v} m/s, t = ${t} s`,
          `2. Formulaga qo'yamiz: s = ${v} · ${t}`,
          `3. Natija: s = ${s.toFixed(3).replace(/\.?0+$/, '')} m (${(s / 1000).toFixed(3)} km)`
        ],
        stepsRu: [
          `1. Исходные данные: v = ${v} м/с, t = ${t} с`,
          `2. Подставляем в формулу: s = ${v} · ${t}`,
          `3. Результат: s = ${s.toFixed(3).replace(/\.?0+$/, '')} м (${(s / 1000).toFixed(3)} км)`
        ]
      };
    }
  },

  // 3. Time: t = s / v
  {
    id: 'calc_t',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    titleUz: 'Vaqt: t = s / v',
    titleRu: 'Время: t = s / v',
    formulaDisplay: 't = s / v',
    inputs: [
      { id: 's', labelUz: 'Masofa (s)', labelRu: 'Путь (s)', symbol: 's', unit: 'm', defaultValue: 500, min: 0 },
      { id: 'v', labelUz: 'Tezlik (v)', labelRu: 'Скорость (v)', symbol: 'v', unit: 'm/s', defaultValue: 25, min: 0.0001 }
    ],
    calculate: (inputs) => {
      const { s, v } = inputs;
      if (v === 0) throw new Error('Tezlik nol bo\'lishi mumkin emas!');
      const t = s / v;
      return {
        result: t,
        formattedResult: t.toFixed(3).replace(/\.?0+$/, ''),
        unit: 's',
        formulaUsed: 't = s / v',
        stepsUz: [
          `1. Berilgan: s = ${s} m, v = ${v} m/s`,
          `2. Formulaga qo'yamiz: t = ${s} / ${v}`,
          `3. Natija: t = ${t.toFixed(3).replace(/\.?0+$/, '')} s`
        ],
        stepsRu: [
          `1. Дано: s = ${s} м, v = ${v} м/с`,
          `2. Подставляем в формулу: t = ${s} / ${v}`,
          `3. Результат: t = ${t.toFixed(3).replace(/\.?0+$/, '')} с`
        ]
      };
    }
  },

  // 4. Acceleration: a = (v - v0) / t
  {
    id: 'calc_a',
    category: 'kinematika',
    categoryUz: 'Kinematika',
    categoryRu: 'Кинематика',
    titleUz: 'Tezlanish: a = (v - v₀) / t',
    titleRu: 'Ускорение: a = (v - v₀) / t',
    formulaDisplay: 'a = (v - v₀) / t',
    inputs: [
      { id: 'v', labelUz: 'Oxirgi tezlik (v)', labelRu: 'Конечная скорость (v)', symbol: 'v', unit: 'm/s', defaultValue: 30 },
      { id: 'v0', labelUz: 'Boshlang\'ich tezlik (v₀)', labelRu: 'Начальная скорость (v₀)', symbol: 'v₀', unit: 'm/s', defaultValue: 0 },
      { id: 't', labelUz: 'Vaqt (t)', labelRu: 'Время (t)', symbol: 't', unit: 's', defaultValue: 6, min: 0.0001 }
    ],
    calculate: (inputs) => {
      const { v, v0, t } = inputs;
      if (t === 0) throw new Error('Vaqt nol bo\'lishi mumkin emas!');
      const a = (v - v0) / t;
      return {
        result: a,
        formattedResult: a.toFixed(3).replace(/\.?0+$/, ''),
        unit: 'm/s²',
        formulaUsed: 'a = (v - v₀) / t',
        stepsUz: [
          `1. Tezlik o'zgarishi: Δv = ${v} - ${v0} = ${v - v0} m/s`,
          `2. Tezlanish formulasi: a = Δv / t = (${v - v0}) / ${t}`,
          `3. Natija: a = ${a.toFixed(3).replace(/\.?0+$/, '')} m/s²`
        ],
        stepsRu: [
          `1. Изменение скорости: Δv = ${v} - ${v0} = ${v - v0} м/с`,
          `2. Формула ускорения: a = Δv / t = (${v - v0}) / ${t}`,
          `3. Результат: a = ${a.toFixed(3).replace(/\.?0+$/, '')} м/с²`
        ]
      };
    }
  },

  // 5. Newton's 2nd Law: F = m * a
  {
    id: 'calc_f_ma',
    category: 'dinamika',
    categoryUz: 'Dinamika',
    categoryRu: 'Динамика',
    titleUz: 'Nyuton 2-qonuni: F = m · a',
    titleRu: '2-й закон Ньютона: F = m · a',
    formulaDisplay: 'F = m · a',
    inputs: [
      { id: 'm', labelUz: 'Massa (m)', labelRu: 'Масса (m)', symbol: 'm', unit: 'kg', defaultValue: 10, min: 0.0001 },
      { id: 'a', labelUz: 'Tezlanish (a)', labelRu: 'Ускорение (a)', symbol: 'a', unit: 'm/s²', defaultValue: 3 }
    ],
    calculate: (inputs) => {
      const { m, a } = inputs;
      if (m <= 0) throw new Error('Massa musbat bo\'lishi kerak!');
      const F = m * a;
      return {
        result: F,
        formattedResult: F.toFixed(3).replace(/\.?0+$/, ''),
        unit: 'N',
        formulaUsed: 'F = m · a',
        stepsUz: [
          `1. Berilgan: jism massasi m = ${m} kg, tezlanish a = ${a} m/s²`,
          `2. Formulaga qo'yamiz: F = ${m} · ${a}`,
          `3. Jismga ta'sir qiluvchi kuch: F = ${F.toFixed(3).replace(/\.?0+$/, '')} N (Nyuton)`
        ],
        stepsRu: [
          `1. Дано: масса m = ${m} кг, ускорение a = ${a} м/с²`,
          `2. Подставляем в закон: F = ${m} · ${a}`,
          `3. Сила равна: F = ${F.toFixed(3).replace(/\.?0+$/, '')} Н (Ньютон)`
        ]
      };
    }
  },

  // 6. Weight: P = m * g
  {
    id: 'calc_weight',
    category: 'dinamika',
    categoryUz: 'Dinamika',
    categoryRu: 'Динамика',
    titleUz: 'Og\'irlik kuchi: P = m · g',
    titleRu: 'Сила тяжести: P = m · g',
    formulaDisplay: 'P = m · g',
    inputs: [
      { id: 'm', labelUz: 'Massa (m)', labelRu: 'Масса (m)', symbol: 'm', unit: 'kg', defaultValue: 70, min: 0.0001 },
      { id: 'g', labelUz: 'g (Erkin tushish tezlanishi)', labelRu: 'g (Ускорение своб. падения)', symbol: 'g', unit: 'm/s²', defaultValue: 9.8 }
    ],
    calculate: (inputs) => {
      const { m, g } = inputs;
      const P = m * g;
      return {
        result: P,
        formattedResult: P.toFixed(2),
        unit: 'N',
        formulaUsed: 'P = m · g',
        stepsUz: [
          `1. Berilgan: m = ${m} kg, g = ${g} m/s²`,
          `2. Formulaga qo'yamiz: P = ${m} · ${g}`,
          `3. Natija: P = ${P.toFixed(2)} N`
        ],
        stepsRu: [
          `1. Дано: m = ${m} кг, g = ${g} м/с²`,
          `2. Подставляем в формулу: P = ${m} · ${g}`,
          `3. Результат: P = ${P.toFixed(2)} Н`
        ]
      };
    }
  },

  // 7. Work: A = F * s
  {
    id: 'calc_work',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    titleUz: 'Mexanik ish: A = F · s',
    titleRu: 'Механическая работа: A = F · s',
    formulaDisplay: 'A = F · s',
    inputs: [
      { id: 'F', labelUz: 'Kuch (F)', labelRu: 'Сила (F)', symbol: 'F', unit: 'N', defaultValue: 50 },
      { id: 's', labelUz: 'Ko\'chish (s)', labelRu: 'Перемещение (s)', symbol: 's', unit: 'm', defaultValue: 12, min: 0 }
    ],
    calculate: (inputs) => {
      const { F, s } = inputs;
      const A = F * s;
      return {
        result: A,
        formattedResult: A.toFixed(2),
        unit: 'J',
        formulaUsed: 'A = F · s',
        stepsUz: [
          `1. Berilgan: F = ${F} N, s = ${s} m`,
          `2. Formulaga qo'yamiz: A = ${F} · ${s}`,
          `3. Bajarilgan ish: A = ${A.toFixed(2)} J (${(A / 1000).toFixed(3)} kJ)`
        ],
        stepsRu: [
          `1. Дано: F = ${F} Н, s = ${s} м`,
          `2. Подставляем в формулу: A = ${F} · ${s}`,
          `3. Совершенная работа: A = ${A.toFixed(2)} Дж (${(A / 1000).toFixed(3)} кДж)`
        ]
      };
    }
  },

  // 8. Power: P = A / t
  {
    id: 'calc_power',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    titleUz: 'Quvvat: P = A / t',
    titleRu: 'Мощность: P = A / t',
    formulaDisplay: 'P = A / t',
    inputs: [
      { id: 'A', labelUz: 'Ish (A)', labelRu: 'Работа (A)', symbol: 'A', unit: 'J', defaultValue: 3000 },
      { id: 't', labelUz: 'Vaqt (t)', labelRu: 'Время (t)', symbol: 't', unit: 's', defaultValue: 10, min: 0.0001 }
    ],
    calculate: (inputs) => {
      const { A, t } = inputs;
      if (t === 0) throw new Error('Vaqt nol bo\'lishi mumkin emas!');
      const P = A / t;
      return {
        result: P,
        formattedResult: P.toFixed(2),
        unit: 'W',
        formulaUsed: 'P = A / t',
        stepsUz: [
          `1. Berilgan: Ish A = ${A} J, Vaqt t = ${t} s`,
          `2. Quvvat formulasi: P = ${A} / ${t}`,
          `3. Natija: P = ${P.toFixed(2)} W (${(P / 1000).toFixed(3)} kW)`
        ],
        stepsRu: [
          `1. Дано: Работа A = ${A} Дж, Время t = ${t} с`,
          `2. Формула мощности: P = ${A} / ${t}`,
          `3. Результат: P = ${P.toFixed(2)} Вт (${(P / 1000).toFixed(3)} кВт)`
        ]
      };
    }
  },

  // 9. Kinetic Energy: Ek = m * v² / 2
  {
    id: 'calc_ek',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    titleUz: 'Kinetik energiya: Ek = m · v² / 2',
    titleRu: 'Кинетическая энергия: Ek = m · v² / 2',
    formulaDisplay: 'E_k = (m · v²) / 2',
    inputs: [
      { id: 'm', labelUz: 'Massa (m)', labelRu: 'Масса (m)', symbol: 'm', unit: 'kg', defaultValue: 2, min: 0.0001 },
      { id: 'v', labelUz: 'Tezlik (v)', labelRu: 'Скорость (v)', symbol: 'v', unit: 'm/s', defaultValue: 10 }
    ],
    calculate: (inputs) => {
      const { m, v } = inputs;
      const Ek = (m * Math.pow(v, 2)) / 2;
      return {
        result: Ek,
        formattedResult: Ek.toFixed(2),
        unit: 'J',
        formulaUsed: 'E_k = (m · v²) / 2',
        stepsUz: [
          `1. Berilgan: m = ${m} kg, v = ${v} m/s`,
          `2. Tezlik kvadrati: v² = (${v})² = ${Math.pow(v, 2)} m²/s²`,
          `3. Formulaga qo'yamiz: Ek = (${m} · ${Math.pow(v, 2)}) / 2 = ${(m * Math.pow(v, 2)) / 2} J`
        ],
        stepsRu: [
          `1. Дано: m = ${m} кг, v = ${v} м/с`,
          `2. Квадрат скорости: v² = ${Math.pow(v, 2)} м²/с²`,
          `3. Результат: Ek = (${m} · ${Math.pow(v, 2)}) / 2 = ${Ek.toFixed(2)} Дж`
        ]
      };
    }
  },

  // 10. Potential Energy: Ep = m * g * h
  {
    id: 'calc_ep',
    category: 'ish_va_energiya',
    categoryUz: 'Ish va energiya',
    categoryRu: 'Работа и энергия',
    titleUz: 'Potensial energiya: Ep = m · g · h',
    titleRu: 'Потенциальная энергия: Ep = m · g · h',
    formulaDisplay: 'E_p = m · g · h',
    inputs: [
      { id: 'm', labelUz: 'Massa (m)', labelRu: 'Масса (m)', symbol: 'm', unit: 'kg', defaultValue: 5, min: 0.0001 },
      { id: 'g', labelUz: 'g', labelRu: 'g', symbol: 'g', unit: 'm/s²', defaultValue: 9.8 },
      { id: 'h', labelUz: 'Balandlik (h)', labelRu: 'Высота (h)', symbol: 'h', unit: 'm', defaultValue: 10 }
    ],
    calculate: (inputs) => {
      const { m, g, h } = inputs;
      const Ep = m * g * h;
      return {
        result: Ep,
        formattedResult: Ep.toFixed(2),
        unit: 'J',
        formulaUsed: 'E_p = m · g · h',
        stepsUz: [
          `1. Berilgan: m = ${m} kg, g = ${g} m/s², h = ${h} m`,
          `2. Formulaga qo'yamiz: Ep = ${m} · ${g} · ${h}`,
          `3. Natija: Ep = ${Ep.toFixed(2)} J`
        ],
        stepsRu: [
          `1. Дано: m = ${m} кг, g = ${g} м/с², h = ${h} м`,
          `2. Подставляем в формулу: Ep = ${m} · ${g} · ${h}`,
          `3. Результат: Ep = ${Ep.toFixed(2)} Дж`
        ]
      };
    }
  },

  // 11. Momentum: p = m * v
  {
    id: 'calc_momentum',
    category: 'impuls',
    categoryUz: 'Impuls',
    categoryRu: 'Импульс',
    titleUz: 'Impuls: p = m · v',
    titleRu: 'Импульс: p = m · v',
    formulaDisplay: 'p = m · v',
    inputs: [
      { id: 'm', labelUz: 'Massa (m)', labelRu: 'Масса (m)', symbol: 'm', unit: 'kg', defaultValue: 4, min: 0.0001 },
      { id: 'v', labelUz: 'Tezlik (v)', labelRu: 'Скорость (v)', symbol: 'v', unit: 'm/s', defaultValue: 15 }
    ],
    calculate: (inputs) => {
      const { m, v } = inputs;
      const p = m * v;
      return {
        result: p,
        formattedResult: p.toFixed(2),
        unit: 'kg·m/s',
        formulaUsed: 'p = m · v',
        stepsUz: [
          `1. Berilgan: m = ${m} kg, v = ${v} m/s`,
          `2. Formulaga qo'yamiz: p = ${m} · ${v}`,
          `3. Jism impulsi: p = ${p.toFixed(2)} kg·m/s`
        ],
        stepsRu: [
          `1. Дано: m = ${m} кг, v = ${v} м/с`,
          `2. Подставляем в формулу: p = ${m} · ${v}`,
          `3. Импульс тела: p = ${p.toFixed(2)} кг·м/с`
        ]
      };
    }
  },

  // 12. Ohm's Law: I = U / R
  {
    id: 'calc_ohm',
    category: 'elektr',
    categoryUz: 'Elektr',
    categoryRu: 'Электричество',
    titleUz: 'Om qonuni: I = U / R',
    titleRu: 'Закон Ома: I = U / R',
    formulaDisplay: 'I = U / R',
    inputs: [
      { id: 'U', labelUz: 'Kuchlanish (U)', labelRu: 'Напряжение (U)', symbol: 'U', unit: 'V', defaultValue: 220, min: 0 },
      { id: 'R', labelUz: 'Qarshilik (R)', labelRu: 'Сопротивление (R)', symbol: 'R', unit: 'Ω', defaultValue: 44, min: 0.0001 }
    ],
    calculate: (inputs) => {
      const { U, R } = inputs;
      if (R <= 0) throw new Error('Qarshilik noldan katta bo\'lishi kerak!');
      const I = U / R;
      return {
        result: I,
        formattedResult: I.toFixed(3).replace(/\.?0+$/, ''),
        unit: 'A',
        formulaUsed: 'I = U / R',
        stepsUz: [
          `1. Berilgan: Kuchlanish U = ${U} V, Qarshilik R = ${R} Ω`,
          `2. Om qonuniga qo'yamiz: I = ${U} / ${R}`,
          `3. Tok kuchi: I = ${I.toFixed(3).replace(/\.?0+$/, '')} A (Amper)`
        ],
        stepsRu: [
          `1. Дано: Напряжение U = ${U} В, Сопротивление R = ${R} Ом`,
          `2. Закон Ома: I = ${U} / ${R}`,
          `3. Сила тока: I = ${I.toFixed(3).replace(/\.?0+$/, '')} А (Ампер)`
        ]
      };
    }
  },

  // 13. Electric Power: P = U * I
  {
    id: 'calc_elec_power',
    category: 'elektr',
    categoryUz: 'Elektr',
    categoryRu: 'Электричество',
    titleUz: 'Elektr quvvati: P = U · I',
    titleRu: 'Электрическая мощность: P = U · I',
    formulaDisplay: 'P = U · I',
    inputs: [
      { id: 'U', labelUz: 'Kuchlanish (U)', labelRu: 'Напряжение (U)', symbol: 'U', unit: 'V', defaultValue: 220 },
      { id: 'I', labelUz: 'Tok kuchi (I)', labelRu: 'Сила тока (I)', symbol: 'I', unit: 'A', defaultValue: 4.5 }
    ],
    calculate: (inputs) => {
      const { U, I } = inputs;
      const P = U * I;
      return {
        result: P,
        formattedResult: P.toFixed(2),
        unit: 'W',
        formulaUsed: 'P = U · I',
        stepsUz: [
          `1. Berilgan: U = ${U} V, I = ${I} A`,
          `2. Formulaga qo'yamiz: P = ${U} · ${I}`,
          `3. Elektr quvvati: P = ${P.toFixed(2)} W (${(P / 1000).toFixed(3)} kW)`
        ],
        stepsRu: [
          `1. Дано: U = ${U} В, I = ${I} А`,
          `2. Подставляем в формулу: P = ${U} · ${I}`,
          `3. Мощность: P = ${P.toFixed(2)} Вт (${(P / 1000).toFixed(3)} кВт)`
        ]
      };
    }
  },

  // 14. Density: ρ = m / V
  {
    id: 'calc_density',
    category: 'mexanika',
    categoryUz: 'Mexanika',
    categoryRu: 'Механика',
    titleUz: 'Zichlik: ρ = m / V',
    titleRu: 'Плотность: ρ = m / V',
    formulaDisplay: 'ρ = m / V',
    inputs: [
      { id: 'm', labelUz: 'Massa (m)', labelRu: 'Масса (m)', symbol: 'm', unit: 'kg', defaultValue: 2700, min: 0.0001 },
      { id: 'V', labelUz: 'Hajm (V)', labelRu: 'Объем (V)', symbol: 'V', unit: 'm³', defaultValue: 1, min: 0.000001 }
    ],
    calculate: (inputs) => {
      const { m, V } = inputs;
      if (V <= 0) throw new Error('Hajm musbat bo\'lishi kerak!');
      const rho = m / V;
      return {
        result: rho,
        formattedResult: rho.toFixed(2),
        unit: 'kg/m³',
        formulaUsed: 'ρ = m / V',
        stepsUz: [
          `1. Berilgan: Massa m = ${m} kg, Hajm V = ${V} m³`,
          `2. Formulaga qo'yamiz: ρ = ${m} / ${V}`,
          `3. Modda zichligi: ρ = ${rho.toFixed(2)} kg/m³`
        ],
        stepsRu: [
          `1. Дано: Масса m = ${m} кг, Объем V = ${V} м³`,
          `2. Подставляем в формулу: ρ = ${m} / ${V}`,
          `3. Плотность: ρ = ${rho.toFixed(2)} кг/м³`
        ]
      };
    }
  },

  // 15. Pressure: p = F / S
  {
    id: 'calc_pressure',
    category: 'mexanika',
    categoryUz: 'Mexanika',
    categoryRu: 'Механика',
    titleUz: 'Bosim: p = F / S',
    titleRu: 'Давление: p = F / S',
    formulaDisplay: 'p = F / S',
    inputs: [
      { id: 'F', labelUz: 'Kuch (F)', labelRu: 'Сила давления (F)', symbol: 'F', unit: 'N', defaultValue: 500, min: 0 },
      { id: 'S', labelUz: 'Sirt yuzi (S)', labelRu: 'Площадь поверхности (S)', symbol: 'S', unit: 'm²', defaultValue: 0.25, min: 0.000001 }
    ],
    calculate: (inputs) => {
      const { F, S } = inputs;
      if (S <= 0) throw new Error('Yuza musbat bo\'lishi kerak!');
      const p = F / S;
      return {
        result: p,
        formattedResult: p.toFixed(2),
        unit: 'Pa',
        formulaUsed: 'p = F / S',
        stepsUz: [
          `1. Berilgan: F = ${F} N, S = ${S} m²`,
          `2. Formulaga qo'yamiz: p = ${F} / ${S}`,
          `3. Bosim: p = ${p.toFixed(2)} Pa (${(p / 1000).toFixed(2)} kPa)`
        ],
        stepsRu: [
          `1. Дано: F = ${F} Н, S = ${S} м²`,
          `2. Подставляем в формулу: p = ${F} / ${S}`,
          `3. Давление: p = ${p.toFixed(2)} Па (${(p / 1000).toFixed(2)} кПа)`
        ]
      };
    }
  },

  // 16. Heat: Q = c * m * ΔT
  {
    id: 'calc_heat',
    category: 'termodinamika',
    categoryUz: 'Termodinamika',
    categoryRu: 'Термодинамика',
    titleUz: 'Issiqlik miqdori: Q = c · m · ΔT',
    titleRu: 'Количество теплоты: Q = c · m · ΔT',
    formulaDisplay: 'Q = c · m · ΔT',
    inputs: [
      { id: 'c', labelUz: 'Solishtirma sig\'im (c)', labelRu: 'Удельная теплоемкость (c)', symbol: 'c', unit: 'J/(kg·°C)', defaultValue: 4200, min: 1 },
      { id: 'm', labelUz: 'Massa (m)', labelRu: 'Масса (m)', symbol: 'm', unit: 'kg', defaultValue: 2, min: 0.0001 },
      { id: 'dT', labelUz: 'Harorat farqi (ΔT)', labelRu: 'Разность температур (ΔT)', symbol: 'ΔT', unit: '°C', defaultValue: 50 }
    ],
    calculate: (inputs) => {
      const { c, m, dT } = inputs;
      const Q = c * m * dT;
      return {
        result: Q,
        formattedResult: Q.toFixed(2),
        unit: 'J',
        formulaUsed: 'Q = c · m · ΔT',
        stepsUz: [
          `1. Berilgan: c = ${c} J/(kg·°C), m = ${m} kg, ΔT = ${dT} °C`,
          `2. Formulaga qo'yamiz: Q = ${c} · ${m} · ${dT}`,
          `3. Issiqlik miqdori: Q = ${Q.toFixed(2)} J (${(Q / 1000).toFixed(2)} kJ)`
        ],
        stepsRu: [
          `1. Дано: c = ${c} Дж/(кг·°C), m = ${m} кг, ΔT = ${dT} °C`,
          `2. Подставляем в формулу: Q = ${c} · ${m} · ${dT}`,
          `3. Количество теплоты: Q = ${Q.toFixed(2)} Дж (${(Q / 1000).toFixed(2)} кДж)`
        ]
      };
    }
  },

  // 17. Wave Speed: v = λ * f
  {
    id: 'calc_wave',
    category: 'tolqinlar',
    categoryUz: 'To‘lqinlar',
    categoryRu: 'Волны',
    titleUz: 'To\'lqin tezligi: v = λ · f',
    titleRu: 'Скорость волны: v = λ · f',
    formulaDisplay: 'v = λ · f',
    inputs: [
      { id: 'lambda', labelUz: 'To\'lqin uzunligi (λ)', labelRu: 'Длина волны (λ)', symbol: 'λ', unit: 'm', defaultValue: 0.68, min: 0.00001 },
      { id: 'f', labelUz: 'Chastota (f)', labelRu: 'Частота (f)', symbol: 'f', unit: 'Hz', defaultValue: 500, min: 0.00001 }
    ],
    calculate: (inputs) => {
      const { lambda, f } = inputs;
      const v = lambda * f;
      return {
        result: v,
        formattedResult: v.toFixed(2),
        unit: 'm/s',
        formulaUsed: 'v = λ · f',
        stepsUz: [
          `1. Berilgan: λ = ${lambda} m, f = ${f} Hz`,
          `2. Formulaga qo'yamiz: v = ${lambda} · ${f}`,
          `3. To'lqin tezligi: v = ${v.toFixed(2)} m/s`
        ],
        stepsRu: [
          `1. Дано: λ = ${lambda} м, f = ${f} Гц`,
          `2. Подставляем в формулу: v = ${lambda} · ${f}`,
          `3. Скорость волны: v = ${v.toFixed(2)} м/с`
        ]
      };
    }
  }
];
