import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};

    if (session.user.role === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
      if (student) where.studentId = student.id;
    } else if (session.user.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
      if (teacher) {
        where.course = { teacherId: teacher.id };
      }
    }

    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        student: { include: { user: { select: { name: true, email: true, phone: true } } } },
        course: { include: { instrument: true, teacher: { include: { user: { select: { name: true } } } } } },
        schedule: true,
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId, scheduleId, date, notes, isTrial } = body;

    const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
    if (!student) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        studentId: student.id,
        courseId,
        scheduleId,
        date: new Date(date),
        notes,
        isTrial: isTrial || false,
      },
      include: {
        course: { include: { instrument: true, teacher: { include: { user: { select: { name: true } } } } } },
      },
    });

    // Create notification for the teacher
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { teacher: true },
    });
    if (course) {
      await prisma.notification.create({
        data: {
          userId: course.teacher.userId,
          type: 'BOOKING',
          title: 'New Booking Request',
          titleZh: '新的预约请求',
          message: `You have a new ${isTrial ? 'trial ' : ''}booking request for ${new Date(date).toLocaleDateString()}.`,
          messageZh: `您有一个新的${isTrial ? '试课' : ''}预约请求，日期为 ${new Date(date).toLocaleDateString('zh-CN')}。`,
        },
      });
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
