import React, { useState } from 'react';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';
import { ApprenticeProfile, InstructorProfile } from '../types/induction';
import { SAMPLE_APPRENTICES, DESIGNATED_INSTRUCTOR, MOCK_COHORT_STUDENTS } from '../data/mockCohort';
import {
  GraduationCap,
  UserCheck,
  ShieldCheck,
  BookOpen,
  Scale,
  Flag,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Users,
  Building2,
  FileSpreadsheet,
  ChevronRight,
  UserPlus
} from 'lucide-react';

interface LandingPageProps {
  currentApprentice: ApprenticeProfile;
  onSelectApprenticeRole: (selectedApprentice: ApprenticeProfile) => void;
  onSelectInstructorRole: () => void;
  onOpenProfileModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentApprentice,
  onSelectApprenticeRole,
  onSelectInstructorRole,
  onOpenProfileModal
}) => {
  const [selectedApprenticeId, setSelectedApprenticeId] = useState<string>(currentApprentice.id || 'coh-01');

  // Find the currently selected apprentice from our cohort
  const activeSelectedApprentice =
    SAMPLE_APPRENTICES.find((a) => a.id === selectedApprenticeId) || currentApprentice;

  // Cohort stats summary for the single instructor
  const total = MOCK_COHORT_STUDENTS.length;
  const completed = MOCK_COHORT_STUDENTS.filter((s) => s.status === 'Completado').length;
  const inProgress = MOCK_COHORT_STUDENTS.filter((s) => s.status === 'En Progreso').length;
  const atRisk = MOCK_COHORT_STUDENTS.filter((s) => s.status === 'En Riesgo').length;
  const notStarted = MOCK_COHORT_STUDENTS.filter((s) => s.status === 'Sin Iniciar').length;
  const completionRate = Math.round((completed / total) * 100);

  // Apprentice progress in mock cohort
  const studentStatus = MOCK_COHORT_STUDENTS.find(
    (s) => s.name.toLowerCase() === activeSelectedApprentice.fullName.toLowerCase() || s.id === activeSelectedApprentice.id
  );

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Presentation Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00324D] via-[#002538] to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-700/50">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
              <span>Servicio Nacional de Aprendizaje SENA · Ficha 2874102</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
              Portal Institucional de Inducción y Seguimiento
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Bienvenido al entorno interactivo de inducción para el programa{' '}
              <strong className="text-white font-semibold">
                Tecnología en Análisis y Desarrollo de Software (ADSO)
              </strong>
              . Selecciona tu rol institucional para ingresar a tu espacio de formación o a la consola de evaluación del instructor.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
                <Users className="w-4 h-4 text-[#39A900]" />
                <span>10 Aprendices en Ficha</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>1 Instructor Líder Evaluador</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>4 Módulos de Inducción</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Constancia Digital Oficial</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shrink-0 text-center">
            <div className="p-4 bg-white rounded-2xl shadow-lg mb-3">
              <SenaLogo size={70} />
            </div>
            <div className="text-xs font-bold text-white tracking-wider uppercase">SENA Colombia</div>
            <div className="text-[11px] text-emerald-300 font-medium">Regional Distrito Capital</div>
          </div>
        </div>
      </section>

      {/* Primary Role Selector Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Selecciona tu Perfil Institucional
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Escoge si ingresarás como uno de los aprendices de la cohorte para cursar los módulos interactivos o como el único instructor a cargo de auditar el proceso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* CARD 1: APRENDIZ (Multi-aprendiz selector) */}
          <div id="aprendiz-card" className="relative group rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-500/30 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <style>{`
              #aprendiz-card {
                border: 2px solid #39A900;
                box-shadow: 0 4px 12px rgba(57, 169, 0, 0.15);
              }
            `}</style>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#39A900]/10 rounded-bl-full pointer-events-none" />


            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#39A900]/10 dark:bg-[#39A900]/20 flex items-center justify-center text-[#39A900]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#39A900]/15 text-[#39A900] uppercase tracking-wide">
                      Rol de Formación · Varios Aprendices
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      Ingreso como Aprendiz
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5 text-[#39A900]" />
                  10 Aprendices
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Accede a la ruta formativa de inducción, interactúa con el himno y símbolos institucionales, aprende el Reglamento del Aprendiz con casos reales, responde los cuestionarios y obtén tu carné digital y constancia oficial.
              </p>

              {/* Clean Personal Apprentice Login Form */}
              <div className="space-y-4 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Datos de Acceso del Aprendiz:</span>
                  </label>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    Privacidad Garantizada
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Nombres y Apellidos Completos
                    </label>
                    <input
                      type="text"
                      value={currentApprentice.fullName}
                      onChange={(e) => onSelectApprenticeRole({ ...currentApprentice, fullName: e.target.value })}
                      placeholder="Ej. Franklin Alexander Figueroa"
                      className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        Tipo y No. Documento
                      </label>
                      <input
                        type="text"
                        value={currentApprentice.documentNumber}
                        onChange={(e) => onSelectApprenticeRole({ ...currentApprentice, documentNumber: e.target.value })}
                        placeholder="Ej. CC 1098765432"
                        className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                        Ficha de Caracterización
                      </label>
                      <input
                        type="text"
                        value={currentApprentice.codeFicha}
                        onChange={(e) => onSelectApprenticeRole({ ...currentApprentice, codeFicha: e.target.value })}
                        placeholder="Ej. 2874102"
                        className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Correo Institucional @misena.edu.co
                    </label>
                    <input
                      type="email"
                      value={currentApprentice.email}
                      onChange={(e) => onSelectApprenticeRole({ ...currentApprentice, email: e.target.value })}
                      placeholder="Ej. tu.nombre@misena.edu.co"
                      className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onSelectApprenticeRole(currentApprentice)}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#39A900] hover:bg-[#329600] active:scale-[0.99] transition-all shadow-md shadow-[#39A900]/25 group-hover:shadow-lg group-hover:shadow-[#39A900]/30"
              >
                <span>Ingresar al Portal del Aprendiz</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* CARD 2: INSTRUCTOR (Single designated instructor) */}
          <div className="relative group rounded-3xl border-2 border-[#00324D]/40 dark:border-sky-500/30 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00324D]/10 dark:bg-sky-500/10 rounded-bl-full pointer-events-none" />

            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00324D]/10 dark:bg-sky-500/20 flex items-center justify-center text-[#00324D] dark:text-sky-400">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#00324D]/10 dark:bg-sky-950 text-[#00324D] dark:text-sky-300 uppercase tracking-wide">
                      Rol Docente · Único Instructor Evaluador
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      Consola del Instructor Líder
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00324D] dark:text-sky-400" />
                  Único Asignado
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Supervisión centralizada a cargo del <strong>único instructor asignado</strong>. Monitorea el avance de los 10 aprendices en tiempo real, audita cuestionarios, notifica alertas tempranas de inasistencia y exporta reportes de cumplimiento.
              </p>

              {/* Single Instructor Identification Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#00324D] dark:text-sky-400" />
                  <span>Instructor Líder Responsable de la Ficha:</span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#00324D] dark:bg-sky-700 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
                    CM
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{DESIGNATED_INSTRUCTOR.fullName}</span>
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Verificado
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {DESIGNATED_INSTRUCTOR.roleTitle} · CC {DESIGNATED_INSTRUCTOR.documentNumber}
                    </div>
                    <div className="text-[11px] text-[#00324D] dark:text-sky-400 font-medium">
                      {DESIGNATED_INSTRUCTOR.email}
                    </div>
                  </div>
                </div>

                {/* Cohort Quick Metrics */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-base font-extrabold text-[#00324D] dark:text-white">{total}</div>
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Total</div>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                    <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">{completed}</div>
                    <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">Listos (40%)</div>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                    <div className="text-base font-extrabold text-amber-700 dark:text-amber-400">{inProgress}</div>
                    <div className="text-[10px] font-medium text-amber-700 dark:text-amber-400">En Curso</div>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
                    <div className="text-base font-extrabold text-rose-700 dark:text-rose-400">{atRisk}</div>
                    <div className="text-[10px] font-medium text-rose-700 dark:text-rose-400">En Riesgo</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={onSelectInstructorRole}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#00324D] hover:bg-[#002235] dark:bg-[#39A900] dark:hover:bg-[#329600] active:scale-[0.99] transition-all shadow-md shadow-[#00324D]/25 dark:shadow-[#39A900]/25 group-hover:shadow-lg"
              >
                <span>Ingresar a la Consola del Instructor Líder</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Induction Program Pillars Overview */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-[#39A900] uppercase tracking-wider">Plan Formativo</div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Los 4 Ejes Fundamentales de la Inducción SENA
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Módulos diseñados conforme a los lineamientos de la Dirección de Formación Profesional para la apropiación institucional y normativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Module 1 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#39A900]/60 transition-colors shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#39A900] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Identidad e Institucionalidad
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Misión, visión, historia de Rodolfo Martínez Tono, himno con estrofas interactivas y significado de los símbolos patrios y corporativos.
            </p>
            <div className="text-[11px] font-semibold text-[#39A900] pt-1">
              Himno · Escudo · Bandera · Logo
            </div>
          </div>

          {/* Module 2 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#39A900]/60 transition-colors shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#00324D] dark:text-sky-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Reglamento del Aprendiz
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Acuerdo 007 de 2012: Derechos fundamentales, deberes ineludibles, prohibiciones, tipificación de faltas y Comité de Evaluación.
            </p>
            <div className="text-[11px] font-semibold text-[#00324D] dark:text-sky-400 pt-1">
              Simulador de Casos Reales
            </div>
          </div>

          {/* Module 3 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#39A900]/60 transition-colors shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Ruta Formativa Integral
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Etapa Lectiva y Productiva (Contrato de Aprendizaje, Pasantía, Proyecto Productivo), Zajuna LMS, Sofia Plus y competencias.
            </p>
            <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 pt-1">
              Sofia Plus · Zajuna · Territorium
            </div>
          </div>

          {/* Module 4 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#39A900]/60 transition-colors shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Ecosistema y Bienestar
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bienestar al Aprendiz, apoyos de sostenimiento, Agencia Pública de Empleo (APE), Fondo Emprender y semilleros SENNOVA.
            </p>
            <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 pt-1">
              Bienestar · APE · Fondo Emprender
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Quote & Verification Info */}
      <section className="rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xs shrink-0">
            <SenaEscudo className="w-12 h-14" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Formación Profesional Integral con Enfoque de Competencias
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              «El SENA es el lugar donde el trabajo y la educación se unen para forjar el progreso de Colombia.»
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectApprenticeRole(activeSelectedApprentice)}
            className="px-4 py-2 text-xs font-bold rounded-lg text-white bg-[#39A900] hover:bg-[#329600] transition-colors"
          >
            Entrar como Aprendiz
          </button>
          <button
            onClick={onSelectInstructorRole}
            className="px-4 py-2 text-xs font-bold rounded-lg text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 transition-colors"
          >
            Entrar como Instructor
          </button>
        </div>
      </section>
    </div>
  );
};
