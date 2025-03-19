import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Home, ArrowRight, Venus, Mars, MapPin } from "lucide-react";
import { AboutUs } from "./components/aboutus";
import { PetCards } from "./components/petcards";
import { Benefits } from "./components/benefits";
import { Partners } from "./components/partners";
import { ContactSection } from "./components/Contact";

const petCards = [
  {
    id: 1,
    name: "Felix",
    location: "Medellin ( 1,5km )",
    gender: "male",
    image: "/images/pet1.jpg",
  },
  {
    id: 2,
    name: "Max",
    location: "Envigado ( 2,5km )",
    gender: "male",
    image: "/images/pet2.jpg",
  },
  {
    id: 3,
    name: "Samantha",
    location: "Bello ( 6,5km )",
    gender: "female",
    image: "/images/pet3.jpg",
  },
];

const benefits = [
  {
    icon: <Heart className="w-[74px] h-[73px]" />,
    title: "Dale una segunda oportunidad",
    description:
      "Al adoptar, no solo ganas un amigo fiel, sino que también le das un hogar a una mascota que lo necesita. ¡Tú puedes marcar la diferencia!",
  },
  {
    icon: <img src="/images/people-circle.png" alt="People circle" className="w-[77px] h-[76px]" />,
    title: "Apoya a los refugios",
    description:
      "Al adoptar, apoyas el trabajo de refugios y rescatistas, permitiéndoles seguir ayudando a más animales en situación de vulnerabilidad",
  },
  {
    icon: <Home className="w-[74px] h-[73px]" />,
    title: "Compañía que transforma vidas",
    description:
      "Las mascotas adoptadas son agradecidas y llenan tu hogar de amor, alegría y momentos inolvidables. ¡Ellas te lo devolverán con creces!",
  },
];

const navItems = [
  "Como puedo ayudar?",
  "Historias felices",
  "Nosotros",
  "Contacto",
];

export default function LandingPage() {
  return (
    <div className="bg-[#8dbdfc] flex flex-row justify-center w-full">
      <div className="bg-[#8dbdfc] overflow-hidden w-[1440px] h-[4575px] relative">
        {/* Footer */}
        <footer className="absolute w-[1440px] h-[156px] top-[4419px] left-0 bg-transparent">
          <div className="absolute w-[258px] h-[21px] top-10 left-[232px]">
            <div className="w-3 h-3 top-1 bg-app-primary rounded-md absolute left-0" />
            <div className="absolute w-[236px] h-[21px] top-0 left-5 font-bold text-[color:var(--semantic-link-alternate)] text-lg tracking-[0] leading-[normal] whitespace-nowrap font-['Poppins-Bold',Helvetica]">
              ADOPCION DE MASCOTAS
            </div>
          </div>

          <img
            className="absolute w-[205px] h-[42px] top-[30px] left-[1003px]"
            alt="Logos redes"
            src="/images/logos-redes.png"
          />

          <div className="absolute w-[978px] h-9 top-[104px] left-[232px]">
            <Separator className="absolute w-[976px] h-px -top-px left-0" />
            <div className="absolute h-[15px] top-[21px] left-[410px] opacity-80 font-bold text-[color:var(--primitive-color-neutral-white)] text-[10px] tracking-[0] leading-[normal] font-['Poppins-Bold',Helvetica]">
              © 2025 error404
            </div>
          </div>
        </footer>

        {/* Contact Section */}
        <ContactSection />

        {/* About Us Section */}
        <AboutUs />

        {/* Pet Cards Section */}
        <PetCards petCards={petCards} />

        {/* Benefits Section */}
        <Benefits benefits={benefits} />

        {/* Partners Section */}
        <Partners />

        {/* Hero Section */}
        <div className="absolute w-[1440px] h-[700px] top-[120px] left-0 [background:radial-gradient(50%_50%_at_50%_50%,rgb(255,255,255)_0%,rgb(141.49,189.45,252.17)_100%)]">
          <div className="absolute w-[399px] h-[298px] top-[201px] left-[146px]">
            <Button className="flex w-[291px] p-6 top-[220px] left-0 overflow-hidden items-center gap-4 absolute bg-app-primary rounded-lg">
              <span className="relative w-fit mt-[-1.00px] font-body-body-paragraph-bold font-[number:var(--body-body-paragraph-bold-font-weight)] text-[#ffffff] text-[length:var(--body-body-paragraph-bold-font-size)] tracking-[var(--body-body-paragraph-bold-letter-spacing)] leading-[var(--body-body-paragraph-bold-line-height)] [font-style:var(--body-body-paragraph-bold-font-style)]">
                Adopta tu mascota
              </span>
              <ArrowRight className="w-7 h-6" />
            </Button>

            <div className="flex flex-col w-[399px] items-start gap-[17px] absolute top-0 left-0">
              <div className="relative self-stretch mt-[-1.00px] font-normal text-transparent text-[40px] tracking-[0] leading-[normal] font-['Poppins-Regular',Helvetica]">
                <span className="text-[#ffffff]">
                  Haz la diferencia, adopta un amigo
                </span>
                <span className="text-[#ff4f11]">.</span>
              </div>

              <div className="relative self-stretch font-normal text-[color:var(--semantic-link-alternate)] text-base tracking-[0] leading-[normal] font-['Poppins-Regular',Helvetica]">
                Encuentra a tu compañero perfecto entre perros, gatos y muchos
                otros animales que buscan un hogar
              </div>
            </div>
          </div>

          <Image
            className="absolute w-[750px] h-[636px] top-0 left-[690px]"
            alt="Mask group"
            src="/images/mask-group.png"
            width={750}
            height={636}
          />
        </div>

        {/* Navigation */}
        <div className="absolute w-[1440px] h-[120px] top-0 left-0 bg-[#8dbdfc]">
          {/* Logo o título */}
          <div className="absolute w-[258px] h-[21px] top-[49px] left-[81px]">
            <div className="w-3 h-3 top-1 bg-app-primary rounded-md absolute left-0" />
            <div className="absolute w-[236px] h-[21px] top-0 left-5 font-bold text-[#ffffff] text-lg tracking-[0] leading-[normal] whitespace-nowrap font-['Poppins-Bold',Helvetica]">
              ADOPCION DE MASCOTAS
            </div>
          </div>

          {/* Items de navegación */}
          <div className="inline-flex h-[21px] items-center gap-12 absolute top-[49px] left-[404px]">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative w-fit mt-[-2.50px] mb-[-0.50px] font-normal text-[#ffffff] text-base tracking-[0] leading-[normal] font-['Poppins-Regular',Helvetica] hover:text-app-primary transition"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Botón de adopción */}
          <Button className="inline-flex p-4 top-8 left-[1145px] items-center gap-4 absolute bg-app-primary rounded-lg hover:bg-blue-700 transition">
            <span className="relative w-fit font-body-small-bold text-[#ffffff]">
              Adopta tu mascota
            </span>
            <ArrowRight className="w-7 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}