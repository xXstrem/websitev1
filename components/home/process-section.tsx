'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Rocket, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  { icon: Search, step: 1 },
  { icon: ShoppingCart, step: 2 },
  { icon: Rocket, step: 3 },
];

export default function ProcessSection() {
  const { locale, t } = useLanguage();

  const stepTitles = locale === 'ar'
    ? ['اختر خدمتك', 'أكمل طلبك', 'ابدأ الآن']
    : ['Choose Your Service', 'Complete Your Order', 'Get Started'];

  const stepDescriptions = locale === 'ar'
    ? [
        'تصفح مجموعتنا الواسعة من حلول الاستضافة واختر الخطة المثالية لاحتياجاتك.',
        'أكمل طلبك مع عملية دفع آمنة. ندعم طرق دفع متعددة.',
        'استلم بيانات خدمتك فوراً وابدأ بناء حضورك الإلكتروني.',
      ]
    : [
        'Browse our wide range of hosting solutions and select the perfect plan for your needs.',
        'Complete your order with our secure checkout process. We support multiple payment methods.',
        'Receive your service credentials instantly and start building your online presence.',
      ];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            {locale === 'ar' ? 'سهل وبسيط' : 'Easy & Simple'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t('home.process.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('home.process.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connection line - desktop only */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="relative border-0 shadow-none bg-transparent">
                  <CardContent className="p-0 text-center">
                    {/* Step number */}
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 rounded-full bg-background border-2 flex items-center justify-center mx-auto shadow-lg">
                        <Icon className="h-8 w-8 text-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center shadow-lg">
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">
                      {stepTitles[index]}
                    </h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      {stepDescriptions[index]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
