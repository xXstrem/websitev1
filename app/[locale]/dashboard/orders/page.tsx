'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Loader2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';

interface Order {
  id: string;
  order_number: string;
  status: string;
  amount: number;
  currency: string;
  created_at: string;
  notes: string | null;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  paid: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export default function OrdersPage() {
  const t = useTranslations();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('dashboard.orders.title')}</h1>
          <p className="text-muted-foreground">View your order history</p>
        </div>
        <a href="/pricing">
          <Button className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            New Order
          </Button>
        </a>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">{t('dashboard.orders.empty')}</h3>
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <a href="/pricing">
              <Button>Browse Services</Button>
            </a>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm hidden sm:grid">
            <div className="col-span-3">{t('dashboard.orders.orderNumber')}</div>
            <div className="col-span-2">{t('dashboard.orders.amount')}</div>
            <div className="col-span-2">{t('dashboard.orders.status')}</div>
            <div className="col-span-3">{t('dashboard.orders.date')}</div>
            <div className="col-span-2 text-end">Actions</div>
          </div>
          <div className="divide-y">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-0 rounded-none shadow-none">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-12 gap-4 items-center text-sm">
                      <div className="col-span-3 font-mono font-medium">{order.order_number}</div>
                      <div className="col-span-2 font-semibold">
                        {order.amount?.toLocaleString() || 0} {order.currency || 'IQD'}
                      </div>
                      <div className="col-span-2">
                        <Badge className={statusColors[order.status] || ''} variant="secondary">
                          {order.status}
                        </Badge>
                      </div>
                      <div className="col-span-3 text-muted-foreground">
                        {order.created_at ? format(new Date(order.created_at), 'MMM d, yyyy') : '-'}
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
