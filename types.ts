
export enum AppView {
  DASHBOARD = 'dashboard',
  BENCH = 'bench',
  LIBRARY = 'library',
  EXAM_ROOM = 'exam_room',
  PROGRESS_LOG = 'progress_log',
  CAREER = 'career'
}

export interface Phase {
  id: number;
  title: string;
  goal: string;
  duration: string;
  knowledge: string[];
  reading: string[];
  homework: string[];
  quizTopic: string;
}

export interface ServiceEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  phase: number;
  status: 'draft' | 'reviewed' | 'approved';
  aiFeedback?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
