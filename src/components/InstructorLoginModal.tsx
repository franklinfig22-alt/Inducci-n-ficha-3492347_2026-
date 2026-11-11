import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { DESIGNATED_INSTRUCTOR } from '../data/mockCohort';

interface InstructorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const InstructorLoginModal: React.FC<InstructorLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [username, setUsername] = useState<string>('instructor.sena');
  const [password, setPassword] = useState<string>('Sena2026*');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (username.trim() === 'instructor.sena' && password === 'Sena2026*') {
        setIsLoading(false);
        onSuccessLogin();
        onClose();
      } else {
        setIsLoading(false);
        setError('Credenciales incorrectas. Usuario por defecto: instructor.sena / Contraseña: Sena2026*');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00324D] text-white flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Acceso Consola del Instructor
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Autenticación requerida para el único instructor líder
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {DESIGNATED_INSTRUCTOR.fullName}
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              {DESIGNATED_INSTRUCTOR.roleTitle} · Ficha {DESIGNATED_INSTRUCTOR.codeFicha}
            </div>
            <div className="pt-1 text-[11px] text-[#39A900] font-medium">
              Usuario genérico: <code className="bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">instructor.sena</code><br />
              Contraseña genérica: <code className="bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">Sena2026*</code>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Usuario / Correo Institucional
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                placeholder="instructor.sena"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] dark:bg-[#39A900] dark:hover:bg-[#329600] rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>{isLoading ? 'Verificando...' : 'Ingresar a Consola'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
