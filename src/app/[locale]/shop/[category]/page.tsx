import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { shopCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return shopCategories.map((cat) => ({ category: cat.id }));
}

const placeholderProducts: Record<
  string,
  Array<{ id: string; name: string; nameZh: string; price: string; priceZh: string; inquiry: boolean }>
> = {
  instruments: [
    { id: 'guzheng-beginner', name: 'Guzheng - Beginner', nameZh: '古筝 - 初学者', price: 'From $800', priceZh: '从$800起', inquiry: true },
    { id: 'erhu-standard', name: 'Erhu - Standard', nameZh: '二胡 - 标准', price: 'From $300', priceZh: '从$300起', inquiry: true },
    { id: 'pipa-professional', name: 'Pipa - Professional', nameZh: '琵琶 - 专业', price: 'From $1,200', priceZh: '从$1,200起', inquiry: true },
    { id: 'dizi-set', name: 'Dizi Set', nameZh: '笛子套装', price: '$120', priceZh: '$120', inquiry: false },
    { id: 'hulusi-beginner', name: 'Hulusi - Beginner', nameZh: '葫芦丝 - 初学者', price: '$80', priceZh: '$80', inquiry: false },
    { id: 'yangqin-standard', name: 'Yangqin - Standard', nameZh: '扬琴 - 标准', price: 'From $1,500', priceZh: '从$1,500起', inquiry: true },
  ],
  hanfu: [
    { id: 'hanfu-women-classic', name: 'Women\'s Classic Hanfu', nameZh: '女士经典汉服', price: '$50/day', priceZh: '$50/天', inquiry: false },
    { id: 'hanfu-men-traditional', name: 'Men\'s Traditional Hanfu', nameZh: '男士传统汉服', price: '$50/day', priceZh: '$50/天', inquiry: false },
    { id: 'hanfu-children', name: 'Children\'s Hanfu', nameZh: '儿童汉服', price: '$35/day', priceZh: '$35/天', inquiry: false },
    { id: 'hanfu-premium', name: 'Premium Embroidered Hanfu', nameZh: '高级刺绣汉服', price: '$80/day', priceZh: '$80/天', inquiry: false },
  ],
  'performance-wear': [
    { id: 'perf-dress-red', name: 'Red Performance Dress', nameZh: '红色演出服', price: '$150', priceZh: '$150', inquiry: false },
    { id: 'perf-dress-blue', name: 'Blue Silk Performance Dress', nameZh: '蓝色丝绸演出服', price: '$180', priceZh: '$180', inquiry: false },
    { id: 'perf-dress-gold', name: 'Gold Embroidered Dress', nameZh: '金色刺绣演出服', price: '$220', priceZh: '$220', inquiry: false },
    { id: 'perf-suit-men', name: 'Men\'s Performance Suit', nameZh: '男士演出服', price: '$160', priceZh: '$160', inquiry: false },
  ],
  'practice-room': [
    { id: 'room-standard', name: 'Standard Practice Room', nameZh: '标准琴房', price: '$20/hour', priceZh: '$20/小时', inquiry: false },
    { id: 'room-ensemble', name: 'Ensemble Practice Room', nameZh: '合奏练习室', price: '$40/hour', priceZh: '$40/小时', inquiry: false },
    { id: 'room-recording', name: 'Recording Studio', nameZh: '录音室', price: '$60/hour', priceZh: '$60/小时', inquiry: true },
  ],
};

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}) {
  const { category: categoryId } = await params;
  const category = shopCategories.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  return <CategoryContent category={category} />;
}

function CategoryContent({
  category,
}: {
  category: (typeof shopCategories)[number];
}) {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const name = isZh ? category.nameZh : category.name;
  const description = isZh ? category.descriptionZh : category.description;
  const products = placeholderProducts[category.id] || [];

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link
            href="/shop"
            className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" />
            {isZh ? '返回商店' : 'Back to Shop'}
          </Link>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">{name}</h1>
          <p className="mt-4 text-lg text-primary-foreground/80">{description}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="flex h-full flex-col">
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-muted">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <ShoppingBag className="size-10 text-primary/30" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isZh ? product.nameZh : product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {isZh ? product.priceZh : product.price}
                  </Badge>
                </div>
                <Button className="w-full" variant={product.inquiry ? 'outline' : 'default'}>
                  {product.inquiry
                    ? isZh
                      ? '咨询详情'
                      : 'Inquire'
                    : isZh
                      ? '加入购物车'
                      : 'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
