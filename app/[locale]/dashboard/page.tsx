'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Server,
  ShoppingBag,
  Ticket,
  FileText,
} from 'lucide-react';

const stats = [
  { key: 'activeServices', icon: Server },
  { key: 'pendingOrders', icon: ShoppingBag },
  { key: 'openTickets', icon: Ticket },
  { key: 'totalInvoices', icon: FileText },
];

export default function DashboardPage() {
  const t = useTranslations();
  const username = 'User';

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
        {stats.map((stat, index) => {
          const Icon = stat.icon;
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
                    {t(`dashboard.overview.${stat.key}`)}
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-foreground text-background">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">0</div>
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
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-sm font-medium">Order New Service</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Ticket className="h-6 w-6" />
                <span className="text-sm font-medium">Open Ticket</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <FileText className="h-6 w-6" />
                <span className="text-sm font-medium">View Invoices</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Server className="h-6 w-6" />
                <span className="text-sm font-medium">My Services</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
