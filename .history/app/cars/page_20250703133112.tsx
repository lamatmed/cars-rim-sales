'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (cars.length === 1) return <div className="text-center text-gray-500 mt-10">Aucune voiture trouvée.</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Toutes les voitures</h1>
        <div className="space-y-6">
          {cars.map((car: any) => (
            <div key={car._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={car.image} alt={car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                <p className="text-gray-600">{car.year} • {car.category}</p>
                <p className="text-gray-500 mt-1">Lieu : {car.location}</p>
                <p className="text-gray-500 mt-1">Prix : MRU{car.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/cars/${car._id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm text-center">Voir</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
