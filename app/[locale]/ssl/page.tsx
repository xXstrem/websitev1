'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Shield, Lock, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const sslPlans = [
  {
    name: 'Basic SSL',
    price: 15000,
    validation: 'Domain Validation',
    issuance: 'Minutes',
    warranty: 'IQD 15,000,000',
    features: ['Single Domain', 'Domain Validation', 'Quick Issuance', 'Browser Padlock', '99.9% Browser Recognition'],
    popular: false,
  },
  {
    name: 'Premium SSL',
    price: 35000,
    validation: 'Organization Validation',
    issuance: '1-3 Days',
    warranty: 'IQD 350,000,000',
    features: ['Single Domain', 'Organization Validation', 'Business Verification', 'Dynamic Site Seal', 'Priority Support'],
    popular: true,
  },
  {
    name: 'Wildcard SSL',
    price: 75000,
    validation: 'Domain Validation',
    issuance: 'Minutes',
    warranty: 'IQD 75,000,000',
    features: ['Unlimited Subdomains', 'Domain Validation', '*.domain.com Coverage', 'Easy Management', 'Quick Issuance'],
    popular: false,
  },
  {
    name: 'Extended SSL',
    price: 120000,
    validation: 'Extended Validation',
    issuance: '3-7 Days',
    warranty: 'IQD 1,500,000,000',
    features: ['Single Domain', 'Extended Validation', 'Green Address Bar', 'Highest Trust Level', 'Premium Support'],
    popular: false,
  },
];

const features = [
  {
    icon: Shield,
    title: 'encryption',
    description: '256-bit encryption for all data transfers',
  },
  {
    icon: Lock,
    title: 'trust',
    description: 'Increase customer trust and confidence',
  },
  {
    icon: Award,
    title: 'seo',
    description: 'Improve your search engine rankings',
  },
  {
    icon: Clock,
    title: 'issuance',
    description: 'Quick issuance and easy installation',
  },
];

export default function SSLPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-foreground text-background mb-6">
                <Lock className="h-6 w-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {t('ssl.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('ssl.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sslPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative ${plan.popular ? 'border-foreground shadow-lg' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">{plan.price.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-1">IQD/year</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Validation: {plan.validation}</p>
                        <p>Issuance: {plan.issuance}</p>
                        <p>Warranty: {plan.warranty}</p>
                      </div>
                      <div className="border-t pt-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link href={`/order/ssl/${plan.name.toLowerCase().replace(' ', '-')}`}>
                        <Button className="w-full mt-4" variant={plan.popular ? 'default' : 'outline'}>
                          {t('common.orderNow')}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Why You Need SSL
              </h2>
              <p className="text-muted-foreground">
                SSL certificates protect your website and build trust with your visitors
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="text-center p-6 bg-background rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-foreground text-background mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-2 capitalize">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
