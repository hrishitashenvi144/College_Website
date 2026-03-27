import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ScrollReveal from "@/hooks/useScrollReveal";
import CampusMap from "@/components/campus/CampusMap";

const Campus = () => {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="pt-24 pb-8">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              Explore Our <span className="text-primary">Campus</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg mb-2">12 major buildings · 100+ acre campus · World-class facilities</p>
            <p className="text-muted-foreground text-sm">Move the stick figure with your mouse or WASD keys. Click buildings to learn more.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <ScrollReveal>
            <CampusMap />
          </ScrollReveal>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default Campus;
