import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-lg">D</div>
            <span className="font-heading font-semibold text-foreground">Diastas University</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">Shaping Minds. Building Futures. A premier institution committed to excellence in education, research, and innovation.</p>
          <div className="flex gap-3">
            {[
              { icon: Linkedin, color: "hover:text-blue-500" },
              { icon: Twitter, color: "hover:text-sky-400" },
              { icon: Youtube, color: "hover:text-red-500" },
              { icon: Instagram, color: "hover:text-pink-500" },
            ].map(({ icon: Icon, color }, i) => (
              <a key={i} href="#" className={`text-muted-foreground ${color} transition-colors`}><Icon size={20} /></a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4 text-foreground">Quick Links</h4>
          <div className="grid grid-cols-2 gap-2">
            {["Academics", "Research", "Admissions", "Placements", "Campus", "Alumni", "Contact", "About"].map((l) => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4 text-foreground">Stay Updated</h4>
          <p className="text-sm text-muted-foreground mb-3">Subscribe to our newsletter for latest updates.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground text-sm border border-border focus:border-primary outline-none transition-colors"
            />
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Accreditation Badges */}
      <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
          <span className="text-xl">🏅</span>
          <div>
            <p className="text-xs font-bold text-foreground">NAAC A+ Accredited</p>
            <p className="text-[10px] text-muted-foreground">National Assessment and Accreditation Council</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
          <span className="text-xl">🎖️</span>
          <div>
            <p className="text-xs font-bold text-foreground">NBA Accredited</p>
            <p className="text-[10px] text-muted-foreground">National Board of Accreditation — 6 Programs</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Diastas University. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
