import React, { useState } from 'react';
import { FileSpreadsheet, Monitor, Edit3, CheckCircle2, ChevronRight, Calculator, Sparkles, Users } from 'lucide-react';

interface SlideKumpulDataProps {
  onGoToHome: () => void;
  onNext: () => void;
  onOpenGroupModal?: () => void;
}

export const SlideKumpulData: React.FC<SlideKumpulDataProps> = ({ onGoToHome, onNext, onOpenGroupModal }) => {
  // LKPD Interactive Data Collection Table
  const [data, setData] = useState([
    { name: 'Titik A', orig: '(2, 3)', refX: '', refY: '', expectedX: '(2, -3)', expectedY: '(-2, 3)' },
    { name: 'Titik B', orig: '(5, 3)', refX: '', refY: '', expectedX: '(5, -3)', expectedY: '(-5, 3)' },
    { name: 'Titik C', orig: '(2, 6)', refX: '', refY: '', expectedX: '(2, -6)', expectedY: '(-2, 6)' },
  ]);

  const [checked, setChecked] = useState(false);

  const handleFillDemo = () => {
    setData([
      { name: 'Titik A', orig: '(2, 3)', refX: '(2, -3)', refY: '(-2, 3)', expectedX: '(2, -3)', expectedY: '(-2, 3)' },
      { name: 'Titik B', orig: '(5, 3)', refX: '(5, -3)', refY: '(-5, 3)', expectedX: '(5, -3)', expectedY: '(-5, 3)' },
      { name: 'Titik C', orig: '(2, 6)', refX: '(2, -6)', refY: '(-2, 6)', expectedX: '(2, -6)', expectedY: '(-2, 6)' },
    ]);
    setChecked(true);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Aktivitas Penyelidikan LKPD
          </span>
          <h2 className="text-3xl font-black text-white">Waktunya Mengumpulkan Data!</h2>
        </div>

        <div className="flex items-center gap-2.5">
          {onOpenGroupModal && (
            <button
              onClick={onOpenGroupModal}
              className="px-3.5 py-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Daftar 8 Kelompok</span>
            </button>
          )}

          <button
            onClick={handleFillDemo}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Kunci Jawaban LKPD</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-center">
        {/* Left Instruction Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">
                Dua Pilihan Media Praktik:
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <Edit3 className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                <span className="text-xs font-bold text-slate-200 block">Kertas Berpetak</span>
                <span className="text-[10px] text-slate-400">Manual / Penggaris</span>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <Monitor className="w-5 h-5 mx-auto text-sky-400 mb-1" />
                <span className="text-xs font-bold text-slate-200 block">Perangkat Digital</span>
                <span className="text-[10px] text-slate-400">GeoGebra Classic</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs leading-relaxed space-y-1">
              <p className="font-bold text-cyan-300">📋 Petunjuk Kolaboratif:</p>
              <p>
                &ldquo;Bekerjalah dalam kelompok. Gunakan alat pilihan kalian untuk mencari bayangan titik. Catat koordinat titik asal dan bayangan secara teliti di Lembar Kerja (LKPD)!&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right Interactive Table */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Tabel Pengamatan LKPD (Titik & Bayangan)</span>
              <span className="text-xs font-normal text-slate-400">SMPN 2 Kemranjen</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/70 text-slate-300 font-bold">
                    <th className="p-3 rounded-l-xl">Nama Titik</th>
                    <th className="p-3 text-cyan-400">Titik Asal (x, y)</th>
                    <th className="p-3 text-pink-400">Cermin Sumbu X</th>
                    <th className="p-3 text-purple-400 rounded-r-xl">Cermin Sumbu Y</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans">{row.name}</td>
                      <td className="p-3.5 text-cyan-300 font-bold">{row.orig}</td>
                      <td className="p-3.5">
                        {checked ? (
                          <span className="px-2.5 py-1 rounded-lg bg-pink-950/60 text-pink-300 font-bold border border-pink-700/60">
                            {row.refX}
                          </span>
                        ) : (
                          <span className="text-slate-500">...</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {checked ? (
                          <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 font-bold border border-purple-700/60">
                            {row.refY}
                          </span>
                        ) : (
                          <span className="text-slate-500">...</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {checked && (
              <div className="mt-4 p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Perhatikan tanda negatif (-) yang berpindah antara nilai y (pada sumbu X) dan nilai x (pada sumbu Y)!
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
          SMP Negeri 2 Kemranjen &bull; Slide 10/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Pola Refleksi Sumbu X</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
