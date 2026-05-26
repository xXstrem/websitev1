'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Globe, Check, X, Loader2 } from 'lucide-react';

const extensions = [
  { ext: '.com', price: 9.99, popular: true },
  { ext: '.net', price: 11.99, popular: false },
  { ext: '.org', price: 12.99, popular: false },
  { ext: '.cloud', price: 14.99, popular: true },
  { ext: '.io', price: 39.99, popular: true },
];

type SearchResult = typeof extensions[number] & { available: boolean };

export default function DomainsPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockResults = extensions.map((ext) => ({
      ...ext,
      available: Math.random() > 0.3,
    }));
    setResults(mockResults);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {t('domains.title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('domains.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground rtl:right-3 rtl:left-auto" />
                      <Input
                        type="text"
                        placeholder={t('domains.search.placeholder')}
                        className="pl-10 h-12 text-lg rtl:pl-3 rtl:pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button
                      size="lg"
                      className="h-12 px-8"
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Search className="h-5 w-5 mr-2" />
                          {t('domains.search.button')}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {results && (
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto space-y-4">
                {results.map((result, index) => (
                  <motion.div
                    key={result.ext}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={result.available ? 'border-green-500' : ''}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-semibold">
                            {searchQuery}
                            {result.ext}
                          </span>
                          {result.popular && <Badge>Popular</Badge>}
                        </div>
                        <div className="flex items-center gap-4">
                          {result.available ? (
                            <>
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="text-muted-foreground line-through">
                                ${result.price}
                              </span>
                              <Button size="sm">Add to Cart</Button>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-destructive" />
                              <span className="text-muted-foreground">{t('domains.search.taken')}</span>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                {t('domains.extensions.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
              {extensions.map((ext, index) => (
                <motion.div
                  key={ext.ext}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 bg-muted rounded-xl text-center hover-lift relative"
                >
                  {ext.popular && (
                    <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                      Popular
                    </Badge>
                  )}
                  <div className="text-2xl font-bold mb-2">{ext.ext}</div>
                  <div className="text-lg">
                    ${ext.price}
                    <span className="text-sm text-muted-foreground">/yr</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
