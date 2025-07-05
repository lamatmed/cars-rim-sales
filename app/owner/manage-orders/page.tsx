/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { lang, isClient } = useLanguage();

  const fetchOrders = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const res = await fetch("/api/orders");
    const data = await res.json();
    if (res.ok) {
      const filtered = Array.isArray(data) && user ? data.filter((order: any) => order.car && order.car.owner && (order.car.owner._id === user._id || order.car.owner === user._id)) : [];
      setOrders(filtered as any);
    } else setError(data.error || (isClient ? (lang === 'AR' ? 'خطأ في التحميل' : 'Erreur lors du chargement') : ''));
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [isClient, lang]);

  const handleStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (res.ok) fetchOrders();
    else {
      const errorMessage = isClient ? 
        (lang === 'AR' ? 'خطأ في تحديث الحالة' : 'Erreur lors de la mise à jour du statut') : 
        'Erreur lors de la mise à jour du statut';
      alert(errorMessage);
    }
  };

  if (loading) return <div className="text-center pt-24">
    {isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}
  </div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;
  if (orders.length === 0) return <div className="text-center text-gray-500 pt-24">
    {isClient ? (lang === 'AR' ? 'لا توجد طلبات' : 'Aucune commande') : ''}
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
          {isClient ? (lang === 'AR' ? 'إدارة الطلبات' : 'Gérer les commandes') : ''}
        </h1>
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={order.car.image} alt={order.car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{order.car.brand} {order.car.model}</h2>
                <p className="text-gray-600">{order.car.year} • {order.car.category}</p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'الموقع' : 'Localisation') : ''}: {order.car.location}
                </p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'السعر' : 'Prix') : ''}: MRU{order.price}
                </p>
                <p className="text-gray-500 mt-1">
                  {isClient ? (lang === 'AR' ? 'التاريخ' : 'Date') : ''}: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleStatus(order._id, 'confirmée')} 
                  className="bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 px-4 rounded-lg text-sm"
                >
                  {isClient ? (lang === 'AR' ? 'قبول' : 'Accepter') : ''}
                </button>
                <button 
                  onClick={() => handleStatus(order._id, 'refusée')} 
                  className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-lg text-sm"
                >
                  {isClient ? (lang === 'AR' ? 'رفض' : 'Refuser') : ''}
                </button>
                <Link 
                  href="#" 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm text-center"
                >
                  {isClient ? (lang === 'AR' ? 'عرض' : 'Voir') : ''}
                </Link>
              </div>
              <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                order.status === 'confirmée' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {order.status === 'confirmée' ? 
                  (isClient ? (lang === 'AR' ? 'مؤكدة' : 'Confirmée') : '') : 
                  (isClient ? (lang === 'AR' ? 'في الانتظار' : 'En attente') : '')
                }
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
