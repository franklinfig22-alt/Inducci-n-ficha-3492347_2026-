import React from 'react';
import { InductionModule, ModuleId, ApprenticeProgress } from '../types/induction';
import { CheckCircle2, Clock, BookOpen, ChevronRight, Award } from 'lucide-react';

interface ModuleRoadmapProps {
  modules: InductionModule[];
  progress: ApprenticeProgress;
  onSelectModule: (moduleId: ModuleId) => void;
  onOpenQuiz: (module: InductionModule) => void;
}

export const ModuleRoadmap: React.FC<ModuleRoadmapProps> = ({
  modules,
  progress,
  onSelectModule,
  onOpenQuiz
}) => {
  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          <span>Formación Profesional Integral</span>
          <span aria-hidden="true">·</span>
          <span>Etapa de Inducción</span>
          <span aria-hidden="true">·</span>
          <span>4 Módulos Obligatorios</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Ruta de Aprendizaje Institucional
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl">
          Recorre cada uno de los 4 núcleos temáticos de la inducción SENA. Al finalizar la lectura interactiva, presenta el cuestionario formativo para validar tus competencias y obtener la constancia oficial.
        </p>
      </div>

      {/* Grid of modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => {
          const isCompleted = progress.completedModules.includes(mod.id);
          const score = progress.moduleScores[mod.id];

          return (
            <div
              key={mod.id}
              className={`rounded-2xl border transition-all p-6 flex flex-col justify-between ${
                isCompleted
                  ? 'border-emerald-200 dark:border-emerald-800/40 bg-white dark:bg-slate-900 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#00324D] dark:text-[#39A900]">MÓDULO 0{mod.number}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.estimatedMinutes} min
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                      Aprobado ({score || 100}%)
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 font-medium">Pendiente</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-display leading-snug">
                  {mod.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {mod.shortDescription}
                </p>

                {/* Competency box */}
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-[#00324D] dark:text-[#39A900] block mb-0.5">Competencia a desarrollar:</span>
                  <p className="line-clamp-2">{mod.competency}</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectModule(mod.id)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#00324D] dark:text-slate-200 hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Estudiar Contenido</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenQuiz(mod)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                      : 'bg-[#39A900] text-white hover:bg-[#329600] shadow-xs'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Repetir Cuestionario' : 'Presentar Cuestionario'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
