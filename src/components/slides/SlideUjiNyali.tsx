import React, { useState } from 'react';
import { Lock, Unlock, Sparkles, ChevronRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlideUjiNyaliProps {
  onGoToHome: () => void;
  onNext: () => void;
}

export const SlideUjiNyali: React.FC<SlideUjiNyaliProps> = ({ onGoToHome, onNext }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [guessX, setGuessX] = useState<string | null>(null);
  const [guessY, setGuessY] = useState<string | null>(null);

  const handleUnlock = () => {
    setUnlocked(true);
    setGuessX('(-4, 6)');
    setGuessY('(4, -6)');
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1 pb-4 border-b border-slate-800">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
          Tantangan Kecepatan Berpikir
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Uji Nyali Koordinat! (Tanpa Menggambar)
        </h2>
      </div>

      {/* Main Center Challenge */}
      <div className="my-auto py-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Giant Point Badge */}
        <div className="text-center space-y-3">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Titik Target Tantangan:
          </span>
          <div className="inline-block px-10 py-5 rounded-3xl bg-slate-900 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
            <span className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400">
              K (-4, -6)
            </span>
          </div>
        </div>

        {/* 2 Column Guesses with Padlock Center */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Left: Tebak Sumbu X */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-pink-500/40 shadow-xl space-y-3 text-center">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">
              Tantangan 1 (Cermin Sumbu X)
            </span>
            <p className="text-base font-bold text-white">
              Tebak letak bayangan <span className="text-pink-400 font-mono">K&apos;</span> jika dicerminkan terhadap sumbu X!
            </p>

            {unlocked ? (
              <div className="py-3 px-4 bg-pink-950/60 border border-pink-500/50 rounded-2xl animate-fade-in">
                <span className="text-xs text-slate-300 block mb-1">Jawaban Terbuka:</span>
                <span className="text-3xl font-black font-mono text-pink-300">
                  K&apos; (-4, 6)
                </span>
                <span className="text-[11px] text-pink-400 block mt-1">
                  (y = -6 berubah tanda jadi +6)
                </span>
              </div>
            ) : (
              <div className="py-4 rounded-2xl bg-slate-950/70 border border-dashed border-slate-800 text-slate-500 font-mono text-sm">
                Jawaban terkunci di gembok 🔒
              </div>
            )}
          </div>

          {/* Center: Padlock Trigger for IFP */}
          <div className="md:col-span-1 flex justify-center py-2">
            <button
              onClick={handleUnlock}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer shadow-2xl active:scale-95 ${
                unlocked
                  ? 'bg-emerald-500 border-white text-slate-950 shadow-emerald-500/40'
                  : 'bg-slate-800 border-amber-400 text-amber-400 hover:bg-slate-700 hover:scale-110 shadow-amber-500/20 animate-pulse'
              }`}
              title={unlocked ? 'Gembok Terbuka!' : 'Sentuh Gembok untuk Membuka Jawaban!'}
            >
              {unlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            </button>
          </div>

          {/* Right: Tebak Sumbu Y */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-xl space-y-3 text-center">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              Tantangan 2 (Cermin Sumbu Y)
            </span>
            <p className="text-base font-bold text-white">
              Tebak letak bayangan <span className="text-cyan-400 font-mono">K&apos;&apos;</span> jika dicerminkan terhadap sumbu Y!
            </p>

            {unlocked ? (
              <div className="py-3 px-4 bg-cyan-950/60 border border-cyan-500/50 rounded-2xl animate-fade-in">
                <span className="text-xs text-slate-300 block mb-1">Jawaban Terbuka:</span>
                <span className="text-3xl font-black font-mono text-cyan-300">
                  K&apos;&apos; (4, -6)
                </span>
                <span className="text-[11px] text-cyan-400 block mt-1">
                  (x = -4 berubah tanda jadi +4)
                </span>
              </div>
            ) : (
              <div className="py-4 rounded-2xl bg-slate-950/70 border border-dashed border-slate-800 text-slate-500 font-mono text-sm">
                Jawaban terkunci di gembok 🔒
              </div>
            )}
          </div>
        </div>

        {/* Motivation note as in Slide 14 */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-slate-400 italic">
            &ldquo;Gunakan aturan pola yang baru kita temukan, simpan jawaban di kepala, lalu kita buktikan...&rdquo;
          </p>
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
          SMP Negeri 2 Kemranjen &bull; Slide 14/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Pembuktian Visual</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
