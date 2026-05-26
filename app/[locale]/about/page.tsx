'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Users, Award, Zap, Globe } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Integrity', description: 'We maintain the highest ethical standards in all our dealings.' },
  { icon: Zap, title: 'Innovation', description: 'Continuously improving our services with the latest technology.' },
  { icon: Award, title: 'Excellence', description: 'Striving for perfection in every aspect of our service.' },
  { icon: Heart, title: 'Transparency', description: 'Clear communication and honest pricing with no hidden fees.' },
];

const stats = [
  { value: '50+', label: 'Team Members' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '24/7', label: 'Support Available' },
];

const milestones = [
  { year: '2018', title: 'Company Founded', description: 'Started with a vision to provide premium cloud infrastructure.' },
  { year: '2019', title: 'First Data Center', description: 'Launched our first data center in the Middle East region.' },
  { year: '2021', title: '10,000 Customers', description: 'Reached our milestone of serving 10,000 customers.' },
  { year: '2023', title: 'Global Expansion', description: 'Expanded to multiple data centers worldwide.' },
  { year: '2024', title: 'Premium Services', description: 'Introduced enterprise-grade solutions for all businesses.' },
];

export default function AboutPage() {
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
                {t('about.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('about.subtitle')}
              </p>
            </motion.div>
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
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('about.story.title')}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2018, Ton Cloud emerged from a simple vision: to provide businesses in the Middle East and beyond with enterprise-grade cloud infrastructure at competitive prices.
                  </p>
                  <p>
                    We recognized that many hosting providers charged premium prices while offering subpar service. We set out to change that paradigm by building a company focused on reliability, performance, and customer satisfaction.
                  </p>
                  <p>
                    Today, we serve thousands of businesses worldwide, from startups to enterprise organizations, all benefiting from our robust infrastructure and dedicated support team.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="p-6 bg-muted/30 rounded-xl text-center">
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
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
                {t('about.mission.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 p-6 bg-background rounded-xl">
                  <div className="p-3 rounded-lg bg-foreground text-background shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground text-sm">
                      To empower businesses of all sizes with reliable, high-performance cloud solutions that enable growth and innovation. We believe every business deserves access to enterprise-grade infrastructure without the enterprise price tag.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 p-6 bg-background rounded-xl">
                  <div className="p-3 rounded-lg bg-foreground text-background shrink-0">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground text-sm">
                      To become the leading cloud infrastructure provider in the Middle East, known for exceptional service, innovative solutions, and unwavering commitment to our customers success.
                    </p>
                  </div>
                </div>
              </motion.div>
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
                {t('about.values.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className="text-center p-6 border rounded-xl hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-foreground text-background mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                );
              })}
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
                Our Journey
              </h2>
              <p className="text-muted-foreground">
                Key milestones in our growth story
              </p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="relative pl-12 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{milestone.year}</div>
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                  </div>
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
