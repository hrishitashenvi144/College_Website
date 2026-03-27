import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DOMPurify from "dompurify";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { useTheme } from "@/context/ThemeContext";
import { faqItems, admissionDates, departments } from "@/data/data";
import { CheckCircle2, ChevronDown, AlertCircle } from "lucide-react";

const applicationSchema = z.object({
  name: z.string().min(2, "Name is required").max(100).transform((v) => DOMPurify.sanitize(v)),
  email: z.string().email("Invalid email").max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian phone number"),
  tenthMarks: z.coerce.number().min(0).max(100, "Must be 0-100"),
  twelfthMarks: z.coerce.number().min(0).max(100, "Must be 0-100"),
  department: z.string().min(1, "Select a department"),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof applicationSchema>;

const steps = ["Check Eligibility", "Fill Application", "Upload Documents", "Pay Fee", "Confirm Seat"];

const Admissions = () => {
  const { accentColor } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [eligibility, setEligibility] = useState<{ program: string; marks: string; result: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = (data: FormData) => {
    if (data.website && data.website.length > 0) return;
    setSubmitted(true);
  };

  const checkEligibility = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const program = fd.get("program") as string;
    const marks = parseFloat(fd.get("marks") as string);
    if (marks >= 60) setEligibility({ program, marks: `${marks}%`, result: "eligible" });
    else if (marks >= 45) setEligibility({ program, marks: `${marks}%`, result: "check" });
    else setEligibility({ program, marks: `${marks}%`, result: "not-eligible" });
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <ParticleBackground count={40} color={accentColor} />
          <div className="relative z-10 text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              Start Your <span className="text-primary">Journey</span>
            </motion.h1>
          </div>
        </section>

        {/* Stepper */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
                <span className="text-xs text-muted-foreground hidden sm:block whitespace-nowrap">{s}</span>
                {i < steps.length - 1 && <div className="w-8 h-0.5 bg-border" />}
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section className="container mx-auto px-4 py-12">
          <ScrollReveal>
            <GlowCard className="max-w-xl mx-auto">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Check Eligibility</h3>
              <form onSubmit={checkEligibility} className="space-y-4">
                <select name="program" required className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm">
                  <option value="">Select Program</option>
                  {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
                <input name="marks" type="number" placeholder="12th Percentage" required min={0} max={100} className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                <button type="submit" className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm">Check Now</button>
              </form>
              {eligibility && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-4 rounded-lg ${eligibility.result === "eligible" ? "bg-green-500/10 text-green-400" : eligibility.result === "check" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>
                  <div className="flex items-center gap-2">
                    {eligibility.result === "eligible" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span className="font-semibold text-sm">
                      {eligibility.result === "eligible" ? "You're Eligible! 🎉" : eligibility.result === "check" ? "Review Required" : "Below Requirements"}
                    </span>
                  </div>
                </motion.div>
              )}
            </GlowCard>
          </ScrollReveal>
        </section>

        {/* Application Form */}
        <section className="container mx-auto px-4 py-12">
          <ScrollReveal>
            <GlowCard className="max-w-xl mx-auto">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground">Application Submitted!</h3>
                  <p className="text-muted-foreground text-sm mt-2">We'll review your application and get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Quick Application</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" {...register("website")} />
                    <div>
                      <input {...register("name")} placeholder="Full Name" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register("email")} type="email" placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <input {...register("phone")} placeholder="Phone (10 digits)" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input {...register("tenthMarks")} type="number" placeholder="10th %" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                        {errors.tenthMarks && <p className="text-destructive text-xs mt-1">{errors.tenthMarks.message}</p>}
                      </div>
                      <div>
                        <input {...register("twelfthMarks")} type="number" placeholder="12th %" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                        {errors.twelfthMarks && <p className="text-destructive text-xs mt-1">{errors.twelfthMarks.message}</p>}
                      </div>
                    </div>
                    <select {...register("department")} className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm">
                      <option value="">Select Department</option>
                      {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                    {errors.department && <p className="text-destructive text-xs mt-1">{errors.department.message}</p>}
                    <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium">Submit Application</button>
                  </form>
                </>
              )}
            </GlowCard>
          </ScrollReveal>
        </section>

        {/* Important Dates */}
        <section className="container mx-auto px-4 py-12">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-8">Important <span className="text-primary">Dates</span></h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {admissionDates.map((d, i) => (
              <ScrollReveal key={d.label} delay={i * 0.05}>
                <GlowCard className="text-center">
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: d.color }} />
                  <h4 className="font-semibold text-foreground text-sm">{d.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{d.date}</p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-12">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-8">Frequently Asked <span className="text-primary">Questions</span></h2></ScrollReveal>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqItems.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.03}>
                <GlowCard className="!p-0 overflow-hidden" hover={false}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-foreground text-sm">{faq.question}</span>
                    <ChevronDown size={18} className={`text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

export default Admissions;
