/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { cityList } from '@/public/assets/assets';
import Uploader from '@/components/Uploader';
import { useLanguage } from '@/lib/i18n';

export default function EditCarPage() {
  const router = useRouter();
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { lang, isClient } = useLanguage();

  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setLoading(false);
      });
  }, [id]);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;
  
  // Correction du problème de type pour les checkboxes
  const inputValue = type === 'checkbox' 
    ? (e.target as HTMLInputElement).checked 
    : value;
  
  setCar({
    ...car,
    [name]: inputValue
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/cars/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    });
    if (res.ok) router.push('/owner/manage-cars');
    else setError(isClient ? (lang === 'AR' ? 'خطأ في التعديل' : 'Erreur lors de la modification') : '');
  };

  if (loading) return <div className="text-center pt-24">
    {isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}
  </div>;
  if (!car) return <div className="text-center text-gray-500 pt-24">
    {isClient ? (lang === 'AR' ? 'السيارة غير موجودة' : 'Voiture non trouvée') : ''}
  </div>;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">
          {isClient ? (lang === 'AR' ? 'تعديل السيارة' : 'Modifier la voiture') : ''}
        </h1>
        <input 
          className="w-full border rounded p-2" 
          name="brand" 
          placeholder={isClient ? (lang === 'AR' ? 'الماركة' : 'Marque') : ''} 
          value={car.brand || ''} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="w-full border rounded p-2" 
          name="model" 
          placeholder={isClient ? (lang === 'AR' ? 'الموديل' : 'Modèle') : ''} 
          value={car.model || ''} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="w-full border rounded p-2" 
          name="year" 
          type="number" 
          placeholder={isClient ? (lang === 'AR' ? 'السنة' : 'Année') : ''} 
          value={car.year || ''} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="w-full border rounded p-2" 
          name="category" 
          placeholder={isClient ? (lang === 'AR' ? 'الفئة' : 'Catégorie') : ''} 
          value={car.category || ''} 
          onChange={handleChange} 
        />
        <input 
          className="w-full border rounded p-2" 
          name="seating_capacity" 
          type="number" 
          placeholder={isClient ? (lang === 'AR' ? 'عدد المقاعد' : 'Nombre de places') : ''} 
          value={car.seating_capacity || ''} 
          onChange={handleChange} 
        />
        <input 
          className="w-full border rounded p-2" 
          name="fuel_type" 
          placeholder={isClient ? (lang === 'AR' ? 'نوع الوقود' : 'Type de carburant') : ''} 
          value={car.fuel_type || ''} 
          onChange={handleChange} 
        />
        <input 
          className="w-full border rounded p-2" 
          name="transmission" 
          placeholder={isClient ? (lang === 'AR' ? 'ناقل الحركة' : 'Transmission') : ''} 
          value={car.transmission || ''} 
          onChange={handleChange} 
        />
        <input 
          className="w-full border rounded p-2" 
          name="price" 
          type="number" 
          placeholder={isClient ? (lang === 'AR' ? 'السعر' : 'Prix') : ''} 
          value={car.price || ''} 
          onChange={handleChange} 
          required 
        />
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {isClient ? (lang === 'AR' ? 'الموقع' : 'Ville') : ''}
          </label>
          <select 
            name="location" 
            className="w-full border rounded p-2" 
            value={car.location || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">
              {isClient ? (lang === 'AR' ? 'اختر المدينة' : 'Sélectionner une ville') : ''}
            </option>
            {cityList.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <textarea 
          className="w-full border rounded p-2" 
          name="description" 
          placeholder={isClient ? (lang === 'AR' ? 'الوصف' : 'Description') : ''} 
          value={car.description || ''} 
          onChange={handleChange} 
          rows={3} 
        />
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="isAvaliable" 
            name="isAvaliable" 
            checked={!!car.isAvaliable} 
            onChange={handleChange} 
          />
          <label htmlFor="isAvaliable" className="text-gray-700">
            {isClient ? (lang === 'AR' ? 'متاح' : 'Disponible') : ''}
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {isClient ? (lang === 'AR' ? 'الصورة' : 'Image') : ''}
          </label>
          <Uploader onUpload={url => setCar({ ...car, image: url })} />
          {car.image && <img src={car.image} alt="Aperçu" className="mt-2 w-32 h-20 object-cover rounded" />}
        </div>
        {error && <div className="text-red-500 text-center pt-24">{error}</div>}
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 rounded font-bold"
        >
          {isClient ? (lang === 'AR' ? 'حفظ' : 'Enregistrer') : ''}
        </button>
      </form>
    </main>
  );
} 