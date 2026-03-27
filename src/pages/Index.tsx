import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, GraduationCap, BookOpen, FlaskConical, MapPin, Users, Award, ArrowRight, TrendingUp } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";
import ParallaxConstellation from "@/components/hero/ParallaxConstellation";
import GlowCard from "@/components/ui/GlowCard";
import StatsCounter from "@/components/shared/StatsCounter";
import AnnouncementTicker from "@/components/shared/AnnouncementTicker";
import ScrollReveal from "@/hooks/useScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { testimonials } from "@/data/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";

const taglines = [
  "Where Innovation Meets Excellence",
  "Building Tomorrow's Leaders Today",
  "Research. Discover. Transform.",
];

const quickLinks = [
  { label: "Admissions", icon: GraduationCap, path: "/admissions", desc: "Apply now for 2025-26" },
  { label: "Courses", icon: BookOpen, path: "/academics", desc: "Explore 100+ programs" },
  { label: "Research", icon: FlaskConical, path: "/research", desc: "Innovation at its best" },
  { label: "Campus Tour", icon: MapPin, path: "/campus", desc: "Explore our campus" },
  { label: "Alumni", icon: Users, path: "/alumni", desc: "Join our network" },
  { label: "Placements", icon: TrendingUp, path: "/placements", desc: "95% placement rate" },
];

// Dancing Stick Figure Component
const DancingStickFigure = () => {
  return (
    <motion.svg
      width="120"
      height="180"
      viewBox="0 0 120 180"
      className="mx-auto mb-6"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
    >
      {/* Head */}
      <motion.circle
        cx="60" cy="30" r="14"
        fill="hsl(var(--primary))"
        animate={{ y: [0, -5, 0, -3, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Eyes */}
      <motion.circle cx="55" cy="28" r="2" fill="hsl(var(--primary-foreground))"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.circle cx="65" cy="28" r="2" fill="hsl(var(--primary-foreground))"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Smile */}
      <path d="M54 34 Q60 40 66 34" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" />
      {/* Body */}
      <motion.line
        x1="60" y1="44" x2="60" y2="100"
        stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"
        animate={{ x2: [60, 62, 60, 58, 60] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Left Arm - floss dance */}
      <motion.line
        x1="60" y1="60" x2="30" y2="75"
        stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round"
        animate={{
          x2: [30, 90, 30, 90, 30],
          y2: [75, 55, 75, 55, 75],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right Arm - floss dance (opposite) */}
      <motion.line
        x1="60" y1="60" x2="90" y2="75"
        stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round"
        animate={{
          x2: [90, 30, 90, 30, 90],
          y2: [55, 75, 55, 75, 55],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Left Leg */}
      <motion.line
        x1="60" y1="100" x2="40" y2="150"
        stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round"
        animate={{
          x2: [40, 50, 40, 50, 40],
        }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right Leg */}
      <motion.line
        x1="60" y1="100" x2="80" y2="150"
        stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round"
        animate={{
          x2: [80, 70, 80, 70, 80],
        }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Shoes */}
      <motion.ellipse cx="40" cy="152" rx="8" ry="4" fill="hsl(var(--primary))"
        animate={{ cx: [40, 50, 40, 50, 40] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse cx="80" cy="152" rx="8" ry="4" fill="hsl(var(--primary))"
        animate={{ cx: [80, 70, 80, 70, 80] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

const Home = () => {
  const { accentColor } = useTheme();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = taglines[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 50);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTaglineIndex((i) => (i + 1) % taglines.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, taglineIndex]);

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground count={100} color={accentColor} />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block glass px-4 py-2 rounded-full text-sm text-primary mb-6"
            >
              🏆 Ranked #1 in NCR Region
            </motion.div>

            {/* Dancing Stick Figure */}
            <DancingStickFigure />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-6"
              style={{ animation: "glitch 4s infinite" }}
            >
              DIASTAS
              <br />
              <span className="text-primary">UNIVERSITY</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 h-8 font-heading"
            >
              {taglines[taglineIndex].substring(0, charIndex)}
              <span className="animate-pulse">|</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/academics"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-all glow"
              >
                Explore Programs
              </Link>
              <Link
                to="/campus"
                className="px-8 py-3 glass text-foreground rounded-xl font-heading font-semibold text-lg hover:border-primary/50 transition-all"
              >
                Take Campus Tour
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-muted-foreground" size={32} />
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-16 -mt-10 relative z-10">
          <ScrollReveal>
            <StatsCounter />
          </ScrollReveal>
        </section>

        {/* Ticker */}
        <ScrollReveal>
          <AnnouncementTicker />
        </ScrollReveal>

        {/* Quick Links */}
        <section className="container mx-auto px-4 py-20">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Quick <span className="text-primary">Access</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <Link to={item.path}>
                  <GlowCard className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </GlowCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-20">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Student <span className="text-primary">Voices</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlowCard className="h-full flex flex-col">
                  <p className="text-foreground/80 italic mb-4 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.program} · {t.batch}</div>
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default Home;
