import { motion } from "framer-motion";
import { Briefcase, FlaskConical, Network, Video, Rocket, BookOpen } from "lucide-react";

const initiatives = [
  {
    title: "ENAC Research Cell (ERC)",
    icon: FlaskConical,
    desc: "A dedicated cell promoting a structured R&D system within the school of engineering. We provide resources, mentorship, and funding pathways for innovative student research."
  },
  {
    title: "Career Development Cell (CDC)",
    icon: Briefcase,
    desc: "Focused on placement readiness, resume building, mock interviews, and soft skills training to ensure our graduates are top choices for industry recruiters."
  },
  {
    title: "Industry Connect",
    icon: Network,
    desc: "Bridging the academic-industry gap by bringing professionals to campus, arranging industrial visits, and facilitating direct interaction with corporate alumni."
  },
  {
    title: "ENAC Startup Cell",
    icon: Rocket,
    desc: "Fostering entrepreneurial awareness. We help students ideate, build MVPs, and connect with incubators to launch the next big tech startup from CURAJ."
  },
  {
    title: "ENAC Media Cell",
    icon: Video,
    desc: "Managing the narrative. This cell handles event coverage, social media presence, technical content creation, and publishing the annual ENAC magazine."
  },
  {
    title: "Technical Clubs Framework",
    icon: BookOpen,
    desc: "The backbone of our hands-on learning approach, ensuring continuous peer-to-peer knowledge transfer across all engineering disciplines."
  }
];

export default function Initiatives() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
        >
          Key <span className="text-accent">Initiatives</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Strategic cells and programs designed to cover every aspect of a modern engineer's growth.
        </motion.p>
      </section>

      {/* Hero Image / Abstract */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50"
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/r-and-d.png`} 
            alt="R&D Innovation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <h2 className="text-3xl font-bold text-white mb-2">Driving Innovation Forward</h2>
            <p className="text-white/80 max-w-lg">From concept to reality, our initiatives provide the framework for success.</p>
          </div>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border shadow-md hover:shadow-xl transition-shadow flex flex-col sm:flex-row gap-6"
            >
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <item.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
