import { cityList } from '@/public/assets/assets';
import React, { useState } from 'react';

import { FiCalendar, FiChevronDown, FiMapPin, FiSearch } from 'react-icons/fi';

const Hero = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activeDateField, setActiveDateField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCity && pickupDate && returnDate) {
            console.log(`Recherche à ${selectedCity} du ${pickupDate} au ${returnDate}`);
        }
    };

    const handleDateSelect = (date) => {
        if (activeDateField === 'pickup') {
            setPickupDate(date);
            setActiveDateField('return');
        } else {
            setReturnDate(date);
            setShowDatePicker(false);
            setActiveDateField(null);
        }
    };

    // Générer les dates pour les 30 prochains jours
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const dates = generateDates();

    // Formater la date pour l'affichage (JJ/MM/AAAA)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    return (
        <div className='relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 px-4 overflow-hidden'>
            {/* Fond avec dégradé */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0'></div>

            {/* Motifs décoratifs */}
            <div className='absolute top-0 left-0 w-full h-full z-1 opacity-10'>
                <div className='absolute top-10 left-10 w-32 h-32 rounded-full bg-indigo-400'></div>
                <div className='absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-400'></div>
                <div className='absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-indigo-300'></div>
            </div>

            <div className='relative z-10 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10'>
                {/* Section texte et formulaire */}
                <div className='w-full md:w-1/2 flex flex-col items-center md:items-start'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left mb-4 text-gray-800 leading-tight'>
                        <span className='block'>Louez la voiture</span>
                        <span className='block text-indigo-600'>de vos rêves</span>
                    </h1>

                    <p className='text-gray-600 text-center md:text-left mb-8 max-w-md'>
                        Trouvez la voiture parfaite pour votre prochain voyage. Des tarifs compétitifs, une large sélection et une réservation facile.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className='w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl'
                    >
                        <div className='space-y-5'>
                            {/* Champ de lieu de prise en charge */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Lieu de prise en charge
                                </label>
                                <div className='relative'>
                                    <FiMapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        required
                                        className='w-full pl-10 pr-4 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none'
                                    >
                                        <option value="">Veuillez sélectionner un lieu</option>
                                        {cityList.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    <FiChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {/* Date de prise en charge */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Date de prise en charge
                                    </label>
                                    <div
                                        className='relative cursor-pointer'
                                        onClick={() => {
                                            setShowDatePicker(!showDatePicker);
                                            setActiveDateField('pickup');
                                        }}
                                    >
                                        <FiCalendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                                        <input
                                            type='text'
                                            readOnly
                                            value={formatDate(pickupDate)}
                                            placeholder='Sélectionner une date'
                                            className='w-full pl-10 pr-4 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                        />
                                    </div>
                                </div>

                                {/* Date de retour */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Date de retour
                                    </label>
                                    <div
                                        className='relative cursor-pointer'
                                        onClick={() => {
                                            setShowDatePicker(!showDatePicker);
                                            setActiveDateField('return');
                                        }}
                                    >
                                        <FiCalendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                                        <input
                                            type='text'
                                            readOnly
                                            value={formatDate(returnDate)}
                                            placeholder='Sélectionner une date'
                                            className='w-full pl-10 pr-4 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Date Picker */}
                            {showDatePicker && (
                                <div className='mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20'>
                                    <div className='grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2'>
                                        <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
                                    </div>
                                    <div className='grid grid-cols-7 gap-1'>
                                        {dates.map((date, index) => {
                                            const dateStr = date.toISOString().split('T')[0];
                                            const isPickup = dateStr === pickupDate;
                                            const isReturn = dateStr === returnDate;
                                            const isInRange = pickupDate && returnDate &&
                                                dateStr > pickupDate &&
                                                dateStr < returnDate;

                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => handleDateSelect(dateStr)}
                                                    className={`p-2 text-center text-sm rounded cursor-pointer
                            ${isPickup ? 'bg-indigo-600 text-white rounded-r-none' : ''}
                            ${isReturn ? 'bg-indigo-600 text-white rounded-l-none' : ''}
                            ${isInRange ? 'bg-indigo-100' : ''}
                            ${!isPickup && !isReturn ? 'hover:bg-gray-100' : ''}
                          `}
                                                >
                                                    {date.getDate()}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <button
                                            type='button'
                                            onClick={() => setShowDatePicker(false)}
                                            className='text-sm text-gray-500 hover:text-gray-700'
                                        >
                                            Fermer
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setPickupDate('');
                                                setReturnDate('');
                                            }}
                                            className='text-sm text-indigo-600 hover:text-indigo-800'
                                        >
                                            Effacer
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                type='submit'
                                disabled={!selectedCity || !pickupDate || !returnDate}
                                className={`w-full flex items-center justify-center px-6 py-4 font-medium rounded-lg transition-all mt-2 ${(selectedCity && pickupDate && returnDate)
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:-translate-y-0.5 shadow-md hover:shadow-lg'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <FiSearch className="mr-2" />
                                Rechercher
                            </button>
                        </div>
                    </form>

                    <div className='mt-8 flex flex-wrap justify-center gap-4'>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className='text-sm text-gray-600'>Sans frais cachés</span>
                        </div>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className='text-sm text-gray-600'>Assurance incluse</span>
                        </div>
                    </div>
                </div>

                {/* Section image de voiture */}
                <div className='w-full md:w-1/2 flex justify-center relative'>
                    <div className='relative'>
                        <img
                            src={assets.main_car}
                            alt='Voiture de location'
                            className='w-full max-w-lg object-contain transition-transform duration-500 hover:scale-105'
                        />

                        {/* Effet de lueur */}
                        <div className='absolute -bottom-10 -left-10 -right-10 h-32 bg-gradient-to-t from-indigo-500 to-transparent opacity-20 blur-3xl rounded-full z-0'></div>
                    </div>
                </div>
            </div>

            {/* Vague décorative en bas */}
            <div className='absolute bottom-0 left-0 w-full overflow-hidden'>
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio='none'
                    className='relative block w-full h-20'
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        className='fill-current text-indigo-50 opacity-80'
                    ></path>
                </svg>
            </div>
        </div>
    );
};

export default Hero;