'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  ChevronDown,
  Globe,
  User,
  LogOut,
  LayoutDashboard,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { supabase } from '@/lib/supabase/client';

const services = [
  { href: '/vps', label: 'nav.vps' },
  { href: '/dedicated', label: 'nav.dedicated' },
  { href: '/shared', label: 'nav.shared' },
  { href: '/domains', label: 'nav.domains' },
  { href: '/game', label: 'nav.gameServers' },
  { href: '/ssl', label: 'nav.ssl' },
];

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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
    router.push('/');
  };

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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Server className="h-8 w-8 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              {t('common.appName')}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/">
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.home')}
              </Button>
            </Link>

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
                    <Link href={service.href} className="w-full cursor-pointer">
                      {t(service.label)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/pricing">
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.pricing')}
              </Button>
            </Link>

            <Link href="/about">
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.about')}
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="ghost" className="text-sm font-medium">
                {t('nav.contact')}
              </Button>
            </Link>
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
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    onClick={() => router.push('/', { locale: loc })}
                    className={locale === loc ? 'bg-accent' : ''}
                  >
                    {localeNames[loc]}
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
                    <Link href="/dashboard" className="w-full cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t('nav.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">{t('nav.login')}</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">{t('nav.register')}</Button>
                </Link>
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
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('nav.home')}</Button>
                  </Link>
                  {services.map((service) => (
                    <Link key={service.href} href={service.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">{t(service.label)}</Button>
                    </Link>
                  ))}
                  <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('nav.pricing')}</Button>
                  </Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">{t('nav.contact')}</Button>
                  </Link>
                  <div className="border-t pt-4 mt-4 flex gap-2">
                    {locales.map((loc) => (
                      <Button key={loc} variant={locale === loc ? 'default' : 'outline'} size="sm" onClick={() => { router.push('/', { locale: loc }); setIsMobileMenuOpen(false); }}>
                        {localeNames[loc]}
                      </Button>
                    ))}
                  </div>
                  {user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          {t('nav.dashboard')}
                        </Button>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('nav.logout')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full">{t('nav.login')}</Button>
                      </Link>
                      <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full mt-2">{t('nav.register')}</Button>
                      </Link>
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
