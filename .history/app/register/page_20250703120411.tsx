'use client';
/* eslint-disable react/no-unescaped-entities */
import { assets } from "../../public/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiUser, FiPhone, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Uploader from "@/components/Uploader";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-100 flex flex-col">
      <section className="flex-1 flex flex-col justify-center items-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md border border-indigo-100 relative overflow-hidden"
        >
          {/* Effets décoratifs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-300 rounded-full opacity-10 blur-3xl"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative">
              <Image 
                src={assets.logo} 
                alt="Logo" 
                width={72} 
                height={72} 
                className="mb-3 drop-shadow-lg z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full blur-md opacity-20 -z-10"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              Créer un compte
            </h1>
            <p className="text-gray-500 mt-2">Rejoignez notre communauté</p>
          </motion.div>

          <form className="space-y-5">
            {/* Composant Uploader pour la photo de profil */}
            <div className="flex justify-center">
              <Uploader 
                onUpload={handleImageUpload} 
                initialImage={imageUrl} 
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Prénom</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-white text-gray-800 placeholder-indigo-300" 
                    placeholder="Votre prénom" 
                    required 
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Nom</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-white text-gray-800 placeholder-indigo-300" 
                    placeholder="Votre nom" 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Téléphone</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                <input 
                  type="tel" 
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-white text-gray-800 placeholder-indigo-300" 
                  placeholder="+33 6 12 34 56 78" 
                  required 
                  pattern="[+]{1}[0-9]{1,3}[ ]{0,1}[0-9]{1,4}[ ]{0,1}[0-9]{1,4}[ ]{0,1}[0-9]{1,4}"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-white text-gray-800 placeholder-indigo-300" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-600"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Confirmer le mot de passe</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-white text-gray-800 placeholder-indigo-300" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-600"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="terms"
                className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                J'accepte les <Link href="/terms" className="text-indigo-600 hover:underline font-medium">termes et conditions</Link>
              </label>
            </div>

            <motion.button
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0px 5px 15px rgba(99, 102, 241, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg mt-2"
            >
              S'inscrire
            </motion.button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}