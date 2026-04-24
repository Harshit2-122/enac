import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Bot, Globe, Shield, Code2,
  X, CheckCircle, LogIn, Instagram, MessageCircle,
  Mail, User, BookOpen, ExternalLink, Users
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ClubLeadership {
  president: { name: string; branch: string; email: string };
  vicePresident: { name: string; branch: string; email: string };
  advisor: { name: string; designation: string; email: string };
}

interface Club {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  accent: string;
  desc: string;
  details: string;
  activities: string[];
  leadership: ClubLeadership;
  instagram: string;
  whatsapp: string;
}

const defaultClubs: Club[] = [
  {
    id: "aiml",
    title: "AI / Machine Learning Club",
    icon: Cpu,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    accent: "bg-blue-500",
    desc: "Dive into neural networks, deep learning, computer vision, and NLP. Build models that shape the future.",
    details: "Work on real-world ML projects, participate in Kaggle competitions, attend paper reading sessions, and collaborate with peers and faculty on cutting-edge AI research. The club runs weekly coding sessions, research discussions, and model deployment workshops.",
    activities: ["Kaggle Competitions", "Paper Reading Groups", "Model Deployment Workshops", "AI Project Showcases"],
    leadership: {
      president: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "aiml.enac@curaj.ac.in" },
      vicePresident: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "aiml.enac@curaj.ac.in" },
      advisor: { name: "To Be Updated", designation: "Faculty Advisor", email: "aiml.enac@curaj.ac.in" },
    },
    instagram: "https://www.instagram.com/enac_curaj",
    whatsapp: "https://chat.whatsapp.com/AIML_GROUP_LINK",
  },
  {
    id: "robotics",
    title: "Robotics & IoT Club",
    icon: Bot,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    accent: "bg-orange-500",
    desc: "Merge hardware and software. Create autonomous bots, smart devices, and explore the Internet of Things.",
    details: "Build robots for competitions, prototype IoT solutions, work with Arduino/Raspberry Pi, and develop automation projects for real-world use cases. Regular hardware sessions and inter-college robot competitions are organised every semester.",
    activities: ["Robot Building Competitions", "Arduino / Raspberry Pi Labs", "IoT Prototype Sessions", "Smart Home Projects"],
    leadership: {
      president: { name: "To Be Updated", branch: "B.Tech Electronics", email: "robotics.enac@curaj.ac.in" },
      vicePresident: { name: "To Be Updated", branch: "B.Tech Electronics", email: "robotics.enac@curaj.ac.in" },
      advisor: { name: "To Be Updated", designation: "Faculty Advisor", email: "robotics.enac@curaj.ac.in" },
    },
    instagram: "https://www.instagram.com/enac_curaj",
    whatsapp: "https://chat.whatsapp.com/ROBOTICS_GROUP_LINK",
  },
  {
    id: "webdev",
    title: "Web & App Dev Club",
    icon: Globe,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    accent: "bg-purple-500",
    desc: "Master modern web frameworks, mobile app development, and craft scalable software architectures.",
    details: "Build full-stack web and mobile applications, contribute to open source, participate in hackathons, and learn from industry professionals. The club covers React, Node.js, Flutter, and cloud deployment on a rotating curriculum.",
    activities: ["Full-Stack Project Sprints", "Open Source Contribution", "Hackathons", "App Deployment Bootcamps"],
    leadership: {
      president: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "webdev.enac@curaj.ac.in" },
      vicePresident: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "webdev.enac@curaj.ac.in" },
      advisor: { name: "To Be Updated", designation: "Faculty Advisor", email: "webdev.enac@curaj.ac.in" },
    },
    instagram: "https://www.instagram.com/enac_curaj",
    whatsapp: "https://chat.whatsapp.com/WEBDEV_GROUP_LINK",
  },
  {
    id: "cyber",
    title: "Cybersecurity Club",
    icon: Shield,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    accent: "bg-red-500",
    desc: "Learn ethical hacking, network security, cryptography, and protect systems from modern threats.",
    details: "Participate in CTF competitions, learn penetration testing, study cryptography, and develop security tools for real-world defence scenarios. The club runs monthly CTF challenges and cybersecurity awareness campaigns.",
    activities: ["CTF Competitions", "Penetration Testing Labs", "Cryptography Workshops", "Security Auditing Projects"],
    leadership: {
      president: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "cyber.enac@curaj.ac.in" },
      vicePresident: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "cyber.enac@curaj.ac.in" },
      advisor: { name: "To Be Updated", designation: "Faculty Advisor", email: "cyber.enac@curaj.ac.in" },
    },
    instagram: "https://www.instagram.com/enac_curaj",
    whatsapp: "https://chat.whatsapp.com/CYBER_GROUP_LINK",
  },
  {
    id: "competitive",
    title: "Competitive Programming Club",
    icon: Code2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    accent: "bg-emerald-500",
    desc: "Sharpen your problem-solving skills, master algorithms & data structures, and compete on global coding platforms.",
    details: "Prepare for ICPC, Codeforces, LeetCode, and other competitive programming contests. Weekly contests, editorial discussions, and peer coaching help you level up your coding skills systematically.",
    activities: ["Weekly Coding Contests", "ICPC Preparation", "Algorithm Workshops", "LeetCode / Codeforces Sessions"],
    leadership: {
      president: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "cp.enac@curaj.ac.in" },
      vicePresident: { name: "To Be Updated", branch: "B.Tech Computer Science", email: "cp.enac@curaj.ac.in" },
      advisor: { name: "To Be Updated", designation: "Faculty Advisor", email: "cp.enac@curaj.ac.in" },
    },
    instagram: "https://www.instagram.com/enac_curaj",
    whatsapp: "https://chat.whatsapp.com/CP_GROUP_LINK",
  },
];

function ClubModal({ club, onClose, joined, onJoin }: {
  club: Club;
  onClose: () => void;
  joined: boolean;
  onJoin: () => void;
}) {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-card border border-border rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${club.bg} border-b border-border/50 p-6 flex items-start justify-between`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${club.bg} border border-border flex items-center justify-center`}>
              <club.icon className={`w-7 h-7 ${club.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{club.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">ENAC Technical Club</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-muted-foreground leading-relaxed text-sm">{club.details}</p>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Key Activities
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {club.activities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Club Leadership */}
          <div className="bg-muted/40 rounded-2xl p-4 border border-border/50 space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Club Leadership
            </h4>

            {/* President */}
            <div className="border-b border-border/40 pb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5">President</p>
              <p className="font-medium text-foreground text-sm">{club.leadership.president.name}</p>
              <p className="text-muted-foreground text-xs">{club.leadership.president.branch}</p>
              <a href={`mailto:${club.leadership.president.email}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {club.leadership.president.email}
              </a>
            </div>

            {/* Vice President */}
            <div className="border-b border-border/40 pb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5">Vice President</p>
              <p className="font-medium text-foreground text-sm">{club.leadership.vicePresident.name}</p>
              <p className="text-muted-foreground text-xs">{club.leadership.vicePresident.branch}</p>
              <a href={`mailto:${club.leadership.vicePresident.email}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {club.leadership.vicePresident.email}
              </a>
            </div>

            {/* Advisor */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5">Faculty Advisor</p>
              <p className="font-medium text-foreground text-sm">{club.leadership.advisor.name}</p>
              <p className="text-muted-foreground text-xs">{club.leadership.advisor.designation}</p>
              <a href={`mailto:${club.leadership.advisor.email}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-0.5">
                <Mail className="w-3.5 h-3.5" /> {club.leadership.advisor.email}
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/30 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a
              href={`mailto:${club.leadership.president.email}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>

          {user ? (
            joined ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">You're a member!</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Welcome to the {club.title}.</p>
                  </div>
                </div>
                <a
                  href={club.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join WhatsApp Group
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            ) : (
              <button
                onClick={onJoin}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm text-white bg-primary hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/25"
              >
                <MessageCircle className="w-4 h-4" />
                Become a Member & Join WhatsApp Group
              </button>
            )
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Sign in first to become a member
              </p>
              <Link href="/login">
                <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm text-white bg-primary hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/25">
                  <LogIn className="w-4 h-4" />
                  Sign In / Sign Up to Join
                </button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Clubs() {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [joinedClubs, setJoinedClubs] = useState<string[]>([]);
  const [clubs, setClubs] = useState<Club[]>(defaultClubs);
  const { user } = useAuth();

  useEffect(() => {
    const fetchClubLeadership = async () => {
      const updated = await Promise.all(
        defaultClubs.map(async (club) => {
          const snap = await getDoc(doc(db, "clubs", club.id));
          if (snap.exists()) {
            const data = snap.data();
            return {
              ...club,
              leadership: data as Club["leadership"],
              whatsapp: data.whatsapp ?? club.whatsapp,
              instagram: data.instagram ?? club.instagram,
            };
          }
          return club;
        })
      );
      setClubs(updated);
    };
    fetchClubLeadership();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchUserClubs = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setJoinedClubs(snap.data().clubsJoined ?? []);
      }
    };
    fetchUserClubs();
  }, [user]);

  const handleJoin = async (clubId: string) => {
    if (!user) return;
    const club = clubs.find((c) => c.id === clubId);
    if (!club) return;
    await updateDoc(doc(db, "users", user.uid), {
      clubsJoined: arrayUnion(clubId),
    });
    setJoinedClubs((prev) => [...prev, clubId]);

    const link = (club.whatsapp ?? "").trim();
    const isValidLink =
      link.startsWith("https://chat.whatsapp.com/") &&
      !/(GROUP_LINK|YOUR_LINK|placeholder)/i.test(link);

    if (isValidLink) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      alert(
        `You've joined ${club.name}! The WhatsApp group link is not yet added by the admin. Please check back soon or contact ENAC.`
      );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <section className="py-16 text-center max-w-3xl mx-auto px-4">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block"
        >
          Student-Led Technical Communities
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
        >
          Domain-Specific <br />
          <span className="text-primary">Technical Clubs</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          ENAC oversees 5 specialised clubs — find your niche, join a community, and build something remarkable.
        </motion.p>
        {!user && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>{" "}
            to become a member and join the WhatsApp group of any club.
          </motion.p>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, i) => {
            const isMember = joinedClubs.includes(club.id);
            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-card rounded-3xl border border-border/60 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col overflow-hidden"
              >
                <div className={`h-1 w-full ${club.accent}`} />

                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${club.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <club.icon className={`w-7 h-7 ${club.color}`} />
                    </div>
                    {isMember && (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Member
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-foreground">{club.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm flex-grow mb-4">
                    {club.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 border-t border-border/50 pt-4">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>President: <span className="font-medium text-foreground">{club.leadership.president.name}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span>VP: <span className="font-medium text-foreground">{club.leadership.vicePresident.name}</span></span>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <a
                      href={club.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-muted hover:bg-pink-500/10 hover:text-pink-500 text-muted-foreground transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={club.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-muted hover:bg-[#25D366]/10 hover:text-[#25D366] text-muted-foreground transition-colors"
                      title="WhatsApp Group"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${club.leadership.president.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-muted hover:bg-blue-500/10 hover:text-blue-500 text-muted-foreground transition-colors"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedClub(club)}
                      className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => setSelectedClub(club)}
                      className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-colors shadow-sm shadow-primary/20"
                    >
                      {isMember ? "View Details" : "Join Club"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 border border-primary/20 rounded-3xl p-8 text-center"
        >
          <p className="text-muted-foreground text-sm mb-2">Have questions about a club?</p>
          <h3 className="text-xl font-bold text-foreground mb-4">Reach out to ENAC directly</h3>
          <a
            href="mailto:enac@curaj.ac.in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            <Mail className="w-4 h-4" />
            enac@curaj.ac.in
          </a>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedClub && (
          <ClubModal
            club={selectedClub}
            onClose={() => setSelectedClub(null)}
            joined={joinedClubs.includes(selectedClub.id)}
            onJoin={() => handleJoin(selectedClub.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
