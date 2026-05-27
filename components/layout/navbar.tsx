'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Server,
  Menu,
  ChevronDown,
  Globe,
  User,
  LogOut,
  LayoutDashboard,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { supabase } from '@/lib/supabase/client';

const services = [
  { href: 'vps', label: 'nav.vps' },
  { href: 'dedicated', label: 'nav.dedicated' },
  { href: 'shared', label: 'nav.shared' },
  { href: 'domains', label: 'nav.domains' },
  { href: 'game', label: 'nav.gameServers' },
  { href: 'ssl', label: 'nav.ssl' },
];

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'ar' as const, name: 'العربية', flag: '🇮🇶' },
];

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push(`/${locale}`);
  };

  const handleLanguageChange = (newLocale: 'en' | 'ar') => {
    setLocale(newLocale);
    setIsMobileMenuOpen(false);
  };

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path.startsWith('/') ? path : '/' + path}`;
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <Server className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight">Ton Cloud</span>
            </div>
            <div className="w-20 h-8" />
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="relative">
              <Server className="h-8 w-8 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              {t('common.appName')}
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            <a href={`/${locale}`}>
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.home')}
              </Button>
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium">
                  {t('nav.services')}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <a href={getLocalizedPath(service.href)} className="w-full cursor-pointer">
                      {t(service.label)}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href={`/${locale}/pricing`}>
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.pricing')}
              </Button>
            </a>

            <a href={`/${locale}/about`}>
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.about')}
              </Button>
            </a>

            <a href={`/${locale}/contact`}>
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.contact')}
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hidden sm:flex">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{locale === 'ar' ? 'عربي' : 'EN'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={locale === lang.code ? 'bg-accent' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hidden sm:flex">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">{t('nav.dashboard')}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <a href={`/${locale}/dashboard`} className="w-full cursor-pointer flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t('nav.dashboard')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <a href={`/${locale}/auth/login`}>
                  <Button variant="ghost" size="sm">{t('nav.login')}</Button>
                </a>
                <a href={`/${locale}/auth/register`}>
                  <Button size="sm">{t('nav.register')}</Button>
                </a>
              </div>
            )}

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={locale === 'ar' ? 'left' : 'right'} className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  <a href={`/${locale}`} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('nav.home')}</Button>
                  </a>
                  {services.map((service) => (
                    <a key={service.href} href={getLocalizedPath(service.href)} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">{t(service.label)}</Button>
                    </a>
                  ))}
                  <a href={`/${locale}/pricing`} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('nav.pricing')}</Button>
                  </a>
                  <a href={`/${locale}/contact`} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('nav.contact')}</Button>
                  </a>

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'اللغة' : 'Language'}</p>
                    <div className="flex gap-2">
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant={locale === lang.code ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleLanguageChange(lang.code)}
                          className="flex-1"
                        >
                          <span className="mr-1">{lang.flag}</span>
                          {lang.code === 'ar' ? 'عربي' : 'EN'}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {user ? (
                    <>
                      <a href={`/${locale}/dashboard`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          {t('nav.dashboard')}
                        </Button>
                      </a>
                      <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('nav.logout')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <a href={`/${locale}/auth/login`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full">{t('nav.login')}</Button>
                      </a>
                      <a href={`/${locale}/auth/register`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full mt-2">{t('nav.register')}</Button>
                      </a>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
