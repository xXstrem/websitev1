'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    category: 'General',
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept bank transfers, cash deposits, and various local payment methods. Payment is processed manually after order submission.' },
      { q: 'How long does it take to set up my server?', a: 'VPS and shared hosting are typically set up within minutes after payment confirmation. Dedicated servers may take 24-48 hours.' },
      { q: 'Do you offer refunds?', a: 'Yes, we offer a 7-day money-back guarantee on most services. Please check our refund policy for details.' },
    ],
  },
  {
    category: 'VPS Hosting',
    questions: [
      { q: 'What is VPS hosting?', a: 'VPS (Virtual Private Server) hosting gives you dedicated resources on a shared physical server, providing more control and better performance than shared hosting.' },
      { q: 'Do I get root access?', a: 'Yes, all our VPS plans include full root access, allowing you complete control over your server configuration.' },
      { q: 'Can I upgrade my VPS plan?', a: 'Yes, you can upgrade your VPS plan at any time. Resources are added instantly with no downtime.' },
    ],
  },
  {
    category: 'Dedicated Servers',
    questions: [
      { q: 'What is a dedicated server?', a: 'A dedicated server is a physical server exclusively for your use, offering maximum performance, security, and control.' },
      { q: 'Do you provide server management?', a: 'All servers come with basic management. We also offer premium managed services for an additional fee.' },
      { q: 'What is IPMI?', a: 'IPMI (Intelligent Platform Management Interface) allows you to remotely manage your server, including reboot and console access.' },
    ],
  },
  {
    category: 'Domains & SSL',
    questions: [
      { q: 'How do I register a domain?', a: 'Use our domain search tool to find your perfect domain, add it to cart, and complete your order. We will handle the registration process.' },
      { q: 'Do you offer WHOIS privacy?', a: 'Yes, WHOIS privacy protection is available for an additional fee to keep your personal information private.' },
      { q: 'How long does SSL issuance take?', a: 'Domain validation SSLs are issued within minutes. Organization and Extended validation may take 1-7 days depending on verification.' },
    ],
  },
  {
    category: 'Support',
    questions: [
      { q: 'How do I contact support?', a: 'You can open a support ticket through your dashboard, or contact us via Telegram, Discord, or email.' },
      { q: 'What are your support hours?', a: 'Our support team is available 24/7 for critical issues. General inquiries are handled during business hours.' },
      { q: 'Do you offer migration assistance?', a: 'Yes, we offer free migration assistance for new customers transferring from other providers.' },
    ],
  },
];

export default function FAQPage() {
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
                {t('faq.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('faq.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {faqs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
