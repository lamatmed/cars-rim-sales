/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";
import { cityList } from "@/public/assets/assets";
import Uploader from "@/components/Uploader";

export default function AddCarPage() {
  const router = useRouter();
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    category: "",
    location: "",
    price: "",
    image: "",
    isAvaliable: true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e:any) => {
    const { name, value, type } = e.target;
    const inputValue = type === "checkbox" ? e.target.checked : value;
    setCar({ ...car, [name]: inputValue });
  };

  const handleSubmit = async (e :any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });
      if (res.ok) router.push("/owner/manage-cars");
      else setError(t("addCarError") || "Erreur lors de l'ajout");
    } catch {
      setError(t("addCarError") || "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-2xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">{t("addCar")}</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t("brand")}</label>
            <input type="text" name="brand" value={car.brand} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t("model")}</label>
            <input type="text" name="model" value={car.model} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t("year")}</label>
            <input type="number" name="year" value={car.year} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t("category")}</label>
            <input type="text" name="category" value={car.category} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t("location")}</label>
            <select name="location" value={car.location} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">{t("selectCity")}</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t("price")}</label>
            <input type="number" name="price" value={car.price} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t("image")}</label>
            <Uploader value={car.image} onChange={(url) => setCar({ ...car, image: url })} />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="isAvaliable" checked={car.isAvaliable} onChange={handleChange} className="mr-2" />
            <span className="text-gray-700">{t("available")}</span>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all">
            {loading ? t("loading") : t("add")}
          </button>
        </form>
      </section>
    </main>
  );
}
