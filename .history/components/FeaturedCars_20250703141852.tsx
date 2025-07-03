/* eslint-disable react/no-unescaped-entities */
'use client'
import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => {
        setCars(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Voitures à vendre
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules premium disponibles à l'achat.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.filter(car => car.isAvaliable).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/cars" className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300">
            Voir toutes les voitures
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
