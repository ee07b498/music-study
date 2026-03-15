import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function OrchestraSection() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden bg-crimson px-6 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 70% 50% at 0% 50%, rgba(0,0,0,0.15) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 60% at 100% 50%, rgba(0,0,0,0.1) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 0%, rgba(197,165,90,0.08) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="font-serif text-2xl text-gold/80">&#9833;</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <h2 className="mb-6 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {t('orchestra.title')}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
          {t('orchestra.description')}
        </p>

        <Link
          href="/orchestra"
          className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-gold/60 bg-transparent px-10 text-base font-semibold text-white transition-colors hover:bg-gold/20"
        >
          {t('orchestra.cta')}
        </Link>

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="font-serif text-2xl text-gold/80">&#9833;</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </div>
    </section>
  );
}
