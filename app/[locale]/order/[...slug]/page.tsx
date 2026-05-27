'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/context';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, Server, Monitor, Cloud, Globe, Gamepad2, Lock, ShoppingCart, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase/client';

interface Plan {
  name: string;
  price: number;
  specs?: { cpu?: string; ram?: string; storage?: string; bandwidth?: string };
  features: string[];
  popular?: boolean;
}

interface ServiceConfig {
  icon: typeof Server;
  title: string;
  description: string;
  plans: Plan[];
  billingCycle: 'monthly' | 'annually';
  configFields: string[];
}

const serviceConfigs: Record<string, ServiceConfig> = {
  vps: {
    icon: Server,
    title: 'VPS Hosting',
    description: 'High-performance virtual private servers with dedicated resources',
    billingCycle: 'monthly',
    configFields: ['hostname', 'os', 'location'],
    plans: [
      { name: 'VPS-4', price: 15000, specs: { cpu: '1 Core', ram: '4 GB', storage: '50 GB NVMe', bandwidth: '2 TB' }, features: ['DDoS Protection', 'Full Root Access', '24/7 Support', 'Weekly Backups'] },
      { name: 'VPS-8', price: 25000, specs: { cpu: '2 Cores', ram: '8 GB', storage: '100 GB NVMe', bandwidth: '5 TB' }, features: ['DDoS Protection', 'Full Root Access', '24/7 Support', 'Weekly Backups'], popular: true },
      { name: 'VPS-16', price: 45000, specs: { cpu: '4 Cores', ram: '16 GB', storage: '200 GB NVMe', bandwidth: '10 TB' }, features: ['DDoS Protection', 'Full Root Access', '24/7 Support', 'Daily Backups', 'Priority Support'] },
      { name: 'VPS-32', price: 85000, specs: { cpu: '8 Cores', ram: '32 GB', storage: '400 GB NVMe', bandwidth: 'Unlimited' }, features: ['DDoS Protection', 'Full Root Access', '24/7 Support', 'Daily Backups', 'Priority Support', 'Dedicated IP'] },
    ],
  },
  dedicated: {
    icon: Monitor,
    title: 'Dedicated Servers',
    description: 'Bare metal performance for your most demanding workloads',
    billingCycle: 'monthly',
    configFields: ['hostname', 'os', 'raid'],
    plans: [
      { name: 'DED-16', price: 120000, specs: { cpu: 'Intel Xeon E3', ram: '16 GB', storage: '2x500GB SSD', bandwidth: '10 Gbps' }, features: ['IPMI Access', '24/7 Support', 'DDoS Protection'] },
      { name: 'DED-32', price: 250000, specs: { cpu: 'Intel Xeon E5', ram: '32 GB', storage: '2x1TB SSD', bandwidth: '10 Gbps' }, features: ['IPMI Access', '24/7 Support', 'DDoS Protection', 'RAID Configuration'], popular: true },
      { name: 'DED-64', price: 500000, specs: { cpu: 'Dual Intel Xeon', ram: '64 GB', storage: '4x1TB SSD', bandwidth: '10 Gbps' }, features: ['IPMI Access', '24/7 Support', 'DDoS Protection', 'RAID 10', 'Premium Support'] },
    ],
  },
  shared: {
    icon: Cloud,
    title: 'Shared Hosting',
    description: 'Affordable hosting perfect for small websites',
    billingCycle: 'monthly',
    configFields: ['domain'],
    plans: [
      { name: 'Starter', price: 4500, specs: { storage: '5 GB', bandwidth: '50 GB' }, features: ['cPanel', 'Free SSL', '1 Website', '5 Emails'] },
      { name: 'Business', price: 9000, specs: { storage: '20 GB', bandwidth: '200 GB' }, features: ['cPanel', 'Free SSL', '5 Websites', '20 Emails', 'Daily Backups'], popular: true },
      { name: 'Premium', price: 18000, specs: { storage: '50 GB', bandwidth: 'Unlimited' }, features: ['cPanel', 'Free SSL', 'Unlimited Websites', 'Unlimited Emails', 'Priority Support'] },
    ],
  },
  domains: {
    icon: Globe,
    title: 'Domain Registration',
    description: 'Find your perfect domain name',
    billingCycle: 'annually',
    configFields: ['domain'],
    plans: [
      { name: '.com', price: 15000, features: ['DNS Management', 'WHOIS Privacy Available'] },
      { name: '.net', price: 18000, features: ['DNS Management', 'WHOIS Privacy Available'] },
      { name: '.org', price: 20000, features: ['DNS Management', 'WHOIS Privacy Available'] },
      { name: '.xyz', price: 10000, features: ['DNS Management', 'Popular for Tech'] },
    ],
  },
  game: {
    icon: Gamepad2,
    title: 'Game Server Hosting',
    description: 'Low-latency servers for the ultimate gaming experience',
    billingCycle: 'monthly',
    configFields: ['hostname', 'game', 'slots'],
    plans: [
      { name: 'Starter', price: 9000, specs: { cpu: '2 vCPU', ram: '4 GB', storage: '50 GB NVMe' }, features: ['10 Slots', 'DDoS Protection', 'Instant Setup', 'Control Panel'] },
      { name: 'Basic', price: 18000, specs: { cpu: '4 vCPU', ram: '8 GB', storage: '100 GB NVMe' }, features: ['20 Slots', 'DDoS Protection', 'Instant Setup', 'Mod Support'], popular: true },
      { name: 'Pro', price: 35000, specs: { cpu: '8 vCPU', ram: '16 GB', storage: '200 GB NVMe' }, features: ['50 Slots', 'DDoS Protection', 'Instant Setup', 'Priority Support'] },
    ],
  },
  ssl: {
    icon: Lock,
    title: 'SSL Certificates',
    description: 'Secure your website with trusted SSL certificates',
    billingCycle: 'annually',
    configFields: ['domain'],
    plans: [
      { name: 'Basic SSL', price: 15000, features: ['Domain Validation', 'Quick Issuance', '99.9% Recognition'] },
      { name: 'Premium SSL', price: 35000, features: ['Organization Validation', 'Business Verification', 'Site Seal'], popular: true },
      { name: 'Wildcard SSL', price: 75000, features: ['Unlimited Subdomains', '*.domain coverage', 'Easy Management'] },
    ],
  },
};

const translations = {
  en: {
    orderTitle: 'Order',
    selectPlan: 'Select Plan',
    configuration: 'Configuration',
    popular: 'Popular',
    orderSummary: 'Order Summary',
    service: 'Service',
    plan: 'Plan',
    billing: 'Billing',
    perMonth: 'month',
    perYear: 'year',
    total: 'Total',
    placeOrder: 'Place Order',
    processing: 'Processing...',
    paymentNote: 'Payment will be processed manually after order submission',
    serviceNotFound: 'Service Not Found',
    serviceNotFoundDesc: 'The requested service does not exist.',
    viewAllServices: 'View All Services',
    hostname: 'Hostname',
    domainName: 'Domain Name',
    operatingSystem: 'Operating System',
    serverLocation: 'Server Location',
    gameType: 'Game Type',
    numberOfSlots: 'Number of Slots',
    raidConfiguration: 'RAID Configuration',
    additionalNotes: 'Additional Notes (Optional)',
    specialRequirements: 'Any special requirements...',
    error: 'Error',
    success: 'Success',
    orderPlaced: 'Order placed successfully. We will process it shortly.',
    pleaseSelectPlan: 'Please select a plan and ensure you are logged in.',
    cpu: 'CPU',
    ram: 'RAM',
    storage: 'Storage',
    bandwidth: 'Bandwidth',
  },
  ar: {
    orderTitle: 'طلب',
    selectPlan: 'اختر الخطة',
    configuration: 'التكوين',
    popular: 'شائع',
    orderSummary: 'ملخص الطلب',
    service: 'الخدمة',
    plan: 'الخطة',
    billing: 'الفوترة',
    perMonth: 'شهر',
    perYear: 'سنة',
    total: 'المجموع',
    placeOrder: 'تقديم الطلب',
    processing: 'جاري المعالجة...',
    paymentNote: 'سيتم معالجة الدفع يدوياً بعد تقديم الطلب',
    serviceNotFound: 'الخدمة غير موجودة',
    serviceNotFoundDesc: 'الخدمة المطلوبة غير موجودة.',
    viewAllServices: 'عرض جميع الخدمات',
    hostname: 'اسم المضيف',
    domainName: 'اسم النطاق',
    operatingSystem: 'نظام التشغيل',
    serverLocation: 'موقع السيرفر',
    gameType: 'نوع اللعبة',
    numberOfSlots: 'عدد الفتحات',
    raidConfiguration: 'تكوين RAID',
    additionalNotes: 'ملاحظات إضافية (اختياري)',
    specialRequirements: 'أي متطلبات خاصة...',
    error: 'خطأ',
    success: 'نجاح',
    orderPlaced: 'تم تقديم الطلب بنجاح. سنقوم بمعالجته قريباً.',
    pleaseSelectPlan: 'يرجى اختيار خطة والتأكد من تسجيل الدخول.',
    cpu: 'المعالج',
    ram: 'الذاكرة',
    storage: 'التخزين',
    bandwidth: 'النطاق الترددي',
  },
};

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, t } = useLanguage();
  const { toast } = useToast();
  const tr = translations[locale] || translations.en;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [config, setConfig] = useState<Record<string, string>>({});

  const serviceType = params.slug?.[0] as string;
  const planName = params.slug?.[1] as string;

  const service = serviceConfigs[serviceType];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
      setAuthLoading(false);

      if (!session?.user) {
        router.push(`/${locale}/auth/login`);
        return;
      }

      if (planName && service) {
        setSelectedPlan(planName);
      }
    };

    checkAuth();
  }, [planName, service, router, locale]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <Card className="max-w-lg mx-4">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">{tr.serviceNotFound}</h1>
              <p className="text-muted-foreground mb-6">{tr.serviceNotFoundDesc}</p>
              <a href={`/${locale}/pricing`}>
                <Button>{tr.viewAllServices}</Button>
              </a>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const plan = service.plans.find(p => p.name.toLowerCase().replace(' ', '-') === selectedPlan?.toLowerCase().replace(' ', '-') || p.name === selectedPlan);

  const handleOrder = async () => {
    if (!selectedPlan || !user) {
      toast({
        title: t('common.error'),
        description: tr.pleaseSelectPlan,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Get or create a default product for this service type
      let product: any = null;
      const { data: existingProducts } = await supabase
        .from('products')
        .select('id')
        .eq('slug', serviceType)
        .limit(1);

      if (existingProducts && existingProducts.length > 0) {
        product = existingProducts[0];
      } else {
        // Create product if doesn't exist
        const { data: newProduct, error: productError } = await supabase
          .from('products')
          .insert({
            category_id: null,
            name: { en: service.title, ar: service.title },
            slug: serviceType,
            description: { en: service.description, ar: service.description },
            price: plan?.price || 0,
            billing_cycle: service.billingCycle,
            is_active: true,
          })
          .select('id')
          .single();

        if (productError) throw productError;
        product = newProduct;
      }

      // Create the order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: product.id,
          amount: plan?.price || 0,
          currency: 'IQD',
          billing_cycle: service.billingCycle,
          notes: JSON.stringify({
            plan_name: selectedPlan,
            service_type: serviceType,
            configuration: config,
          }),
          status: 'pending',
        });

      if (orderError) throw orderError;

      // Create invoice
      const { error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          user_id: user.id,
          amount: plan?.price || 0,
          currency: 'IQD',
          status: 'pending',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });

      if (invoiceError) console.error('Invoice creation failed:', invoiceError);

      toast({
        title: t('common.success'),
        description: tr.orderPlaced,
      });

      router.push(`/${locale}/dashboard/orders`);
    } catch (error: any) {
      console.error('Order error:', error);
      toast({
        title: t('common.error'),
        description: error.message || t('common.error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-foreground text-background mb-6">
                <Icon className="h-6 w-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {tr.orderTitle} {service.title}
              </h1>
              <p className="text-lg text-muted-foreground">{service.description}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{tr.selectPlan}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.plans.map((p) => (
                        <div
                          key={p.name}
                          onClick={() => setSelectedPlan(p.name)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedPlan === p.name
                              ? 'border-foreground bg-muted/50'
                              : 'hover:border-muted-foreground'
                          } ${p.popular ? 'relative' : ''}`}
                        >
                          {p.popular && (
                            <span className="absolute -top-2 right-4 bg-foreground text-background text-xs px-2 py-0.5 rounded">
                              {tr.popular}
                            </span>
                          )}
                          <div className="font-semibold text-lg">{p.name}</div>
                          {p.specs && (
                            <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                              {p.specs.cpu && <p>{tr.cpu}: {p.specs.cpu}</p>}
                              {p.specs.ram && <p>{tr.ram}: {p.specs.ram}</p>}
                              {p.specs.storage && <p>{tr.storage}: {p.specs.storage}</p>}
                              {p.specs.bandwidth && <p>{tr.bandwidth}: {p.specs.bandwidth}</p>}
                            </div>
                          )}
                          <div className="mt-3">
                            <span className="text-2xl font-bold">{p.price.toLocaleString()}</span>
                            <span className="text-muted-foreground"> IQD/{service.billingCycle === 'monthly' ? tr.perMonth : tr.perYear}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {p.features.slice(0, 2).map((f) => (
                              <span key={f} className="text-xs bg-muted px-2 py-0.5 rounded">{f}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {selectedPlan && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{tr.configuration}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {service.configFields.includes('hostname') && (
                          <div className="space-y-2">
                            <Label htmlFor="hostname">{tr.hostname}</Label>
                            <Input
                              id="hostname"
                              placeholder="server.example.com"
                              value={config.hostname || ''}
                              onChange={(e) => setConfig({ ...config, hostname: e.target.value })}
                            />
                          </div>
                        )}

                        {service.configFields.includes('domain') && (
                          <div className="space-y-2">
                            <Label htmlFor="domain">{tr.domainName}</Label>
                            <Input
                              id="domain"
                              placeholder="example.com"
                              value={config.domain || ''}
                              onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                            />
                          </div>
                        )}

                        {service.configFields.includes('os') && (
                          <div className="space-y-2">
                            <Label>{tr.operatingSystem}</Label>
                            <Select value={config.os || ''} onValueChange={(v) => setConfig({ ...config, os: v })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select OS" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ubuntu-22">Ubuntu 22.04 LTS</SelectItem>
                                <SelectItem value="ubuntu-24">Ubuntu 24.04 LTS</SelectItem>
                                <SelectItem value="debian-12">Debian 12</SelectItem>
                                <SelectItem value="centos-9">CentOS Stream 9</SelectItem>
                                <SelectItem value="almalinux-9">AlmaLinux 9</SelectItem>
                                <SelectItem value="rocky-9">Rocky Linux 9</SelectItem>
                                <SelectItem value="windows-2022">Windows Server 2022</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {service.configFields.includes('location') && (
                          <div className="space-y-2">
                            <Label>{tr.serverLocation}</Label>
                            <Select value={config.location || ''} onValueChange={(v) => setConfig({ ...config, location: v })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="baghdad">Baghdad, Iraq</SelectItem>
                                <SelectItem value="dubai">Dubai, UAE</SelectItem>
                                <SelectItem value="amsterdam">Amsterdam, NL</SelectItem>
                                <SelectItem value="frankfurt">Frankfurt, DE</SelectItem>
                                <SelectItem value="singapore">Singapore</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {service.configFields.includes('game') && (
                          <div className="space-y-2">
                            <Label>{tr.gameType}</Label>
                            <Select value={config.game || ''} onValueChange={(v) => setConfig({ ...config, game: v })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Game" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="minecraft">Minecraft</SelectItem>
                                <SelectItem value="csgo">Counter-Strike 2</SelectItem>
                                <SelectItem value="rust">Rust</SelectItem>
                                <SelectItem value="ark">ARK: Survival Evolved</SelectItem>
                                <SelectItem value="valheim">Valheim</SelectItem>
                                <SelectItem value="fivem">FiveM / GTA V</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {service.configFields.includes('slots') && (
                          <div className="space-y-2">
                            <Label htmlFor="slots">{tr.numberOfSlots}</Label>
                            <Input
                              id="slots"
                              type="number"
                              placeholder="10"
                              value={config.slots || ''}
                              onChange={(e) => setConfig({ ...config, slots: e.target.value })}
                            />
                          </div>
                        )}

                        {service.configFields.includes('raid') && (
                          <div className="space-y-2">
                            <Label>{tr.raidConfiguration}</Label>
                            <Select value={config.raid || ''} onValueChange={(v) => setConfig({ ...config, raid: v })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select RAID" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No RAID</SelectItem>
                                <SelectItem value="raid-0">RAID 0 (Performance)</SelectItem>
                                <SelectItem value="raid-1">RAID 1 (Mirroring)</SelectItem>
                                <SelectItem value="raid-10">RAID 10 (Performance + Redundancy)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="notes">{tr.additionalNotes}</Label>
                          <Textarea
                            id="notes"
                            placeholder={tr.specialRequirements}
                            value={config.notes || ''}
                            onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      {tr.orderSummary}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{tr.service}</span>
                      <span className="font-medium">{service.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{tr.plan}</span>
                      <span className="font-medium">{selectedPlan || '-'}</span>
                    </div>
                    {plan?.specs && (
                      <div className="border-t pt-4 space-y-2 text-sm">
                        {plan.specs.cpu && <div className="flex justify-between"><span className="text-muted-foreground">{tr.cpu}</span><span>{plan.specs.cpu}</span></div>}
                        {plan.specs.ram && <div className="flex justify-between"><span className="text-muted-foreground">{tr.ram}</span><span>{plan.specs.ram}</span></div>}
                        {plan.specs.storage && <div className="flex justify-between"><span className="text-muted-foreground">{tr.storage}</span><span>{plan.specs.storage}</span></div>}
                        {plan.specs.bandwidth && <div className="flex justify-between"><span className="text-muted-foreground">{tr.bandwidth}</span><span>{plan.specs.bandwidth}</span></div>}
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{tr.billing}</span>
                        <span>Per {service.billingCycle === 'monthly' ? tr.perMonth : tr.perYear}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>{tr.total}</span>
                        <span>{plan ? `${plan.price.toLocaleString()} IQD` : '-'}</span>
                      </div>
                    </div>
                    {plan && (
                      <div className="space-y-2">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      className="w-full mt-4"
                      size="lg"
                      disabled={!selectedPlan || loading}
                      onClick={handleOrder}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {tr.processing}
                        </>
                      ) : (
                        tr.placeOrder
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      {tr.paymentNote}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
