'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Rocket } from 'lucide-react';

const steps = [
  { icon: Search, key: 'step1' },
  { icon: ShoppingCart, key: 'step2' },
  { icon: Rocket, key: 'step3' },
];

export default function ProcessSection() {
  const t = useTranslations('home.process');

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-px bg-border" />
                )}
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-background border-2 mb-6 mx-auto relative z-10">
                    <Icon className="h-12 w-12" />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center z-20">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(`${step.key}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`${step.key}.description`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
