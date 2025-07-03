import { Suspense } from "react";


export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Résultats de recherche</h1>
        <Suspense fallback={<div>Chargement...</div>}>
          <SearchResults />
        </Suspense>
      </section>
    </main>
  );
} 