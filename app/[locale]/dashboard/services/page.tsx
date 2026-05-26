'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Plus, MoreHorizontal, Power, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const services = [
  { id: 1, name: 'VPS Starter', type: 'VPS', status: 'active', ip: '192.168.1.100', expiry: '2024-02-15' },
  { id: 2, name: 'Game Server Pro', type: 'Game', status: 'active', ip: '192.168.1.101', expiry: '2024-03-20' },
  { id: 3, name: 'Shared Hosting', type: 'Shared', status: 'active', ip: '-', expiry: '2024-01-10' },
];

export default function ServicesPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('services.title')}</h1>
          <p className="text-muted-foreground">Manage your active services</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Order New Service
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <Server className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          {service.status}
                        </span>
                        <span>{service.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1">
                    <div className="text-sm">
                      <span className="text-muted-foreground">IP: </span>
                      <span className="font-mono">{service.ip}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires: {service.expiry}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Power className="h-3 w-3" />
                      Control
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
                          Reboot
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Manage Backups</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
