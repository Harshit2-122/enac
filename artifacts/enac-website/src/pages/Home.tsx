import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, Cpu, Globe, Shield, Zap, Target, Users,
  Lightbulb, ChevronLeft, ChevronRight, Bot, Code2,
  Award, BookOpen, Rocket, Star
} from "lucide-react";

const slides = [
  {
    tag: "🚀 Latest Announcement",
    title: "ENAC Tech Fest is Coming Soon",
    desc: "Annual tech festival with hackathons, workshops, robotics battles, and industry talks. Get ready to innovate.",
    cta: { label: "Know More", href: "/events" },
    gradient: "from-blue-600 via-primary to-indigo-700",
  },
  {
    tag: "🏆 Achievement",
    title: "5 Clubs. One Community.",
    desc: "From AI to Competitive Programming — ENAC brings together every engineering domain under one student-driven roof.",
    cta: { label: "Explore Clubs", href: "/clubs" },
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
  },
  {
    tag: "📋 Rulebook Released",
    title: "Official ENAC Rulebook Available",
    desc: "Governance, club structure, membership protocols, and code of conduct — everything is documented.",
    cta: { label: "Read Rulebook", href: "https://drive.google.com/drive/folders/1ahtDnT9LEL2Jxk7iax7oeMHxI3fGK_v2?usp=drive_link", external: true },
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
  },
  {
    tag: "🤝 Industry Connect",
    title: "Bridging Academia & Industry",
    desc: "ENAC facilitates speaker sessions, internship drives, and mentorship programmes with industry professionals.",
    cta: { label: "Join ENAC", href: "/login" },
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
  },
];

const clubHighlights = [
  { icon: Cpu, name: "AI / ML Club" },
  { icon: Bot, name: "Robotics & IoT" },
  { icon: Globe, name: "Web & App Dev" },
  { icon: Shield, name: "Cybersecurity" },
  { icon: Code2, name: "Competitive Programming" },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    timer.current = setInterval(next, 5000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(next, 5000);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-white/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.45 }}
          className={`bg-gradient-to-br ${slide.gradient} p-8 md:p-10 min-h-[240px] flex flex-col justify-between`}
        >
          <div>
            <span className="inline-block text-white/90 text-sm font-semibold mb-4 bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
              {slide.tag}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-3 leading-tight">
              {slide.title}
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md">
              {slide.desc}
            </p>
          </div>
          <div className="mt-6">
            {slide.cta.external ? (
              <a
                href={slide.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-bold hover:scale-105 transition-transform shadow-lg"
              >
                {slide.cta.label} <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link href={slide.cta.href}>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-bold hover:scale-105 transition-transform shadow-lg cursor-pointer">
                  {slide.cta.label} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => { prev(); resetTimer(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => { next(); resetTimer(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetTimer(); }}
            className={`rounded-full transition-all ${i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ClubMarquee() {
  const doubled = [...clubHighlights, ...clubHighlights];
  return (
    <div className="overflow-hidden py-4">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 w-max"
      >
        {doubled.map((club, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-card border border-border/60 text-sm font-medium text-muted-foreground whitespace-nowrap hover:border-primary/40 hover:text-primary transition-colors"
          >
            <club.icon className="w-4 h-4 text-primary" />
            {club.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <section className="relative pt-28 pb-0 md:pt-36 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />
          </svg>
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-56 h-56 bg-accent/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 xl:gap-14 items-center">

            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/25 backdrop-blur-sm"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Central University of Rajasthan</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.08] mb-6 tracking-tight"
              >
                Building{" "}
                <span className="relative inline-block">
                  <span className="text-primary">Tomorrow's</span>
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent via-orange-400 to-primary bg-clip-text text-transparent">
                  Engineers
                </span>{" "}
                Today
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
              >
                ENAC is CURAJ's premier student-driven engineering body — fostering innovation, collaboration, and practical excellence across all engineering domains.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/clubs">
                  <span className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    Explore Clubs
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/about">
                  <span className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-foreground bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                    Learn About ENAC
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HeroSlider />
            </motion.div>
          </div>
        </div>

        <div className="mt-16 border-y border-border/50 bg-muted/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <ClubMarquee />
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Technical Clubs", value: "5", icon: Star, color: "text-blue-500 bg-blue-500/10" },
              { label: "Active Members", value: "250+", icon: Users, color: "text-orange-500 bg-orange-500/10" },
              { label: "Yearly Events", value: "20+", icon: Award, color: "text-emerald-500 bg-emerald-500/10" },
              { label: "Industry Partners", value: "15+", icon: Rocket, color: "text-purple-500 bg-purple-500/10" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-display font-extrabold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Core Pillars</h2>
            <p className="text-muted-foreground text-lg">
              ENAC is built on a foundation of practical exposure and holistic development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Innovation & R&D",
                desc: "Establishing a structured R&D system and promoting entrepreneurial problem-solving across all branches.",
                color: "from-amber-500 to-orange-500",
                glow: "shadow-amber-500/20",
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                desc: "Breaking department silos to foster cross-disciplinary engineering projects and peer mentorship.",
                color: "from-blue-500 to-primary",
                glow: "shadow-blue-500/20",
              },
              {
                icon: Target,
                title: "Career Readiness",
                desc: "Bridging the gap between academic theory and industry expectations through real-world exposure.",
                color: "from-emerald-500 to-teal-500",
                glow: "shadow-emerald-500/20",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`bg-card rounded-2xl p-8 border border-border/50 shadow-xl ${pillar.glow} hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 from-primary to-accent" />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Opportunities</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What ENAC Offers You</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Cpu, title: "Technical Clubs", desc: "AI, Robotics, Web Dev, Cybersecurity, Competitive Programming" },
              { icon: Rocket, title: "Hackathons & Events", desc: "Participate in national-level competitions and annual tech festivals" },
              { icon: BookOpen, title: "Workshops & Talks", desc: "Industry speaker sessions, hands-on workshops, and R&D seminars" },
              { icon: Users, title: "Startup Cell", desc: "ENAC Startup Cell mentors student entrepreneurs from idea to MVP" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-foreground mb-2 text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-blue-700 to-indigo-800" />
        <div className="absolute inset-0 -z-10 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ctaGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaGrid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/30 blur-3xl rounded-full" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/70 mb-4 bg-white/10 px-4 py-1.5 rounded-full">
              Join the Movement
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 text-white leading-tight">
              Ready to Shape the Future?
            </h2>
            <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto">
              Join ENAC today — participate in hackathons, join specialised clubs, connect with industry leaders, and build the engineer of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-primary bg-white hover:bg-accent hover:text-white hover:scale-105 transition-all shadow-2xl cursor-pointer">
                  <Zap className="w-5 h-5" />
                  Become a Member
                </span>
              </Link>
              <a
                href="mailto:enac@curaj.ac.in"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white border-2 border-white/30 hover:bg-white/10 hover:scale-105 transition-all"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
