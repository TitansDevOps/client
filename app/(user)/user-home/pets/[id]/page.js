"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from '../../../../landing/components/Navigation';
import Footer from '../../../../landing/components/Footer';

import dog1 from "../../../../landing/assets/pets/dog1.jpg";
import cat1 from "../../../../landing/assets/pets/cat1.jpg";
import rabbit1 from "../../../../landing/assets/pets/rabbit1.jpg";
import dog2 from "../../../../landing/assets/pets/dog2.jpg";
import cat2 from "../../../../landing/assets/pets/cat2.jpg";
import rabbit2 from "../../../../landing/assets/pets/rabbit2.jpg";

const pets = [
  {
    id: 1,
    name: "Luna",
    gender: "female",
    age: "2 años",
    breed: "Labrador",
    location: "Bogotá",
    image: dog1,
    type: "perro",
  },
  {
    id: 2,
    name: "Max",
    gender: "male",
    age: "3 años",
    breed: "Siamés",
    location: "Medellín",
    image: cat1,
    type: "gato",
  },
  {
    id: 3,
    name: "Bugs",
    gender: "male",
    age: "1 año",
    breed: "Conejo Holandés",
    location: "Cali",
    image: rabbit1,
    type: "conejo",
  },
  {
    id: 4,
    name: "Rocky",
    gender: "male",
    age: "4 años",
    breed: "Bulldog",
    location: "Barranquilla",
    image: dog2,
    type: "perro",
  },
  {
    id: 5,
    name: "Misty",
    gender: "female",
    age: "2 años",
    breed: "Persa",
    location: "Cartagena",
    image: cat2,
    type: "gato",
  },
  {
    id: 6,
    name: "Cotton",
    gender: "female",
    age: "8 meses",
    breed: "Conejo Enano",
    location: "Bucaramanga",
    image: rabbit2,
    type: "conejo",
  },
];

export default function PetProfilePage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const selectedPet = pets.find((p) => p.id === parseInt(id));
    setPet(selectedPet);
  }, [id]);

  if (!pet) return <div>Cargando mascota...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <img
            src={pet.image.src}
            alt={pet.name}
            className="w-60 h-60 object-cover rounded-full border-4 border-blue-100 shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
            <p className="text-gray-600 mb-1">🐾 Raza: {pet.breed}</p>
            <p className="text-gray-600 mb-1">📍 Ciudad: {pet.location}</p>
            <p className="text-gray-600 mb-1">🎂 Edad: {pet.age}</p>
            <p className="text-gray-600 mb-1">⚥ Género: {pet.gender === "male" ? "Macho" : "Hembra"}</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm md:text-base font-medium transition">
              Iniciar proceso de adopción
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
