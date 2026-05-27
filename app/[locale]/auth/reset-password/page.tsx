'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';

const translations = {
  en: {
    title: 'Reset Password',
    subtitle: 'Enter your new password',
    password: 'New Password',
    confirmPassword: 'Confirm Password',
    button: 'Reset Password',
    passwordResetSuccess: 'Password Reset Successful',
    passwordResetDesc: 'Your password has been updated. Redirecting to dashboard...',
    goToDashboard: 'Go to Dashboard',
    invalidLink: 'Invalid or expired reset link',
    passwordsNotMatch: 'Passwords do not match',
    passwordMinLength: 'Password must be at least 8 characters',
    error: 'Error',
    success: 'Success',
    passwordUpdated: 'Password updated successfully',
    loading: 'Loading...',
  },
  ar: {
    title: 'إعادة تعيين كلمة المرور',
    subtitle: 'أدخل كلمة المرور الجديدة',
    password: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    button: 'إعادة تعيين كلمة المرور',
    passwordResetSuccess: 'تم إعادة تعيين كلمة المرور بنجاح',
    passwordResetDesc: 'تم تحديث كلمة المرور الخاصة بك. جاري التحويل إلى لوحة التحكم...',
    goToDashboard: 'الذهاب إلى لوحة التحكم',
    invalidLink: 'رابط إعادة التعيين غير صالح أو منتهي الصلاحية',
    passwordsNotMatch: 'كلمات المرور غير متطابقة',
    passwordMinLength: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
    error: 'خطأ',
    success: 'نجاح',
    passwordUpdated: 'تم تحديث كلمة المرور بنجاح',
    loading: 'جاري التحميل...',
  },
};

export default function ResetPasswordPage() {
  const { locale, t } = useLanguage();
  const tr = translations[locale] || translations.en;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const tokenHash = searchParams?.get('token_hash');
    const type = searchParams?.get('type');

    if (tokenHash && type) {
      supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as 'recovery' | 'signup' | 'invite',
      }).then(({ error }) => {
        if (error) {
          setError(tr.invalidLink);
        }
      });
    }
  }, [searchParams, supabase.auth, tr.invalidLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(tr.passwordsNotMatch);
      return;
    }

    if (password.length < 8) {
      setError(tr.passwordMinLength);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(error.message);
        toast({
          title: t('common.error'),
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setSuccess(true);
        toast({
          title: t('common.success'),
          description: tr.passwordUpdated,
        });
        setTimeout(() => {
          router.push(`/${locale}/dashboard`);
        }, 2000);
      }
    } catch {
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{tr.passwordResetSuccess}</h1>
          <p className="text-muted-foreground mb-4">{tr.passwordResetDesc}</p>
          <a href={`/${locale}/dashboard`}>
            <Button>{tr.goToDashboard}</Button>
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <a href={`/${locale}`} className="inline-flex items-center gap-2 text-2xl font-bold">
            <span className="bg-foreground text-background px-2 py-1 rounded">Ton</span>
            <span>Cloud</span>
          </a>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl">{tr.title}</CardTitle>
            <CardDescription>{tr.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{tr.password}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{tr.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : tr.button}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
