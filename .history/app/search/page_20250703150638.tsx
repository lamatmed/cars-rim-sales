"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<any[]>([]);
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

  const city = searchParams.get("city") || "";
  const brand = searchParams.get("brand") || "";
  const model = searchParams.get("model") || "";
  const q = searchParams.get("q") || "";

  let filtered = cars;
  if (city) filtered = filtered.filter(car => car.location === city);
  if (brand) filtered = filtered.filter(car => car.brand === brand);
  if (model) filtered = filtered.filter(car => car.model === model);
  if (q) {
    const qLower = q.toLowerCase();
    filtered = filtered.filter(car =>
      car.brand.toLowerCase().includes(qLower) ||
      car.model.toLowerCase().includes(qLower)
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Résultats de recherche</h1>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500 text-center pt-24">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 pt-24">Aucune voiture trouvée pour ces critères.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map(car => (
              <div key={car._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
                <Image src={car.image} alt={car.brand} width={180} height={120} className="rounded-lg object-cover mb-2" />
                <div className="font-bold text-lg">{car.brand} {car.model}</div>
                <div className="text-gray-500 text-sm">{car.year} • {car.category}</div>
                <div className="text-gray-500 text-sm">{car.location}</div>
                <div className="text-indigo-600 font-bold mt-2">MRU{car.price}</div>
                <Link href={`/cars/${car._id}`} className="mt-2 text-blue-600 hover:underline text-sm font-medium">Détail</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
} 