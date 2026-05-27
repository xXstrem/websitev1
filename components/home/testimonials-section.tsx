'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = {
  en: [
    { name: 'Ahmed K.', role: 'E-commerce Owner', content: 'Excellent VPS performance, my online store has never been faster. Support team is very responsive and helpful.', initials: 'AK' },
    { name: 'Mohammed S.', role: 'Startup Founder', content: 'Affordable dedicated servers with enterprise features. Perfect for our growing SaaS platform.', initials: 'MS' },
    { name: 'Sara A.', role: 'Web Developer', content: 'The shared hosting plan works great for my client websites. cPanel is easy to use and support is 24/7.', initials: 'SA' },
    { name: 'Omar H.', role: 'Game Server Admin', content: 'Our Minecraft server runs smooth with low latency. DDoS protection has saved us multiple times.', initials: 'OH' },
    { name: 'Fatima R.', role: 'Business Owner', content: 'Migrated our entire infrastructure with zero downtime. The team handled everything professionally.', initials: 'FR' },
    { name: 'Ali M.', role: 'Tech Lead', content: '99.9% uptime as promised. Our services have been running flawlessly for over a year now.', initials: 'AM' },
  ],
  ar: [
    { name: 'أحمد ك.', role: 'صاحب متجر إلكتروني', content: 'أداء VPS ممتاز، متجري لم يكن أسرع من قبل. فريق الدعم متجاوب ومفيد جداً.', initials: 'أك' },
    { name: 'محمد س.', role: 'مؤسس شركة ناشئة', content: 'خوادم مخصصة بأسعار معقولة وميزات على مستوى المؤسسات. مثالية لمنصتنا.', initials: 'مس' },
    { name: 'سارة أ.', role: 'مطورة ويب', content: 'خطة الاستضافة المشتركة تعمل بشكل رائع لمواقع عملائي. cPanel سهل الاستخدام.', initials: 'سأ' },
    { name: 'عمر ح.', role: 'مدير خادم ألعاب', content: 'خادم Minecraft يعمل بسلاسة مع زمن استجابة منخفض. حماية DDoS أنقذتنا عدة مرات.', initials: 'عح' },
    { name: 'فاطمة ر.', role: 'صاحبة عمل', content: 'تم ترحيل بنيتنا التحتية بالكامل بدون توقف. الفريق تعامل مع كل شيء باحترافية.', initials: 'فر' },
    { name: 'علي م.', role: 'قائد تقني', content: '99.9% وقت تشغيل كما وُعد. خدماتنا تعمل بشكل مثالي لأكثر من عام الآن.', initials: 'عم' },
  ],
};

const labels = {
  en: { title: 'What Our Clients Say', subtitle: 'Real reviews from real customers' },
  ar: { title: 'ماذا يقول عملاؤنا', subtitle: 'آراء حقيقية من عملاء حقيقيين' },
};

export default function TestimonialsSection() {
  const { locale } = useLanguage();
  const lang = locale === 'ar' ? 'ar' : 'en';
  const data = testimonials[lang];
  const l = labels[lang];

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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{l.title}</h2>
          <p className="text-lg text-muted-foreground">{l.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((testimonial, index) => (
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
