'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';

const orders = [
  { id: 'ORD-001', service: 'VPS Starter', amount: 7500, status: 'completed', date: '2024-01-15' },
  { id: 'ORD-002', service: 'Game Server Pro', amount: 18000, status: 'pending', date: '2024-01-18' },
  { id: 'ORD-003', service: 'Domain .com', amount: 15000, status: 'completed', date: '2024-01-10' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('orders.title')}</h1>
        <p className="text-muted-foreground">View your order history</p>
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm hidden sm:grid">
          <div className="col-span-3">{t('orders.orderNumber')}</div>
          <div className="col-span-3">{t('orders.service')}</div>
          <div className="col-span-2">{t('orders.amount')}</div>
          <div className="col-span-2">{t('orders.status')}</div>
          <div className="col-span-2">{t('orders.date')}</div>
        </div>
        <div className="divide-y">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 rounded-none shadow-none">
                <CardContent className="p-4">
                  <div className="grid grid-cols-12 gap-4 items-center text-sm">
                    <div className="col-span-3 font-mono">{order.id}</div>
                    <div className="col-span-3 flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      {order.service}
                    </div>
                    <div className="col-span-2">{order.amount.toLocaleString()} IQD</div>
                    <div className="col-span-2">
                      <Badge className={statusColors[order.status]} variant="secondary">
                        {order.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{order.date}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
