'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Music, BookOpen, Clock, Star, MessageSquare,
  TrendingUp, Award, CalendarDays,
} from 'lucide-react';

// --- Mock Data ---
const instruments = [
  {
    id: 'guzheng',
    name: 'Guzheng',
    teacher: 'Ms. Wang Li',
    lessonsCompleted: 24,
    totalLessons: 40,
    currentLevel: 'Intermediate',
    nextMilestone: 'Grade 5 Exam Preparation',
    lastLesson: 'Mar 12, 2026',
  },
  {
    id: 'erhu',
    name: 'Erhu',
    teacher: 'Mr. Zhang Wei',
    lessonsCompleted: 8,
    totalLessons: 20,
    currentLevel: 'Beginner',
    nextMilestone: 'Basic Bowing Techniques',
    lastLesson: 'Mar 10, 2026',
  },
  {
    id: 'pipa',
    name: 'Pipa',
    teacher: 'Ms. Liu Mei',
    lessonsCompleted: 3,
    totalLessons: 10,
    currentLevel: 'Beginner',
    nextMilestone: 'Right Hand Picking Patterns',
    lastLesson: 'Mar 5, 2026',
  },
];

const teacherFeedback = [
  {
    id: 1,
    teacher: 'Ms. Wang Li',
    instrument: 'Guzheng',
    date: 'Mar 12, 2026',
    content:
      'Emily showed excellent improvement in tremolo technique today. She should focus on maintaining consistent speed during the second movement of "High Mountain, Flowing Water." Recommend practicing scales 15 minutes daily.',
    rating: 4,
  },
  {
    id: 2,
    teacher: 'Mr. Zhang Wei',
    instrument: 'Erhu',
    date: 'Mar 10, 2026',
    content:
      'Good progress on bowing control. The intonation on higher positions needs work. Please practice the D major scale slowly with a tuner before the next lesson.',
    rating: 3,
  },
  {
    id: 3,
    teacher: 'Ms. Wang Li',
    instrument: 'Guzheng',
    date: 'Mar 5, 2026',
    content:
      'We reviewed harmonics and glissando techniques today. Emily is ready to begin the new piece "Spring on the Snowy Mountain." Great enthusiasm as always!',
    rating: 5,
  },
  {
    id: 4,
    teacher: 'Ms. Liu Mei',
    instrument: 'Pipa',
    date: 'Mar 3, 2026',
    content:
      'First lesson on rolling technique. Emily picked it up quickly. Need to work on left hand positioning to avoid tension. Assigned finger exercises for daily practice.',
    rating: 3,
  },
];

const overallStats = {
  totalLessons: 35,
  totalHours: 28,
  instrumentsStudied: 3,
  monthsActive: 8,
};

export default function StudentProgressPage() {
  const [loading] = useState(false);

  if (loading) {
    return (
      <DashboardShell role="student" userName="Student Name">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading progress...</p>
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
          <h1 className="text-2xl font-bold text-foreground">Learning Progress</h1>
          <p className="mt-1 text-muted-foreground">
            Track your musical journey and review teacher feedback.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Lessons', value: overallStats.totalLessons, icon: BookOpen },
            { label: 'Hours Practiced', value: `${overallStats.totalHours}h`, icon: Clock },
            { label: 'Instruments', value: overallStats.instrumentsStudied, icon: Music },
            { label: 'Months Active', value: overallStats.monthsActive, icon: CalendarDays },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="instruments">
          <TabsList>
            <TabsTrigger value="instruments">Instrument Progress</TabsTrigger>
            <TabsTrigger value="feedback">Teacher Feedback</TabsTrigger>
            <TabsTrigger value="practice">Practice Log</TabsTrigger>
          </TabsList>

          {/* Instrument Progress */}
          <TabsContent value="instruments" className="mt-4 space-y-4">
            {instruments.map((inst) => {
              const progressPercent = Math.round(
                (inst.lessonsCompleted / inst.totalLessons) * 100
              );
              return (
                <Card key={inst.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Music className="size-5 text-primary" />
                          <h3 className="text-lg font-semibold text-foreground">{inst.name}</h3>
                          <Badge variant="secondary">{inst.currentLevel}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Teacher: {inst.teacher}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Last lesson: {inst.lastLesson}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {inst.lessonsCompleted} / {inst.totalLessons} lessons
                        </p>
                        <p className="text-2xl font-bold text-primary">{progressPercent}%</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <TrendingUp className="size-4 text-primary" />
                      <span className="text-muted-foreground">
                        Next milestone: {inst.nextMilestone}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Teacher Feedback */}
          <TabsContent value="feedback" className="mt-4 space-y-4">
            {teacherFeedback.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="mx-auto mb-3 size-10 text-muted-foreground" />
                  <p className="text-muted-foreground">No feedback received yet.</p>
                </CardContent>
              </Card>
            ) : (
              teacherFeedback.map((fb) => (
                <Card key={fb.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{fb.teacher}</h3>
                          <Badge variant="outline">{fb.instrument}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{fb.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${
                              i < fb.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <p className="text-sm leading-relaxed text-foreground">{fb.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Practice Log */}
          <TabsContent value="practice" className="mt-4">
            <Card>
              <CardContent className="py-16 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="size-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Practice Log Coming Soon</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  We are building a practice tracking feature where you can log your daily practice
                  sessions, set goals, and track your progress over time. Stay tuned!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
