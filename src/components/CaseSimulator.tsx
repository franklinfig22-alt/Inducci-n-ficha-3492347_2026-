import React, { useState } from 'react';
import { CaseDilemma } from '../types/induction';
import { CASE_DILEMMAS } from '../data/inductionData';
import { Scale, CheckCircle2, XCircle, AlertCircle, BookOpen, ShieldAlert, Check } from 'lucide-react';

interface CaseSimulatorProps {
  onCaseResolved: (caseId: string) => void;
  resolvedCases: string[];
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  onCaseResolved,
  resolvedCases
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_DILEMMAS[0].id);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeCase = CASE_DILEMMAS.find((c) => c.id === selectedCaseId) || CASE_DILEMMAS[0];
  const chosenOption = activeCase.options.find((o) => o.id === selectedOptionId);
  const isAlreadyResolved = resolvedCases.includes(activeCase.id);

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const handleOptionClick = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitEvaluation = () => {
    if (!chosenOption) return;
    setIsSubmitted(true);
    if (chosenOption.isCorrect) {
      onCaseResolved(activeCase.id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          <span>Reglamento del Aprendiz</span>
          <span aria-hidden="true">·</span>
          <span>Acuerdo 007 de 2012</span>
          <span aria-hidden="true">·</span>
          <span>Casos Prácticos de Convivencia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Tribunal del Aprendiz: Dilemas de la Normativa
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl">
          Aprende el reglamento no memorizando artículos, sino resolviendo dilemas y situaciones reales a las que se enfrenta un aprendiz en el aula, taller o centro de formación.
        </p>
      </div>

      {/* Case Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CASE_DILEMMAS.map((item, idx) => {
          const isSelected = item.id === selectedCaseId;
          const isDone = resolvedCases.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleSelectCase(item.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 shadow-xs ring-1 ring-[#39A900]'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-500 dark:text-slate-400">Caso 0{idx + 1}</span>
                {isDone ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    Resuelto
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Por analizar</span>
                )}
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                {item.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                Tipo: {item.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Case Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Case Narrative */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#00324D] dark:text-[#39A900] uppercase tracking-wide flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#39A900]" />
              Situación de Hecho
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Categoría {activeCase.category}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-display">
              {activeCase.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Protagonista: <span className="font-semibold text-slate-700 dark:text-slate-300">{activeCase.character}</span>
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeCase.scenario}
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Regla de Oro Institucional:</span> Todo procedimiento en el SENA respeta el derecho a la defensa y el debido proceso garantizado en el Acuerdo 007 de 2012.
            </div>
          </div>
        </div>

        {/* Right: Decision and Feedback */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
          <div>
            <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
              Pregunta Normativa
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-display mt-1">
              {activeCase.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {activeCase.options.map((option, idx) => {
              const isPicked = selectedOptionId === option.id;
              let style = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200';

              if (isSubmitted) {
                if (option.isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-500';
                } else if (isPicked) {
                  style = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 ring-1 ring-rose-400';
                } else {
                  style = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500';
                }
              } else if (isPicked) {
                style = 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-900 dark:text-slate-100 ring-2 ring-[#39A900]';
              }

              return (
                <button
                  key={option.id}
                  disabled={isSubmitted}
                  onClick={() => handleOptionClick(option.id)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${style}`}
                >
                  <div className="w-6 h-6 rounded-md border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="leading-relaxed flex-1">{option.text}</span>
                  {isSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && isPicked && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action button */}
          {!isSubmitted ? (
            <div className="pt-2">
              <button
                disabled={!selectedOptionId}
                onClick={handleSubmitEvaluation}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] disabled:opacity-40 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Dictaminar según el Reglamento</span>
              </button>
            </div>
          ) : (
            /* Analysis & Normative citation */
            <div className="space-y-4 pt-2">
              {chosenOption && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    chosenOption.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {chosenOption.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Dictamen Correcto</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4 text-rose-700" />
                        <span>Dictamen Equivocado</span>
                      </>
                    )}
                  </div>
                  <p>{chosenOption.feedback}</p>
                  
                  <div className="mt-3 pt-3 border-t border-current/15 flex items-start gap-2 text-xs">
                    <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Fundamento Jurídico:</span>{' '}
                      {chosenOption.normativeBasis}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Intentar otra opción
                </button>

                {chosenOption?.isCorrect && (
                  <span className="text-xs font-bold text-[#39A900] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Caso registrado en tu hoja de inducción!
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
