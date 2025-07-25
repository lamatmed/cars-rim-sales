/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { assets } from "../../public/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

export default function OwnerDashboard() {
  const [carCount, setCarCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { lang, isClient } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) {
          setError(isClient ? (lang === 'AR' ? 'يجب تسجيل الدخول' : 'Vous devez être connecté') : '');
          setLoading(false);
          return;
        }
        setIsAdmin(user.role === "admin");
        // Récupérer toutes les voitures
        const carsRes = await fetch("/api/cars");
        const carsData = await carsRes.json();
        const myCars = Array.isArray(carsData) ? carsData.filter((car: any) => car.owner && (car.owner._id === user._id || car.owner === user._id)) : [];
        setCarCount(myCars.length);
        // Récupérer toutes les commandes
        const ordersRes = await fetch("/api/orders");
        const ordersData = await ordersRes.json();
        // Commandes reçues = commandes dont la voiture appartient à ce propriétaire
        const myOrders = Array.isArray(ordersData) ? ordersData.filter((order: any) => order.car && order.car.owner && (order.car.owner._id === user._id || order.car.owner === user._id)) : [];
        setOrderCount(myOrders.length);
      } catch (err) {
        setError(isClient ? (lang === 'AR' ? 'خطأ في التحميل' : 'Erreur lors du chargement') : '');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isClient, lang]);

  if (loading) return <div className="text-center pt-24">
    {isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}
  </div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          {isClient ? (lang === 'AR' ? 'لوحة التحكم' : 'Tableau de bord') : ''}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Image 
              src={assets.carIconColored} 
              alt={isClient ? (lang === 'AR' ? 'السيارات' : 'Voitures') : ''} 
              width={40} 
              height={40} 
            />
            <span className="text-2xl font-bold mt-2">{carCount}</span>
            <span className="text-gray-600">
              {isClient ? (lang === 'AR' ? 'سيارات للبيع' : 'Voitures à vendre') : ''}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Image 
              src={assets.listIconColored} 
              alt={isClient ? (lang === 'AR' ? 'الطلبات المستلمة' : 'Commandes reçues') : ''} 
              width={40} 
              height={40} 
            />
            <span className="text-2xl font-bold mt-2">{orderCount}</span>
            <span className="text-gray-600">
              {isClient ? (lang === 'AR' ? 'الطلبات المستلمة' : 'Commandes reçues') : ''}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Image 
              src={assets.addIconColored} 
              alt={isClient ? (lang === 'AR' ? 'إضافة سيارة جديدة' : 'Ajouter une nouvelle voiture') : ''} 
              width={40} 
              height={40} 
            />
            <span className="text-2xl font-bold mt-2">+1</span>
            <span className="text-gray-600">
              {isClient ? (lang === 'AR' ? 'إضافة سيارة جديدة' : 'Ajouter une nouvelle voiture') : ''}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link 
            href="/owner/add-car" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center"
          >
            {isClient ? (lang === 'AR' ? 'إضافة سيارة' : 'Ajouter une voiture') : ''}
          </Link>
          <Link 
            href="/owner/manage-cars" 
            className="bg-white border border-indigo-600 text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center"
          >
            {isClient ? (lang === 'AR' ? 'إدارة السيارات' : 'Gérer les voitures') : ''}
          </Link>
          <Link 
            href="/owner/manage-orders" 
            className="bg-white border border-indigo-600 text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center"
          >
            {isClient ? (lang === 'AR' ? 'إدارة الطلبات' : 'Gérer les commandes') : ''}
          </Link>
          {isAdmin && (
            <Link 
              href="/users" 
              className="bg-white border border-red-600 text-red-600 font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center"
            >
              {isClient ? (lang === 'AR' ? 'إدارة المستخدمين' : 'Gérer les utilisateurs') : ''}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
