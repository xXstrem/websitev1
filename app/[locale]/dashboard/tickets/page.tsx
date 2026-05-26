'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, Plus, MessageCircle } from 'lucide-react';

const tickets = [
  { id: 'TKT-001', subject: 'VPS not responding', status: 'open', priority: 'high', date: '2024-01-18', replies: 3 },
  { id: 'TKT-002', subject: 'Billing question', status: 'closed', priority: 'low', date: '2024-01-15', replies: 2 },
  { id: 'TKT-003', subject: 'SSL installation help', status: 'open', priority: 'medium', date: '2024-01-12', replies: 1 },
];

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  closed: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

export default function TicketsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('tickets.title')}</h1>
          <p className="text-muted-foreground">Manage your support tickets</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <Ticket className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        <Badge className={statusColors[ticket.status]} variant="secondary">
                          {ticket.status}
                        </Badge>
                        <Badge className={priorityColors[ticket.priority]} variant="secondary">
                          {ticket.priority}
                        </Badge>
                      </div>
                      <h3 className="font-semibold">{ticket.subject}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{ticket.replies} replies</span>
                    </div>
                    <div>{ticket.date}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
