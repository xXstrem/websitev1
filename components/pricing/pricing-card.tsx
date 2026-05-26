'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  currency?: string;
  features: string[];
  popular?: boolean;
  index: number;
  href: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
}

export default function PricingCard({
  name,
  description,
  price,
  currency = 'IQD',
  features,
  popular,
  index,
  href,
  specs,
}: PricingCardProps) {
  const t = useTranslations();
  const tVps = useTranslations('vps');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">Popular</Badge>}
      <Card className={`h-full flex flex-col hover-lift ${popular ? 'border-foreground dark:border-white shadow-lg' : ''}`}>
        <CardHeader className="text-center">
          <div className="text-xl font-bold">{name}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </CardHeader>

        <CardContent className="flex-1 space-y-6">
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold">{price.toLocaleString()}</span>
              <span className="text-muted-foreground">{currency}{t('common.perMonth')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-muted-foreground">{tVps('specs.cpu')}</div>
              <div className="font-semibold">{specs.cpu}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-muted-foreground">{tVps('specs.ram')}</div>
              <div className="font-semibold">{specs.ram}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-muted-foreground">{tVps('specs.storage')}</div>
              <div className="font-semibold">{specs.storage}</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-muted-foreground">{tVps('specs.bandwidth')}</div>
              <div className="font-semibold">{specs.bandwidth}</div>
            </div>
          </div>

          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Link href={href} className="w-full">
            <Button className="w-full" variant={popular ? 'default' : 'outline'}>{t('common.orderNow')}</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
