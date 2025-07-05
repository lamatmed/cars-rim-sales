/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function MyOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { lang, isClient } = useLanguage();

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setError(isClient ? (lang === 'AR' ? 'خطأ في التحميل' : 'Erreur lors du chargement') : '');
        setLoading(false);
      });
  }, [id, isClient, lang]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24">
      <div className="text-center">
        {isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24">
      <div className="text-red-500 text-center">{error}</div>
    </div>
  );
  
  if (!order) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24">
      <div className="text-center text-gray-500">
        {isClient ? (lang === 'AR' ? 'الطلب غير موجود.' : 'Commande non trouvée.') : ''}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-2xl mx-auto px-4 py-18">
        <Link href="/my-orders" className="inline-flex items-center text-indigo-600 hover:underline font-medium mb-4">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          {isClient ? (lang === 'AR' ? 'العودة إلى طلباتي' : 'Retour à mes commandes') : ''}
        </Link>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isClient ? (lang === 'AR' ? 'تفاصيل الطلب' : 'Détail de la commande') : ''}
          </h1>
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <Image src={order.car.image} alt={order.car.brand} width={180} height={120} className="rounded-lg object-cover" />
            <div>
              <div className="font-bold text-lg">{order.car.brand} {order.car.model}</div>
              <div className="text-gray-500 text-sm">{order.car.year} • {order.car.category}</div>
              <div className="text-gray-500 text-sm">{order.car.location}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-gray-700 font-medium">
              {isClient ? (lang === 'AR' ? 'السعر' : 'Prix') : ''}: <span className="text-indigo-600 font-bold">MRU{order.price}</span>
            </div>
            <div className="text-gray-700 font-medium">
              {isClient ? (lang === 'AR' ? 'من' : 'Du') : ''}: <span className="font-semibold">{new Date(order.startDate).toLocaleDateString()}</span> {isClient ? (lang === 'AR' ? 'إلى' : 'au') : ''} <span className="font-semibold">{new Date(order.endDate).toLocaleDateString()}</span>
            </div>
            <div className="text-gray-700 font-medium">
              {isClient ? (lang === 'AR' ? 'الحالة' : 'Statut') : ''}: <span className={`px-3 py-1 rounded-lg font-semibold text-sm ${
                order.status === 'confirmée' ? 'bg-green-100 text-green-700' : 
                order.status === 'refusée' ? 'bg-red-100 text-red-700' : 
                'bg-yellow-100 text-yellow-700'
              }`}>
                {order.status === 'confirmée' ? 
                  (isClient ? (lang === 'AR' ? 'مؤكدة' : 'Confirmée') : '') : 
                  order.status === 'refusée' ? 
                  (isClient ? (lang === 'AR' ? 'مرفوضة' : 'Refusée') : '') : 
                  (isClient ? (lang === 'AR' ? 'في الانتظار' : 'En attente') : '')
                }
              </span>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            {isClient ? (lang === 'AR' ? 'تم تقديم الطلب في' : 'Commande passée le') : ''} {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
      </section>
    </main>
  );
} 