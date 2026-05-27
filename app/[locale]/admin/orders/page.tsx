'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Check,
  X,
  MoreHorizontal,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

const translations = {
  en: {
    title: 'Orders Management',
    subtitle: 'View and manage all customer orders',
    search: 'Search orders...',
    allStatus: 'All Status',
    pending: 'Pending',
    paid: 'Paid',
    active: 'Active',
    cancelled: 'Cancelled',
    orderId: 'Order ID',
    customer: 'Customer',
    service: 'Service',
    amount: 'Amount',
    status: 'Status',
    date: 'Date',
    actions: 'Actions',
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    noOrders: 'No orders found',
    totalOrders: 'Total Orders',
    pendingOrders: 'Pending',
    todayOrders: 'Today',
  },
  ar: {
    title: 'إدارة الطلبات',
    subtitle: 'عرض وإدارة جميع طلبات العملاء',
    search: 'بحث في الطلبات...',
    allStatus: 'جميع الحالات',
    pending: 'قيد الانتظار',
    paid: 'مدفوع',
    active: 'نشط',
    cancelled: 'ملغي',
    orderId: 'رقم الطلب',
    customer: 'العميل',
    service: 'الخدمة',
    amount: 'المبلغ',
    status: 'الحالة',
    date: 'التاريخ',
    actions: 'الإجراءات',
    view: 'عرض',
    approve: 'موافقة',
    reject: 'رفض',
    noOrders: 'لا توجد طلبات',
    totalOrders: 'إجمالي الطلبات',
    pendingOrders: 'قيد الانتظار',
    todayOrders: 'اليوم',
  },
};

export default function AdminOrdersPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: 'Error',
        description: locale === 'ar' ? 'حدث خطأ في تحميل الطلبات' : 'Failed to load orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: locale === 'ar' ? 'تم تحديث حالة الطلب' : 'Order status updated',
      });

      loadOrders();
    } catch (error) {
      toast({
        title: 'Error',
        description: locale === 'ar' ? 'حدث خطأ' : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      order.id.toString().toLowerCase().includes(searchLower) ||
      (order.plan_name || '').toLowerCase().includes(searchLower) ||
      (order.service_type || '').toLowerCase().includes(searchLower)
    );
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    expired: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };

  const stats = [
    { label: t.totalOrders, value: orders.length, color: 'bg-blue-500' },
    { label: t.pendingOrders, value: orders.filter(o => o.status === 'pending').length, color: 'bg-yellow-500' },
    { label: t.todayOrders, value: orders.filter(o => {
      const today = new Date().toDateString();
      return new Date(o.created_at).toDateString() === today;
    }).length, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground mt-1">{t.subtitle}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                <input
                  type="text"
                  placeholder={t.search}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="px-4 py-2 rounded-lg bg-muted border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t.allStatus}</option>
                  <option value="pending">{t.pending}</option>
                  <option value="paid">{t.paid}</option>
                  <option value="active">{t.active}</option>
                  <option value="cancelled">{t.cancelled}</option>
                </select>
                <Button size="icon" variant="outline" onClick={() => loadOrders()}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.noOrders}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.orderId}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.service}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.amount}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.status}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.date}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm font-medium">#{order.id.toString().slice(0, 8)}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="font-medium">{order.plan_name || order.service_type}</div>
                          <div className="text-xs text-muted-foreground">{order.billing_cycle}</div>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">{order.amount?.toLocaleString()} IQD</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {order.status === 'pending' && (
                              <>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-green-600 hover:text-green-700" onClick={() => updateOrderStatus(order.id, 'paid')}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-red-600 hover:text-red-700" onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost" className="h-8 px-2">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
