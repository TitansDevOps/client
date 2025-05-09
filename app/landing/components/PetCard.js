"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mars, Venus, Heart, MapPin } from "lucide-react";
import Image from "next/image";

export default function PetCard({ pet, isFeatured = false }) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/user-home/pets/${pet.id}`);
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md border ${
        isFeatured ? "border-blue-300" : "border-gray-200"
      } transition-all duration-300 ${isFeatured ? "scale-100" : "scale-90"} cursor-pointer`}
      onClick={goToProfile}
    >
      {/* Imagen */}
      <div className="relative h-48">
        <Image
          src={pet.image}
          alt={pet.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevenir navegación al hacer like
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full ${
            isLiked ? "bg-red-100 text-red-500" : "bg-white text-gray-400"
          } transition-colors z-10`}
        >
          <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3
              className={`${
                isFeatured ? "text-lg font-bold" : "text-md font-semibold"
              } text-gray-800`}
            >
              {pet.name}
            </h3>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{pet.location}</span>
            </div>
          </div>
          <div
            className={`p-1.5 rounded-full ${
              pet.gender === "male"
                ? "bg-blue-100 text-blue-600"
                : "bg-pink-100 text-pink-600"
            }`}
          >
            {pet.gender === "male" ? (
              <Mars className="h-3.5 w-3.5" />
            ) : (
              <Venus className="h-3.5 w-3.5" />
            )}
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <span>{pet.age}</span>
          <span>{pet.breed}</span>
        </div>

        {isFeatured && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToProfile();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            Conocer más
          </button>
        )}
      </div>
    </div>
  );
}
