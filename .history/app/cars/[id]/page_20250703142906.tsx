import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCarByIdAction } from "@/lib/actions";
import connectDB from "@/lib/config/db";

export default async function CarDetailPage({ params }) {
  await connectDB();
  const car = await getCarByIdAction(params.id);
  if (!car || car.error) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-24">
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{car.brand} {car.model}</h1>
              <p className="text-gray-500 mt-1">{car.year} • {car.category}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">
              Prix : MRU{car.price}
            </span>
          </div>
          <div className="mt-4 h-64 overflow-hidden rounded-lg">
            <Image 
              src={car.image} 
              alt={`${car.brand} ${car.model}`}
              width={600}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center">
              <span className="mr-2">👥</span>
              <span className="text-gray-600">{car.seating_capacity} places</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">⛽</span>
              <span className="text-gray-600">{car.fuel_type}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🚗</span>
              <span className="text-gray-600">{car.transmission}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span className="text-gray-600">{car.location}</span>
            </div>
          </div>
          <p className="mt-6 text-gray-700">
            {car.description}
          </p>
          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-1">⭐</span>
              <span className="font-semibold">4.8</span>
              <span className="text-gray-500 ml-1">(128 avis)</span>
            </div>
            <button 
              className={`font-medium py-3 px-6 rounded-lg transition-colors duration-300 ${car.isAvaliable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!car.isAvaliable}
            >
              Acheter
            </button>
          </div>
          <Link href="/cars" className="inline-block mt-8 text-indigo-600 hover:underline">Retour à la liste</Link>
        </div>
      </div>
    </main>
  );
}

