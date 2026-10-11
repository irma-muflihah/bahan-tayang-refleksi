import React, { useState } from 'react';
import { Maximize2, Ruler, Binary, Check, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

interface SlideMisiProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlideMisi: React.FC<SlideMisiProps> = ({ onGoToHome, onNext }) => {
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });

  const toggleReveal = (idx: number) => {
    setRevealed((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const missions = [
    {
      id: 0,
      title: 'Bentuk & Ukuran',
      subtitle: 'Sifat Kekongruenan',
      icon: Maximize2,
      color: 'from-cyan-500 to-blue-600',
      question: 'Apakah ukuran dan bentuk bayangan segitiga berubah setelah dicerminkan?',
      answer:
        'TIDAK BERUBAH! Bentuk dan ukurannya tetap persis sama (Kongruen / Isometri), hanya orientasi arahnya yang terbalik.',
    },
    {
      id: 1,
      title: 'Jarak',
      subtitle: 'Ketegaklurusan Cermin',
      icon: Ruler,
      color: 'from-teal-500 to-emerald-600',
      question:
        'Bagaimana hubungan jarak titik asli ke sumbu cermin dengan jarak bayangan ke sumbu cermin?',
      answer:
        'SAMA PANJANG! Jarak titik ke cermin sama dengan jarak cermin ke bayangan, dan garis hubungnya selalu TEGAK LURUS terhadap sumbu cermin.',
    },
    {
      id: 2,
      title: 'Koordinat',
      subtitle: 'Aturan Angka & Tanda',
      icon: Binary,
      color: 'from-purple-500 to-pink-600',
      question:
        'Apakah angka koordinat (x,y) berubah nilainya, atau hanya tanda (+ / -) nya saja?',
      answer:
        'NILAI ANGKA TETAP SAMA! Yang berubah hanyalah tanda (+/-) pada salah satu sumbu yang melompati garis cermin.',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
          Fokus Penyelidikan Kelompok
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Misi Investigasi Kita Hari Ini
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Sentuh kartu misi di bawah untuk berdiskusi bersama teman sekelompok dan membuka jawaban investigasi!
        </p>
      </div>

      {/* 3 Investigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
        {missions.map((m) => {
          const Icon = m.icon;
          const isOpened = revealed[m.id];
          return (
            <div
              key={m.id}
              onClick={() => toggleReveal(m.id)}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none min-h-[300px] ${
                isOpened
                  ? 'bg-slate-900 border-cyan-500/70 shadow-2xl shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3.5 rounded-2xl bg-gradient-to-br ${m.color} text-slate-950 shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Misi 0{m.id + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2">{m.title}</h3>
                <p className="text-base text-slate-200 font-medium leading-relaxed mb-4">
                  {m.question}
                </p>
              </div>

              <div>
                {isOpened ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm font-semibold leading-relaxed animate-fade-in">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                      <Sparkles className="w-4 h-4" /> Temuan Investigasi:
                    </div>
                    {m.answer}
                  </div>
                ) : (
                  <div className="py-3 px-4 rounded-2xl bg-slate-800 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-slate-700">
                    <HelpCircle className="w-4 h-4" />
                    <span>Sentuh untuk Membuka Hasil Diskusi</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
          SMP Negeri 2 Kemranjen &bull; Slide 9/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Mengumpulkan Data</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
