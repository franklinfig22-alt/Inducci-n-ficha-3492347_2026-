import React, { useState, useEffect } from 'react';
import {
  ModuleId,
  InductionModule,
  ApprenticeProfile,
  ApprenticeProgress
} from './types/induction';
import { INDUCTION_MODULES } from './data/inductionData';
import { SAMPLE_APPRENTICES } from './data/mockCohort';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ModuleRoadmap } from './components/ModuleRoadmap';
import { ModuleViewer } from './components/ModuleViewer';
import { SymbolsExplorer } from './components/SymbolsExplorer';
import { CaseSimulator } from './components/CaseSimulator';
import { ProgressDashboard } from './components/ProgressDashboard';
import { InstructorView } from './components/InstructorView';
import { QuizModal } from './components/QuizModal';
import { GlossaryModal } from './components/GlossaryModal';
import { ProfileModal } from './components/ProfileModal';
import { LandingPage } from './components/LandingPage';
import { InstructorLoginModal } from './components/InstructorLoginModal';
import { VideoModal } from './components/VideoModal';
import { SenaLogo } from './components/SenaLogo';
import { ExternalLink, ShieldCheck, Heart, Award, Accessibility } from 'lucide-react';

const STORAGE_KEY_APPRENTICE = 'sena_induction_apprentice_v1';
const STORAGE_KEY_PROGRESS = 'sena_induction_progress_v1';
const STORAGE_KEY_ACCESSIBILITY = 'sena_accessibility_mode_v1';
const STORAGE_KEY_THEME = 'sena_theme_mode_v1';
const STORAGE_KEY_ROLE = 'sena_current_role_v1';

export default function App() {
  // Navigation role state ('landing' | 'aprendiz' | 'instructor')
  const [currentRole, setCurrentRole] = useState<'landing' | 'aprendiz' | 'instructor'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROLE);
      if (saved === 'landing' || saved === 'aprendiz' || saved === 'instructor') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'landing';
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'modulos' | 'casos' | 'simbolos' | 'progreso' | 'instructor'>('modulos');
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId | null>(null);
  const [activeQuizModule, setActiveQuizModule] = useState<InductionModule | null>(null);


  // Global Dark Mode state with blur transition
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_THEME) === 'dark';
    } catch {
      return false;
    }
  });
  const [isBlurring, setIsBlurring] = useState<boolean>(false);

  // Global Accessibility Mode state (applied directly to <html> root element)
  const [isAccessibilityMode, setIsAccessibilityMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ACCESSIBILITY) === 'true';
    } catch {
      return false;
    }
  });

  // Modals state
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isInstructorLoginOpen, setIsInstructorLoginOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Sync dark class on <html> root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handler for dark mode toggle with cinematic screen blur effect
  const handleToggleDarkMode = () => {
    // 1. Initiate full-screen blur transition
    setIsBlurring(true);

    // 2. Midpoint: switch the theme class on <html> root and state
    window.setTimeout(() => {
      setIsDarkMode((prev) => {
        const next = !prev;
        const root = document.documentElement;
        if (next) {
          root.classList.add('dark');
          try {
            localStorage.setItem(STORAGE_KEY_THEME, 'dark');
          } catch {
            // ignore
          }
        } else {
          root.classList.remove('dark');
          try {
            localStorage.setItem(STORAGE_KEY_THEME, 'light');
          } catch {
            // ignore
          }
        }
        return next;
      });
    }, 180);

    // 3. Smoothly resolve the blur effect
    window.setTimeout(() => {
      setIsBlurring(false);
    }, 450);
  };

  // Apply Accessibility Mode directly to <html> root element
  useEffect(() => {
    const root = document.documentElement;
    if (isAccessibilityMode) {
      root.classList.add('accessibility-mode');
      root.setAttribute('data-accessibility-mode', 'true');
    } else {
      root.classList.remove('accessibility-mode');
      root.setAttribute('data-accessibility-mode', 'false');
    }
    try {
      localStorage.setItem(STORAGE_KEY_ACCESSIBILITY, String(isAccessibilityMode));
    } catch {
      // ignore
    }
  }, [isAccessibilityMode]);

  // Keyboard accessibility shortcut: Alt + A to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAccessibilityMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apprentice Profile state
  const [apprentice, setApprentice] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPRENTICE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_APPRENTICES[0];
  });

  // Apprentice Progress state
  const [progress, setProgress] = useState<ApprenticeProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      completedModules: ['identidad'],
      moduleScores: {
        'identidad': 100
      },
      casesResolved: ['caso-carne'],
      anthemPlayed: false,
      symbolsExplored: ['himno', 'escudo'],
      lastActive: new Date().toISOString()
    };
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPRENTICE, JSON.stringify(apprentice));
    } catch {
      // ignore
    }
  }, [apprentice]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Handlers
  const handleSelectModule = (id: ModuleId) => {
    setSelectedModuleId(id);
    setActiveTab('modulos');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleOpenQuiz = (module: InductionModule) => {
    setActiveQuizModule(module);
  };

  const handleCompleteQuiz = (moduleId: ModuleId, score: number) => {
    setProgress((prev) => {
      const isAlreadyCompleted = prev.completedModules.includes(moduleId);
      const newCompleted = isAlreadyCompleted ? prev.completedModules : [...prev.completedModules, moduleId];
      return {
        ...prev,
        completedModules: newCompleted,
        moduleScores: {
          ...prev.moduleScores,
          [moduleId]: Math.max(score, prev.moduleScores[moduleId] || 0)
        },
        lastActive: new Date().toISOString()
      };
    });
  };

  const handleCaseResolved = (caseId: string) => {
    setProgress((prev) => {
      if (prev.casesResolved.includes(caseId)) return prev;
      return {
        ...prev,
        casesResolved: [...prev.casesResolved, caseId],
        lastActive: new Date().toISOString()
      };
    });
  };

  const handleMarkSymbolExplored = (symbolKey: string) => {
    setProgress((prev) => {
      if (prev.symbolsExplored.includes(symbolKey)) return prev;
      return {
        ...prev,
        symbolsExplored: [...prev.symbolsExplored, symbolKey],
        lastActive: new Date().toISOString()
      };
    });
  };

  const handleResetProgress = () => {
    setProgress({
      completedModules: [],
      moduleScores: {} as any,
      casesResolved: [],
      anthemPlayed: false,
      symbolsExplored: [],
      lastActive: new Date().toISOString()
    });
  };

  const handleCompleteAllProgress = () => {
    setProgress({
      completedModules: ['identidad', 'normativa', 'ruta-formacion', 'ecosistema'],
      moduleScores: {
        'identidad': 100,
        'normativa': 95,
        'ruta-formacion': 100,
        'ecosistema': 92
      },
      casesResolved: ['caso-carne', 'caso-inasistencia', 'caso-plagio', 'caso-seguridad'],
      anthemPlayed: true,
      symbolsExplored: ['himno', 'escudo', 'bandera', 'logosimbolo'],
      lastActive: new Date().toISOString()
    });
  };

  const handleSelectApprenticeRole = (selectedApprentice: ApprenticeProfile) => {
    setApprentice(selectedApprentice);
    setCurrentRole('aprendiz');
    setActiveTab('modulos');
    setSelectedModuleId(null);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, 'aprendiz');
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectInstructorRole = () => {
    setIsInstructorLoginOpen(true);
  };

  const handleSuccessInstructorLogin = () => {
    setCurrentRole('instructor');
    setActiveTab('instructor');
    setSelectedModuleId(null);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, 'instructor');
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentRole('landing');
    setSelectedModuleId(null);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, 'landing');
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeModuleData = INDUCTION_MODULES.find((m) => m.id === selectedModuleId);

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300 theme-transition-container ${
        isBlurring ? 'theme-blur-active' : ''
      }`}
    >
      {/* Cinematic Blur Overlay during theme switch */}
      {isBlurring && (
        <div
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-slate-900/10 dark:bg-black/25 transition-all duration-300 animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* 3-Zone Top Navigation Contract (§2) with Dark Mode toggle in top right corner */}
      <Navbar
        currentRole={currentRole}
        onNavigateHome={handleNavigateHome}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'modulos') setSelectedModuleId(null);
        }}
        apprentice={apprentice}
        progress={progress}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onSwitchProfileModal={() => setIsProfileModalOpen(true)}
        onOpenVideoManual={() => setIsVideoModalOpen(true)}
        isAccessibilityMode={isAccessibilityMode}
        onToggleAccessibility={() => setIsAccessibilityMode((prev) => !prev)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Container with 1440px baseline presence (§1.C) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {currentRole === 'landing' ? (
          <LandingPage
            currentApprentice={apprentice}
            onSelectApprenticeRole={handleSelectApprenticeRole}
            onSelectInstructorRole={handleSelectInstructorRole}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
          />
        ) : (
          <>
            {/* Hero Section */}
            {activeTab === 'modulos' && !selectedModuleId && (
              <HeroBanner
                apprentice={apprentice}
                progress={progress}
                onStartRoute={() => {
                  const nextMod = INDUCTION_MODULES.find((m) => !progress.completedModules.includes(m.id)) || INDUCTION_MODULES[0];
                  setSelectedModuleId(nextMod.id);
                }}
                onExploreCases={() => setActiveTab('casos')}
                onExploreSymbols={() => setActiveTab('simbolos')}
              />
            )}

            {/* Dynamic Views depending on navigation */}
            {activeTab === 'modulos' && (
              <>
                {selectedModuleId && activeModuleData ? (
                  <ModuleViewer
                    module={activeModuleData}
                    progress={progress}
                    onBack={() => setSelectedModuleId(null)}
                    onOpenQuiz={handleOpenQuiz}
                    onNavigateSymbols={() => setActiveTab('simbolos')}
                    onNavigateCases={() => setActiveTab('casos')}
                  />
                ) : (
                  <ModuleRoadmap
                    modules={INDUCTION_MODULES}
                    progress={progress}
                    onSelectModule={handleSelectModule}
                    onOpenQuiz={handleOpenQuiz}
                  />
                )}
              </>
            )}

            {activeTab === 'casos' && (
              <CaseSimulator
                onCaseResolved={handleCaseResolved}
                resolvedCases={progress.casesResolved}
              />
            )}

            {activeTab === 'simbolos' && (
              <SymbolsExplorer
                onMarkSymbolExplored={handleMarkSymbolExplored}
                exploredSymbols={progress.symbolsExplored}
              />
            )}

            {activeTab === 'progreso' && (
              <ProgressDashboard
                apprentice={apprentice}
                progress={progress}
                onSelectModule={handleSelectModule}
                onOpenProfileModal={() => setIsProfileModalOpen(true)}
              />
            )}

            {activeTab === 'instructor' && (
              <InstructorView />
            )}
          </>
        )}
      </main>


      {/* Institutional Footer (No telemetry, no fake version tags) */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
            <div className="flex items-center gap-3">
              <SenaLogo size={36} />
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-800 dark:text-slate-100 block">Servicio Nacional de Aprendizaje SENA</span>
                <span>Dirección General · Calle 57 No. 8 - 69, Bogotá D.C., Colombia</span>
              </div>
            </div>

            {/* Official SENA Platforms links */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 dark:text-slate-300">
              <a
                href="https://oferta.senasofiaplus.edu.co"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#39A900] transition-colors flex items-center gap-1"
              >
                <span>Sofia Plus</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://zajuna.sena.edu.co"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#39A900] transition-colors flex items-center gap-1"
              >
                <span>Zajuna LMS</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://ape.sena.edu.co"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#39A900] transition-colors flex items-center gap-1"
              >
                <span>Agencia Pública de Empleo (APE)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://fondoemprender.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#39A900] transition-colors flex items-center gap-1"
              >
                <span>Fondo Emprender</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
              <span>Plataforma Prototipo de Inducción Institucional · Formación Profesional Integral Gratuita</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Línea Gratuita Nacional: 01 8000 910270</span>
              <span aria-hidden="true">·</span>
              <span>Bogotá: (601) 343 0111</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Quiz Modal */}
      {activeQuizModule && (
        <QuizModal
          moduleId={activeQuizModule.id}
          moduleTitle={activeQuizModule.title}
          badgeName={activeQuizModule.badgeName}
          questions={activeQuizModule.quiz}
          onClose={() => setActiveQuizModule(null)}
          onCompleteQuiz={handleCompleteQuiz}
        />
      )}

      {/* SENA Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Profile Switcher & Data Editor Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentApprentice={apprentice}
        onUpdateApprentice={(updated) => setApprentice(updated)}
        onResetProgress={handleResetProgress}
        onCompleteAllProgress={handleCompleteAllProgress}
      />

      {/* Instructor Login Modal */}
      <InstructorLoginModal
        isOpen={isInstructorLoginOpen}
        onClose={() => setIsInstructorLoginOpen(false)}
        onSuccessLogin={handleSuccessInstructorLogin}
      />

      {/* Video Manual Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/assets/aistudio/2026__17_17_cd2df836.mp4"
      />

      {/* Persistent Floating Quick Accessibility Toggle with Alt+A shortcut */}
      <div className="fixed bottom-4 right-4 z-40 no-print">
        <button
          onClick={() => setIsAccessibilityMode((prev) => !prev)}
          aria-pressed={isAccessibilityMode}
          aria-label={`Modo de Accesibilidad: ${isAccessibilityMode ? 'activado' : 'desactivado'}. Presiona Alt+A para alternar`}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg transition-all border ${
            isAccessibilityMode
              ? 'bg-black text-white border-white ring-2 ring-black'
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
          }`}
          title="Alternar Modo Accesibilidad (Alto contraste, texto aumentado, reducción de movimiento) · Atajo: Alt + A"
        >
          <Accessibility className={`w-4 h-4 ${isAccessibilityMode ? 'text-[#39A900]' : 'text-slate-600'}`} />
          <span>{isAccessibilityMode ? 'Accesibilidad: ON' : 'Accesibilidad'}</span>
          <span className={`text-[10px] font-mono px-1 py-0.5 rounded hidden sm:inline ${
            isAccessibilityMode ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            Alt+A
          </span>
        </button>
      </div>
    </div>
  );
}

