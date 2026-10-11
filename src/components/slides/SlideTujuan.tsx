import React, { useState } from 'react';
import { Target, CheckCircle2, ChevronRight, Award, Compass, ArrowRight } from 'lucide-react';

interface SlideTujuanProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlideTujuan: React.FC<SlideTujuanProps> = ({ onGoToHome, onNext }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    c1: false,
    c2: false,
    c3: false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
              Capaian Pembelajaran (CP)
            </span>
            <h2 className="text-3xl font-black text-white">Tujuan Pembelajaran</h2>
          </div>
        </div>

        <span className="px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-bold">
          Fase D &bull; Matematika Kelas IX
        </span>
      </div>

      {/* Main Focus Statement (Direct quote from Slide 4) */}
      <div className="my-auto py-6 max-w-4xl mx-auto w-full space-y-8">
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400 mt-1">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">
                Fokus Utama Pertemuan Hari Ini
              </span>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
                &ldquo;Murid mampu menentukan{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                  bayangan suatu titik
                </span>{' '}
                atau{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-400">
                  bangun datar
                </span>{' '}
                hasil refleksi terhadap{' '}
                <span className="underline decoration-cyan-400 underline-offset-8">
                  sumbu X
                </span>{' '}
                maupun{' '}
                <span className="underline decoration-pink-400 underline-offset-8">
                  sumbu Y
                </span>
                .&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* 3 Interactive Sub-Goals (Teacher or students can tap to mark ready) */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
            Sentuh kartu di bawah bersama murid untuk menyepakati target belajar:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'c1',
                title: 'Refleksi Titik ke Sumbu X',
                desc: 'Menganalisis koordinat (x, y) menjadi (x, -y)',
                color: 'border-cyan-500/40 text-cyan-300',
              },
              {
                id: 'c2',
                title: 'Refleksi Titik ke Sumbu Y',
                desc: 'Menganalisis koordinat (x, y) menjadi (-x, y)',
                color: 'border-pink-500/40 text-pink-300',
              },
              {
                id: 'c3',
                title: 'Refleksi Bangun Datar',
                desc: 'Mencerminkan titik-titik sudut segitiga & membuktikan bentuknya tetap',
                color: 'border-indigo-500/40 text-indigo-300',
              },
            ].map((target) => (
              <button
                key={target.id}
                onClick={() => toggleCheck(target.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  checkedItems[target.id]
                    ? 'bg-slate-800/90 border-emerald-500 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`mt-0.5 p-1 rounded-lg transition-colors ${
                    checkedItems[target.id]
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{target.title}</h4>
                  <p className="text-xs text-slate-400">{target.desc}</p>
                </div>
              </button>
            ))}
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
          SMP Negeri 2 Kemranjen &bull; Slide 4/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Uraian Kegiatan</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
