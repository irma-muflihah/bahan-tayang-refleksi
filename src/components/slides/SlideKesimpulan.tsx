import React, { useState } from 'react';
import { Award, Sparkles, ChevronRight, Copy, Check, BookmarkCheck, ArrowRight } from 'lucide-react';

interface SlideKesimpulanProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlideKesimpulan: React.FC<SlideKesimpulanProps> = ({ onGoToHome, onNext }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNotes = () => {
    const text = `✨ Kesimpulan Emas Transformasi Geometri (Refleksi):
1. Sifat Jarak dan Bentuk:
- Jarak objek ke cermin selalu tegak lurus dan sama panjang dengan jarak cermin ke bayangan.
- Ukuran dan bentuk objek tidak berubah (isometri/kongruen).

2. Rumus Koordinat:
- Refleksi Sumbu X: P(x, y) -> P'(x, -y)
- Refleksi Sumbu Y: P(x, y) -> P'(-x, y)

Guru Pengampu: Irma Muflihah, S.Pd. - SMP Negeri 2 Kemranjen`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Konsep Fundamental
            </span>
            <h2 className="text-3xl font-black text-white">
              Kesimpulan Emas Transformasi
            </h2>
          </div>
        </div>

        <button
          onClick={handleCopyNotes}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Ringkasan Catatan'}</span>
        </button>
      </div>

      {/* Main 2 Giant Summary Boxes matching Slide 16 */}
      <div className="my-auto py-4 max-w-4xl mx-auto w-full space-y-6">
        {/* Box 1: Jarak dan Bentuk */}
        <div className="p-7 md:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black uppercase tracking-wider">
              1. Jarak dan Bentuk
            </span>
            <span className="text-xs text-slate-400 font-bold">Sifat Isometri</span>
          </div>

          <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            &ldquo;Jarak objek ke cermin selalu{' '}
            <span className="text-cyan-400 underline decoration-cyan-400 underline-offset-4">
              tegak lurus
            </span>{' '}
            dan{' '}
            <span className="text-cyan-400 underline decoration-cyan-400 underline-offset-4">
              sama panjang
            </span>{' '}
            dengan jarak cermin ke bayangan.{' '}
            <span className="text-emerald-300">
              Ukuran dan bentuk objek tidak berubah
            </span>
            .&rdquo;
          </p>
        </div>

        {/* Box 2: Rumus Koordinat */}
        <div className="p-7 md:p-8 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-black uppercase tracking-wider">
              2. Rumus Koordinat
            </span>
            <span className="text-xs text-slate-400 font-bold">Pola Aljabar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Sumbu X */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-pink-500/40 space-y-2">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wide block">
                Refleksi Sumbu X:
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                P(x, y) &rArr; <span className="text-pink-400">P&apos;(x, -y)</span>
              </div>
              <p className="text-xs text-slate-400">
                Nilai x tetap, nilai y berganti tanda (+ &harr; -)
              </p>
            </div>

            {/* Sumbu Y */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/40 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide block">
                Refleksi Sumbu Y:
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                P(x, y) &rArr; <span className="text-cyan-400">P&apos;(-x, y)</span>
              </div>
              <p className="text-xs text-slate-400">
                Nilai y tetap, nilai x berganti tanda (+ &harr; -)
              </p>
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
          SMP Negeri 2 Kemranjen &bull; Slide 16/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Cek Pemahaman Akhir (Post-Test)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
