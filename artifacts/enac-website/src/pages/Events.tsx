import { motion } from "framer-motion";
import { Calendar, Code2, Users, Presentation, Rocket, Trophy } from "lucide-react";

const eventTypes = [
  {
    title: "Hackathons",
    icon: Code2,
    desc: "48-hour coding marathons solving real-world problems with innovative software and hardware solutions."
  },
  {
    title: "Tech-Festivals",
    icon: Trophy,
    desc: "Annual flagship events bringing together students across regions for massive competitions and showcases."
  },
  {
    title: "Workshops",
    icon: Users,
    desc: "Hands-on sessions teaching the latest frameworks, tools, and methodologies in engineering."
  },
  {
    title: "Seminars & Speaker Sessions",
    icon: Presentation,
    desc: "Industry leaders and distinguished alumni sharing insights, trends, and career advice."
  },
  {
    title: "R&D Expo",
    icon: Rocket,
    desc: "Showcase of year-long student research projects, prototypes, and startup MVPs."
  },
  {
    title: "Competitions",
    icon: Calendar,
    desc: "Regular coding contests, design challenges, and ideathons to keep the competitive spirit alive."
  }
];

export default function Events() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <section className="py-16 bg-muted/20 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6"
          >
            <Calendar className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Events & Activities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            A vibrant calendar of activities designed to test limits, impart skills, and build networks.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Unsplash Image Placeholder for Event atmosphere */}
        {/* university students collaborating at a hackathon event */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-20 shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop" 
            alt="Students collaborating" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {eventTypes.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mt-1">
                <event.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{event.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
