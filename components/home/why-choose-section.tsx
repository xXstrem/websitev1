'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Cpu, Shield, Clock, Headphones, Scale, DollarSign } from 'lucide-react';

const features = [
  { icon: Cpu, key: 'performance' },
  { icon: Clock, key: 'reliability' },
  { icon: Shield, key: 'security' },
  { icon: Headphones, key: 'support' },
  { icon: Scale, key: 'flexibility' },
  { icon: DollarSign, key: 'pricing' },
];

const texts = {
  en: {
    title: 'Why Ton Cloud',
    subtitle: 'We provide enterprise-grade infrastructure with unmatched performance and reliability.',
    features: {
      performance: { title: 'High Performance', description: 'NVMe SSD storage and premium hardware for blazing-fast speeds and optimal performance.' },
      reliability: { title: '99.9% Uptime', description: 'Enterprise-grade infrastructure with redundant systems ensuring maximum availability.' },
      security: { title: 'Advanced Security', description: 'DDoS protection, firewalls, and regular security audits to keep your data safe.' },
      support: { title: '24/7 Support', description: 'Technical support available around the clock in Arabic and English.' },
      flexibility: { title: 'Flexible Scaling', description: 'Easily scale resources as your project grows without any downtime.' },
      pricing: { title: 'Transparent Pricing', description: 'No hidden fees. Competitive prices in Iraqi Dinar with clear invoicing.' },
    },
  },
  ar: {
    title: 'لماذا تون كلاود',
    subtitle: 'نوفر بنية تحتية على مستوى المؤسسات بأداء وموثوقية لا مثيل لهما.',
    features: {
      performance: { title: 'أداء عالي', description: 'تخزين NVMe SSD وأجهزة متميزة لسرعات فائقة وأداء مثالي.' },
      reliability: { title: '99.9% وقت تشغيل', description: 'بنية تحتية على مستوى المؤسسات مع أنظمة احتياطية تضمن أقصى توفر.' },
      security: { title: 'أمان متقدم', description: 'حماية DDoS وجدران نارية وتدقيق أمني منتظم للحفاظ على أمان بياناتك.' },
      support: { title: 'دعم 24/7', description: 'دعم تقني متاح على مدار الساعة بالعربية والإنجليزية.' },
      flexibility: { title: 'توسع مرن', description: 'توسيع الموارد بسهولة مع نمو مشروعك دون أي توقف.' },
      pricing: { title: 'أسعار شفافة', description: 'بدون رسوم خفية. أسعار تنافسية بالدينار العراقي مع فوترة واضحة.' },
    },
  },
};

export default function WhyChooseSection() {
  const { locale } = useLanguage();
  const lang = locale === 'ar' ? 'ar' : 'en';
  const t = texts[lang];

  return (
    <section className="py-20 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const featureText = t.features[feature.key as keyof typeof t.features];
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-background border rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground text-background mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{featureText.title}</h3>
                  <p className="text-muted-foreground">{featureText.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
