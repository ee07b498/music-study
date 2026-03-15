import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Playfair_Display, Noto_Serif_SC } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif-zh',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${playfair.variable} ${notoSerifSC.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-serif antialiased">
        <NextIntlClientProvider>
          <div id="site-header"><Header /></div>
          <main className="min-h-screen">
            {children}
          </main>
          <div id="site-footer"><Footer /></div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
