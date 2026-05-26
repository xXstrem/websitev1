'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('home.cta');

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 sm:p-12 lg:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t('title')}</h2>
            <p className="text-lg text-background/70 mb-8">{t('subtitle')}</p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base group">
                {t('button')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
