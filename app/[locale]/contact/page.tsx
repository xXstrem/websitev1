'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MessageCircle, Clock, Send, Loader2 } from 'lucide-react';

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    sendMessage: 'Send us a message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    submit: 'Send Message',
    contactInfo: 'Contact Information',
    contactInfoDesc: "We're here to help. Reach out to us through any of the channels below.",
    emailLabel: 'Email',
    telegram: 'Telegram',
    discord: 'Discord',
    supportHours: 'Support Hours',
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'تواصل مع فريقنا',
    sendMessage: 'أرسل لنا رسالة',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    submit: 'إرسال الرسالة',
    contactInfo: 'معلومات الاتصال',
    contactInfoDesc: 'نحن هنا للمساعدة. تواصل معنا من خلال أي من القنوات أدناه.',
    emailLabel: 'البريد الإلكتروني',
    telegram: 'تيليجرام',
    discord: 'ديسكورد',
    supportHours: 'ساعات الدعم',
  },
};

export default function ContactPage() {
  const { locale, t } = useLanguage();
  const tr = translations[locale] || translations.en;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(t('common.success'));
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsLoading(false);
  };

  const contactInfo = [
    { icon: Mail, label: tr.emailLabel, value: 'support@ton-cloud.com' },
    { icon: MessageCircle, label: tr.telegram, value: '@toncloudsupport' },
    { icon: MessageCircle, label: tr.discord, value: 'discord.gg/toncloud' },
    { icon: Clock, label: tr.supportHours, value: '24/7' },
  ];

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{tr.sendMessage}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{tr.name}</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{tr.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">{tr.subject}</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{tr.message}</Label>
                        <Textarea
                          id="message"
                          placeholder="Your message..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        {tr.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    {tr.contactInfo}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {tr.contactInfoDesc}
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.label}
                        className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="p-2 bg-foreground text-background rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{info.label}</p>
                          <p className="text-sm text-muted-foreground">{info.value}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
