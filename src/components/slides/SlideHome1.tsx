import React from 'react';
import { 
  PlayCircle, 
  Lightbulb, 
  Target, 
  FileQuestion, 
  ListOrdered, 
  Users, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface SlideHome1Props {
  onNavigateToSlide: (slideNumber: number) => void;
  onOpenResource: (title: string, url: string, type: 'youtube' | 'wordwall') => void;
  onOpenGroupRandomizer: () => void;
}

export const SlideHome1: React.FC<SlideHome1Props> = ({
  onNavigateToSlide,
  onOpenResource,
  onOpenGroupRandomizer,
}) => {
  const menuButtons = [
    {
      id: 'icebreaking',
      title: 'Ice breaking',
      badge: 'Video Seru',
      desc: 'Pemanasan & motivasi belajar matematika dengan riang',
      icon: PlayCircle,
      gradient: 'from-amber-500 to-orange-600',
      action: () =>
        onOpenResource(
          'Ice Breaking Seru',
          'https://www.youtube.com/watch?v=KV3_Lt95cN8',
          'youtube'
        ),
      extraText: 'YouTube: KV3_Lt95cN8',
      type: 'external',
    },
    {
      id: 'manfaat',
      title: 'MANFAAT',
      badge: 'Kontekstual',
      desc: 'Mengapa kita perlu belajar konsep refleksi dalam kehidupan?',
      icon: Lightbulb,
      gradient: 'from-blue-600 to-cyan-600',
      action: () => onNavigateToSlide(3), // Slide 3
      extraText: 'Menuju Slide 3: Aplikasi Nyata',
      type: 'slide',
    },
    {
      id: 'tujuan',
      title: 'Tujuan Pembelajaran',
      badge: 'Capaian',
      desc: 'Kompetensi refleksi titik & bangun datar terhadap sumbu X & Y',
      icon: Target,
      gradient: 'from-indigo-600 to-blue-500',
      action: () => onNavigateToSlide(4), // Slide 4
      extraText: 'Menuju Slide 4: Target Belajar',
      type: 'slide',
    },
    {
      id: 'asesmen',
      title: 'Asesmen Awal',
      badge: 'Diagnostik',
      desc: 'Uji kesiapan pemahaman koordinat awal via Wordwall',
      icon: FileQuestion,
      gradient: 'from-sky-600 to-teal-600',
      action: () =>
        onOpenResource(
          'Asesmen Awal Refleksi',
          'https://wordwall.net/resource/121072280?wwmethod=link',
          'wordwall'
        ),
      extraText: 'Wordwall Interaktif',
      type: 'external',
    },
    {
      id: 'uraian',
      title: 'Uraian Kegiatan',
      badge: 'Skenario',
      desc: 'Tahapan 6 langkah pembelajaran aktif di kelas IX',
      icon: ListOrdered,
      gradient: 'from-cyan-600 to-sky-700',
      action: () => onNavigateToSlide(5), // Slide 5
      extraText: 'Menuju Slide 5: Alur Belajar',
      type: 'slide',
    },
    {
      id: 'kelompok',
      title: 'Bentuk Kelompok',
      badge: '8 Kelompok Resmi',
      desc: 'Daftar resmi pembagian 8 kelompok kelas IX (31 siswa)',
      icon: Users,
      gradient: 'from-emerald-600 to-teal-600',
      action: onOpenGroupRandomizer,
      extraText: 'Daftar Resmi Kelompok 1 - 8',
      type: 'tool',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-lg rounded-xl shadow-lg shadow-cyan-500/20 tracking-wider">
            HOME-1
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Menu Navigasi Pembelajaran</h2>
            <p className="text-xs text-slate-400">
              Pilih menu kegiatan di bawah untuk memulai sesi bersama murid
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToSlide(6)}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Lanjut ke Pemanasan (Slide 6)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of 6 Main Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-auto py-4">
        {menuButtons.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              onClick={btn.action}
              className="group relative text-left p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.98] flex flex-col justify-between overflow-hidden cursor-pointer min-h-[170px]"
            >
              {/* Background gradient hint */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${btn.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${btn.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                    {btn.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {btn.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {btn.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-400">
                <span>{btn.extraText}</span>
                {btn.type === 'external' ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>SMP Negeri 2 Kemranjen &bull; Modul Ajar Matematika Kelas IX</span>
        <span>Guru Pengampu: Irma Muflihah, S.Pd.</span>
      </div>
    </div>
  );
};
