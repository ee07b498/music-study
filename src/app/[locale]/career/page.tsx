import { useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Music, Users, GraduationCap, Globe, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Music,
    title: 'Musical Excellence',
    titleZh: '追求卓越',
    description: 'Work alongside passionate musicians dedicated to preserving and sharing traditional Chinese music.',
    descriptionZh: '与热爱传统中国音乐的音乐家们并肩工作，共同传承和分享。',
  },
  {
    icon: Users,
    title: 'Supportive Community',
    titleZh: '温暖社区',
    description: 'Join a close-knit team that values collaboration, growth, and mutual respect.',
    descriptionZh: '加入一个重视合作、成长和相互尊重的紧密团队。',
  },
  {
    icon: GraduationCap,
    title: 'Professional Development',
    titleZh: '职业发展',
    description: 'Opportunities for continuous learning, masterclasses, and career advancement.',
    descriptionZh: '持续学习、大师班和职业发展的机会。',
  },
  {
    icon: Globe,
    title: 'Cultural Impact',
    titleZh: '文化影响',
    description: 'Make a meaningful impact by bridging Eastern and Western musical traditions in Australia.',
    descriptionZh: '在澳大利亚搭建东西方音乐传统的桥梁，产生深远文化影响。',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    titleZh: '工作生活平衡',
    description: 'Flexible scheduling options that support a healthy work-life balance.',
    descriptionZh: '灵活的排课选项，支持健康的工作生活平衡。',
  },
  {
    icon: Sparkles,
    title: 'Performance Opportunities',
    titleZh: '演出机会',
    description: 'Regular opportunities to perform in concerts, festivals, and community events.',
    descriptionZh: '定期参与音乐会、节日和社区活动演出的机会。',
  },
];

export default function CareerPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            {isZh ? '加入芈雅' : 'Join Meya'}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {isZh
              ? '与我们一起传承和传播中国音乐之美'
              : 'Help us preserve and share the beauty of Chinese music'}
          </p>
        </div>
      </section>

      {/* Why Join Meya */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">
          {isZh ? '为什么加入芈雅？' : 'Why Join Meya?'}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          {isZh
            ? '芈雅中乐学院是一个充满活力和热情的团队，致力于在澳大利亚推广中国音乐教育。'
            : 'Meya Conservatory is a vibrant and passionate team dedicated to promoting Chinese music education in Australia.'}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <CardTitle>{isZh ? benefit.titleZh : benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {isZh ? benefit.descriptionZh : benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold">
            {isZh ? '开放职位' : 'Open Positions'}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            {isZh
              ? '查看我们目前的招聘信息'
              : 'Check out our current openings'}
          </p>

          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="py-12 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                    <Users className="size-8 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">
                  {isZh ? '暂无开放职位' : 'No Open Positions'}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {isZh
                    ? '目前没有开放的职位，但我们随时欢迎有才华的音乐家加入。请发送您的简历至 info@meyamusic.com.au'
                    : 'There are no open positions at the moment, but we always welcome talented musicians. Please send your CV to info@meyamusic.com.au'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
