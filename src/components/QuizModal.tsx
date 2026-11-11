import React, { useState } from 'react';
import { QuizQuestion, ModuleId } from '../types/induction';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Check } from 'lucide-react';

interface QuizModalProps {
  moduleId: ModuleId;
  moduleTitle: string;
  badgeName: string;
  questions: QuizQuestion[];
  onClose: () => void;
  onCompleteQuiz: (moduleId: ModuleId, score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  moduleId,
  moduleTitle,
  badgeName,
  questions,
  onClose,
  onCompleteQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleVerifyAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished quiz
      const finalScore = Math.round(((correctCount + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100);
      setIsFinished(true);

      if (finalScore >= 75) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }

      onCompleteQuiz(moduleId, finalScore);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const scorePercentage = Math.round((correctCount / questions.length) * 100);
  const hasPassed = scorePercentage >= 75;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
              Cuestionario Evaluativo · {moduleTitle}
            </div>
            {!isFinished && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Pregunta {currentIndex + 1} de {questions.length}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-semibold p-1"
          >
            Cerrar
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isFinished ? (
            <>
              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#39A900] h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  let stateStyle = 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200';

                  if (isAnswerSubmitted) {
                    if (optIdx === currentQ.correctAnswer) {
                      stateStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-medium ring-1 ring-emerald-500';
                    } else if (optIdx === selectedOption) {
                      stateStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 ring-1 ring-rose-400';
                    } else {
                      stateStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500';
                    }
                  } else if (selectedOption === optIdx) {
                    stateStyle = 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-2 ring-[#39A900]';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${stateStyle}`}
                    >
                      <div className="w-6 h-6 rounded-md border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="leading-relaxed flex-1">{option}</span>
                      {isAnswerSubmitted && optIdx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && optIdx === selectedOption && optIdx !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    selectedOption === currentQ.correctAnswer
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {selectedOption === currentQ.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                        <span>¡Respuesta Correcta!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                        <span>Retroalimentación Pedagógica:</span>
                      </>
                    )}
                  </div>
                  <p>{currentQ.explanation}</p>
                  {currentQ.articleCitation && (
                    <div className="mt-2 font-mono text-[11px] text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded">
                      Cita: {currentQ.articleCitation}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-6">
              <div className="inline-flex p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] ring-8 ring-emerald-50/50 dark:ring-emerald-900/30">
                <Award className="w-12 h-12" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  {hasPassed ? '¡Felicitaciones! Cuestionario Aprobado' : 'Resultado de Evaluación'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {hasPassed
                    ? `Has demostrado apropiación sobre los temas clave de ${moduleTitle}.`
                    : 'Necesitas alcanzar mínimo el 75% para aprobar el módulo de inducción.'}
                </p>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                    {correctCount} / {questions.length}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Respuestas correctas</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className={`text-2xl font-bold font-display ${hasPassed ? 'text-[#39A900]' : 'text-amber-600 dark:text-amber-400'}`}>
                    {scorePercentage}%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Puntaje obtenido</div>
                </div>
              </div>

              {hasPassed && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl max-w-md mx-auto text-left text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#39A900] shrink-0" />
                  <div>
                    <span className="font-bold">Insignia Desbloqueada:</span> {badgeName}.
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                      Este resultado ha sido registrado en tu constancia de inducción institucional.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          {!isFinished ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Pausar y salir
              </button>

              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleVerifyAnswer}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#00324D] dark:bg-[#39A900] hover:bg-[#002235] dark:hover:bg-[#329600] disabled:opacity-40 transition-colors flex items-center gap-1.5"
                >
                  <span>Comprobar Respuesta</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Cuestionario</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#00324D] dark:bg-[#39A900] hover:bg-[#002235] dark:hover:bg-[#329600] transition-colors"
              >
                Continuar con la Inducción
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
