'use client'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { assets } from "../../public/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-indigo-200 flex flex-col">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center py-18">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-indigo-100"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <Image src={assets.logo} alt="Logo" width={56} height={56} className="mb-2 drop-shadow-lg" />
            <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">Connexion</h1>
          </motion.div>
          <form className="space-y-6">
            <div>
              <label className="block text-indigo-700 font-semibold mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50/60 text-gray-800" placeholder="Votre email" required />
            </div>
            <div>
              <label className="block text-indigo-700 font-semibold mb-2">Mot de passe</label>
              <input type="password" className="w-full px-4 py-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-50/60 text-gray-800" placeholder="Votre mot de passe" required />
            </div>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "#6366f1" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-100/40"
            >
              Se connecter
            </motion.button>
          </form>
          <p className="text-center text-indigo-500 text-sm mt-6">
            Pas encore de compte ? <Link href="/register" className="text-indigo-700 hover:underline font-semibold">Créer un compte</Link>
          </p>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
