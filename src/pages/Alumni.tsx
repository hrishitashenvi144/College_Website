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
import { alumni, events } from "@/data/data";
import { Search, ExternalLink } from "lucide-react";

const AStat = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const { count, ref } = useCounterAnimation(value);
  return (
    <GlowCard className="text-center">
      <div ref={ref} className="text-3xl font-heading font-bold text-primary">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </GlowCard>
  );
};

const Alumni = () => {
  const { accentColor } = useTheme();
  const [search, setSearch] = useState("");
  const filtered = alumni.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground count={50} color={accentColor} />
          <div className="relative z-10 text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              Join <span className="text-primary">100,000+</span> Alumni
            </motion.h1>
            <p className="text-muted-foreground text-lg">A global network of leaders, innovators, and changemakers.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AStat label="Alumni in Countries" value={60} suffix="+" />
            <AStat label="CEOs & Founders" value={500} suffix="+" />
            <AStat label="Donated to Diastas" value={200} suffix="Cr+" />
            <AStat label="Alumni Mentors" value={1000} suffix="+" />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-8">Alumni <span className="text-primary">Directory</span></h2></ScrollReveal>
          <div className="max-w-md mx-auto mb-8 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text" placeholder="Search alumni..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted text-foreground border border-border focus:border-primary outline-none text-sm"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 0.05}>
                <GlowCard>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold">{a.name.charAt(0)}</div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{a.name}</h3>
                      <p className="text-xs text-muted-foreground">Batch {a.batch}</p>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium">{a.role}</p>
                  <p className="text-xs text-muted-foreground mb-3">{a.company}</p>
                  <p className="text-xs text-foreground/70 mb-3">{a.achievement}</p>
                  <a href={a.linkedIn} className="text-xs text-primary flex items-center gap-1 hover:underline">
                    <ExternalLink size={12} /> LinkedIn
                  </a>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-8">Alumni <span className="text-primary">Events</span></h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {events.filter((e) => e.type === "Alumni" || e.type === "Career").map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.1}>
                <GlowCard>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{event.type}</span>
                  <h3 className="font-heading font-semibold text-foreground mt-2">{event.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{event.date} · {event.location}</p>
                  <p className="text-sm text-foreground/70 mt-2">{event.description}</p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Donation */}
        <section className="container mx-auto px-4 py-16">
          <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Help Shape the Next Generation</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">Your contribution supports scholarships, research, and infrastructure for future students.</p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { tier: "Supporter", amount: "₹5,000/yr", perks: ["Certificate", "Newsletter", "Alumni Directory"] },
                { tier: "Champion", amount: "₹25,000/yr", perks: ["All Supporter perks", "Campus Events Access", "Mentorship Program"] },
                { tier: "Patron", amount: "₹1,00,000+/yr", perks: ["All Champion perks", "Named Scholarship", "Advisory Board Seat"] },
              ].map((d) => (
                <GlowCard key={d.tier} className="text-center">
                  <h3 className="font-heading font-bold text-primary text-lg">{d.tier}</h3>
                  <p className="text-2xl font-heading font-bold text-foreground my-2">{d.amount}</p>
                  <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                    {d.perks.map((p) => <li key={p}>✓ {p}</li>)}
                  </ul>
                  <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Donate Now</button>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default Alumni;
