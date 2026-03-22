import { motion } from "framer-motion";
import { Target, Eye, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20">

      {/* Page Header */}
      <section className="relative py-20 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="aboutGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutGrid)" className="text-primary" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block"
          >
            Engineers Network at CURAJ
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            About <span className="text-primary">ENAC</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            The central, student-driven engineering body working to enhance technical engagement at CURAJ.
          </motion.p>
        </div>
      </section>

      {/* Intro Section — LOGO replaces abstract image */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold text-foreground">Introduction</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Central University of Rajasthan (CURAJ) has a strong academic foundation with qualified faculty, diverse student participation, and a well-established institutional framework.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                However, there exists an opportunity to further strengthen the engineering ecosystem by creating a structured platform that promotes innovation, collaboration, and practical learning among students. To address this, we propose the establishment of the Engineers Network at CURAJ (ENAC).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ENAC functions as a central, student-driven engineering body, working in coordination with university administration to enhance technical engagement and innovation culture.
              </p>
            </motion.div>

            {/* ENAC Logo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <div className="relative max-w-md w-full mx-auto">
                {/* Glow background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl" />
                <div className="relative bg-card border border-border/60 rounded-3xl p-10 shadow-2xl flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}images/enac-logo.png`}
                    alt="ENAC — Engineers Network at CURAJ"
                    className="w-full max-w-xs object-contain drop-shadow-lg"
                  />
                </div>
                {/* Decorative floating dots */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 blur-2xl rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 blur-2xl rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aim & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-10 rounded-3xl border border-border shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Our Aim</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To establish a collaborative and innovation-driven engineering ecosystem that complements academic learning with practical exposure, industry interaction, and student-led initiatives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-10 rounded-3xl border border-border shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                To develop ENAC as a platform that fosters:
              </p>
              <ul className="space-y-3">
                {[
                  "Innovation and technical excellence",
                  "Collaborative learning across departments",
                  "Industry and alumni engagement",
                  "Entrepreneurial thinking and problem-solving"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Our Goals</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Key Objectives</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid gap-4">
            {[
              "Create a central engineering platform for student engagement",
              "Establish domain specific clubs across all engineering branches",
              "Promote technical activities such as hackathons, workshops, and competitions",
              "Encourage hands-on learning and project-based development",
              "Facilitate interaction with industry professionals and alumni",
              "Promote startup and entrepreneurial awareness",
              "Support career development and placement readiness",
              "Organise yearly tech-festivals and events",
              "Establish a structured R&D system in the school of engineering",
            ].map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-lg text-foreground font-medium">{obj}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
