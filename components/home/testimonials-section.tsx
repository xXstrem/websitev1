'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Ahmed K.', role: 'E-commerce Owner', content: 'Excellent VPS performance, my online store has never been faster. Support team is very responsive and helpful.', initials: 'AK' },
  { name: 'Mohammed S.', role: 'Startup Founder', content: 'Affordable dedicated servers with enterprise features. Perfect for our growing SaaS platform.', initials: 'MS' },
  { name: 'Sara A.', role: 'Web Developer', content: 'The shared hosting plan works great for my client websites. cPanel is easy to use and support is 24/7.', initials: 'SA' },
  { name: 'Omar H.', role: 'Game Server Admin', content: 'Our Minecraft server runs smooth with low latency. DDoS protection has saved us multiple times.', initials: 'OH' },
  { name: 'Fatima R.', role: 'Business Owner', content: 'Migrated our entire infrastructure with zero downtime. The team handled everything professionally.', initials: 'FR' },
  { name: 'Ali M.', role: 'Tech Lead', content: '99.9% uptime as promised. Our services have been running flawlessly for over a year now.', initials: 'AM' },
];

export default function TestimonialsSection() {
  const t = useTranslations('home.testimonials');

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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-foreground text-background text-sm font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
