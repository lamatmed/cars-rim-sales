'use client';
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { lang, isClient } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation d'envoi de message
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-100">
      <section className="max-w-6xl mx-auto px-4 py-18">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {isClient ? (lang === 'AR' ? 'اتصل بنا' : 'Contactez-nous') : ''}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isClient ? (lang === 'AR' ? 'نحن هنا لمساعدتك. لا تتردد في التواصل معنا لأي استفسار أو مساعدة.' : 'Nous sommes là pour vous aider. N\'hésitez pas à nous contacter pour toute question ou assistance.') : ''}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-8"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isClient ? (lang === 'AR' ? 'معلومات التواصل' : 'Informations de contact') : ''}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FiPhone className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {isClient ? (lang === 'AR' ? 'الهاتف' : 'Téléphone') : ''}
                    </h3>
                    <p className="text-gray-600">+222 22 22 22 22</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FiMail className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {isClient ? (lang === 'AR' ? 'البريد الإلكتروني' : 'Email') : ''}
                    </h3>
                    <p className="text-gray-600">contact@cars-rim.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FiMapPin className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {isClient ? (lang === 'AR' ? 'العنوان' : 'Adresse') : ''}
                    </h3>
                    <p className="text-gray-600">
                      {isClient ? (lang === 'AR' ? 'نواكشوط، موريتانيا' : 'Nouakchott, Mauritanie') : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {isClient ? (lang === 'AR' ? 'أوقات العمل' : 'Horaires d\'ouverture') : ''}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>{isClient ? (lang === 'AR' ? 'الاثنين - الجمعة' : 'Lundi - Vendredi') : ''}: 8:00 - 18:00</p>
                  <p>{isClient ? (lang === 'AR' ? 'السبت' : 'Samedi') : ''}: 9:00 - 16:00</p>
                  <p>{isClient ? (lang === 'AR' ? 'الأحد' : 'Dimanche') : ''}: {isClient ? (lang === 'AR' ? 'مغلق' : 'Fermé') : ''}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isClient ? (lang === 'AR' ? 'أرسل لنا رسالة' : 'Envoyez-nous un message') : ''}
              </h2>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"
                >
                  {isClient ? (lang === 'AR' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.') : ''}
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {isClient ? (lang === 'AR' ? 'الاسم الكامل' : 'Nom complet') : ''}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={isClient ? (lang === 'AR' ? 'أدخل اسمك الكامل' : 'Entrez votre nom complet') : ''}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {isClient ? (lang === 'AR' ? 'البريد الإلكتروني' : 'Email') : ''}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={isClient ? (lang === 'AR' ? 'أدخل بريدك الإلكتروني' : 'Entrez votre email') : ''}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {isClient ? (lang === 'AR' ? 'الهاتف' : 'Téléphone') : ''}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={isClient ? (lang === 'AR' ? 'أدخل رقم هاتفك' : 'Entrez votre numéro de téléphone') : ''}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {isClient ? (lang === 'AR' ? 'الموضوع' : 'Sujet') : ''}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={isClient ? (lang === 'AR' ? 'أدخل موضوع الرسالة' : 'Entrez le sujet du message') : ''}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {isClient ? (lang === 'AR' ? 'الرسالة' : 'Message') : ''}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={isClient ? (lang === 'AR' ? 'أدخل رسالتك هنا...' : 'Entrez votre message ici...') : ''}
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isClient ? (lang === 'AR' ? 'جاري الإرسال...' : 'Envoi en cours...') : ''}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FiSend className="mr-2" />
                      {isClient ? (lang === 'AR' ? 'إرسال الرسالة' : 'Envoyer le message') : ''}
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 