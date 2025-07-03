;
import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";

import { useEffect, useState } from "react";


export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-[#181A20]">
     
      <Hero />
      <FeaturedCars />
   
    </main>
  );
}
