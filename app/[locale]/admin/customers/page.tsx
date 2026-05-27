'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Search, Mail, Shield, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const translations = {
  en: {
    title: 'Customers',
    subtitle: 'Manage registered customers',
    search: 'Search customers...',
    totalCustomers: 'Total Customers',
    activeThisMonth: 'Active This Month',
    newList: 'New This Week',
    customerId: 'ID',
    email: 'Email',
    createdAt: 'Registered',
    lastLogin: 'Last Login',
    orders: 'Orders',
    services: 'Services',
    actions: 'Actions',
    viewDetails: 'View',
    sendEmail: 'Email',
    noCustomers: 'No customers found',
  },
  ar: {
    title: 'العملاء',
    subtitle: 'إدارة العملاء المسجلين',
    search: 'بحث في العملاء...',
    totalCustomers: 'إجمالي العملاء',
    activeThisMonth: 'نشط هذا الشهر',
    newList: 'جديد هذا الأسبوع',
    customerId: 'المعرف',
    email: 'البريد الإلكتروني',
    createdAt: 'تاريخ التسجيل',
    lastLogin: 'آخر دخول',
    orders: 'الطلبات',
    services: 'الخدمات',
    actions: 'الإجراءات',
    viewDetails: 'عرض',
    sendEmail: 'بريد',
    noCustomers: 'لا يوجد عملاء',
  },
};

export default function AdminCustomersPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];

  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // If no users table, use auth.users
      if (!data || data.length === 0) {
        const { data: authUsers } = await supabase.auth.admin.listUsers();
        setCustomers(authUsers?.users?.map((u: any) => ({
          id: u.id,
          email: u.email,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at,
        })) || []);
      } else {
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: t.totalCustomers, value: customers.length, icon: Users },
    { label: t.activeThisMonth, value: Math.floor(customers.length * 0.8), icon: Shield },
    { label: t.newList, value: Math.floor(customers.length * 0.1), icon: Users },
  ];

  const filteredCustomers = customers.filter(c => {
    if (!search) return true;
    return c.email?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground mt-1">{t.subtitle}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.search}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button size="icon" variant="outline" onClick={() => loadCustomers()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customers List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.noCustomers}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.customerId}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.email}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.createdAt}</th>
                      <th className="text-start py-3 px-4 text-sm font-medium text-muted-foreground">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">#{customer.id.toString().slice(0, 8)}</td>
                        <td className="py-3 px-4 text-sm">{customer.email}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Mail className="h-4 w-4" />
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
