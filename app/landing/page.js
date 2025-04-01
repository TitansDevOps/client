'use client';
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import PartnersSection from "./components/PartnersSection";
import BenefitsSection from "./components/BenefitsSection";
import PetCardsSection from "./components/PetCardsSection";
import AboutUsSection from "./components/AboutUsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import TestimonialsSection from "./components/TestimonialsSection";

export default function LandingPage() {
  return (
    <div className="relative">
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <PartnersSection />
        <BenefitsSection />
        <TestimonialsSection />
        <PetCardsSection />
        <AboutUsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
