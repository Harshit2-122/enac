import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Initiatives from "./pages/Initiatives";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/clubs" component={Clubs} />
          <Route path="/events" component={Events} />
          <Route path="/initiatives" component={Initiatives} />
          <Route path="/team" component={Team} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <AppContent />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
