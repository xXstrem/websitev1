import { getRequestConfig, type GetRequestConfigParams } from 'next-intl/server';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  const validLocale: string = locale && locales.includes(locale as Locale) ? locale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
