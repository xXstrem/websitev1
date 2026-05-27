'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Server,
  ShoppingBag,
  Ticket,
  FileText,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface DashboardStats {
  activeServices: number;
  pendingOrders: number;
  openTickets: number;
  totalInvoices: number;
}

export default function DashboardPage() {
  const t = useTranslations();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    activeServices: 0,
    pendingOrders: 0,
    openTickets: 0,
    totalInvoices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      setUser(session.user);

      // Get user profile
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      setProfile(profileData);

      // Get stats
      const [servicesRes, ordersRes, ticketsRes, invoicesRes] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact' }).eq('user_id', session.user.id).eq('status', 'active'),
        supabase.from('orders').select('id', { count: 'exact' }).eq('user_id', session.user.id).eq('status', 'pending'),
        supabase.from('support_tickets').select('id', { count: 'exact' }).eq('user_id', session.user.id).in('status', ['open', 'pending']),
        supabase.from('invoices').select('id', { count: 'exact' }).eq('user_id', session.user.id),
      ]);

      setStats({
        activeServices: servicesRes.count || 0,
        pendingOrders: ordersRes.count || 0,
        openTickets: ticketsRes.count || 0,
        totalInvoices: invoicesRes.count || 0,
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  const statsItems = [
    { key: 'activeServices', icon: Server, value: stats.activeServices },
    { key: 'pendingOrders', icon: ShoppingBag, value: stats.pendingOrders },
    { key: 'openTickets', icon: Ticket, value: stats.openTickets },
    { key: 'totalInvoices', icon: FileText, value: stats.totalInvoices },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const username = profile?.first_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {t('dashboard.welcome')}, {username}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.overview.title')}
          </p>
        </div>
        <Avatar className="h-12 w-12 hidden sm:flex">
          <AvatarFallback className="bg-foreground text-background">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsItems.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t(`dashboard.overview.${stat.key}`)}
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-foreground text-background">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.overview.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a href="/dashboard/orders" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-sm font-medium">Order New Service</span>
              </a>
              <a href="/dashboard/tickets" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <Ticket className="h-6 w-6" />
                <span className="text-sm font-medium">Open Ticket</span>
              </a>
              <a href="/dashboard/invoices" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <FileText className="h-6 w-6" />
                <span className="text-sm font-medium">View Invoices</span>
              </a>
              <a href="/dashboard/services" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <Server className="h-6 w-6" />
                <span className="text-sm font-medium">My Services</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
