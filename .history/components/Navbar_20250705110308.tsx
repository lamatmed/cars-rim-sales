/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { assets, menuLinks } from "../public/assets/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch, FiX, FiUser, FiLogOut, FiLogIn, FiGrid } from "react-icons/fi";
import Image from "next/image";
props: any

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { lang, setLang, isClient } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);

    const syncUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleLang = (newLang: 'FR' | 'AR') => {
    setLang(newLang);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Sélecteur de langue */}
          <div className="flex items-center gap-2 mr-4">
            <button onClick={() => handleLang('FR')} className={`px-2 py-1 rounded text-sm font-bold ${lang === 'FR' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>FR</button>
            <button onClick={() => handleLang('AR')} className={`px-2 py-1 rounded text-sm font-bold ${lang === 'AR' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>AR</button>
          </div>
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src={assets.logo} alt="logo" width={32} height={32} className="h-8 w-auto transition-transform hover:scale-105" />
            </Link>
          </div>

          {/* Champ de recherche - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className={`flex items-center border rounded-full overflow-hidden transition-all duration-300 ${isSearchFocused ? "ring-2 ring-indigo-500 border-indigo-500" : "border-gray-300"}`}> 
                <button 
                  type="submit"
                  className="h-10 w-12 flex items-center justify-center text-gray-500 hover:text-indigo-600"
                >
                  <FiSearch size={18} />
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={isClient ? (lang === 'AR' ? 'ابحث...' : 'Rechercher...') : ''}
                  className="w-full h-10 py-2 pr-4 text-gray-700 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mr-3 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-7">
            {menuLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.path}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 px-1 py-2"
              >
                {isClient ? (lang === 'AR' ? 
                  (link.name === 'home' ? 'الرئيسية' : 
                   link.name === 'cars' ? 'السيارات' : 
                   link.name === 'myOrders' ? 'اتصل بنا' :
                   link.name === 'search' ? 'ابحث' : link.name) : 
                  (link.name === 'home' ? 'Accueil' : 
                   link.name === 'cars' ? 'Voitures' : 
                   link.name === 'myOrders' ? 'Contacter' :
                   link.name === 'search' ? 'Rechercher' : link.name)) : ""}
              </Link>
            ))}
            {/* État utilisateur - Desktop */}
            {user ? (
              <div className="relative ml-3 flex items-center">
                <Image src={user.imageUrl || assets.user_profile} alt="avatar" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-indigo-500" />
                <span className="ml-2 font-medium text-gray-800">{user.firstName}
                  {user.role === "admin" && (
                    <span className="ml-2 px-2 py-0.5 rounded bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-xs font-bold align-middle">{isClient ? (lang === 'AR' ? 'مشرف' : 'Admin') : ""}</span>
                  )}
                </span>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none ml-2"
                >
                  <FiUser className="text-gray-600" />
                </button>
                {/* Menu déroulant utilisateur */}
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <Link
                      href="/owner"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiGrid className="mr-2" />
                      {isClient ? (lang === 'AR' ? 'لوحة التحكم' : 'Tableau de bord') : ""}
                    </Link>
                    <Link
                      href="/my-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiUser className="mr-2" />
                      {isClient ? (lang === 'AR' ? 'طلباتي' : 'Mes commandes') : ""}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center"
                    >
                      <FiLogOut className="mr-2 text-red-600" />
                      {isClient ? (lang === 'AR' ? 'تسجيل الخروج' : 'Déconnexion') : ""}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
              >
                <FiLogIn className="mr-1.5 text-red-600" />
                {isClient ? (lang === 'AR' ? 'تسجيل الدخول' : 'Connexion') : ""}
              </button>
            )}
          </div>

          {/* Boutons mobiles */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Bouton recherche mobile */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Rechercher"
            >
              <FiSearch size={20} />
            </button>
            {/* Bouton utilisateur/connexion mobile */}
            {user ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Menu utilisateur"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6 flex items-center justify-center">
                  <FiUser className="text-gray-600 text-sm" />
                </div>
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Connexion"
              >
                <FiLogIn size={20} />
              </button>
            )}
            {/* Bouton menu hamburger */}
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <FiX size={24} />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden ${isMenuOpen ? "max-h-screen" : "max-h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="px-4 py-3 bg-white shadow-lg">
          {/* Champ de recherche mobile */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button 
                type="submit"
                className="h-10 w-12 flex items-center justify-center text-gray-500"
              >
                <FiSearch size={18} />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isClient ? (lang === 'AR' ? 'ابحث...' : 'Rechercher...') : ""}
                className="w-full h-10 py-2 pr-4 text-gray-700 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mr-3 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Liens mobile */}
          <div className="space-y-1 mb-4">
            {menuLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.path}
                className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {isClient ? (lang === 'AR' ? 
                  (link.name === 'home' ? 'الرئيسية' : 
                   link.name === 'cars' ? 'السيارات' : 
                   link.name === 'myOrders' ? 'اتصل بنا' :
                   link.name === 'search' ? 'ابحث' : link.name) : 
                  (link.name === 'home' ? 'Accueil' : 
                   link.name === 'cars' ? 'Voitures' : 
                   link.name === 'myOrders' ? 'Contacter' :
                   link.name === 'search' ? 'Rechercher' : link.name)) : ""}
              </Link>
            ))}
          </div>

          {/* Section utilisateur mobile */}
          <div className="border-t pt-3">
            {user ? (
              <>
                <div className="flex items-center px-3 py-3">
                  <Image src={user.imageUrl || assets.user_profile} alt="avatar" width={28} height={28} className="w-7 h-7 rounded-full border-2 border-indigo-500 mr-2" />
                  <span className="font-medium text-gray-800">{user.firstName}
                    {user.role === "admin" && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-xs font-bold align-middle">{isClient ? (lang === 'AR' ? 'مشرف' : 'Admin') : ""}</span>
                    )}
                  </span>
                </div>
                <Link
                  href="/owner"
                  className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiGrid className="mr-3" />
                  {isClient ? (lang === 'AR' ? 'لوحة التحكم' : 'Tableau de bord') : ""}
                </Link>
                <Link
                  href="/my-orders"
                  className="flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className="mr-3" />
                  {isClient ? (lang === 'AR' ? 'طلباتي' : 'Mes commandes') : ""}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <FiLogOut className="mr-3 text-red-600" />
                  {isClient ? (lang === 'AR' ? 'تسجيل الخروج' : 'Déconnexion') : ""}
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="w-full flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                <FiLogIn className="mr-3" />
                {isClient ? (lang === 'AR' ? 'تسجيل الدخول' : 'Connexion') : ""}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
