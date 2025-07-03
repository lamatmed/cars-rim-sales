'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { assets, cityList } from "../../../public/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function AddCarPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Récupérer l'utilisateur connecté
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        setError("Vous devez être connecté");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: user._id,
          brand,
          model,
          year: Number(year),
          price: Number(price),
          location,
          image
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'ajout");
      } else {
        router.push("/owner/manage-cars");
      }
    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <section className="flex-1 flex flex-col justify-center items-center py-18">
        <div className="w-full max-w-2xl mb-6">
          <Link href="/owner" className="inline-flex items-center text-indigo-600 hover:underline font-medium mb-4">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour au tableau de bord
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <div className="flex flex-col items-center mb-6">
            <Image src={assets.addIconColored} alt="Ajouter" width={48} height={48} className="mb-2" />
            <h1 className="text-2xl font-bold text-gray-900">Ajouter une voiture</h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Marque</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Marque" value={brand} onChange={e => setBrand(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Modèle</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Modèle" value={model} onChange={e => setModel(e.target.value)} required />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Année</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Année" value={year} onChange={e => setYear(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Catégorie</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Catégorie" required />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Nombre de places</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Places" required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Type de carburant</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Carburant" required />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Transmission</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Transmission" required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Prix (MRU)</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Prix" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ville</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                <option value="">Sélectionner une ville</option>
                {cityList.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Description" rows={3} required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Image</label>
              <input type="file" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" accept="image/*" />
            </div>
            {error && <div className="text-red-500 text-center pt-24">{error}</div>}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all" disabled={loading}>
              {loading ? "Ajout..." : "Ajouter la voiture"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
