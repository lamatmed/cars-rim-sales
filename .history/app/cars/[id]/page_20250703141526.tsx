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
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-3xl mx-auto px-4 py-18">
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-8">
          <Image src={car.image} alt={car.brand} width={320} height={200} className="rounded-lg object-cover" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h1>
            <p className="text-gray-600 mb-2">{car.year} • {car.category}</p>
            <p className="text-gray-500 mb-2">Lieu : {car.location}</p>
            <p className="text-gray-500 mb-2">Prix : MRU{car.price}</p>
            <p className="text-gray-500 mb-2">Description : {car.description}</p>
            {/* Ajoute d'autres infos si besoin */}
            <Link href="/cars" className="inline-block mt-4 text-indigo-600 hover:underline">Retour à la liste</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

