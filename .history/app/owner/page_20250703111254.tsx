import { assets, dummyCarData, dummyMyBookingsData } from "../../public/assets/assets";
import Link from "next/link";
import Image from "next/image";

export default function OwnerDashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Tableau de bord propriétaire</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Image src={assets.carIconColored} alt="Voitures" width={40} height={40} />
            <span className="text-2xl font-bold mt-2">{dummyCarData.length}</span>
            <span className="text-gray-600">Voitures en vente</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Image src={assets.listIconColored} alt="Commandes" width={40} height={40} />
            <span className="text-2xl font-bold mt-2">{dummyMyBookingsData.length}</span>
            <span className="text-gray-600">Commandes reçues</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Image src={assets.addIconColored} alt="Ajouter" width={40} height={40} />
            <span className="text-2xl font-bold mt-2">+1</span>
            <span className="text-gray-600">Nouvelle voiture</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link href="/owner/add-car" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center">Ajouter une voiture</Link>
          <Link href="/owner/manage-cars" className="bg-white border border-indigo-600 text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center">Gérer mes voitures</Link>
          <Link href="/owner/manage-orders" className="bg-white border border-indigo-600 text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all text-center">Gérer les commandes</Link>
        </div>
      </section>
    </main>
  );
}
