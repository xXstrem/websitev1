'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import PricingCard from '@/components/pricing/pricing-card';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const vpsPlans = [
  {
    name: 'Starter',
    price: 4.99,
    specs: { cpu: '1 vCPU', ram: '1 GB', storage: '25 GB SSD', bandwidth: '1 TB' },
    features: ['1 IPv4 Address', '/64 IPv6', 'DDoS Protection', 'Instant Setup', '24/7 Support'],
    popular: false,
  },
  {
    name: 'Basic',
    price: 9.99,
    specs: { cpu: '2 vCPU', ram: '2 GB', storage: '50 GB SSD', bandwidth: '2 TB' },
    features: ['1 IPv4 Address', '/64 IPv6', 'DDoS Protection', 'Instant Setup', '24/7 Support', 'Weekly Backups'],
    popular: true,
  },
  {
    name: 'Professional',
    price: 19.99,
    specs: { cpu: '4 vCPU', ram: '4 GB', storage: '100 GB SSD', bandwidth: '5 TB' },
    features: ['1 IPv4 Address', '/64 IPv6', 'DDoS Protection', 'Instant Setup', '24/7 Support', 'Weekly Backups', 'Priority Support'],
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 49.99,
    specs: { cpu: '8 vCPU', ram: '16 GB', storage: '250 GB SSD', bandwidth: 'Unlimited' },
    features: ['2 IPv4 Address', '/64 IPv6', 'DDoS Protection', 'Instant Setup', '24/7 Support', 'Daily Backups', 'Priority Support', 'Dedicated IP'],
    popular: false,
  },
];

const includedFeatures = [
  'NVMe SSD Storage',
  'Full Root Access',
  'Multiple OS Options',
  'Instant Provisioning',
  'DDoS Protection',
  'Custom Firewall Rules',
  'Automatic Backups',
  'Control Panel Access',
  '99.9% Uptime SLA',
  '24/7 Technical Support',
];

export default function VPSPage() {
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {t('vps.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('vps.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {vpsPlans.map((plan, index) => (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  description={`${plan.specs.ram} RAM`}
                  price={plan.price}
                  features={plan.features}
                  popular={plan.popular}
                  index={index}
                  href={`/order/vps/${plan.name.toLowerCase()}`}
                  specs={plan.specs}
                />
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
                {t('vps.features.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-4xl mx-auto">
              {includedFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-2 p-4 bg-background rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Check className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
