import React, { useState } from 'react';
import { CartesianGrid, CartesianPoint } from '../CartesianGrid';
import { Eye, EyeOff, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlideEksplorasiSegitigaProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlideEksplorasiSegitiga: React.FC<SlideEksplorasiSegitigaProps> = ({
  onGoToHome,
  onNext,
}) => {
  const [showReflection, setShowReflection] = useState(false);

  // Original Triangle ABC: A(2, 3), B(5, 3), C(2, 6)
  const originalPoints: CartesianPoint[] = [
    { id: 'A', x: 2, y: 3, label: 'A', color: '#06b6d4' },
    { id: 'B', x: 5, y: 3, label: 'B', color: '#06b6d4' },
    { id: 'C', x: 2, y: 6, label: 'C', color: '#06b6d4' },
  ];

  const originalPoly = {
    points: [
      { x: 2, y: 3 },
      { x: 5, y: 3 },
      { x: 2, y: 6 },
    ],
    color: '#06b6d4',
    fillColor: 'rgba(6, 182, 212, 0.25)',
  };

  // Reflected Triangle A'B'C' across X-axis (y -> -y): A'(2, -3), B'(5, -3), C'(2, -6)
  const reflectedPoints: CartesianPoint[] = [
    { id: "A'", x: 2, y: -3, label: "A'", color: '#f43f5e', isReflection: true },
    { id: "B'", x: 5, y: -3, label: "B'", color: '#f43f5e', isReflection: true },
    { id: "C'", x: 2, y: -6, label: "C'", color: '#f43f5e', isReflection: true },
  ];

  const reflectedPoly = {
    points: [
      { x: 2, y: -3 },
      { x: 5, y: -3 },
      { x: 2, y: -6 },
    ],
    color: '#f43f5e',
    fillColor: 'rgba(244, 63, 94, 0.25)',
  };

  const handleToggle = () => {
    if (!showReflection) {
      confetti({ particleCount: 40, spread: 55, origin: { y: 0.6 } });
    }
    setShowReflection((prev) => !prev);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Eksplorasi Konseptual
          </span>
          <h2 className="text-3xl font-black text-white">
            Refleksi Segitiga ABC terhadap Sumbu X
          </h2>
        </div>

        <button
          onClick={handleToggle}
          className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
            showReflection
              ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/25'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 shadow-cyan-500/25'
          }`}
        >
          {showReflection ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          <span>{showReflection ? 'Sembunyikan Bayangan' : 'Lihat Pantulan Bayangan!'}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-2 items-center">
        {/* Left Instruction Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl space-y-4">
            <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-2xl text-pink-300 text-xs font-bold leading-relaxed">
              🪞 &ldquo;Bayangkan garis tebal Sumbu X ini adalah sebuah cermin datar yang diletakkan mendatar...&rdquo;
            </div>

            <h3 className="text-xl font-black text-white leading-snug">
              Jika segitiga <span className="text-cyan-400">ABC</span> dicerminkan ke cermin tersebut, di mana letak bayangannya?
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-cyan-300">
                <span className="font-sans font-bold">Titik Asal:</span>
                <span className="font-black text-sm">A(2, 3), B(5, 3), C(2, 6)</span>
              </div>

              {showReflection && (
                <div className="p-2.5 bg-rose-950/40 rounded-xl border border-rose-800/80 flex justify-between items-center text-rose-300 animate-fade-in">
                  <span className="font-sans font-bold">Bayangan A&apos;B&apos;C&apos;:</span>
                  <span className="font-black text-sm">A&apos;(2, -3), B&apos;(5, -3), C&apos;(2, -6)</span>
                </div>
              )}
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <p className="font-bold text-cyan-300">💡 Analisis Geometris:</p>
              <p>
                &bull; Jarak titik <strong className="text-cyan-400">A(2, 3)</strong> ke sumbu X = 3 satuan &rarr; bayangannya <strong className="text-rose-400">A&apos;(2, -3)</strong> berjarak 3 satuan ke bawah.
              </p>
              <p>
                &bull; Jarak titik <strong className="text-cyan-400">B(5, 3)</strong> ke sumbu X = 3 satuan &rarr; bayangannya <strong className="text-rose-400">B&apos;(5, -3)</strong> berjarak 3 satuan ke bawah.
              </p>
              <p>
                &bull; Jarak titik <strong className="text-cyan-400">C(2, 6)</strong> ke sumbu X = 6 satuan &rarr; bayangannya <strong className="text-rose-400">C&apos;(2, -6)</strong> berjarak 6 satuan ke bawah.
              </p>
            </div>
          </div>
        </div>

        {/* Right Cartesian Grid */}
        <div className="lg:col-span-7">
          <CartesianGrid
            points={showReflection ? [...originalPoints, ...reflectedPoints] : originalPoints}
            polygons={showReflection ? [originalPoly, reflectedPoly] : [originalPoly]}
            mirrorAxis="x"
            highlightMirror={true}
            showDistanceGuides={showReflection}
            minX={-1}
            maxX={8}
            minY={-7}
            maxY={7}
            height={430}
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
          SMP Negeri 2 Kemranjen &bull; Slide 8/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Misi Investigasi</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
