'use client';

import { useTranslations } from 'next-intl';
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

export default function WhyChooseSection() {
  const t = useTranslations('home.whyChoose');

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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-background border rounded-2xl p-6 lg:p-8 hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground text-background mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(`features.${feature.key}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`features.${feature.key}.description`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
