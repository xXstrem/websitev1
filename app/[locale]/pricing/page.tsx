'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Check, Server, Cloud, Globe, Gamepad2, Lock, Monitor } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Plan {
  name: string;
  price: number;
  specs: string;
  features: string[];
  popular?: boolean;
}

interface Service {
  icon: typeof Server;
  name: string;
  plans: Plan[];
}

const services: Record<string, Service> = {
  vps: {
    icon: Server,
    name: 'VPS Hosting',
    plans: [
      { name: 'Starter', price: 7500, specs: '1 vCPU / 1 GB RAM / 25 GB SSD', features: ['DDoS Protection', 'Full Root Access', '24/7 Support'] },
      { name: 'Basic', price: 15000, specs: '2 vCPU / 2 GB RAM / 50 GB SSD', features: ['DDoS Protection', 'Full Root Access', '24/7 Support', 'Weekly Backups'], popular: true },
      { name: 'Professional', price: 35000, specs: '4 vCPU / 4 GB RAM / 100 GB SSD', features: ['DDoS Protection', 'Full Root Access', '24/7 Support', 'Weekly Backups', 'Priority Support'] },
      { name: 'Enterprise', price: 85000, specs: '8 vCPU / 16 GB RAM / 250 GB SSD', features: ['DDoS Protection', 'Full Root Access', '24/7 Support', 'Daily Backups', 'Priority Support', 'Dedicated IP'] },
    ],
  },
  dedicated: {
    icon: Monitor,
    name: 'Dedicated Servers',
    plans: [
      { name: 'Entry', price: 120000, specs: 'Intel Xeon E3 / 16 GB RAM / 2x500GB SSD', features: ['10Gbps Network', 'IPMI Access', '24/7 Support'] },
      { name: 'Business', price: 250000, specs: 'Intel Xeon E5 / 32 GB RAM / 2x1TB SSD', features: ['10Gbps Network', 'IPMI Access', '24/7 Support', 'RAID Configuration'], popular: true },
      { name: 'Enterprise', price: 500000, specs: 'Dual Intel Xeon / 64 GB RAM / 4x1TB SSD', features: ['10Gbps Network', 'IPMI Access', '24/7 Support', 'RAID 10', 'Premium Support'] },
    ],
  },
  shared: {
    icon: Cloud,
    name: 'Shared Hosting',
    plans: [
      { name: 'Starter', price: 4500, specs: '5 GB Storage / 50 GB Bandwidth', features: ['cPanel', 'Free SSL', '1 Website'] },
      { name: 'Business', price: 9000, specs: '20 GB Storage / 200 GB Bandwidth', features: ['cPanel', 'Free SSL', '5 Websites', 'Daily Backups'], popular: true },
      { name: 'Premium', price: 18000, specs: '50 GB Storage / Unlimited Bandwidth', features: ['cPanel', 'Free SSL', 'Unlimited Websites', 'Daily Backups', 'Priority Support'] },
    ],
  },
  game: {
    icon: Gamepad2,
    name: 'Game Servers',
    plans: [
      { name: 'Basic', price: 9000, specs: '4 vCPU / 4 GB RAM / 50 GB SSD', features: ['Low Latency', 'DDoS Protection', 'Instant Setup'] },
      { name: 'Pro', price: 18000, specs: '8 vCPU / 8 GB RAM / 100 GB SSD', features: ['Low Latency', 'DDoS Protection', 'Instant Setup', 'Priority Support'], popular: true },
      { name: 'Elite', price: 35000, specs: '16 vCPU / 16 GB RAM / 200 GB SSD', features: ['Low Latency', 'DDoS Protection', 'Instant Setup', 'Dedicated Resources', 'Premium Support'] },
    ],
  },
  domains: {
    icon: Globe,
    name: 'Domains',
    plans: [
      { name: '.com', price: 15000, specs: '1 Year Registration', features: ['DNS Management', 'WHOIS Privacy Available'] },
      { name: '.net', price: 18000, specs: '1 Year Registration', features: ['DNS Management', 'WHOIS Privacy Available'] },
      { name: '.org', price: 20000, specs: '1 Year Registration', features: ['DNS Management', 'WHOIS Privacy Available'] },
      { name: '.xyz', price: 10000, specs: '1 Year Registration', features: ['DNS Management', 'Popular for Tech'] },
    ],
  },
  ssl: {
    icon: Lock,
    name: 'SSL Certificates',
    plans: [
      { name: 'Basic SSL', price: 15000, specs: 'Domain Validation', features: ['Quick Issuance', 'Browser Padlock', '99.9% Recognition'] },
      { name: 'Premium SSL', price: 35000, specs: 'Organization Validation', features: ['Quick Issuance', 'Business Verification', 'Site Seal'], popular: true },
      { name: 'Wildcard SSL', price: 75000, specs: 'Unlimited Subdomains', features: ['Quick Issuance', '*.domain coverage', 'Easy Management'] },
    ],
  },
};

const translations = {
  en: {
    title: 'Pricing',
    subtitle: 'Simple, transparent pricing for all your hosting needs',
    mostPopular: 'Most Popular',
    orderNow: 'Order Now',
  },
  ar: {
    title: 'الأسعار',
    subtitle: 'أسعار بسيطة وشفافة لجميع احتياجات الاستضافة الخاصة بك',
    mostPopular: 'الأكثر شعبية',
    orderNow: 'اطلب الآن',
  },
};

export default function PricingPage() {
  const { locale, t } = useLanguage();
  const tr = translations[locale] || translations.en;

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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {tr.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {tr.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="vps" className="w-full">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8 h-auto">
                {Object.entries(services).map(([key, service]) => {
                  const Icon = service.icon;
                  return (
                    <TabsTrigger key={key} value={key} className="flex items-center gap-2 py-3">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{service.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.entries(services).map(([key, service]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {service.plans.map((plan, index) => (
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
                                {tr.mostPopular}
                              </span>
                            </div>
                          )}
                          <CardHeader className="text-center pb-4">
                            <CardTitle>{plan.name}</CardTitle>
                            <div className="mt-4">
                              <span className="text-3xl font-bold">{plan.price.toLocaleString()}</span>
                              <span className="text-muted-foreground ml-1">IQD{key === 'domains' || key === 'ssl' ? '/year' : '/month'}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{plan.specs}</p>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <ul className="space-y-2">
                              {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm">
                                  <Check className="h-4 w-4 shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <a href={`/${locale}/order/${key}/${plan.name.toLowerCase().replace(' ', '-')}`}>
                              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                                {t('common.orderNow')}
                              </Button>
                            </a>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
