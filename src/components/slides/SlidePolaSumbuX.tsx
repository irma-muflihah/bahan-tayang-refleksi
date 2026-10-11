import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, ChevronRight, ArrowUpDown } from 'lucide-react';
import { CartesianGrid, CartesianPoint } from '../CartesianGrid';
import confetti from 'canvas-confetti';

interface SlidePolaSumbuXProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlidePolaSumbuX: React.FC<SlidePolaSumbuXProps> = ({ onGoToHome, onNext }) => {
  const [ansX, setAnsX] = useState<'tetap' | 'berubah' | null>(null);
  const [ansY, setAnsY] = useState<'tetap' | 'berubah_tanda' | null>(null);
  const [testCoord, setTestCoord] = useState({ x: 3, y: 4 });

  const points: CartesianPoint[] = [
    { id: 'orig', x: testCoord.x, y: testCoord.y, label: `(${testCoord.x}, ${testCoord.y})`, color: '#06b6d4' },
    { id: 'ref', x: testCoord.x, y: -testCoord.y, label: `(${testCoord.x}, ${-testCoord.y})`, color: '#f43f5e', isReflection: true },
  ];

  const handleSelectY = (val: 'tetap' | 'berubah_tanda') => {
    setAnsY(val);
    if (val === 'berubah_tanda' && ansX === 'tetap') {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Penemuan Pola Rumus
          </span>
          <h2 className="text-3xl font-black text-white">Pola Refleksi Sumbu X</h2>
        </div>

        <div className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/40 text-pink-300 text-xs font-bold font-mono">
          🪞 Cermin Mendatar (y = 0)
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-2 items-center">
        {/* Left Interactive Cartesian */}
        <div className="lg:col-span-7">
          <CartesianGrid
            points={points}
            mirrorAxis="x"
            highlightMirror={true}
            showDistanceGuides={true}
            minX={-2}
            maxX={8}
            minY={-6}
            maxY={6}
            height={410}
          />
          {/* Quick Slider / Coordinate changer */}
          <div className="mt-3 flex items-center justify-center gap-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl text-xs font-bold text-slate-300">
            <span>Uji Koordinat Asal:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTestCoord({ x: 2, y: 3 })}
                className={`px-3 py-1 rounded-lg ${testCoord.x === 2 && testCoord.y === 3 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}`}
              >
                (2, 3)
              </button>
              <button
                onClick={() => setTestCoord({ x: 3, y: 4 })}
                className={`px-3 py-1 rounded-lg ${testCoord.x === 3 && testCoord.y === 4 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}`}
              >
                (3, 4)
              </button>
              <button
                onClick={() => setTestCoord({ x: 5, y: 2 })}
                className={`px-3 py-1 rounded-lg ${testCoord.x === 5 && testCoord.y === 2 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}`}
              >
                (5, 2)
              </button>
            </div>
          </div>
        </div>

        {/* Right Observation & Magnifying Glass */}
        <div className="lg:col-span-5 space-y-4">
          {/* Magnifying Glass Hero Box */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center shadow-lg shadow-pink-500/20 shrink-0">
                <Search className="w-7 h-7 text-pink-300" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block">Rumus Penemuan:</span>
                <span className="text-2xl font-black font-mono text-white">
                  (x, y) &rarr; <span className="text-pink-400">(x, -y)</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Perhatikan kolom koordinat pada LKPD kalian. Saat cerminnya adalah <strong>Sumbu X (mendatar)</strong>:
            </p>

            {/* Question 1: Apakah nilai x berubah? */}
            <div className="space-y-2 mb-3">
              <span className="text-xs font-bold text-slate-300 block">
                1. Apakah nilai x berubah?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAnsX('tetap')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    ansX === 'tetap'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  TETAP SAMA (Benar!)
                </button>
                <button
                  onClick={() => setAnsX('berubah')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    ansX === 'berubah' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Berubah
                </button>
              </div>
            </div>

            {/* Question 2: Bagaimana dengan tanda pada nilai y? */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                2. Bagaimana dengan tanda pada nilai y?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectY('berubah_tanda')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    ansY === 'berubah_tanda'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  BERUBAH TANDA / LAWAN
                </button>
                <button
                  onClick={() => handleSelectY('tetap')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    ansY === 'tetap' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Tetap Sama
                </button>
              </div>
            </div>

            {ansX === 'tetap' && ansY === 'berubah_tanda' && (
              <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Kesimpulan:</strong> Titik melompat Atas-Bawah, sehingga nilai <strong>y berubah tanda</strong>, sedangkan <strong>x tetap</strong>!
                </span>
              </div>
            )}
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
          SMP Negeri 2 Kemranjen &bull; Slide 11/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Pola Refleksi Sumbu Y</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
