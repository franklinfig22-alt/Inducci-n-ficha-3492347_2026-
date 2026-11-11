import React, { useState, useEffect } from 'react';
import { SENA_SYMBOLS_DETAILS } from '../data/inductionData';
import { anthemAudioSynth, playVocalAnthem, stopVocalAnthem } from '../utils/audioSynth';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo, SENA_ESCUDO_URL } from './SenaEscudo';
import { Play, Pause, RotateCcw, Volume2, Shield, Flag, Award, Music, CheckCircle2, Info, Video, Mic, FileText, ExternalLink } from 'lucide-react';

interface SymbolsExplorerProps {
  onMarkSymbolExplored?: (symbolKey: string) => void;
  exploredSymbols?: string[];
}

export const SymbolsExplorer: React.FC<SymbolsExplorerProps> = ({
  onMarkSymbolExplored,
  exploredSymbols = []
}) => {
  const [activeTab, setActiveTab] = useState<'escudo' | 'bandera' | 'logosimbolo' | 'himno'>('himno');
  const [himnoFormat, setHimnoFormat] = useState<'audio' | 'video' | 'letra'>('audio');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>('https://www.youtube-nocookie.com/embed/6Db009yNvpc');
  const [activeHotspot, setActiveHotspot] = useState<string>('pinon');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState<boolean>(false);
  const [withVocals, setWithVocals] = useState<boolean>(true);
  const [isVocalReciting, setIsVocalReciting] = useState<boolean>(false);
  const [activeStanzaIndex, setActiveStanzaIndex] = useState<number>(0);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);

  useEffect(() => {
    return () => {
      anthemAudioSynth.stop();
      stopVocalAnthem();
    };
  }, []);

  const handleToggleAnthem = () => {
    if (isPlayingAnthem) {
      anthemAudioSynth.stop();
      stopVocalAnthem();
      setIsPlayingAnthem(false);
    } else {
      setIsPlayingAnthem(true);
      anthemAudioSynth.play(
        (noteIdx) => {
          setActiveNoteIndex(noteIdx);
          // Highlight coro stanza when playing
          setActiveStanzaIndex(0);
        },
        () => {
          setIsPlayingAnthem(false);
          if (onMarkSymbolExplored) onMarkSymbolExplored('himno');
        },
        withVocals
      );
    }
  };

  const handleStopAnthem = () => {
    anthemAudioSynth.stop();
    stopVocalAnthem();
    setIsPlayingAnthem(false);
    setIsVocalReciting(false);
    setActiveNoteIndex(0);
  };

  const handleReciteCoro = () => {
    if (isVocalReciting) {
      stopVocalAnthem();
      setIsVocalReciting(false);
    } else {
      setIsVocalReciting(true);
      setActiveStanzaIndex(0);
      playVocalAnthem(
        '¡Aprendices del SENA adelante! Por Colombia luchad con amor. Con el ánimo noble y radiante, transformemos el mundo en mejor.',
        () => {
          setIsVocalReciting(false);
        }
      );
    }
  };

  const selectTab = (tab: 'escudo' | 'bandera' | 'logosimbolo' | 'himno') => {
    setActiveTab(tab);
    if (onMarkSymbolExplored) {
      onMarkSymbolExplored(tab);
    }
  };

  const selectedHotspotData = SENA_SYMBOLS_DETAILS.escudo.hotspots.find(
    (h) => h.id === activeHotspot
  ) || SENA_SYMBOLS_DETAILS.escudo.hotspots[0];

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          <span>Identidad Institucional</span>
          <span aria-hidden="true">·</span>
          <span>Símbolos Patrios del SENA</span>
          <span aria-hidden="true">·</span>
          <span>Acuerdo y Tradición</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
          Símbolos de la Identidad SENA
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl">
          Conoce en detalle el significado heráldico y patriótico del Escudo, la Bandera, el Logosímbolo y el Himno oficial que unen a más de 8 millones de colombianos formados por el SENA.
        </p>
      </div>

      {/* Segmented Symbol Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-2xl">
        <button
          onClick={() => selectTab('himno')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'himno'
              ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-[#39A900] shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Music className="w-3.5 h-3.5 text-[#39A900]" />
          <span>Himno Oficial</span>
          {exploredSymbols.includes('himno') && (
            <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
          )}
        </button>

        <button
          onClick={() => selectTab('escudo')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'escudo'
              ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-[#39A900] shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-[#39A900]" />
          <span>Escudo del SENA</span>
          {exploredSymbols.includes('escudo') && (
            <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
          )}
        </button>

        <button
          onClick={() => selectTab('bandera')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'bandera'
              ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-[#39A900] shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Flag className="w-3.5 h-3.5 text-[#39A900]" />
          <span>La Bandera</span>
          {exploredSymbols.includes('bandera') && (
            <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
          )}
        </button>

        <button
          onClick={() => selectTab('logosimbolo')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'logosimbolo'
              ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-[#39A900] shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-[#39A900]" />
          <span>Logosímbolo</span>
          {exploredSymbols.includes('logosimbolo') && (
            <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
          )}
        </button>
      </div>

      {/* TAB 1: HIMNO DEL SENA - AUDIO, VÍDEO Y LETRA (APRENDICES DEL SENA ADELANTE) */}
      {activeTab === 'himno' && (
        <div className="space-y-6">
          {/* Multimedia Mode Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                  Himno Institucional del SENA
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] border border-emerald-200 dark:border-emerald-800">
                  Letra Adaptada: "Aprendices"
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Disponible en tres formatos interactivos: <strong>Audio marcial y vocal</strong>, <strong>Vídeo oficial con subtítulos</strong> y <strong>Letra formativa</strong>.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
              <button
                onClick={() => setHimnoFormat('audio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  himnoFormat === 'audio'
                    ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-[#39A900] shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Music className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Audio</span>
              </button>

              <button
                onClick={() => setHimnoFormat('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  himnoFormat === 'video'
                    ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-[#39A900] shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Vídeo</span>
              </button>

              <button
                onClick={() => setHimnoFormat('letra')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  himnoFormat === 'letra'
                    ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-[#39A900] shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Letra</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: VÍDEO OFICIAL DEL HIMNO */}
          {himnoFormat === 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Video Player */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#39A900]" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Vídeo Institucional Oficial del SENA
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Canal Oficial SENA</span>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
                  <iframe
                    src={selectedVideoUrl}
                    title="Vídeo Oficial Himno del SENA"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video variant selector buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVideoUrl('https://www.youtube-nocookie.com/embed/6Db009yNvpc')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        selectedVideoUrl.includes('6Db009yNvpc')
                          ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      Versión Ecosistema Digital
                    </button>
                    <button
                      onClick={() => setSelectedVideoUrl('https://www.youtube-nocookie.com/embed/gB_P1zb2_ds')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        selectedVideoUrl.includes('gB_P1zb2_ds')
                          ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      Versión con Lengua de Señas (LSC)
                    </button>
                  </div>

                  <a
                    href="https://www.youtube.com/@SENAComunica"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-[#39A900] hover:underline font-semibold"
                  >
                    <span>Canal @SENAComunica</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Video Lyrics Prompter card */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#39A900] uppercase tracking-wide">
                    Subtítulos del Coro
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mt-0.5">
                    Aprendices del SENA
                  </h3>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <p className="text-base font-bold text-[#39A900] font-display">
                    «¡Aprendices del SENA adelante,»
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    «por Colombia luchad con amor,»
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    «con el ánimo noble y radiante»
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    «transformemos el mundo en mejor!»
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                  <strong>Identidad institucional:</strong> La sustitución de <em>"estudiantes"</em> por <em>"aprendices"</em> honra la filosofía pedagógica del SENA, donde cada participante no es un receptor pasivo, sino un <strong>aprendiz activo</strong> que adquiere competencias para la vida y el trabajo.
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2 & 3: AUDIO Y LETRA */}
          {himnoFormat !== 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Audio Console & Player Deck */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-[#39A900] uppercase">
                    Consola de Audio Oficial
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Marcha & Canto</span>
                </div>

                <div className="p-5 bg-slate-900 dark:bg-slate-950 rounded-xl text-white space-y-4 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold font-display">Himno Institucional SENA</h3>
                      <p className="text-xs text-slate-400">Marcial y solemne · 133 BPM</p>
                    </div>
                    <div className={`p-2.5 rounded-full ${isPlayingAnthem || isVocalReciting ? 'bg-[#39A900]/20 text-[#39A900]' : 'bg-slate-800 text-slate-400'}`}>
                      <Music className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Visual equalizer bars when playing */}
                  <div className="flex items-end justify-between h-8 gap-1 px-1">
                    {[12, 28, 16, 24, 8, 20, 32, 14, 22, 18, 30, 26, 15, 27].map((height, i) => (
                      <div
                        key={i}
                        className={`w-full rounded-t transition-all duration-150 ${
                          isPlayingAnthem || isVocalReciting
                            ? 'bg-[#39A900]'
                            : 'bg-slate-700'
                        }`}
                        style={{
                          height: (isPlayingAnthem || isVocalReciting) ? `${(height * ((i + activeNoteIndex) % 5 + 1)) / 4}px` : '4px'
                        }}
                      />
                    ))}
                  </div>

                  {/* Vocal Toggle Switch */}
                  <div className="pt-1 flex items-center justify-between text-xs border-t border-slate-800">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-[#39A900]" />
                      <span>Canto con voz "Aprendices"</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setWithVocals(!withVocals)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        withVocals ? 'bg-[#39A900]' : 'bg-slate-700'
                      }`}
                      role="switch"
                      aria-checked={withVocals}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          withVocals ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between pt-2 gap-2">
                    <button
                      onClick={handleToggleAnthem}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-xs transition-all shadow-sm ${
                        isPlayingAnthem
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                          : 'bg-[#39A900] hover:bg-[#329600] text-white'
                      }`}
                    >
                      {isPlayingAnthem ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>Pausar Marcha</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>{withVocals ? 'Cantar Himno' : 'Escuchar Marcha'}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleReciteCoro}
                      className={`px-3 py-2.5 rounded-lg font-semibold text-xs transition-all border ${
                        isVocalReciting
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                      }`}
                      title="Escuchar locución del Coro con Aprendices"
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleStopAnthem}
                      disabled={!isPlayingAnthem && !isVocalReciting}
                      className="p-2 text-slate-400 hover:text-white disabled:opacity-40 transition-colors"
                      title="Reiniciar reproducción"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Author details */}
                <div className="space-y-3 text-xs border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Letra Oficial:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{SENA_SYMBOLS_DETAILS.himno.authorLyrics}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Música:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{SENA_SYMBOLS_DETAILS.himno.authorMusic}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 dark:text-slate-400">Protocolo:</span>
                    <span className="font-semibold text-[#00324D] dark:text-[#39A900]">Posición firme, mano al corazón</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs flex gap-2.5">
                  <Info className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <p>
                    El Himno del SENA se entona solemnemente en ceremonias de ingreso, izadas de bandera y actos de graduación.
                  </p>
                </div>
              </div>

              {/* Interactive Stanza Viewer (LETRA) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      Estrofas y Significado Pedagógico
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Selecciona una estrofa para leer y reflexionar
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Letra Oficial Aprendices
                  </span>
                </div>

                {/* Stanza selector */}
                <div className="grid grid-cols-4 gap-2">
                  {SENA_SYMBOLS_DETAILS.himno.stanzas.map((stanza, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStanzaIndex(idx)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg text-center transition-all ${
                        activeStanzaIndex === idx
                          ? 'bg-[#00324D] dark:bg-[#39A900] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {stanza.type}
                    </button>
                  ))}
                </div>

                {/* Current Stanza Box with Karaoke typography */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-[#39A900] uppercase">
                      {SENA_SYMBOLS_DETAILS.himno.stanzas[activeStanzaIndex].type}
                    </span>
                    {(isPlayingAnthem || isVocalReciting) && activeStanzaIndex === 0 && (
                      <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        Sincronizado con melodía y canto
                      </span>
                    )}
                  </div>

                  {/* Verses */}
                  <div className="space-y-2 py-2">
                    {SENA_SYMBOLS_DETAILS.himno.stanzas[activeStanzaIndex].verses.map((verse, vIdx) => {
                      const isAprendicesVerse = verse.toLowerCase().includes('aprendices');

                      return (
                        <p
                          key={vIdx}
                          className={`text-lg sm:text-xl font-medium tracking-tight font-display transition-colors duration-200 ${
                            (isPlayingAnthem || isVocalReciting) && activeStanzaIndex === 0
                              ? 'text-[#00324D] dark:text-[#39A900]'
                              : 'text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {isAprendicesVerse ? (
                            <>
                              «<strong className="text-[#39A900] font-extrabold underline decoration-[#39A900]/40 underline-offset-4">Aprendices</strong> del SENA adelante»
                            </>
                          ) : (
                            `«${verse}»`
                          )}
                        </p>
                      );
                    })}
                  </div>

                  {/* Reflection */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-1">
                      Reflexión Formativa
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {SENA_SYMBOLS_DETAILS.himno.stanzas[activeStanzaIndex].reflection}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ESCUDO DEL SENA WITH INTERACTIVE HOTSPOTS */}
      {activeTab === 'escudo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Shield Graphic */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs flex flex-col items-center text-center">
            <span className="text-xs font-semibold tracking-wide text-[#39A900] uppercase mb-4">
              Escudo Oficial del SENA
            </span>

            {/* Official Escudo Image */}
            <div className="relative my-2 p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center max-w-sm w-full">
              <img
                src={SENA_ESCUDO_URL}
                alt="Escudo Oficial de la República de Colombia - SENA"
                className="w-52 h-52 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                loading="eager"
              />
              <div className="mt-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
                Símbolo Heráldico Institucional
              </div>
            </div>

            {/* Interactive component selector tags */}
            <div className="w-full max-w-sm mt-3 grid grid-cols-3 gap-2">
              {/* Caduceo */}
              <button
                onClick={() => setActiveHotspot('caduceo')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  activeHotspot === 'caduceo'
                    ? 'ring-2 ring-[#39A900] border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className="text-xs font-semibold">Caduceo</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400">Comercio</div>
              </button>

              {/* Piñón */}
              <button
                onClick={() => setActiveHotspot('pinon')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  activeHotspot === 'pinon'
                    ? 'ring-2 ring-[#39A900] border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className="text-xs font-semibold">Piñón</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400">Industria</div>
              </button>

              {/* Trigo y Café */}
              <button
                onClick={() => setActiveHotspot('trigo-cafe')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  activeHotspot === 'trigo-cafe'
                    ? 'ring-2 ring-[#39A900] border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 text-slate-900 dark:text-white font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className="text-xs font-semibold">Cafeto</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Agro</div>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              Selecciona un componente del escudo para explorar su significado en los 3 sectores de la economía nacional.
            </p>
          </div>

          {/* Hotspot details panel */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
                Componente Seleccionado
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-1">
                {selectedHotspotData.label}
              </h3>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {selectedHotspotData.sector}
              </span>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">
                Significado en la Formación Integral:
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedHotspotData.meaning}
              </p>
            </div>

            {/* 3 sectors comparison */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Los 3 Sectores Productivos Fundamentales
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SENA_SYMBOLS_DETAILS.escudo.hotspots.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveHotspot(item.id)}
                    className={`p-3 rounded-lg text-left text-xs transition-all border ${
                      activeHotspot === item.id
                        ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-slate-100">{item.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.sector.split(' ')[1]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LA BANDERA */}
      {activeTab === 'bandera' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs flex flex-col items-center">
            {/* Flag Visualization */}
            <div className="w-full max-w-md h-56 bg-white rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-md relative flex items-center justify-center overflow-hidden">
              {/* Subtle fabric fold texture */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-100/40 via-white/80 to-slate-200/40 pointer-events-none" />
              
              <div className="flex flex-col items-center text-center z-10 p-4">
                <SenaEscudo size={72} className="drop-shadow-sm hover:scale-105 transition-transform" />
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2 tracking-widest uppercase">
                  Pabellón Central con Escudo Oficial
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              Bandera blanca con escudo central · Proporción 2:3
            </p>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
                Protocolo Institucional
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-1">
                La Bandera del SENA
              </h3>
            </div>

            <div className="space-y-3">
              {SENA_SYMBOLS_DETAILS.bandera.details.map((detail, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {detail}
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-300 leading-relaxed">
              <strong>Sabías que:</strong> En todo acto oficial, la bandera del SENA se ubica a la derecha de la Bandera de la República de Colombia, reflejando el orden jerárquico patrio establecido por el protocolo nacional.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LOGOSÍMBOLO SENA */}
      {activeTab === 'logosimbolo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs flex flex-col items-center">
            {/* Logosymbol Art with Anatomy Highlights */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
              <SenaLogo size={120} variant="symbol" />
              <div className="mt-6 text-center">
                <div className="text-sm font-bold text-slate-900 dark:text-white font-display">El Aprendiz en Marcha</div>
                <div className="text-xs text-[#39A900] font-semibold mt-0.5">Color Institucional #39A900</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wide">
                Anatomía y Filosofía Visual
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-1">
                El Logosímbolo del SENA
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {SENA_SYMBOLS_DETAILS.logosimbolo.description}
              </p>
            </div>

            <div className="space-y-3">
              {SENA_SYMBOLS_DETAILS.logosimbolo.details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-[#39A900]/10 text-[#39A900] font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </div>
                  <p className="leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
