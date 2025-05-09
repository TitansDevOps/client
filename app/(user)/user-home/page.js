"use client";

import Navigation from '../../landing/components/Navigation';
import PetCardsSection from '../../landing/components/PetCardsSection';
import Footer from '../../landing/components/Footer';
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
