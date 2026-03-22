import { Link } from "wouter";
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background dark:bg-card dark:border-t dark:border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-display font-bold text-white text-xl">E</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                ENAC
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Engineers Network at CURAJ. Building tomorrow's engineers today through innovation, collaboration, and practical learning.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-accent transition-colors text-sm">About ENAC</Link></li>
              <li><Link href="/clubs" className="text-muted-foreground hover:text-accent transition-colors text-sm">Technical Clubs</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-accent transition-colors text-sm">Events & Hackathons</Link></li>
              <li><Link href="/initiatives" className="text-muted-foreground hover:text-accent transition-colors text-sm">Key Initiatives</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/team" className="text-muted-foreground hover:text-accent transition-colors text-sm">Our Team</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors text-sm">Join the Network</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">R&D Guidelines</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">University Portal</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Central University of Rajasthan (CURAJ), NH-8, Bandar Sindri, Rajasthan 305817</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:enac@curaj.ac.in" className="hover:text-white transition-colors">enac@curaj.ac.in</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ENAC. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
