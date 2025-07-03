import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { dummyCarData } from "../../../public/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function ManageCarsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 py-18">
        <div className="mb-6">
          <Link href="/owner" className="inline-flex items-center text-indigo-600 hover:underline font-medium mb-4">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour au tableau de bord
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Gérer mes voitures</h1>
        <div className="space-y-6">
          {dummyCarData.map((car) => (
            <div key={car._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={car.image} alt={car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                <p className="text-gray-600">{car.year} • {car.category}</p>
                <p className="text-gray-500 mt-1">Lieu : {car.location}</p>
                <p className="text-gray-500 mt-1">Prix : MRU{car.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm text-center">Éditer</Link>
                <button className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-lg text-sm">Supprimer</button>
                <Link href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm text-center">Voir</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
