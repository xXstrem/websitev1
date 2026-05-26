import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import WhyChooseSection from '@/components/home/why-choose-section';
import StatsSection from '@/components/home/stats-section';
import CTASection from '@/components/home/cta-section';
import { locales, type Locale } from '@/i18n/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <HeroSection />
        <ServicesSection />
        <WhyChooseSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
