/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { cityList } from '@/public/assets/assets';
import Uploader from '@/components/Uploader';

export default function EditCarPage() {
  const router = useRouter();
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setCar({
      ...car,
      [name]: type === 'checkbox' ? checked : value
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
    else setError('Erreur lors de la modification');
  };

  if (loading) return <div>Chargement...</div>;
  if (!car) return <div className="text-center text-gray-500 pt-24">Voiture non trouvée</div>;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Modifier la voiture</h1>
        <input className="w-full border rounded p-2" name="brand" placeholder="Marque" value={car.brand || ''} onChange={handleChange} required />
        <input className="w-full border rounded p-2" name="model" placeholder="Modèle" value={car.model || ''} onChange={handleChange} required />
        <input className="w-full border rounded p-2" name="year" type="number" placeholder="Année" value={car.year || ''} onChange={handleChange} required />
        <input className="w-full border rounded p-2" name="category" placeholder="Catégorie" value={car.category || ''} onChange={handleChange} />
        <input className="w-full border rounded p-2" name="seating_capacity" type="number" placeholder="Nombre de places" value={car.seating_capacity || ''} onChange={handleChange} />
        <input className="w-full border rounded p-2" name="fuel_type" placeholder="Type de carburant" value={car.fuel_type || ''} onChange={handleChange} />
        <input className="w-full border rounded p-2" name="transmission" placeholder="Transmission" value={car.transmission || ''} onChange={handleChange} />
        <input className="w-full border rounded p-2" name="price" type="number" placeholder="Prix" value={car.price || ''} onChange={handleChange} required />
        <div>
          <label className="block text-gray-700 font-medium mb-2">Ville</label>
          <select name="location" className="w-full border rounded p-2" value={car.location || ''} onChange={handleChange} required>
            <option value="">Sélectionner une ville</option>
            {cityList.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <textarea className="w-full border rounded p-2" name="description" placeholder="Description" value={car.description || ''} onChange={handleChange} rows={3} />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="isAvaliable" name="isAvaliable" checked={!!car.isAvaliable} onChange={handleChange} />
          <label htmlFor="isAvaliable" className="text-gray-700">Disponible</label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <Uploader onUpload={url => setCar({ ...car, image: url })} />
          {car.image && <img src={car.image} alt="Aperçu" className="mt-2 w-32 h-20 object-cover rounded" />}
        </div>
        {error && <div className="text-red-500 text-center pt-24">{error}</div>}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold">Enregistrer</button>
      </form>
    </main>
  );
} 