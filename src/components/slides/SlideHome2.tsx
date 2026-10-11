import React from 'react';
import { Video, Compass, Gamepad2, Trophy, ArrowRight, ExternalLink, Play } from 'lucide-react';

interface SlideHome2Props {
  onOpenResource: (title: string, url: string, type: 'youtube' | 'wordwall' | 'geogebra' | 'kemendikdasmen' | 'game') => void;
  onNavigateToSlide: (slideNumber: number) => void;
  onGoToHome1: () => void;
}

export const SlideHome2: React.FC<SlideHome2Props> = ({
  onOpenResource,
  onNavigateToSlide,
  onGoToHome1,
}) => {
  const resourceButtons = [
    {
      id: 'video',
      title: 'Video Materi',
      badge: 'Kemendikdasmen',
      desc: 'Materi tayang resmi pembelajaran transformasi geometri refleksi.',
      icon: Video,
      gradient: 'from-blue-600 to-indigo-600',
      action: () =>
        onOpenResource(
          'Video Pembelajaran Transformasi Geometri - Kemendikdasmen',
          'https://murid.kemendikdasmen.go.id/sumber-belajar/sub-unit/9d833c6c-ecc5-4a84-947e-369f650b507d/materi/pembelajaran-transformasi-geometri-refleksi-4bc261ed-ac63-4f22-849d-9c54830df583',
          'kemendikdasmen'
        ),
      urlSnippet: 'murid.kemendikdasmen.go.id',
    },
    {
      id: 'geogebra',
      title: 'GeoGebra Classic',
      badge: 'Laboratorium Digital',
      desc: 'Eksplorasi koordinat & cermin langsung di software GeoGebra.',
      icon: Compass,
      gradient: 'from-cyan-600 to-blue-500',
      action: () =>
        onOpenResource(
          'GeoGebra Classic Math Tool',
          'https://www.geogebra.org/classic',
          'geogebra'
        ),
      urlSnippet: 'geogebra.org/classic',
    },
    {
      id: 'game',
      title: 'Game Edukatif',
      badge: 'Tarik-Menarik Refleksi',
      desc: 'Mainkan game interaktif tarik refleksi bangun datar.',
      icon: Gamepad2,
      gradient: 'from-emerald-600 to-teal-500',
      action: () =>
        onOpenResource(
          'Game Edukatif: Tarik-Menarik Refleksi',
          'https://tarik-menarik-refleksi.vercel.app/',
          'game'
        ),
      urlSnippet: 'tarik-menarik-refleksi.vercel.app',
    },
    {
      id: 'kuis',
      title: 'Kuis Interaktif',
      badge: 'Wordwall Gamified',
      desc: 'Tantangan game kuis cepat uji pemahaman refleksi titik.',
      icon: Trophy,
      gradient: 'from-amber-500 to-rose-600',
      action: () =>
        onOpenResource(
          'Kuis Interaktif Refleksi',
          'https://wordwall.net/resource/121072280?wwmethod=link',
          'wordwall'
        ),
      urlSnippet: 'wordwall.net/resource/121072280',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-lg rounded-xl shadow-lg shadow-cyan-500/20 tracking-wider">
            HOME-2
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">
              Pusat Sumber Belajar Digital
            </h2>
            <p className="text-xs text-slate-400">
              Media tayang eksternal & laboratorium interaktif untuk IFP
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToSlide(8)}
          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Masuk ke Eksplorasi (Slide 8)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Large Touch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-6">
        {resourceButtons.map((res) => {
          const Icon = res.icon;
          return (
            <button
              key={res.id}
              onClick={res.action}
              className="group text-left p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/60 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.98] flex flex-col justify-between overflow-hidden cursor-pointer relative min-h-[190px]"
            >
              <div
                className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${res.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-25 transition-opacity`}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${res.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {res.badge}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {res.title}
                </h3>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {res.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                <span className="truncate max-w-xs">{res.urlSnippet}</span>
                <div className="flex items-center gap-1 font-sans font-bold">
                  <span>Buka di IFP</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onGoToHome1}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-colors cursor-pointer"
        >
          &larr; Ke HOME-1
        </button>

        <span className="text-xs text-slate-500">
          SMP Negeri 2 Kemranjen &bull; Slide 7/18
        </span>

        <button
          onClick={() => onNavigateToSlide(8)}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-black flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Lanjut ke Slide 8</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
