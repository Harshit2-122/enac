import { motion } from "framer-motion";

const coreTeam = [
  { role: "President", name: "Alex Mercer", desc: "Oversees all ENAC operations and acts as the bridge to university admin." },
  { role: "Vice-President", name: "Sarah Chen", desc: "Manages internal initiatives and domain club coordination." },
  { role: "Secretary", name: "David Kim", desc: "Handles communications, scheduling, and official documentation." },
  { role: "Treasurer", name: "Priya Sharma", desc: "Manages funds, sponsorships, and event budgeting." },
];

const advisors = [
  { role: "Faculty Advisor", name: "Dr. Robert Singh", desc: "Guiding the vision and ensuring academic alignment." },
  { role: "Dean of Engineering", name: "Prof. Maria Garcia", desc: "Institutional support and strategic direction." }
];

export default function Team() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-muted/10">
      <section className="py-16 text-center max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
        >
          Leadership <span className="text-primary">Structure</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Meet the dedicated individuals driving ENAC's vision forward.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Core Team */}
        <div>
          <h2 className="text-3xl font-display font-bold text-center mb-12">Core Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTeam.map((member, i) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-3xl p-6 border border-border shadow-lg text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-24 h-24 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-3xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <div className="text-accent font-semibold text-sm mb-4 uppercase tracking-wider">{member.role}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Domain Heads (Abstract List) */}
        <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
          <h2 className="text-3xl font-display font-bold mb-8 relative z-10">Domain Heads</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-10 relative z-10">
            Each technical club under ENAC is led by a specialized Domain Head. They are responsible for curriculum design, workshop execution, and project mentorship within their specific fields.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {["AI/ML", "Robotics & IoT", "Web/App Dev", "Cybersecurity", "Civil Eng.", "Electrical", "Mechanical", "Media/PR"].map((domain) => (
              <div key={domain} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 font-medium">
                {domain} Head
              </div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div>
          <h2 className="text-3xl font-display font-bold text-center mb-12">Advisory Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, i) => (
              <motion.div
                key={advisor.role}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 bg-card rounded-3xl p-6 border border-border shadow-md"
              >
                <div className="w-20 h-20 shrink-0 bg-secondary text-secondary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold">
                  {advisor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{advisor.name}</h3>
                  <div className="text-primary font-medium text-sm mb-2">{advisor.role}</div>
                  <p className="text-muted-foreground text-sm">
                    {advisor.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
