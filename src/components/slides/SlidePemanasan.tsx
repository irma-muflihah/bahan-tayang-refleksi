import React, { useState } from 'react';
import { CartesianGrid, CartesianPoint } from '../CartesianGrid';
import { Check, X, Sparkles, HelpCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlidePemanasanProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlidePemanasan: React.FC<SlidePemanasanProps> = ({ onGoToHome, onNext }) => {
  // Titik A(-5, 2)
  // Titik P(4, -3)
  const [selectedDistanceA, setSelectedDistanceA] = useState<number | null>(null);
  const [selectedDirectionX, setSelectedDirectionX] = useState<'Kanan' | 'Kiri' | null>(null);
  const [selectedDirectionY, setSelectedDirectionY] = useState<'Atas' | 'Bawah' | null>(null);
  const [showDistanceLineA, setShowDistanceLineA] = useState(false);

  const points: CartesianPoint[] = [
    { id: 'A', x: -5, y: 2, label: 'A(-5, 2)', color: '#06b6d4' },
    { id: 'P', x: 4, y: -3, label: 'P(4, -3)', color: '#f97316' },
  ];

  const handleSelectDistanceA = (val: number) => {
    setSelectedDistanceA(val);
    if (val === 2) {
      setShowDistanceLineA(true);
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
    }
  };

  const isQuestion2Correct =
    selectedDirectionX === 'Kanan' && selectedDirectionY === 'Bawah';

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Apersepsi & Kesiapan Awal
          </span>
          <h2 className="text-3xl font-black text-white">
            Pemanasan: Navigasi Kartesius!
          </h2>
        </div>

        {/* Legend notes as in Slide 6 */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-700/80 px-4 py-2 rounded-2xl shadow text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-cyan-400 rounded-full"></span>
            <span className="font-bold text-slate-300">Garis Horizontal = Sumbu X</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="w-1 h-3 bg-cyan-400 rounded-full"></span>
            <span className="font-bold text-slate-300">Garis Vertikal = Sumbu Y</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-center">
        {/* Left Column: Interactive Questions */}
        <div className="lg:col-span-5 space-y-5">
          {/* Box 1: Titik A(-5, 2) */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-black font-mono">
                Titik A(-5, 2)
              </span>
              {selectedDistanceA === 2 && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Tepat: 2 Satuan!
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-white">
              Berapa jarak tegak lurus titik <span className="text-cyan-400 font-bold">A</span> ke <span className="text-pink-400 font-bold">sumbu X</span>?
            </p>

            {/* Answer buttons for touch IFP */}
            <div className="flex items-center gap-3 pt-1">
              {[2, 3, 5].map((dist) => {
                const isSelected = selectedDistanceA === dist;
                const isCorrect = dist === 2;
                return (
                  <button
                    key={dist}
                    onClick={() => handleSelectDistanceA(dist)}
                    className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all cursor-pointer ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                          : 'bg-rose-600 text-white'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {dist} Satuan
                  </button>
                );
              })}
            </div>

            {selectedDistanceA === 2 && (
              <p className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60 leading-relaxed">
                Hebat! Jarak tegak lurus ke sumbu X dilihat dari nilai mutlak koordinat Y, yaitu |2| = 2 satuan.
              </p>
            )}
          </div>

          {/* Box 2: Titik P(4, -3) */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-orange-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/40 rounded-xl text-xs font-black font-mono">
                Titik P(4, -3)
              </span>
              {isQuestion2Correct && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Posisi Benar!
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-white leading-relaxed">
              Posisi ini berarti dari pusat (0,0) bergerak:
            </p>

            {/* Interactive Selector: Kanan / Kiri */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-24">4 Satuan ke:</span>
                <div className="flex gap-2 flex-1">
                  {(['Kanan', 'Kiri'] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setSelectedDirectionX(dir)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedDirectionX === dir
                          ? dir === 'Kanan'
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      [ {dir} ]
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Selector: Atas / Bawah */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-24">3 Satuan ke:</span>
                <div className="flex gap-2 flex-1">
                  {(['Atas', 'Bawah'] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setSelectedDirectionY(dir)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        selectedDirectionY === dir
                          ? dir === 'Bawah'
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      [ {dir} ]
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isQuestion2Correct && (
              <p className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60 leading-relaxed">
                Tepat sekali! Nilai x = +4 bergerak ke <strong>Kanan</strong>, dan nilai y = -3 bergerak ke <strong>Bawah</strong>.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Cartesian Display */}
        <div className="lg:col-span-7">
          <CartesianGrid
            points={points}
            mirrorAxis="none"
            showDistanceGuides={showDistanceLineA}
            minX={-7}
            maxX={7}
            minY={-5}
            maxY={5}
            height={420}
          />
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
          SMP Negeri 2 Kemranjen &bull; Slide 6/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: HOME-2 (Sumber Belajar)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
