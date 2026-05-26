'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function RefundPage() {
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
                {t('legal.refund')}
              </h1>
              <p className="text-muted-foreground">Last updated: January 2024</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
              <h2>7-Day Money-Back Guarantee</h2>
              <p>
                Ton Cloud offers a 7-day money-back guarantee on most services for first-time customers.
                This allows you to test our services risk-free.
              </p>

              <h2>Eligible Services</h2>
              <p>The following services are eligible for the money-back guarantee:</p>
              <ul>
                <li>VPS Hosting (first purchase)</li>
                <li>Shared Hosting (first purchase)</li>
                <li>Dedicated Servers (first purchase, pro-rated)</li>
                <li>Game Servers (first purchase)</li>
              </ul>

              <h2>Non-Eligible Services</h2>
              <p>The following are NOT eligible for refunds:</p>
              <ul>
                <li>Domain registrations (once processed, cannot be reversed)</li>
                <li>SSL Certificates (once issued)</li>
                <li>Renewals of existing services</li>
                <li>Add-on services</li>
                <li>Custom configurations</li>
                <li>Services terminated for policy violations</li>
              </ul>

              <h2>Refund Request Process</h2>
              <p>To request a refund:</p>
              <ol>
                <li>Open a support ticket within 7 days of service activation</li>
                <li>Select "Refund Request" as the ticket type</li>
                <li>Provide your order number and reason for the refund</li>
                <li>Our team will review your request within 48 hours</li>
              </ol>

              <h2>Refund Timeline</h2>
              <p>
                Once approved, refunds are processed within 14 business days. The refund will be
                credited to your original payment method or as account credit (your choice).
              </p>

              <h2>Partial Refunds</h2>
              <p>
                For dedicated servers and long-term commitments:
              </p>
              <ul>
                <li>Refunds are calculated on a pro-rated basis</li>
                <li>Setup fees are non-refundable</li>
                <li>Used bandwidth and resources are deducted</li>
              </ul>

              <h2>No-Show Refunds</h2>
              <p>
                Refund requests made after the 7-day guarantee period will be reviewed on a
                case-by-case basis but are not guaranteed.
              </p>

              <h2>Service Credits</h2>
              <p>
                For minor service disruptions that do not meet SLA thresholds, you may receive
                service credits instead of monetary refunds:
              </p>
              <ul>
                <li>Up to 10% credit for downtime between 30-60 minutes</li>
                <li>Up to 25% credit for downtime between 1-4 hours</li>
                <li>Up to 50% credit for downtime exceeding 4 hours</li>
              </ul>

              <h2>Disputes</h2>
              <p>
                If you are unsatisfied with our refund decision, you may escalate your case to
                our management team for review.
              </p>

              <h2>Contact Us</h2>
              <p>
                For refund inquiries, please contact:
              </p>
              <ul>
                <li>Support: support@toncloud.com</li>
                <li>Billing: billing@toncloud.com</li>
                <li>Via your dashboard support ticket system</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
