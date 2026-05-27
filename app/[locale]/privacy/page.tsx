'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Database, Share2, Clock, CheckCircle, Cookie, ExternalLink, AlertCircle, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const sections = [
  { key: 'collect', icon: User },
  { key: 'usage', icon: Database },
  { key: 'security', icon: Lock },
  { key: 'sharing', icon: Share2 },
  { key: 'retention', icon: Clock },
  { key: 'rights', icon: CheckCircle },
  { key: 'cookies', icon: Cookie },
  { key: 'third', icon: ExternalLink },
  { key: 'children', icon: AlertCircle },
  { key: 'contact', icon: Mail },
];

export default function PrivacyPage() {
  const { locale } = useLanguage();

  const content = locale === 'ar' ? {
    title: 'سياسة الخصوصية',
    subtitle: 'حماية بياناتك أولويتنا',
    lastUpdated: 'آخر تحديث: مايو 2024',
    sections: {
      collect: {
        title: '1. المعلومات التي نجمعها',
        content: 'نجمع المعلومات التي تقدمها مباشرة:',
        items: [
          'معلومات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف، العنوان',
          'معلومات الدفع: سجلات المعاملات (وليس تفاصيل البطاقة)',
          'البيانات التقنية: عنوان IP، معلومات الجهاز، نوع المتصفح',
          'بيانات الخدمة: إحصائيات الاستخدام، إعدادات الخادم'
        ]
      },
      usage: {
        title: '2. كيف نستخدم معلوماتك',
        content: 'نستخدم معلوماتك لـ:',
        items: [
          'تقديم وصيانة خدماتنا',
          'معالجة المدفوعات والطلبات',
          'التواصل بشأن حسابك وخدماتك',
          'تحسين خدماتنا وتطوير ميزات جديدة',
          'ضمان الأمان ومنع الاحتيال',
          'الامتثال للالتزامات القانونية'
        ]
      },
      security: {
        title: '3. أمان البيانات والتخزين',
        content: 'يتم تخزين بياناتك في مراكز بيانات آمنة مع تشفير قياسي في الصناعة. نحن ننفذ:',
        items: [
          'تشفير SSL/TLS 256-bit لنقل البيانات',
          'تخزين مشفر للمعلومات الحساسة',
          'عمليات تدقيق أمني منتظمة',
          'ضوابط وصول ومراقبة'
        ]
      },
      sharing: {
        title: '4. مشاركة البيانات',
        content: 'نحن لا نبيع معلوماتك الشخصية. قد نشارك البيانات مع:',
        items: [
          'مقدمي الخدمات (معالجات الدفع، خدمات البريد الإلكتروني)',
          'السلطات القانونية عند الطلب بموجب القانون',
          'شركاء الأعمال بموافقتك'
        ]
      },
      retention: {
        title: '5. الاحتفاظ بالبيانات',
        content: 'نحتفظ ببياناتك طالما حسابك نشط. بعد إغلاق الحساب:',
        items: [
          'يتم حذف بيانات الحساب خلال 30 يوماً',
          'سجلات الدفع محفوظة لمدة 7 سنوات (متطلب قانوني)',
          'تطهير بيانات النسخ الاحتياطي خلال 90 يوماً'
        ]
      },
      rights: {
        title: '6. حقوقك',
        content: 'لديك الحق في:',
        items: [
          'الوصول إلى بياناتك الشخصية',
          'تصحيح المعلومات غير الدقيقة',
          'طلب حذف بياناتك',
          'تصدير بياناتك بتنسيق محمول',
          'إلغاء الاشتراك في الاتصالات التسويقية'
        ]
      },
      cookies: {
        title: '7. ملفات تعريف الارتباط',
        content: 'نستخدم ملفات تعريف الارتباط للوظائف الأساسية والتحليلات وتحسين تجربة المستخدم. يمكنك إدارة تفضيلات ملفات تعريف الارتباط في إعدادات متصفحك.'
      },
      third: {
        title: '8. روابط الطرف الثالث',
        content: 'قد يحتوي موقعنا على روابط لمواقع خارجية. نحن غير مسؤولين عن ممارسات الخصوصية الخاصة بهم.'
      },
      children: {
        title: '9. خصوصية الأطفال',
        content: 'خدماتنا غير مخصصة للمستخدمين تحت 18 عاماً. نحن لا نجمع عن قصد معلومات من القصر.'
      },
      contact: {
        title: '10. اتصل بنا',
        content: 'للاستفسارات المتعلقة بالخصوصية أو لممارسة حقوقك، اتصل بـ:',
        items: [
          'البريد الإلكتروني: privacy@ton-cloud.com',
          'العنوان: بغداد، جمهورية العراق'
        ]
      }
    }
  } : {
    title: 'Privacy Policy',
    subtitle: 'Protecting your data is our priority',
    lastUpdated: 'Last updated: May 2024',
    sections: {
      collect: {
        title: '1. Information We Collect',
        content: 'We collect information you provide directly:',
        items: [
          'Account Information: Name, email, phone number, address',
          'Payment Information: Transaction records (not card details)',
          'Technical Data: IP address, device information, browser type',
          'Service Data: Usage statistics, server configurations'
        ]
      },
      usage: {
        title: '2. How We Use Your Information',
        content: 'We use your information to:',
        items: [
          'Provide and maintain our services',
          'Process payments and orders',
          'Communicate about your account and services',
          'Improve our services and develop new features',
          'Ensure security and prevent fraud',
          'Comply with legal obligations'
        ]
      },
      security: {
        title: '3. Data Storage and Security',
        content: 'Your data is stored in secure data centers with industry-standard encryption. We implement:',
        items: [
          '256-bit SSL/TLS encryption for data transmission',
          'Encrypted storage for sensitive information',
          'Regular security audits and updates',
          'Access controls and monitoring'
        ]
      },
      sharing: {
        title: '4. Data Sharing',
        content: 'We do NOT sell your personal information. We may share data with:',
        items: [
          'Service providers (payment processors, email services)',
          'Legal authorities when required by law',
          'Business partners with your consent'
        ]
      },
      retention: {
        title: '5. Data Retention',
        content: 'We retain your data for as long as your account is active. After account closure:',
        items: [
          'Account data is deleted within 30 days',
          'Payment records kept for 7 years (legal requirement)',
          'Backup data purged within 90 days'
        ]
      },
      rights: {
        title: '6. Your Rights',
        content: 'You have the right to:',
        items: [
          'Access your personal data',
          'Correct inaccurate information',
          'Request deletion of your data',
          'Export your data in a portable format',
          'Opt-out of marketing communications'
        ]
      },
      cookies: {
        title: '7. Cookies',
        content: 'We use cookies for essential functionality, analytics, and improving user experience. You can manage cookie preferences in your browser settings.'
      },
      third: {
        title: '8. Third-Party Links',
        content: 'Our website may contain links to third-party sites. We are not responsible for their privacy practices.'
      },
      children: {
        title: "9. Children's Privacy",
        content: 'Our services are not intended for users under 18. We do not knowingly collect information from minors.'
      },
      contact: {
        title: '10. Contact Us',
        content: 'For privacy-related inquiries or to exercise your rights, contact:',
        items: [
          'Email: privacy@ton-cloud.com',
          'Address: Baghdad, Republic of Iraq'
        ]
      }
    }
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
                <Shield className="h-4 w-4" />
                {content.subtitle}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {content.title}
              </h1>
              <p className="text-muted-foreground">{content.lastUpdated}</p>
            </motion.div>
          </div>
        </section>

        {/* Security Highlights */}
        <section className="py-8 border-y bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <Lock className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">{locale === 'ar' ? 'تشفير 256-bit' : '256-bit Encryption'}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">{locale === 'ar' ? 'حماية GDPR' : 'GDPR Compliant'}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Database className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">{locale === 'ar' ? 'نسخ احتياطي يومي' : 'Daily Backups'}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <User className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">{locale === 'ar' ? 'تحكم كامل' : 'Full Control'}</span>
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
                const data = content.sections[section.key as keyof typeof content.sections];
                return (
                  <motion.div
                    key={section.key}
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

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="p-4 rounded-full bg-primary text-background">
                        <Mail className="h-8 w-8" />
                      </div>
                      <div className="text-center md:text-start flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {locale === 'ar' ? 'لديك أسئلة؟' : 'Questions?'}
                        </h3>
                        <p className="text-muted-foreground">
                          {locale === 'ar'
                            ? 'فريق الخصوصية لدينا جاهز لمساعدتك'
                            : 'Our privacy team is ready to help you'}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <a href="mailto:privacy@ton-cloud.com" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                          <Mail className="h-4 w-4" />
                          privacy@ton-cloud.com
                        </a>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {locale === 'ar' ? 'بغداد، العراق' : 'Baghdad, Iraq'}
                        </div>
                      </div>
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
