import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { shopCategories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function ShopPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            {isZh ? '商店' : 'Shop'}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {isZh
              ? '乐器、服装及练习室租赁'
              : 'Instruments, attire, and practice room rentals'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {shopCategories.map((category) => {
            const name = isZh ? category.nameZh : category.name;
            const description = isZh ? category.descriptionZh : category.description;

            return (
              <Link key={category.id} href={`/shop/${category.id}`}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <div className="relative h-56 w-full overflow-hidden rounded-t-xl bg-muted">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <ShoppingBag className="size-14 text-primary/30" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{name}</CardTitle>
                    <CardDescription className="mt-2 text-base">{description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {isZh ? '浏览商品' : 'Browse Category'}
                      <ArrowRight className="size-4" />
                    </span>
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
