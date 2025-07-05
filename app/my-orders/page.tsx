/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function MyOrdersPage() {
  const { lang, isClient } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(isClient ? (lang === 'AR' ? 'خطأ في التحميل' : 'Erreur lors du chargement') : '');
        setLoading(false);
      });
  }, [isClient, lang]);

  if (loading) return <div>{isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}</div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;
  if (orders.length === 0) return <div className="text-center text-gray-500 pt-24">
    {isClient ? (lang === 'AR' ? 'لا توجد طلبات.' : 'Aucune commande trouvée.') : ''}
  </div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          {isClient ? (lang === 'AR' ? 'طلباتي' : 'Mes commandes') : ''}
        </h1>
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={order.car.image} alt={order.car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{order.car.brand} {order.car.model}</h2>
                <p className="text-gray-600">{order.car.year} • {order.car.category}</p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'المكان: ' : 'Lieu : ') : ''}{order.car.location}
                </p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'السعر: ' : 'Prix : ') : ''}MRU{order.price}
                </p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'التاريخ: ' : 'Date : ') : ''}{new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/my-orders/${order._id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm text-center">
                  {isClient ? (lang === 'AR' ? 'عرض' : 'Voir') : ''}
                </Link>
              </div>
              <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${order.status === 'confirmée' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {isClient ? (lang === 'AR' ? 
                  (order.status === 'confirmée' ? 'مؤكدة' : 
                   order.status === 'en attente' ? 'في الانتظار' : order.status) : 
                  order.status) : ''}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
