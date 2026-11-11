import React from 'react';
import { ApprenticeProfile, ApprenticeProgress } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';
import { Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateViewProps {
  apprentice: ApprenticeProfile;
  progress: ApprenticeProgress;
  onClose?: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  apprentice,
  progress,
  onClose
}) => {
  const percentComplete = Math.round((progress.completedModules.length / 4) * 100);
  const isEligible = percentComplete === 100;
  const issueDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const verificationCode = `SENA-IND-${apprentice.codeFicha}-${apprentice.documentNumber.slice(-4)}-2026`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action bar for screen */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-[#39A900]" />
          <span>Documento oficial con validez académica institucional · Inducción FPI</span>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
            >
              Volver
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {!isEligible && (
        <div className="no-print p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
          <strong>Aviso de Vista Previa:</strong> Actualmente tienes un {percentComplete}% de avance. Esta es una vista previa de cómo se emitirá tu constancia una vez completes los 4 módulos de inducción.
        </div>
      )}

      {/* Printable Certificate Frame */}
      <div className="bg-white rounded-2xl border-4 border double border-slate-300 p-8 sm:p-12 shadow-lg relative max-w-4xl mx-auto text-slate-800">
        {/* Subtle decorative inner border */}
        <div className="border border-[#39A900]/40 p-6 sm:p-10 rounded-xl relative space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 gap-4">
            <div className="flex items-center gap-3">
              <SenaLogo size={46} />
              <div className="h-8 w-px bg-slate-300" aria-hidden="true" />
              <SenaEscudo size={46} />
            </div>

            <div className="text-center sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                República de Colombia
              </span>
              <span className="text-sm font-bold text-[#00324D] block font-display">
                SERVICIO NACIONAL DE APRENDIZAJE - SENA
              </span>
              <span className="text-[11px] text-slate-500 block">
                {apprentice.regional} · {apprentice.center}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#39A900]">
              Constancia de Formación Institucional
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight uppercase">
              Certificado de Inducción
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Acreditación de Apropiación Normativa y Símbolos SENA
            </p>
          </div>

          {/* Statement */}
          <div className="text-center space-y-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            <p className="text-slate-700">
              La Subdirección del Centro y la Coordinación de Formación Profesional Integral hacen constar que el (la) aprendiz:
            </p>

            <div className="py-2 border-b-2 border-slate-900 inline-block px-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                {apprentice.fullName}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Identificado(a) con {apprentice.documentType} No. <span className="font-semibold text-slate-900">{apprentice.documentNumber}</span>, matriculado(a) en el programa:
            </p>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm font-bold text-[#00324D]">
              {apprentice.program}
              <div className="text-xs font-normal text-slate-600 mt-0.5">
                Ficha de Caracterización: <span className="font-bold text-slate-900">{apprentice.codeFicha}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
              Culminó y aprobó a satisfacción el proceso formativo de <strong>Inducción Institucional</strong> con una intensidad de <strong>40 horas</strong>, demostrando competencia y conocimiento integral en: Identidad Institucional, Historia y Símbolos del SENA, Reglamento del Aprendiz (Acuerdo 007 de 2012), Deberes y Derechos, Ruta de Formación, Alternativas de Etapa Productiva y Servicios de Bienestar al Aprendiz.
            </p>
          </div>

          {/* Competency Modules Summary Table */}
          <div className="max-w-xl mx-auto border border-slate-200 rounded-lg overflow-hidden text-xs">
            <div className="bg-slate-100 p-2 font-bold text-slate-700 text-center border-b border-slate-200">
              NÚCLEOS DE INDUCCIÓN EVALUADOS Y ASENTADOS
            </div>
            <div className="divide-y divide-slate-100">
              <div className="p-2 flex justify-between">
                <span>01. Identidad, Historia y Símbolos SENA</span>
                <span className="font-bold text-[#39A900]">APROBADO ({progress.moduleScores['identidad'] || 100}%)</span>
              </div>
              <div className="p-2 flex justify-between">
                <span>02. Reglamento y Normativa (Acuerdo 007)</span>
                <span className="font-bold text-[#39A900]">APROBADO ({progress.moduleScores['normativa'] || 100}%)</span>
              </div>
              <div className="p-2 flex justify-between">
                <span>03. Ruta de Formación y Etapa Productiva</span>
                <span className="font-bold text-[#39A900]">APROBADO ({progress.moduleScores['ruta-formacion'] || 100}%)</span>
              </div>
              <div className="p-2 flex justify-between">
                <span>04. Ecosistema SENA, Bienestar y APE</span>
                <span className="font-bold text-[#39A900]">APROBADO ({progress.moduleScores['ecosistema'] || 100}%)</span>
              </div>
            </div>
          </div>

          {/* Signatures & Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200 items-end text-center">
            {/* Signature 1 */}
            <div className="space-y-1">
              <div className="h-12 border-b border-slate-400 max-w-[160px] mx-auto flex items-end justify-center pb-1">
                <span className="font-serif italic text-xs text-slate-600">Subdirección de Centro</span>
              </div>
              <div className="text-xs font-bold text-slate-800">Subdirector(a) de Centro</div>
              <div className="text-[10px] text-slate-500">Centro de Formación SENA</div>
            </div>

            {/* Verification Code & Stamp */}
            <div className="space-y-1 flex flex-col items-center">
              {/* Simulated QR block */}
              <div className="w-16 h-16 bg-slate-900 rounded p-1 text-white flex flex-col items-center justify-center text-[9px] font-mono leading-none">
                <div className="grid grid-cols-3 gap-1 w-full h-full p-1 border border-white/40">
                  <div className="bg-white" />
                  <div className="bg-transparent" />
                  <div className="bg-white" />
                  <div className="bg-transparent" />
                  <div className="bg-white" />
                  <div className="bg-transparent" />
                  <div className="bg-white" />
                  <div className="bg-white" />
                  <div className="bg-white" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-slate-600 block mt-1">
                {verificationCode}
              </span>
              <span className="text-[9px] text-slate-400">Verificable en plataforma Zajuna</span>
            </div>

            {/* Signature 2 */}
            <div className="space-y-1">
              <div className="h-12 border-b border-slate-400 max-w-[160px] mx-auto flex items-end justify-center pb-1">
                <span className="font-serif italic text-xs text-slate-600">Coordinación FPI</span>
              </div>
              <div className="text-xs font-bold text-slate-800">Coordinador(a) Misional</div>
              <div className="text-[10px] text-slate-500">Expedido el {issueDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
