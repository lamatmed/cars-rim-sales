
'use client'
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-[#181A20]">
      {/* Hero et FeaturedCars sont déjà traduits dynamiquement */}
      <Hero />
      <FeaturedCars />
      {/* Si tu as d'autres sections statiques, ajoute t("clé") */}
    </main>
  );
}
