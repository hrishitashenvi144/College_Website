import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { researchLabs, publications, collaborations } from "@/data/data";
import { Search } from "lucide-react";

const RStat = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const { count, ref } = useCounterAnimation(value);
  return (
    <div className="text-center" ref={ref}>
      <div className="text-3xl font-heading font-bold text-primary">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const Research = () => {
  const { accentColor } = useTheme();
  const [search, setSearch] = useState("");
  const [collabFilter, setCollabFilter] = useState("All");

  const filtered = publications.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.domain.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCollabs = collabFilter === "All" ? collaborations : collaborations.filter((c) => c.type === collabFilter);

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground count={50} color={accentColor} />
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="text-6xl md:text-9xl font-heading font-bold text-primary animate-float">∑ ∫ ∇ λ π</div>
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              Research & <span className="text-primary">Innovation</span>
            </motion.h1>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="glass-strong p-6 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-6">
            <RStat label="Active Projects" value={87} suffix="" />
            <RStat label="Publications This Year" value={430} suffix="+" />
            <RStat label="Research Labs" value={24} suffix="" />
            <RStat label="Funding Secured" value={120} suffix="Cr+" />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-12">Research <span className="text-primary">Labs</span></h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {researchLabs.map((lab, i) => (
              <ScrollReveal key={lab.id} delay={i * 0.1}>
                <GlowCard className="h-full">
                  <h3 className="font-heading font-semibold text-foreground mb-2">{lab.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{lab.focus}</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Lead: <span className="text-foreground">{lab.leadResearcher}</span></p>
                    <p>Est. {lab.established} · {lab.recentPublications} Publications</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {lab.equipment.map((e) => (
                      <span key={e} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">{e}</span>
                    ))}
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-8">Publications <span className="text-primary">Explorer</span></h2></ScrollReveal>
          <div className="max-w-md mx-auto mb-8 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search publications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted text-foreground border border-border focus:border-primary outline-none text-sm"
            />
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.map((pub, i) => (
              <ScrollReveal key={pub.id} delay={i * 0.05}>
                <GlowCard>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{pub.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{pub.authors.join(", ")} · {pub.journal} · {pub.year}</p>
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">{pub.domain}</span>
                    <span className="text-xs text-muted-foreground">{pub.citations} citations</span>
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-4">Global <span className="text-primary">Collaborations</span></h2></ScrollReveal>
          <p className="text-center text-muted-foreground mb-8">{collaborations.length} Active Collaborations Across 20+ Countries</p>
          <div className="flex justify-center gap-2 mb-8">
            {["All", "Research", "Exchange", "Publication"].map((t) => (
              <button key={t} onClick={() => setCollabFilter(t)} className={`px-4 py-2 rounded-lg text-sm ${collabFilter === t ? "bg-primary text-primary-foreground" : "glass text-foreground"}`}>{t}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredCollabs.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.03}>
                <GlowCard className="!p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{c.institution}</h4>
                      <p className="text-xs text-muted-foreground">{c.country} · {c.type} · {c.year}</p>
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

export default Research;
