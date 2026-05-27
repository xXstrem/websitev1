'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Save, Globe, Server, Shield, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const translations = {
  en: {
    title: 'Admin Settings',
    subtitle: 'Configure admin panel settings',
    generalSettings: 'General Settings',
    siteName: 'Site Name',
    supportEmail: 'Support Email',
    timezone: 'Timezone',
    saveChanges: 'Save Changes',
    saved: 'Settings saved successfully',
    securitySettings: 'Security Settings',
    twoFactor: 'Enable Two-Factor Auth',
    sessionTimeout: 'Session Timeout (minutes)',
    notificationSettings: 'Notifications',
    emailNotifications: 'Email Notifications',
    orderAlerts: 'New Order Alerts',
    ticketAlerts: 'New Ticket Alerts',
    systemSettings: 'System',
    maintenanceMode: 'Maintenance Mode',
    debugMode: 'Debug Mode',
    apiKeys: 'API Keys',
  },
  ar: {
    title: 'إعدادات الإدارة',
    subtitle: 'تكوين إعدادات لوحة الإدارة',
    generalSettings: 'الإعدادات العامة',
    siteName: 'اسم الموقع',
    supportEmail: 'بريد الدعم',
    timezone: 'المنطقة الزمنية',
    saveChanges: 'حفظ التغييرات',
    saved: 'تم حفظ الإعدادات بنجاح',
    securitySettings: 'إعدادات الأمان',
    twoFactor: 'تفعيل المصادقة الثنائية',
    sessionTimeout: 'مهلة الجلسة (دقائق)',
    notificationSettings: 'الإشعارات',
    emailNotifications: 'إشعارات البريد',
    orderAlerts: 'تنبيهات الطلبات الجديدة',
    ticketAlerts: 'تنبيهات التذاكر الجديدة',
    systemSettings: 'النظام',
    maintenanceMode: 'وضع الصيانة',
    debugMode: 'وضع التصحيح',
    apiKeys: 'مفاتيح API',
  },
};

export default function AdminSettingsPage() {
  const params = useParams();
  const { toast } = useToast();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];

  const [settings, setSettings] = useState({
    siteName: 'Ton Cloud',
    supportEmail: 'support@ton-cloud.com',
    timezone: 'Asia/Baghdad',
    twoFactor: false,
    sessionTimeout: 60,
    emailNotifications: true,
    orderAlerts: true,
    ticketAlerts: true,
    maintenanceMode: false,
    debugMode: false,
  });

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    toast({
      title: locale === 'ar' ? 'تم الحفظ' : 'Saved',
      description: t.saved,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground mt-1">{t.subtitle}</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t.generalSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.siteName}</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg bg-muted border text-sm"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.supportEmail}</label>
                <input
                  type="email"
                  className="w-full p-2 rounded-lg bg-muted border text-sm"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.timezone}</label>
                <select
                  className="w-full p-2 rounded-lg bg-muted border text-sm"
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                >
                  <option value="Asia/Baghdad">Baghdad (GMT+3)</option>
                  <option value="UTC">UTC</option>
                  <option value="Asia/Dubai">Dubai (GMT+4)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t.securitySettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{t.twoFactor}</label>
                <button
                  className={`relative w-12 h-6 rounded-full transition-colors ${settings.twoFactor ? 'bg-green-500' : 'bg-muted'}`}
                  onClick={() => setSettings({ ...settings, twoFactor: !settings.twoFactor })}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.twoFactor ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.sessionTimeout}</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg bg-muted border text-sm"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t.notificationSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'emailNotifications', label: t.emailNotifications },
                { key: 'orderAlerts', label: t.orderAlerts },
                { key: 'ticketAlerts', label: t.ticketAlerts },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <label className="text-sm font-medium">{item.label}</label>
                  <button
                    className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-green-500' : 'bg-muted'}`}
                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings[item.key as keyof typeof settings] ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* System Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                {t.systemSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'maintenanceMode', label: t.maintenanceMode },
                { key: 'debugMode', label: t.debugMode },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <label className="text-sm font-medium">{item.label}</label>
                  <button
                    className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-orange-500' : 'bg-muted'}`}
                    onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings[item.key as keyof typeof settings] ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {t.saveChanges}
        </Button>
      </motion.div>
    </div>
  );
}
