import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(61,43,31,0.04) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(139,35,35,0.03) 0%, transparent 70%)',
            'radial-gradient(ellipse 90% 40% at 50% 100%, rgba(197,165,90,0.05) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        <div className="ornament-divider mb-8">
          <span className="text-2xl text-gold">&#9753;</span>
        </div>

        <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-brown sm:text-5xl md:text-6xl lg:text-7xl">
          {t('hero.title')}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-brown/70 sm:text-xl md:text-2xl">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('hero.cta')}
          </Link>
          <Link
            href="/lessons"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-brown/30 bg-transparent px-8 text-base font-semibold text-brown transition-colors hover:bg-brown/5"
          >
            {t('hero.secondary')}
          </Link>
        </div>

        <div className="ornament-divider mt-16">
          <span className="text-2xl text-gold">&#9753;</span>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-cream to-transparent" aria-hidden="true" />
    </section>
  );
}
