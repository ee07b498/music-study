import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { events } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, ArrowLeft, Ticket } from 'lucide-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailContent event={event} />;
}

function EventDetailContent({
  event,
}: {
  event: (typeof events)[number];
}) {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const title = isZh ? event.titleZh : event.title;
  const venue = isZh ? event.venueZh : event.venue;
  const description = isZh ? event.descriptionZh : event.description;

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" />
            {isZh ? '返回活动列表' : 'Back to Events'}
          </Link>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
          <div className="mt-4">
            <Badge variant={event.ticketPrice > 0 ? 'default' : 'secondary'} className="bg-white/20 text-white">
              {event.ticketPrice > 0
                ? `$${event.ticketPrice}`
                : isZh
                  ? '免费入场'
                  : 'Free Entry'}
            </Badge>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 h-64 w-full overflow-hidden rounded-xl bg-muted md:h-96">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <CalendarDays className="size-16 text-primary/30" />
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold">{isZh ? '活动详情' : 'Event Details'}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="space-y-6">
                <h3 className="text-xl font-bold">{isZh ? '活动信息' : 'Event Info'}</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="font-medium">{isZh ? '日期' : 'Date'}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="font-medium">{isZh ? '时间' : 'Time'}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="font-medium">{isZh ? '地点' : 'Venue'}</p>
                      <p className="text-sm text-muted-foreground">{venue}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Ticket className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="font-medium">{isZh ? '票价' : 'Ticket Price'}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.ticketPrice > 0
                          ? `$${event.ticketPrice} AUD`
                          : isZh
                            ? '免费入场'
                            : 'Free Entry'}
                      </p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  {event.ticketPrice > 0
                    ? isZh
                      ? '购买门票'
                      : 'Get Tickets'
                    : isZh
                      ? '免费入场'
                      : 'Free Entry'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
