/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { assets } from "../public/assets/assets";

interface Car {
  _id: string;
  owner: string;
  brand: string;
  model: string;
  image: any;
  year: number;
  category: string;
  seating_capacity: number;
  fuel_type: string;
  transmission: string;
  price: number;
  location: string;
  description: string;
  isAvaliable: boolean;
  createdAt: string;
}

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 z-0 rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform cursor-pointer">
      <div className="relative w-full h-48">
        <Image src={car.image} alt={car.brand + ' ' + car.model} fill style={{objectFit:'cover'}} />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{car.brand} <span className="font-normal">{car.model}</span></h3>
          <span className="bg-[#00C6AD] text-white px-3 py-1 rounded-lg font-semibold text-lg">Prix : {car.price} €</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <Image src={assets.location_icon} alt="Location" width={16} height={16} />
          <span>{car.location}</span>
        </div>
        <div className="flex gap-4 mt-2 text-gray-400 text-xs">
          <span><b>{car.year}</b> • {car.category}</span>
          <span>{car.fuel_type}</span>
          <span>{car.transmission}</span>
        </div>
      </div>
    </div>
  );
}
