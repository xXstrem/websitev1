'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Server, Lock, Mail, Loader2 } from 'lucide-react';

const translations = {
  en: {
    title: 'Admin Login',
    subtitle: 'Access the admin control panel',
    email: 'Email Address',
    password: 'Password',
    button: 'Sign In',
    appName: 'Ton Cloud',
    remember: 'Remember me',
    error: 'Invalid credentials. Please try again.',
  },
  ar: {
    title: 'تسجيل دخول الإدارة',
    subtitle: 'الوصول إلى لوحة تحكم الإدارة',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    button: 'تسجيل الدخول',
    appName: 'تون كلاود',
    remember: 'تذكرني',
    error: 'بيانات اعتماد غير صالحة. يرجى المحاولة مرة أخرى.',
  },
};

export default function AdminLoginPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations];
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Hardcoded admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@ton-cloud.com',
    password: 'Ahmed2026$',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
      // Success - store admin session
      const adminUser = {
        email: formData.email,
        name: 'Admin',
        role: 'super_admin',
      };

      if (formData.remember) {
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
      } else {
        sessionStorage.setItem('adminUser', JSON.stringify(adminUser));
      }

      router.push(`/${locale}/admin/dashboard`);
    } else {
      setError(t.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted/50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-foreground text-background">
                <Server className="h-7 w-7" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@ton-cloud.com"
                    className="pl-10 rtl:pl-3 rtl:pr-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 rtl:pl-3 rtl:pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  {t.remember}
                </Label>
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>{locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}</span>
                  </>
                ) : (
                  t.button
                )}
              </Button>
            </CardContent>
          </form>

          <div className="pb-6 text-center">
            <p className="text-xs text-muted-foreground">
              {t.appName} &copy; 2024
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
