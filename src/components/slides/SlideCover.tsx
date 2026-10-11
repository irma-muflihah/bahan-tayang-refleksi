import React, { useState } from 'react';
import { CartesianGrid, CartesianPoint } from '../CartesianGrid';
import { Play, Sparkles, School, UserCheck, Compass } from 'lucide-react';

interface SlideCoverProps {
  onStart: () => void;
  onGoToHome: () => void;
}

export const SlideCover: React.FC<SlideCoverProps> = ({ onStart, onGoToHome }) => {
  const [activeAxis, setActiveAxis] = useState<'y' | 'x'>('y');

  // Interactive initial points from Slide 1
  // A(-3, 4), B(-1, 1), C(-5, 2)
  const originalPoints: CartesianPoint[] = [
    { id: 'A', x: -3, y: 4, label: 'A', color: '#06b6d4' },
    { id: 'B', x: -1, y: 1, label: 'B', color: '#06b6d4' },
    { id: 'C', x: -5, y: 2, label: 'C', color: '#06b6d4' },
  ];

  // Reflected points based on activeAxis
  const reflectedPoints: CartesianPoint[] =
    activeAxis === 'y'
      ? [
          { id: 'A_prime', x: 3, y: 4, label: "A'", color: '#f97316', isReflection: true },
          { id: 'B_prime', x: 1, y: 1, label: "B'", color: '#f97316', isReflection: true },
          { id: 'C_prime', x: 5, y: 2, label: "C'", color: '#f97316', isReflection: true },
        ]
      : [
          { id: 'A_prime', x: -3, y: -4, label: "A'", color: '#f97316', isReflection: true },
          { id: 'B_prime', x: -1, y: -1, label: "B'", color: '#f97316', isReflection: true },
          { id: 'C_prime', x: -5, y: -2, label: "C'", color: '#f97316', isReflection: true },
        ];

  const originalPoly = {
    points: [
      { x: -3, y: 4 },
      { x: -1, y: 1 },
      { x: -5, y: 2 },
    ],
    color: '#06b6d4',
    fillColor: 'rgba(6, 182, 212, 0.25)',
  };

  const reflectedPoly = {
    points: reflectedPoints.map((p) => ({ x: p.x, y: p.y })),
    color: '#f97316',
    fillColor: 'rgba(249, 115, 22, 0.25)',
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Tag & Identity */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <School className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-black text-cyan-400 uppercase tracking-widest">
              SMP Negeri 2 Kemranjen
            </span>
            <span className="mx-2 text-slate-500">&bull;</span>
            <span className="text-sm text-slate-300 font-semibold">
              Modul Ajar Matematika Kelas IX
            </span>
          </div>
        </div>

        {/* Guru Pengampu badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/80 rounded-2xl shadow-sm">
          <UserCheck className="w-5 h-5 text-emerald-400" />
          <div className="text-right">
            <span className="text-[11px] block text-slate-400 uppercase font-semibold">
              Penyusun / Guru Pengampu
            </span>
            <span className="text-sm font-bold text-slate-100">
              Irma Muflihah, S.Pd.
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
        {/* Left Column: Title & Subtitle */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            Media Tayang Interaktif IFP
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Transformasi Geometri:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              Ruang Refleksi
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
            Pembelajaran Interaktif Refleksi Titik & Bangun Datar pada Bidang Koordinat Kartesius.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-lg rounded-2xl shadow-xl shadow-cyan-500/25 flex items-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Mulai Belajar (HOME-1)</span>
            </button>

            <button
              onClick={() => setActiveAxis((prev) => (prev === 'y' ? 'x' : 'y'))}
              className="px-5 py-4 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold text-sm rounded-2xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Compass className="w-5 h-5 text-amber-400" />
              <span>Uji Cermin: {activeAxis === 'y' ? 'Sumbu Y (Tegak)' : 'Sumbu X (Mendatar)'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Cartesian Interactive Preview */}
        <div className="lg:col-span-7">
          <div className="relative group">
            <CartesianGrid
              points={[...originalPoints, ...reflectedPoints]}
              polygons={[originalPoly, reflectedPoly]}
              mirrorAxis={activeAxis}
              highlightMirror={true}
              minX={-7}
              maxX={7}
              minY={-6}
              maxY={6}
              height={440}
            />
            {/* Quick Helper pill */}
            <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Objek Asli
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 ml-2"></span> Bayangan Refleksi
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div>
          Sheet: <span className="font-mono text-cyan-400 font-bold">TITLE SLIDE (1/18)</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <span>Sentuh tombol di layar atau gunakan tombol navigasi bawah IFP</span>
        </div>
      </div>
    </div>
  );
};
