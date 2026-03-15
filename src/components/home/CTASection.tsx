import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CTASection() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden bg-secondary/50 px-6 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(197,165,90,0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 20% 80%, rgba(139,35,35,0.04) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="ornament-divider mb-8">
          <span className="text-xl text-gold">&#10047;</span>
        </div>

        <h2 className="mb-6 font-serif text-3xl font-bold text-brown sm:text-4xl md:text-5xl">
          {t('cta.title')}
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-brown/70">
          {t('cta.description')}
        </p>

        <Link
          href="/booking"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
        >
          {t('cta.button')}
        </Link>

        <div className="ornament-divider mt-12">
          <span className="text-xl text-gold">&#10047;</span>
        </div>
      </div>
    </section>
  );
}
