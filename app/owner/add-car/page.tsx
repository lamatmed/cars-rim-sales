/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { assets, cityList } from "../../../public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import Uploader from "@/components/Uploader";
import { t } from "@/lib/i18n";

export default function AddCarPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [seating_capacity, setSeatingCapacity] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [description, setDescription] = useState("");
  const [isAvaliable, setIsAvaliable] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
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
          image,
          year: Number(year),
          category,
          seating_capacity: Number(seating_capacity),
          fuel_type,
          transmission,
          price: Number(price),
          location,
          description,
          isAvaliable
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">{t("addCar")}</h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">{t("brand")}</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Marque" value={brand} onChange={e => setBrand(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">{t("model")}</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Modèle" value={model} onChange={e => setModel(e.target.value)} required />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">{t("year")}</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Année" value={year} onChange={e => setYear(e.target.value)} required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">{t("category")}</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Catégorie" value={category} onChange={e => setCategory(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Nombre de places</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Places" value={seating_capacity} onChange={e => setSeatingCapacity(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Type de carburant</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Carburant" value={fuel_type} onChange={e => setFuelType(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Transmission</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Transmission" value={transmission} onChange={e => setTransmission(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">{t("price")}</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Prix" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("location")}</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={location} onChange={e => setLocation(e.target.value)} required>
                <option value="">{t("selectCity")}</option>
                {cityList.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Description" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isAvaliable" checked={isAvaliable} onChange={e => setIsAvaliable(e.target.checked)} />
              <label htmlFor="isAvaliable" className="text-gray-700">{t("available")}</label>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">{t("image")}</label>
              <Uploader onUpload={setImage} />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all" disabled={loading}>
              {loading ? t("loading") : t("add")}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
