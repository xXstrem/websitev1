'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
                {t('legal.terms')}
              </h1>
              <p className="text-muted-foreground">Last updated: January 2024</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
              <h2>1. Service Agreement</h2>
              <p>
                By accessing and using Ton Cloud services, you agree to be bound by these Terms of Service.
                If you do not agree with any part of these terms, you may not access or use our services.
              </p>

              <h2>2. Account Registration</h2>
              <p>
                To use our services, you must register for an account. You agree to:
              </p>
              <ul>
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update your account information as needed</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h2>3. Acceptable Use Policy</h2>
              <p>You agree NOT to use our services for:</p>
              <ul>
                <li>Any illegal or unauthorized purpose</li>
                <li>Distributing malware, viruses, or harmful code</li>
                <li>Sending spam or unsolicited communications</li>
                <li>Hosting adult content without permission</li>
                <li>Copyright infringement or intellectual property violations</li>
                <li>Activities that violate Iraqi or international law</li>
              </ul>

              <h2>4. Service Level Agreement</h2>
              <p>
                Ton Cloud strives for 99.9% uptime for all services. We are not liable for downtime caused by:
              </p>
              <ul>
                <li>Scheduled maintenance (with prior notice)</li>
                <li>Force majeure events</li>
                <li>Third-party network failures</li>
                <li>User-caused issues</li>
              </ul>

              <h2>5. Payment Terms</h2>
              <p>
                All payments are processed manually. Services are activated after payment confirmation.
                We accept:
              </p>
              <ul>
                <li>Bank transfers</li>
                <li>Cash deposits</li>
                <li>Local payment methods</li>
              </ul>

              <h2>6. Refund Policy</h2>
              <p>
                We offer a 7-day money-back guarantee for first-time purchases. Refunds are processed
                within 14 business days. See our Refund Policy for complete details.
              </p>

              <h2>7. Data Backup</h2>
              <p>
                Ton Cloud performs regular backups. However, you are responsible for maintaining
                your own backups. We are not liable for data loss due to:
              </p>
              <ul>
                <li>User negligence</li>
                <li>Account compromise</li>
                <li>Force majeure events</li>
              </ul>

              <h2>8. Service Termination</h2>
              <p>
                We reserve the right to suspend or terminate services for:
              </p>
              <ul>
                <li>Violation of these terms</li>
                <li>Non-payment after 7 days overdue</li>
                <li>Illegal activities</li>
                <li>Abuse of resources or other customers</li>
              </ul>

              <h2>9. Limitation of Liability</h2>
              <p>
                Ton Cloud is not liable for any indirect, incidental, special, or consequential damages
                arising from the use of our services. Our total liability shall not exceed the amount
                paid for services in the 12 months preceding the claim.
              </p>

              <h2>10. Governing Law</h2>
              <p>
                These terms are governed by the laws of Iraq. Any disputes shall be resolved
                in the courts of Baghdad, Iraq.
              </p>

              <h2>11. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <ul>
                <li>Email: legal@toncloud.com</li>
                <li>Support: support@toncloud.com</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
