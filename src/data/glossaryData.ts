export interface GlossaryItem {
  term: string;
  category: 'Academico' | 'Normativo' | 'Tecnologico' | 'Bienestar';
  definition: string;
  exampleOrNote?: string;
}

export const SENA_GLOSSARY: GlossaryItem[] = [
  {
    term: 'Ficha de Caracterización',
    category: 'Academico',
    definition: 'Código numérico de 7 cifras único en el sistema Sofia Plus que identifica a un grupo o cohorte de aprendices matriculados en un programa y horario específico.',
    exampleOrNote: 'Ejemplo: Ficha 2874102 correspondiente a Tecnología en ADSO.'
  },
  {
    term: 'RAP (Resultado de Aprendizaje)',
    category: 'Academico',
    definition: 'Logros demostrables que debe alcanzar el aprendiz en términos de saber, saber hacer y ser para certificar una competencia laboral.',
    exampleOrNote: 'La calificación del RAP es cualitativa: Aprobado (A) o No Aprobado (D).'
  },
  {
    term: 'Zajuna',
    category: 'Tecnologico',
    definition: 'Plataforma oficial de aprendizaje virtual (LMS) del SENA donde se gestionan foros temáticos, material de estudio, cuestionarios y entrega de evidencias.',
    exampleOrNote: 'Reemplaza a los sistemas anteriores y ofrece acceso móvil y web 24/7.'
  },
  {
    term: 'Sofia Plus',
    category: 'Tecnologico',
    definition: 'Sistema Optimizado para la Formación Integral y el Aprendizaje Activo. Es la plataforma administrativa del SENA donde se gestionan inscripciones, matrículas, juicios evaluativos y certificaciones.',
    exampleOrNote: 'Portal: senasofiaplus.edu.co'
  },
  {
    term: 'Contrato de Aprendizaje',
    category: 'Normativo',
    definition: 'Forma especial dentro del derecho laboral colombiano mediante la cual una empresa patrocina a un aprendiz con apoyo de sostenimiento y cobertura en salud (EPS) y riesgos (ARL).',
    exampleOrNote: 'Durante la etapa lectiva el patrocinador cubre el 50% de SMMLV + salud; en etapa productiva cubre el 75% o 100% de SMMLV según tasa de desempleo nacional + ARL.'
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    category: 'Normativo',
    definition: 'Órgano consultivo del Centro de Formación encargado de analizar el rendimiento académico y disciplinario de los aprendices, garantizando el debido proceso y recomendando medidas formativas o sanciones.',
    exampleOrNote: 'Integrado por coordinador, instructor técnico, vocero de ficha y profesional de bienestar.'
  },
  {
    term: 'Vocero de Ficha',
    category: 'Bienestar',
    definition: 'Aprendiz elegido democráticamente por sus compañeros de grupo para representarlos ante los instructores, coordinadores y en las sesiones del Comité de Evaluación.',
    exampleOrNote: 'Elegido durante el primer mes de formación y con rol activo en la convivencia.'
  },
  {
    term: 'Plan de Mejoramiento',
    category: 'Normativo',
    definition: 'Medida formativa pedagógica concertada entre el instructor y el aprendiz, con tareas específicas y plazos definidos para superar dificultades académicas o disciplinarias.',
    exampleOrNote: 'Evita la sanción formal y busca el alcance efectivo de las competencias.'
  },
  {
    term: 'APE (Agencia Pública de Empleo)',
    category: 'Bienestar',
    definition: 'Servicio público estatal y gratuito del SENA que facilita el contacto organizado entre quienes buscan empleo y las empresas que requieren talento humano calificado.',
    exampleOrNote: 'Disponible en ape.sena.edu.co con sedes físicas en todo el país.'
  },
  {
    term: 'Sennova',
    category: 'Tecnologico',
    definition: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA que impulsa semilleros de investigación aplicada, patentes y modernización tecnológica de los centros.',
    exampleOrNote: 'Permite a los aprendices participar en proyectos científicos y ponencias.'
  },
  {
    term: 'FPI (Formación Profesional Integral)',
    category: 'Academico',
    definition: 'Proceso educativo teórico-práctico de carácter integral, orientado al desarrollo de conocimientos técnicos, tecnológicos y de actitudes y valores para la convivencia social y el trabajo.',
    exampleOrNote: 'Eje pedagógico fundacional del SENA.'
  },
  {
    term: 'Fondo Emprender',
    category: 'Bienestar',
    definition: 'Fondo de capital semilla creado por el Gobierno Nacional y administrado por el SENA para financiar iniciativas empresariales de aprendices y egresados de carácter condonable.',
    exampleOrNote: 'Financia hasta el 100% del plan de negocio si cumple las metas de creación de empleo formal.'
  }
];
