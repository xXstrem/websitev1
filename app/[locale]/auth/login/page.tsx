'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, Server } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const translations = {
  en: {
    title: 'Welcome back',
    subtitle: 'Sign in to your account',
    email: 'Email',
    password: 'Password',
    remember: 'Remember me',
    forgot: 'Forgot password?',
    button: 'Sign In',
    noAccount: "Don't have an account?",
    register: 'Create account',
    appName: 'Ton Cloud',
    success: 'Success',
    error: 'Error',
  },
  ar: {
    title: 'مرحباً بعودتك',
    subtitle: 'سجل الدخول إلى حسابك',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    remember: 'تذكرني',
    forgot: 'نسيت كلمة المرور؟',
    button: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    register: 'إنشاء حساب',
    appName: 'تون كلاود',
    success: 'تم بنجاح',
    error: 'حدث خطأ',
  },
};

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations] || translations.en;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast.success(t.success);
      router.push(`/${locale}/dashboard`);
    } catch (error: any) {
      toast.error(error.message || t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <a href={`/${locale}`} className="inline-flex items-center gap-2 mb-6">
            <Server className="h-8 w-8" />
            <span className="text-xl font-bold">{t.appName}</span>
          </a>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {t.title}
            </CardTitle>
            <CardDescription className="text-center">
              {t.subtitle}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:right-3 rtl:left-auto" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 rtl:pl-3 rtl:pr-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t.password}</Label>
                  <a
                    href={`/${locale}/auth/forgot-password`}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {t.forgot}
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:right-3 rtl:left-auto" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 rtl:pl-3 rtl:pr-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, remember: checked as boolean })
                  }
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  {t.remember}
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.button}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                {t.noAccount}{' '}
                <a
                  href={`/${locale}/auth/register`}
                  className="font-medium text-foreground hover:underline"
                >
                  {t.register}
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
