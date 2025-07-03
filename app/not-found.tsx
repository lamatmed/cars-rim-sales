"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <div className="text-7xl mb-4">🚗❓</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page introuvable</h1>
        <p className="text-gray-600 mb-6 text-center max-w-xs">Oups, la page que vous cherchez n'existe pas ou a été déplacée.</p>
        <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center">Retour à l'accueil</Link>
      </div>
    </main>
  );
} 