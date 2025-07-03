'use client'
import { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => {
        setCars(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;
  if (!Array.isArray(cars) || cars.length === 0) {
    return <div className="text-center text-gray-500 pt-24">Aucune voiture trouvée.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Toutes les voitures</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cars.map((car: any) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
}
