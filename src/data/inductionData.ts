import { InductionModule, CaseDilemma } from '../types/induction';

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'identidad',
    number: 1,
    title: 'Identidad e Imagen Institucional SENA',
    shortDescription: 'Historia, fundador Rodolfo Martínez Tono, misión, visión y símbolos patrios e institucionales (Escudo, Bandera, Logosímbolo e Himno).',
    estimatedMinutes: 25,
    competency: 'Apropiar la identidad institucional del SENA en su rol de aprendiz líder para el desarrollo socioeconómico de Colombia.',
    badgeId: 'badge-identidad',
    badgeName: 'Orgullo e Identidad SENA',
    badgeIcon: 'Award',
    sections: [
      {
        id: 'historia-mision',
        title: 'Nacimiento, Fundador y Propósito de País',
        subtitle: 'Una iniciativa visionaria para transformar el trabajo en Colombia',
        content: [
          'El Servicio Nacional de Aprendizaje (SENA) nació en 1957 gracias a la visión visionaria del economista cartagenero Rodolfo Martínez Tono, apoyado por el Gobierno Nacional, los gremios empresariales y las organizaciones sindicales de Colombia mediante el Decreto Ley 118 de 1957.',
          'Su propósito fundacional fue capacitar y dotar de formación técnica y tecnológica de alta calidad a la clase trabajadora colombiana, impulsando la industrialización y la movilidad social.',
          'La Misión actual del SENA es invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral gratuita, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
          'Nuestra Visión proyecta al SENA como una entidad de clase mundial en innovación, formación dual, tecnología aplicada y pertinencia laboral en todos los rincones del territorio colombiano.'
        ],
        keyPoints: [
          'Fundador: Rodolfo Martínez Tono (1957)',
          'Naturaleza: Establecimiento público del orden nacional, gratuito e incluyente',
          'Enfoque: Formación Profesional Integral por competencias laborales y valores ciudadanos',
          'Cobertura: 33 Regionales y más de 117 Centros de Formación en todo Colombia'
        ],
        multimediaType: 'timeline',
        imageSlot: '/src/assets/images/sena_campus_learning_1794325226896.jpg'
      },
      {
        id: 'simbolos-institucionales',
        title: 'Símbolos Institucionales: El Alma del SENA',
        subtitle: 'Escudo, Bandera, Logosímbolo e Himno Nacional del SENA',
        content: [
          'Los símbolos del SENA representan la trilogía económica del país, la dignidad del trabajo honesto y la proyección de cada aprendiz hacia el porvenir.',
          'El Escudo del SENA refleja las tres grandes ramas de la actividad económica en Colombia: la agricultura (representada por el cafeto y la espiga de trigo), la industria y la construcción (el engranaje y el piñón motriz), y el comercio y los servicios (el caduceo de Mercurio).',
          'La Bandera del SENA es de fondo blanco impoluto con el escudo institucional en el centro. El blanco simboliza la paz, la tranquilidad, la rectitud ética y la transparencia de la institución.',
          'El Logosímbolo actual sintetiza la figura de un ser humano erguido caminando con decisión hacia adelante sobre los senderos abiertos de la vida y el conocimiento.',
          'El Himno del SENA, con letra del poeta Luis Alfredo Sánchez y música del maestro Daniel Marles, es un canto solemne al esfuerzo creador, a la patria y al triunfo del trabajador colombiano.'
        ],
        keyPoints: [
          'Escudo: Los tres sectores de la economía nacional (Agropecuario, Industrial y Comercial)',
          'Bandera: Fondo blanco (paz y transparencia) con escudo central',
          'Logosímbolo: El aprendiz que avanza con firmeza hacia el futuro abriendo nuevos caminos',
          'Himno: Estrofas de esperanza, dignidad laboral y compromiso con Colombia'
        ],
        multimediaType: 'symbols'
      },
      {
        id: 'himno-multimedia',
        title: 'Himno del SENA: Letra, Melodía y Mensaje',
        subtitle: 'Escucha, reflexiona y aprende el cántico oficial de los aprendices',
        content: [
          'El Himno institucional se entona con la mano en el pecho durante los actos protocolarios, graduaciones y jornadas solemnes.',
          'Su coro proclama con fuerza: "Aprendices del SENA adelante, por Colombia luchad con amor, con el ánimo noble y radiante, transformemos el mundo en mejor".',
          'Sus estrofas recuerdan que en el aula y en el taller se forjan las almas de la patria nueva, y que cada hora de estudio es una semilla de progreso para nuestras familias y comunidades.'
        ],
        keyPoints: [
          'Letra: Luis Alfredo Sánchez',
          'Música: Daniel Marles',
          'Actitud protocolaria: Respeto, postura erguida y canto con orgullo institucional'
        ],
        multimediaType: 'anthem'
      }
    ],
    quiz: [
      {
        id: 'q-identidad-1',
        question: '¿Quién fue el visionario fundador del SENA en el año 1957?',
        options: [
          'Alfonso López Pumarejo',
          'Rodolfo Martínez Tono',
          'Alberto Lleras Camargo',
          'Gabriel García Márquez'
        ],
        correctAnswer: 1,
        explanation: 'Rodolfo Martínez Tono concibió y promovió la creación del SENA en 1957 como una respuesta estructural a las necesidades de formación técnica de los trabajadores colombianos.'
      },
      {
        id: 'q-identidad-2',
        question: '¿Qué representan los elementos contenidos en el Escudo oficial del SENA?',
        options: [
          'Las tres cordilleras de la geografía colombiana',
          'Los tres poderes públicos del Estado',
          'Las tres ramas económicas: Agricultura, Industria/Construcción y Comercio/Servicios',
          'Los tres niveles de formación: Operario, Técnico y Tecnólogo'
        ],
        correctAnswer: 2,
        explanation: 'El escudo reúne la espiga/café (sector agropecuario), el piñón/rueda dentada (sector industrial y de la construcción) y el caduceo (sector comercio y servicios).'
      },
      {
        id: 'q-identidad-3',
        question: '¿Cuál es el significado del color blanco en la bandera del SENA?',
        options: [
          'La pureza de la nieve de los nevados colombianos',
          'La paz, la tranquilidad, la transparencia y la serenidad de la comunidad educativa',
          'El papel de los certificados y títulos emitidos',
          'La neutralidad política del sector empresarial'
        ],
        correctAnswer: 1,
        explanation: 'El fondo blanco de la bandera del SENA simboliza la paz, la transparencia, la armonía y la convivencia pacífica que promueve la formación integral.'
      },
      {
        id: 'q-identidad-4',
        question: '¿Qué representa gráficamente el Logosímbolo del SENA?',
        options: [
          'Un árbol con raíces profundas y ramas extendidas',
          'Un ser humano que camina erguido hacia adelante sobre senderos abiertos',
          'Una brújula orientada hacia el polo norte',
          'Un libro abierto sostenido por dos manos'
        ],
        correctAnswer: 1,
        explanation: 'El logosímbolo representa al ser humano (aprendiz) que avanza con paso firme hacia su autorrealización y futuro profesional, abriendo caminos de progreso.'
      }
    ]
  },
  {
    id: 'normativa',
    number: 2,
    title: 'Reglamento y Normativa del Aprendiz SENA',
    shortDescription: 'Acuerdo 007 de 2012: Derechos, deberes, prohibiciones, clasificación de faltas, debido proceso y medidas formativas.',
    estimatedMinutes: 35,
    competency: 'Comprender y aplicar los deberes, derechos y procedimientos reglamentarios para una convivencia armoniosa y ética en la comunidad SENA.',
    badgeId: 'badge-normativa',
    badgeName: 'Defensor de la Norma y Convivencia',
    badgeIcon: 'ShieldCheck',
    sections: [
      {
        id: 'derechos-deberes',
        title: 'Derechos y Deberes Fundamentales del Aprendiz',
        subtitle: 'El equilibrio entre oportunidades formativas y compromisos cívicos (Acuerdo 009 de 2024 y actualizaciones)',
        content: [
          'El Reglamento del Aprendiz SENA (regido por el Acuerdo 009 de 2024 y sus actualizaciones vigentes) constituye la carta de navegación ética y disciplinaria de todos los aprendices matriculados en formación presencial, virtual o a distancia.',
          'Entre tus Derechos primordiales se encuentran: recibir formación profesional integral de calidad; acceder oportunamente a la inducción institucional; ser tratado con dignidad y respeto sin discriminación alguna; portar y recibir el carné estudiantil; disfrutar de los servicios de Bienestar al Aprendiz; ser escuchado en descargos durante cualquier debido proceso; y evaluar a tus instructores de forma constructiva.',
          'Entre tus Deberes esenciales se destacan: cumplir diligentemente con las actividades de aprendizaje y evidencias requeridas; portar el carné en lugar visible al ingresar y permanecer en la institución; portar el uniforme con pulcritud en los programas que lo exigen; acatar las normas de seguridad y salud en el trabajo (SST) en talleres y laboratorios; cuidar la infraestructura física y tecnológica del SENA; y justificar inasistencias en los plazos reglamentarios.'
        ],
        keyPoints: [
          'Derecho a la inducción: Todo aprendiz tiene derecho a conocer la estructura institucional y la normativa desde el primer día',
          'Justificación de inasistencias: Debe presentarse dentro de los 3 días hábiles siguientes al hecho (por calamidad o fuerza mayor soportada)',
          'Porte de carné: Obligatorio e intransferible en todas las sedes del país',
          'Respeto a la diversidad: Cero tolerancia al acoso, discriminación o maltrato'
        ],
        multimediaType: 'infographic',
        imageSlot: '/src/assets/images/sena_digital_learning_1794325227558.jpg'
      },
      {
        id: 'faltas-medidas',
        title: 'Clasificación de Faltas, Medidas y Debido Proceso',
        subtitle: 'Faltas académicas, disciplinarias, sanciones y el Comité de Evaluación',
        content: [
          'Las faltas en el SENA se clasifican en Académicas (relacionadas con el incumplimiento reiterado de evidencias, competencias y resultados de aprendizaje) y Disciplinarias (relacionadas con la conducta, convivencia, honestidad e integridad ciudadana).',
          'Por su gravedad, las faltas pueden calificarse como Leves, Graves o Gravísimas, evaluando atenuantes (haber confesado voluntariamente, procurar resarcir el daño) y agravantes (cometer la falta en complicidad, reincidencia, inducir a otros aprendices).',
          'Medidas Formativas (pedagógicas preventivas): Llamado de atención verbal reflexivo, Plan de mejoramiento académico (actividades concertadas con el instructor para alcanzar el RAP en mora) y Plan de mejoramiento disciplinario.',
          'Sanciones (orden sancionatorio formal emitido por Subdirección previo dictamen del Comité): Llamado de atención por escrito con copia a la hoja de vida, Condicionamiento de matrícula y Cancelación de matrícula (con impedimento de reingreso al SENA por un periodo entre 6 meses y 2 años).',
          'Debido Proceso: Todo aprendiz tiene derecho a ser notificado formalmente por escrito de los cargos, a tener mínimo 3 días hábiles para presentar descargos y pruebas ante el Comité de Evaluación y Seguimiento, y a interponer el Recurso de Reposición en los 5 días hábiles posteriores a la notificación de la resolución.'
        ],
        keyPoints: [
          'Comité de Evaluación y Seguimiento: Instancia asesora compuesta por instructor técnico, vocero de ficha, bienestar y coordinación',
          'Derecho a la legítima defensa: Nadie puede ser sancionado sin haber sido citado y escuchado con pruebas',
          'Recurso de reposición: Mecanismo legal para solicitar reconsideración ante la Subdirección de Centro',
          'Plagio o suplantación: Se cataloga como falta grave o gravísima que da lugar a cancelación de matrícula'
        ],
        multimediaType: 'cases'
      }
    ],
    quiz: [
      {
        id: 'q-norma-1',
        question: '¿Cuál es el plazo reglamentario que tiene el aprendiz para presentar los soportes de una inasistencia?',
        options: [
          'Hasta 15 días calendario posteriores',
          'Dentro de los 3 días hábiles siguientes a la ocurrencia del hecho',
          'El último día de cada mes con el vocero',
          'No es necesario presentar soporte si avisa por WhatsApp al instructor'
        ],
        correctAnswer: 1,
        explanation: 'El Reglamento del Aprendiz estipula que toda inasistencia debe ser justificada documentalmente dentro de los tres (3) días hábiles siguientes ante el instructor o coordinador.',
        articleCitation: 'Reglamento del Aprendiz, Capítulo V, Trámite de justificación de inasistencias.'
      },
      {
        id: 'q-norma-2',
        question: '¿Cuál de las siguientes acciones constituye una FALTA GRAVÍSIMA de carácter disciplinario en el SENA?',
        options: [
          'Llegar 5 minutos tarde a una sesión formativa',
          'Ingresar armas, explosivos, licor o sustancias psicoactivas al Centro de Formación',
          'Solicitar cambio de horario por motivos laborales',
          'Olvidar el cuaderno de apuntes en el casillero'
        ],
        correctAnswer: 1,
        explanation: 'Portar o consumir bebidas alcohólicas, sustancias psicoactivas o armas atenta directamente contra la seguridad y la convivencia, tipificándose como falta gravísima.',
        articleCitation: 'Reglamento del Aprendiz, Capítulo VII, Prohibiciones y Faltas Gravísimas.'
      },
      {
        id: 'q-norma-3',
        question: 'Si un aprendiz presenta dificultades para alcanzar un Resultado de Aprendizaje (RAP), ¿qué medida formativa corresponde aplicar en primera instancia?',
        options: [
          'Expulsión inmediata del programa',
          'Suscripción de un Plan de Mejoramiento Académico concertado con el instructor',
          'Cobro de multa económica por reprobación',
          'Aislamiento del aula durante dos semanas'
        ],
        correctAnswer: 1,
        explanation: 'La primera medida formativa pedagógica ante insuficiencia académica es concertar un Plan de Mejoramiento Académico con tareas y plazos específicos de nivelación.',
        articleCitation: 'Reglamento del Aprendiz, Capítulo VIII, Medidas Formativas.'
      },
      {
        id: 'q-norma-4',
        question: '¿Qué garantía fundamental protege al aprendiz antes de que se tome una decisión disciplinaria en el Comité de Evaluación?',
        options: [
          'El derecho al Debido Proceso y a presentar descargos y pruebas en su defensa',
          'El pago de una fianza de buena conducta',
          'La votación pública de todos los aprendices del centro',
          'La anulación automática de la queja'
        ],
        correctAnswer: 0,
        explanation: 'El Debido Proceso garantiza que todo aprendiz sea notificado formalmente, presente sus descargos y controvierta las pruebas antes de cualquier fallo.',
        articleCitation: 'Constitución Política de Colombia (Art. 29) y Reglamento del Aprendiz SENA.'
      }
    ]
  },
  {
    id: 'ruta-formacion',
    number: 3,
    title: 'Ruta de Formación y Etapa Productiva',
    shortDescription: 'Etapa Lectiva, competencias, resultados de aprendizaje (RAP), proyectos formativos y alternativas legales de Etapa Productiva.',
    estimatedMinutes: 30,
    competency: 'Identificar la metodología de formación por proyectos y planear oportunamente la modalidad de etapa productiva más idónea.',
    badgeId: 'badge-ruta',
    badgeName: 'Estratega de Ruta Productiva',
    badgeIcon: 'Compass',
    sections: [
      {
        id: 'etapa-lectiva',
        title: 'Etapa Lectiva: Formación Basada en Proyectos (FPI)',
        subtitle: 'Aprender haciendo, competencias laborales y resultados de aprendizaje',
        content: [
          'En el SENA no memorizamos contenidos teóricos desconectados de la realidad. Aplicamos la Formación Profesional Integral (FPI) orientada al desarrollo de competencias laborales.',
          'Cada programa de formación se estructura alrededor de un Proyecto Formativo real que simula o resuelve una necesidad concreta del sector productivo o de la comunidad.',
          'Tu avance se mide mediante Resultados de Aprendizaje (RAP). La escala de evaluación institucional es cualitativa: Aprobado (A) o No Aprobado (D). Para obtener tu título es requisito indispensable tener el 100% de los RAP de la etapa lectiva y de la etapa productiva calificados como Aprobados.'
        ],
        keyPoints: [
          'Metodología: Formación por proyectos e investigación aplicada',
          'Evaluación: Cualitativa (A = Aprobado, D = No Aprobado / Deficiente)',
          'Zajuna y Sofia Plus: Plataformas oficiales donde se suben evidencias y se asientan juicios evaluativos',
          'Portafolio de Evidencias: Carpeta digital que custodia todos tus talleres, guías y proyectos'
        ],
        multimediaType: 'infographic',
        imageSlot: '/src/assets/images/sena_induction_community_1794325226520.jpg'
      },
      {
        id: 'etapa-productiva',
        title: 'Alternativas Reconocidas para la Etapa Productiva',
        subtitle: 'Tu pasaporte directo al mercado laboral y al emprendimiento',
        content: [
          'La Etapa Productiva permite al aprendiz aplicar, complementar y consolidar los conocimientos adquiridos en la etapa lectiva en un entorno laboral real.',
          'Alternativa 1: Contrato de Aprendizaje. La empresa patrocinadora brinda apoyo de sostenimiento económico mensual (100% del SMMLV en productiva según normatividad) más afiliación obligatoria a EPS y ARL.',
          'Alternativa 2: Vínculo Laboral o Contractual. Si ya trabajas en una empresa realizando actividades afines a tu programa de formación, puedes homologar tu experiencia laboral como etapa productiva.',
          'Alternativa 3: Proyecto Productivo o Emprendimiento. Creación de tu propia empresa con asesoría técnica del Fondo Emprender y los Centros de Desarrollo Empresarial (SBDC).',
          'Alternativa 4: Pasantía o Concertación Institucional. Apoyo en entidades públicas, ONG o empresas que requieren tus competencias técnicas con cobertura de ARL por parte del SENA o de la empresa.',
          'Alternativa 5: Monitorías SENA. Apoyo técnico y pedagógico en laboratorios, talleres o bibliotecas del propio Centro de Formación con estímulo económico de sostenimiento.'
        ],
        keyPoints: [
          'Duración: Generalmente 6 meses (864 horas de práctica laboral)',
          'Bitácoras quincenales: Registro obligatorio de actividades diligenciado por el aprendiz y firmado por el coformador empresarial',
          'Visita de seguimiento: Acompañamiento del instructor de seguimiento en la empresa evaluando el desempeño'
        ],
        multimediaType: 'alternatives'
      }
    ],
    quiz: [
      {
        id: 'q-ruta-1',
        question: '¿Cuál es la escala de calificación oficial utilizada por el SENA para evaluar los Resultados de Aprendizaje (RAP)?',
        options: [
          'Numérica de 1.0 a 5.0 puntos',
          'Porcentual de 0% a 100%',
          'Cualitativa: Aprobado (A) o No Aprobado (D)',
          'Alfabética tradicional de la A a la F'
        ],
        correctAnswer: 2,
        explanation: 'En el SENA la evaluación es cualitativa: el aprendiz demuestra el logro de la competencia (A = Aprobado) o debe concertar plan de mejora (D = Deficiente/No Aprobado).'
      },
      {
        id: 'q-ruta-2',
        question: 'Bajo la modalidad de Contrato de Aprendizaje en etapa productiva, ¿cuáles coberturas legales debe garantizar la empresa patrocinadora?',
        options: [
          'Solo almuerzo y transporte en buseta',
          'Apoyo de sostenimiento económico reglamentario, afiliación a EPS y afiliación a Riesgos Laborales (ARL)',
          'Crédito bancario para compra de vivienda',
          'No tiene ninguna obligación de cobertura'
        ],
        correctAnswer: 1,
        explanation: 'La Ley colombiana exige que en etapa productiva el patrocinador suministre el apoyo de sostenimiento y cubra la afiliación a salud (EPS) y riesgos laborales (ARL).'
      },
      {
        id: 'q-ruta-3',
        question: '¿Qué documento debe diligenciar periódicamente el aprendiz durante su etapa productiva para evidenciar sus tareas ante el instructor de seguimiento?',
        options: [
          'Facturas de compra de insumos',
          'Bitácoras de seguimiento periódicas firmadas por el coformador empresarial',
          'Exámenes médicos semanales',
          'Comprobantes de pago de nómina'
        ],
        correctAnswer: 1,
        explanation: 'Las bitácoras periódicas de etapa productiva recogen las actividades realizadas, horas cumplidas y visto bueno del jefe inmediato o coformador.'
      }
    ]
  },
  {
    id: 'ecosistema',
    number: 4,
    title: 'Ecosistema SENA y Servicios al Aprendiz',
    shortDescription: 'Bienestar al Aprendiz, Agencia Pública de Empleo (APE), Fondo Emprender, Sennova y plataformas digitales Sofia Plus y Zajuna.',
    estimatedMinutes: 20,
    competency: 'Aprovechar integralmente los servicios institucionales de bienestar, empleabilidad, innovación y apoyo socioeconómico.',
    badgeId: 'badge-ecosistema',
    badgeName: 'Embajador del Ecosistema SENA',
    badgeIcon: 'Sparkles',
    sections: [
      {
        id: 'bienestar-aprendiz',
        title: 'Bienestar al Aprendiz: Salud, Arte, Deporte y Liderazgo',
        subtitle: 'Acompañamiento holístico para tu calidad de vida y permanencia',
        content: [
          'El Plan Nacional de Bienestar al Aprendiz tiene como objetivo incentivar la permanencia, el bienestar emocional, físico y cultural de todos los aprendices durante su formación.',
          'Ofrece programas de salud preventiva, orientación psicopedagógica, torneos deportivos intercentros (fútbol, baloncesto, voleibol, atletismo), grupos artísticos (danza, música folclórica, teatro) y campamentos de liderazgo.',
          'Además, administra los Apoyos de Sostenimiento (FIC para aprendices del sector de la construcción y apoyos socioeconómicos regulares para estratos 1 y 2 con dificultades económicas comprobadas) y el transporte/alimentación según disponibilidad de cada centro.'
        ],
        keyPoints: [
          'Psicopedagogía: Asesoría gratuita para superar dificultades emocionales o de aprendizaje',
          'Liderazgo y Vocería: Elección democrática de voceros de ficha y representantes de centro',
          'Apoyos FIC y Sostenimiento: Ayuda económica para aprendices en vulnerabilidad socioeconómica'
        ],
        multimediaType: 'infographic'
      },
      {
        id: 'ape-emprendimiento-tecnologia',
        title: 'APE, Fondo Emprender, Sennova y Entornos Digitales',
        subtitle: 'Conexión con el empleo real, la investigación aplicada y las herramientas web',
        content: [
          'La Agencia Pública de Empleo (APE) del SENA es el primer servicio público y gratuito de intermediación laboral en Colombia, conectando vacantes laborales formales con el talento de los egresados.',
          'El Fondo Emprender financia planes de negocio innovadores de aprendices y egresados con capital semilla no reembolsable (hasta por cientos de millones de pesos según la generación de empleos formales).',
          'Sennova (Sistema de Investigación, Desarrollo Tecnológico e Innovación) promueve semilleros de investigación, patentes, Tecnoacademias y Tecnoparques para que los aprendices desarrollen prototipos de vanguardia.',
          'En el ámbito digital, Sofía Plus es el sistema administrativo de inscripción, matrícula y certificación de competencias, mientras que Zajuna es el Campus Virtual oficial donde interactúas con guías de aprendizaje, foros y material multimedia.'
        ],
        keyPoints: [
          'APE: Bolsa de empleo formal gratuita y talleres de orientación laboral',
          'Fondo Emprender: Financiación no reembolsable para emprendedores SENA',
          'Zajuna: LMS oficial para el desarrollo de actividades virtuales y entrega de evidencias',
          'Sennova: Semilleros de investigación y desarrollo tecnológico'
        ],
        multimediaType: 'infographic'
      }
    ],
    quiz: [
      {
        id: 'q-eco-1',
        question: '¿Qué es la Agencia Pública de Empleo (APE) del SENA?',
        options: [
          'Una empresa privada que cobra comisiones por conseguir entrevistas',
          'El servicio estatal, público y gratuito que conecta vacantes laborales formales con buscadores de empleo y egresados',
          'Una entidad bancaria de microcréditos para vehículos',
          'Un sindicato de trabajadores de la construcción'
        ],
        correctAnswer: 1,
        explanation: 'La APE es un operador público y 100% gratuito que articula las necesidades de las empresas con los perfiles capacitados por el SENA en todo el país.'
      },
      {
        id: 'q-eco-2',
        question: '¿Cómo se llama la plataforma de Campus Virtual del SENA donde los aprendices acceden a sus cursos, foros y suben evidencias?',
        options: [
          'Zajuna',
          'Moodle Clásico 2005',
          'Classroom SENA',
          'Facebook Groups'
        ],
        correctAnswer: 0,
        explanation: 'Zajuna es la plataforma oficial LMS institucional del SENA diseñada para la interacción formativa de instructores y aprendices.'
      },
      {
        id: 'q-eco-3',
        question: '¿Cuál es el beneficio principal del Fondo Emprender para aprendices con iniciativas de negocio viables?',
        options: [
          'Préstamos con intereses hipotecarios altos',
          'Capital semilla no reembolsable si el plan de negocio cumple los indicadores de empleo y gestión pactados',
          'Un viaje turístico al exterior',
          'Exención vitalicia del pago de servicios públicos'
        ],
        correctAnswer: 1,
        explanation: 'El Fondo Emprender otorga capital semilla condonable (no reembolsable) a proyectos viables que cumplan sus metas de creación de empresa y empleo.'
      }
    ]
  }
];

export const CASE_DILEMMAS: CaseDilemma[] = [
  {
    id: 'caso-carne',
    title: 'El Préstamo del Carné Estudiantil',
    character: 'Camilo (Aprendiz de Gestión Logística)',
    category: 'Disciplinaria',
    scenario: 'Camilo llega al Centro de Formación y se da cuenta de que su amigo Andrés olvidó el carné institucional en la casa. Andrés le pide el favor de prestarle su carné para pasarlo por el torniquete de ingreso argumentando que tiene una evaluación importante y el vigilante no lo deja entrar sin credencial.',
    question: '¿Qué dicta el Reglamento del Aprendiz frente a prestar o usar un carné institucional ajeno?',
    options: [
      {
        id: 'opt-a',
        text: 'Prestarlo no tiene problema porque se trata de solidaridad entre compañeros de la misma ficha.',
        isCorrect: false,
        feedback: 'Incorrecto. La solidaridad no puede vulnerar las normas de seguridad institucional ni suplantar la identidad personal.',
        normativeBasis: 'El carné es un documento personal e intransferible. Facilitar el ingreso fraudulento es una falta disciplinaria expresa en el Artículo 9.'
      },
      {
        id: 'opt-b',
        text: 'Es una falta disciplinaria (suplantación y porte indebido); Andrés debe tramitar un pase temporal en coordinación y jamás usar un carné prestado.',
        isCorrect: true,
        feedback: '¡Correcto! El carné del SENA es personal, intransferible y acredita tu condición de aprendiz. Prestarlo para suplantar o eludir el control de acceso constituye falta disciplinaria grave.',
        normativeBasis: 'Acuerdo 007 de 2012, Artículos 9 y 10: Deber de portar el carné propio y prohibición expresa de permitir su uso por terceros.'
      },
      {
        id: 'opt-c',
        text: 'Solo se sanciona si el vigilante los descubre en flagrancia; si logran pasar, la falta queda perdonada.',
        isCorrect: false,
        feedback: 'Incorrecto. La ética formativa no depende de ser descubierto o no. La conducta indebida genera responsabilidad disciplinaria.',
        normativeBasis: 'Principios éticos de la Formación Profesional Integral del SENA.'
      }
    ]
  },
  {
    id: 'caso-inasistencia',
    title: 'Inasistencia por Urgencia de Salud',
    character: 'Mariana (Aprendiz de Desarrollo de Software)',
    category: 'Academica',
    scenario: 'Mariana sufrió un cuadro viral severo que le impidió asistir a clases durante 3 días hábiles consecutivos. El médico de la EPS le expidió una incapacidad formal por 72 horas. Al regresar al cuarto día, tiene dudas sobre cómo legalizar su ausencia.',
    question: '¿Cuál es el procedimiento y término legal reglamentario para justificar su inasistencia?',
    options: [
      {
        id: 'opt-a',
        text: 'Basta con enviar una foto de la fórmula médica al grupo de WhatsApp de los compañeros.',
        isCorrect: false,
        feedback: 'Incorrecto. Los canales informales no constituyen radicación formal de justificaciones ante la institución.',
        normativeBasis: 'Reglamento del Aprendiz: La radicación debe hacerse formalmente ante el instructor o coordinación académica.'
      },
      {
        id: 'opt-b',
        text: 'Debe radicar la incapacidad médica formal dentro de los tres (3) días hábiles siguientes al hecho ante el instructor y la coordinación.',
        isCorrect: true,
        feedback: '¡Excelente! El Reglamento estipula explícitamente el término perentorio de 3 días hábiles para allegar los soportes médicos o de fuerza mayor comprobable.',
        normativeBasis: 'Acuerdo 007 de 2012, Capítulo V, Trámite de justificación de inasistencias y deserción.'
      },
      {
        id: 'opt-c',
        text: 'Las inasistencias por salud no requieren justificación alguna porque la salud es un derecho fundamental.',
        isCorrect: false,
        feedback: 'Incorrecto. Aunque la salud es un derecho, el aprendiz tiene el deber académico de notificar la novedad para evitar incurrir en deserción formativa.',
        normativeBasis: 'Art. 22: Deserción por inasistencia injustificada de tres (3) días consecutivos.'
      }
    ]
  },
  {
    id: 'caso-plagio',
    title: 'Copia de Evidencia en Plataforma Zajuna',
    character: 'Sebastián y David (Aprendices de Mecatrónica)',
    category: 'Academica',
    scenario: 'Para la entrega de la evidencia de diseño de circuitos, Sebastián no alcanzó a realizar el taller y le pidió el archivo a David. Sebastián le cambió únicamente el nombre a la portada y lo subió a la plataforma Zajuna. El instructor detectó la duplicidad exacta del archivo mediante software antiplagio.',
    question: '¿Cómo debe actuar el instructor según el debido proceso institucional?',
    options: [
      {
        id: 'opt-a',
        text: 'Ponerles un 0 inmediato y expulsarlos del SENA sin escucharlos.',
        isCorrect: false,
        feedback: 'Incorrecto. Toda sanción debe respetar el debido proceso y la escala cualitativa (no hay notas numéricas de cero).',
        normativeBasis: 'El debido proceso es una garantía constitucional ineludible en el SENA.'
      },
      {
        id: 'opt-b',
        text: 'Calificar como No Aprobado (D), registrar el informe de presunto fraude/plagio con las evidencias correspondientes y remitir el caso al Comité de Evaluación y Seguimiento para garantizar el debido proceso y descargos.',
        isCorrect: true,
        feedback: '¡Totalmente acertado! El plagio académico es una falta grave que atenta contra la honestidad intelectual. El instructor reporta con pruebas y el Comité convoca formalmente a los aprendices para escuchar sus descargos antes de emitir cualquier recomendación.',
        normativeBasis: 'Acuerdo 007 de 2012, Artículos 10 (Prohibición de fraude) y Capítulo IX (Procedimiento para la aplicación de sanciones).'
      },
      {
        id: 'opt-c',
        text: 'Ignorar el caso si Sebastián promete invitarle un café al instructor.',
        isCorrect: false,
        feedback: 'Incorrecto. Esto constituiría una falta gravísima a la ética y transparencia del instructor y aprendiz.',
        normativeBasis: 'Código de Integridad SENA.'
      }
    ]
  },
  {
    id: 'caso-seguridad',
    title: 'Seguridad en Talleres de Soldadura',
    character: 'Felipe (Aprendiz de Metalmecánica)',
    category: 'Seguridad',
    scenario: 'En un taller práctico de soldadura de arco eléctrico, Felipe decide no colocarse la careta protectora ni los guantes de carnaza porque hace mucho calor en la bodega y "solo va a hacer un cordón rápido de 30 segundos". El instructor le pide que suspenda la actividad inmediatamente.',
    question: '¿Tiene el instructor la facultad de suspender a Felipe de la máquina en ese instante?',
    options: [
      {
        id: 'opt-a',
        text: 'Sí, porque el incumplimiento de las normas de Seguridad y Salud en el Trabajo (SST) pone en riesgo inminente la integridad física propia y la de los demás.',
        isCorrect: true,
        feedback: '¡Exacto! La seguridad en ambientes de aprendizaje es prioritaria. El desacato a las normas de SST no solo faculta al instructor a suspender la práctica peligrosa, sino que puede acarrear proceso disciplinario.',
        normativeBasis: 'Deberes del Aprendiz en Ambientes de Aprendizaje (Normas SST y Manual de Laboratorios).'
      },
      {
        id: 'opt-b',
        text: 'No, porque el aprendiz es autónomo y responsable de asumir sus propios riesgos personales.',
        isCorrect: false,
        feedback: 'Incorrecto. El Centro de Formación y los instructores son legalmente corresponsables de la seguridad dentro de los ambientes de aprendizaje.',
        normativeBasis: 'Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST).'
      },
      {
        id: 'opt-c',
        text: 'Solo si el coordinador de centro está presente en persona para firmar la orden.',
        isCorrect: false,
        feedback: 'Incorrecto. El instructor técnico tiene la autoridad pedagógica y técnica inmediata para detener cualquier acto inseguro en su ambiente.',
        normativeBasis: 'Protocolos de Seguridad Técnica de Talleres SENA.'
      }
    ]
  }
];

export const SENA_SYMBOLS_DETAILS = {
  escudo: {
    name: 'El Escudo del SENA',
    description: 'Emblema heráldico que condensa los tres motores del desarrollo socioeconómico de Colombia.',
    hotspots: [
      {
        id: 'pinon',
        label: 'Piñón y Rueda Dentada',
        sector: 'Sector Industrial y Construcción',
        meaning: 'Simboliza la fuerza motriz, la mecanización, la ingeniería, la manufactura y la transformación de materias primas por parte de técnicos y tecnólogos.'
      },
      {
        id: 'caduceo',
        label: 'El Caduceo de Mercurio',
        sector: 'Sector Comercio y Servicios',
        meaning: 'Vara con alas y dos serpientes entrelazadas que representa la actividad mercantil, los negocios internacionales, la logística, el turismo y los servicios.'
      },
      {
        id: 'trigo-cafe',
        label: 'Espiga de Trigo y Rama de Cafeto',
        sector: 'Sector Agropecuario y Forestal',
        meaning: 'Representa la fertilidad de los campos colombianos, la seguridad alimentaria, el campesinado y la producción agroindustrial del país.'
      }
    ]
  },
  bandera: {
    name: 'La Bandera del SENA',
    description: 'Pabellón oficial de fondo blanco que ondea en todos los centros de formación y eventos patrios.',
    details: [
      'Color de fondo: Blanco absoluto, representativo de la paz, la transparencia, la convivencia armónica y la tranquilidad.',
      'Centro: Lleva estampado en el centro el escudo oficial de la entidad.',
      'Uso protocolario: Se ubica al lado derecho de la bandera de Colombia en actos de graduación e inauguraciones.'
    ]
  },
  logosimbolo: {
    name: 'El Logosímbolo SENA',
    description: 'La síntesis gráfica de la misión humana del SENA: el aprendiz que se forja integralmente.',
    details: [
      'El punto superior representa la cabeza y el intelecto del ser humano.',
      'La barra horizontal representa los brazos abiertos hacia el aprendizaje y la solidaridad.',
      'Las líneas angulares inferiores configuran un ser humano caminando erguido sobre los caminos abiertos de la vida y el desarrollo productivo.',
      'Color Institucional: Verde SENA (#39A900), símbolo de esperanza, crecimiento, vitalidad y juventud transformadora.'
    ]
  },
  himno: {
    name: 'Himno Institucional del SENA',
    authorLyrics: 'Luis Alfredo Sánchez',
    authorMusic: 'Daniel Marles',
    stanzas: [
      {
        type: 'CORO',
        verses: [
          'Aprendices del SENA adelante',
          'por Colombia luchad con amor,',
          'con el ánimo noble y radiante',
          'transformemos el mundo en mejor.'
        ],
        reflection: 'Un llamado vibrante al optimismo juvenil y a la responsabilidad patriótica de construir una Colombia más justa a través de la excelencia en el trabajo.'
      },
      {
        type: 'ESTROFA I',
        verses: [
          'De la patria el futuro destino',
          'en las manos del joven está,',
          'el trabajo es seguro camino',
          'que la paz y el progreso nos da.'
        ],
        reflection: 'Reafirma que la verdadera paz y la prosperidad se construyen con oportunidades de formación técnica y trabajo digno para las nuevas generaciones.'
      },
      {
        type: 'ESTROFA II',
        verses: [
          'En la forja del SENA se forman',
          'hombres libres que saben triunfar,',
          'con la ciencia y la técnica adiestran',
          'sus destrezas para laborar.'
        ],
        reflection: 'La formación profesional integral une la ciencia, la tecnología y los valores humanos para forjar ciudadanos libres y competentes.'
      },
      {
        type: 'ESTROFA III',
        verses: [
          'Hoy la patria nos llama a la lidia',
          'del trabajo con fe y con tesón,',
          'en el SENA vencemos la envidia',
          'y forjamos un gran corazón.'
        ],
        reflection: 'El espíritu de compañerismo, fraternidad y trabajo en equipo que caracteriza a la gran familia de aprendices e instructores en todo el país.'
      }
    ]
  }
};
