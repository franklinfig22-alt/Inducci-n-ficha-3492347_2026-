import React, { useState } from 'react';
import { ApprenticeProfile, ApprenticeProgress, InductionModule, ModuleId } from '../types/induction';
import { INDUCTION_MODULES, CASE_DILEMMAS } from '../data/inductionData';
import { CertificateView } from './CertificateView';
import { SenaEscudo } from './SenaEscudo';
import { Award, CheckCircle2, FileText, Check, Shield, Compass, Sparkles, User, ExternalLink, Printer } from 'lucide-react';

interface ProgressDashboardProps {
  apprentice: ApprenticeProfile;
  progress: ApprenticeProgress;
  onSelectModule: (moduleId: any) => void;
  onOpenProfileModal: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  apprentice,
  progress,
  onSelectModule,
  onOpenProfileModal
}) => {
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const totalModules = INDUCTION_MODULES.length;
  const completedCount = progress.completedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  const scores = Object.values(progress.moduleScores);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const casesCount = progress.casesResolved.length;

  const BADGES = [
    {
      id: 'badge-identidad',
      title: 'Orgullo e Identidad SENA',
      desc: 'Aprobó historia, misión y símbolos patrios',
      icon: Shield,
      isUnlocked: progress.completedModules.includes('identidad'),
      moduleId: 'identidad'
    },
    {
      id: 'badge-normativa',
      title: 'Defensor de la Norma',
      desc: 'Dominio del Acuerdo 007 y debido proceso',
      icon: Award,
      isUnlocked: progress.completedModules.includes('normativa'),
      moduleId: 'normativa'
    },
    {
      id: 'badge-ruta',
      title: 'Estratega de Ruta Productiva',
      desc: 'Claridad en competencias y contrato de aprendizaje',
      icon: Compass,
      isUnlocked: progress.completedModules.includes('ruta-formacion'),
      moduleId: 'ruta-formacion'
    },
    {
      id: 'badge-ecosistema',
      title: 'Embajador del Ecosistema',
      desc: 'Conocedor de APE, Bienestar y Zajuna',
      icon: Sparkles,
      isUnlocked: progress.completedModules.includes('ecosistema'),
      moduleId: 'ecosistema'
    }
  ];

  if (showCertificateModal) {
    return (
      <CertificateView
        apprentice={apprentice}
        progress={progress}
        onClose={() => setShowCertificateModal(false)}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            <span>Seguimiento de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Ficha {apprentice.codeFicha}</span>
            <span aria-hidden="true">·</span>
            <span>Acreditación</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Estado de Avance de Inducción
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Monitorea el cumplimiento de tus 40 horas de inducción, tus calificaciones en los cuestionarios y la emisión de tu constancia.
          </p>
        </div>

        <button
          onClick={() => setShowCertificateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] dark:bg-[#39A900] dark:hover:bg-[#329600] rounded-xl transition-all shadow-xs self-start"
        >
          <Printer className="w-4 h-4 text-[#39A900] dark:text-white" />
          <span>Generar Constancia Oficial</span>
        </button>
      </div>

      {/* 4 Quantitative Rigor Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Progreso General</div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
            {progressPercent}%
          </div>
          <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#39A900] h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Módulos Aprobados</div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
            {completedCount} <span className="text-base text-slate-400 font-normal">/ {totalModules}</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium">
            {completedCount === totalModules ? '¡Todos completados!' : 'En proceso activo'}
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Casos Resueltos</div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
            {casesCount} <span className="text-base text-slate-400 font-normal">/ {CASE_DILEMMAS.length}</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Tribunal del Aprendiz</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Promedio Evaluativo</div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-[#39A900] mt-1 tabular-nums">
            {avgScore > 0 ? `${avgScore}%` : '—'}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Calificación acumulada</div>
        </div>
      </div>

      {/* Main split: Apprentice Virtual Carné & Unlocked Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Virtual Apprentice Carnet */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
              Carné Digital del Aprendiz
            </span>
            <button
              onClick={onOpenProfileModal}
              className="text-xs font-semibold text-[#00324D] dark:text-[#39A900] hover:underline"
            >
              Cambiar / Editar
            </button>
          </div>

          {/* Carnet Card */}
          <div className="bg-gradient-to-br from-[#00324D] to-[#001D2D] rounded-2xl p-6 text-white shadow-md relative overflow-hidden space-y-5">
            {/* Background watermark badge */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rounded-full border-8 border-white pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] tracking-widest text-[#39A900] uppercase font-bold block">
                  Servicio Nacional de Aprendizaje
                </span>
                <span className="text-base font-bold font-display">APRENDIZ SENA</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-white/10 p-1 flex items-center justify-center shrink-0 border border-white/20">
                <SenaEscudo size={28} />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 font-bold text-2xl font-display">
                {apprentice.fullName.charAt(0)}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-base font-bold font-display truncate">
                  {apprentice.fullName}
                </div>
                <div className="text-xs text-slate-300">
                  {apprentice.documentType} {apprentice.documentNumber}
                </div>
                <div className="text-[11px] text-[#39A900] font-semibold">
                  Ficha: {apprentice.codeFicha}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs border-t border-white/10 pt-3">
              <div className="text-slate-300 truncate">
                <span className="text-slate-400">Programa:</span> {apprentice.program}
              </div>
              <div className="text-slate-300 truncate">
                <span className="text-slate-400">Centro:</span> {apprentice.center}
              </div>
              <div className="text-slate-300">
                <span className="text-slate-400">Regional:</span> {apprentice.regional}
              </div>
            </div>

            {/* Barcode representation */}
            <div className="pt-2 flex flex-col items-center">
              <div className="h-6 w-full flex items-center justify-center gap-0.5 opacity-70">
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2].map((w, idx) => (
                  <div key={idx} className="bg-white h-full" style={{ width: `${w * 2}px` }} />
                ))}
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-1">
                {apprentice.codeFicha}-{apprentice.documentNumber.slice(-4)}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            El carné identifica al aprendiz ante la comunidad educativa y es obligatorio para ingresar y hacer uso de las instalaciones, talleres y bibliotecas.
          </div>
        </div>

        {/* Unlocked Badges & Detailed Status */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-display">
              Insignias Institucionales Desbloqueables
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {progress.completedModules.length} de 4 ganadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BADGES.map((b) => {
              const IconComp = b.icon;
              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    b.isUnlocked
                      ? 'border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 opacity-70'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      b.isUnlocked
                        ? 'bg-[#39A900] text-white shadow-xs'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 font-display truncate">
                        {b.title}
                      </h4>
                      {b.isUnlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {b.desc}
                    </p>
                    <div className="mt-2">
                      {b.isUnlocked ? (
                        <span className="text-[10px] font-bold text-[#39A900]">
                          Aprobado con {progress.moduleScores[b.moduleId as ModuleId] || 100}%
                        </span>
                      ) : (
                        <button
                          onClick={() => onSelectModule(b.moduleId as ModuleId)}
                          className="text-[10px] font-bold text-[#00324D] dark:text-[#39A900] hover:underline"
                        >
                          Completar módulo →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checklist of Induction Completion */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Matriz de Cumplimiento de Inducción FPI
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span>1. Lectura interactiva de los 4 núcleos temáticos</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{completedCount}/4</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span>2. Aprobación de evaluaciones ($\ge 75\%$)</span>
                <span className={`font-bold ${completedCount === 4 ? 'text-[#39A900]' : 'text-slate-900 dark:text-slate-100'}`}>
                  {completedCount === 4 ? 'Cumplido' : 'Pendiente'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span>3. Análisis de casos del Reglamento del Aprendiz</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{casesCount}/4</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span>4. Generación y radicación de constancia en Zajuna</span>
                <span className={`font-bold ${progressPercent === 100 ? 'text-[#39A900]' : 'text-slate-400 dark:text-slate-500'}`}>
                  {progressPercent === 100 ? 'Habilitada' : 'Requiere 100%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
