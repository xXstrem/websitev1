'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Server, Loader2, Power, RefreshCw, MoreHorizontal } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Service {
  id: string;
  name: string;
  status: string;
  ip_address: string | null;
  expires_at: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  suspended: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  pending: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

const translations = {
  en: {
    title: 'My Services',
    manageServices: 'Manage your active services',
    addService: 'Add Service',
    noServices: 'No active services',
    noServicesDesc: "You don't have any active services yet.",
    browseServices: 'Browse Services',
    control: 'Control',
    reboot: 'Reboot',
    viewDetails: 'View Details',
    manageBackups: 'Manage Backups',
    expires: 'Expires',
  },
  ar: {
    title: 'خدماتي',
    manageServices: 'إدارة خدماتك النشطة',
    addService: 'إضافة خدمة',
    noServices: 'لا توجد خدمات نشطة',
    noServicesDesc: 'ليس لديك أي خدمات نشطة بعد.',
    browseServices: 'تصفح الخدمات',
    control: 'تحكم',
    reboot: 'إعادة تشغيل',
    viewDetails: 'عرض التفاصيل',
    manageBackups: 'إدارة النسخ الاحتياطية',
    expires: 'تنتهي',
  },
};

export default function ServicesPage() {
  const { locale, t } = useLanguage();
  const tr = translations[locale] || translations.en;
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
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
          <h1 className="text-2xl font-bold">{t('dashboard.services.title')}</h1>
          <p className="text-muted-foreground">{tr.manageServices}</p>
        </div>
        <a href={`/${locale}/pricing`}>
          <Button className="gap-2">
            <Server className="h-4 w-4" />
            {tr.addService}
          </Button>
        </a>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">{t('dashboard.services.empty')}</h3>
            <p className="text-muted-foreground mb-4">{tr.noServicesDesc}</p>
            <a href={`/${locale}/pricing`}>
              <Button>{tr.browseServices}</Button>
            </a>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-muted">
                        <Server className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Badge className={statusColors[service.status] || ''} variant="secondary">
                            {service.status}
                          </Badge>
                          {service.ip_address && (
                            <span className="font-mono">{service.ip_address}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 text-sm">
                      <div className="text-muted-foreground">
                        {tr.expires}: {service.expires_at ? format(new Date(service.expires_at), 'MMM d, yyyy') : '-'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Power className="h-3 w-3" />
                        {tr.control}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {tr.reboot}
                          </DropdownMenuItem>
                          <DropdownMenuItem>{tr.viewDetails}</DropdownMenuItem>
                          <DropdownMenuItem>{tr.manageBackups}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
