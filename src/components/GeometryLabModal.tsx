import React, { useState } from 'react';
import { CartesianGrid, CartesianPoint } from './CartesianGrid';
import { X, Sparkles, Compass, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface GeometryLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeometryLabModal: React.FC<GeometryLabModalProps> = ({ isOpen, onClose }) => {
  const [pointX, setPointX] = useState<number>(3);
  const [pointY, setPointY] = useState<number>(4);
  const [activeAxis, setActiveAxis] = useState<'x' | 'y' | 'y=x'>('x');

  if (!isOpen) return null;

  // Calculate reflection
  let refX = pointX;
  let refY = pointY;
  let ruleText = '';

  if (activeAxis === 'x') {
    refX = pointX;
    refY = -pointY;
    ruleText = `Refleksi Sumbu X: (${pointX}, ${pointY}) → (${refX}, ${refY}) [y berubah tanda]`;
  } else if (activeAxis === 'y') {
    refX = -pointX;
    refY = pointY;
    ruleText = `Refleksi Sumbu Y: (${pointX}, ${pointY}) → (${refX}, ${refY}) [x berubah tanda]`;
  } else if (activeAxis === 'y=x') {
    refX = pointY;
    refY = pointX;
    ruleText = `Refleksi Garis y = x: (${pointX}, ${pointY}) → (${refX}, ${refY}) [x dan y bertukar]`;
  }

  const points: CartesianPoint[] = [
    { id: 'orig', x: pointX, y: pointY, label: `Asal P(${pointX}, ${pointY})`, color: '#06b6d4' },
    { id: 'ref', x: refX, y: refY, label: `Bayangan P'(${refX}, ${refY})`, color: '#ec4899', isReflection: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                Laboratorium Refleksi Interaktif
              </h3>
              <p className="text-xs text-slate-400">
                Eksperimen titik sembarang langsung di layar sentuh IFP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lab Workspace */}
        <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                Pilih Sumbu Cermin:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveAxis('x')}
                  className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeAxis === 'x' ? 'bg-pink-500 text-white shadow' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Sumbu X
                </button>
                <button
                  onClick={() => setActiveAxis('y')}
                  className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeAxis === 'y' ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Sumbu Y
                </button>
                <button
                  onClick={() => setActiveAxis('y=x')}
                  className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeAxis === 'y=x' ? 'bg-purple-500 text-white shadow' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Garis y = x
                </button>
              </div>

              {/* Slider for Point X */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-300">
                  <span>Koordinat X:</span>
                  <span className="text-cyan-400">{pointX}</span>
                </div>
                <input
                  type="range"
                  min="-7"
                  max="7"
                  value={pointX}
                  onChange={(e) => setPointX(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Slider for Point Y */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-300">
                  <span>Koordinat Y:</span>
                  <span className="text-cyan-400">{pointY}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={pointY}
                  onChange={(e) => setPointY(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 leading-relaxed">
                {ruleText}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <CartesianGrid
              points={points}
              mirrorAxis={activeAxis}
              highlightMirror={true}
              showDistanceGuides={true}
              minX={-8}
              maxX={8}
              minY={-7}
              maxY={7}
              height={440}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
