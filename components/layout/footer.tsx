'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Server, Twitter, Github, MessageCircle } from 'lucide-react';

const footerLinks = {
  services: [
    { href: '/vps', label: 'nav.vps' },
    { href: '/dedicated', label: 'nav.dedicated' },
    { href: '/shared', label: 'nav.shared' },
    { href: '/domains', label: 'nav.domains' },
  ],
  company: [
    { href: '/about', label: 'nav.about' },
    { href: '/contact', label: 'nav.contact' },
  ],
  support: [
    { href: '/faq', label: 'nav.faq' },
    { href: '/contact', label: 'nav.contact' },
  ],
  legal: [
    { href: '/terms', label: 'legal.terms' },
    { href: '/privacy', label: 'legal.privacy' },
    { href: '/refund', label: 'legal.refund' },
  ],
};

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path.startsWith('/') ? path : '/' + path}`;
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <a href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <Server className="h-8 w-8" />
              <span className="text-xl font-bold">{t('common.appName')}</span>
            </a>
            <p className="text-muted-foreground max-w-md mb-6">{t('footer.description')}</p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <a href={getLocalizedPath(link.href)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a href={getLocalizedPath(link.href)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a href={getLocalizedPath(link.href)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright').replace('2024', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}
