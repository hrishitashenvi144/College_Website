import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Monitor, Cog, Heart, Palette, BarChart3, Scale, Atom, Globe } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { departments, courses } from "@/data/data";

const iconMap: Record<string, React.ElementType> = { Monitor, Cog, Heart, Palette, BarChart3, Scale, Atom, Globe };

const DeptAnimation = ({ type }: { type: string }) => {
  switch (type) {
    case "terminal":
      return (
        <div className="font-mono text-xs text-primary/60 overflow-hidden whitespace-nowrap" style={{ animation: "terminal-type 4s steps(20) infinite" }}>
          {">"} sudo make future_
        </div>
      );
    case "gears":
      return (
        <div className="flex gap-0.5 text-primary/40">
          <Cog size={16} style={{ animation: "gear-rotate 4s linear infinite" }} />
          <Cog size={12} style={{ animation: "gear-rotate 4s linear infinite reverse", marginTop: 4 }} />
        </div>
      );
    case "heartbeat":
      return <div className="w-full h-0.5 bg-primary/30 rounded" style={{ animation: "heartbeat-line 2s linear infinite" }} />;
    case "orbit":
      return (
        <div className="relative w-8 h-8">
          <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50" />
          <div className="absolute inset-0" style={{ animation: "orbit 3s linear infinite" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>
      );
    case "bars":
      return (
        <div className="flex items-end gap-0.5 h-5">
          {[0, 0.2, 0.4, 0.6].map((d, i) => (
            <div key={i} className="w-1.5 bg-primary/40 rounded-t" style={{ height: "100%", animation: `bars-rise 2s ease-in-out ${d}s infinite`, transformOrigin: "bottom" }} />
          ))}
        </div>
      );
    case "globe":
      return <Globe size={16} className="text-primary/40" style={{ animation: "globe-spin 4s linear infinite" }} />;
    default:
      return null;
  }
};

const Academics = () => {
  const { accentColor } = useTheme();
  const [filter, setFilter] = useState<string>("all");
  const levels = ["all", "UG", "PG", "PhD"];

  const filteredCourses = filter === "all" ? courses : courses.filter((c) => c.level === filter);

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground count={50} color={accentColor} />
          <div className="relative z-10 text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              Discover Your <span className="text-primary">Path</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg">8 Schools · 100+ Programs · World-class Faculty</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-12">Our <span className="text-primary">Departments</span></h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {departments.map((dept, i) => {
              const Icon = iconMap[dept.icon] || Monitor;
              return (
                <ScrollReveal key={dept.id} delay={i * 0.05}>
                  <GlowCard className="h-full group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary" style={{ backgroundColor: `${dept.color}15` }}>
                        <Icon size={20} />
                      </div>
                      <DeptAnimation type={dept.animationType} />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">{dept.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{dept.school}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{dept.programCount} Programs</span>
                      <span>{dept.facultyCount} Faculty</span>
                    </div>
                  </GlowCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-8">Course <span className="text-primary">Catalog</span></h2></ScrollReveal>
          <div className="flex justify-center gap-2 mb-8">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === l ? "bg-primary text-primary-foreground" : "glass text-foreground hover:text-primary"
                }`}
              >
                {l === "all" ? "All" : l}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course, i) => (
              <ScrollReveal key={course.id} delay={i * 0.05}>
                <GlowCard>
                  <h3 className="font-heading font-semibold text-foreground text-sm mb-2">{course.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{course.level}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{course.duration}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{course.seats} Seats</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{course.eligibility}</p>
                  <div className="flex gap-2">
                    <button className="text-xs text-primary hover:underline">View Details</button>
                    <button className="text-xs text-muted-foreground hover:text-foreground">Download Syllabus</button>
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

export default Academics;
