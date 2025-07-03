import { dummyCarData } from "../public/assets/assets";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-16 ">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        Voitures à vendre
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {dummyCarData.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}
