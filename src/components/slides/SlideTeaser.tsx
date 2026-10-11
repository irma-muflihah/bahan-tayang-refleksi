import React, { useState } from 'react';
import { HelpCircle, Sparkles, RotateCcw, Home, Compass, UserCheck, ArrowRight } from 'lucide-react';
import { CartesianGrid, CartesianPoint } from '../CartesianGrid';
import confetti from 'canvas-confetti';

interface SlideTeaserProps {
  onGoToCover: () => void;
  onGoToHome: () => void;
}

export const SlideTeaser: React.FC<SlideTeaserProps> = ({ onGoToCover, onGoToHome }) => {
  const [showDiagonalDemo, setShowDiagonalDemo] = useState(false);

  // Demo diagonal reflection across line y = x
  // P(2, 5) -> P'(5, 2)
  const diagonalPoints: CartesianPoint[] = [
    { id: 'P', x: 2, y: 5, label: 'P(2, 5)', color: '#06b6d4' },
    { id: "P'", x: 5, y: 2, label: "P'(5, 2)", color: '#ec4899', isReflection: true },
  ];

  const handleToggleDemo = () => {
    if (!showDiagonalDemo) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }
    setShowDiagonalDemo((prev) => !prev);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1 pb-4 border-b border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
          Tantangan Dimensi Baru
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Teaser Pertemuan Berikutnya...
        </h2>
      </div>

      {/* Main Hero Grid */}
      <div className="my-auto py-3 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Teaser Statement */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="p-8 rounded-3xl bg-slate-900/90 border-2 border-purple-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-2 right-4 text-7xl font-black text-purple-500/10 select-none">
              ?
            </div>

            <p className="text-base text-slate-300 font-semibold mb-3">
              Kita sudah menaklukkan cermin <strong>mendatar (sumbu X)</strong> dan cermin <strong>tegak (sumbu Y)</strong>.
            </p>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Bagaimana jika cerminnya{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 underline decoration-purple-400 decoration-wavy">
                MIRING pada garis y = x
              </span>
              ?
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 pt-3 leading-relaxed">
              &ldquo;Bersiap untuk tantangan dimensi baru di pertemuan selanjutnya! Apakah posisi x dan y akan saling bertukar tempat?&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleToggleDemo}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{showDiagonalDemo ? 'Tutup Bocoran' : 'Buka Bocoran Refleksi Diagonal!'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Grid / Diagonal Cartesian preview */}
        <div className="lg:col-span-6">
          <div className="relative">
            {showDiagonalDemo ? (
              <div className="space-y-2">
                <CartesianGrid
                  points={diagonalPoints}
                  mirrorAxis="y=x"
                  highlightMirror={true}
                  minX={-1}
                  maxX={7}
                  minY={-1}
                  maxY={7}
                  height={360}
                />
                <div className="p-3 bg-purple-950/50 border border-purple-500/40 rounded-xl text-xs text-purple-200 text-center font-mono">
                  ✨ Rahasia: Garis y = x menukar nilai (x, y) menjadi (y, x)!
                </div>
              </div>
            ) : (
              <div className="h-80 bg-slate-900/60 rounded-3xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-4xl mb-3 shadow-lg">
                  📐
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  Misteri Garis Diagonal y = x
                </h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Sentuh tombol &ldquo;Buka Bocoran&rdquo; untuk melihat sekilas proyeksi garis miring 45°.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Nav & Signature */}
      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onGoToHome}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>HOME-1</span>
          </button>
          <button
            onClick={onGoToCover}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Kembali ke Judul (Slide 1)</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Penyusun / Guru Pengampu:{' '}
            <strong className="text-white">Irma Muflihah, S.Pd.</strong> &bull; SMP Negeri 2 Kemranjen
          </span>
        </div>
      </div>
    </div>
  );
};
