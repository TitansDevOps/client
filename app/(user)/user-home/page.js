"use client";
import Navigation from '@/app/landing/components/Navigation';
import PetCardsSection from '@/app/landing/components/PetCardsSection';
import Footer from '@/app/landing/components/Footer';
import LayoutUserPage from "@/app/components/LayoutUser";

export default function UserHomePage() {
  return (
    <LayoutUserPage>
      <div className="relative min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <PetCardsSection />
        </main>
        <Footer />
      </div>
    </LayoutUserPage>
  );
}