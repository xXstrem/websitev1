'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Monitor, Shield, Zap, HardDrive, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const dedicatedPlans = [
  {
    name: 'Entry Server',
    price: 120000,
    specs: { cpu: 'Intel Xeon E3', ram: '16 GB DDR4', storage: '2x500GB SSD' },
    features: ['10Gbps Network', 'IPMI Access', '24/7 Support', 'DDoS Protection', '99.9% SLA'],
    popular: false,
  },
  {
    name: 'Business Server',
    price: 250000,
    specs: { cpu: 'Intel Xeon E5', ram: '32 GB DDR4', storage: '2x1TB SSD' },
    features: ['10Gbps Network', 'IPMI Access', '24/7 Support', 'DDoS Protection', '99.9% SLA', 'RAID Configuration'],
    popular: true,
  },
  {
    name: 'Enterprise Server',
    price: 500000,
    specs: { cpu: 'Dual Intel Xeon', ram: '64 GB DDR4', storage: '4x1TB SSD' },
    features: ['10Gbps Network', 'IPMI Access', '24/7 Support', 'DDoS Protection', '99.99% SLA', 'RAID 10', 'Premium Support'],
    popular: false,
  },
  {
    name: 'Custom Server',
    price: 0,
    specs: { cpu: 'Custom Config', ram: 'Up to 512 GB', storage: 'Custom Storage' },
    features: ['10Gbps Network', 'IPMI Access', '24/7 Support', 'DDoS Protection', 'Custom RAID', 'Dedicated Account Manager'],
    popular: false,
  },
];

const features = [
  { icon: Monitor, title: 'Enterprise Hardware', description: 'Latest generation Intel processors' },
  { icon: Shield, title: 'DDoS Protection', description: 'Included at no extra cost' },
  { icon: HardDrive, title: 'RAID Storage', description: 'Multiple configurations available' },
  { icon: Cpu, title: 'IPMI Access', description: 'Full remote management capability' },
];

export default function DedicatedPage() {
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
                <Monitor className="h-6 w-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {t('dedicated.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('dedicated.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dedicatedPlans.map((plan, index) => (
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
                        {plan.price > 0 ? (
                          <>
                            <span className="text-3xl font-bold">{plan.price.toLocaleString()}</span>
                            <span className="text-muted-foreground ml-1">IQD/month</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">Contact Us</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="font-medium">CPU: {plan.specs.cpu}</p>
                        <p>RAM: {plan.specs.ram}</p>
                        <p>Storage: {plan.specs.storage}</p>
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
                      <Button className="w-full mt-4" variant={plan.popular ? 'default' : 'outline'}>
                        {plan.price > 0 ? t('common.orderNow') : t('common.contactUs')}
                      </Button>
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
                {t('dedicated.features.title')}
              </h2>
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
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                  Bare Metal Performance
                </h2>
                <p className="text-muted-foreground mb-6">
                  Dedicated servers provide the ultimate in performance, security, and control.
                  With no virtualization overhead, you get 100% of the hardware resources.
                </p>
                <ul className="space-y-3">
                  {['No resource sharing', 'Full hardware access', 'Custom configurations', 'Maximum throughput'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="p-6 bg-muted/30 rounded-xl text-center">
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-sm text-muted-foreground">Gbps Network</div>
                </div>
                <div className="p-6 bg-muted/30 rounded-xl text-center">
                  <div className="text-3xl font-bold">99.99%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="p-6 bg-muted/30 rounded-xl text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
                <div className="p-6 bg-muted/30 rounded-xl text-center">
                  <div className="text-3xl font-bold">IPMI</div>
                  <div className="text-sm text-muted-foreground">Remote Access</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
