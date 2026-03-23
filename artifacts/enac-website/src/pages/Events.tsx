import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Calendar, Code2, Users, Presentation, Rocket, Trophy,
  MapPin, X, ChevronLeft, ChevronRight, ImageOff
} from "lucide-react";

const eventTypes = [
  { title: "Hackathons", icon: Code2, desc: "48-hour coding marathons solving real-world problems with innovative software and hardware solutions." },
  { title: "Tech-Festivals", icon: Trophy, desc: "Annual flagship events bringing together students across regions for massive competitions and showcases." },
  { title: "Workshops", icon: Users, desc: "Hands-on sessions teaching the latest frameworks, tools, and methodologies in engineering." },
  { title: "Seminars & Speaker Sessions", icon: Presentation, desc: "Industry leaders and distinguished alumni sharing insights, trends, and career advice." },
  { title: "R&D Expo", icon: Rocket, desc: "Showcase of year-long student research projects, prototypes, and startup MVPs." },
  { title: "Competitions", icon: Calendar, desc: "Regular coding contests, design challenges, and ideathons to keep the competitive spirit alive." },
];

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  photoUrl: string;
  venue?: string;
  createdAt?: { seconds: number };
}

function EventModal({ event, onClose, allEvents, currentIndex, onNavigate }: {
  event: Event;
  onClose: () => void;
  allEvents: Event[];
  currentIndex: number;
  onNavigate: (dir: 1 | -1) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-card border border-border rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {event.photoUrl ? (
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <img
              src={event.photoUrl}
              alt={event.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="relative flex items-center justify-center h-36 bg-muted border-b border-border">
            <ImageOff className="w-10 h-10 text-muted-foreground opacity-40" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="p-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
            {event.venue && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {event.venue}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">{event.name}</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{event.description}</p>
        </div>

        {allEvents.length > 1 && (
          <div className="flex items-center justify-between px-7 pb-6 pt-2 border-t border-border/50">
            <button
              onClick={() => onNavigate(-1)}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-xs text-muted-foreground">{currentIndex + 1} / {allEvents.length}</span>
            <button
              onClick={() => onNavigate(1)}
              disabled={currentIndex === allEvents.length - 1}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), orderBy("date", "desc"));
        const snap = await getDocs(q);
        const data: Event[] = [];
        snap.forEach((d) => data.push({ id: d.id, ...d.data() } as Event));
        setEvents(data);
      } catch {
        // Events collection may not exist yet
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  const currentIndex = selectedEvent ? events.findIndex((e) => e.id === selectedEvent.id) : -1;
  const handleNavigate = (dir: 1 | -1) => {
    const newIndex = currentIndex + dir;
    if (newIndex >= 0 && newIndex < events.length) {
      setSelectedEvent(events[newIndex]);
    }
  };

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

      {/* Live Events from Firestore */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary px-3">ENAC Events</span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        {loadingEvents ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-muted/20 rounded-3xl border border-border/50"
          >
            <Calendar className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">No events posted yet</p>
            <p className="text-sm text-muted-foreground">Check back soon — events will appear here once published by the ENAC team.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-card rounded-3xl border border-border/60 shadow-md hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Photo */}
                <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
                  {event.photoUrl ? (
                    <img
                      src={event.photoUrl}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center');
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageOff className="w-10 h-10 text-muted-foreground opacity-30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    {event.venue && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-primary">
                    View Details →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Event Types Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3">What We Organise</span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-48 md:h-72 rounded-3xl overflow-hidden mb-14 shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop"
            alt="Students collaborating at a hackathon"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {eventTypes.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mt-1">
                <event.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{event.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            allEvents={events}
            currentIndex={currentIndex}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
