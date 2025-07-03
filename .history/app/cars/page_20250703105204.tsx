import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { dummyCarData } from "../../public/assets/assets";
import CarCard from "../../components/CarCard";
import Link from "next/link";

export default function CarsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Toutes les voitures à vendre</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dummyCarData.map((car) => (
            <Link key={car._id} href={`/cars/${car._id}`} className="block hover:scale-105 transition-transform">
              <CarCard car={car} />
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
