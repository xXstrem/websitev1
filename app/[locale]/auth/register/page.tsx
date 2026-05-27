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
import { Loader2, Mail, Lock, User, Server } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const translations = {
  en: {
    title: 'Create account',
    subtitle: 'Get started with Ton Cloud',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    terms: 'I agree to the terms of service and privacy policy',
    button: 'Create Account',
    hasAccount: 'Already have an account?',
    login: 'Sign in',
    appName: 'Ton Cloud',
    success: 'Success',
    error: 'Error',
  },
  ar: {
    title: 'إنشاء حساب',
    subtitle: 'ابدأ مع تون كلاود',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    terms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
    button: 'إنشاء الحساب',
    hasAccount: 'لديك حساب بالفعل؟',
    login: 'تسجيل الدخول',
    appName: 'تون كلاود',
    success: 'تم بنجاح',
    error: 'حدث خطأ',
  },
};

export default function RegisterPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string || 'en';
  const t = translations[locale as keyof typeof translations] || translations.en;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(locale === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (!formData.terms) {
      toast.error(locale === 'ar' ? 'الرجاء قبول الشروط' : 'Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.firstName}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:right-3 rtl:left-auto" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={locale === 'ar' ? 'أحمد' : 'John'}
                      className="pl-10 rtl:pl-3 rtl:pr-10"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.lastName}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder={locale === 'ar' ? 'محمد' : 'Doe'}
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

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
                <Label htmlFor="password">{t.password}</Label>
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
                    minLength={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:right-3 rtl:left-auto" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 rtl:pl-3 rtl:pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                    disabled={isLoading}
                    minLength={8}
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, terms: checked as boolean })
                  }
                />
                <Label htmlFor="terms" className="text-sm font-normal leading-none">
                  <a href={`/${locale}/terms`} className="underline hover:text-foreground">
                    {t.terms}
                  </a>
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.button}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                {t.hasAccount}{' '}
                <a
                  href={`/${locale}/auth/login`}
                  className="font-medium text-foreground hover:underline"
                >
                  {t.login}
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
