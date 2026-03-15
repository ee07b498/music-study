import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { events } from '@/lib/data';

export default function EventsPreview() {
  const t = useTranslations('home');
  const locale = useLocale();

  const displayEvents = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <section className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-xl text-gold">&#9734;</span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-brown sm:text-4xl">
            {t('events.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-brown/70 md:text-lg">
            {t('events.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {displayEvents.map((event) => (
            <Card key={event.id} className="border-0 bg-card ring-gold/10 transition-all duration-300 hover:ring-2 hover:ring-gold/30 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif text-lg leading-snug text-brown">
                  {locale === 'zh' ? event.titleZh : event.title}
                </CardTitle>
                <CardDescription className="text-brown/50">
                  {formatDate(event.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex items-center gap-2 text-sm text-brown/60">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0 text-gold">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145c.186-.1.432-.24.723-.433.582-.386 1.352-.977 2.112-1.77C14.888 15.117 16 13.01 16 10.5 16 7.186 13.314 4.5 10 4.5S4 7.186 4 10.5c0 2.51 1.112 4.617 2.55 6.007.76.793 1.53 1.384 2.112 1.77.29.193.537.333.723.433a4.834 4.834 0 00.281.145l.018.008.006.003zM10 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
                  </svg>
                  <span>{locale === 'zh' ? event.venueZh : event.venue}</span>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-brown/70">
                  {locale === 'zh' ? event.descriptionZh : event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-brown/30 bg-transparent px-8 text-sm font-medium text-brown transition-colors hover:bg-brown/5"
          >
            {t('events.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
