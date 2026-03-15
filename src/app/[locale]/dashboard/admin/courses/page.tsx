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
import { Plus, Pencil, Power } from 'lucide-react';

type Course = {
  id: string;
  instrument: string;
  teacher: string;
  campus: string;
  price: number;
  duration: number;
  status: 'Active' | 'Inactive';
  level: string;
};

const initialCourses: Course[] = [
  { id: 'C-001', instrument: 'Guzheng', teacher: 'Li Wei', campus: 'Chatswood', price: 75, duration: 45, status: 'Active', level: 'All Levels' },
  { id: 'C-002', instrument: 'Guzheng', teacher: 'Li Wei', campus: 'Burwood', price: 75, duration: 45, status: 'Active', level: 'All Levels' },
  { id: 'C-003', instrument: 'Erhu', teacher: 'Zhang Hao', campus: 'Chatswood', price: 70, duration: 45, status: 'Active', level: 'Beginner' },
  { id: 'C-004', instrument: 'Erhu', teacher: 'Zhang Hao', campus: 'Chatswood', price: 80, duration: 60, status: 'Active', level: 'Advanced' },
  { id: 'C-005', instrument: 'Pipa', teacher: 'Chen Mei', campus: 'Burwood', price: 75, duration: 45, status: 'Active', level: 'All Levels' },
  { id: 'C-006', instrument: 'Dizi', teacher: 'Wang Jun', campus: 'Chatswood', price: 65, duration: 30, status: 'Inactive', level: 'Beginner' },
  { id: 'C-007', instrument: 'Dizi', teacher: 'Wang Jun', campus: 'Burwood', price: 65, duration: 30, status: 'Inactive', level: 'Beginner' },
  { id: 'C-008', instrument: 'Guqin', teacher: 'Li Wei', campus: 'Chatswood', price: 90, duration: 60, status: 'Active', level: 'Intermediate' },
  { id: 'C-009', instrument: 'Zhongruan', teacher: 'Chen Mei', campus: 'Burwood', price: 70, duration: 45, status: 'Active', level: 'All Levels' },
  { id: 'C-010', instrument: 'Hulusi', teacher: 'Wang Jun', campus: 'Burwood', price: 55, duration: 30, status: 'Inactive', level: 'Beginner' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [campusFilter, setCampusFilter] = useState('all');
  const [instrumentFilter, setInstrumentFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formInstrument, setFormInstrument] = useState('');
  const [formTeacher, setFormTeacher] = useState('');
  const [formCampus, setFormCampus] = useState('Chatswood');
  const [formPrice, setFormPrice] = useState('');
  const [formDuration, setFormDuration] = useState('45');
  const [formLevel, setFormLevel] = useState('All Levels');

  const instruments = Array.from(new Set(courses.map((c) => c.instrument)));

  const filtered = courses.filter((c) => {
    const matchesCampus = campusFilter === 'all' || c.campus === campusFilter;
    const matchesInstrument = instrumentFilter === 'all' || c.instrument === instrumentFilter;
    return matchesCampus && matchesInstrument;
  });

  const resetForm = () => {
    setFormInstrument('');
    setFormTeacher('');
    setFormCampus('Chatswood');
    setFormPrice('');
    setFormDuration('45');
    setFormLevel('All Levels');
  };

  const handleAdd = () => {
    if (!formInstrument || !formTeacher) return;
    const newCourse: Course = {
      id: `C-${String(courses.length + 1).padStart(3, '0')}`,
      instrument: formInstrument,
      teacher: formTeacher,
      campus: formCampus,
      price: parseFloat(formPrice) || 0,
      duration: parseInt(formDuration) || 45,
      status: 'Active',
      level: formLevel,
    };
    setCourses([...courses, newCourse]);
    resetForm();
    setAddOpen(false);
  };

  const handleEdit = () => {
    if (!editingCourse || !formInstrument || !formTeacher) return;
    setCourses(courses.map((c) =>
      c.id === editingCourse.id
        ? {
            ...c,
            instrument: formInstrument,
            teacher: formTeacher,
            campus: formCampus,
            price: parseFloat(formPrice) || 0,
            duration: parseInt(formDuration) || 45,
            level: formLevel,
          }
        : c
    ));
    resetForm();
    setEditOpen(false);
    setEditingCourse(null);
  };

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setFormInstrument(course.instrument);
    setFormTeacher(course.teacher);
    setFormCampus(course.campus);
    setFormPrice(String(course.price));
    setFormDuration(String(course.duration));
    setFormLevel(course.level);
    setEditOpen(true);
  };

  const toggleStatus = (id: string) => {
    setCourses(courses.map((c) =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
  };

  const formFields = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground">Instrument</label>
        <Input value={formInstrument} onChange={(e) => setFormInstrument(e.target.value)} placeholder="e.g. Guzheng" className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Teacher</label>
        <Input value={formTeacher} onChange={(e) => setFormTeacher(e.target.value)} placeholder="Teacher name" className="mt-1" />
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Price ($)</label>
          <Input value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="75" type="number" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Duration (min)</label>
          <Select value={formDuration} onValueChange={(val) => val && setFormDuration(val)}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 min</SelectItem>
              <SelectItem value="45">45 min</SelectItem>
              <SelectItem value="60">60 min</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Level</label>
        <Select value={formLevel} onValueChange={(val) => val && setFormLevel(val)}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Levels">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
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
            <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
            <p className="text-sm text-muted-foreground">Manage instrument courses across campuses.</p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger
              onClick={() => { resetForm(); setAddOpen(true); }}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
            >
              <Plus className="size-4" />
              Add Course
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              {formFields}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd}>Add Course</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={campusFilter} onValueChange={(val) => val && setCampusFilter(val)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Campus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campuses</SelectItem>
              <SelectItem value="Chatswood">Chatswood</SelectItem>
              <SelectItem value="Burwood">Burwood</SelectItem>
            </SelectContent>
          </Select>
          <Select value={instrumentFilter} onValueChange={(val) => val && setInstrumentFilter(val)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Instrument" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Instruments</SelectItem>
              {instruments.map((inst) => (
                <SelectItem key={inst} value={inst}>{inst}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No courses found matching your filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Instrument</th>
                      <th className="pb-3 pr-4 font-medium">Teacher</th>
                      <th className="pb-3 pr-4 font-medium">Campus</th>
                      <th className="pb-3 pr-4 font-medium">Level</th>
                      <th className="pb-3 pr-4 font-medium">Price</th>
                      <th className="pb-3 pr-4 font-medium">Duration</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((course) => (
                      <tr key={course.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{course.instrument}</td>
                        <td className="py-3 pr-4">{course.teacher}</td>
                        <td className="py-3 pr-4">
                          <Badge variant="outline">{course.campus}</Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="secondary">{course.level}</Badge>
                        </td>
                        <td className="py-3 pr-4">${course.price}</td>
                        <td className="py-3 pr-4">{course.duration} min</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                            course.status === 'Active'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon-sm" onClick={() => openEdit(course)}>
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => toggleStatus(course.id)}
                              title={course.status === 'Active' ? 'Deactivate' : 'Activate'}
                            >
                              <Power className={`size-4 ${course.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`} />
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
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            {formFields}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => { setEditOpen(false); setEditingCourse(null); }}>Cancel</Button>
              <Button onClick={handleEdit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}
