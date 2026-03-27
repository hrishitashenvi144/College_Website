import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DOMPurify from "dompurify";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/hooks/useScrollReveal";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2).max(100).transform((v) => DOMPurify.sanitize(v)),
  email: z.string().email().max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit number"),
  department: z.string().min(1, "Select department"),
  message: z.string().min(10).max(1000).transform((v) => DOMPurify.sanitize(v)),
  website: z.string().max(0).optional(),
});

const deptContacts = [
  { name: "Admissions Office", phone: "+91-120-2344000", email: "admissions@diastas.edu.in" },
  { name: "Academic Affairs", phone: "+91-120-2344001", email: "academics@diastas.edu.in" },
  { name: "Research Office", phone: "+91-120-2344002", email: "research@diastas.edu.in" },
  { name: "Alumni Relations", phone: "+91-120-2344003", email: "alumni@diastas.edu.in" },
  { name: "International Relations", phone: "+91-120-2344004", email: "international@diastas.edu.in" },
  { name: "Finance Department", phone: "+91-120-2344005", email: "finance@diastas.edu.in" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: any) => {
    if (data.website && data.website.length > 0) return;
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <section className="pt-24 pb-8">
          <div className="container mx-auto px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl md:text-7xl font-bold text-foreground text-center mb-4">
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <GlowCard hover={false}>
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm mt-2">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Send a Message</h3>
                    <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} {...register("website")} />
                    <div>
                      <input {...register("name")} placeholder="Your Name" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                      {errors.name && <p className="text-destructive text-xs mt-1">{String(errors.name.message)}</p>}
                    </div>
                    <div>
                      <input {...register("email")} type="email" placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                      {errors.email && <p className="text-destructive text-xs mt-1">{String(errors.email.message)}</p>}
                    </div>
                    <div>
                      <input {...register("phone")} placeholder="Phone" className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm" />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{String(errors.phone.message)}</p>}
                    </div>
                    <select {...register("department")} className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm">
                      <option value="">Select Department</option>
                      {deptContacts.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                    <div>
                      <textarea {...register("message")} placeholder="Your Message" rows={4} className="w-full px-3 py-2 rounded-lg bg-muted text-foreground border border-border text-sm resize-none" />
                      {errors.message && <p className="text-destructive text-xs mt-1">{String(errors.message.message)}</p>}
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium">Send Message</button>
                  </form>
                )}
              </GlowCard>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8!2d77.5022!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1e!2sGalgotias%20University!5e0!3m2!1sen!2sin!4v1"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: MapPin, label: "Address", value: "Plot No.2, Sector 17-A, Greater Noida, UP 203201" },
                    { icon: Phone, label: "Phone", value: "+91-120-2344000" },
                    { icon: Mail, label: "Email", value: "info@gu.edu.in" },
                    { icon: Clock, label: "Office Hours", value: "Mon-Sat, 9AM - 5PM" },
                  ].map(({ icon: Icon, label, value }) => (
                    <GlowCard key={label} className="!p-4">
                      <Icon size={18} className="text-primary mb-2" />
                      <h4 className="text-xs font-semibold text-foreground">{label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{value}</p>
                    </GlowCard>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <ScrollReveal><h2 className="font-heading text-3xl font-bold text-center mb-8">Department <span className="text-primary">Contacts</span></h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deptContacts.map((d, i) => (
              <ScrollReveal key={d.name} delay={i * 0.05}>
                <GlowCard className="!p-4">
                  <h4 className="font-semibold text-foreground text-sm mb-2">{d.name}</h4>
                  <p className="text-xs text-muted-foreground">{d.phone}</p>
                  <p className="text-xs text-primary">{d.email}</p>
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

export default Contact;
