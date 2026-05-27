'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { key: 'servers', valueEn: '5,000+', valueAr: '5,000+' },
  { key: 'customers', valueEn: '10,000+', valueAr: '10,000+' },
  { key: 'countries', valueEn: '15', valueAr: '15' },
  { key: 'uptime', valueEn: '99.9%', valueAr: '99.9%' },
];

const labels = {
  en: {
    title: 'Trusted by Companies Worldwide',
    servers: 'Active Servers',
    customers: 'Happy Customers',
    countries: 'Data Centers',
    uptime: 'Uptime',
  },
  ar: {
    title: 'موثوق به من قبل الشركات حول العالم',
    servers: 'خادم متصل',
    customers: 'عميل سعيد',
    countries: 'مركز بيانات',
    uptime: 'وقت التشغيل',
  },
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  const { locale } = useLanguage();
  const lang = locale === 'ar' ? 'ar' : 'en';

  const displayStats = [
    { key: 'servers', display: stats[0].valueEn },
    { key: 'customers', display: stats[1].valueEn },
    { key: 'countries', display: stats[2].valueEn },
    { key: 'uptime', display: stats[3].valueEn },
  ];

  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {labels[lang].title}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {displayStats.map((stat, index) => (
            <motion.div
              key={stat.key}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                {stat.display}
              </div>
              <div className="text-sm sm:text-base text-background/60">
                {labels[lang][stat.key as keyof typeof labels['en']]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
