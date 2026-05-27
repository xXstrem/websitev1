'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Check, Gamepad2, Zap, Shield, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const gamePlans = [
  {
    name: 'Starter',
    price: 9000,
    slots: '10 Slots',
    specs: { cpu: '2 vCPU', ram: '4 GB', storage: '50 GB NVMe' },
    features: ['DDoS Protection', 'Instant Setup', 'Control Panel', 'Mod Support', '24/7 Support'],
    popular: false,
  },
  {
    name: 'Basic',
    price: 18000,
    slots: '20 Slots',
    specs: { cpu: '4 vCPU', ram: '8 GB', storage: '100 GB NVMe' },
    features: ['DDoS Protection', 'Instant Setup', 'Control Panel', 'Mod Support', '24/7 Support', 'Automatic Backups'],
    popular: true,
  },
  {
    name: 'Pro',
    price: 35000,
    slots: '50 Slots',
    specs: { cpu: '8 vCPU', ram: '16 GB', storage: '200 GB NVMe' },
    features: ['DDoS Protection', 'Instant Setup', 'Control Panel', 'Mod Support', '24/7 Support', 'Automatic Backups', 'Priority Support'],
    popular: false,
  },
  {
    name: 'Elite',
    price: 65000,
    slots: '100 Slots',
    specs: { cpu: '16 vCPU', ram: '32 GB', storage: '400 GB NVMe' },
    features: ['DDoS Protection', 'Instant Setup', 'Control Panel', 'Full Mod Support', '24/7 Support', 'Daily Backups', 'Priority Support', 'Dedicated Resources'],
    popular: false,
  },
];

const supportedGames = [
  'Minecraft (Java & Bedrock)',
  'Counter-Strike 2',
  'Rust',
  'ARK: Survival Evolved',
  'FiveM / GTA V',
  'Valheim',
  '7 Days to Die',
  'TeamSpeak 3',
  'Discord Bot Hosting',
  'Terraria',
  'Factorio',
  'And more...',
];

const features = [
  { icon: Zap, title: 'Ultra Low Latency', description: 'Optimized network routes for minimal ping' },
  { icon: Shield, title: 'DDoS Protection', description: 'Enterprise-grade protection included free' },
  { icon: Users, title: 'Easy Management', description: 'One-click mod installation and updates' },
  { icon: Globe, title: 'Global Locations', description: 'Choose the best location for your players' },
];

const translations = {
  en: {
    title: 'Game Server Hosting',
    subtitle: 'Low-latency servers for the ultimate gaming experience',
    supportedGames: 'Supported Games',
    supportedGamesSubtitle: 'Host your favorite game servers with one-click installation',
    whyTonCloud: 'Why Ton Cloud for Gaming',
    mostPopular: 'Most Popular',
    orderNow: 'Order Now',
  },
  ar: {
    title: 'استضافة خوادم الألعاب',
    subtitle: 'خوادم منخفضة الكمون لأفضل تجربة ألعاب',
    supportedGames: 'الألعاب المدعومة',
    supportedGamesSubtitle: 'استضف خوادم ألعابك المفضلة بتثبيت بنقرة واحدة',
    whyTonCloud: 'لماذا Ton Cloud للألعاب',
    mostPopular: 'الأكثر شعبية',
    orderNow: 'اطلب الآن',
  },
};

export default function GamePage() {
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
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-foreground text-background mb-6">
                <Gamepad2 className="h-6 w-6" />
              </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gamePlans.map((plan, index) => (
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
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-sm text-muted-foreground">{plan.slots}</span>
                      </div>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">{plan.price.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-1">IQD/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{plan.specs.cpu}</p>
                        <p>{plan.specs.ram} RAM</p>
                        <p>{plan.specs.storage}</p>
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
                      <a href={`/${locale}/order/game/${plan.name.toLowerCase()}`}>
                        <Button className="w-full mt-4" variant={plan.popular ? 'default' : 'outline'}>
                          {t('common.orderNow')}
                        </Button>
                      </a>
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
                {tr.supportedGames}
              </h2>
              <p className="text-muted-foreground">
                {tr.supportedGamesSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {supportedGames.map((game, index) => (
                <motion.div
                  key={game}
                  className="p-4 bg-background rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-sm">{game}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                {tr.whyTonCloud}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="text-center p-6 bg-muted/30 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-foreground text-background mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
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
