/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { t } from "@/lib/i18n";
// import { assets } from "../public/assets/assets"; // Supprimé

interface Car {
  _id: string;
  owner: string;
  brand: string;
  model: string;
  image: any;
  year: number;
  category: string;
  seating_capacity: number;
  fuel_type: string;
  transmission: string;
  price: number;
  location: string;
  description: string;
  isAvaliable: boolean;
  createdAt: string;
}

export default function CarCard({ car }: { car: Car }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    }
  }, []);

  const handleBuy = () => {
    if (!car.isAvaliable) return;
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setShowOrder(true);
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');
    setOrderSuccess('');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      setOrderError('Vous devez être connecté');
      return;
    }
    if (!startDate || !endDate) {
      setOrderError('Veuillez choisir les dates');
      return;
    }
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          car: car._id,
          user: user._id,
          price: car.price,
          startDate,
          endDate
        })
      });
      const data = await res.json();
      if (!res.ok) setOrderError(data.error || 'Erreur lors de la commande');
      else {
        setOrderSuccess('Commande passée avec succès !');
        setShowOrder(false);
        setStartDate('');
        setEndDate('');
      }
    } catch (err) {
      setOrderError('Erreur serveur');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
            <p className="text-gray-500 mt-1">{car.year} • {car.category}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            Prix : MRU{car.price}
          </span>
        </div>
        <div className="mt-4 h-48 overflow-hidden rounded-lg">
          <Image 
            src={car.image} 
            alt={`${car.brand} ${car.model}`}
            width={400}
            height={192}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="flex items-center">
            <span className="mr-2">👥</span>
            <span className="text-gray-600">{car.seating_capacity} places</span>
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
        <p className="mt-4 text-gray-700 line-clamp-2 h-12">
          {car.description}
        </p>
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-1">⭐</span>
            <span className="font-semibold">4.8</span>
            <span className="text-gray-500 ml-1">(128 avis)</span>
          </div>
          <div className="flex flex-col gap-2 items-end">
          <button 
            className={`font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${car.isAvaliable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!car.isAvaliable}
              onClick={handleBuy}
          >
            Acheter
          </button>
            {showOrder && (
              <form onSubmit={handleOrder} className="bg-white border rounded p-4 mt-2 flex flex-col gap-2 shadow-lg z-10">
                <label className="text-sm font-medium">Début</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="border rounded p-2" />
                <label className="text-sm font-medium">Fin</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="border rounded p-2" />
                {orderError && <div className="text-red-500 text-xs">{orderError}</div>}
                <button type="submit" className="bg-indigo-600 text-white rounded py-2 font-bold mt-2">Confirmer</button>
                <button type="button" className="text-gray-500 text-xs mt-1 underline" onClick={() => setShowOrder(false)}>Annuler</button>
              </form>
            )}
            {orderSuccess && <div className="text-green-600 text-xs mt-2">{orderSuccess}</div>}
            <div className="flex gap-2 mt-4">
              <Link href={`/cars/${car._id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm text-center">{t("detail")}</Link>
   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}