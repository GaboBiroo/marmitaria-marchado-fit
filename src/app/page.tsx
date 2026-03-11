import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import Menu from "@/components/sections/Menu";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <About />
      <Benefits />
      <Menu />
      <Footer />
    </main>
  );
}
