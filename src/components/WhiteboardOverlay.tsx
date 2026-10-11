import React, { useRef, useState, useEffect } from 'react';
import { Pen, Eraser, RotateCcw, X, Palette, Check } from 'lucide-react';

interface WhiteboardOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  size: number;
}

export const WhiteboardOverlay: React.FC<WhiteboardOverlayProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#facc15'); // vibrant yellow
  const [currentSize, setCurrentSize] = useState(4);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);

  const colors = [
    { name: 'Kuning', value: '#facc15' },
    { name: 'Cyan', value: '#38bdf8' },
    { name: 'Pink/Merah', value: '#f43f5e' },
    { name: 'Hijau Neon', value: '#4ade80' },
    { name: 'Putih', value: '#ffffff' },
  ];

  const sizes = [
    { label: 'Halus', value: 3 },
    { label: 'Sedang', value: 6 },
    { label: 'Tebal', value: 12 },
  ];

  // Resize canvas to match window
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redraw();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [strokes]);

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });
  };

  const startDrawing = (clientX: number, clientY: number) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newStroke: Stroke = {
      points: [{ x, y }],
      color: currentColor,
      size: currentSize,
    };
    currentStrokeRef.current = newStroke;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;
      ctx.lineCap = 'round';
      ctx.moveTo(x, y);
    }
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    currentStrokeRef.current.points.push({ x, y });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing && currentStrokeRef.current) {
      setStrokes((prev) => [...prev, currentStrokeRef.current!]);
      currentStrokeRef.current = null;
    }
    setIsDrawing(false);
  };

  const handleClear = () => {
    setStrokes([]);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleUndo = () => {
    setStrokes((prev) => {
      const updated = prev.slice(0, -1);
      setTimeout(() => redraw(), 0);
      return updated;
    });
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 select-none touch-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={(e) => startDrawing(e.clientX, e.clientY)}
        onMouseMove={(e) => draw(e.clientX, e.clientY)}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={(e) => {
          if (e.touches[0]) startDrawing(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) draw(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={stopDrawing}
      />

      {/* Floating Toolbar for IFP Teacher Annotation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2 border-r border-slate-700">
          <Pen className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold text-slate-300">Spidol IFP</span>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 px-2 border-r border-slate-700">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setCurrentColor(c.value)}
              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                currentColor === c.value ? 'scale-125 border-white shadow-lg' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>

        {/* Thickness */}
        <div className="flex items-center gap-1 px-2 border-r border-slate-700">
          {sizes.map((s) => (
            <button
              key={s.value}
              onClick={() => setCurrentSize(s.value)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                currentSize === s.value ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <button
          onClick={handleUndo}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          title="Urungkan Coretan"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={handleClear}
          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors"
          title="Hapus Semua Coretan"
        >
          <Eraser className="w-5 h-5" />
        </button>

        <button
          onClick={onClose}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ml-2"
        >
          <X className="w-4 h-4 text-rose-400" />
          Tutup Spidol
        </button>
      </div>
    </div>
  );
};
