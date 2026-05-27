'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ShoppingBag,
  Ticket,
  Server,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Globe,
  Moon,
  Sun,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const navItems = [
  { icon: LayoutDashboard, label: 'dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'orders', href: '/admin/orders' },
  { icon: Server, label: 'services', href: '/admin/services' },
  { icon: Ticket, label: 'tickets', href: '/admin/tickets' },
  { icon: Users, label: 'customers', href: '/admin/customers' },
  { icon: Settings, label: 'settings', href: '/admin/settings' },
];

const translations = {
  en: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    services: 'Services',
    tickets: 'Support Tickets',
    customers: 'Customers',
    settings: 'Settings',
    logout: 'Logout',
    searchPlaceholder: 'Search...',
    adminPanel: 'Admin Panel',
    tonCloud: 'Ton Cloud',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    orders: 'الطلبات',
    services: 'الخدمات',
    tickets: 'تذاكر الدعم',
    customers: 'العملاء',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    searchPlaceholder: 'بحث...',
    adminPanel: 'لوحة الإدارة',
    tonCloud: 'تون كلاود',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if admin is logged in
    const adminUser = sessionStorage.getItem('adminUser') || localStorage.getItem('adminUser');
    if (!adminUser && !pathname.includes('/admin/page') && pathname !== `/${locale}/admin` && pathname !== `/${locale}/admin/`) {
      router.push(`/${locale}/admin`);
    }
  }, [pathname, locale, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    localStorage.removeItem('adminUser');
    router.push(`/${locale}/admin`);
  };

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path.startsWith('/') ? path : '/' + path}`;
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  if (!mounted) return null;

  // Don't show sidebar on login page
  if (pathname === `/${locale}/admin` || pathname === `/${locale}/admin/`) {
    return children;
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 z-50 w-64 bg-background border-e transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <a href={`/${locale}/admin/dashboard`} className="flex items-center gap-2 text-xl font-bold">
              <div className="p-1.5 rounded-lg bg-foreground text-background">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm leading-tight">{t.tonCloud}</span>
                <span className="block text-xs text-muted-foreground">{t.adminPanel}</span>
              </div>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const href = getLocalizedPath(item.href);
              const isActive = pathname === href || (item.href !== '/admin/dashboard' && pathname?.includes(item.href));
              return (
                <a
                  key={item.href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-foreground text-background font-medium'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t[item.label as keyof typeof t]}</span>
                </a>
              );
            })}
          </nav>

          <div className="p-4 border-t space-y-2">
            <Button variant="outline" className="w-full justify-start gap-3" onClick={toggleLanguage}>
              <Globe className="h-4 w-4" />
              <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>{t.logout}</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ms-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1 mx-4 max-w-md hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
