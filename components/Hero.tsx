/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { assets, cityList } from "../public/assets/assets";
import Image from "next/image";
import { FiMapPin, FiSearch, FiChevronDown } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { useLanguage } from "@/lib/i18n.tsx";

export default function Hero() {
  const router = useRouter();
  const { lang, isClient } = useLanguage();
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const [error, setError] = useState("");

  React.useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => {
        setCars(Array.isArray(data) ? data : []);
      });
  }, []);

  // Marques et modèles dynamiques selon la ville sélectionnée
  const filteredCars = selectedCity ? cars.filter(car => car.location === selectedCity) : cars;
  const uniqueBrands = Array.from(new Set(filteredCars.map(car => car.brand)));
  const filteredByBrand = selectedBrand ? filteredCars.filter(car => car.brand === selectedBrand) : filteredCars;
  const uniqueModels = Array.from(new Set(filteredByBrand.map(car => car.model)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity) params.append('city', selectedCity);
    if (selectedBrand) params.append('brand', selectedBrand);
    if (selectedModel) params.append('model', selectedModel);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 px-4 overflow-hidden">
      {/* Fond avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0"></div>
      {/* Motifs décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full z-1 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-indigo-400"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-400"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-indigo-300"></div>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Section texte et formulaire */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left mb-4 text-gray-800 leading-tight">
            <span className="block">
              {isClient ? (lang === 'AR' ? 'اشترِ السيارة' : 'Achetez la voiture') : ''}
            </span>
            <span className="block text-indigo-600">
              {isClient ? (lang === 'AR' ? 'التي تحلم بها' : 'de vos rêves') : ''}
            </span>
          </h1>
          <p className="text-gray-600 text-center md:text-left mb-8 max-w-md">
            {isClient ? (lang === 'AR' ? 
              'ابحث عن السيارة المثالية لشرائك القادم. مجموعة واسعة، أسعار تنافسية، ومعاملة آمنة.' : 
              'Trouvez la voiture parfaite pour votre prochain achat. Large sélection, prix compétitifs, et transaction sécurisée.') : ''}
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl"
          >
            <div className="space-y-5">
              {/* Champ de ville */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isClient ? (lang === 'AR' ? 'المدينة' : 'Ville') : ''}
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedCity}
                    onChange={e => {
                      setSelectedCity(e.target.value);
                      setSelectedBrand("");
                      setSelectedModel("");
                    }}
                    required
                    className="w-full pl-10 pr-4 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="">
                      {isClient ? (lang === 'AR' ? 'اختر مدينة' : 'Sélectionner une ville') : ''}
                    </option>
                    {cityList.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {/* Champ de marque */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isClient ? (lang === 'AR' ? 'الماركة' : 'Marque') : ''}
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={e => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel("");
                    }}
                    className="w-full pl-4 pr-4 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="">
                      {isClient ? (lang === 'AR' ? 'كل الماركات' : 'Toutes marques') : ''}
                    </option>
                    {uniqueBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {/* Champ de modèle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isClient ? (lang === 'AR' ? 'الموديل' : 'Modèle') : ''}
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={e => setSelectedModel(e.target.value)}
                    className="w-full pl-4 pr-4 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="">
                      {isClient ? (lang === 'AR' ? 'كل الموديلات' : 'Tous modèles') : ''}
                    </option>
                    {uniqueModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-4 font-medium rounded-lg transition-all mt-2 bg-indigo-600 hover:bg-indigo-700 text-white transform hover:-translate-y-0.5 shadow-md hover:shadow-lg`}
              >
                <FiSearch className="mr-2" />
                {isClient ? (lang === 'AR' ? 'ابحث' : 'Rechercher') : ''}
              </button>
              {error && <div className="text-red-500 text-center pt-4">{error}</div>}
            </div>
          </form>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                {isClient ? (lang === 'AR' ? 'بدون رسوم خفية' : 'Sans frais cachés') : ''}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                {isClient ? (lang === 'AR' ? 'معاملة آمنة' : 'Transaction sécurisée') : ''}
              </span>
            </div>
          </div>
        </div>
        {/* Section image de voiture */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative">
            <Image
              src={assets.main_car}
              alt="Voiture à vendre"
              width={500}
              height={350}
              className="w-full max-w-lg object-contain transition-transform duration-500 hover:scale-105"
              priority
            />
            {/* Effet de lueur */}
            <div className="absolute -bottom-10 -left-10 -right-10 h-32 bg-gradient-to-t from-indigo-500 to-transparent opacity-20 blur-3xl rounded-full z-0"></div>
          </div>
        </div>
      </div>
      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-20"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-current text-indigo-50 opacity-80"
          ></path>
        </svg>
      </div>
      {/* Les résultats sont maintenant affichés sur la page /search */}
    </div>
  );
}
