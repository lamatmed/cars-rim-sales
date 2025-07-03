/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { assets } from "../public/assets/assets";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[420px] md:h-[520px] flex items-center bg-gradient-to-br from-[#181A20] to-[#23272F] overflow-hidden rounded-xl shadow-xl mt-6 mb-10">
      <div className="z-10 px-8 md:px-16 flex flex-col gap-6 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
          Achetez la voiture de vos rêves <span className="text-[#00C6AD]">facilement</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-medium">
          Découvrez notre sélection de voitures neuves et d'occasion, SUV, berlines et plus encore. Achetez en toute confiance !
        </p>
        <Link href="/cars" className="inline-block bg-[#00C6AD] hover:bg-[#009e8e] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all">
          Voir les voitures en vente
        </Link>
      </div>
      <div className="absolute right-0 bottom-0 w-2/3 h-full hidden md:block">
        <Image src={assets.banner_car_image} alt="Bannière voiture" fill style={{objectFit:'cover',objectPosition:'right'}} priority />
      </div>
    </section>
  );
}
