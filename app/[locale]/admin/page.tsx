'use client';

import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  ShoppingBag,
  DollarSign,
  Ticket,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const stats = [
  { key: 'totalUsers', icon: Users, value: '1,234', change: '+12%', positive: true },
  { key: 'totalOrders', icon: ShoppingBag, value: '567', change: '+8%', positive: true },
  { key: 'totalRevenue', icon: DollarSign, value: '$45,678', change: '+23%', positive: true },
  { key: 'openTickets', icon: Ticket, value: '12', change: '-5%', positive: true },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', service: 'VPS Basic', amount: '$9.99', status: 'pending' },
  { id: 'ORD-002', customer: 'Jane Smith', service: 'Dedicated Pro', amount: '$149.99', status: 'paid' },
  { id: 'ORD-003', customer: 'Bob Wilson', service: 'Shared Starter', amount: '$2.99', status: 'delivered' },
  { id: 'ORD-004', customer: 'Alice Brown', service: 'VPS Enterprise', amount: '$49.99', status: 'processing' },
];

const translations = {
  en: {
    dashboardTitle: 'Admin Dashboard',
    dashboardSubtitle: 'Welcome to your admin dashboard',
    totalUsers: 'Total Users',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    openTickets: 'Open Tickets',
    fromLastMonth: 'from last month',
    recentOrders: 'Recent Orders',
    orderId: 'Order ID',
    customer: 'Customer',
    service: 'Service',
    amount: 'Amount',
    status: 'Status',
  },
  ar: {
    dashboardTitle: 'لوحة تحكم المدير',
    dashboardSubtitle: 'مرحباً بك في لوحة تحكم المدير',
    totalUsers: 'إجمالي المستخدمين',
    totalOrders: 'إجمالي الطلبات',
    totalRevenue: 'إجمالي الإيرادات',
    openTickets: 'التذاكر المفتوحة',
    fromLastMonth: 'من الشهر الماضي',
    recentOrders: 'الطلبات الأخيرة',
    orderId: 'رقم الطلب',
    customer: 'العميل',
    service: 'الخدمة',
    amount: 'المبلغ',
    status: 'الحالة',
  },
};

export default function AdminDashboard() {
  const { locale } = useLanguage();
  const tr = translations[locale] || translations.en;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold">{tr.dashboardTitle}</h1>
        <p className="text-muted-foreground mt-1">
          {tr.dashboardSubtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const statLabel = tr[stat.key as keyof typeof tr] || stat.key;
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {statLabel}
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`flex items-center text-xs ${stat.positive ? 'text-green-600' : 'text-destructive'}`}>
                    {stat.positive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stat.change} {tr.fromLastMonth}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{tr.recentOrders}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{tr.orderId}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{tr.customer}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{tr.service}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{tr.amount}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{tr.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.customer}</td>
                      <td className="py-3 px-4 text-sm">{order.service}</td>
                      <td className="py-3 px-4 text-sm font-medium">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          order.status === 'paid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
