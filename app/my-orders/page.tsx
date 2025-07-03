/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/i18n";

export default function MyOrdersPage() {
  // Tous les hooks sont toujours appelés
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;
    const user = JSON.parse(localStorage.getItem("user") || "null");
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        const filtered = Array.isArray(data) && user ? data.filter((order: any) => order.user && (order.user._id === user._id || order.user === user._id)) : [];
        setOrders(filtered as any);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement");
        setLoading(false);
      });
  }, [isClient]);

  // Rendu conditionnel : le JSX dynamique seulement si isClient
  if (!isClient) return null;

  if (loading) return <div>{t("loading") || "Chargement..."}</div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;
  if (orders.length === 0) return <div className="text-center text-gray-500 pt-24">{t("noOrders")}</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">{t("myOrders")}</h1>
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={order.car.image} alt={order.car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{order.car.brand} {order.car.model}</h2>
                <p className="text-gray-600">{order.car.year} • {order.car.category}</p>
                <p className="text-gray-500 mt-1">Lieu : {order.car.location}</p>
                <p className="text-gray-500 mt-1">Prix : MRU{order.price}</p>
                <p className="text-gray-500 mt-1">Date : {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/my-orders/${order._id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm text-center">{t("view")}</Link>
              </div>
              <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${order.status === 'confirmée' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
