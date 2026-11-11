import React, { useState } from 'react';
import { CohortApprentice } from '../types/induction';
import { MOCK_COHORT_STUDENTS, DESIGNATED_INSTRUCTOR } from '../data/mockCohort';
import { Search, Filter, Download, Bell, AlertTriangle, CheckCircle2, Clock, Mail, Users, ShieldCheck, UserCheck, Award } from 'lucide-react';


export const InstructorView: React.FC = () => {
  const [students, setStudents] = useState<CohortApprentice[]>(MOCK_COHORT_STUDENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Completado' | 'En Progreso' | 'En Riesgo' | 'Sin Iniciar'>('Todos');
  const [notificationSent, setNotificationSent] = useState<boolean>(false);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.document.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const total = students.length;
  const completed = students.filter((s) => s.status === 'Completado').length;
  const inProgress = students.filter((s) => s.status === 'En Progreso').length;
  const atRisk = students.filter((s) => s.status === 'En Riesgo').length;
  const notStarted = students.filter((s) => s.status === 'Sin Iniciar').length;

  const completionRate = Math.round((completed / total) * 100);

  const handleSendReminder = () => {
    setNotificationSent(true);
    setTimeout(() => {
      setNotificationSent(false);
    }, 4000);
  };

  const handleExportCSV = () => {
    const headers = ['Nombre', 'Documento', 'Email', 'Progreso (%)', 'Módulos', 'Estado', 'Último Acceso', 'Promedio'];
    const rows = students.map((s) => [
      `"${s.name}"`,
      `"${s.document}"`,
      `"${s.email}"`,
      s.progressPercent,
      s.modulesCompleted,
      `"${s.status}"`,
      `"${s.lastAccess}"`,
      s.averageScore
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Seguimiento_Induccion_Ficha_2874102.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            <span>Coordinación Misional</span>
            <span aria-hidden="true">·</span>
            <span>Seguimiento de Cohorte</span>
            <span aria-hidden="true">·</span>
            <span>Ficha 2874102 - ADSO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
            Consola del Instructor de Inducción
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Supervisa el avance de los aprendices en tiempo real, detecta casos en riesgo de deserción temprana y gestiona la cohorte.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSendReminder}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors shadow-xs"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Notificar Rezagados</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#00324D] dark:bg-[#39A900] hover:bg-[#002235] dark:hover:bg-[#329600] rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Designated Single Instructor Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#00324D] to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md border border-slate-700/60">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center font-bold text-lg border border-white/15 shrink-0">
            CM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white">{DESIGNATED_INSTRUCTOR.fullName}</span>
              <span className="bg-[#39A900] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Único Evaluador Asignado
              </span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {DESIGNATED_INSTRUCTOR.roleTitle} · Ficha {DESIGNATED_INSTRUCTOR.codeFicha} (ADSO) · CC {DESIGNATED_INSTRUCTOR.documentNumber}
            </div>
            <div className="text-[11px] text-emerald-300">
              {DESIGNATED_INSTRUCTOR.email} · {DESIGNATED_INSTRUCTOR.center}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#39A900]" />
          <span>Supervisión de {total} Aprendices</span>
        </div>
      </div>

      {notificationSent && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
            <span>Se ha enviado recordatorio institucional vía correo @misena.edu.co a los {atRisk + notStarted} aprendices con inducción pendiente.</span>
          </div>
          <span className="font-bold text-emerald-800 dark:text-emerald-300">Enviado</span>
        </div>
      )}

      {/* Cohort KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Aprendices</div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 tabular-nums">
            {total}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Matriculados en ficha</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Completaron Inducción</div>
          <div className="text-2xl font-bold font-display text-[#39A900] mt-1 tabular-nums">
            {completed}
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5 font-medium">{completionRate}% de la ficha</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">En Progreso</div>
          <div className="text-2xl font-bold font-display text-slate-700 dark:text-slate-200 mt-1 tabular-nums">
            {inProgress}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Avanzando en módulos</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Alerta Temprana</div>
          <div className="text-2xl font-bold font-display text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
            {atRisk}
          </div>
          <div className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5 font-medium">Más de 5 días sin acceso</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sin Iniciar</div>
          <div className="text-2xl font-bold font-display text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
            {notStarted}
          </div>
          <div className="text-[11px] text-rose-700 dark:text-rose-400 mt-0.5 font-medium">Riesgo de deserción</div>
        </div>
      </div>

      {/* Cohort Table & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Controls Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, cédula o correo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:border-[#39A900]"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {(['Todos', 'Completado', 'En Progreso', 'En Riesgo', 'Sin Iniciar'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setStatusFilter(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === cat
                    ? 'bg-[#00324D] dark:bg-[#39A900] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Avance (%)</th>
                <th className="py-3 px-4">Módulos</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Último Acceso</th>
                <th className="py-3 px-4 text-right">Promedio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  let statusBadge = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                  if (student.status === 'Completado') statusBadge = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold';
                  if (student.status === 'En Progreso') statusBadge = 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300';
                  if (student.status === 'En Riesgo') statusBadge = 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold';
                  if (student.status === 'Sin Iniciar') statusBadge = 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-semibold';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{student.name}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">{student.email}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                        {student.document}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 w-8 tabular-nums">
                            {student.progressPercent}%
                          </span>
                          <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#39A900] h-full"
                              style={{ width: `${student.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 tabular-nums text-slate-700 dark:text-slate-300">
                        {student.modulesCompleted} / 4
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] ${statusBadge}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                        {student.lastAccess}
                      </td>
                      <td className="py-3 px-4 text-right font-bold tabular-nums text-slate-800 dark:text-slate-200">
                        {student.averageScore > 0 ? `${student.averageScore}%` : '—'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 dark:text-slate-500">
                    No se encontraron aprendices con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
