'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import {
  Server,
  HardDrive,
  Globe,
  Gamepad2,
  Lock,
  Monitor,
  ArrowRight
} from 'lucide-react';

const services = [
  { key: 'vps', icon: Server, href: '/vps' },
  { key: 'dedicated', icon: HardDrive, href: '/dedicated' },
  { key: 'shared', icon: Monitor, href: '/shared' },
  { key: 'domains', icon: Globe, href: '/domains' },
  { key: 'game', icon: Gamepad2, href: '/game' },
  { key: 'ssl', icon: Lock, href: '/ssl' },
];

const serviceTexts: Record<string, { en: { title: string; description: string; from: string }; ar: { title: string; description: string; from: string } }> = {
  vps: {
    en: { title: 'VPS Hosting', description: 'Virtual private servers with dedicated resources and full root access.', from: 'From 15,000 IQD/month' },
    ar: { title: 'استضافة VPS', description: 'خوادم افتراضية خاصة بموارد مخصصة ووصول كامل للروت.', from: 'من 15,000 دينار/شهر' },
  },
  dedicated: {
    en: { title: 'Dedicated Servers', description: 'Bare metal performance for your most demanding workloads.', from: 'From 120,000 IQD/month' },
    ar: { title: 'خوادم مخصصة', description: 'أداء كامل لأحمال العمل الأكثر طلبًا.', from: 'من 120,000 دينار/شهر' },
  },
  shared: {
    en: { title: 'Shared Hosting', description: 'Affordable hosting perfect for small websites.', from: 'From 4,500 IQD/month' },
    ar: { title: 'استضافة مشتركة', description: 'استضافة ميسورة مثالية للمواقع الصغيرة.', from: 'من 4,500 دينار/شهر' },
  },
  domains: {
    en: { title: 'Domain Registration', description: 'Find and register your perfect domain name.', from: 'From 15,000 IQD/year' },
    ar: { title: 'تسجيل النطاقات', description: 'ابحث عن اسم نطاقك المثالي وسجله.', from: 'من 15,000 دينار/سنة' },
  },
  game: {
    en: { title: 'Game Server Hosting', description: 'Low-latency servers for the ultimate gaming experience.', from: 'From 9,000 IQD/month' },
    ar: { title: 'خوادم الألعاب', description: 'خوادم بزمن استجابة منخفض لأفضل تجربة ألعاب.', from: 'من 9,000 دينار/شهر' },
  },
  ssl: {
    en: { title: 'SSL Certificates', description: 'Secure your website with trusted SSL certificates.', from: 'From 15,000 IQD/year' },
    ar: { title: 'شهادات SSL', description: 'احمِ موقعك بشهادات SSL موثوقة.', from: 'من 15,000 دينار/سنة' },
  },
};

export default function ServicesSection() {
  const { locale, t } = useLanguage();

  const title = locale === 'ar' ? 'خدماتنا' : 'Our Services';
  const subtitle = locale === 'ar' ? 'حلول استضافة متكاملة لكل احتياج' : 'Complete hosting solutions for every need';

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const texts = serviceTexts[service.key];
            const lang = locale === 'ar' ? 'ar' : 'en';

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={`/${locale}${service.href}`}>
                  <div className="group h-full bg-background border rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted">
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all rtl:rotate-180" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{texts[lang].title}</h3>
                    <p className="text-muted-foreground mb-4">{texts[lang].description}</p>
                    <p className="text-sm font-medium text-muted-foreground">{texts[lang].from}</p>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
