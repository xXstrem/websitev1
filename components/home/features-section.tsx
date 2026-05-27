'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Shield, Database, Activity, LayoutDashboard, Lock, ArrowRightLeft } from 'lucide-react';

const features = [
  { icon: Shield, key: 'ddos' },
  { icon: Database, key: 'backup' },
  { icon: Activity, key: 'monitoring' },
  { icon: LayoutDashboard, key: 'panel' },
  { icon: Lock, key: 'ssl' },
  { icon: ArrowRightLeft, key: 'migration' },
];

const texts = {
  en: {
    title: 'Powerful Features',
    subtitle: 'Everything you need to succeed online',
    features: {
      ddos: { title: 'DDoS Protection', description: 'Advanced protection against DDoS attacks to keep your services online.' },
      backup: { title: 'Daily Backups', description: 'Automatic daily backups with easy restore options to protect your data.' },
      monitoring: { title: '24/7 Monitoring', description: 'Continuous server monitoring with instant alerts and auto-recovery.' },
      panel: { title: 'Control Panel', description: 'Intuitive control panel to manage all your services in one place.' },
      ssl: { title: 'Free SSL', description: 'Free SSL certificates for all hosting plans to secure your website.' },
      migration: { title: 'Free Migration', description: "We'll transfer your existing services to our platform at no extra cost." },
    },
  },
  ar: {
    title: 'ميزات قوية',
    subtitle: 'كل ما تحتاجه للنجاح عبر الإنترنت',
    features: {
      ddos: { title: 'حماية DDoS', description: 'حماية متقدمة ضد هجمات DDoS لضمان بقاء خدماتك متصلة.' },
      backup: { title: 'نسخ احتياطي يومي', description: 'نسخ احتياطي تلقائي يومي مع خيارات استعادة سهلة لحماية بياناتك.' },
      monitoring: { title: 'مراقبة 24/7', description: 'مراقبة مستمرة للخوادم مع تنبيهات فورية واسترداد تلقائي.' },
      panel: { title: 'لوحة تحكم', description: 'لوحة تحكم بديهية لإدارة جميع خدماتك في مكان واحد.' },
      ssl: { title: 'SSL مجاني', description: 'شهادات SSL مجانية لجميع خطط الاستضافة لتأمين موقعك.' },
      migration: { title: 'ترحيل مجاني', description: 'سننقل خدماتك الحالية إلى منصتنا بدون أي تكلفة إضافية.' },
    },
  },
};

export default function FeaturesSection() {
  const { locale } = useLanguage();
  const lang = locale === 'ar' ? 'ar' : 'en';
  const t = texts[lang];

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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const featureText = t.features[feature.key as keyof typeof t.features];
            return (
              <motion.div
                key={feature.key}
                className="bg-background border rounded-xl p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{featureText.title}</h3>
                <p className="text-muted-foreground text-sm">{featureText.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
