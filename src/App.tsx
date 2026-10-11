import React, { useState, useEffect } from 'react';
import { SlideInfo } from './types';
import { NavigationControls } from './components/NavigationControls';
import { WhiteboardOverlay } from './components/WhiteboardOverlay';
import { GroupListModal } from './components/GroupListModal';
import { ExternalResourceModal } from './components/ExternalResourceModal';
import { GeometryLabModal } from './components/GeometryLabModal';

// Slides
import { SlideCover } from './components/slides/SlideCover';
import { SlideHome1 } from './components/slides/SlideHome1';
import { SlideManfaat } from './components/slides/SlideManfaat';
import { SlideTujuan } from './components/slides/SlideTujuan';
import { SlideUraian } from './components/slides/SlideUraian';
import { SlidePemanasan } from './components/slides/SlidePemanasan';
import { SlideHome2 } from './components/slides/SlideHome2';
import { SlideEksplorasiSegitiga } from './components/slides/SlideEksplorasiSegitiga';
import { SlideMisi } from './components/slides/SlideMisi';
import { SlideKumpulData } from './components/slides/SlideKumpulData';
import { SlidePolaSumbuX } from './components/slides/SlidePolaSumbuX';
import { SlidePolaSumbuY } from './components/slides/SlidePolaSumbuY';
import { SlideSintesis } from './components/slides/SlideSintesis';
import { SlideUjiNyali } from './components/slides/SlideUjiNyali';
import { SlidePembuktianVisual } from './components/slides/SlidePembuktianVisual';
import { SlideKesimpulan } from './components/slides/SlideKesimpulan';
import { SlidePostTest } from './components/slides/SlidePostTest';
import { SlideTeaser } from './components/slides/SlideTeaser';

import { Compass, HelpCircle, Trophy } from 'lucide-react';

const SLIDES_METADATA: SlideInfo[] = [
  { id: 1, title: 'Judul: Ruang Refleksi', category: 'intro' },
  { id: 2, title: 'HOME-1: Menu Navigasi Utama', category: 'menu' },
  { id: 3, title: 'Mengapa Belajar Refleksi? (Manfaat)', category: 'konsep' },
  { id: 4, title: 'Tujuan Pembelajaran', category: 'konsep' },
  { id: 5, title: 'Uraian Kegiatan', category: 'konsep' },
  { id: 6, title: 'Pemanasan: Navigasi Kartesius', category: 'eksplorasi' },
  { id: 7, title: 'HOME-2: Sumber Belajar & Media', category: 'menu' },
  { id: 8, title: 'Eksplorasi Refleksi Segitiga', category: 'eksplorasi' },
  { id: 9, title: 'Misi Investigasi Kelompok', category: 'eksplorasi' },
  { id: 10, title: 'Waktunya Mengumpulkan Data (LKPD)', category: 'eksplorasi' },
  { id: 11, title: 'Pola Refleksi Sumbu X', category: 'penguatan' },
  { id: 12, title: 'Pola Refleksi Sumbu Y', category: 'penguatan' },
  { id: 13, title: 'Sintesis: Matriks Cermin Digital', category: 'penguatan' },
  { id: 14, title: 'Uji Nyali Koordinat K(-4, -6)', category: 'evaluasi' },
  { id: 15, title: 'Pembuktian Visual Geometris', category: 'evaluasi' },
  { id: 16, title: 'Kesimpulan Emas Transformasi', category: 'penguatan' },
  { id: 17, title: 'Cek Pemahaman Akhir (Post-Test)', category: 'evaluasi' },
  { id: 18, title: 'Teaser Pertemuan Berikutnya', category: 'intro' },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [isLabOpen, setIsLabOpen] = useState<boolean>(false);

  // External Resource state
  const [resourceModal, setResourceModal] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    type: 'youtube' | 'wordwall' | 'geogebra' | 'kemendikdasmen' | 'game' | 'general';
  }>({
    isOpen: false,
    title: '',
    url: '',
    type: 'general',
  });

  const totalSlides = SLIDES_METADATA.length;

  const goToPrev = () => {
    if (currentSlide > 1) setCurrentSlide((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentSlide < totalSlides) setCurrentSlide((prev) => prev + 1);
  };

  const jumpToSlide = (num: number) => {
    if (num >= 1 && num <= totalSlides) {
      setCurrentSlide(num);
    }
  };

  const openResource = (
    title: string,
    url: string,
    type: 'youtube' | 'wordwall' | 'geogebra' | 'kemendikdasmen' | 'game' | 'general'
  ) => {
    setResourceModal({
      isOpen: true,
      title,
      url,
      type,
    });
  };

  // Keyboard navigation for presentation remote or keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToSlide(totalSlides);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="relative w-screen h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden">
      {/* Quick Top Bar Floating Utilities */}
      <header className="absolute top-3 right-4 z-30 flex items-center gap-2">
        <button
          onClick={() =>
            openResource(
              'Wordwall: Asesmen & Kuis Refleksi',
              'https://wordwall.net/resource/121072280?wwmethod=link',
              'wordwall'
            )
          }
          className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm cursor-pointer transition-colors"
          title="Buka Wordwall Asesmen & Kuis (121072280)"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Wordwall Kuis</span>
        </button>

        <button
          onClick={() => setIsLabOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm cursor-pointer transition-colors"
          title="Buka Lab Geometri Cepat"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Lab Refleksi</span>
        </button>
      </header>

      {/* Slide Display Area (fills viewport minus bottom nav) */}
      <main className="flex-1 w-full h-[calc(100vh-68px)] overflow-y-auto overflow-x-hidden relative">
        {currentSlide === 1 && (
          <SlideCover
            onStart={() => jumpToSlide(2)}
            onGoToHome={() => jumpToSlide(2)}
          />
        )}

        {currentSlide === 2 && (
          <SlideHome1
            onNavigateToSlide={jumpToSlide}
            onOpenResource={openResource}
            onOpenGroupRandomizer={() => setIsGroupModalOpen(true)}
          />
        )}

        {currentSlide === 3 && (
          <SlideManfaat
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 4 && (
          <SlideTujuan
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 5 && (
          <SlideUraian
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
            onOpenGroupModal={() => setIsGroupModalOpen(true)}
            onOpenResource={openResource}
            onNavigateToSlide={jumpToSlide}
          />
        )}

        {currentSlide === 6 && (
          <SlidePemanasan
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 7 && (
          <SlideHome2
            onOpenResource={openResource}
            onNavigateToSlide={jumpToSlide}
            onGoToHome1={() => jumpToSlide(2)}
          />
        )}

        {currentSlide === 8 && (
          <SlideEksplorasiSegitiga
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 9 && (
          <SlideMisi
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 10 && (
          <SlideKumpulData
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
            onOpenGroupModal={() => setIsGroupModalOpen(true)}
          />
        )}

        {currentSlide === 11 && (
          <SlidePolaSumbuX
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 12 && (
          <SlidePolaSumbuY
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 13 && (
          <SlideSintesis
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 14 && (
          <SlideUjiNyali
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 15 && (
          <SlidePembuktianVisual
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 16 && (
          <SlideKesimpulan
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
          />
        )}

        {currentSlide === 17 && (
          <SlidePostTest
            onGoToHome={() => jumpToSlide(2)}
            onNext={goToNext}
            onOpenResource={openResource}
          />
        )}

        {currentSlide === 18 && (
          <SlideTeaser
            onGoToCover={() => jumpToSlide(1)}
            onGoToHome={() => jumpToSlide(2)}
          />
        )}
      </main>

      {/* Bottom IFP Navigation Bar */}
      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        slidesMeta={SLIDES_METADATA}
        onPrev={goToPrev}
        onNext={goToNext}
        onJumpToSlide={jumpToSlide}
        onToggleWhiteboard={() => setIsWhiteboardActive((prev) => !prev)}
        isWhiteboardActive={isWhiteboardActive}
        onOpenGroupModal={() => setIsGroupModalOpen(true)}
      />

      {/* IFP Whiteboard Pen Drawing Overlay */}
      <WhiteboardOverlay
        isActive={isWhiteboardActive}
        onClose={() => setIsWhiteboardActive(false)}
      />

      {/* Classroom Official Groups Modal (8 Kelompok) */}
      <GroupListModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />

      {/* Quick Geometry Lab Modal */}
      <GeometryLabModal
        isOpen={isLabOpen}
        onClose={() => setIsLabOpen(false)}
      />

      {/* External Resource Modal (Wordwall, YouTube, GeoGebra, Kemendikdasmen) */}
      <ExternalResourceModal
        isOpen={resourceModal.isOpen}
        onClose={() => setResourceModal((prev) => ({ ...prev, isOpen: false }))}
        title={resourceModal.title}
        url={resourceModal.url}
        type={resourceModal.type}
      />
    </div>
  );
}
