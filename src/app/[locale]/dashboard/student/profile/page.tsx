'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Mail, Phone, Users, Calendar, Globe, Save, CheckCircle } from 'lucide-react';

// --- Mock Profile Data ---
const initialProfile = {
  firstName: 'Emily',
  lastName: 'Chen',
  email: 'emily.chen@example.com',
  phone: '+1 (555) 123-4567',
  parentName: 'David Chen',
  parentEmail: 'david.chen@example.com',
  parentPhone: '+1 (555) 987-6543',
  age: '14',
  language: 'en',
};

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  if (loading) {
    return (
      <DashboardShell role="student" userName="Student Name">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="student" userName="Emily Chen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </div>

        {/* Profile Avatar Section */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="size-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <p className="text-xs text-muted-foreground">Student account</p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-4 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <Input
                  value={profile.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <Input
                  value={profile.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5" />
                  Email Address
                </span>
              </label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" />
                  Phone Number
                </span>
              </label>
              <Input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  Age
                </span>
              </label>
              <Input
                type="number"
                value={profile.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="Age"
                min="3"
                max="100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Parent/Guardian Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-primary" />
              Parent / Guardian Information
            </CardTitle>
            <CardDescription>
              Contact details for parent or guardian (required for students under 18).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Parent / Guardian Name</label>
              <Input
                value={profile.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
                placeholder="Full name"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Parent Email</label>
                <Input
                  type="email"
                  value={profile.parentEmail}
                  onChange={(e) => handleChange('parentEmail', e.target.value)}
                  placeholder="parent@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Parent Phone</label>
                <Input
                  type="tel"
                  value={profile.parentPhone}
                  onChange={(e) => handleChange('parentPhone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="size-4 text-primary" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Language Preference</label>
              <Select
                value={profile.language}
                onValueChange={(val) => val && handleChange('language', val)}
              >
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                  <SelectItem value="zh-TW">Chinese (Traditional)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This affects the language of your dashboard and notifications.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <CheckCircle className="size-4" />
              Profile saved successfully!
            </span>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
