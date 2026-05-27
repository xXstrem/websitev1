'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function RefundPage() {
  const { locale } = useLanguage();

  const content = locale === 'ar' ? {
    title: 'سياسة الاسترداد',
    subtitle: 'ضمان استرداد المال خلال 7 أيام',
    lastUpdated: 'آخر تحديث: مايو 2024',
    guarantee: {
      title: 'ضمان استرداد المال خلال 7 أيام',
      description: 'نقدم ضمان استرداد المال خلال 7 أيام لمعظم الخدمات للعملاء الجدد. هذا يتيح لك اختبار خدماتنا دون مخاطرة.'
    },
    eligible: {
      title: 'الخدمات المؤهلة',
      items: [
        'استضافة VPS (أول طلب)',
        'الاستضافة المشتركة (أول طلب)',
        'الخوادم المخصصة (أول طلب، نسبة من المبلغ)',
        'خوادم الألعاب (أول طلب)'
      ]
    },
    nonEligible: {
      title: 'الخدمات غير المؤهلة',
      items: [
        'تسجيل النطاقات (بمجرد المعالجة، لا يمكن إلغاؤها)',
        'شهادات SSL (بمجرد الإصدار)',
        'تجديد الخدمات الحالية',
        'الخدمات الإضافية',
        'الإعدادات المخصصة',
        'الخدمات المنتهية لانتهاك السياسات'
      ]
    },
    process: {
      title: 'عملية طلب الاسترداد',
      items: [
        'افتح تذكرة دعم خلال 7 أيام من تفعيل الخدمة',
        'اختر "طلب استرداد" كنوع التذكرة',
        'قدم رقم طلبك وسبب الاسترداد',
        'سيراجع فريقنا طلبك خلال 48 ساعة'
      ]
    },
    timeline: 'الجدول الزمني للاسترداد',
    timelineDesc: 'بمجرد الموافقة، تتم معالجة الاسترداد خلال 14 يوم عمل. سيتم إرجاع المبلغ إلى طريقة الدفع الأصلية أو كرصيد في الحساب (اختيارك).',
    partial: {
      title: 'الاسترداد الجزئي',
      desc: 'للخوادم المخصصة والالتزامات طويلة الأمد:',
      items: [
        'يتم حساب الاسترداد على أساس نسبي',
        'رسوم الإعداد غير قابلة للاسترداد',
        'يتم خصم النطاق الترددي والموارد المستخدمة'
      ]
    },
    credits: 'أرصدة الخدمة',
    creditsDesc: 'للانقطاعات الطفيفة التي لا تفي بحدود SLA، قد تحصل على أرصدة خدمة بدلاً من استرداد مالي:',
    creditItems: [
      'حتى 10% رصيد للانقطاع بين 30-60 دقيقة',
      'حتى 25% رصيد للانقطاع بين 1-4 ساعات',
      'حتى 50% رصيد للانقطاع أكثر من 4 ساعات'
    ],
    contact: 'اتصل بنا',
    contactItems: ['الدعم: support@ton-cloud.com', 'الفواتير: billing@ton-cloud.com', 'عبر نظام تذاكر الدعم في لوحة التحكم']
  } : {
    title: 'Refund Policy',
    subtitle: '7-Day Money-Back Guarantee',
    lastUpdated: 'Last updated: May 2024',
    guarantee: {
      title: '7-Day Money-Back Guarantee',
      description: 'Ton Cloud offers a 7-day money-back guarantee on most services for first-time customers. This allows you to test our services risk-free.'
    },
    eligible: {
      title: 'Eligible Services',
      items: [
        'VPS Hosting (first purchase)',
        'Shared Hosting (first purchase)',
        'Dedicated Servers (first purchase, pro-rated)',
        'Game Servers (first purchase)'
      ]
    },
    nonEligible: {
      title: 'Non-Eligible Services',
      items: [
        'Domain registrations (once processed, cannot be reversed)',
        'SSL Certificates (once issued)',
        'Renewals of existing services',
        'Add-on services',
        'Custom configurations',
        'Services terminated for policy violations'
      ]
    },
    process: {
      title: 'Refund Request Process',
      items: [
        'Open a support ticket within 7 days of service activation',
        'Select "Refund Request" as the ticket type',
        'Provide your order number and reason for the refund',
        'Our team will review your request within 48 hours'
      ]
    },
    timeline: 'Refund Timeline',
    timelineDesc: 'Once approved, refunds are processed within 14 business days. The refund will be credited to your original payment method or as account credit (your choice).',
    partial: {
      title: 'Partial Refunds',
      desc: 'For dedicated servers and long-term commitments:',
      items: [
        'Refunds are calculated on a pro-rated basis',
        'Setup fees are non-refundable',
        'Used bandwidth and resources are deducted'
      ]
    },
    credits: 'Service Credits',
    creditsDesc: 'For minor service disruptions that do not meet SLA thresholds, you may receive service credits instead of monetary refunds:',
    creditItems: [
      'Up to 10% credit for downtime between 30-60 minutes',
      'Up to 25% credit for downtime between 1-4 hours',
      'Up to 50% credit for downtime exceeding 4 hours'
    ],
    contact: 'Contact Us',
    contactItems: ['Support: support@ton-cloud.com', 'Billing: billing@ton-cloud.com', 'Via your dashboard support ticket system']
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium mb-6">
                <Clock className="h-4 w-4" />
                {content.subtitle}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {content.title}
              </h1>
              <p className="text-muted-foreground">{content.lastUpdated}</p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

              {/* Guarantee Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{content.guarantee.title}</h2>
                        <p className="text-muted-foreground">{content.guarantee.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Two Columns */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Eligible */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <h3 className="text-xl font-semibold">{content.eligible.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {content.eligible.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Non-Eligible */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <XCircle className="h-6 w-6 text-red-500" />
                        <h3 className="text-xl font-semibold">{content.nonEligible.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {content.nonEligible.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Process */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardContent className="p-6 lg:p-8">
                    <h3 className="text-2xl font-bold mb-6">{content.process.title}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {content.process.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-muted-foreground text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Timeline */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="bg-muted/30">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-background">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{content.timeline}</h3>
                        <p className="text-muted-foreground">{content.timelineDesc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Partial & Credits */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{content.partial.title}</h3>
                      <p className="text-muted-foreground mb-4">{content.partial.desc}</p>
                      <ul className="space-y-2">
                        {content.partial.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                  <Card className="h-full bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{content.credits}</h3>
                      <p className="text-muted-foreground mb-4">{content.creditsDesc}</p>
                      <ul className="space-y-2">
                        {content.creditItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Contact */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Card>
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="h-6 w-6" />
                      <h3 className="text-xl font-semibold">{content.contact}</h3>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {content.contactItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
