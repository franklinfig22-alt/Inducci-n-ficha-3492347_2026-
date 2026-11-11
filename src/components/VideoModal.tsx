import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <h3 className="text-sm font-bold text-white font-display">
            Manual de Inducción - Video Tutorial
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-0">
          <video
            controls
            className="w-full aspect-video"
            autoPlay
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta el formato de video.
          </video>
        </div>
      </div>
    </div>
  );
};
