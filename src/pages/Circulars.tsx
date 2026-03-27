import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { Bell, FileText, AlertTriangle, Calendar, ChevronDown, ChevronUp, Pin } from "lucide-react";

type CircularType = "academic" | "administrative" | "exam" | "event" | "urgent";

interface Circular {
  id: number;
  title: string;
  date: string;
  type: CircularType;
  department: string;
  content: string;
  pinned?: boolean;
}

const circulars: Circular[] = [
  { id: 1, title: "Mid-Semester Examination Schedule — Spring 2025", date: "March 25, 2025", type: "exam", department: "Examination Cell", content: "Mid-semester examinations for all UG and PG programs will commence from April 7, 2025. Students must collect their hall tickets from the respective department offices by April 3. Seating arrangement will be published on the notice board and student portal.", pinned: true },
  { id: 2, title: "URGENT: Campus Closed on March 31 — Holi Holiday", date: "March 24, 2025", type: "urgent", department: "Administration", content: "The university campus will remain closed on March 31, 2025, on account of Holi. All offices, labs, and library will be non-operational. Hostel mess will function as usual. Wishing everyone a colorful and safe Holi!", pinned: true },
  { id: 3, title: "Workshop on Machine Learning with Python — April 5", date: "March 22, 2025", type: "event", department: "CSE Department", content: "A hands-on workshop on Machine Learning using Python will be conducted on April 5, 2025, at the AI Lab (Research Block, Floor 3). Limited to 60 seats. Register on the student portal by March 30. Faculty coordinator: Dr. Neha Gupta." },
  { id: 4, title: "Revised Academic Calendar 2024-25", date: "March 20, 2025", type: "academic", department: "Academic Affairs", content: "The revised academic calendar for the session 2024-25 has been uploaded on the university website. Key changes: Summer break starts May 15 (previously May 20). Supplementary exams rescheduled to June 10-20. All HODs are requested to inform students." },
  { id: 5, title: "Hostel Fee Payment Deadline Extended", date: "March 18, 2025", type: "administrative", department: "Finance Office", content: "The deadline for hostel fee payment for Spring 2025 has been extended to April 5, 2025. Late fee of ₹500/day will apply after the deadline. Pay via the student portal or at the finance counter (Admin Block, Ground Floor)." },
  { id: 6, title: "Annual Sports Meet 2025 — Registration Open", date: "March 15, 2025", type: "event", department: "Sports Department", content: "Registrations for the Annual Sports Meet 2025 are now open. Events include Athletics, Cricket, Football, Basketball, Badminton, Table Tennis, Chess, and Swimming. Register department-wise through your sports coordinator by March 28." },
  { id: 7, title: "PhD Viva-Voce Schedule — March-April 2025", date: "March 14, 2025", type: "exam", department: "Research & Development", content: "PhD viva-voce examinations for 12 scholars have been scheduled between March 25 - April 15, 2025. Detailed schedule with venue, examiner, and time slots has been shared with respective supervisors. All are welcome to attend." },
  { id: 8, title: "Anti-Ragging Committee Meeting Notice", date: "March 12, 2025", type: "administrative", department: "Dean of Students", content: "All members of the Anti-Ragging Committee are requested to attend a mandatory meeting on March 20, 2025, at 3:00 PM in the Conference Room (Admin Block, 2nd Floor). Agenda: Review of complaints, awareness campaign planning." },
  { id: 9, title: "Guest Lecture: Future of Quantum Computing", date: "March 10, 2025", type: "event", department: "Physics Department", content: "Dr. John Mitchell from MIT will deliver a guest lecture on 'The Future of Quantum Computing' on March 22 at the Grand Auditorium, 10:00 AM. All students and faculty are invited. No registration required." },
  { id: 10, title: "Library Books Return Notice — End of Semester", date: "March 8, 2025", type: "academic", department: "Central Library", content: "All students are requested to return borrowed library books by April 10, 2025. Overdue fines: ₹5/day per book. Students with pending dues will not be issued hall tickets for examinations." },
  { id: 11, title: "Internship Fair 2025 — April 12", date: "March 5, 2025", type: "event", department: "Training & Placement Cell", content: "The annual Internship Fair will be held on April 12, 2025, at the Convention Center. 50+ companies confirmed. Eligible: Pre-final year students. Bring 3 copies of resume. Dress code: Formal." },
  { id: 12, title: "NAAC Peer Team Visit — Preparations", date: "March 3, 2025", type: "urgent", department: "IQAC", content: "The NAAC Peer Team will visit the university from April 20-22, 2025, for re-accreditation. All departments must ensure documentation is updated. Cleanliness drives to be conducted campus-wide. Department coordinators to submit self-study reports by March 25." },
];

const typeConfig: Record<CircularType, { label: string; icon: typeof Bell; color: string; bg: string }> = {
  academic: { label: "Academic", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
  administrative: { label: "Administrative", icon: Bell, color: "text-amber-400", bg: "bg-amber-500/10" },
  exam: { label: "Examination", icon: Calendar, color: "text-purple-400", bg: "bg-purple-500/10" },
  event: { label: "Event", icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  urgent: { label: "Urgent", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
};

const Circulars = () => {
  const { accentColor } = useTheme();
  const [filter, setFilter] = useState<CircularType | "all">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = circulars
    .filter((c) => filter === "all" || c.type === filter)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground count={40} color={accentColor} />
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4"
            >
              Circulars & <span className="text-primary">Notices</span>
            </motion.h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Official announcements, exam schedules, and campus notifications.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {(["all", "urgent", "exam", "academic", "event", "administrative"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === t
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t === "all" ? "All" : typeConfig[t].label}
              </button>
            ))}
          </div>

          {/* Circulars List */}
          <div className="max-w-3xl mx-auto space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((circular) => {
                const config = typeConfig[circular.type];
                const Icon = config.icon;
                const isExpanded = expandedId === circular.id;

                return (
                  <motion.div
                    key={circular.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <GlowCard className="!p-0 overflow-hidden">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : circular.id)}
                        className="w-full text-left p-4 flex items-start gap-3"
                      >
                        <div className={`p-2 rounded-lg ${config.bg} mt-0.5`}>
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {circular.pinned && <Pin className="w-3 h-3 text-primary" />}
                            <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                            <span className="text-xs text-muted-foreground">• {circular.date}</span>
                          </div>
                          <h3 className="font-heading font-semibold text-foreground text-sm leading-snug">
                            {circular.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">{circular.department}</p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0 border-t border-border">
                              <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
                                {circular.content}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default Circulars;
