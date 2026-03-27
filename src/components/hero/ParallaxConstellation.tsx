import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  label: string;
  depth: number; // 1-3 for parallax layers
  pulseSpeed: number;
  color: string;
}

const achievements = [
  "🏆 NIRF Top 50",
  "🎓 95% Placements",
  "📚 120+ Research Papers",
  "🌍 30+ Global Partners",
  "💡 500+ Patents Filed",
  "🥇 SAE BAJA Champions",
  "🔬 ₹120Cr Research Fund",
  "🏅 NAAC A+ Grade",
  "⚡ Quantum Computing Lab",
  "🎯 42 LPA Highest Package",
  "🚀 50+ Startups Incubated",
  "📖 100K+ Library Books",
  "🎭 National Moot Court Winners",
  "💻 Google x 12 Hires",
  "🧬 Nature Published Research",
  "🌟 20,000+ Students",
  "🏗️ Innovation Hub",
  "🎪 Annual Tech Fest IGNITE",
  "🏥 500-Bed Teaching Hospital",
  "🤖 AI & ML Center of Excellence",
];

const starColors = [
  "hsl(217, 91%, 70%)",
  "hsl(45, 93%, 75%)",
  "hsl(0, 0%, 95%)",
  "hsl(270, 70%, 75%)",
  "hsl(187, 86%, 65%)",
  "hsl(142, 71%, 65%)",
];

function generateStars(count: number, w: number, h: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const isAchievement = i < achievements.length;
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: isAchievement ? 3 + Math.random() * 3 : 1 + Math.random() * 2,
      brightness: 0.4 + Math.random() * 0.6,
      label: isAchievement ? achievements[i] : "",
      depth: Math.ceil(Math.random() * 3),
      pulseSpeed: 2 + Math.random() * 4,
      color: isAchievement
        ? starColors[i % starColors.length]
        : `hsl(0, 0%, ${70 + Math.random() * 30}%)`,
    });
  }
  return stars;
}

export default function ParallaxConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const starsRef = useRef<Star[]>([]);
  const [hoveredStar, setHoveredStar] = useState<{ label: string; x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const getStarScreenPos = useCallback((star: Star, mx: number, my: number, w: number, h: number) => {
    const parallaxStrength = star.depth * 15;
    const ox = (mx - 0.5) * parallaxStrength;
    const oy = (my - 0.5) * parallaxStrength;
    return {
      sx: star.x + ox,
      sy: star.y + oy,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      starsRef.current = generateStars(80, rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      timeRef.current += 0.016;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const stars = starsRef.current;

      // Draw connection lines between nearby achievement stars
      for (let i = 0; i < Math.min(achievements.length, stars.length); i++) {
        const a = stars[i];
        const ap = getStarScreenPos(a, mx, my, w, h);
        for (let j = i + 1; j < Math.min(achievements.length, stars.length); j++) {
          const b = stars[j];
          const bp = getStarScreenPos(b, mx, my, w, h);
          const dist = Math.hypot(ap.sx - bp.sx, ap.sy - bp.sy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(ap.sx, ap.sy);
            ctx.lineTo(bp.sx, bp.sy);
            ctx.strokeStyle = `rgba(147, 178, 244, ${0.08 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      for (const star of stars) {
        const { sx, sy } = getStarScreenPos(star, mx, my, w, h);
        const pulse = Math.sin(timeRef.current * (Math.PI * 2) / star.pulseSpeed) * 0.3 + 0.7;
        const r = star.size * pulse;

        // Glow
        if (star.label) {
          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 6);
          gradient.addColorStop(0, star.color.replace(")", ", 0.3)").replace("hsl", "hsla"));
          gradient.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(sx, sy, r * 6, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Star dot
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness * pulse;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [getStarScreenPos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x: mx, y: my };

    // Check hover on achievement stars
    const stars = starsRef.current;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let found: { label: string; x: number; y: number } | null = null;
    for (let i = 0; i < Math.min(achievements.length, stars.length); i++) {
      const star = stars[i];
      const { sx, sy } = getStarScreenPos(star, mx, my, rect.width, rect.height);
      if (Math.hypot(px - sx, py - sy) < 20) {
        found = { label: star.label, x: sx, y: sy };
        break;
      }
    }
    setHoveredStar(found);
  }, [getStarScreenPos]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      {hoveredStar && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-20 glass px-3 py-1.5 rounded-full text-xs font-semibold text-foreground pointer-events-none whitespace-nowrap"
          style={{ left: hoveredStar.x, top: hoveredStar.y - 30, transform: "translateX(-50%)" }}
        >
          {hoveredStar.label}
        </motion.div>
      )}
    </div>
  );
}
