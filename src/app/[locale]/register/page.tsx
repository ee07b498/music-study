'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus } from 'lucide-react';

const roles = [
  { id: 'student', name: 'Student', nameZh: '学生' },
  { id: 'parent', name: 'Parent / Guardian', nameZh: '家长 / 监护人' },
  { id: 'teacher', name: 'Teacher', nameZh: '教师' },
];

export default function RegisterPage() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const passwordMismatch = confirmPassword !== '' && password !== confirmPassword;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) return;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isZh ? '注册账户' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {isZh
              ? '注册芈雅中乐学院账户'
              : 'Register for a Meya Conservatory account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {isZh ? '姓名' : 'Full Name'} *
              </label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isZh ? '请输入姓名' : 'Enter your full name'}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {isZh ? '邮箱' : 'Email'} *
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
                {isZh ? '电话' : 'Phone'} *
              </label>
              <Input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={isZh ? '请输入电话号码' : 'Enter your phone number'}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {isZh ? '角色' : 'Role'} *
              </label>
              <Select value={role} onValueChange={(val) => val && setRole(val)} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={isZh ? '请选择角色' : 'Select your role'} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {isZh ? r.nameZh : r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {isZh ? '密码' : 'Password'} *
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isZh ? '请输入密码' : 'Create a password'}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {isZh ? '确认密码' : 'Confirm Password'} *
              </label>
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={isZh ? '请再次输入密码' : 'Confirm your password'}
                aria-invalid={passwordMismatch}
              />
              {passwordMismatch && (
                <p className="mt-1 text-xs text-destructive">
                  {isZh ? '两次输入的密码不一致' : 'Passwords do not match'}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={passwordMismatch}>
              <UserPlus className="mr-2 size-4" />
              {isZh ? '注册' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isZh ? '已有账户？' : 'Already have an account?'}{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {isZh ? '登录' : 'Sign In'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
