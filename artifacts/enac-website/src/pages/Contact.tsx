import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  branch: z.string().min(2, "Branch is required"),
  year: z.string().min(1, "Year is required"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      branch: "",
      year: "",
      interest: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    toast({
      title: "Application Received!",
      description: "Thank you for your interest in ENAC. We will contact you soon.",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            Join the <span className="text-gradient">Network</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Whether you want to join a technical club, collaborate on R&D, or partner as an industry expert — we want to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-primary text-primary-foreground p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 font-display">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 shrink-0 text-accent" />
                  <p className="leading-relaxed opacity-90">Central University of Rajasthan (CURAJ), NH-8, Bandar Sindri, Rajasthan 305817</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 shrink-0 text-accent" />
                  <a href="mailto:enac@curaj.ac.in" className="opacity-90 hover:opacity-100 hover:underline">
                    enac@curaj.ac.in
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl border border-border shadow-md">
              <h3 className="font-bold text-lg mb-2 text-foreground">Industry Partners</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Interested in recruiting, sponsoring a hackathon, or offering a seminar? Email us directly with the subject "Industry Partnership".
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">Membership Interest Form</h2>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Full Name</label>
                  <input 
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    placeholder="Jane Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Email Address</label>
                  <input 
                    {...form.register("email")}
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    placeholder="jane@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Branch / Department</label>
                  <input 
                    {...form.register("branch")}
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    placeholder="e.g. Computer Science"
                  />
                  {form.formState.errors.branch && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.branch.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Year of Study</label>
                  <select 
                    {...form.register("year")}
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-foreground"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="pg">Postgrad / PhD</option>
                  </select>
                  {form.formState.errors.year && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.year.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Primary Club of Interest</label>
                <select 
                  {...form.register("interest")}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-foreground"
                >
                  <option value="">Select Club</option>
                  <option value="aiml">AI / Machine Learning</option>
                  <option value="robotics">Robotics & IoT</option>
                  <option value="webdev">Web & App Dev</option>
                  <option value="cyber">Cybersecurity</option>
                  <option value="civil">Civil & Environmental</option>
                  <option value="electrical">Electronics & Electrical</option>
                  <option value="mechanical">Mechanical & Aerospace</option>
                  <option value="other">Other Initiative (ERC, CDC, Media)</option>
                </select>
                {form.formState.errors.interest && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.interest.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Why do you want to join? (Optional)</label>
                <textarea 
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                  placeholder="Tell us a bit about your skills or what you hope to learn..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none transition-all duration-200"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
