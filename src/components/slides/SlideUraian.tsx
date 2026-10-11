import React, { useState } from 'react';
import { 
  FileQuestion, 
  Users, 
  Video, 
  FileSpreadsheet, 
  Lightbulb, 
  Gamepad2, 
  ChevronRight, 
  CheckCircle2,
  Play
} from 'lucide-react';

interface SlideUraianProps {
  onGoToHome: () => void;
  onNext: () => void;
  onOpenGroupModal: () => void;
  onOpenResource: (title: string, url: string, type: 'youtube' | 'wordwall' | 'kemendikdasmen') => void;
  onNavigateToSlide: (slideNumber: number) => void;
}

export const SlideUraian: React.FC<SlideUraianProps> = ({
  onGoToHome,
  onNext,
  onOpenGroupModal,
  onOpenResource,
  onNavigateToSlide,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const steps = [
    {
      step: 1,
      title: 'Asesmen Awal',
      desc: 'Mendiagnosis kesiapan pemahaman koordinat Cartesius siswa.',
      icon: FileQuestion,
      color: 'from-amber-500 to-orange-500',
      action: () =>
        onOpenResource(
          'Asesmen Awal',
          'https://wordwall.net/resource/121072280?wwmethod=link',
          'wordwall'
        ),
      btnLabel: 'Buka Asesmen',
    },
    {
      step: 2,
      title: 'Pembentukan Kelompok',
      desc: 'Membagi murid menjadi 8 kelompok belajar kolaboratif (31 siswa).',
      icon: Users,
      color: 'from-blue-600 to-cyan-500',
      action: onOpenGroupModal,
      btnLabel: 'Buka Daftar 8 Kelompok',
    },
    {
      step: 3,
      title: 'Menayangkan Video Materi',
      desc: 'Menonton apersepsi video konsep refleksi transformasi geometri.',
      icon: Video,
      color: 'from-teal-500 to-emerald-500',
      action: () => onNavigateToSlide(7), // Slide 7 (Home 2)
      btnLabel: 'Buka Video Materi',
    },
    {
      step: 4,
      title: 'Pembagian Lembar Kerja',
      desc: 'Membagikan LKPD eksplorasi sumbu X dan Y pada kertas berpetak/digital.',
      icon: FileSpreadsheet,
      color: 'from-amber-600 to-yellow-500',
      action: () => onNavigateToSlide(10), // Slide 10
      btnLabel: 'Lihat Panduan LKPD',
    },
    {
      step: 5,
      title: 'Proses dan Kesimpulan Lembar Kerja',
      desc: 'Mendiskusikan pola koordinat titik asal dan bayangan secara kritis.',
      icon: Lightbulb,
      color: 'from-rose-500 to-pink-600',
      action: () => onNavigateToSlide(13), // Slide 13 Sintesis
      btnLabel: 'Menuju Sintesis',
    },
    {
      step: 6,
      title: 'Game dan Kuis Wordwall',
      desc: 'Menguji ketangkasan & pemahaman lewat kuis interaktif Wordwall dan post-test.',
      icon: Gamepad2,
      color: 'from-emerald-500 to-cyan-600',
      action: () =>
        onOpenResource(
          'Kuis Interaktif Wordwall Refleksi',
          'https://wordwall.net/resource/121072280?wwmethod=link',
          'wordwall'
        ),
      btnLabel: 'Buka Kuis Wordwall',
    },
  ];

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Alur Pembelajaran
          </span>
          <h2 className="text-3xl font-black text-white">Uraian Kegiatan Pembelajaran</h2>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400">Status Tahapan:</span>
          <div className="text-sm font-black text-cyan-400 font-mono">
            {completedSteps.length} dari 6 Tahap
          </div>
        </div>
      </div>

      {/* 6 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto py-4">
        {steps.map((st) => {
          const Icon = st.icon;
          const isDone = completedSteps.includes(st.step);
          return (
            <div
              key={st.step}
              className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                isDone
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-xl'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-black text-sm text-cyan-400">
                      {st.step}
                    </span>
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${st.color} text-slate-950`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStep(st.step)}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                    title="Tandai Selesai"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Selesai' : 'Belum'}</span>
                  </button>
                </div>

                <h3 className="text-lg font-black text-white mb-1.5">{st.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={st.action}
                  className="px-4 py-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{st.btnLabel}</span>
                </button>
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
          SMP Negeri 2 Kemranjen &bull; Slide 5/18
        </span>

        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut: Pemanasan Kartesius</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
