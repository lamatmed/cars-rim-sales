import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { assets, cityList } from "../../../public/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function AddCarPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center py-18">
        <div className="w-full max-w-2xl mb-6">
          <Link href="/owner" className="inline-flex items-center text-indigo-600 hover:underline font-medium mb-4">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour au tableau de bord
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <div className="flex flex-col items-center mb-6">
            <Image src={assets.addIconColored} alt="Ajouter" width={48} height={48} className="mb-2" />
            <h1 className="text-2xl font-bold text-gray-900">Ajouter une voiture</h1>
          </div>
          <form className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Marque</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Marque" required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Modèle</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Modèle" required />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Année</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Année" required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Catégorie</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Catégorie" required />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Nombre de places</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Places" required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Type de carburant</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Carburant" required />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Transmission</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Transmission" required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Prix (MRU)</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Prix" required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ville</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                <option value="">Sélectionner une ville</option>
                {cityList.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Description" rows={3} required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Image</label>
              <input type="file" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" accept="image/*" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all">Ajouter la voiture</button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
