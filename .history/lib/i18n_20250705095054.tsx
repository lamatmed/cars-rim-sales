'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const translations: {
  FR: { [key: string]: string },
  AR: { [key: string]: string }
} = {
  FR: {
    searchPlaceholder: "Rechercher...",
    myOrders: "Mes commandes",
    manageOrders: "Gérer les commandes",
    manageCars: "Gérer mes voitures",
    addCar: "Ajouter une voiture",
    dashboard: "Tableau de bord propriétaire",
    noOrders: "Aucune commande trouvée.",
    noCars: "Aucune voiture trouvée.",
    noResults: "Aucune voiture trouvée pour ces critères.",
    price: "Prix",
    detail: "Détail",
    available: "Disponible",
    notAvailable: "Indisponible",
    login: "Connexion",
    logout: "Déconnexion",
    accept: "Accepter",
    refuse: "Refuser",
    view: "Voir",
    return: "Retour",
    add: "Ajouter",
    edit: "Éditer",
    delete: "Supprimer",
    admin: "Admin",
    user: "Utilisateur",
    home: "Accueil",
    cars: "Voitures",
    featuredCars: "Voitures à vendre",
    seeAllCars: "Voir toutes les voitures",
    premiumSelection: "Découvrez notre sélection de véhicules premium disponibles à l'achat.",
    buyCar: "Achetez la voiture",
    ofYourDreams: "de vos rêves",
    findPerfectCar: "Trouvez la voiture parfaite pour votre prochain achat. Large sélection, prix compétitifs, et transaction sécurisée.",
    noHiddenFees: "Sans frais cachés",
    secureTransaction: "Transaction sécurisée",
    city: "Ville",
    selectCity: "Sélectionner une ville",
    brand: "Marque",
    allBrands: "Toutes marques",
    model: "Modèle",
    allModels: "Tous modèles",
    search: "Rechercher",
    addNewCar: "Nouvelle voiture",
    carsForSale: "Voitures en vente",
    ordersReceived: "Commandes reçues",
    mustBeLoggedIn: "Vous devez être connecté",
    notFoundTitle: "Page introuvable",
    notFoundText: "Oups, la page que vous cherchez n'existe pas ou a été déplacée.",
    backToHome: "Retour à l'accueil",
    detailOrder: "Détail de la commande",
    orderPlacedOn: "Commande passée le",
    from: "Du",
    to: "au",
    status: "Statut",
    terms: "Termes et conditions",
    privacy: "Politique de confidentialité",
    cookies: "Cookies",
    buy: "Intéressant",
    footerDescription: "Vente de voitures premium en Mauritanie. Découvrez notre collection exclusive et trouvez la voiture idéale pour vous.",
    allCars: "Toutes les voitures",
    loginSubtitle: "Accédez à votre espace personnel",
    phone: "Téléphone",
    phonePlaceholder: "+222 22 22 22 22",
    password: "Mot de passe",
    passwordPlaceholder: "••••••••",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié?",
    loggingIn: "Connexion...",
    loginBtn: "Se connecter",
    noAccount: "Pas encore de compte?",
    createAccount: "Créer un compte",
    register: "Créer un compte",
    registerSubtitle: "Rejoignez notre communauté",
    firstName: "Prénom",
    firstNamePlaceholder: "Votre prénom",
    lastName: "Nom",
    lastNamePlaceholder: "Votre nom",
    confirmPassword: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "••••••••",
     myOrders: "Mes Commandes",
    termsLink: "termes et conditions",
    registering: "Inscription...",
    registerBtn: "S'inscrire",
    alreadyAccount: "Déjà un compte ?",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    registerError: "Erreur lors de l'inscription",
    serverError: "Erreur serveur",
    contactOwner: "Contacter",
    manageUsers: "Gérer les utilisateurs",
    loading: "Chargement...",
    ourCities: "Nos villes",
    quickLinks: "Liens rapides",
    // ... ajoute tous les textes nécessaires
  },
  AR: {
    searchPlaceholder: "ابحث...",
    myOrders: "طلباتي",
    manageOrders: "إدارة الطلبات",
    manageCars: "إدارة السيارات",
    addCar: "إضافة سيارة",
    dashboard: "لوحة تحكم المالك",
    noOrders: "لا توجد طلبات.",
    noCars: "لا توجد سيارات.",
    noResults: "لا توجد سيارات بهذه المواصفات.",
    price: "السعر",
    detail: "تفاصيل",
    available: "متوفر",
    notAvailable: "غير متوفر",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    accept: "قبول",
    refuse: "رفض",
    view: "عرض",
    return: "رجوع",
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    admin: "مشرف",
    user: "مستخدم",
    home: "الرئيسية",
    cars: "السيارات",
    featuredCars: "سيارات للبيع",
    seeAllCars: "عرض جميع السيارات",
    premiumSelection: "اكتشف مجموعتنا من السيارات الفاخرة المتوفرة للبيع.",
    buyCar: "اشترِ السيارة",
    ofYourDreams: "التي تحلم بها",
    findPerfectCar: "ابحث عن السيارة المثالية لشرائك القادم. مجموعة واسعة، أسعار تنافسية، ومعاملة آمنة.",
    noHiddenFees: "بدون رسوم خفية",
    secureTransaction: "معاملة آمنة",
    city: "المدينة",
    selectCity: "اختر مدينة",
    brand: "الماركة",
    allBrands: "كل الماركات",
    model: "الموديل",
    allModels: "كل الموديلات",
    search: "ابحث",
    addNewCar: "سيارة جديدة",
    carsForSale: "سيارات معروضة للبيع",
    ordersReceived: "الطلبات المستلمة",
    mustBeLoggedIn: "يجب أن تكون مسجلاً للدخول",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundText: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    backToHome: "العودة إلى الرئيسية",
    detailOrder: "تفاصيل الطلب",
    orderPlacedOn: "تم الطلب في",
    from: "من",
    to: "إلى",
    status: "الحالة",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
    cookies: "الكوكيز",
    buy: "مهتم",
     myOrders: "ط",
    footerDescription: "بيع سيارات فاخرة في موريتانيا. اكتشف مجموعتنا الحصرية وابحث عن السيارة المثالية لك.",
    allCars: "جميع السيارات",
    loginSubtitle: "ادخل إلى حسابك الشخصي",
    phone: "الهاتف",
    phonePlaceholder: "+222 22 22 22 22",
    password: "كلمة المرور",
    passwordPlaceholder: "••••••••",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    loggingIn: "...جاري تسجيل الدخول",
    loginBtn: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",
    register: "إنشاء حساب",
    registerSubtitle: "انضم إلى مجتمعنا",
    firstName: "الاسم الأول",
    firstNamePlaceholder: "اسمك الأول",
    lastName: "اللقب",
    lastNamePlaceholder: "اسم العائلة",
    confirmPassword: "تأكيد كلمة المرور",
    confirmPasswordPlaceholder: "••••••••",
   
    termsLink: "الشروط والأحكام",
    registering: "...جاري التسجيل",
    registerBtn: "سجل",
    alreadyAccount: "لديك حساب بالفعل؟",
    passwordMismatch: "كلمتا المرور غير متطابقتين",
    registerError: "حدث خطأ أثناء التسجيل",
    serverError: "خطأ في الخادم",
    contactOwner: "تواصل مع المالك",
    manageUsers: "إدارة المستخدمين",
    loading: "جاري التحميل...",
    ourCities: "مدننا",
    quickLinks: "روابط سريعة",
    // ... ajoute tous les textes nécessaires en arabe
  }
};

// Language context
interface LanguageContextType {
  lang: "FR" | "AR";
  setLang: (lang: "FR" | "AR") => void;
  isClient: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<"FR" | "AR">("FR");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("lang") as "FR" | "AR";
    if (stored) {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: "FR" | "AR") => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", newLang);
      // Update HTML dir attribute
      const html = document.documentElement;
      if (newLang === 'AR') {
        html.setAttribute('dir', 'rtl');
        html.classList.add('ar');
      } else {
        html.setAttribute('dir', 'ltr');
        html.classList.remove('ar');
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isClient }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Global language state
let currentLang: "FR" | "AR" = "FR";

export function getLang(): "FR" | "AR" {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang") as "FR" | "AR";
    if (stored) {
      currentLang = stored;
      return stored;
    }
  }
  return currentLang;
}

export function setLang(lang: "FR" | "AR") {
  currentLang = lang;
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang);
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
}

export function t(key: string) {
  const lang = getLang();
  return translations[lang][key] || translations.FR[key] || key;
} 