'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Cloud, Shield, Mail, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const sharedPlans = [
  {
    name: 'Starter',
    price: 4500,
    specs: { storage: '5 GB', bandwidth: '50 GB', websites: '1', emails: '5' },
    features: ['cPanel Control Panel', 'Free SSL Certificate', 'Weekly Backups', 'PHP 8.x Support', 'MySQL Database'],
    popular: false,
  },
  {
    name: 'Business',
    price: 9000,
    specs: { storage: '20 GB', bandwidth: '200 GB', websites: '5', emails: '20' },
    features: ['cPanel Control Panel', 'Free SSL Certificate', 'Daily Backups', 'PHP 8.x Support', 'MySQL Databases', 'Priority Support'],
    popular: true,
  },
  {
    name: 'Premium',
    price: 18000,
    specs: { storage: '50 GB', bandwidth: 'Unlimited', websites: 'Unlimited', emails: 'Unlimited' },
    features: ['cPanel Control Panel', 'Free SSL Certificate', 'Daily Backups', 'PHP 8.x Support', 'Unlimited MySQL', 'Priority Support', 'Free Domain (Annual)'],
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 35000,
    specs: { storage: '100 GB', bandwidth: 'Unlimited', websites: 'Unlimited', emails: 'Unlimited' },
    features: ['cPanel Control Panel', 'Free SSL Certificate', 'Daily Backups', 'PHP 8.x Support', 'Unlimited MySQL', 'Premium Support', 'Free Domain (Annual)', 'Free Migration'],
    popular: false,
  },
];

const features = [
  { icon: Cloud, title: 'cPanel Control Panel', description: 'Industry-leading control panel for easy management' },
  { icon: Shield, title: 'Free SSL Certificate', description: 'Secure your website with Let\'s Encrypt SSL' },
  { icon: Mail, title: 'Email Accounts', description: 'Professional email with your domain name' },
  { icon: Database, title: 'MySQL Databases', description: 'Create unlimited databases for your applications' },
  { icon: Zap, title: 'PHP 8 Support', description: 'Latest PHP versions for optimal performance' },
];

export default function SharedPage() {
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
                <Cloud className="h-6 w-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {t('shared.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('shared.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sharedPlans.map((plan, index) => (
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
                        <span className="text-muted-foreground ml-1">IQD/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Storage: {plan.specs.storage}</p>
                        <p>Bandwidth: {plan.specs.bandwidth}</p>
                        <p>Websites: {plan.specs.websites}</p>
                        <p>Email Accounts: {plan.specs.emails}</p>
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
                        {t('common.orderNow')}
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
                {t('shared.features.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
                    <h3 className="font-semibold mb-2 text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
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
                  Perfect for Small Websites
                </h2>
                <p className="text-muted-foreground mb-6">
                  Shared hosting is the most affordable way to get your website online.
                  Perfect for blogs, portfolios, small businesses, and startups.
                </p>
                <ul className="space-y-3">
                  {['One-click WordPress installation', 'Easy-to-use website builder', 'Automatic updates and security patches', 'Expert support team'].map((item) => (
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
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="p-6 bg-muted/30 rounded-xl text-center">
                  <div className="text-3xl font-bold">Free</div>
                  <div className="text-sm text-muted-foreground">SSL Certificate</div>
                </div>
                <div className="p-6 bg-muted/30 rounded-xl text-center">
                  <div className="text-3xl font-bold">Daily</div>
                  <div className="text-sm text-muted-foreground">Backups</div>
                </div>
                <div className="p-6 bg-muted/30 rounded-xl text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
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
