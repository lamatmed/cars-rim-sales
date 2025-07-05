/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function ManageCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { lang, isClient } = useLanguage();

  const fetchCars = async () => {
    setLoading(true);
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        setError(isClient ? (lang === 'AR' ? 'يجب تسجيل الدخول' : 'Vous devez être connecté') : '');
        setLoading(false);
        return;
      }
      const res = await fetch("/api/cars");
      const data = await res.json();
      if (res.ok) {
        // Filtrer les voitures appartenant à ce propriétaire
        const myCars = Array.isArray(data) ? data.filter((car: any) => car.owner && (car.owner._id === user._id || car.owner === user._id)) : [];
        setCars(myCars as any);
      } else setError(data.error || (isClient ? (lang === 'AR' ? 'خطأ في التحميل' : 'Erreur lors du chargement') : ''));
    } catch (err) {
      setError(isClient ? (lang === 'AR' ? 'خطأ في التحميل' : 'Erreur lors du chargement') : '');
    }
    setLoading(false);
  };

  useEffect(() => { fetchCars(); }, [isClient, lang]);

  const handleDelete = async (id: string) => {
    const confirmMessage = isClient ? 
      (lang === 'AR' ? 'هل تريد حذف هذه السيارة؟' : 'Supprimer cette voiture ?') : 
      'Supprimer cette voiture ?';
    
    if (!confirm(confirmMessage)) return;
    
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (res.ok) fetchCars();
    else {
      const errorMessage = isClient ? 
        (lang === 'AR' ? 'خطأ في الحذف' : 'Erreur lors de la suppression') : 
        'Erreur lors de la suppression';
      alert(errorMessage);
    }
  };

  if (loading) return <div className="text-center pt-24">
    {isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}
  </div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;
  if (cars.length === 0) return <div className="text-center text-gray-500 pt-24">
    {isClient ? (lang === 'AR' ? 'لا توجد سيارات' : 'Aucune voiture') : ''}
  </div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <div className="mb-6">
          <Link href="/owner" className="inline-flex items-center text-indigo-600 hover:underline font-medium mb-4">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {isClient ? (lang === 'AR' ? 'العودة' : 'Retour') : ''}
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          {isClient ? (lang === 'AR' ? 'إدارة السيارات' : 'Gérer les voitures') : ''}
        </h1>
        <div className="space-y-6">
          {cars.map((car: any) => (
            <div key={car._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={car.image} alt={car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                <p className="text-gray-600">{car.year} • {car.category}</p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'الموقع' : 'Localisation') : ''}: {car.location}
                </p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'السعر' : 'Prix') : ''}: MRU{car.price}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link 
                  href={`/owner/manage-cars/${car._id}/edit`} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm text-center"
                >
                  {isClient ? (lang === 'AR' ? 'تعديل' : 'Modifier') : ''}
                </Link>
                <button 
                  onClick={() => handleDelete(car._id)} 
                  className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-lg text-sm"
                >
                  {isClient ? (lang === 'AR' ? 'حذف' : 'Supprimer') : ''}
                </button>
                <Link 
                  href={`/cars/${car._id}`} 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm text-center"
                >
                  {isClient ? (lang === 'AR' ? 'عرض' : 'Voir') : ''}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
