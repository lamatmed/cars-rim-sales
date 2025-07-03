// src/components/Footer.jsx
import { assets, menuLinks } from '@/public/assets/assets';
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src={assets.logo} 
                alt="Cars-Rim Logo" 
                className="h-10 w-auto mr-3"
              />
              <span className="text-2xl font-bold text-gray-900">
                Cars-Rim
              </span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Location de voitures premium en Mauritanie. Découvrez notre collection exclusive et vivez une expérience de conduite inoubliable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <img src={assets.facebook_logo} alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                <img src={assets.instagram_logo} alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                <img src={assets.twitter_logo} alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                <img src={assets.gmail_logo} alt="Email" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Liens Rapides
            </h3>
            <ul className="space-y-4">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center group"
                  >
                    <img 
                      src={assets.arrow_icon} 
                      alt="Arrow" 
                      className="w-3 h-3 mr-2 transform group-hover:translate-x-1 transition-transform" 
                    />
                    {link.name}
                  </a>
                </li>
              ))}
             
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Nos Villes
            </h3>
            <ul className="space-y-3">
              {cityList.map((city, index) => (
                <li key={index} className="flex items-center">
                  <img 
                    src={assets.location_icon_colored} 
                    alt="Location" 
                    className="w-5 h-5 mr-3 text-indigo-600" 
                  />
                  <span className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors">
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Abonnez-vous pour recevoir nos offres exclusives et actualités
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                S'abonner
                <img 
                  src={assets.arrow_icon} 
                  alt="Arrow" 
                  className="w-4 h-4 ml-2 rotate-90 filter invert" 
                />
              </button>
            </form>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-indigo-50 rounded-xl p-6 mb-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
              <img 
                src={assets.location_icon_colored} 
                alt="Location" 
                className="w-6 h-6" 
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Nous trouver</h4>
              <p className="text-gray-600">Avenue Gamal Abdel Nasser, Nouakchott</p>
            </div>
          </div>
          
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Appelez-nous</h4>
              <p className="text-gray-600">+222 30 57 28 16</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
              <img 
                src={assets.gmail_logo} 
                alt="Email" 
                className="w-6 h-6" 
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Écrivez-nous</h4>
              <p className="text-gray-600">contact@cars-rim.mr</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Cars-Rim. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
              Termes et conditions
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Floating car */}
      <div className="absolute bottom-0 right-0 hidden xl:block">
        <img 
          src={assets.car_icon} 
          alt="Car" 
          className="w-32 h-32 opacity-10 transform rotate-12 translate-y-8 -translate-x-8" 
        />
      </div>
    </footer>
  );
};

export default Footer;