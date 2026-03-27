import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { placementStats, placementHighlights } from "@/data/data";
import { TrendingUp, Trophy, Building2, Users, Briefcase, Star, ChevronDown, ChevronUp } from "lucide-react";

const PStat = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const { count, ref } = useCounterAnimation(value);
  return (
    <GlowCard className="text-center">
      <div ref={ref} className="text-3xl font-heading font-bold text-primary">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </GlowCard>
  );
};

// EXP Bar Component with department breakdown
const ExpBar = ({ company, hires, avgPackage, logo, index, deptBreakdown }: {
  company: string; hires: number; avgPackage: string; logo: string; index: number;
  deptBreakdown: Record<string, number>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expanded, setExpanded] = useState(false);
  const maxHires = 120;
  const percentage = (hires / maxHires) * 100;

  const deptColors = ["bg-primary", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-rose-500"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <GlowCard className="!p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{logo}</span>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground text-sm">{company}</h3>
              <p className="text-xs text-muted-foreground">{avgPackage} avg</p>
            </div>
            <div className="text-right flex items-center gap-2">
              <div>
                <span className="text-primary font-heading font-bold text-lg">{hires}</span>
                <span className="text-xs text-muted-foreground ml-1">hires</span>
              </div>
              {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>
        </button>
        {/* EXP Bar */}
        <div className="relative h-6 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/80 to-primary flex items-center justify-end pr-2"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          >
            <span className="text-[10px] font-bold text-primary-foreground whitespace-nowrap">
              EXP {Math.round(percentage)}%
            </span>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "200%" } : {}}
            transition={{ delay: index * 0.1 + 1.3, duration: 0.8 }}
          />
        </div>
        {/* Department Breakdown */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-border space-y-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">Department-wise Placement %</p>
                {Object.entries(deptBreakdown).map(([dept, pct], i) => (
                  <div key={dept} className="flex items-center gap-2">
                    <span className="text-xs text-foreground w-12 shrink-0">{dept}</span>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${deptColors[i % deptColors.length]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground w-10 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowCard>
    </motion.div>
  );
};

// Stick figure jumping into company
const HiringAnimation = ({ company, logo, index }: { company: string; logo: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowPopup(true), index * 300 + 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      <GlowCard className="!p-4 w-full text-center relative overflow-visible">
        {/* Company logo */}
        <div className="text-4xl mb-2">{logo}</div>
        <h4 className="font-heading font-semibold text-foreground text-sm">{company}</h4>

        {/* Stick figure jumping in */}
        <motion.svg
          width="40" height="60" viewBox="0 0 40 60"
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          initial={{ y: -80, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            delay: index * 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {/* Head */}
          <circle cx="20" cy="8" r="6" fill="hsl(var(--primary))" />
          {/* Body */}
          <line x1="20" y1="14" x2="20" y2="32" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Arms raised in celebration */}
          <motion.line
            x1="20" y1="20" x2="8" y2="12"
            stroke="hsl(var(--foreground))" strokeWidth="1.5"
            animate={showPopup ? { x2: [8, 6, 8], y2: [12, 10, 12] } : {}}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          <motion.line
            x1="20" y1="20" x2="32" y2="12"
            stroke="hsl(var(--foreground))" strokeWidth="1.5"
            animate={showPopup ? { x2: [32, 34, 32], y2: [12, 10, 12] } : {}}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          {/* Legs */}
          <line x1="20" y1="32" x2="12" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <line x1="20" y1="32" x2="28" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        </motion.svg>

        {/* Level Up / Hired popup */}
        {showPopup && (
          <motion.div
            className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <div className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-bold shadow-lg glow">
              {index % 2 === 0 ? "🎮 Level Up!" : "✅ Hired!"}
            </div>
          </motion.div>
        )}
      </GlowCard>
    </div>
  );
};

const Placements = () => {
  const { accentColor } = useTheme();

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground count={60} color={accentColor} />
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block glass px-4 py-2 rounded-full text-sm text-primary mb-4"
            >
              🎮 The Level Up Page
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4"
            >
              Placements & <span className="text-primary">Careers</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Where talent meets opportunity. Our graduates don't just get jobs — they level up.
            </p>
          </div>
        </section>

        {/* Highlight Stats */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <PStat label="Total Offers" value={placementHighlights.totalOffers} suffix="" />
            <PStat label="Companies Visited" value={placementHighlights.companiesVisited} suffix="+" />
            <PStat label="Placement Rate" value={placementHighlights.placementRate} suffix="%" />
            <PStat label="Internship Conversion" value={placementHighlights.internshipConversion} suffix="%" />
            <GlowCard className="text-center">
              <div className="text-3xl font-heading font-bold text-primary">{placementHighlights.highestPackage}</div>
              <div className="text-sm text-muted-foreground">Highest Package</div>
            </GlowCard>
            <GlowCard className="text-center">
              <div className="text-3xl font-heading font-bold text-primary">{placementHighlights.averagePackage}</div>
              <div className="text-sm text-muted-foreground">Average Package</div>
            </GlowCard>
          </div>
        </section>

        {/* EXP Bars - Company Stats */}
        <section className="container mx-auto px-4 py-16">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              Company <span className="text-primary">EXP Bars</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10">Each bar represents hiring volume — watch them fill up!</p>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-3">
            {placementStats.map((stat, i) => (
              <ExpBar key={stat.company} {...stat} index={i} />
            ))}
          </div>
        </section>

        {/* Hiring Animations */}
        <section className="container mx-auto px-4 py-16">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-center mb-4">
              Watch Them Get <span className="text-primary">Hired!</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10">Scroll down to see stick figures jump into their dream companies 🎮</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {placementStats.map((stat, i) => (
              <HiringAnimation key={stat.company} company={stat.company} logo={stat.logo} index={i} />
            ))}
          </div>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default Placements;
