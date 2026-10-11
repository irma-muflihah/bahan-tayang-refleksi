import React, { useState } from 'react';
import { CartesianGrid, CartesianPoint } from '../CartesianGrid';
import { CheckCircle2, ChevronRight, Sparkles, Compass } from 'lucide-react';

interface SlidePembuktianVisualProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlidePembuktianVisual: React.FC<SlidePembuktianVisualProps> = ({
  onGoToHome,
  onNext,
}) => {
  const [proofMode, setProofMode] = useState<'both' | 'x' | 'y'>('both');

  // Points:
  // Original: K(-4, -6)
  // Ref X: K'(-4, 6)
  // Ref Y: K"(4, -6)
  const basePoint: CartesianPoint = { id: 'K', x: -4, y: -6, label: 'K(-4, -6)', color: '#06b6d4' };
  const pointX: CartesianPoint = { id: "K'", x: -4, y: 6, label: "K'(-4, 6)", color: '#f43f5e', isReflection: true };
  const pointY: CartesianPoint = { id: 'K"', x: 4, y: -6, label: 'K"(4, -6)', color: '#a855f7', isReflection: true };

  const getPoints = () => {
    if (proofMode === 'x') return [basePoint, pointX];
    if (proofMode === 'y') return [basePoint, pointY];
    return [basePoint, pointX, pointY];
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            Validasi Geometris
          </span>
          <h2 className="text-3xl font-black text-white">Pembuktian Visual</h2>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 p-1 rounded-2xl">
          <button
            onClick={() => setProofMode('both')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              proofMode === 'both' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Keduanya
          </button>
          <button
            onClick={() => setProofMode('x')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              proofMode === 'x' ? 'bg-pink-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sumbu X Saja
          </button>
          <button
            onClick={() => setProofMode('y')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              proofMode === 'y' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sumbu Y Saja
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-2 items-center">
        {/* Left Cartesian Graph */}
        <div className="lg:col-span-7">
          <CartesianGrid
            points={getPoints()}
            mirrorAxis={proofMode === 'x' ? 'x' : proofMode === 'y' ? 'y' : 'x'}
            highlightMirror={true}
            showDistanceGuides={true}
            minX={-8}
            maxX={8}
            minY={-7}
            maxY={7}
            height={430}
          />
        </div>

        {/* Right Proof Callout Boxes matching Slide 15 */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Proof Sumbu X */}
          {(proofMode === 'both' || proofMode === 'x') && (
            <div className="p-5 rounded-3xl bg-slate-900/95 border-2 border-pink-500/60 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-pink-400 font-mono font-black text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>K&apos;(-4, 6) &rarr; Terbukti!</span>
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                Jarak objek <strong className="text-cyan-400 font-mono">K(-4, -6)</strong> ke sumbu X adalah <strong>6 satuan</strong> ke bawah.
              </p>
              <p className="text-sm text-pink-300 font-medium leading-relaxed">
                Jarak cermin ke bayangan <strong className="font-mono">K&apos;(-4, 6)</strong> adalah <strong>6 satuan</strong> ke atas.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-semibold border-t border-slate-800">
                &bull; Jarak sama panjang (6 unit = 6 unit) & tegak lurus sumbu X.
              </div>
            </div>
          )}

          {/* Card 2: Proof Sumbu Y */}
          {(proofMode === 'both' || proofMode === 'y') && (
            <div className="p-5 rounded-3xl bg-slate-900/95 border-2 border-purple-500/60 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-mono font-black text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>K&apos;&apos;(4, -6) &rarr; Terbukti!</span>
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                Pergerakan horizontal melompati cermin vertikal (Sumbu Y) membalikkan nilai absis X dari <strong>-4</strong> menjadi <strong>+4</strong>.
              </p>
              <p className="text-sm text-purple-300 font-medium leading-relaxed">
                Tinggi posisi y tetap tidak berubah pada koordinat <strong>-6</strong>.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-semibold border-t border-slate-800">
                &bull; Jarak ke cermin Y sama panjang (4 unit) di kiri & kanan.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onGoToHome}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-colors cursor-pointer"
        >
          &larr; HOME-1
        </button>

        <span className="text-xs text-slate-500">
          SMP Negeri 2 Kemranjen &bull; Slide 15/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Kesimpulan Emas</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
