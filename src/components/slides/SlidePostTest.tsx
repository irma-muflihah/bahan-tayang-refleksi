import React, { useState } from 'react';
import { Timer, CheckCircle2, XCircle, Sparkles, Trophy, ChevronRight, RotateCcw, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlidePostTestProps {
  onGoToHome: () => void;
  onNext: () => void;
  onOpenResource: (title: string, url: string, type: 'wordwall') => void;
}

export const SlidePostTest: React.FC<SlidePostTestProps> = ({
  onGoToHome,
  onNext,
  onOpenResource,
}) => {
  const [ans1, setAns1] = useState<string | null>(null);
  const [ans2, setAns2] = useState<string | null>(null);

  // Soal 1: P(1, 6) terhadap Sumbu X -> P'(1, -6)
  // Soal 2: Q(3, -2) terhadap Sumbu Y -> Q'(-3, -2)
  const options1 = [
    { label: 'A', value: '(1, -6)', correct: true },
    { label: 'B', value: '(-1, 6)', correct: false },
    { label: 'C', value: '(-1, -6)', correct: false },
    { label: 'D', value: '(6, 1)', correct: false },
  ];

  const options2 = [
    { label: 'A', value: '(3, 2)', correct: false },
    { label: 'B', value: '(-3, -2)', correct: true },
    { label: 'C', value: '(-3, 2)', correct: false },
    { label: 'D', value: '(2, -3)', correct: false },
  ];

  const handleAnswer1 = (val: string) => {
    setAns1(val);
    if (val === '(1, -6)' && ans2 === '(-3, -2)') {
      triggerConfetti();
    }
  };

  const handleAnswer2 = (val: string) => {
    setAns2(val);
    if (val === '(-3, -2)' && ans1 === '(1, -6)') {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const isAllCorrect = ans1 === '(1, -6)' && ans2 === '(-3, -2)';

  const handleReset = () => {
    setAns1(null);
    setAns2(null);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400">
            <Timer className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
              Evaluasi Mandiri & Kelompok
            </span>
            <h2 className="text-3xl font-black text-white">
              Cek Pemahaman Akhir! (Post-Test)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onOpenResource(
                'Kuis Wordwall Interaktif',
                'https://wordwall.net/resource/121072280?wwmethod=link',
                'wordwall'
              )
            }
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Buka di Wordwall</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {(ans1 || ans2) && (
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Reset Kuis"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main 2 Questions */}
      <div className="my-auto py-4 max-w-4xl mx-auto w-full space-y-6">
        {/* Soal 1 */}
        <div className="p-6 md:p-7 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider block">
                Soal Nomor 1
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                Tentukan letak koordinat bayangan titik <span className="text-cyan-400 font-mono">P(1, 6)</span> setelah direfleksikan terhadap <span className="text-pink-400 underline underline-offset-4">sumbu X</span>.
              </h3>
            </div>
            {ans1 && (
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 ${
                  ans1 === '(1, -6)'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                }`}
              >
                {ans1 === '(1, -6)' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {ans1 === '(1, -6)' ? 'Benar!' : 'Kurang Tepat'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            {options1.map((opt) => {
              const isSelected = ans1 === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer1(opt.value)}
                  className={`p-3.5 rounded-2xl font-mono text-base font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? opt.correct
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-lg scale-105'
                        : 'bg-rose-600 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-xs text-slate-400 font-sans block mb-0.5">{opt.label}.</span>
                  {opt.value}
                </button>
              );
            })}
          </div>
        </div>

        {/* Soal 2 */}
        <div className="p-6 md:p-7 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Soal Nomor 2
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                Tentukan letak koordinat bayangan titik <span className="text-cyan-400 font-mono">Q(3, -2)</span> setelah direfleksikan terhadap <span className="text-cyan-400 underline underline-offset-4">sumbu Y</span>.
              </h3>
            </div>
            {ans2 && (
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 ${
                  ans2 === '(-3, -2)'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                }`}
              >
                {ans2 === '(-3, -2)' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {ans2 === '(-3, -2)' ? 'Benar!' : 'Kurang Tepat'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            {options2.map((opt) => {
              const isSelected = ans2 === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer2(opt.value)}
                  className={`p-3.5 rounded-2xl font-mono text-base font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? opt.correct
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-lg scale-105'
                        : 'bg-rose-600 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-xs text-slate-400 font-sans block mb-0.5">{opt.label}.</span>
                  {opt.value}
                </button>
              );
            })}
          </div>
        </div>

        {/* Celebration Banner */}
        {isAllCorrect && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/50 flex items-center justify-between text-emerald-300 animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <Trophy className="w-7 h-7 text-amber-400" />
              <div>
                <span className="font-black text-sm block text-white">Luar Biasa! Skor 100 / 100</span>
                <span className="text-xs text-emerald-300">
                  Semua soal berhasil diselesaikan dengan konsep rumus refleksi yang tepat.
                </span>
              </div>
            </div>
          </div>
        )}
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
          SMP Negeri 2 Kemranjen &bull; Slide 17/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Teaser Pertemuan Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
