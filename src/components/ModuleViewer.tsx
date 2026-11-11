import React, { useState } from 'react';
import { InductionModule, ApprenticeProgress } from '../types/induction';
import { ArrowLeft, Clock, Award, CheckCircle2, ChevronRight, BookOpen, Check } from 'lucide-react';

interface ModuleViewerProps {
  module: InductionModule;
  progress: ApprenticeProgress;
  onBack: () => void;
  onOpenQuiz: (module: InductionModule) => void;
  onNavigateSymbols: () => void;
  onNavigateCases: () => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  progress,
  onBack,
  onOpenQuiz,
  onNavigateSymbols,
  onNavigateCases
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const currentSection = module.sections[activeSectionIndex] || module.sections[0];
  const isCompleted = progress.completedModules.includes(module.id);
  const score = progress.moduleScores[module.id];

  return (
    <div className="space-y-6">
      {/* Back button and metadata header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00324D] dark:hover:text-[#39A900] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Ruta de Inducción</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold text-[#00324D] dark:text-[#39A900]">MÓDULO 0{module.number}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {module.estimatedMinutes} min lectura
          </span>
          <span aria-hidden="true">·</span>
          {isCompleted ? (
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#39A900]" />
              Aprobado ({score || 100}%)
            </span>
          ) : (
            <span className="text-amber-600 dark:text-amber-400 font-medium">Por Evaluar</span>
          )}
        </div>
      </div>

      {/* Module Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          {module.title}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {module.shortDescription}
        </p>
      </div>

      {/* Section tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {module.sections.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => setActiveSectionIndex(idx)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shrink-0 ${
              activeSectionIndex === idx
                ? 'bg-[#00324D] dark:bg-[#39A900] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {idx + 1}. {sec.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Main Section Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lesson prose & Key points */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
          <div>
            <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
              Sección {activeSectionIndex + 1} de {module.sections.length}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-display mt-1">
              {currentSection.title}
            </h3>
            {currentSection.subtitle && (
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {currentSection.subtitle}
              </p>
            )}
          </div>

          {/* Optional visual photograph for the section */}
          {currentSection.imageSlot && (
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative aspect-video bg-slate-100 dark:bg-slate-800 shadow-xs">
              <img
                src={currentSection.imageSlot}
                alt={currentSection.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white/90 font-medium">
                  Comunidad de Aprendices · Servicio Nacional de Aprendizaje
                </span>
              </div>
            </div>
          )}

          {/* Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentSection.content.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </div>

          {/* Key points box */}
          {currentSection.keyPoints && (
            <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40 space-y-3">
              <h4 className="text-xs font-bold text-[#00324D] dark:text-[#39A900] uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                Puntos Clave para Recordar:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {currentSection.keyPoints.map((kp, kpIdx) => (
                  <li key={kpIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive shortcuts depending on module */}
          {module.id === 'identidad' && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  ¿Deseas escuchar el Himno o explorar los símbolos en detalle?
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Accede al reproductor de marcha y los hotspots interactivos del escudo.
                </span>
              </div>
              <button
                onClick={onNavigateSymbols}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] dark:bg-[#39A900] dark:hover:bg-[#329600] rounded-lg transition-colors whitespace-nowrap shrink-0 ml-3"
              >
                Abrir Símbolos
              </button>
            </div>
          )}

          {module.id === 'normativa' && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                  ¿Quieres poner a prueba tu criterio en situaciones reales?
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Ingresa al simulador de casos del Tribunal del Aprendiz.
                </span>
              </div>
              <button
                onClick={onNavigateCases}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] dark:bg-[#39A900] dark:hover:bg-[#329600] rounded-lg transition-colors whitespace-nowrap shrink-0 ml-3"
              >
                Simulador de Casos
              </button>
            </div>
          )}

          {/* Section Navigation inside module */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              disabled={activeSectionIndex === 0}
              onClick={() => setActiveSectionIndex((prev) => Math.max(0, prev - 1))}
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40"
            >
              Sección Anterior
            </button>

            {activeSectionIndex + 1 < module.sections.length ? (
              <button
                onClick={() => setActiveSectionIndex((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#00324D] dark:bg-[#39A900] rounded-lg hover:bg-[#002235] dark:hover:bg-[#329600] transition-colors"
              >
                <span>Siguiente Sección</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onOpenQuiz(module)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#39A900] rounded-lg hover:bg-[#329600] transition-colors shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>Presentar Cuestionario Evaluativo</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Module Status & Evaluation Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Evaluación del Módulo
              </span>
              <Award className="w-5 h-5 text-[#39A900]" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display">
                {module.badgeName}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Supera el cuestionario con mínimo 75% para desbloquear esta insignia y certificar la competencia.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Número de preguntas:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{module.quiz.length} preguntas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Mínimo para aprobar:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">75% (3/4 correctas)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Intentos permitidos:</span>
                <span className="font-semibold text-[#39A900]">Ilimitados (Formativo)</span>
              </div>
            </div>

            <button
              onClick={() => onOpenQuiz(module)}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Award className="w-4 h-4" />
              <span>{isCompleted ? 'Repetir Cuestionario' : 'Iniciar Cuestionario'}</span>
            </button>
          </div>

          {/* Quick Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Contenidos del Módulo:
            </h4>
            <div className="space-y-2.5">
              {module.sections.map((s, sIdx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSectionIndex(sIdx)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    activeSectionIndex === sIdx
                      ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="truncate pr-2">{sIdx + 1}. {s.title}</span>
                  {activeSectionIndex === sIdx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39A900]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
