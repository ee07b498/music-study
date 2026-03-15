'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Music, Users, Music2, CheckCircle, Send } from 'lucide-react';

const services = [
  {
    icon: Music,
    title: 'Solo Performance',
    titleZh: '独奏表演',
    description:
      'A single musician performing traditional Chinese music on instruments such as guzheng, erhu, pipa, or dizi. Ideal for intimate gatherings, corporate events, and private functions.',
    descriptionZh:
      '一位音乐家演奏古筝、二胡、琵琶或笛子等传统中国乐器独奏。适合私密聚会、企业活动和私人宴会。',
    priceRange: 'From $300',
    priceRangeZh: '从$300起',
  },
  {
    icon: Users,
    title: 'Ensemble Performance',
    titleZh: '合奏表演',
    description:
      'A small group of 2-5 musicians performing a curated repertoire of traditional and contemporary Chinese music. Perfect for weddings, festivals, and cultural celebrations.',
    descriptionZh:
      '2-5位音乐家组成的小型乐团，演奏精选的传统及当代中国音乐曲目。适合婚礼、节日和文化庆典。',
    priceRange: 'From $800',
    priceRangeZh: '从$800起',
  },
  {
    icon: Music2,
    title: 'Orchestra Performance',
    titleZh: '乐团演出',
    description:
      'Our full Chinese orchestra featuring a wide range of traditional instruments. A grand experience for large-scale events, galas, and concert collaborations.',
    descriptionZh:
      '我们的完整中国乐团，涵盖多种传统乐器。适合大型活动、晚宴和音乐会合作。',
    priceRange: 'From $3,000',
    priceRangeZh: '从$3,000起',
  },
];

export default function PerformanceHirePage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [submitted, setSubmitted] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formServiceType, setFormServiceType] = useState('');
  const [formEventDate, setFormEventDate] = useState('');
  const [formMessage, setFormMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            {isZh ? '演出服务' : 'Performance Hire'}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {isZh
              ? '为您的活动增添中国音乐的魅力'
              : 'Bring the beauty of Chinese music to your event'}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">
          {isZh ? '我们的服务' : 'Our Services'}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          {isZh
            ? '从独奏到乐团，我们提供各种规模的演出服务'
            : 'From solo performances to full orchestras, we offer services for events of any scale'}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="flex h-full flex-col">
                <CardHeader>
                  <div className="mb-3 flex size-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {isZh ? service.titleZh : service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm text-muted-foreground">
                    {isZh ? service.descriptionZh : service.description}
                  </p>
                  <p className="mt-4 text-lg font-bold text-primary">
                    {isZh ? service.priceRangeZh : service.priceRange}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              {isZh ? '咨询预约' : 'Make an Inquiry'}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-center text-muted-foreground">
              {isZh
                ? '告诉我们您的活动详情，我们会尽快与您联系'
                : 'Tell us about your event and we will get back to you shortly'}
            </p>

            {submitted ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="mx-auto size-16 text-green-600" />
                  <h3 className="mt-4 text-2xl font-bold">
                    {isZh ? '咨询已提交！' : 'Inquiry Submitted!'}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {isZh
                      ? '感谢您的咨询，我们会在1-2个工作日内与您联系。'
                      : 'Thank you for your inquiry. We will contact you within 1-2 business days.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {isZh ? '姓名' : 'Name'} *
                      </label>
                      <Input
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={isZh ? '请输入您的姓名' : 'Your name'}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {isZh ? '邮箱' : 'Email'} *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder={isZh ? '请输入邮箱' : 'Your email'}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {isZh ? '电话' : 'Phone'}
                      </label>
                      <Input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder={isZh ? '请输入电话号码' : 'Your phone number'}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {isZh ? '服务类型' : 'Service Type'} *
                      </label>
                      <Select value={formServiceType} onValueChange={(val) => val && setFormServiceType(val)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={isZh ? '请选择服务类型' : 'Select service type'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solo">
                            {isZh ? '独奏表演' : 'Solo Performance'}
                          </SelectItem>
                          <SelectItem value="ensemble">
                            {isZh ? '合奏表演' : 'Ensemble Performance'}
                          </SelectItem>
                          <SelectItem value="orchestra">
                            {isZh ? '乐团演出' : 'Orchestra Performance'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {isZh ? '活动日期' : 'Event Date'}
                      </label>
                      <Input
                        type="date"
                        value={formEventDate}
                        onChange={(e) => setFormEventDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {isZh ? '活动详情' : 'Event Details'} *
                      </label>
                      <Textarea
                        required
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder={
                          isZh
                            ? '请描述您的活动类型、地点、预算等信息...'
                            : 'Describe your event type, venue, budget, etc...'
                        }
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 size-4" />
                      {isZh ? '提交咨询' : 'Submit Inquiry'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
