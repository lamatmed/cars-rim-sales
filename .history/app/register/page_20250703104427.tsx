import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { assets } from "../../public/assets/assets";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <section className="flex-1 flex flex-col justify-center items-center py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Image src={assets.logo} alt="Logo" width={56} height={56} className="mb-2" />
            <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          </div>
          <form className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Prénom</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Votre prénom" required />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Nom</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Votre nom" required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Votre email" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
              <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Votre mot de passe" required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all">S'inscrire</button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Déjà un compte ? <Link href="/login" className="text-indigo-600 hover:underline">Se connecter</Link>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
