import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildingInfo } from "@/data/data";
import { X, Building2, Clock, Layers, ZoomIn, ZoomOut } from "lucide-react";

interface BuildingRect {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
}

const BUILDINGS: BuildingRect[] = [
  { id: "academic-a", x: 80, y: 60, w: 160, h: 100, color: "hsl(217,91%,60%)", label: "Academic A" },
  { id: "academic-b", x: 300, y: 60, w: 160, h: 100, color: "hsl(217,91%,50%)", label: "Academic B" },
  { id: "library", x: 520, y: 60, w: 140, h: 90, color: "hsl(142,71%,45%)", label: "Library" },
  { id: "admin", x: 720, y: 60, w: 130, h: 80, color: "hsl(25,95%,53%)", label: "Admin Block" },
  { id: "research", x: 80, y: 220, w: 150, h: 100, color: "hsl(270,70%,55%)", label: "Research Labs" },
  { id: "innovation", x: 290, y: 220, w: 140, h: 90, color: "hsl(187,86%,53%)", label: "Innovation Hub" },
  { id: "auditorium", x: 490, y: 210, w: 170, h: 110, color: "hsl(340,80%,55%)", label: "Auditorium" },
  { id: "sports", x: 720, y: 200, w: 160, h: 120, color: "hsl(45,90%,50%)", label: "Sports Complex" },
  { id: "cafeteria", x: 80, y: 390, w: 130, h: 80, color: "hsl(15,85%,55%)", label: "Cafeteria" },
  { id: "medical", x: 270, y: 390, w: 120, h: 80, color: "hsl(0,84%,60%)", label: "Medical Center" },
  { id: "hostel-boys", x: 450, y: 380, w: 140, h: 100, color: "hsl(200,70%,50%)", label: "Boys Hostel" },
  { id: "hostel-girls", x: 650, y: 380, w: 140, h: 100, color: "hsl(320,70%,55%)", label: "Girls Hostel" },
];

const MAP_W = 960;
const MAP_H = 540;

const PATHWAYS = [
  // Vertical connectors
  { x1: 160, y1: 160, x2: 160, y2: 220 },
  { x1: 380, y1: 160, x2: 360, y2: 220 },
  { x1: 590, y1: 150, x2: 575, y2: 210 },
  { x1: 160, y1: 320, x2: 160, y2: 390 },
  { x1: 360, y1: 310, x2: 330, y2: 390 },
  { x1: 575, y1: 320, x2: 520, y2: 380 },
  { x1: 785, y1: 320, x2: 720, y2: 380 },
  // Horizontal connectors
  { x1: 240, y1: 110, x2: 300, y2: 110 },
  { x1: 460, y1: 100, x2: 520, y2: 100 },
  { x1: 660, y1: 100, x2: 720, y2: 100 },
  { x1: 230, y1: 270, x2: 290, y2: 265 },
  { x1: 430, y1: 265, x2: 490, y2: 265 },
  { x1: 660, y1: 260, x2: 720, y2: 260 },
  { x1: 210, y1: 430, x2: 270, y2: 430 },
  { x1: 390, y1: 430, x2: 450, y2: 430 },
  { x1: 590, y1: 430, x2: 650, y2: 430 },
  // Main roads (wider)
  { x1: 60, y1: 185, x2: 900, y2: 185, isRoad: true },
  { x1: 60, y1: 355, x2: 900, y2: 355, isRoad: true },
  { x1: 480, y1: 30, x2: 480, y2: 510, isRoad: true },
  // Extra cross paths
  { x1: 160, y1: 470, x2: 160, y2: 510 },
  { x1: 720, y1: 480, x2: 720, y2: 510 },
  { x1: 80, y1: 510, x2: 900, y2: 510, isRoad: true },
];

const GREENS = [
  { x: 870, y: 60, w: 60, h: 60, r: 12 },
  { x: 870, y: 390, w: 60, h: 90, r: 14 },
  { x: 450, y: 160, w: 30, h: 40, r: 10 },
  { x: 200, y: 330, w: 50, h: 40, r: 10 },
  // Extra green areas
  { x: 30, y: 30, w: 40, h: 30, r: 8 },
  { x: 30, y: 480, w: 40, h: 40, r: 10 },
  { x: 500, y: 490, w: 45, h: 30, r: 8 },
  { x: 850, y: 180, w: 50, h: 50, r: 12 },
];

// Decorative objects (benches, fountains, parking)
const MAP_OBJECTS = [
  { type: "fountain", x: 480, y: 270, label: "🌊" },
  { type: "bench", x: 250, y: 185, label: "🪑" },
  { type: "bench", x: 640, y: 355, label: "🪑" },
  { type: "parking", x: 870, y: 270, label: "🅿️" },
  { type: "parking", x: 30, y: 270, label: "🅿️" },
  { type: "tree", x: 890, y: 80, label: "🌳" },
  { type: "tree", x: 890, y: 420, label: "🌳" },
  { type: "tree", x: 45, y: 40, label: "🌳" },
  { type: "gate", x: 480, y: 525, label: "🚪" },
];

// Heatmap zones: activity hotspots
const HEATMAP_ZONES = [
  // High activity - red
  { cx: 160, cy: 110, rx: 100, ry: 70, color: "rgba(239, 68, 68, 0.12)", level: "high" },
  { cx: 380, cy: 110, rx: 100, ry: 70, color: "rgba(239, 68, 68, 0.10)", level: "high" },
  { cx: 145, cy: 430, rx: 80, ry: 55, color: "rgba(239, 68, 68, 0.11)", level: "high" },
  { cx: 575, cy: 265, rx: 110, ry: 75, color: "rgba(239, 68, 68, 0.09)", level: "high" },
  // Medium activity - yellow/amber
  { cx: 590, cy: 105, rx: 90, ry: 60, color: "rgba(245, 158, 11, 0.10)", level: "medium" },
  { cx: 360, cy: 265, rx: 90, ry: 60, color: "rgba(245, 158, 11, 0.09)", level: "medium" },
  { cx: 800, cy: 260, rx: 100, ry: 80, color: "rgba(245, 158, 11, 0.10)", level: "medium" },
  { cx: 520, cy: 430, rx: 80, ry: 65, color: "rgba(245, 158, 11, 0.08)", level: "medium" },
  { cx: 720, cy: 430, rx: 90, ry: 65, color: "rgba(245, 158, 11, 0.08)", level: "medium" },
  { cx: 330, cy: 430, rx: 70, ry: 50, color: "rgba(245, 158, 11, 0.07)", level: "medium" },
];

function StickFigure({ x, y, facing, walking }: { x: number; y: number; facing: number; walking: boolean }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${facing < 0 ? -1 : 1}, 1)`}>
      <g className={walking ? "" : "animate-[bounce-gentle_2s_ease-in-out_infinite]"}>
        <circle cx="0" cy="-18" r="5" fill="hsl(var(--primary))" />
        <line x1="0" y1="-13" x2="0" y2="0" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <line x1="0" y1="-10" x2="-7" y2="-3" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="0" y1="-10" x2="7" y2="-3" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="-5" y2="10" stroke="hsl(var(--foreground))" strokeWidth="1.5" className={walking ? "origin-top animate-[legLeft_0.4s_ease-in-out_infinite]" : ""} />
        <line x1="0" y1="0" x2="5" y2="10" stroke="hsl(var(--foreground))" strokeWidth="1.5" className={walking ? "origin-top animate-[legRight_0.4s_ease-in-out_infinite]" : ""} />
      </g>
    </g>
  );
}

export default function CampusMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [charPos, setCharPos] = useState({ x: MAP_W / 2, y: MAP_H / 2 });
  const [facing, setFacing] = useState(1);
  const [walking, setWalking] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan] = useState({ x: 0, y: 0 });
  const keysRef = useRef<Set<string>>(new Set());
  const mouseTargetRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        e.preventDefault();
        keysRef.current.add(e.key.toLowerCase());
        mouseTargetRef.current = null;
      }
    };
    const up = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useEffect(() => {
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - prev) / 16, 3);
      prev = now;
      const keys = keysRef.current;
      let dx = 0, dy = 0;
      if (keys.has("arrowleft") || keys.has("a")) dx -= 3;
      if (keys.has("arrowright") || keys.has("d")) dx += 3;
      if (keys.has("arrowup") || keys.has("w")) dy -= 3;
      if (keys.has("arrowdown") || keys.has("s")) dy += 3;
      const keyMoving = dx !== 0 || dy !== 0;
      setCharPos(pos => {
        let nx = pos.x, ny = pos.y;
        if (keyMoving) {
          nx = Math.max(10, Math.min(MAP_W - 10, pos.x + dx * dt));
          ny = Math.max(10, Math.min(MAP_H - 10, pos.y + dy * dt));
        } else if (mouseTargetRef.current) {
          const tx = mouseTargetRef.current.x;
          const ty = mouseTargetRef.current.y;
          const ddx = tx - pos.x;
          const ddy = ty - pos.y;
          if (Math.abs(ddx) > 1 || Math.abs(ddy) > 1) {
            nx = pos.x + ddx * 0.08;
            ny = pos.y + ddy * 0.08;
          }
        }
        if (nx !== pos.x) setFacing(nx > pos.x ? 1 : -1);
        const isMoving = Math.abs(nx - pos.x) > 0.3 || Math.abs(ny - pos.y) > 0.3;
        setWalking(isMoving);
        return { x: nx, y: ny };
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const vb = svgRef.current.viewBox.baseVal;
    const mx = ((e.clientX - rect.left) / rect.width) * vb.width + vb.x;
    const my = ((e.clientY - rect.top) / rect.height) * vb.height + vb.y;
    const clicked = BUILDINGS.find(b => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h);
    if (clicked) {
      setSelectedId(prev => prev === clicked.id ? null : clicked.id);
    } else {
      mouseTargetRef.current = { x: mx, y: my };
      setSelectedId(null);
    }
  }, []);

  const handleSvgMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const vb = svgRef.current.viewBox.baseVal;
    const mx = ((e.clientX - rect.left) / rect.width) * vb.width + vb.x;
    const my = ((e.clientY - rect.top) / rect.height) * vb.height + vb.y;
    const hovered = BUILDINGS.find(b => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h);
    setHoveredId(hovered?.id ?? null);
    if (hovered) {
      setHoverPos({ x: e.clientX, y: e.clientY });
    }
  }, []);

  useEffect(() => {
    const inside = BUILDINGS.find(b =>
      charPos.x >= b.x && charPos.x <= b.x + b.w &&
      charPos.y >= b.y && charPos.y <= b.y + b.h
    );
    if (inside && !selectedId) {
      setSelectedId(inside.id);
    }
  }, [charPos, selectedId]);

  const selectedBuilding = selectedId ? buildingInfo[selectedId] : null;
  const hoveredBuilding = hoveredId ? buildingInfo[hoveredId] : null;

  const vbX = (MAP_W - MAP_W / zoom) / 2 - pan.x;
  const vbY = (MAP_H - MAP_H / zoom) / 2 - pan.y;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "min(70vh, 600px)" }}>
      <svg
        ref={svgRef}
        viewBox={`${vbX} ${vbY} ${MAP_W / zoom} ${MAP_H / zoom}`}
        className="w-full h-full rounded-xl border border-border bg-background"
        onClick={handleSvgClick}
        onMouseMove={handleSvgMouseMove}
        onMouseLeave={() => setHoveredId(null)}
        style={{ cursor: "crosshair" }}
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
          </pattern>
          {/* Heatmap radial gradients */}
          {HEATMAP_ZONES.map((zone, i) => (
            <radialGradient key={`hg${i}`} id={`heatmap-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={zone.level === "high" ? "rgba(239,68,68,0.25)" : "rgba(245,158,11,0.22)"} />
              <stop offset="60%" stopColor={zone.level === "high" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.06)"} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          ))}
        </defs>
        <rect x="0" y="0" width={MAP_W} height={MAP_H} fill="url(#grid)" />

        {/* Heatmap zones */}
        {HEATMAP_ZONES.map((zone, i) => (
          <ellipse key={`hz${i}`} cx={zone.cx} cy={zone.cy} rx={zone.rx} ry={zone.ry}
            fill={`url(#heatmap-${i})`} style={{ mixBlendMode: "screen" }} />
        ))}

        {GREENS.map((g, i) => (
          <rect key={`g${i}`} x={g.x} y={g.y} width={g.w} height={g.h} rx={g.r}
            fill="hsl(142,71%,45%)" opacity="0.15" />
        ))}

        {/* Roads and pathways */}
        {PATHWAYS.map((p, i) => {
          const isRoad = (p as any).isRoad;
          return (
            <line key={`p${i}`} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
              stroke={isRoad ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))"}
              strokeWidth={isRoad ? 6 : 3}
              opacity={isRoad ? 0.12 : 0.2}
              strokeDasharray={isRoad ? undefined : "6 4"} />
          );
        })}

        {/* Decorative objects */}
        {MAP_OBJECTS.map((obj, i) => (
          <text key={`obj${i}`} x={obj.x} y={obj.y} fontSize="14" textAnchor="middle" dominantBaseline="central"
            style={{ pointerEvents: "none" }}>{obj.label}</text>
        ))}

        {BUILDINGS.map(b => {
          const isSelected = selectedId === b.id;
          const isHovered = hoveredId === b.id;
          return (
            <g key={b.id} style={{ cursor: "pointer" }}>
              {isSelected && (
                <rect x={b.x - 4} y={b.y - 4} width={b.w + 8} height={b.h + 8} rx="10"
                  fill="none" stroke={b.color} strokeWidth="3" opacity="0.6"
                  className="animate-pulse-glow" />
              )}
              <rect
                x={b.x} y={b.y} width={b.w} height={b.h} rx="8"
                fill={b.color}
                opacity={isSelected ? 0.85 : isHovered ? 0.7 : 0.35}
                stroke={isSelected ? "hsl(var(--foreground))" : isHovered ? b.color : "transparent"}
                strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 0}
                style={{ transition: "opacity 0.2s, stroke 0.2s" }}
              />
              <text
                x={b.x + b.w / 2} y={b.y + b.h / 2}
                textAnchor="middle" dominantBaseline="central"
                fill="hsl(var(--foreground))"
                fontSize="11" fontWeight="600" fontFamily="Space Grotesk, sans-serif"
                style={{ pointerEvents: "none" }}
              >
                {b.label}
              </text>
            </g>
          );
        })}

        <StickFigure x={charPos.x} y={charPos.y} facing={facing} walking={walking} />
      </svg>

      {/* Hover tooltip with funny image and description */}
      {hoveredBuilding && hoveredId !== selectedId && (
        <div
          className="fixed z-50 glass px-4 py-3 pointer-events-none max-w-[240px]"
          style={{ left: hoverPos.x + 16, top: hoverPos.y - 60 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none">{hoveredBuilding.funnyImage}</span>
            <div>
              <p className="text-xs font-bold text-foreground mb-1">{hoveredBuilding.name}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{hoveredBuilding.funnyDesc}</p>
              <p className="text-[9px] text-primary mt-1">{hoveredBuilding.floors} Floors · {hoveredBuilding.hours}</p>
            </div>
          </div>
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        <button onClick={() => setZoom(z => Math.min(3, z + 0.3))} className="glass w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors">
          <ZoomIn size={16} />
        </button>
        <button onClick={() => setZoom(z => Math.max(0.5, z - 0.3))} className="glass w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors">
          <ZoomOut size={16} />
        </button>
      </div>

      <div className="absolute bottom-3 left-3 glass px-3 py-1.5 text-[10px] text-muted-foreground">
        Click to move · WASD/Arrows · Click buildings to explore
      </div>

      {/* Mobile D-pad */}
      <div className="absolute bottom-3 right-3 sm:hidden grid grid-cols-3 gap-0.5 w-24">
        <div />
        <button onTouchStart={() => keysRef.current.add("w")} onTouchEnd={() => keysRef.current.delete("w")}
          className="glass w-8 h-8 flex items-center justify-center text-foreground text-xs">↑</button>
        <div />
        <button onTouchStart={() => keysRef.current.add("a")} onTouchEnd={() => keysRef.current.delete("a")}
          className="glass w-8 h-8 flex items-center justify-center text-foreground text-xs">←</button>
        <div className="w-8 h-8" />
        <button onTouchStart={() => keysRef.current.add("d")} onTouchEnd={() => keysRef.current.delete("d")}
          className="glass w-8 h-8 flex items-center justify-center text-foreground text-xs">→</button>
        <div />
        <button onTouchStart={() => keysRef.current.add("s")} onTouchEnd={() => keysRef.current.delete("s")}
          className="glass w-8 h-8 flex items-center justify-center text-foreground text-xs">↓</button>
        <div />
      </div>

      {/* Selected building panel */}
      <AnimatePresence>
        {selectedBuilding && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-72 glass-strong p-4 overflow-y-auto z-40"
          >
            <button onClick={() => setSelectedId(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-3 mt-1">
              <span className="text-3xl">{selectedBuilding.funnyImage}</span>
              <h3 className="font-heading text-lg font-bold text-foreground">{selectedBuilding.name}</h3>
            </div>
            <p className="text-sm text-primary/80 italic mb-3">"{selectedBuilding.funnyDesc}"</p>
            <p className="text-sm text-muted-foreground mb-4">{selectedBuilding.description}</p>
            <div className="flex gap-4 mb-4 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground"><Layers size={14} />{selectedBuilding.floors} Floors</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Clock size={14} />{selectedBuilding.hours}</span>
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Key Facilities</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedBuilding.facilities.map(f => (
                <span key={f} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">{f}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
