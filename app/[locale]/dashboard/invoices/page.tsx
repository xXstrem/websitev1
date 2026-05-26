'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

const invoices = [
  { id: 'INV-001', amount: 7500, status: 'paid', date: '2024-01-15', dueDate: '2024-01-20' },
  { id: 'INV-002', amount: 33000, status: 'pending', date: '2024-01-18', dueDate: '2024-01-25' },
  { id: 'INV-003', amount: 15000, status: 'paid', date: '2024-01-10', dueDate: '2024-01-15' },
];

const statusColors: Record<string, string> = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  overdue: 'bg-red-100 text-red-700',
};

export default function InvoicesPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('invoices.title')}</h1>
        <p className="text-muted-foreground">View and download your invoices</p>
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm hidden sm:grid">
          <div className="col-span-2">Invoice</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Due Date</div>
          <div className="col-span-2 text-end">Actions</div>
        </div>
        <div className="divide-y">
          {invoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 rounded-none shadow-none">
                <CardContent className="p-4">
                  <div className="grid grid-cols-12 gap-4 items-center text-sm">
                    <div className="col-span-2 flex items-center gap-2 font-mono">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {invoice.id}
                    </div>
                    <div className="col-span-2 font-medium">{invoice.amount.toLocaleString()} IQD</div>
                    <div className="col-span-2">
                      <Badge className={statusColors[invoice.status]} variant="secondary">
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{invoice.date}</div>
                    <div className="col-span-2 text-muted-foreground">{invoice.dueDate}</div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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
