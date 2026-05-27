'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Loader2, Download, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string;
  paid_at: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  paid: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

const translations = {
  en: {
    title: 'Invoices',
    viewInvoices: 'View and download your invoices',
    noInvoices: 'No invoices yet',
    noInvoicesDesc: "You don't have any invoices yet.",
    invoice: 'Invoice',
    amount: 'Amount',
    status: 'Status',
    dueDate: 'Due Date',
    created: 'Created',
    actions: 'Actions',
  },
  ar: {
    title: 'الفواتير',
    viewInvoices: 'عرض وتحميل فواتيرك',
    noInvoices: 'لا توجد فواتير',
    noInvoicesDesc: 'ليس لديك أي فواتير بعد.',
    invoice: 'فاتورة',
    amount: 'المبلغ',
    status: 'الحالة',
    dueDate: 'تاريخ الاستحقاق',
    created: 'تاريخ الإنشاء',
    actions: 'الإجراءات',
  },
};

export default function InvoicesPage() {
  const { locale, t } = useLanguage();
  const tr = translations[locale] || translations.en;
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setInvoices(data);
      }
      setLoading(false);
    };

    fetchInvoices();
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
      <div>
        <h1 className="text-2xl font-bold">{t('dashboard.invoices.title')}</h1>
        <p className="text-muted-foreground">{tr.viewInvoices}</p>
      </div>

      {invoices.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">{t('dashboard.invoices.empty')}</h3>
            <p className="text-muted-foreground">{tr.noInvoicesDesc}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm hidden sm:grid">
            <div className="col-span-2">{tr.invoice}</div>
            <div className="col-span-2">{tr.amount}</div>
            <div className="col-span-2">{tr.status}</div>
            <div className="col-span-2">{tr.dueDate}</div>
            <div className="col-span-2">{tr.created}</div>
            <div className="col-span-2 text-end">{tr.actions}</div>
          </div>
          <div className="divide-y">
            {invoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-0 rounded-none shadow-none">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-12 gap-4 items-center text-sm">
                      <div className="col-span-2 flex items-center gap-2 font-mono">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {invoice.invoice_number}
                      </div>
                      <div className="col-span-2 font-semibold">
                        {invoice.amount?.toLocaleString() || 0} {invoice.currency || 'IQD'}
                      </div>
                      <div className="col-span-2">
                        <Badge className={statusColors[invoice.status] || ''} variant="secondary">
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        {invoice.due_date ? format(new Date(invoice.due_date), 'MMM d, yyyy') : '-'}
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        {invoice.created_at ? format(new Date(invoice.created_at), 'MMM d, yyyy') : '-'}
                      </div>
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
      )}
    </div>
  );
}
