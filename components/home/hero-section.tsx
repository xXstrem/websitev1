'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Server, Shield, Clock, Zap } from 'lucide-react';

const features = [
  { icon: Clock, textEn: '99.9% Uptime', textAr: '99.9% وقت تشغيل' },
  { icon: Shield, textEn: '24/7 Support', textAr: 'دعم 24/7' },
  { icon: Zap, textEn: 'Enterprise Security', textAr: 'أمان المؤسسات' },
];

export default function HeroSection() {
  const { locale, t } = useLanguage();

  const title = locale === 'ar'
    ? 'بنية تحتية سحابية متميزة لمشروعك'
    : 'Premium Cloud Infrastructure for Your Project';

  const subtitle = locale === 'ar'
    ? 'خوادم VPS عالية الأداء وخوادم مخصصة وحلول استضافة بموثوقية على مستوى المؤسسات ودعم على مدار الساعة. موثوق به من قبل آلاف الشركات حول العالم.'
    : 'High-performance VPS servers, dedicated servers, and hosting solutions with enterprise-grade reliability and 24/7 support. Trusted by thousands of companies worldwide.';

  const cta = locale === 'ar' ? 'ابدأ الآن' : 'Get Started';
  const secondaryCta = locale === 'ar' ? 'عرض الأسعار' : 'View Pricing';
  const badge = locale === 'ar' ? 'استضافة سحابية متميزة' : 'Premium Cloud Hosting';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-white dark:from-gray-900 dark:via-background dark:to-background" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gray-200/30 dark:bg-gray-800/30 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gray-100/40 dark:bg-gray-900/40 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium mb-6">
              <Server className="h-4 w-4 mr-2" />
              {badge}
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href={`/${locale}/vps`}>
              <Button size="lg" className="h-12 px-8 text-base">{cta}</Button>
            </a>
            <a href={`/${locale}/pricing`}>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">{secondaryCta}</Button>
            </a>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.textEn} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4" />
                  <span>{locale === 'ar' ? feature.textAr : feature.textEn}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
