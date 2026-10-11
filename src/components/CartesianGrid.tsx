import React, { useRef } from 'react';

export interface CartesianPoint {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
  isReflection?: boolean;
}

interface CartesianGridProps {
  points?: CartesianPoint[];
  polygons?: { points: { x: number; y: number }[]; color: string; fillColor: string; label?: string }[];
  mirrorAxis?: 'none' | 'x' | 'y' | 'y=x';
  highlightMirror?: boolean;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  interactive?: boolean;
  onPointChange?: (id: string, newX: number, newY: number) => void;
  showCoordinatesOnPoints?: boolean;
  showDistanceGuides?: boolean;
  className?: string;
  height?: number;
}

export const CartesianGrid: React.FC<CartesianGridProps> = ({
  points = [],
  polygons = [],
  mirrorAxis = 'none',
  highlightMirror = true,
  minX = -8,
  maxX = 8,
  minY = -7,
  maxY = 7,
  interactive = false,
  onPointChange,
  showCoordinatesOnPoints = true,
  showDistanceGuides = true,
  className = '',
  height = 420,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const rangeX = maxX - minX;
  const rangeY = maxY - minY;

  // Convert coordinate to percentage
  const toPercentX = (x: number) => ((x - minX) / rangeX) * 100;
  const toPercentY = (y: number) => ((maxY - y) / rangeY) * 100;

  // Generate grid lines
  const gridLinesX = [];
  for (let x = Math.ceil(minX); x <= Math.floor(maxX); x++) {
    gridLinesX.push(x);
  }

  const gridLinesY = [];
  for (let y = Math.ceil(minY); y <= Math.floor(maxY); y++) {
    gridLinesY.push(y);
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden select-none touch-none ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Background Blueprint Grid pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <pattern id="subgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subgrid)" />

        {/* Grid lines X (vertical lines) */}
        {gridLinesX.map((x) => {
          const posX = `${toPercentX(x)}%`;
          const isAxis = x === 0;
          return (
            <line
              key={`x-line-${x}`}
              x1={posX}
              y1="0%"
              x2={posX}
              y2="100%"
              stroke={isAxis ? '#38bdf8' : 'rgba(148, 163, 184, 0.18)'}
              strokeWidth={isAxis ? 3 : 1}
            />
          );
        })}

        {/* Grid lines Y (horizontal lines) */}
        {gridLinesY.map((y) => {
          const posY = `${toPercentY(y)}%`;
          const isAxis = y === 0;
          return (
            <line
              key={`y-line-${y}`}
              x1="0%"
              y1={posY}
              x2="100%"
              y2={posY}
              stroke={isAxis ? '#38bdf8' : 'rgba(148, 163, 184, 0.18)'}
              strokeWidth={isAxis ? 3 : 1}
            />
          );
        })}

        {/* Mirror Line Highlighting */}
        {mirrorAxis === 'x' && (
          <g>
            <line
              x1="0%"
              y1={`${toPercentY(0)}%`}
              x2="100%"
              y2={`${toPercentY(0)}%`}
              stroke="#ec4899"
              strokeWidth={highlightMirror ? 6 : 4}
              strokeDasharray={highlightMirror ? 'none' : '6 4'}
              className="transition-all duration-300"
            />
            {highlightMirror && (
              <line
                x1="0%"
                y1={`${toPercentY(0)}%`}
                x2="100%"
                y2={`${toPercentY(0)}%`}
                stroke="#f472b6"
                strokeWidth={12}
                strokeOpacity={0.25}
              />
            )}
          </g>
        )}

        {mirrorAxis === 'y' && (
          <g>
            <line
              x1={`${toPercentX(0)}%`}
              y1="0%"
              x2={`${toPercentX(0)}%`}
              y2="100%"
              stroke="#ec4899"
              strokeWidth={highlightMirror ? 6 : 4}
              className="transition-all duration-300"
            />
            {highlightMirror && (
              <line
                x1={`${toPercentX(0)}%`}
                y1="0%"
                x2={`${toPercentX(0)}%`}
                y2="100%"
                stroke="#f472b6"
                strokeWidth={12}
                strokeOpacity={0.25}
              />
            )}
          </g>
        )}

        {mirrorAxis === 'y=x' && (
          <g>
            <line
              x1={`${toPercentX(minX)}%`}
              y1={`${toPercentY(minX)}%`}
              x2={`${toPercentX(maxX)}%`}
              y2={`${toPercentY(maxX)}%`}
              stroke="#a855f7"
              strokeWidth={4}
              strokeDasharray="8 6"
            />
          </g>
        )}

        {/* Polygons */}
        {polygons.map((poly, idx) => {
          const pointsStr = poly.points
            .map((p) => `${toPercentX(p.x)}%,${toPercentY(p.y)}%`)
            .join(' ');
          return (
            <polygon
              key={`poly-${idx}`}
              points={pointsStr}
              fill={poly.fillColor}
              stroke={poly.color}
              strokeWidth={3}
              strokeLinejoin="round"
              className="transition-all duration-500"
            />
          );
        })}

        {/* Distance connection guides between points and mirror axis */}
        {showDistanceGuides &&
          points.map((pt) => {
            if (mirrorAxis === 'x') {
              return (
                <line
                  key={`guide-x-${pt.id}`}
                  x1={`${toPercentX(pt.x)}%`}
                  y1={`${toPercentY(pt.y)}%`}
                  x2={`${toPercentX(pt.x)}%`}
                  y2={`${toPercentY(0)}%`}
                  stroke={pt.color}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  strokeOpacity={0.7}
                />
              );
            }
            if (mirrorAxis === 'y') {
              return (
                <line
                  key={`guide-y-${pt.id}`}
                  x1={`${toPercentX(pt.x)}%`}
                  y1={`${toPercentY(pt.y)}%`}
                  x2={`${toPercentX(0)}%`}
                  y2={`${toPercentY(pt.y)}%`}
                  stroke={pt.color}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  strokeOpacity={0.7}
                />
              );
            }
            return null;
          })}
      </svg>

      {/* Axis Labels (X-axis numbers) */}
      <div className="absolute inset-0 pointer-events-none">
        {gridLinesX.map((x) => {
          if (x === 0) return null;
          return (
            <div
              key={`x-num-${x}`}
              className="absolute text-[11px] font-mono font-bold text-slate-400 -translate-x-1/2"
              style={{
                left: `${toPercentX(x)}%`,
                top: `calc(${toPercentY(0)}% + 6px)`,
              }}
            >
              {x}
            </div>
          );
        })}

        {/* Axis Labels (Y-axis numbers) */}
        {gridLinesY.map((y) => {
          if (y === 0) return null;
          return (
            <div
              key={`y-num-${y}`}
              className="absolute text-[11px] font-mono font-bold text-slate-400 -translate-y-1/2"
              style={{
                top: `${toPercentY(y)}%`,
                left: `calc(${toPercentX(0)}% + 8px)`,
              }}
            >
              {y}
            </div>
          );
        })}

        {/* Origin (0,0) */}
        <div
          className="absolute text-[12px] font-mono font-bold text-sky-400"
          style={{
            left: `calc(${toPercentX(0)}% + 6px)`,
            top: `calc(${toPercentY(0)}% + 6px)`,
          }}
        >
          0
        </div>

        {/* Axis Names */}
        <div
          className="absolute text-sm font-black font-mono text-sky-400 px-2 py-0.5 rounded bg-slate-900/80 border border-sky-500/30 shadow"
          style={{
            right: '12px',
            top: `calc(${toPercentY(0)}% - 28px)`,
          }}
        >
          Sumbu X
        </div>

        <div
          className="absolute text-sm font-black font-mono text-sky-400 px-2 py-0.5 rounded bg-slate-900/80 border border-sky-500/30 shadow"
          style={{
            left: `calc(${toPercentX(0)}% + 12px)`,
            top: '12px',
          }}
        >
          Sumbu Y
        </div>

        {/* Mirror Axis Banner / Badge */}
        {mirrorAxis === 'x' && highlightMirror && (
          <div
            className="absolute left-4 px-3 py-1 bg-pink-500/20 border border-pink-500/50 rounded-lg text-pink-300 text-xs font-bold tracking-wide backdrop-blur-sm"
            style={{ top: `calc(${toPercentY(0)}% - 32px)` }}
          >
            🪞 Cermin Sumbu X (Mendatar: y = 0)
          </div>
        )}

        {mirrorAxis === 'y' && highlightMirror && (
          <div
            className="absolute top-4 px-3 py-1 bg-pink-500/20 border border-pink-500/50 rounded-lg text-pink-300 text-xs font-bold tracking-wide backdrop-blur-sm -translate-x-1/2"
            style={{ left: `${toPercentX(0)}%` }}
          >
            🪞 Cermin Sumbu Y (Tegak: x = 0)
          </div>
        )}
      </div>

      {/* Render Interactive / Display Points */}
      {points.map((pt) => {
        const posX = toPercentX(pt.x);
        const posY = toPercentY(pt.y);

        return (
          <div
            key={`pt-${pt.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-transform active:scale-125"
            style={{
              left: `${posX}%`,
              top: `${posY}%`,
            }}
          >
            {/* Coordinate Tooltip Tag */}
            {showCoordinatesOnPoints && (
              <div
                className={`mb-1 px-2 py-0.5 rounded-md text-[12px] font-mono font-bold tracking-tight shadow-lg whitespace-nowrap border pointer-events-none ${
                  pt.isReflection
                    ? 'bg-rose-950/90 text-rose-200 border-rose-500/60'
                    : 'bg-cyan-950/90 text-cyan-200 border-cyan-500/60'
                }`}
              >
                {pt.label.includes('(') ? pt.label : `${pt.label}(${pt.x}, ${pt.y})`}
              </div>
            )}

            {/* Glowing Dot */}
            <div
              className={`w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all ${
                interactive ? 'ring-4 ring-offset-2 ring-cyan-400/50' : ''
              }`}
              style={{
                backgroundColor: pt.color,
                boxShadow: `0 0 16px ${pt.color}`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
