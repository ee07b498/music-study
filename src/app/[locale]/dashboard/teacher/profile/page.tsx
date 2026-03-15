'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save, User } from 'lucide-react';

export default function TeacherProfilePage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Meya Dong',
    nameZh: '董芈雅',
    email: 'meya@meyamusic.com.au',
    phone: '+61 400 123 456',
    bio: 'Meya Dong is the founder and director of the Meya Conservatory of Chinese Music. With over 15 years of professional performance and teaching experience, she is passionate about sharing the beauty of Chinese wind instruments with students in Australia.',
    bioZh: '董芈雅是芈雅中乐学院的创始人和校长。拥有超过15年的专业演出和教学经验，她热衷于在澳大利亚与学生分享中国管乐器之美。',
  });

  const instruments = ['Dizi', 'Xiao', 'Hulusi'];
  const campuses = ['Chatswood', 'Burwood'];

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
  }

  return (
    <DashboardShell role="teacher" userName="Meya Dong">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your personal information and teaching profile</p>
        </div>

        {/* Avatar Section */}
        <Card className="mb-6">
          <CardContent className="flex items-center gap-6 py-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
              <User className="size-10 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{form.name}</h2>
              <p className="text-sm text-muted-foreground">{form.nameZh}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {instruments.map(i => (
                  <Badge key={i} variant="secondary">{i}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name (English)</label>
                <Input value={form.name} onChange={e => handleChange('name', e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name (Chinese)</label>
                <Input value={form.nameZh} onChange={e => handleChange('nameZh', e.target.value)} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Phone</label>
                <Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Biography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Bio (English)</label>
              <Textarea rows={4} value={form.bio} onChange={e => handleChange('bio', e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Bio (Chinese)</label>
              <Textarea rows={4} value={form.bioZh} onChange={e => handleChange('bioZh', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Teaching Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Teaching Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Instruments</label>
              <div className="flex flex-wrap gap-2">
                {instruments.map(i => (
                  <Badge key={i}>{i}</Badge>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">Contact admin to update your instrument list</p>
            </div>
            <Separator />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Campuses</label>
              <div className="flex flex-wrap gap-2">
                {campuses.map(c => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">Contact admin to update your campus assignments</p>
            </div>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex items-center justify-end gap-3">
          {saved && <span className="text-sm text-green-600">Changes saved successfully!</span>}
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 size-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
