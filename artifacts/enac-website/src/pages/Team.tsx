import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GraduationCap, User } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
}

export default function Team() {
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
  const [advisoryBoard, setAdvisoryBoard] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [coreSnap, advisorySnap] = await Promise.all([
        getDoc(doc(db, "settings", "coreTeam")),
        getDoc(doc(db, "settings", "advisoryBoard")),
      ]);
      setCoreTeam(coreSnap.exists() ? (coreSnap.data().members ?? []) : []);
      setAdvisoryBoard(advisorySnap.exists() ? (advisorySnap.data().members ?? []) : []);
      setLoading(false);
    };
    fetch();
  }, []);

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
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : coreTeam.length === 0 ? (
            <p className="text-center text-muted-foreground">Core team details coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreTeam.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-3xl p-6 border border-border shadow-lg text-center hover:-translate-y-2 transition-transform duration-300"
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-primary/20 mb-6"
                    />
                  ) : (
                    <div className="w-24 h-24 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-3xl font-bold">
                      <User className="w-10 h-10" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <div className="text-accent font-semibold text-sm uppercase tracking-wider">{member.role}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Domain Heads */}
        <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
          <h2 className="text-3xl font-display font-bold mb-8 relative z-10">Domain Heads</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-10 relative z-10">
            Each technical club under ENAC is led by a specialized Domain Head responsible for curriculum design, workshops, and project mentorship.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {["AI/ML", "Robotics & IoT", "Web/App Dev", "Cybersecurity"].map((domain) => (
              <div key={domain} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 font-medium">
                {domain} Head
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div>
          <h2 className="text-3xl font-display font-bold text-center mb-12">Advisory Board</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : advisoryBoard.length === 0 ? (
            <p className="text-center text-muted-foreground">Advisory board details coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {advisoryBoard.map((advisor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 bg-card rounded-3xl p-6 border border-border shadow-md"
                >
                  {advisor.photo ? (
                    <img
                      src={advisor.photo}
                      alt={advisor.name}
                      className="w-20 h-20 shrink-0 rounded-2xl object-cover border-2 border-border"
                    />
                  ) : (
                    <div className="w-20 h-20 shrink-0 bg-secondary text-secondary-foreground rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-9 h-9" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{advisor.name}</h3>
                    <div className="text-primary font-medium text-sm">{advisor.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
