'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isZh ? '登录' : 'Sign In'}
          </CardTitle>
          <CardDescription>
            {isZh
              ? '登录您的芈雅中乐学院账户'
              : 'Sign in to your Meya Conservatory account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {isZh ? '邮箱' : 'Email'}
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isZh ? '请输入邮箱' : 'Enter your email'}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {isZh ? '密码' : 'Password'}
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isZh ? '请输入密码' : 'Enter your password'}
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              <LogIn className="mr-2 size-4" />
              {isZh ? '登录' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isZh ? '还没有账户？' : "Don't have an account?"}{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              {isZh ? '注册' : 'Register'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
