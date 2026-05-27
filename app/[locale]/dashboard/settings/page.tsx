'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Bell, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const translations = {
  en: {
    title: 'Settings',
    manageAccount: 'Manage your account settings',
    profile: 'Profile',
    security: 'Security',
    notifications: 'Notifications',
    api: 'API',
    profileInformation: 'Profile Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    updatePassword: 'Update Password',
    notificationPreferences: 'Notification Preferences',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive email updates about your services',
    serviceAlerts: 'Service Alerts',
    serviceAlertsDesc: 'Get notified about service status changes',
    invoiceReminders: 'Invoice Reminders',
    invoiceRemindersDesc: 'Receive reminders before due dates',
    enable: 'Enable',
    apiKeys: 'API Keys',
    apiKeysDesc: 'Generate API keys to integrate with our services programmatically.',
    generateNewKey: 'Generate New API Key',
    settingsSaved: 'Settings saved',
    settingsSavedDesc: 'Your changes have been saved successfully.',
  },
  ar: {
    title: 'الإعدادات',
    manageAccount: 'إدارة إعدادات حسابك',
    profile: 'الملف الشخصي',
    security: 'الأمان',
    notifications: 'الإشعارات',
    api: 'API',
    profileInformation: 'معلومات الملف الشخصي',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    emailAddress: 'عنوان البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    saveChanges: 'حفظ التغييرات',
    saving: 'جاري الحفظ...',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
    updatePassword: 'تحديث كلمة المرور',
    notificationPreferences: 'تفضيلات الإشعارات',
    emailNotifications: 'إشعارات البريد الإلكتروني',
    emailNotificationsDesc: 'تلقي تحديثات البريد الإلكتروني حول خدماتك',
    serviceAlerts: 'تنبيهات الخدمة',
    serviceAlertsDesc: 'الحصول على إشعار بتغييرات حالة الخدمة',
    invoiceReminders: 'تذكيرات الفواتير',
    invoiceRemindersDesc: 'تلقي التذكيرات قبل تواريخ الاستحقاق',
    enable: 'تفعيل',
    apiKeys: 'مفاتيح API',
    apiKeysDesc: 'إنشاء مفاتيح API للتكامل مع خدماتنا برمجياً.',
    generateNewKey: 'إنشاء مفتاح API جديد',
    settingsSaved: 'تم حفظ الإعدادات',
    settingsSavedDesc: 'تم حفظ تغييراتك بنجاح.',
  },
};

export default function SettingsPage() {
  const { locale, t } = useLanguage();
  const tr = translations[locale] || translations.en;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: tr.settingsSaved,
        description: tr.settingsSavedDesc,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('dashboard.settings.title')}</h1>
        <p className="text-muted-foreground">{tr.manageAccount}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{tr.profile}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">{tr.security}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{tr.notifications}</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{tr.api}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{tr.profileInformation}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{tr.firstName}</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{tr.lastName}</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{tr.emailAddress}</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{tr.phoneNumber}</Label>
                  <Input id="phone" type="tel" placeholder="+964 770 000 0000" />
                </div>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? tr.saving : tr.saveChanges}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{tr.changePassword}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{tr.currentPassword}</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{tr.newPassword}</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword">{tr.confirmNewPassword}</Label>
                  <Input id="confirmNewPassword" type="password" />
                </div>
                <Button onClick={handleSave} disabled={loading}>
                  {tr.updatePassword}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{tr.notificationPreferences}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{tr.emailNotifications}</p>
                    <p className="text-sm text-muted-foreground">{tr.emailNotificationsDesc}</p>
                  </div>
                  <Button variant="outline" size="sm">{tr.enable}</Button>
                </div>
                <div className="flex items-center justify-between py-2 border-t">
                  <div>
                    <p className="font-medium">{tr.serviceAlerts}</p>
                    <p className="text-sm text-muted-foreground">{tr.serviceAlertsDesc}</p>
                  </div>
                  <Button variant="outline" size="sm">{tr.enable}</Button>
                </div>
                <div className="flex items-center justify-between py-2 border-t">
                  <div>
                    <p className="font-medium">{tr.invoiceReminders}</p>
                    <p className="text-sm text-muted-foreground">{tr.invoiceRemindersDesc}</p>
                  </div>
                  <Button variant="outline" size="sm">{tr.enable}</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="api">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{tr.apiKeys}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tr.apiKeysDesc}
                </p>
                <Button>{tr.generateNewKey}</Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
