'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { instruments } from '@/lib/data';
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
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  { en: 'Choose Instrument', zh: '选择乐器' },
  { en: 'Your Info', zh: '您的信息' },
  { en: 'Confirm', zh: '确认' },
];

const campuses = [
  { id: 'chatswood', name: 'Chatswood', nameZh: 'Chatswood校区' },
  { id: 'burwood', name: 'Burwood', nameZh: 'Burwood校区' },
];

const experienceLevels = [
  { id: 'beginner', name: 'Beginner', nameZh: '初学者' },
  { id: 'intermediate', name: 'Intermediate', nameZh: '中级' },
  { id: 'advanced', name: 'Advanced', nameZh: '高级' },
];

export default function BookingPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [campus, setCampus] = useState('');
  const [message, setMessage] = useState('');

  const canProceedStep0 = selectedInstrument !== '';
  const canProceedStep1 = name !== '' && email !== '' && phone !== '' && campus !== '';

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">
              {isZh ? '预约试课' : 'Book a Trial Lesson'}
            </h1>
          </div>
        </section>
        <section className="container mx-auto flex items-center justify-center px-4 py-24">
          <Card className="mx-auto max-w-md text-center">
            <CardContent className="space-y-4 py-8">
              <CheckCircle className="mx-auto size-16 text-green-600" />
              <h2 className="text-2xl font-bold">
                {isZh ? '预约提交成功！' : 'Booking Submitted!'}
              </h2>
              <p className="text-muted-foreground">
                {isZh
                  ? '感谢您的预约，我们会尽快与您联系确认试课详情。'
                  : 'Thank you for your booking. We will contact you shortly to confirm your trial lesson details.'}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  const selectedInstrumentData = instruments.find((i) => i.id === selectedInstrument);

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            {isZh ? '预约试课' : 'Book a Trial Lesson'}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {isZh
              ? '三步完成预约，开启您的中乐之旅'
              : 'Complete your booking in 3 simple steps'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        {/* Step Indicator */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={index} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full text-sm font-bold ${
                      index <= step
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-xs font-medium">
                    {isZh ? s.zh : s.en}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      index < step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Step 0: Choose Instrument */}
          {step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isZh ? '选择您想学习的乐器' : 'Choose Your Instrument'}
                </CardTitle>
                <CardDescription>
                  {isZh
                    ? '请从下方选择一种乐器开始'
                    : 'Select an instrument to get started'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {instruments.map((instrument) => (
                    <button
                      key={instrument.id}
                      onClick={() => setSelectedInstrument(instrument.id)}
                      className={`rounded-xl border-2 p-4 text-center transition-all hover:border-primary/50 ${
                        selectedInstrument === instrument.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <span className="text-2xl">{instrument.icon}</span>
                      <p className="mt-1 text-sm font-medium">
                        {isZh ? instrument.nameZh : instrument.name}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={() => setStep(1)}
                    disabled={!canProceedStep0}
                    size="lg"
                  >
                    {isZh ? '下一步' : 'Next'}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Your Info */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isZh ? '您的信息' : 'Your Information'}
                </CardTitle>
                <CardDescription>
                  {isZh
                    ? '请填写您的联系信息'
                    : 'Please fill in your contact details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {isZh ? '姓名' : 'Name'} *
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isZh ? '请输入您的姓名' : 'Enter your full name'}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {isZh ? '电子邮箱' : 'Email'} *
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isZh ? '请输入邮箱地址' : 'Enter your email'}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {isZh ? '电话' : 'Phone'} *
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isZh ? '请输入电话号码' : 'Enter your phone number'}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {isZh ? '年龄' : 'Age'}
                    </label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder={isZh ? '请输入年龄' : 'Enter your age'}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {isZh ? '演奏经验' : 'Experience Level'}
                    </label>
                    <Select value={experience} onValueChange={(val) => val && setExperience(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={isZh ? '请选择经验水平' : 'Select experience level'} />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {isZh ? level.nameZh : level.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {isZh ? '校区' : 'Campus'} *
                    </label>
                    <Select value={campus} onValueChange={(val) => val && setCampus(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={isZh ? '请选择校区' : 'Select campus'} />
                      </SelectTrigger>
                      <SelectContent>
                        {campuses.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {isZh ? c.nameZh : c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {isZh ? '留言' : 'Message'}
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        isZh
                          ? '任何问题或特别需求...'
                          : 'Any questions or special requirements...'
                      }
                      rows={4}
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(0)} size="lg">
                    <ArrowLeft className="mr-2 size-4" />
                    {isZh ? '上一步' : 'Back'}
                  </Button>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    size="lg"
                  >
                    {isZh ? '下一步' : 'Next'}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Confirm */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isZh ? '确认预约信息' : 'Confirm Your Booking'}
                </CardTitle>
                <CardDescription>
                  {isZh
                    ? '请检查以下信息是否正确'
                    : 'Please review your booking details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 rounded-xl bg-muted/50 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {isZh ? '乐器' : 'Instrument'}
                      </p>
                      <p className="font-medium">
                        {selectedInstrumentData
                          ? isZh
                            ? selectedInstrumentData.nameZh
                            : selectedInstrumentData.name
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {isZh ? '校区' : 'Campus'}
                      </p>
                      <p className="font-medium">
                        {campuses.find((c) => c.id === campus)?.[isZh ? 'nameZh' : 'name'] || '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {isZh ? '姓名' : 'Name'}
                      </p>
                      <p className="font-medium">{name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {isZh ? '邮箱' : 'Email'}
                      </p>
                      <p className="font-medium">{email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {isZh ? '电话' : 'Phone'}
                      </p>
                      <p className="font-medium">{phone}</p>
                    </div>
                    {age && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isZh ? '年龄' : 'Age'}
                        </p>
                        <p className="font-medium">{age}</p>
                      </div>
                    )}
                    {experience && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isZh ? '经验' : 'Experience'}
                        </p>
                        <p className="font-medium">
                          {experienceLevels.find((l) => l.id === experience)?.[
                            isZh ? 'nameZh' : 'name'
                          ] || '-'}
                        </p>
                      </div>
                    )}
                  </div>
                  {message && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground">
                        {isZh ? '留言' : 'Message'}
                      </p>
                      <p className="mt-1 font-medium">{message}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} size="lg">
                    <ArrowLeft className="mr-2 size-4" />
                    {isZh ? '上一步' : 'Back'}
                  </Button>
                  <Button onClick={handleSubmit} size="lg">
                    {isZh ? '提交预约' : 'Submit Booking'}
                    <CheckCircle className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
