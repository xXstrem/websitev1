'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Shield, CreditCard, Database, Ban, Scale, Globe, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const sections = [
  { key: 'service', icon: FileText },
  { key: 'account', icon: CheckCircle },
  { key: 'acceptable', icon: AlertTriangle },
  { key: 'sla', icon: Shield },
  { key: 'payment', icon: CreditCard },
  { key: 'backup', icon: Database },
  { key: 'termination', icon: Ban },
  { key: 'liability', icon: Scale },
  { key: 'law', icon: Globe },
  { key: 'contact', icon: Mail },
];

export default function TermsPage() {
  const { locale } = useLanguage();

  const content = locale === 'ar' ? {
    title: 'شروط الخدمة',
    subtitle: 'ال agreement الكامل لاستخدام خدماتنا',
    lastUpdated: 'آخر تحديث: مايو 2024',
    sections: {
      service: {
        title: '1. اتفاقية الخدمة',
        content: 'باستخدامك والوصول إلى خدمات تون كلاود، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك الوصول إلى خدماتنا أو استخدامها.'
      },
      account: {
        title: '2. تسجيل الحساب',
        content: 'لاستخدام خدماتنا، يجب عليك التسجيل للحصول على حساب. أنت توافق على:',
        items: [
          'تقديم معلومات دقيقة وكاملة أثناء التسجيل',
          'الحفاظ على أمان بيانات اعتماد حسابك',
          'تحديث معلومات حسابك فور الحاجة',
          'قبول المسؤولية عن جميع الأنشطة تحت حسابك'
        ]
      },
      acceptable: {
        title: '3. سياسة الاستخدام المقبول',
        content: 'أنت توافق على عدم استخدام خدماتنا لـ:',
        items: [
          'أي غرض غير قانوني أو غير مصرح به',
          'توزيع البرمجيات الخبيثة أو الفيروسات أو الأكواد الضارة',
          'إرسال البريد العشوائي أو الاتصالات غير المرغوب فيها',
          'استضافة محتوى للبالغين بدون إذن',
          'انتهاك حقوق النشر أو الملكية الفكرية',
          'أنشطة تنتهك القانون العراقي أو الدولي'
        ]
      },
      sla: {
        title: '4. اتفاقية مستوى الخدمة',
        content: 'تسعى تون كلاود لتحقيق وقت تشغيل 99.9% لجميع الخدمات. نحن غير مسؤولين عن وقت التوقف الناتج عن:',
        items: [
          'الصيانة المجدولة (مع إشعار مسبق)',
          'أحداث القوة القاهرة',
          'أعطال شبكة الطرف الثالث',
          'مشاكل يسببها المستخدم'
        ]
      },
      payment: {
        title: '5. شروط الدفع',
        content: 'تتم معالجة جميع المدفوعات يدوياً. يتم تفعيل الخدمات بعد تأكيد الدفع. نحن نقبل:',
        items: [
          'التحويلات البنكية',
          'الإيداعات النقدية',
          'طرق الدفع المحلية'
        ]
      },
      backup: {
        title: '6. النسخ الاحتياطي للبيانات',
        content: 'تقوم تون كلاود بإجراء نسخ احتياطية منتظمة. ومع ذلك، أنت مسؤول عن الحفاظ على نسخك الاحتياطية الخاصة. نحن غير مسؤولين عن فقدان البيانات بسبب:',
        items: [
          'إهمال المستخدم',
          'اختراق الحساب',
          'أحداث القوة القاهرة'
        ]
      },
      termination: {
        title: '7. إنهاء الخدمة',
        content: 'نحتفظ بالحق في تعليق أو إنهاء الخدمات لـ:',
        items: [
          'انتهاك هذه الشروط',
          'عدم الدفع بعد 7 أيام من التأخير',
          'أنشطة غير قانونية',
          'إساءة استخدام الموارد أو العملاء الآخرين'
        ]
      },
      liability: {
        title: '8. تحديد المسؤولية',
        content: 'تون كلاود غير مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو ناتجة عن استخدام خدماتنا. إجمالي مسؤوليتنا لا يتجاوز المبلغ المدفوع مقابل الخدمات في الـ 12 شهراً السابقة للمطالبة.'
      },
      law: {
        title: '9. القانون الحاكم',
        content: 'تخضع هذه الشروط لقوانين جمهورية العراق. يتم حل أي نزاعات في محاكم بغداد، العراق.'
      },
      contact: {
        title: '10. معلومات الاتصال',
        content: 'للأسئلة حول شروط الخدمة هذه، يمكنك الاتصال بنا على:',
        items: [
          'البريد الإلكتروني: legal@ton-cloud.com',
          'الدعم: support@ton-cloud.com'
        ]
      }
    }
  } : {
    title: 'Terms of Service',
    subtitle: 'Complete agreement for using our services',
    lastUpdated: 'Last updated: May 2024',
    sections: {
      service: {
        title: '1. Service Agreement',
        content: 'By accessing and using Ton Cloud services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use our services.'
      },
      account: {
        title: '2. Account Registration',
        content: 'To use our services, you must register for an account. You agree to:',
        items: [
          'Provide accurate and complete information during registration',
          'Maintain the security of your account credentials',
          'Promptly update your account information as needed',
          'Accept responsibility for all activities under your account'
        ]
      },
      acceptable: {
        title: '3. Acceptable Use Policy',
        content: 'You agree NOT to use our services for:',
        items: [
          'Any illegal or unauthorized purpose',
          'Distributing malware, viruses, or harmful code',
          'Sending spam or unsolicited communications',
          'Hosting adult content without permission',
          'Copyright infringement or intellectual property violations',
          'Activities that violate Iraqi or international law'
        ]
      },
      sla: {
        title: '4. Service Level Agreement',
        content: 'Ton Cloud strives for 99.9% uptime for all services. We are not liable for downtime caused by:',
        items: [
          'Scheduled maintenance (with prior notice)',
          'Force majeure events',
          'Third-party network failures',
          'User-caused issues'
        ]
      },
      payment: {
        title: '5. Payment Terms',
        content: 'All payments are processed manually. Services are activated after payment confirmation. We accept:',
        items: [
          'Bank transfers',
          'Cash deposits',
          'Local payment methods'
        ]
      },
      backup: {
        title: '6. Data Backup',
        content: 'Ton Cloud performs regular backups. However, you are responsible for maintaining your own backups. We are not liable for data loss due to:',
        items: [
          'User negligence',
          'Account compromise',
          'Force majeure events'
        ]
      },
      termination: {
        title: '7. Service Termination',
        content: 'We reserve the right to suspend or terminate services for:',
        items: [
          'Violation of these terms',
          'Non-payment after 7 days overdue',
          'Illegal activities',
          'Abuse of resources or other customers'
        ]
      },
      liability: {
        title: '8. Limitation of Liability',
        content: 'Ton Cloud is not liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for services in the 12 months preceding the claim.'
      },
      law: {
        title: '9. Governing Law',
        content: 'These terms are governed by the laws of the Republic of Iraq. Any disputes shall be resolved in the courts of Baghdad, Iraq.'
      },
      contact: {
        title: '10. Contact Information',
        content: 'For questions about these Terms of Service, please contact us at:',
        items: [
          'Email: legal@ton-cloud.com',
          'Support: support@ton-cloud.com'
        ]
      }
    }
  };

  const sectionData = content.sections;

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
                <FileText className="h-4 w-4" />
                {content.subtitle}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {content.title}
              </h1>
              <p className="text-muted-foreground">{content.lastUpdated}</p>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 border-y bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {sections.map((section, i) => {
                  const Icon = section.icon;
                  const data = sectionData[section.key as keyof typeof sectionData];
                  return (
                    <a
                      key={section.key}
                      href={`#section-${i + 1}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="truncate">{data.title.split('. ')[1]}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, i) => {
                const Icon = section.icon;
                const data = sectionData[section.key as keyof typeof sectionData];
                return (
                  <motion.div
                    key={section.key}
                    id={`section-${i + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className={i === 0 ? 'border-2 border-primary/20' : ''}>
                      <CardContent className="p-6 lg:p-8">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${i === 0 ? 'bg-primary/10' : 'bg-muted'}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-3">{data.title}</h3>
                            <p className="text-muted-foreground mb-4">{data.content}</p>
                            {'items' in data && data.items && (
                              <ul className="space-y-2">
                                {data.items.map((item: string, j: number) => (
                                  <li key={j} className="flex items-start gap-3 text-muted-foreground">
                                    <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
