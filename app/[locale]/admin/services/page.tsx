'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Server,
  Search,
  Filter,
  RefreshCw,
  Play,
  Pause,
  Trash2,
  Eye,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

const translations = {
  en: {
    title: 'Services Management',
    subtitle: 'View and manage all active services',
    search: 'Search services...',
    allTypes: 'All Types',
    allStatus: 'All Status',
    active: 'Active',
    suspended: 'Suspended',
    expired: 'Expired',
    cancelled: 'Cancelled',
    serviceId: 'Service ID',
    customer: 'Customer',
    type: 'Type',
    serverName: 'Server Name',
    ip: 'IP Address',
    status: 'Status',
    expires: 'Expires',
    actions: 'Actions',
    suspend: 'Suspend',
    activate: 'Activate',
    terminate: 'Terminate',
    noServices: 'No services found',
    totalServices: 'Total Services',
    activeServices: 'Active',
    suspendedServices: 'Suspended',
    vps: 'VPS',
    dedicated: 'Dedicated',
    shared: 'Shared',
    game: 'Game Server',
    ssl: 'SSL',
    domain: 'Domain',
  },
  ar: {
    title: 'إدارة الخدمات',
    subtitle: 'عرض وإدارة جميع الخدمات النشطة',
    search: 'بحث في الخدمات...',
    allTypes: 'جميع الأنواع',
    allStatus: 'جميع الحالات',
    active: 'نشط',
    suspended: 'معلق',
    expired: 'منتهي',
    cancelled: 'ملغي',
    serviceId: 'رقم الخدمة',
    customer: 'العميل',
    type: 'النوع',
    serverName: 'اسم الخادم',
    ip: 'عنوان IP',
    status: 'الحالة',
    expires: 'تاريخ الانتهاء',
    actions: 'الإجراءات',
    suspend: 'تعليق',
    activate: 'تفعيل',
    terminate: 'إنهاء',
    noServices: 'لا توجد خدمات',
    totalServices: 'إجمالي الخدمات',
    activeServices: 'نشطة',
    suspendedServices: 'معلقة',
    vps: 'VPS',
    dedicated: 'خادم مخصص',
    shared: 'استضافة مشتركة',
    game: 'خادم ألعاب',
    ssl: 'SSL',
    domain: 'نطاق',
  },
};

export default function AdminServicesPage() {
  const params = useParams();
  const { toast } = useToast();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadServices();
  }, [typeFilter, statusFilter]);

  const loadServices = async () => {
    setLoading(true);
    try {
      let query = supabase.from('services').select('*').order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (typeFilter !== 'all') {
        query = query.eq('service_type', typeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateServiceStatus = async (serviceId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ status: newStatus })
        .eq('id', serviceId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: locale === 'ar' ? 'تم تحديث حالة الخدمة' : 'Service status updated',
      });

      loadServices();
    } catch (error) {
      toast({
        title: 'Error',
        description: locale === 'ar' ? 'حدث خطأ' : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const filteredServices = services.filter(service => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      service.id.toString().toLowerCase().includes(searchLower) ||
      (service.server_name || '').toLowerCase().includes(searchLower) ||
      (service.ip_address || '').toLowerCase().includes(searchLower)
    );
  });

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    expired: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const serviceIcons: Record<string, any> = {
    vps: Server,
    dedicated: Server,
    shared: Server,
    game: Server,
    ssl: Server,
    domain: Server,
  };

  const stats = [
    { label: t.totalServices, value: services.length, color: 'bg-blue-500' },
    { label: t.activeServices, value: services.filter(s => s.status === 'active').length, color: 'bg-green-500' },
    { label: t.suspendedServices, value: services.filter(s => s.status === 'suspended').length, color: 'bg-yellow-500' },
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
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Server className="h-6 w-6 text-white" />
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
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
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 rounded-lg bg-muted border text-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">{t.allTypes}</option>
                  <option value="vps">{t.vps}</option>
                  <option value="dedicated">{t.dedicated}</option>
                  <option value="shared">{t.shared}</option>
                  <option value="game">{t.game}</option>
                  <option value="ssl">{t.ssl}</option>
                  <option value="domain">{t.domain}</option>
                </select>
                <select
                  className="px-4 py-2 rounded-lg bg-muted border text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t.allStatus}</option>
                  <option value="active">{t.active}</option>
                  <option value="suspended">{t.suspended}</option>
                  <option value="expired">{t.expired}</option>
                </select>
                <Button size="icon" variant="outline" onClick={() => loadServices()}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Services Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t.noServices}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((service) => {
                  const Icon = serviceIcons[service.service_type] || Server;
                  return (
                    <div key={service.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${service.status === 'active' ? 'bg-green-100 dark:bg-green-900' : 'bg-muted'}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{service.server_name || service.service_type}</div>
                            <div className="text-xs text-muted-foreground">#{service.id.toString().slice(0, 8)}</div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${statusColors[service.status]}`}>
                          {t[service.status as keyof typeof t] || service.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.type}</span>
                          <span className="font-medium">{t[service.service_type as keyof typeof t] || service.service_type}</span>
                        </div>
                        {service.ip_address && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t.ip}</span>
                            <span className="font-mono text-xs">{service.ip_address}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t.expires}</span>
                          <span>{service.expires_at ? new Date(service.expires_at).toLocaleDateString() : '-'}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        {service.status === 'active' ? (
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => updateServiceStatus(service.id, 'suspended')}>
                            <Pause className="h-4 w-4 mr-1" />
                            {t.suspend}
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => updateServiceStatus(service.id, 'active')}>
                            <Play className="h-4 w-4 mr-1" />
                            {t.activate}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
