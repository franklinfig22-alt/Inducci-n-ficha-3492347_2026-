import React from 'react';
import { SenaLogo } from './SenaLogo';
import { ApprenticeProfile, ApprenticeProgress } from '../types/induction';
import { Award, UserCheck, BookOpen, Scale, Flag, HelpCircle, Accessibility, Moon, Sun, ArrowLeftRight, GraduationCap, Home, ShieldCheck, Film } from 'lucide-react';
import { DESIGNATED_INSTRUCTOR } from '../data/mockCohort';

interface NavbarProps {
  currentRole: 'landing' | 'aprendiz' | 'instructor';
  onNavigateHome: () => void;
  activeTab: 'modulos' | 'casos' | 'simbolos' | 'progreso' | 'instructor';
  setActiveTab: (tab: 'modulos' | 'casos' | 'simbolos' | 'progreso' | 'instructor') => void;
  apprentice: ApprenticeProfile;
  progress: ApprenticeProgress;
  onOpenGlossary: () => void;
  onOpenVideoManual: () => void;
  onSwitchProfileModal: () => void;
  isAccessibilityMode: boolean;
  onToggleAccessibility: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onNavigateHome,
  activeTab,
  setActiveTab,
  apprentice,
  progress,
  onOpenGlossary,
  onOpenVideoManual,
  onSwitchProfileModal,
  isAccessibilityMode,
  onToggleAccessibility,
  isDarkMode,
  onToggleDarkMode
}) => {

  const percentComplete = Math.round((progress.completedModules.length / 4) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6 h-16">
          {/* Zone 1: Brand title & Role Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39A900] rounded-md group"
              title="Volver al Portal Principal / Selección de Rol"
            >
              <SenaLogo size={38} />
              <div className="hidden sm:block leading-tight">
                <span className="font-bold text-xs text-slate-800 dark:text-white tracking-wide block">
                  SENA Inducción
                </span>
                <span className="text-[10px] text-[#39A900] font-semibold">
                  Ficha 2874102 · ADSO
                </span>
              </div>
            </button>

            {/* Active role indicator badge */}
            {currentRole !== 'landing' && (
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                {currentRole === 'aprendiz' ? (
                  <>
                    <GraduationCap className="w-3.5 h-3.5 text-[#39A900]" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Rol: <strong className="text-[#39A900]">Aprendiz</strong>
                    </span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-[#00324D] dark:text-sky-400" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Rol: <strong className="text-[#00324D] dark:text-sky-400">Único Instructor</strong>
                    </span>
                  </>
                )}
              </div>
            )}
          </div>


          {/* Zone 2: Navigation Links */}
          {currentRole === 'landing' ? (
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                Portal Oficial de Inducción SENA
              </span>
              <button
                onClick={onOpenGlossary}
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap"
                title="Glosario y Preguntas Frecuentes SENA"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Glosario Institucional</span>
              </button>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              {currentRole === 'instructor' && (
                <button
                  onClick={() => setActiveTab('instructor')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                    activeTab === 'instructor'
                      ? 'border-[#00324D] dark:border-sky-400 text-[#00324D] dark:text-sky-400 font-bold'
                      : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#00324D] dark:text-sky-400" />
                  <span>Consola del Instructor</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('modulos')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                  activeTab === 'modulos'
                    ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                <span>Ruta de Inducción</span>
              </button>

              <button
                onClick={() => setActiveTab('casos')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                  activeTab === 'casos'
                    ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Scale className="w-4 h-4 text-[#39A900]" />
                <span>Normativa y Casos</span>
              </button>

              <button
                onClick={() => setActiveTab('simbolos')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                  activeTab === 'simbolos'
                    ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900] font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Flag className="w-4 h-4 text-[#39A900]" />
                <span>Símbolos</span>
              </button>

              {currentRole === 'aprendiz' && (
                <button
                  onClick={() => setActiveTab('progreso')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                    activeTab === 'progreso'
                      ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900] font-semibold'
                      : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4 text-[#39A900]" />
                  <span>Mi Progreso</span>
                </button>
              )}

              <button
                onClick={onOpenGlossary}
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap shrink-0 ml-1"
                title="Glosario y Preguntas Frecuentes SENA"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Glosario</span>
              </button>

              <button
                onClick={onOpenVideoManual}
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap shrink-0 ml-1"
                title="Ver video manual de la plataforma"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Video Manual</span>
              </button>
            </nav>
          )}

          {/* Zone 3: Actions, Role Switcher & Accessibility & Dark Mode toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Button to Switch Role / Go to Landing */}
            {currentRole !== 'landing' && (
              <button
                onClick={onNavigateHome}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors shrink-0"
                title="Cambiar de Rol (Volver a la Landing Page)"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#39A900]" />
                <span className="hidden sm:inline">Cambiar Rol</span>
              </button>
            )}

            {/* Profile badge depending on role */}
            {currentRole === 'aprendiz' && (
              <button
                onClick={onSwitchProfileModal}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                title="Cambiar o editar perfil del aprendiz"
              >
                <div className="w-6 h-6 rounded-full bg-[#39A900] text-white flex items-center justify-center font-bold text-xs">
                  {apprentice.fullName.charAt(0)}
                </div>
                <div className="hidden lg:block leading-tight">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[95px]">
                    {apprentice.fullName.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-[#39A900] font-medium">
                    Ficha {apprentice.codeFicha}
                  </div>
                </div>
              </button>
            )}

            {currentRole === 'instructor' && (
              <div
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-left"
                title="Único Instructor Líder asignado a la Ficha"
              >
                <div className="w-6 h-6 rounded-full bg-[#00324D] text-white flex items-center justify-center font-bold text-xs">
                  CM
                </div>
                <div className="hidden lg:block leading-tight">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[110px]">
                    {DESIGNATED_INSTRUCTOR.fullName.split(' ')[1] || 'Carlos Morales'}
                  </div>
                  <div className="text-[10px] text-[#00324D] dark:text-sky-400 font-medium">
                    Único Evaluador
                  </div>
                </div>
              </div>
            )}

            {/* Certificate action for Apprentice */}
            {currentRole === 'aprendiz' && (
              <button
                onClick={() => setActiveTab('progreso')}
                className="px-2.5 py-1.5 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002538] dark:bg-[#39A900] dark:hover:bg-[#329600] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
                title="Ver constancia de inducción"
              >
                <Award className="w-3.5 h-3.5 text-[#39A900] dark:text-white" />
                <span className="hidden sm:inline">Constancia</span>
              </button>
            )}

            {/* Accessibility toggle */}
            <button
              onClick={onToggleAccessibility}
              aria-pressed={isAccessibilityMode}
              aria-label="Modo Accesibilidad: alto contraste, texto grande y sin animaciones"
              title={
                isAccessibilityMode
                  ? 'Desactivar Modo Accesibilidad'
                  : 'Activar Modo Accesibilidad (Alto contraste, texto grande, reducción de movimiento)'
              }
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-xs font-semibold transition-colors shrink-0 ${
                isAccessibilityMode
                  ? 'bg-black text-white border-black ring-2 ring-black'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Accessibility className={`w-4 h-4 ${isAccessibilityMode ? 'text-[#39A900]' : 'text-slate-600 dark:text-slate-400'}`} />
              <span className="hidden xl:inline">
                {isAccessibilityMode ? 'Accesibilidad: ON' : 'Accesibilidad'}
              </span>
            </button>

            {/* DARK MODE BUTTON IN THE UPPER RIGHT CORNER */}
            <button
              onClick={onToggleDarkMode}
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
              title={isDarkMode ? 'Cambiar a Modo Claro' : 'Activar Modo Oscuro (Pantalla borrosa y cambio de color)'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-300 dark:border-slate-600 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39A900]"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden sm:inline">Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                  <span className="hidden sm:inline">Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation */}
        {currentRole !== 'landing' && (
          <div className="md:hidden flex items-center justify-between border-t border-slate-100 dark:border-slate-800 py-2.5 overflow-x-auto gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 scrollbar-none">
            <button
              onClick={onNavigateHome}
              className="whitespace-nowrap flex items-center gap-1 text-[#39A900] font-bold"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Roles</span>
            </button>
            {currentRole === 'instructor' && (
              <button
                onClick={() => setActiveTab('instructor')}
                className={`whitespace-nowrap ${activeTab === 'instructor' ? 'text-[#00324D] dark:text-[#39A900] font-bold' : ''}`}
              >
                Consola
              </button>
            )}
            <button
              onClick={() => setActiveTab('modulos')}
              className={`whitespace-nowrap ${activeTab === 'modulos' ? 'text-[#39A900] font-bold' : ''}`}
            >
              Módulos
            </button>
            <button
              onClick={() => setActiveTab('casos')}
              className={`whitespace-nowrap ${activeTab === 'casos' ? 'text-[#39A900] font-bold' : ''}`}
            >
              Normativa
            </button>
            <button
              onClick={() => setActiveTab('simbolos')}
              className={`whitespace-nowrap ${activeTab === 'simbolos' ? 'text-[#39A900] font-bold' : ''}`}
            >
              Símbolos
            </button>
            {currentRole === 'aprendiz' && (
              <button
                onClick={() => setActiveTab('progreso')}
                className={`whitespace-nowrap ${activeTab === 'progreso' ? 'text-[#39A900] font-bold' : ''}`}
              >
                Progreso
              </button>
            )}
            <button
              onClick={onToggleDarkMode}
              className="whitespace-nowrap flex items-center gap-1 font-semibold text-slate-700 dark:text-amber-300"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Claro' : 'Oscuro'}</span>
            </button>
            <button
              onClick={onOpenGlossary}
              className="whitespace-nowrap text-slate-500 dark:text-slate-400 hover:text-[#39A900]"
            >
              Glosario
            </button>
            <button
              onClick={onOpenVideoManual}
              className="whitespace-nowrap text-slate-500 dark:text-slate-400 hover:text-[#39A900]"
            >
              Video Manual
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

