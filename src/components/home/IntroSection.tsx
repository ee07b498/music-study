import { useTranslations } from 'next-intl';

const stats = [
  { value: '200+', key: 'students' },
  { value: '15+', key: 'instruments' },
  { value: '8+', key: 'years' },
  { value: '2', key: 'campuses' },
] as const;

export default function IntroSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-xl text-gold">&#9830;</span>
          </div>
          <h2 className="mb-6 font-serif text-3xl font-bold text-brown sm:text-4xl">
            {t('intro.title')}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-brown/70 md:text-lg">
            {t('intro.description')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="mb-2 font-serif text-4xl font-bold text-gold md:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium tracking-wide text-brown/60 uppercase">
                {t(`intro.${stat.key}`)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="ornament-divider mt-16">
          <span className="text-xl text-gold">&#9830;</span>
        </div>
      </div>
    </section>
  );
}
