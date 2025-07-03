import React from 'react';
import { assets } from '../assets/assets';


const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
            <p className="text-gray-500 mt-1">{car.year} • {car.category}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            MRU{car.pricePerDay}/jour
          </span>
        </div>

        <div className="mt-4 h-48 overflow-hidden rounded-lg">
          <img 
            src={car.image} 
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="flex items-center">
            <img src={assets.users_icon} alt="Passagers" className="w-5 h-5 mr-2" />
            <span className="text-gray-600">{car.seating_capacity} places</span>
          </div>
          <div className="flex items-center">
            <img src={assets.fuel_icon} alt="Carburant" className="w-5 h-5 mr-2" />
            <span className="text-gray-600">{car.fuel_type}</span>
          </div>
          <div className="flex items-center">
            <img src={assets.car_icon} alt="Transmission" className="w-5 h-5 mr-2" />
            <span className="text-gray-600">{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <img src={assets.location_icon} alt="Localisation" className="w-5 h-5 mr-2" />
            <span className="text-gray-600">{car.location}</span>
          </div>
        </div>

        <p className="mt-4 text-gray-700 line-clamp-2 h-12">
          {car.description}
        </p>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center">
            <img src={assets.star_icon} alt="Évaluation" className="w-5 h-5 mr-1" />
            <span className="font-semibold">4.8</span>
            <span className="text-gray-500 ml-1">(128 avis)</span>
          </div>
          <button 
            className={`font-medium py-2 px-4 rounded-lg transition-colors duration-300 ${car.isAvaliable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!car.isAvaliable}
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;