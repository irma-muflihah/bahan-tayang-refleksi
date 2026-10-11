import React, { useState } from 'react';
import { Camera, Palette, Box, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface SlideManfaatProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlideManfaat: React.FC<SlideManfaatProps> = ({ onGoToHome, onNext }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      title: 'Kamera & Optik',
      subtitle: 'Teknologi Sehari-hari',
      icon: Camera,
      color: 'from-amber-500 to-orange-500',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description:
        'Memahami cara kerja cermin datar membalikkan bayangan pada sensor dan lensa kamera ponsel kita (selfie vs cermin).',
      interactiveInsight:
        '💡 Saat kita berselfie, kamera ponsel dapat membalikkan orientasi kiri-kanan (refleksi sumbu vertikal) agar tampak seperti saat kita berkaca di cermin rias!',
      demoVisual: (
        <div className="flex items-center justify-center gap-6 p-6 bg-slate-950/60 rounded-2xl border border-slate-800">
          <div className="text-center">
            <div className="w-20 h-28 bg-slate-800 rounded-xl border border-cyan-500 flex flex-col items-center justify-center p-2 text-xs">
              <span className="text-2xl mb-1">🙋‍♂️</span>
              <span className="font-mono text-cyan-300">Tangan Kanan</span>
            </div>
            <span className="text-xs text-slate-400 mt-2 block">Objek Nyata</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-28 w-1 bg-pink-500 relative flex items-center justify-center">
              <span className="absolute -top-3 text-[10px] text-pink-400 whitespace-nowrap font-bold">Cermin</span>
            </div>
            <span className="text-xs text-pink-400 mt-2">Pembalik</span>
          </div>
          <div className="text-center">
            <div className="w-20 h-28 bg-slate-800 rounded-xl border border-orange-500 flex flex-col items-center justify-center p-2 text-xs scale-x-[-1]">
              <span className="text-2xl mb-1">🙋‍♂️</span>
              <span className="font-mono text-orange-300">Tangan Kiri</span>
            </div>
            <span className="text-xs text-slate-400 mt-2 block">Bayangan Cermin</span>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: 'Desain Seni Budaya',
      subtitle: 'Kearifan Lokal Batik',
      icon: Palette,
      color: 'from-teal-500 to-emerald-500',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description:
        'Menciptakan harmoni visual dan simetri lipat yang sempurna pada motif tradisional seperti batik, ukiran kayu, dan arsitektur candi.',
      interactiveInsight:
        '💡 Pengrajin batik cap dan batik tulis tradisional menggunakan prinsip refleksi geometris agar ornamen kanan dan kiri seimbang dan serasi secara estetika.',
      demoVisual: (
        <div className="flex items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800">
          <div className="relative w-64 h-32 flex items-center justify-center border-2 border-dashed border-teal-500/40 rounded-xl overflow-hidden bg-slate-900/50">
            {/* Left side batik leaf motif */}
            <div className="w-1/2 h-full flex items-center justify-center border-r-2 border-pink-500 text-teal-400">
              <span className="text-3xl filter drop-shadow">⚜️</span>
            </div>
            {/* Right side reflected batik leaf motif */}
            <div className="w-1/2 h-full flex items-center justify-center text-teal-300 scale-x-[-1]">
              <span className="text-3xl filter drop-shadow">⚜️</span>
            </div>
            <div className="absolute top-1 text-[10px] font-mono text-pink-400 font-bold bg-slate-950/80 px-2 rounded">
              Garis Simetri Lipat
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Logika Ruang',
      subtitle: 'Teknologi & Game Dev',
      icon: Box,
      color: 'from-cyan-500 to-blue-600',
      tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      description:
        'Melatih imajinasi spasial untuk navigasi posisi dalam pemrograman komputer, animasi 3D/2D, game development, dan rancang bangun arsitektur.',
      interactiveInsight:
        '💡 Dalam game balap atau petualangan, bayangan karakter di atas air atau cermin dihitung secara instan menggunakan matriks rumus transformasi koordinat!',
      demoVisual: (
        <div className="flex items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800">
          <div className="space-y-2 text-center">
            <div className="inline-block px-4 py-2 bg-slate-900 border border-cyan-500/50 rounded-xl font-mono text-cyan-300 text-sm">
              Vector3 Position: (x, y, z) &rarr; (x, -y, z)
            </div>
            <p className="text-xs text-slate-400">
              Transformasi sumbu real-time pada game engine
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2 pb-4 border-b border-slate-800">
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Mengapa Kita Belajar Refleksi?
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Refleksi (pencerminan) bukan hanya materi di atas kertas, melainkan konsep fundamental di dunia sains, seni, dan teknologi modern.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
        {pillars.map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400/80 shadow-2xl shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.color} text-slate-950 shadow-lg`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${item.tagColor}`}>
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Visual interactive preview */}
                <div className="mt-2">{item.demoVisual}</div>

                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-normal">
                  {item.interactiveInsight}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onGoToHome}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span>&larr; Kembali ke HOME-1</span>
        </button>

        <span className="text-xs text-slate-500">
          SMP Negeri 2 Kemranjen &bull; Slide 3/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Tujuan Pembelajaran</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
