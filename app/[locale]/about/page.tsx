'use client';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import CTASection from '@/components/home/cta-section';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, Users, Award, Zap, Globe } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Integrity', description: 'We maintain the highest ethical standards in all our dealings.' },
  { icon: Zap, title: 'Innovation', description: 'Continuously improving our services with the latest technology.' },
  { icon: Award, title: 'Excellence', description: 'Striving for perfection in every aspect of our service.' },
  { icon: Heart, title: 'Transparency', description: 'Clear communication and honest pricing with no hidden fees.' },
];

const stats = [
  { value: '50+', labelKey: 'teamMembers' },
  { value: '10K+', labelKey: 'happyCustomers' },
  { value: '99.9%', labelKey: 'uptimeGuarantee' },
  { value: '24/7', labelKey: 'supportAvailable' },
];

const milestones = [
  { year: '2018', titleKey: 'companyFounded', descriptionKey: 'companyFoundedDesc' },
  { year: '2019', titleKey: 'firstDataCenter', descriptionKey: 'firstDataCenterDesc' },
  { year: '2021', titleKey: 'tenThousandCustomers', descriptionKey: 'tenThousandCustomersDesc' },
  { year: '2023', titleKey: 'globalExpansion', descriptionKey: 'globalExpansionDesc' },
  { year: '2024', titleKey: 'premiumServices', descriptionKey: 'premiumServicesDesc' },
];

const translations = {
  en: {
    title: 'About Us',
    subtitle: 'Learn more about our company and mission',
    storyTitle: 'Our Story',
    storyP1: 'Founded in 2018, Ton Cloud emerged from a simple vision: to provide businesses in the Middle East and beyond with enterprise-grade cloud infrastructure at competitive prices.',
    storyP2: 'We recognized that many hosting providers charged premium prices while offering subpar service. We set out to change that paradigm by building a company focused on reliability, performance, and customer satisfaction.',
    storyP3: 'Today, we serve thousands of businesses worldwide, from startups to enterprise organizations, all benefiting from our robust infrastructure and dedicated support team.',
    missionTitle: 'Our Mission & Vision',
    missionTitleText: 'Our Mission',
    missionDesc: 'To empower businesses of all sizes with reliable, high-performance cloud solutions that enable growth and innovation. We believe every business deserves access to enterprise-grade infrastructure without the enterprise price tag.',
    visionTitleText: 'Our Vision',
    visionDesc: 'To become the leading cloud infrastructure provider in the Middle East, known for exceptional service, innovative solutions, and unwavering commitment to our customers success.',
    valuesTitle: 'Our Values',
    journeyTitle: 'Our Journey',
    journeySubtitle: 'Key milestones in our growth story',
    teamMembers: 'Team Members',
    happyCustomers: 'Happy Customers',
    uptimeGuarantee: 'Uptime Guarantee',
    supportAvailable: 'Support Available',
    companyFounded: 'Company Founded',
    companyFoundedDesc: 'Started with a vision to provide premium cloud infrastructure.',
    firstDataCenter: 'First Data Center',
    firstDataCenterDesc: 'Launched our first data center in the Middle East region.',
    tenThousandCustomers: '10,000 Customers',
    tenThousandCustomersDesc: 'Reached our milestone of serving 10,000 customers.',
    globalExpansion: 'Global Expansion',
    globalExpansionDesc: 'Expanded to multiple data centers worldwide.',
    premiumServices: 'Premium Services',
    premiumServicesDesc: 'Introduced enterprise-grade solutions for all businesses.',
  },
  ar: {
    title: 'من نحن',
    subtitle: 'تعرف على شركتنا ومهمتنا',
    storyTitle: 'قصتنا',
    storyP1: 'تأسست Ton Cloud في عام 2018 من رؤية بسيطة: توفير بنية تحتية سحابية على مستوى المؤسسات بأسعار تنافسية للشركات في الشرق الأوسط وخارجه.',
    storyP2: 'أدركنا أن العديد من مزودي الاستضافة يفرضون أسعاراً متميزة بينما يقدمون خدمة متواضعة. سعينا إلى تغيير هذا النموذج من خلال بناء شركة تركز على الموثوقية والأداء ورضا العملاء.',
    storyP3: 'اليوم، نخدم آلاف الشركات حول العالم، من الشركات الناشئة إلى المؤسسات الكبيرة، وكلها تستفيد من بنيتنا التحتية القوية وفريق الدعم المخصص.',
    missionTitle: 'مهمتنا ورؤيتنا',
    missionTitleText: 'مهمتنا',
    missionDesc: 'تمكين الشركات من جميع الأحجام من حلول سحابية موثوقة وعالية الأداء تمكن النمو والابتكار. نؤمن بأن كل شركة تستحق الوصول إلى بنية تحتية على مستوى المؤسسات بدون سعر المؤسسات.',
    visionTitleText: 'رؤيتنا',
    visionDesc: 'أن نصبح مزود البنية التحتية السحابية الرائد في الشرق الأوسط، معروفين بخدمة استثنائية وحلول مبتكرة والتزام لا يتزعزع بنجاح عملائنا.',
    valuesTitle: 'قيمنا',
    journeyTitle: 'رحلتنا',
    journeySubtitle: 'محطات رئيسية في قصة نمونا',
    teamMembers: 'أعضاء الفريق',
    happyCustomers: 'عملاء سعداء',
    uptimeGuarantee: 'ضمان التشغيل',
    supportAvailable: 'دعم متاح',
    companyFounded: 'تأسيس الشركة',
    companyFoundedDesc: 'بدأت برؤية لتوفير بنية تحتية سحابية متميزة.',
    firstDataCenter: 'أول مركز بيانات',
    firstDataCenterDesc: 'أطلقنا أول مركز بيانات لنا في منطقة الشرق الأوسط.',
    tenThousandCustomers: '10,000 عميل',
    tenThousandCustomersDesc: 'وصلنا إلى معلم خدمة 10,000 عميل.',
    globalExpansion: 'التوسع العالمي',
    globalExpansionDesc: 'توسعنا إلى مراكز بيانات متعددة حول العالم.',
    premiumServices: 'خدمات متميزة',
    premiumServicesDesc: 'قدمنا حلول على مستوى المؤسسات لجميع الشركات.',
  },
};

export default function AboutPage() {
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
              <p className="text-lg text-muted-foreground">
                {tr.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">{tr.storyTitle}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{tr.storyP1}</p>
                  <p>{tr.storyP2}</p>
                  <p>{tr.storyP3}</p>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {stats.map((stat) => (
                  <div key={stat.labelKey} className="p-6 bg-muted/30 rounded-xl text-center">
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{tr[stat.labelKey as keyof typeof tr]}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                {tr.missionTitle}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 p-6 bg-background rounded-xl">
                  <div className="p-3 rounded-lg bg-foreground text-background shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{tr.missionTitleText}</h3>
                    <p className="text-muted-foreground text-sm">
                      {tr.missionDesc}
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 p-6 bg-background rounded-xl">
                  <div className="p-3 rounded-lg bg-foreground text-background shrink-0">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{tr.visionTitleText}</h3>
                    <p className="text-muted-foreground text-sm">
                      {tr.visionDesc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                {tr.valuesTitle}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className="text-center p-6 border rounded-xl hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-foreground text-background mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                {tr.journeyTitle}
              </h2>
              <p className="text-muted-foreground">
                {tr.journeySubtitle}
              </p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="relative pl-12 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{milestone.year}</div>
                    <h3 className="font-semibold">{tr[milestone.titleKey as keyof typeof tr]}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tr[milestone.descriptionKey as keyof typeof tr]}</p>
                  </div>
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
