'use client';

import { useLanguage } from '@/i18n/context';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Server,
  ShoppingBag,
  FileText,
  Ticket,
  Settings,
  User,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { icon: LayoutDashboard, label: 'overview', href: '/dashboard' },
  { icon: Server, label: 'services', href: '/dashboard/services' },
  { icon: ShoppingBag, label: 'orders', href: '/dashboard/orders' },
  { icon: FileText, label: 'invoices', href: '/dashboard/invoices' },
  { icon: Ticket, label: 'tickets', href: '/dashboard/tickets' },
  { icon: Settings, label: 'settings', href: '/dashboard/settings' },
];

const translations: Record<string, Record<string, any>> = {
  en: {
    overview: { title: 'Overview' },
    services: { title: 'My Services' },
    orders: { title: 'Orders' },
    invoices: { title: 'Invoices' },
    tickets: { title: 'Support' },
    settings: { title: 'Settings' },
    myAccount: 'My Account',
    logout: 'Logout',
  },
  ar: {
    overview: { title: 'نظرة عامة' },
    services: { title: 'خدماتي' },
    orders: { title: 'الطلبات' },
    invoices: { title: 'الفواتير' },
    tickets: { title: 'الدعم' },
    settings: { title: 'الإعدادات' },
    myAccount: 'حسابي',
    logout: 'تسجيل الخروج',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations] || translations.en;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}/auth/login`);
  };

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path.startsWith('/') ? path : '/' + path}`;
  };

  return (
    <div className="min-h-screen flex">
      <aside
        className={`fixed inset-y-0 start-0 z-50 w-64 bg-background border-e transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <a href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold">
              <span className="bg-foreground text-background px-2 py-1 rounded">Ton</span>
              <span>Cloud</span>
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
              const isActive = pathname === getLocalizedPath(item.href) ||
                (item.href !== '/dashboard' && pathname?.includes(item.href));
              return (
                <a
                  key={item.href}
                  href={getLocalizedPath(item.href)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-foreground text-background'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t[item.label]?.title || item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start gap-3" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span>{t.logout}</span>
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ms-64">
        <header className="sticky top-0 z-40 bg-background border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1 lg:hidden" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-foreground text-background">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href={getLocalizedPath('/dashboard/settings')} className="cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t.settings.title}</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
