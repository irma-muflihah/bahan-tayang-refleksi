import React, { useState } from 'react';
import { ArrowUpDown, ArrowLeftRight, Sparkles, ChevronRight, Calculator, Check } from 'lucide-react';

interface SlideSintesisProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlideSintesis: React.FC<SlideSintesisProps> = ({ onGoToHome, onNext }) => {
  const [inputX, setInputX] = useState<number>(5);
  const [inputY, setInputY] = useState<number>(-3);

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1 pb-4 border-b border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
          Rangkuman Pengetahuan Inti
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Sintesis: Matriks Cermin Digital
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Tabel perbandingan visual dan rumus matematis refleksi terhadap Sumbu X dan Sumbu Y
        </p>
      </div>

      {/* Main Matrix Table matching Slide 13 exactly */}
      <div className="my-auto py-4 max-w-4xl mx-auto w-full space-y-6">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-12 border-b border-slate-800 bg-slate-950/80 text-center font-black">
            <div className="col-span-4 p-5 border-r border-slate-800 text-slate-400 text-sm flex items-center justify-center">
              Karakteristik Refleksi
            </div>
            <div className="col-span-4 p-5 border-r border-slate-800 text-pink-400 text-base md:text-lg flex items-center justify-center gap-2">
              <span>Cermin Sumbu X</span>
              <span className="text-xs bg-pink-950 px-2 py-0.5 rounded border border-pink-700/60 font-mono">
                y = 0
              </span>
            </div>
            <div className="col-span-4 p-5 text-cyan-400 text-base md:text-lg flex items-center justify-center gap-2">
              <span>Cermin Sumbu Y</span>
              <span className="text-xs bg-cyan-950 px-2 py-0.5 rounded border border-cyan-700/60 font-mono">
                x = 0
              </span>
            </div>
          </div>

          {/* Row 1: Pergerakan Visual */}
          <div className="grid grid-cols-12 border-b border-slate-800/80 items-center">
            <div className="col-span-4 p-5 md:p-6 border-r border-slate-800 bg-slate-950/40 font-bold text-white text-sm md:text-base">
              Pergerakan Visual
            </div>
            <div className="col-span-4 p-5 md:p-6 border-r border-slate-800 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-pink-300 font-black text-base md:text-lg">
                <span>Melompat Atas / Bawah</span>
                <ArrowUpDown className="w-6 h-6 text-pink-400" />
              </div>
              <span className="text-xs text-slate-400 block">Vertikal</span>
            </div>
            <div className="col-span-4 p-5 md:p-6 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-cyan-300 font-black text-base md:text-lg">
                <span>Melompat Kiri / Kanan</span>
                <ArrowLeftRight className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs text-slate-400 block">Horizontal</span>
            </div>
          </div>

          {/* Row 2: Perubahan Koordinat */}
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-4 p-5 md:p-6 border-r border-slate-800 bg-slate-950/40 font-bold text-white text-sm md:text-base">
              Perubahan Koordinat
            </div>
            <div className="col-span-4 p-5 md:p-6 border-r border-slate-800 text-center space-y-2 bg-pink-950/10">
              <div className="font-mono font-black text-lg md:text-xl text-white">
                (x, y) &rArr; <span className="text-pink-400 underline decoration-pink-500">(x, -y)</span>
              </div>
              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 inline-block">
                [y berubah tanda]
              </div>
            </div>
            <div className="col-span-4 p-5 md:p-6 text-center space-y-2 bg-cyan-950/10">
              <div className="font-mono font-black text-lg md:text-xl text-white">
                (x, y) &rArr; <span className="text-cyan-400 underline decoration-cyan-500">(-x, y)</span>
              </div>
              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 inline-block">
                [x berubah tanda]
              </div>
            </div>
          </div>
        </div>

        {/* Live Simulator Widget on IFP */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-bold">Kalkulator Uji Langsung:</span>
              <span className="text-xs text-slate-300">Coba ubah koordinat titik P(x, y)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-sm">
            <label className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">x:</span>
              <input
                type="number"
                value={inputX}
                onChange={(e) => setInputX(Number(e.target.value) || 0)}
                className="w-12 bg-transparent text-white font-bold outline-none text-center"
              />
            </label>

            <label className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">y:</span>
              <input
                type="number"
                value={inputY}
                onChange={(e) => setInputY(Number(e.target.value) || 0)}
                className="w-12 bg-transparent text-white font-bold outline-none text-center"
              />
            </label>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <div className="px-3 py-1.5 bg-pink-950/60 text-pink-300 border border-pink-700/60 rounded-xl">
              Sumbu X: ({inputX}, {-inputY})
            </div>
            <div className="px-3 py-1.5 bg-cyan-950/60 text-cyan-300 border border-cyan-700/60 rounded-xl">
              Sumbu Y: ({-inputX}, {inputY})
            </div>
          </div>
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
          SMP Negeri 2 Kemranjen &bull; Slide 13/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Uji Nyali Koordinat!</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
