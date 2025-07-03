
import { dummyCarData } from "../../../public/assets/assets";
import Image from "next/image";
import { notFound } from "next/navigation";

interface CarProps {
  params: { id: string };
}

export default function CarDetailPage({ params }: CarProps) {
  const car = dummyCarData.find((c) => c._id === params.id);
  if (!car) return notFound();
  const similarCars = dummyCarData.filter((c) => c._id !== car._id && c.category === car.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
 
      <section className="max-w-5xl mx-auto px-4 py-18">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex flex-col items-center">
            <Image src={car.image} alt={car.brand + ' ' + car.model} width={480} height={320} className="rounded-xl object-cover w-full max-w-lg" />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h1>
            <p className="text-gray-600 text-lg mb-2">{car.year} • {car.category}</p>
            <p className="text-gray-700 mb-4">{car.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow">
                <span className="font-semibold text-gray-700">Prix :</span>
                <span className="text-indigo-600 font-bold text-lg">MRU{car.price}</span>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow">
                <span className="font-semibold text-gray-700">Lieu :</span>
                <span className="text-gray-600">{car.location}</span>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow">
                <span className="font-semibold text-gray-700">Places :</span>
                <span className="text-gray-600">{car.seating_capacity}</span>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow">
                <span className="font-semibold text-gray-700">Carburant :</span>
                <span className="text-gray-600">{car.fuel_type}</span>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow">
                <span className="font-semibold text-gray-700">Transmission :</span>
                <span className="text-gray-600">{car.transmission}</span>
              </div>
            </div>
            <button className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${car.isAvaliable ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!car.isAvaliable}>
              Acheter
            </button>
          </div>
        </div>
        {/* Suggestions */}
        {similarCars.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Voitures similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {similarCars.map((c) => (
                <div key={c._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
                  <Image src={c.image} alt={c.brand + ' ' + c.model} width={220} height={120} className="rounded-lg object-cover mb-2" />
                  <div className="font-semibold text-gray-800">{c.brand} {c.model}</div>
                  <div className="text-gray-500 text-sm mb-2">{c.year} • {c.category}</div>
                  <div className="text-indigo-600 font-bold">MRU{c.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
   
    </main>
  );
}
