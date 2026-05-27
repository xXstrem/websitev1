'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'en' | 'ar';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'common.appName': 'Ton Cloud',
    'common.orderNow': 'Order Now',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.vps': 'VPS Hosting',
    'nav.dedicated': 'Dedicated Servers',
    'nav.shared': 'Shared Hosting',
    'nav.domains': 'Domains',
    'nav.gameServers': 'Game Servers',
    'nav.ssl': 'SSL Certificates',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2024 Ton Cloud. All rights reserved.',
    'footer.description': 'Premium cloud infrastructure for businesses worldwide.',
    'legal.terms': 'Terms of Service',
    'legal.privacy': 'Privacy Policy',
    'legal.refund': 'Refund Policy',
    'home.hero.title': 'Premium Cloud Infrastructure for Your Project',
    'home.hero.subtitle': 'High-performance VPS servers, dedicated servers, and hosting solutions with enterprise-grade reliability and 24/7 support. Trusted by thousands of companies worldwide.',
    'home.hero.cta': 'Get Started',
    'home.hero.secondaryCta': 'View Pricing',
    'home.process.title': 'How It Works',
    'home.process.subtitle': 'Get started in 3 simple steps',
    'home.process.step1.title': 'Choose Your Service',
    'home.process.step1.description': 'Browse our wide range of hosting solutions and select the perfect plan for your needs.',
    'home.process.step2.title': 'Complete Your Order',
    'home.process.step2.description': 'Complete your order with our secure checkout process. We support multiple payment methods.',
    'home.process.step3.title': 'Get Started',
    'home.process.step3.description': 'Receive your service credentials instantly and start building your online presence.',
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview.title': 'Overview',
    'dashboard.overview.activeServices': 'Active Services',
    'dashboard.overview.pendingOrders': 'Pending Orders',
    'dashboard.overview.openTickets': 'Open Tickets',
    'dashboard.overview.totalInvoices': 'Total Invoices',
    'dashboard.orders.title': 'My Orders',
    'dashboard.orders.empty': 'No orders yet',
    'dashboard.orders.orderNumber': 'Order Number',
    'dashboard.orders.amount': 'Amount',
    'dashboard.orders.status': 'Status',
    'dashboard.orders.date': 'Date',
    'dashboard.services.title': 'My Services',
    'dashboard.services.empty': 'No active services',
    'dashboard.invoices.title': 'Invoices',
    'dashboard.invoices.empty': 'No invoices yet',
    'dashboard.tickets.title': 'Support Tickets',
    'dashboard.tickets.empty': 'No tickets yet',
    'dashboard.settings.title': 'Settings',
  },
  ar: {
    'common.appName': 'تون كلاود',
    'common.orderNow': 'اطلب الآن',
    'common.loading': 'جاري التحميل...',
    'common.success': 'تم بنجاح',
    'common.error': 'حدث خطأ',
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.vps': 'استضافة VPS',
    'nav.dedicated': 'خوادم مخصصة',
    'nav.shared': 'استضافة مشتركة',
    'nav.domains': 'النطاقات',
    'nav.gameServers': 'خوادم الألعاب',
    'nav.ssl': 'شهادات SSL',
    'nav.pricing': 'الأسعار',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    'footer.services': 'الخدمات',
    'footer.company': 'الشركة',
    'footer.legal': 'قانوني',
    'footer.copyright': '© 2024 تون كلاود. جميع الحقوق محفوظة.',
    'footer.description': 'بنية تحتية سحابية متميزة للشركات حول العالم.',
    'legal.terms': 'شروط الخدمة',
    'legal.privacy': 'سياسة الخصوصية',
    'legal.refund': 'سياسة الاسترداد',
    'home.hero.title': 'بنية تحتية سحابية متميزة لمشروعك',
    'home.hero.subtitle': 'خوادم VPS عالية الأداء وخوادم مخصصة وحلول استضافة بموثوقية على مستوى المؤسسات ودعم على مدار الساعة. موثوق به من قبل آلاف الشركات حول العالم.',
    'home.hero.cta': 'ابدأ الآن',
    'home.hero.secondaryCta': 'عرض الأسعار',
    'home.process.title': 'كيف يعمل',
    'home.process.subtitle': 'ابدأ في 3 خطوات بسيطة',
    'home.process.step1.title': 'اختر خدمتك',
    'home.process.step1.description': 'تصفح مجموعتنا الواسعة من حلول الاستضافة واختر الخطة المثالية لاحتياجاتك.',
    'home.process.step2.title': 'أكمل طلبك',
    'home.process.step2.description': 'أكمل طلبك مع عملية دفع آمنة. ندعم طرق دفع متعددة.',
    'home.process.step3.title': 'ابدأ الآن',
    'home.process.step3.description': 'استلم بيانات خدمتك فوراً وابدأ بناء حضورك الإلكتروني.',
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.overview.title': 'نظرة عامة',
    'dashboard.overview.activeServices': 'الخدمات النشطة',
    'dashboard.overview.pendingOrders': 'الطلبات المعلقة',
    'dashboard.overview.openTickets': 'التذاكر المفتوحة',
    'dashboard.overview.totalInvoices': 'إجمالي الفواتير',
    'dashboard.orders.title': 'طلباتي',
    'dashboard.orders.empty': 'لا توجد طلبات',
    'dashboard.orders.orderNumber': 'رقم الطلب',
    'dashboard.orders.amount': 'المبلغ',
    'dashboard.orders.status': 'الحالة',
    'dashboard.orders.date': 'التاريخ',
    'dashboard.services.title': 'خدماتي',
    'dashboard.services.empty': 'لا توجد خدمات نشطة',
    'dashboard.invoices.title': 'الفواتير',
    'dashboard.invoices.empty': 'لا توجد فواتير',
    'dashboard.tickets.title': 'تذاكر الدعم',
    'dashboard.tickets.empty': 'لا توجد تذاكر',
    'dashboard.settings.title': 'الإعدادات',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get locale from current URL
    const pathLocale = window.location.pathname.split('/')[1];
    if (pathLocale === 'ar' || pathLocale === 'en') {
      setLocaleState(pathLocale);
    }

    // Update document direction and lang
    document.documentElement.dir = pathLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = pathLocale || 'en';
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);

    // Get current path without locale
    const pathParts = window.location.pathname.split('/');
    const currentLocale = pathParts[1];
    if (currentLocale === 'en' || currentLocale === 'ar') {
      pathParts[1] = newLocale;
    } else {
      pathParts.splice(1, 0, newLocale);
    }
    const newPath = pathParts.join('/') || '/';

    // Update URL
    window.location.href = newPath;
  };

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default values for SSR
    return {
      locale: 'en' as Locale,
      setLocale: () => {},
      t: (key: string) => translations['en'][key] || key,
      dir: 'ltr' as const,
    };
  }
  return context;
}
