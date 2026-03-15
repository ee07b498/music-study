'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCheck, BookOpen, Calendar, CreditCard, Info } from 'lucide-react';

type Notification = {
  id: string;
  type: 'BOOKING' | 'LESSON' | 'PAYMENT' | 'SYSTEM';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const mockNotifications: Notification[] = [
  { id: '1', type: 'BOOKING', title: 'New Booking Request', message: 'Lily Chen has requested a trial lesson for Guzheng on March 20, 2026.', read: false, createdAt: '2026-03-15T10:30:00' },
  { id: '2', type: 'LESSON', title: 'Lesson Completed', message: 'Your lesson with James Wang (Erhu) on March 14 has been marked as completed.', read: false, createdAt: '2026-03-14T17:00:00' },
  { id: '3', type: 'SYSTEM', title: 'Schedule Updated', message: 'Your schedule for next week has been confirmed by the admin.', read: false, createdAt: '2026-03-13T09:00:00' },
  { id: '4', type: 'BOOKING', title: 'Booking Confirmed', message: 'Emily Zhang\'s booking for Pipa lesson on March 18 has been confirmed.', read: true, createdAt: '2026-03-12T14:20:00' },
  { id: '5', type: 'PAYMENT', title: 'Payment Received', message: 'Payment of $80 received from James Wang for 2 lessons.', read: true, createdAt: '2026-03-11T11:00:00' },
  { id: '6', type: 'SYSTEM', title: 'Welcome to Meya!', message: 'Your teacher profile has been set up. You can now manage your schedule and students.', read: true, createdAt: '2026-03-01T08:00:00' },
];

const typeConfig = {
  BOOKING: { icon: Calendar, color: 'bg-blue-100 text-blue-700', label: 'Booking' },
  LESSON: { icon: BookOpen, color: 'bg-green-100 text-green-700', label: 'Lesson' },
  PAYMENT: { icon: CreditCard, color: 'bg-yellow-100 text-yellow-700', label: 'Payment' },
  SYSTEM: { icon: Info, color: 'bg-gray-100 text-gray-700', label: 'System' },
};

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  function markAsRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' });
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  }

  return (
    <DashboardShell role="teacher" userName="Meya Dong">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck className="mr-2 size-4" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;
            return (
              <Card
                key={notification.id}
                className={`transition-colors ${!notification.read ? 'border-primary/20 bg-primary/5' : ''}`}
              >
                <CardContent className="flex items-start gap-4 py-4">
                  <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${config.color}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {config.label}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{formatTime(notification.createdAt)}</span>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-7 text-xs"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="mx-auto mb-3 size-10 text-muted-foreground/40" />
              <p className="text-muted-foreground">No notifications yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
