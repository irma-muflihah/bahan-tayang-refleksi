import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Layers, 
  PenTool, 
  Maximize, 
  Minimize, 
  Users, 
  X,
  Compass,
  FileQuestion,
  Video
} from 'lucide-react';
import { SlideInfo } from '../types';

interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  slidesMeta: SlideInfo[];
  onPrev: () => void;
  onNext: () => void;
  onJumpToSlide: (slideNumber: number) => void;
  onToggleWhiteboard: () => void;
  isWhiteboardActive: boolean;
  onOpenGroupModal: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  totalSlides,
  slidesMeta,
  onPrev,
  onNext,
  onJumpToSlide,
  onToggleWhiteboard,
  isWhiteboardActive,
  onOpenGroupModal,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const currentSlideInfo = slidesMeta.find((s) => s.id === currentSlide);

  return (
    <>
      {/* Bottom Floating IFP Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md px-3 md:px-6 py-2.5 flex items-center justify-between shadow-2xl">
        {/* Left Side: Direct Home Shortcuts */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* HOME-1 shortcut */}
          <button
            onClick={() => onJumpToSlide(2)}
            className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              currentSlide === 2
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title="Ke Menu HOME-1"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">HOME-1</span>
          </button>

          {/* HOME-2 shortcut */}
          <button
            onClick={() => onJumpToSlide(7)}
            className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              currentSlide === 7
                ? 'bg-cyan-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title="Ke Pusat Sumber Belajar HOME-2"
          >
            <Video className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">HOME-2</span>
          </button>

          {/* Slide List Drawer Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Daftar Semua Slide"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Daftar Slide</span>
          </button>
        </div>

        {/* Center: Slide Navigator (Previous, Indicator, Next) */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onPrev}
            disabled={currentSlide === 1}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              currentSlide === 1
                ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-md'
            }`}
            title="Slide Sebelumnya (Panah Kiri)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slide Number Indicator Badge */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-center hover:border-cyan-500 transition-colors cursor-pointer min-w-[120px] md:min-w-[160px]"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-black font-mono text-cyan-400">
                {currentSlide}
              </span>
              <span className="text-xs text-slate-500">/</span>
              <span className="text-xs font-mono text-slate-400">
                {totalSlides}
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-200 truncate max-w-[150px] md:max-w-[200px]">
              {currentSlideInfo?.title || `Slide ${currentSlide}`}
            </div>
          </button>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              currentSlide === totalSlides
                ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-black border border-cyan-400/50 shadow-lg shadow-cyan-500/20'
            }`}
            title="Slide Berikutnya (Panah Kanan / Space)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side: IFP Interactive Tools (Whiteboard, Group Randomizer, Fullscreen) */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Spidol IFP */}
          <button
            onClick={onToggleWhiteboard}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isWhiteboardActive
                ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30'
                : 'bg-slate-900 border border-slate-800 text-amber-300 hover:bg-slate-800'
            }`}
            title="Aktifkan Spidol Layar Sentuh IFP"
          >
            <PenTool className="w-4 h-4" />
            <span className="hidden lg:inline">{isWhiteboardActive ? 'Spidol Aktif' : 'Spidol IFP'}</span>
          </button>

          {/* 8 Official Groups tool */}
          <button
            onClick={onOpenGroupModal}
            className="p-2 md:px-3 md:py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Buka Daftar 8 Kelompok Resmi"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="hidden xl:inline">8 Kelompok</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 md:px-3 md:py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Mode Layar Penuh IFP"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </footer>

      {/* Slide Drawer Modal (Quick Jump to Any Slide 1-18) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Daftar Lengkap Slide</h3>
                  <p className="text-xs text-slate-400">
                    Pilih slide untuk melompat langsung di layar sentuh IFP
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slidesMeta.map((s) => {
                const isCurrent = s.id === currentSlide;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      onJumpToSlide(s.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                      isCurrent
                        ? 'bg-cyan-950/90 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-cyan-400">
                        #{s.id}
                      </span>
                      {s.id === 2 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-900 text-blue-200">
                          HOME-1
                        </span>
                      )}
                      {s.id === 7 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-900 text-cyan-200">
                          HOME-2
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-200 line-clamp-2 mt-2">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
