import { AppSettings, UserProgress } from '../types';

const SETTINGS_KEY = 'fizikalab_settings';
const PROGRESS_KEY = 'fizikalab_progress';

export const defaultSettings: AppSettings = {
  language: 'uz',
  theme: 'dark',
  animations: true,
  sound: true,
  fontSize: 'normal',
};

export const defaultProgress: UserProgress = {
  completedTopicIds: [],
  solvedPracticeIds: [],
  quizScores: [],
  favoriteFormulaIds: [],
  favoriteTopicIds: [],
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  calculatorsUsed: 0,
  problemsSolvedCount: 0,
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return { ...defaultSettings, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return defaultSettings;
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const data: UserProgress = { ...defaultProgress, ...JSON.parse(raw) };
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      if (data.lastActiveDate !== today) {
        const lastDate = new Date(data.lastActiveDate);
        const currentDate = new Date(today);
        const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          data.streak += 1;
        } else if (diffDays > 1) {
          data.streak = 1;
        }
        data.lastActiveDate = today;
        saveProgress(data);
      }
      return data;
    }
  } catch {
    // fallback
  }
  return defaultProgress;
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function clearAllData(): void {
  try {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // ignore
  }
}
