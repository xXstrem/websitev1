'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  ShoppingBag,
  DollarSign,
  Ticket,
  TrendingUp,
  TrendingDown,
  Server,
  Activity,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const translations = {
  en: {
    welcomeBack: 'Welcome back, Admin',
    dashboardSubtitle: 'Here\'s what\'s happening with your platform today',
    totalUsers: 'Total Customers',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    activeServices: 'Active Services',
    openTickets: 'Open Tickets',
    uptimePercentage: 'Uptime',
    fromLastMonth: 'from last month',
    recentOrders: 'Recent Orders',
    orderId: 'Order ID',
    customer: 'Customer',
    service: 'Service',
    amount: 'Amount',
    status: 'Status',
    recentTickets: 'Recent Tickets',
    ticketId: 'Ticket ID',
    subject: 'Subject',
    priority: 'Priority',
    department: 'Department',
    date: 'Date',
    quickStats: 'Quick Stats',
    runningServers: 'Running Servers',
    monthlyRevenue: 'Monthly Revenue',
    newCustomers: 'New Customers',
    responseTime: 'Avg. Response Time',
  },
  ar: {
    welcomeBack: 'مرحباً بعودتك، المدير',
    dashboardSubtitle: 'إليك ما يحدث في منصتك اليوم',
    totalUsers: 'إجمالي العملاء',
    totalOrders: 'إجمالي الطلبات',
    totalRevenue: 'إجمالي الإيرادات',
    activeServices: 'الخدمات النشطة',
    openTickets: 'التذاكر المفتوحة',
    uptimePercentage: 'وقت التشغيل',
    fromLastMonth: 'من الشهر الماضي',
    recentOrders: 'الطلبات الأخيرة',
    orderId: 'رقم الطلب',
    customer: 'العميل',
    service: 'الخدمة',
    amount: 'المبلغ',
    status: 'الحالة',
    recentTickets: 'التذاكر الأخيرة',
    ticketId: 'رقم التذكرة',
    subject: 'الموضوع',
    priority: 'الأولوية',
    department: 'القسم',
    date: 'التاريخ',
    quickStats: 'إحصائيات سريعة',
    runningServers: 'الخوادم العاملة',
    monthlyRevenue: 'الإيرادات الشهرية',
    newCustomers: 'العملاء الجدد',
    responseTime: 'متوسط وقت الاستجابة',
  },
};

export default function AdminDashboardPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeServices: 0,
    openTickets: 0,
    uptimePercentage: 99.9,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load site stats
      const { data: siteStats } = await supabase.from('site_stats').select('*');

      if (siteStats) {
        const statsMap: Record<string, number> = {};
        siteStats.forEach((stat: any) => {
          statsMap[stat.stat_name] = parseFloat(stat.value);
        });

        setStats({
          totalCustomers: statsMap['total_customers'] || 0,
          totalOrders: statsMap['active_servers'] || 0,
          totalRevenue: 50000,
          activeServices: statsMap['active_servers'] || 0,
          openTickets: 12,
          uptimePercentage: statsMap['uptime_percentage'] || 99.9,
        });
      }

      // Load recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders) {
        setRecentOrders(orders);
      }

      // Load recent tickets
      const { data: tickets } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (tickets) {
        setRecentTickets(tickets);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: t.totalUsers, value: stats.totalCustomers.toLocaleString(), icon: Users, change: '+12%', positive: true },
    { label: t.totalOrders, value: stats.totalOrders.toLocaleString(), icon: ShoppingBag, change: '+8%', positive: true },
    { label: t.totalRevenue, value: `${stats.totalRevenue.toLocaleString()} IQD`, icon: DollarSign, change: '+23%', positive: true },
    { label: t.activeServices, value: stats.activeServices.toLocaleString(), icon: Server, change: '+5%', positive: true },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    open: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  const priorityColors: Record<string, string> = {
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.welcomeBack}</h1>
        <p className="text-muted-foreground mt-1">{t.dashboardSubtitle}</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`flex items-center text-xs mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stat.change} {t.fromLastMonth}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-foreground text-background">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <Activity className="h-6 w-6 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{stats.uptimePercentage}%</div>
                <div className="text-xs opacity-70">{t.uptimePercentage}</div>
              </div>
              <div>
                <Server className="h-6 w-6 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{stats.activeServices}</div>
                <div className="text-xs opacity-70">{t.runningServers}</div>
              </div>
              <div>
                <DollarSign className="h-6 w-6 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">45K IQD</div>
                <div className="text-xs opacity-70">{t.monthlyRevenue}</div>
              </div>
              <div>
                <Ticket className="h-6 w-6 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">&lt;5m</div>
                <div className="text-xs opacity-70">{t.responseTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders & Tickets */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.recentOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {locale === 'ar' ? 'لا توجد طلبات بعد' : 'No orders yet'}
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex-1">
                        <div className="font-medium text-sm">#{order.id.toString().slice(0, 8)}</div>
                        <div className="text-xs text-muted-foreground">{order.plan_name || order.service_type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{order.amount?.toLocaleString()} IQD</div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${statusColors[order.status] || statusColors.pending}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.recentTickets}</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTickets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {locale === 'ar' ? 'لا توجد تذاكر بعد' : 'No tickets yet'}
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{ticket.subject}</div>
                        <div className="text-xs text-muted-foreground">{ticket.department}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${priorityColors[ticket.priority] || priorityColors.medium}`}>
                          {ticket.priority}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${statusColors[ticket.status] || statusColors.open}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
