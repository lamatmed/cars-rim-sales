/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ManageCarsPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCars = async () => {
    setLoading(true);
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        setError(t("manage_cars.not_logged_in"));
        setLoading(false);
        return;
      }
      const res = await fetch("/api/cars");
      const data = await res.json();
      if (res.ok) {
        // Filtrer les voitures appartenant à ce propriétaire
        const myCars = Array.isArray(data) ? data.filter((car: any) => car.owner && (car.owner._id === user._id || car.owner === user._id)) : [];
        setCars(myCars as any);
      } else setError(data.error || t("manage_cars.loading_error"));
    } catch (err) {
      setError(t("manage_cars.loading_error"));
    }
    setLoading(false);
  };

  useEffect(() => { fetchCars(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(t("manage_cars.delete_confirmation"))) return;
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (res.ok) fetchCars();
    else alert(t("manage_cars.delete_error"));
  };

  if (loading) return <div>{t("manage_cars.loading")}</div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;
  if (cars.length === 0) return <div className="text-center text-gray-500 pt-24">{t("manage_cars.no_cars_found")}</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <div className="mb-6">
          <Link href="/owner" className="inline-flex items-center text-indigo-600 hover:underline font-medium mb-4">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t("manage_cars.back_to_dashboard")}
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">{t("manage_cars.manage_my_cars")}</h1>
        <div className="space-y-6">
          {cars.map((car: any) => (
            <div key={car._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={car.image} alt={car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                <p className="text-gray-600">{car.year} • {car.category}</p>
                <p className="text-gray-500 mt-1">{t("manage_cars.location")}: {car.location}</p>
                <p className="text-gray-500 mt-1">{t("manage_cars.price")}: MRU{car.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/owner/manage-cars/${car._id}/edit`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm text-center">{t("manage_cars.edit")}</Link>
                <button onClick={() => handleDelete(car._id)} className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-lg text-sm">{t("manage_cars.delete")}</button>
                <Link href={`/cars/${car._id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm text-center">{t("manage_cars.view")}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
