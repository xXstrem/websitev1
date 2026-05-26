'use client';

import { useTranslations } from 'next-intl';
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

export default function FeaturesSection() {
  const t = useTranslations('home.features');

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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
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
                <h3 className="text-lg font-semibold mb-2">{t(`${feature.key}.title`)}</h3>
                <p className="text-muted-foreground text-sm">{t(`${feature.key}.description`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
