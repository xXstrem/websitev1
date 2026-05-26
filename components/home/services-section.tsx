'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
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

export default function ServicesSection() {
  const t = useTranslations('home.services');

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
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group h-full bg-background border rounded-2xl p-6 lg:p-8 hover-lift cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted">
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all rtl:rotate-180" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t(`${service.key}.title`)}</h3>
                    <p className="text-muted-foreground mb-4">{t(`${service.key}.description`)}</p>
                    <p className="text-sm font-medium text-muted-foreground">{t(`${service.key}.from`)}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
