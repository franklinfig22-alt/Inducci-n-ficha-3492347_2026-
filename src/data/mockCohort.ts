import { ApprenticeProfile, InstructorProfile, CohortApprentice } from '../types/induction';

export const DESIGNATED_INSTRUCTOR: InstructorProfile = {
  id: 'inst-01',
  fullName: 'Ing. Carlos Alberto Morales Duque',
  documentType: 'CC',
  documentNumber: '79845210',
  email: 'carlos.morales@sena.edu.co',
  phone: '310 892 4512',
  roleTitle: 'Instructor Líder Asignado (Único Evaluador)',
  program: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  codeFicha: '2874102',
  regional: 'Regional Distrito Capital',
  center: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  assignedCohortCount: 10
};

export const SAMPLE_APPRENTICES: ApprenticeProfile[] = [
  {
    id: 'coh-01',
    fullName: 'Franklin Alexander Figueroa',
    documentType: 'CC',
    documentNumber: '1098765432',
    email: 'franklinfig22@gmail.com',
    phone: '312 456 7890',
    program: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    codeFicha: '2874102',
    regional: 'Regional Distrito Capital',
    center: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    startDate: '2026-02-15'
  }
];

export const MOCK_COHORT_STUDENTS: CohortApprentice[] = [
  {
    id: 'coh-01',
    name: 'Franklin Alexander Figueroa',
    document: 'CC 1098765432',
    email: 'franklinfig22@gmail.com',
    progressPercent: 100,
    modulesCompleted: 4,
    status: 'Completado',
    lastAccess: 'Hoy, 09:45 AM',
    averageScore: 98
  },
  {
    id: 'coh-02',
    name: 'Valentina Morales Gómez',
    document: 'CC 1020304050',
    email: 'valentina.morales@misena.edu.co',
    progressPercent: 75,
    modulesCompleted: 3,
    status: 'En Progreso',
    lastAccess: 'Ayer, 04:12 PM',
    averageScore: 92
  },
  {
    id: 'coh-03',
    name: 'Carlos Andrés Méndez',
    document: 'TI 1005678912',
    email: 'carlos.mendez@misena.edu.co',
    progressPercent: 50,
    modulesCompleted: 2,
    status: 'En Progreso',
    lastAccess: 'Hace 2 días',
    averageScore: 88
  },
  {
    id: 'coh-04',
    name: 'Daniela Sofía Vargas Restrepo',
    document: 'CC 1032456789',
    email: 'daniela.vargas@misena.edu.co',
    progressPercent: 100,
    modulesCompleted: 4,
    status: 'Completado',
    lastAccess: 'Hoy, 10:15 AM',
    averageScore: 100
  },
  {
    id: 'coh-05',
    name: 'Mateo Alejandro Ospina',
    document: 'CC 1017892345',
    email: 'mateo.ospina@misena.edu.co',
    progressPercent: 25,
    modulesCompleted: 1,
    status: 'En Riesgo',
    lastAccess: 'Hace 5 días',
    averageScore: 70
  },
  {
    id: 'coh-06',
    name: 'Laura Camila Henao',
    document: 'CC 1045671234',
    email: 'laura.henao@misena.edu.co',
    progressPercent: 100,
    modulesCompleted: 4,
    status: 'Completado',
    lastAccess: 'Hoy, 08:30 AM',
    averageScore: 95
  },
  {
    id: 'coh-07',
    name: 'Juan Esteban Cárdenas',
    document: 'TI 1002345678',
    email: 'juan.cardenas@misena.edu.co',
    progressPercent: 0,
    modulesCompleted: 0,
    status: 'Sin Iniciar',
    lastAccess: 'Sin registro',
    averageScore: 0
  },
  {
    id: 'coh-08',
    name: 'Diana Marcela Quintero',
    document: 'CC 1089234567',
    email: 'diana.quintero@misena.edu.co',
    progressPercent: 75,
    modulesCompleted: 3,
    status: 'En Progreso',
    lastAccess: 'Ayer, 11:20 AM',
    averageScore: 89
  },
  {
    id: 'coh-09',
    name: 'Santiago Ríos Marín',
    document: 'CC 1076543210',
    email: 'santiago.rios@misena.edu.co',
    progressPercent: 100,
    modulesCompleted: 4,
    status: 'Completado',
    lastAccess: 'Hoy, 07:15 AM',
    averageScore: 96
  },
  {
    id: 'coh-10',
    name: 'María Paula Lozano',
    document: 'CC 1094567890',
    email: 'maria.lozano@misena.edu.co',
    progressPercent: 25,
    modulesCompleted: 1,
    status: 'En Riesgo',
    lastAccess: 'Hace 6 días',
    averageScore: 65
  }
];
