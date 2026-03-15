import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { events } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin } from 'lucide-react';

export default function EventsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            {isZh ? '演出与活动' : 'Events & Performances'}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {isZh
              ? '探索我们即将举行的音乐会和文化活动'
              : 'Discover our upcoming concerts and cultural events'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const title = isZh ? event.titleZh : event.title;
            const venue = isZh ? event.venueZh : event.venue;
            const description = isZh ? event.descriptionZh : event.description;

            return (
              <Link key={event.id} href={`/events/${event.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-muted">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <CalendarDays className="size-12 text-primary/30" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant={event.ticketPrice > 0 ? 'default' : 'secondary'}>
                        {event.ticketPrice > 0 ? `$${event.ticketPrice}` : isZh ? '免费' : 'Free'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="size-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span>{venue}</span>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
