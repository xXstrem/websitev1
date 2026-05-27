'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';

const translations = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2024',
  },
  ar: {
    title: 'سياسة الخصوصية',
    lastUpdated: 'آخر تحديث: يناير 2024',
  },
};

export default function PrivacyPage() {
  const { locale } = useLanguage();
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
              <p className="text-muted-foreground">{tr.lastUpdated}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly:</p>
              <ul>
                <li><strong>Account Information:</strong> Name, email, phone number, billing address</li>
                <li><strong>Payment Information:</strong> Transaction records (not card details)</li>
                <li><strong>Technical Data:</strong> IP address, device information, browser type</li>
                <li><strong>Service Data:</strong> Usage statistics, server configurations</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Process payments and orders</li>
                <li>Communicate about your account and services</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Data Storage and Security</h2>
              <p>
                Your data is stored in secure data centers with industry-standard encryption.
                We implement:
              </p>
              <ul>
                <li>256-bit SSL/TLS encryption for data transmission</li>
                <li>Encrypted storage for sensitive information</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
              </ul>

              <h2>4. Data Sharing</h2>
              <p>We do NOT sell your personal information. We may share data with:</p>
              <ul>
                <li>Service providers (payment processors, email services)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>

              <h2>5. Data Retention</h2>
              <p>
                We retain your data for as long as your account is active. After account closure:
              </p>
              <ul>
                <li>Account data is deleted within 30 days</li>
                <li>Payment records kept for 7 years (legal requirement)</li>
                <li>Backup data purged within 90 days</li>
              </ul>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                We use cookies for essential functionality, analytics, and improving user experience.
                You can manage cookie preferences in your browser settings.
              </p>

              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for
                their privacy practices.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not intended for users under 18. We do not knowingly collect
                information from minors.
              </p>

              <h2>10. Policy Changes</h2>
              <p>
                We may update this policy periodically. Significant changes will be communicated
                via email or service notification.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                For privacy-related inquiries or to exercise your rights, contact:
              </p>
              <ul>
                <li>Email: privacy@toncloud.com</li>
                <li>Address: Baghdad, Iraq</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
