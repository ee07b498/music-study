'use client';

import { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';

type Student = {
  id: string;
  name: string;
  email: string;
  parent: string;
  age: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  courses: string[];
  campus: string;
};

const initialStudents: Student[] = [
  { id: 'S-001', name: 'Emily Chen', email: 'emily.chen@email.com', parent: 'David Chen', age: 12, level: 'Intermediate', courses: ['Guzheng'], campus: 'Chatswood' },
  { id: 'S-002', name: 'James Wang', email: 'james.wang@email.com', parent: 'Sarah Wang', age: 10, level: 'Beginner', courses: ['Erhu'], campus: 'Chatswood' },
  { id: 'S-003', name: 'Sophie Liu', email: 'sophie.liu@email.com', parent: 'Michael Liu', age: 15, level: 'Advanced', courses: ['Pipa', 'Guzheng'], campus: 'Burwood' },
  { id: 'S-004', name: 'Oliver Zhang', email: 'oliver.z@email.com', parent: 'Grace Zhang', age: 8, level: 'Beginner', courses: ['Dizi'], campus: 'Burwood' },
  { id: 'S-005', name: 'Mia Huang', email: 'mia.huang@email.com', parent: 'Kevin Huang', age: 14, level: 'Intermediate', courses: ['Guzheng', 'Guqin'], campus: 'Chatswood' },
  { id: 'S-006', name: 'Liam Xu', email: 'liam.xu@email.com', parent: 'Jenny Xu', age: 11, level: 'Beginner', courses: ['Erhu'], campus: 'Burwood' },
  { id: 'S-007', name: 'Chloe Lin', email: 'chloe.lin@email.com', parent: 'Tony Lin', age: 16, level: 'Advanced', courses: ['Pipa', 'Zhongruan'], campus: 'Chatswood' },
  { id: 'S-008', name: 'Noah Wu', email: 'noah.wu@email.com', parent: 'Amy Wu', age: 9, level: 'Beginner', courses: ['Hulusi'], campus: 'Burwood' },
];

const levelColor: Record<string, string> = {
  Beginner: 'bg-blue-100 text-blue-800 border-blue-200',
  Intermediate: 'bg-amber-100 text-amber-800 border-amber-200',
  Advanced: 'bg-purple-100 text-purple-800 border-purple-200',
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formParent, setFormParent] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formLevel, setFormLevel] = useState<string>('Beginner');
  const [formCourses, setFormCourses] = useState('');
  const [formCampus, setFormCampus] = useState('Chatswood');

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.parent.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || s.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormParent('');
    setFormAge('');
    setFormLevel('Beginner');
    setFormCourses('');
    setFormCampus('Chatswood');
  };

  const handleAdd = () => {
    if (!formName || !formEmail) return;
    const newStudent: Student = {
      id: `S-${String(students.length + 1).padStart(3, '0')}`,
      name: formName,
      email: formEmail,
      parent: formParent,
      age: parseInt(formAge) || 0,
      level: formLevel as Student['level'],
      courses: formCourses.split(',').map((s) => s.trim()).filter(Boolean),
      campus: formCampus,
    };
    setStudents([...students, newStudent]);
    resetForm();
    setAddOpen(false);
  };

  const handleEdit = () => {
    if (!editingStudent || !formName || !formEmail) return;
    setStudents(students.map((s) =>
      s.id === editingStudent.id
        ? {
            ...s,
            name: formName,
            email: formEmail,
            parent: formParent,
            age: parseInt(formAge) || 0,
            level: formLevel as Student['level'],
            courses: formCourses.split(',').map((c) => c.trim()).filter(Boolean),
            campus: formCampus,
          }
        : s
    ));
    resetForm();
    setEditOpen(false);
    setEditingStudent(null);
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setFormName(student.name);
    setFormEmail(student.email);
    setFormParent(student.parent);
    setFormAge(String(student.age));
    setFormLevel(student.level);
    setFormCourses(student.courses.join(', '));
    setFormCampus(student.campus);
    setEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const formFields = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground">Student Name</label>
        <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Full name" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Email</label>
        <Input value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="email@example.com" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Parent/Guardian Name</label>
        <Input value={formParent} onChange={(e) => setFormParent(e.target.value)} placeholder="Parent name" className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Age</label>
          <Input value={formAge} onChange={(e) => setFormAge(e.target.value)} placeholder="10" type="number" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Level</label>
          <Select value={formLevel} onValueChange={(val) => val && setFormLevel(val)}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Enrolled Courses (comma-separated)</label>
        <Input value={formCourses} onChange={(e) => setFormCourses(e.target.value)} placeholder="Guzheng, Erhu" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Campus</label>
        <Select value={formCampus} onValueChange={(val) => val && setFormCampus(val)}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Chatswood">Chatswood</SelectItem>
            <SelectItem value="Burwood">Burwood</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <DashboardShell role="admin" userName="Admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
            <p className="text-sm text-muted-foreground">View and manage all enrolled students.</p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger
              onClick={() => { resetForm(); setAddOpen(true); }}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
            >
              <Plus className="size-4" />
              Add Student
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              {formFields}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd}>Add Student</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={levelFilter} onValueChange={(val) => val && setLevelFilter(val)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No students found matching your criteria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Name</th>
                      <th className="pb-3 pr-4 font-medium">Email</th>
                      <th className="pb-3 pr-4 font-medium">Parent</th>
                      <th className="pb-3 pr-4 font-medium">Age</th>
                      <th className="pb-3 pr-4 font-medium">Level</th>
                      <th className="pb-3 pr-4 font-medium">Courses</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((student) => (
                      <tr key={student.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{student.name}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{student.email}</td>
                        <td className="py-3 pr-4">{student.parent}</td>
                        <td className="py-3 pr-4">{student.age}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelColor[student.level]}`}>
                            {student.level}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {student.courses.map((course) => (
                              <Badge key={course} variant="secondary">{course}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon-sm" onClick={() => openEdit(student)}>
                              <Pencil className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(student.id)}>
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            {formFields}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => { setEditOpen(false); setEditingStudent(null); }}>Cancel</Button>
              <Button onClick={handleEdit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}
