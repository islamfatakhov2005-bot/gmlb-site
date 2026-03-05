/*
  GMLB Automation — Home Page
  Design: Dark Glassmorphism / Vercel-inspired Premium SaaS
  Assembles all sections: Hero, Products, About, Cases, Advantages, Reviews, Contact
*/
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Cases from "@/components/sections/Cases";
import Advantages from "@/components/sections/Advantages";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>
      <Header />
      <main>
        <Hero />
        <div className="section-divider" />
        <Products />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Cases />
        <div className="section-divider" />
        <Advantages />
        <div className="section-divider" />
        <Reviews />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
