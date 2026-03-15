'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Mail, Phone, MapPin, Music, Calendar,
  BookOpen, Clock, GraduationCap, Plus, Save
} from 'lucide-react';

interface StudentDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  instrument: string;
  level: string;
  campus: string;
  joinedDate: string;
  status: 'active' | 'inactive' | 'trial';
  lessonsCompleted: number;
  nextLesson: string | null;
  bio: string;
}

interface LessonRecord {
  id: string;
  date: string;
  time: string;
  duration: string;
  status: 'completed' | 'missed' | 'cancelled' | 'scheduled';
  notes: string;
  homework: string;
}

interface ProgressNote {
  id: string;
  date: string;
  content: string;
  author: string;
}

const mockStudent: StudentDetail = {
  id: '1',
  name: 'Emily Chen',
  email: 'emily.chen@email.com',
  phone: '0412 345 678',
  instrument: 'Guzheng',
  level: 'Intermediate',
  campus: 'Burwood',
  joinedDate: '2025-03-15',
  status: 'active',
  lessonsCompleted: 32,
  nextLesson: '2026-03-16 09:00',
  bio: 'Emily started learning Guzheng in March 2025. She has shown great progress and is currently working on Grade 5 repertoire. Particularly talented in expressive playing and memorization.',
};

const mockLessons: LessonRecord[] = [
  { id: '1', date: '2026-03-15', time: '09:00', duration: '45 min', status: 'completed', notes: 'Worked on "High Mountain Flowing Water". Good progress on tremolo technique. Left hand vibrato needs more practice.', homework: 'Practice tremolo exercise 3x daily. Review mm. 24-48 of High Mountain Flowing Water.' },
  { id: '2', date: '2026-03-08', time: '09:00', duration: '45 min', status: 'completed', notes: 'Reviewed Grade 5 scale patterns. Started new piece "Fishing Boat Sings Late".', homework: 'Memorize first page of Fishing Boat Sings Late. Practice scales in D major and G major.' },
  { id: '3', date: '2026-03-01', time: '09:00', duration: '45 min', status: 'completed', notes: 'Completed Grade 5 technique exercises. Excellent performance of "Spring River Flower Moon Night".', homework: 'Prepare Spring River Flower Moon Night for recording. Start sight-reading Grade 5 etudes.' },
  { id: '4', date: '2026-02-22', time: '09:00', duration: '45 min', status: 'missed', notes: '', homework: '' },
  { id: '5', date: '2026-02-15', time: '09:00', duration: '45 min', status: 'completed', notes: 'Good practice on arpeggios and finger exercises. Dynamics improving.', homework: 'Focus on pp to ff dynamic range in Etude No.4. Practice sight-reading 15 min daily.' },
  { id: '6', date: '2026-02-08', time: '09:00', duration: '45 min', status: 'completed', notes: 'Worked on intonation and phrasing. Reviewed performance posture.', homework: 'Record yourself playing Etude No.3. Compare and note areas for improvement.' },
  { id: '7', date: '2026-03-22', time: '09:00', duration: '45 min', status: 'scheduled', notes: '', homework: '' },
];

const mockNotes: ProgressNote[] = [
  { id: '1', date: '2026-03-15', content: 'Emily is progressing well through the intermediate curriculum. Her tremolo has improved significantly over the past month. Ready to begin preparation for Grade 5 exam.', author: 'Teacher' },
  { id: '2', date: '2026-02-28', content: 'Monthly review: Emily has maintained consistent practice habits. Her sight-reading has improved but still needs work on complex rhythms. Recommend additional theory study.', author: 'Teacher' },
  { id: '3', date: '2026-01-31', content: 'Completed first semester review. Emily shows strong musical aptitude and dedication. Consider enrolling in the upcoming ensemble program for additional performance experience.', author: 'Teacher' },
];

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [student, setStudent] = useState<StudentDetail>(mockStudent);
  const [lessons, setLessons] = useState<LessonRecord[]>(mockLessons);
  const [notes, setNotes] = useState<ProgressNote[]>(mockNotes);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`/api/teacher/students/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.student) setStudent(data.student);
          if (data.lessons) setLessons(data.lessons);
          if (data.notes) setNotes(data.notes);
        }
      } catch {
        // Use mock data
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [id]);

  function handleAddNote() {
    if (!newNote.trim()) return;
    setSavingNote(true);
    const note: ProgressNote = {
      id: `new-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      content: newNote.trim(),
      author: 'Teacher',
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote('');
    setSavingNote(false);
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'missed': return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-muted text-muted-foreground';
    }
  }

  if (loading) {
    return (
      <DashboardShell role="teacher" userName="Teacher Name">
        <div className="space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 rounded bg-muted" />
            <div className="h-40 rounded-xl bg-muted" />
            <div className="h-60 rounded-xl bg-muted" />
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="teacher" userName="Teacher Name">
      <div className="space-y-6">
        {/* Back link */}
        <Link
          href="/dashboard/teacher/students"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Students
        </Link>

        {/* Student info card */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0 mx-auto sm:mx-0">
                {student.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">{student.name}</h1>
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{student.bio}</p>
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Music className="size-3" />{student.instrument} - {student.level}</span>
                  <span className="flex items-center gap-1"><MapPin className="size-3" />{student.campus}</span>
                  <span className="flex items-center gap-1"><Mail className="size-3" />{student.email}</span>
                  <span className="flex items-center gap-1"><Phone className="size-3" />{student.phone}</span>
                  <span className="flex items-center gap-1"><Calendar className="size-3" />Joined {student.joinedDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-2 text-center">
              <BookOpen className="size-5 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{student.lessonsCompleted}</div>
              <div className="text-xs text-muted-foreground">Lessons Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2 text-center">
              <GraduationCap className="size-5 text-amber-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{student.level}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2 text-center">
              <Clock className="size-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">
                {lessons.filter((l) => l.status === 'completed').length}
              </div>
              <div className="text-xs text-muted-foreground">This Term</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-2 text-center">
              <Calendar className="size-5 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-bold text-foreground">
                {student.nextLesson ? new Date(student.nextLesson).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }) : 'None'}
              </div>
              <div className="text-xs text-muted-foreground">Next Lesson</div>
            </CardContent>
          </Card>
        </div>

        {/* Lesson History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              Lesson History
            </CardTitle>
            <CardDescription>
              Recent and upcoming lesson records for {student.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Time</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Notes</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Homework</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr key={lesson.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-3">
                        <div className="font-medium text-foreground">
                          {new Date(lesson.date).toLocaleDateString('en-AU', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground sm:hidden">{lesson.time} ({lesson.duration})</div>
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        <span className="text-muted-foreground">{lesson.time}</span>
                        <span className="text-xs text-muted-foreground/70 ml-1">({lesson.duration})</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusColor(lesson.status)}`}>
                          {lesson.status}
                        </span>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <p className="text-xs text-muted-foreground line-clamp-2 max-w-xs">
                          {lesson.notes || <span className="italic text-muted-foreground/50">No notes</span>}
                        </p>
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <p className="text-xs text-muted-foreground line-clamp-2 max-w-xs">
                          {lesson.homework || <span className="italic text-muted-foreground/50">No homework</span>}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Progress Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />
              Progress Notes
            </CardTitle>
            <CardDescription>
              Track this student&apos;s progress and milestones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add new note */}
            <div className="mb-6">
              <Textarea
                placeholder="Write a progress note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleAddNote}
                  disabled={!newNote.trim() || savingNote}
                  size="sm"
                >
                  <Save className="size-3 mr-1" />
                  {savingNote ? 'Saving...' : 'Save Note'}
                </Button>
              </div>
            </div>

            <Separator className="mb-4" />

            {/* Notes list */}
            {notes.length === 0 ? (
              <div className="text-center py-8">
                <GraduationCap className="size-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No progress notes yet. Add your first note above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-foreground">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
