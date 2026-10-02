export type Language = 'uz' | 'ru';
export type Theme = 'dark' | 'light';

export interface AppSettings {
  language: Language;
  theme: Theme;
  animations: boolean;
  sound: boolean;
  fontSize: 'normal' | 'large';
}

export interface VariableInfo {
  symbol: string;
  nameUz: string;
  nameRu: string;
  unit: string;
}

export interface FormulaItem {
  id: string;
  category: string;
  categoryUz: string;
  categoryRu: string;
  latex: string;
  titleUz: string;
  titleRu: string;
  meaningUz: string;
  meaningRu: string;
  variables: VariableInfo[];
  siUnit: string;
  whenToUseUz: string;
  whenToUseRu: string;
  exampleUz: string;
  exampleRu: string;
}

export interface TopicDefinition {
  termUz: string;
  termRu: string;
  defUz: string;
  defRu: string;
}

export interface SolvedProblem {
  problemUz: string;
  problemRu: string;
  given: { key: string; value: string; labelUz: string; labelRu: string }[];
  findUz: string;
  findRu: string;
  formula: string;
  solutionUz: string[];
  solutionRu: string[];
  answer: string;
}

export interface MiniQuizItem {
  questionUz: string;
  questionRu: string;
  optionsUz: string[];
  optionsRu: string[];
  correctIndex: number;
  explanationUz: string;
  explanationRu: string;
}

export interface TopicItem {
  id: string;
  number: number;
  categoryUz: string;
  categoryRu: string;
  summaryUz: string;
  summaryRu: string;
  definitions: TopicDefinition[];
  mainFormulas: {
    latex: string;
    titleUz: string;
    titleRu: string;
    variables: VariableInfo[];
  }[];
  realLifeUz: string[];
  realLifeRu: string[];
  solvedExample: SolvedProblem;
  practiceProblem: {
    questionUz: string;
    questionRu: string;
    answer: number;
    tolerance: number;
    unit: string;
    hintUz: string;
    hintRu: string;
    solutionUz: string;
    solutionRu: string;
  };
  miniQuiz: MiniQuizItem[];
}

export interface CalculatorInputConfig {
  id: string;
  labelUz: string;
  labelRu: string;
  symbol: string;
  unit: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface CalculationResult {
  result: number;
  formattedResult: string;
  unit: string;
  formulaUsed: string;
  stepsUz: string[];
  stepsRu: string[];
}

export interface CalculatorConfig {
  id: string;
  category: string;
  categoryUz: string;
  categoryRu: string;
  titleUz: string;
  titleRu: string;
  formulaDisplay: string;
  inputs: CalculatorInputConfig[];
  calculate: (inputs: Record<string, number>) => CalculationResult;
}

export interface QuizQuestion {
  id: string;
  category: string;
  categoryUz: string;
  categoryRu: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'multiple' | 'boolean' | 'numeric';
  questionUz: string;
  questionRu: string;
  optionsUz?: string[];
  optionsRu?: string[];
  correctAnswer: number | boolean | string;
  formula?: string;
  explanationUz: string;
  explanationRu: string;
}

export interface PracticeProblem {
  id: string;
  categoryUz: string;
  categoryRu: string;
  questionUz: string;
  questionRu: string;
  targetUnit: string;
  correctAnswer: number;
  tolerance: number;
  formula: string;
  solutionUz: string;
  solutionRu: string;
}

export interface UserProgress {
  completedTopicIds: string[];
  solvedPracticeIds: string[];
  quizScores: {
    date: string;
    difficulty: string;
    score: number;
    total: number;
    percentage: number;
  }[];
  favoriteFormulaIds: string[];
  favoriteTopicIds: string[];
  streak: number;
  lastActiveDate: string;
  calculatorsUsed: number;
  problemsSolvedCount: number;
}
