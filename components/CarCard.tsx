/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from "@/lib/i18n.tsx";
import { FaWhatsapp } from 'react-icons/fa';
// import { assets } from "../public/assets/assets"; // Supprimé

interface UserOwner {
  _id: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  // autres champs si besoin
}

interface Car {
  _id: string;
  owner: string | UserOwner;
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
  const { lang, isClient } = useLanguage();
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
      setOrderError(isClient ? (lang === 'AR' ? 'يجب أن تكون مسجلاً للدخول' : 'Vous devez être connecté') : '');
      return;
    }
    if (!startDate || !endDate) {
      setOrderError(isClient ? (lang === 'AR' ? 'يرجى اختيار التواريخ' : 'Veuillez choisir les dates') : '');
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
      if (!res.ok) setOrderError(data.error || (isClient ? (lang === 'AR' ? 'خطأ في الطلب' : 'Erreur lors de la commande') : ''));
      else {
        setOrderSuccess(isClient ? (lang === 'AR' ? 'تم الطلب بنجاح!' : 'Commande passée avec succès !') : '');
        setShowOrder(false);
        setStartDate('');
        setEndDate('');
      }
    } catch (err) {
      setOrderError(isClient ? (lang === 'AR' ? 'خطأ في الخادم' : 'Erreur serveur') : '');
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
            {isClient ? (lang === 'AR' ? 'السعر: ' : 'Prix : ') : ''}MRU{car.price}
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
            <span className="text-gray-600">{car.seating_capacity} {isClient ? (lang === 'AR' ? 'مقاعد' : 'places') : ''}</span>
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
            <span className="text-gray-500 ml-1">(128 {isClient ? (lang === 'AR' ? 'تقييم' : 'avis') : ''})</span>
          </div>
          <div className="flex flex-col gap-2 items-end">
          <button 
            className={`font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${car.isAvaliable ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!car.isAvaliable}
              onClick={handleBuy}
          >
            {isClient ? (lang === 'AR' ? 'مهتم' : 'Intéressant') : ''}
          </button>
            {showOrder && (
              <form onSubmit={handleOrder} className="bg-white border rounded p-4 mt-2 flex flex-col gap-2 shadow-lg z-10">
                <label className="text-sm font-medium">{isClient ? (lang === 'AR' ? 'البداية' : 'Début') : ''}</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="border rounded p-2" />
                <label className="text-sm font-medium">{isClient ? (lang === 'AR' ? 'النهاية' : 'Fin') : ''}</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="border rounded p-2" />
                {orderError && <div className="text-red-500 text-xs">{orderError}</div>}
                <button type="submit" className="bg-indigo-600 text-white rounded py-2 font-bold mt-2">
                  {isClient ? (lang === 'AR' ? 'تأكيد' : 'Confirmer') : ''}
                </button>
                <button type="button" className="text-gray-500 text-xs mt-1 underline" onClick={() => setShowOrder(false)}>
                  {isClient ? (lang === 'AR' ? 'إلغاء' : 'Annuler') : ''}
                </button>
              </form>
            )}
            {orderSuccess && <div className="text-green-600 text-xs mt-2">{orderSuccess}</div>}
            <div className="flex gap-2 mt-4">
              <Link href={`/cars/${car._id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm text-center">
                {isClient ? (lang === 'AR' ? 'تفاصيل' : 'Détail') : ''}
              </Link>
              {typeof car.owner === 'object' && car.owner && 'phone' in car.owner && car.owner.phone && (
                <a
                  href={`https://wa.me/${car.owner.phone.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:bg-green-200 text-white font-bold py-2 px-4 rounded-lg text-sm text-center"
                >
                 <FaWhatsapp className="text-green-500 text-2xl" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}