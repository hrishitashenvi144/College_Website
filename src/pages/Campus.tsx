import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { buildingInfo } from "@/data/data";
import { Building2, Clock, Layers } from "lucide-react";

const Campus = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const buildings = Object.entries(buildingInfo);
  const selectedBuilding = selected ? buildingInfo[selected] : null;

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="pt-24 pb-8">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              Explore Our <span className="text-primary">Campus</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg">12 major buildings · 100+ acre campus · World-class facilities</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {buildings.map(([id, building], i) => (
              <ScrollReveal key={id} delay={i * 0.05}>
                <div onClick={() => setSelected(selected === id ? null : id)} className="cursor-pointer">
                  <GlowCard className={`transition-all ${selected === id ? "ring-2 ring-primary" : ""}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 size={20} className="text-primary" />
                      <h3 className="font-heading font-semibold text-foreground text-sm">{building.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{building.description}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Layers size={12} />{building.floors} Floors</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{building.hours}</span>
                    </div>
                  </GlowCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {selectedBuilding && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 pb-12"
          >
            <GlowCard className="max-w-2xl mx-auto" hover={false}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">{selectedBuilding.name}</h2>
              <p className="text-muted-foreground text-sm mb-4">{selectedBuilding.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm"><span className="text-muted-foreground">Floors:</span> <span className="text-foreground">{selectedBuilding.floors}</span></div>
                <div className="text-sm"><span className="text-muted-foreground">Hours:</span> <span className="text-foreground">{selectedBuilding.hours}</span></div>
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Key Facilities</h4>
              <div className="flex flex-wrap gap-2">
                {selectedBuilding.facilities.map((f) => (
                  <span key={f} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">{f}</span>
                ))}
              </div>
            </GlowCard>
          </motion.section>
        )}

        <Footer />
      </PageWrapper>
    </>
  );
};

export default Campus;
