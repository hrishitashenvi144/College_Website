import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { timelineData, leadershipTeam } from "@/data/data";
import { Eye, Target } from "lucide-react";

const AboutStat = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const { count, ref } = useCounterAnimation(value);
  return (
    <GlowCard className="text-center">
      <div ref={ref} className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </GlowCard>
  );
};

const About = () => {
  const { accentColor } = useTheme();
  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground count={60} color={accentColor} />
          <div className="relative z-10 text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Legacy</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">14 years of excellence in education, research, and innovation.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <GlowCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Eye size={24} /></div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-foreground/70">To be a globally recognized university fostering innovation, critical thinking, and ethical leadership, transforming students into change-makers who shape a better world.</p>
              </GlowCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GlowCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Target size={24} /></div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-foreground/70">To provide transformative education through cutting-edge curriculum, world-class research, industry collaboration, and a commitment to social responsibility and inclusive growth.</p>
              </GlowCard>
            </ScrollReveal>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <ScrollReveal><h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Our <span className="text-primary">Journey</span></h2></ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />
            {timelineData.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div className={`relative flex items-center mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 z-10 animate-pulse-glow" />
                  <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                    <GlowCard>
                      <span className="text-primary font-heading font-bold text-lg">{item.year}</span>
                      <h3 className="font-heading font-semibold text-foreground mt-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </GlowCard>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <ScrollReveal><h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Leadership <span className="text-primary">Team</span></h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipTeam.map((leader, i) => (
              <ScrollReveal key={leader.name} delay={i * 0.1}>
                <GlowCard className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-2xl mx-auto mb-4">
                    {leader.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">{leader.name}</h3>
                  <p className="text-primary text-sm mb-2">{leader.designation}</p>
                  <p className="text-sm text-muted-foreground">{leader.bio}</p>
                  <p className="text-xs text-muted-foreground mt-2">{leader.publications} Publications</p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AboutStat label="Alumni in Countries" value={45} suffix="+" />
            <AboutStat label="Industry Partners" value={200} suffix="+" />
            <AboutStat label="Patents Filed" value={120} suffix="+" />
            <AboutStat label="Scholarships Awarded" value={50} suffix="Cr+" />
          </div>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default About;
