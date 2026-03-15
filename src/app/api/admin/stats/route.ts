import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalStudents,
      totalTeachers,
      totalBookings,
      pendingBookings,
      totalLessons,
      completedLessons,
      totalEvents,
      totalProducts,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.lesson.count(),
      prisma.lesson.count({ where: { status: 'COMPLETED' } }),
      prisma.event.count(),
      prisma.product.count(),
    ]);

    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        student: { include: { user: { select: { name: true } } } },
        course: { include: { instrument: true, teacher: { include: { user: { select: { name: true } } } } } },
      },
    });

    return NextResponse.json({
      stats: {
        totalStudents,
        totalTeachers,
        totalBookings,
        pendingBookings,
        totalLessons,
        completedLessons,
        totalEvents,
        totalProducts,
      },
      recentBookings,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
