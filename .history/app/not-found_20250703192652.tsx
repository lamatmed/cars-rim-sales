/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
const [isClient, setIsClient] = useState(false);
useEffect(() => { setIsClient(true); }, []);

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <div className="text-7xl mb-4">🚗❓</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{isClient ? t("notFoundTitle") : ""}</h1>
        <p className="text-gray-600 mb-6 text-center max-w-xs">{isClient ? t("notFoundText") : ""}</p>
        <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center">{isClient ? t("backToHome") : ""}</Link>
      </div>
    </main>
  );
} 