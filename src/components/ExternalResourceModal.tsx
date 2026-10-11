import React, { useState } from 'react';
import { ExternalLink, X, MonitorPlay, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

interface ExternalResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  type: 'youtube' | 'wordwall' | 'geogebra' | 'kemendikdasmen' | 'game' | 'general';
}

export const ExternalResourceModal: React.FC<ExternalResourceModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  type,
}) => {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  if (!isOpen) return null;

  // Derive embed URL if applicable
  let embedUrl = url;
  if (type === 'youtube' && url.includes('watch?v=')) {
    const videoId = url.split('watch?v=')[1]?.split('&')[0];
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  } else if (type === 'wordwall' || url.includes('wordwall.net')) {
    // Wordwall embed format: https://wordwall.net/embed/121072280
    const resourceId = url.match(/\/resource\/([0-9]+)/)?.[1] || '121072280';
    embedUrl = `https://wordwall.net/embed/${resourceId}?themeId=1&templateId=3&fontId=0`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reloadIframe = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-5 md:px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">
              <MonitorPlay className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  {title}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono font-bold border border-cyan-800">
                  {type === 'wordwall' ? 'WORDWALL INTERAKTIF' : type.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-sm md:max-w-md">{url}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="Salin Tautan"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin Link'}</span>
            </button>

            <button
              onClick={reloadIframe}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Muat Ulang Iframe"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Buka di Tab Baru / Layar Penuh</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tip Banner for Wordwall */}
        {type === 'wordwall' && (
          <div className="px-5 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Asesmen & Kuis Wordwall siap dimainkan di IFP. Jika tampilan ingin lebih leluasa, klik tombol <strong className="text-cyan-300">&ldquo;Buka di Tab Baru / Layar Penuh&rdquo;</strong> di atas.
              </span>
            </div>
            <span className="text-slate-500 font-mono hidden md:inline">ID: 121072280</span>
          </div>
        )}

        {/* Iframe preview container */}
        <div className="flex-1 bg-slate-950 relative">
          <iframe
            key={key}
            src={embedUrl}
            title={title}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
