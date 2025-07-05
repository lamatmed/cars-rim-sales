/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { lang, isClient } = useLanguage();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${params.id}`);
        const data = await res.json();
        if (res.ok) {
          setCar(data);
        } else {
          setError("Voiture non trouvée");
        }
      } catch (err) {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24">
      <div className="text-center">
        {isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}
      </div>
    </div>
  );

  if (error || !car) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24">
      <div className="text-center text-red-500">
        {isClient ? (lang === 'AR' ? 'السيارة غير موجودة' : 'Voiture non trouvée') : ''}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24">
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{car.brand} {car.model}</h1>
              <p className="text-gray-500 mt-1">{car.year} • {car.category}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">
              {isClient ? (lang === 'AR' ? 'السعر' : 'Prix') : ''}: MRU{car.price}
            </span>
          </div>
          <div className="mt-4 h-64 overflow-hidden rounded-lg">
            <Image 
              src={car.image} 
              alt={`${car.brand} ${car.model}`}
              width={600}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center">
              <span className="mr-2">👥</span>
              <span className="text-gray-600">
                {car.seating_capacity} {isClient ? (lang === 'AR' ? 'مقاعد' : 'places') : ''}
              </span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">⛽</span>
              <span className="text-gray-600">{car.fuel_type}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🚗</span>
              <span className="text-gray-600">{car.transmission}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span className="text-gray-600">{car.location}</span>
            </div>
          </div>
          <p className="mt-6 text-gray-700">
            {car.description}
          </p>
          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-1">⭐</span>
              <span className="font-semibold">4.8</span>
              <span className="text-gray-500 ml-1">
                {isClient ? (lang === 'AR' ? '(128 تقييم)' : '(128 avis)') : ''}
              </span>
            </div>
            <button 
              className={`font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${car.isAvaliable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!car.isAvaliable}
            >
              {isClient ? (lang === 'AR' ? 'شراء' : 'Acheter') : ''}
            </button>
          </div>
          <Link 
            href="/cars" 
            className="inline-block mt-8 text-indigo-600 hover:underline"
          >
            {isClient ? (lang === 'AR' ? 'العودة إلى القائمة' : 'Retour à la liste') : ''}
          </Link>
        </div>
      </div>
    </main>
  );
}

