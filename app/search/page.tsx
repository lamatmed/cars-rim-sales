'use client';
import { Suspense } from "react";
import SearchResults from "./SearchResults";
import { useLanguage } from "@/lib/i18n";

export default function SearchPage() {
  const { lang, isClient } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          {isClient ? (lang === 'AR' ? 'نتائج البحث' : 'Résultats de recherche') : ''}
        </h1>
        <Suspense fallback={
          <div className="text-center">
            {isClient ? (lang === 'AR' ? 'جاري التحميل...' : 'Chargement...') : ''}
          </div>
        }>
          <SearchResults />
        </Suspense>
      </section>
    </main>
  );
} 