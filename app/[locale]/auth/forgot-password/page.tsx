'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';

const translations = {
  en: {
    title: 'Forgot Password',
    subtitle: 'Enter your email to receive a reset link',
    email: 'Email',
    button: 'Send Reset Link',
    back: 'Back to Login',
    success: 'Check your email',
    checkEmail: 'We have sent a password reset link to your email address.',
    loading: 'Loading...',
  },
  ar: {
    title: 'نسيت كلمة المرور',
    subtitle: 'أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين',
    email: 'البريد الإلكتروني',
    button: 'إرسال رابط إعادة التعيين',
    back: 'العودة لتسجيل الدخول',
    success: 'تحقق من بريدك الإلكتروني',
    checkEmail: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.',
    loading: 'جاري التحميل...',
  },
};

export default function ForgotPasswordPage() {
  const { locale, t } = useLanguage();
  const tr = translations[locale] || translations.en;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
      });

      if (error) {
        toast({
          title: t('common.error'),
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setSubmitted(true);
        toast({
          title: tr.success,
          description: tr.checkEmail,
        });
      }
    } catch {
      toast({
        title: t('common.error'),
        description: t('common.error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
              <KeyRound className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl">{tr.title}</CardTitle>
            <CardDescription>{tr.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-muted-foreground">{tr.success}</p>
                <p className="text-sm text-muted-foreground">{tr.checkEmail}</p>
                <a href={`/${locale}/auth/login`}>
                  <Button variant="outline" className="w-full mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {tr.back}
                  </Button>
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{tr.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t('common.loading') : tr.button}
                </Button>
                <div className="text-center">
                  <a
                    href={`/${locale}/auth/login`}
                    className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {tr.back}
                  </a>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
