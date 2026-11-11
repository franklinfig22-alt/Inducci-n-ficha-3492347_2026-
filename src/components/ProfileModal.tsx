import React, { useState } from 'react';
import { ApprenticeProfile, ApprenticeProgress } from '../types/induction';
import { SAMPLE_APPRENTICES } from '../data/mockCohort';
import { X, User, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApprentice: ApprenticeProfile;
  onUpdateApprentice: (updated: ApprenticeProfile) => void;
  onResetProgress: () => void;
  onCompleteAllProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentApprentice,
  onUpdateApprentice,
  onResetProgress,
  onCompleteAllProgress
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>(() => ({
    id: 'app-custom-' + Date.now(),
    fullName: '',
    documentType: 'CC',
    documentNumber: '',
    email: '',
    phone: '',
    program: '',
    codeFicha: '',
    regional: '',
    center: '',
    startDate: new Date().toISOString().split('T')[0]
  }));
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: ApprenticeProfile) => {
    setSelectedPresetId(preset.id);
    setFormData(preset);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateApprentice(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#39A900]" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Perfil del Aprendiz & Datos de Inducción
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Personaliza los datos que se reflejan en tu carné y constancia oficial
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormData({
                id: '',
                fullName: '',
                documentType: 'CC',
                documentNumber: '',
                email: '',
                phone: '',
                program: '',
                codeFicha: '',
                regional: '',
                center: '',
                startDate: new Date().toISOString().split('T')[0]
              })}
              className="px-2 py-1 text-[10px] font-bold text-[#39A900] bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 rounded-lg flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Limpiar
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick presets */}
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Seleccionar Aprendiz de la Cohorte ({SAMPLE_APPRENTICES.length} disponibles):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
              {SAMPLE_APPRENTICES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    selectedPresetId === preset.id
                      ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-[#39A900]'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-slate-900 dark:text-white truncate">{preset.fullName}</div>
                  <div className="text-[11px] text-[#39A900] font-medium">{preset.documentType} {preset.documentNumber}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">Ficha {preset.codeFicha}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nombres y Apellidos Completos
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                placeholder="Ej. Juan Pérez"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tipo Doc.
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                >
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="PPT">PPT</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Número de Identificación
                </label>
                <input
                  type="text"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  placeholder="Ej. 1020304050"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Ficha de Caracterización
                </label>
                <input
                  type="text"
                  value={formData.codeFicha}
                  onChange={(e) => setFormData({ ...formData, codeFicha: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  placeholder="Ej. 2874102"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Regional SENA
                </label>
                <input
                  type="text"
                  value={formData.regional}
                  onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  placeholder="Ej. Distrito Capital"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Programa de Formación
              </label>
              <input
                type="text"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                placeholder="Ej. Análisis y Desarrollo de Software"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Centro de Formación
              </label>
              <input
                type="text"
                value={formData.center}
                onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                placeholder="Ej. Centro de Gestión de Mercados..."
                required
              />
            </div>

            {/* Quick Testing Controls */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Acciones de Prueba:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onResetProgress}
                  className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reiniciar Progreso (0%)</span>
                </button>

                <button
                  type="button"
                  onClick={onCompleteAllProgress}
                  className="px-2.5 py-1 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
                  <span>Aprobar Todo (100%)</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-[#00324D] dark:bg-[#39A900] hover:bg-[#002235] dark:hover:bg-[#329600] rounded-lg transition-colors shadow-xs"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
