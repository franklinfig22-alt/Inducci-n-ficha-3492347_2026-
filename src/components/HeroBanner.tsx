import React from 'react';
import { ApprenticeProfile, ApprenticeProgress } from '../types/induction';
import { ArrowRight, BookOpen, Scale, Flag, Award, Clock } from 'lucide-react';

interface HeroBannerProps {
  apprentice: ApprenticeProfile;
  progress: ApprenticeProgress;
  onStartRoute: () => void;
  onExploreCases: () => void;
  onExploreSymbols: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  apprentice,
  progress,
  onStartRoute,
  onExploreCases,
  onExploreSymbols
}) => {
  const percentComplete = Math.round((progress.completedModules.length / 4) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
        {/* Left Column: Editorial message & Primary actions */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 z-10">
          <div>
            {/* Clean unboxed metadata with subtle typographic separators (§1.A Zero-Pill) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 tracking-wide">
              <span className="text-[#39A900] uppercase font-bold">Inducción Institucional SENA</span>
              <span aria-hidden="true">·</span>
              <span>40 Horas Obligatorias</span>
              <span aria-hidden="true">·</span>
              <span>Ficha {apprentice.codeFicha}</span>
            </div>

            {/* Headline with text-wrap: balance and refined display type */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-display leading-[1.15] text-balance">
              Forja tu futuro en el SENA conociendo tus derechos, deberes y símbolos
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Hola, <span className="font-semibold text-slate-900 dark:text-white">{apprentice.fullName.split(' ')[0]}</span>. Bienvenido a la institución más querida por los colombianos. Este portal interactivo te guiará paso a paso en el dominio del Reglamento del Aprendiz (Acuerdo 007 de 2012), la historia patria del SENA y las alternativas de tu etapa productiva.
            </p>

            {/* Quick 3-point strip */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-800 pt-5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#39A900] shrink-0" />
                <span className="font-medium">4 Núcleos Temáticos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#39A900] shrink-0" />
                <span className="font-medium">Casos del Reglamento</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#39A900] shrink-0" />
                <span className="font-medium">Constancia Oficial</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartRoute}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#39A900] hover:bg-[#329600] transition-all shadow-sm"
            >
              <span>{percentComplete > 0 ? 'Continuar Inducción' : 'Comenzar Módulo 1'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreCases}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Scale className="w-4 h-4 text-[#00324D] dark:text-[#39A900]" />
              <span>Simular Casos</span>
            </button>

            <button
              onClick={onExploreSymbols}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Flag className="w-4 h-4 text-[#39A900]" />
              <span>Símbolos & Himno</span>
            </button>
          </div>
        </div>

        {/* Right Column: High fidelity photographic anchor */}
        <div className="lg:col-span-5 relative bg-slate-900 min-h-[300px] lg:min-h-full">
          <img
            src="/src/assets/images/sena_campus_learning_1794325226896.jpg"
            alt="Ambiente de formación tecnológica y robótica SENA con aprendices"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Measured scrim overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900]">
              <span>Formación Profesional Integral</span>
              <span aria-hidden="true">·</span>
              <span>Regional {apprentice.regional.replace('Regional ', '')}</span>
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Centro de Aprendizaje & Tecnología
            </h3>
            <p className="text-xs text-white/80 line-clamp-2">
              Talleres y laboratorios modernos diseñados para la innovación, el emprendimiento y el empleo digno en Colombia.
            </p>

            {/* Live progress indicator over image */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-white/90 mb-1">
                <span>Tu avance de inducción:</span>
                <span className="font-bold tabular-nums text-[#39A900]">{percentComplete}%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#39A900] h-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
