export type ModuleId = 'identidad' | 'normativa' | 'ruta-formacion' | 'ecosistema';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  articleCitation?: string;
}

export interface CaseDilemma {
  id: string;
  title: string;
  scenario: string;
  character: string;
  category: 'Academica' | 'Disciplinaria' | 'Seguridad';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    normativeBasis: string;
  }[];
}

export interface LessonSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  keyPoints?: string[];
  multimediaType?: 'symbols' | 'anthem' | 'infographic' | 'cases' | 'timeline' | 'alternatives';
  imageSlot?: string;
}

export interface InductionModule {
  id: ModuleId;
  number: number;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  competency: string;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

export interface ApprenticeProfile {
  id: string;
  fullName: string;
  documentType: 'CC' | 'TI' | 'PPT';
  documentNumber: string;
  email: string;
  phone: string;
  program: string;
  codeFicha: string;
  regional: string;
  center: string;
  startDate: string;
  avatarUrl?: string;
}

export interface ApprenticeProgress {
  completedModules: ModuleId[];
  moduleScores: Record<ModuleId, number>; // 0 to 100
  casesResolved: string[];
  anthemPlayed: boolean;
  symbolsExplored: string[];
  certificateIssuedAt?: string;
  lastActive: string;
}

export interface CohortApprentice {
  id: string;
  name: string;
  document: string;
  email: string;
  progressPercent: number;
  modulesCompleted: number;
  status: 'Completado' | 'En Progreso' | 'En Riesgo' | 'Sin Iniciar';
  lastAccess: string;
  averageScore: number;
}

export interface InstructorProfile {
  id: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  roleTitle: string;
  program: string;
  codeFicha: string;
  regional: string;
  center: string;
  assignedCohortCount: number;
}

