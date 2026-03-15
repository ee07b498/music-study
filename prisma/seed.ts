import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create instruments
  const instrumentData = [
    { name: 'Guzheng', nameZh: '古筝', slug: 'guzheng', icon: '🎵' },
    { name: 'Erhu', nameZh: '二胡', slug: 'erhu', icon: '🎻' },
    { name: 'Pipa', nameZh: '琵琶', slug: 'pipa', icon: '🎸' },
    { name: 'Dizi', nameZh: '笛子', slug: 'dizi', icon: '🎶' },
    { name: 'Xiao', nameZh: '箫', slug: 'xiao', icon: '🎶' },
    { name: 'Yangqin', nameZh: '扬琴', slug: 'yangqin', icon: '🎹' },
    { name: 'Ruan', nameZh: '阮', slug: 'ruan', icon: '🎸' },
    { name: 'Hulusi', nameZh: '葫芦丝', slug: 'hulusi', icon: '🎶' },
    { name: 'Piano', nameZh: '钢琴', slug: 'piano', icon: '🎹' },
    { name: 'Guqin', nameZh: '古琴', slug: 'guqin', icon: '🎵' },
    { name: 'Vocal', nameZh: '声乐', slug: 'vocal', icon: '🎤' },
  ];

  const instruments: Record<string, { id: string }> = {};
  for (const data of instrumentData) {
    const instrument = await prisma.instrument.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
    instruments[data.slug] = instrument;
  }
  console.log(`Created ${Object.keys(instruments).length} instruments`);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@meyamusic.com.au' },
    update: {},
    create: {
      email: 'admin@meyamusic.com.au',
      password: adminPassword,
      name: 'Admin',
      nameZh: '管理员',
      role: 'ADMIN',
      phone: '+61 400 000 000',
    },
  });
  console.log(`Admin user: ${admin.email}`);

  // Create teacher users and profiles
  const teacherPassword = await bcrypt.hash('teacher123', 12);
  const teachersData = [
    {
      email: 'meya@meyamusic.com.au',
      name: 'Meya Dong',
      nameZh: '董芈雅',
      bio: 'Meya Dong is the founder and director of the Meya Conservatory of Chinese Music. With over 15 years of professional performance and teaching experience.',
      bioZh: '董芈雅是芈雅中乐学院的创始人和校长。拥有超过15年的专业演出和教学经验。',
      slug: 'meya-dong',
      campuses: ['chatswood', 'burwood'],
      instrumentSlugs: ['dizi', 'xiao', 'hulusi'],
    },
    {
      email: 'zina@meyamusic.com.au',
      name: 'Zina Fan',
      nameZh: '范子纳',
      bio: 'Zina Fan is an accomplished pipa and ruan player with extensive performance experience.',
      bioZh: '范子纳是一位资深琵琶和阮演奏家。',
      slug: 'zina-fan',
      campuses: ['chatswood'],
      instrumentSlugs: ['pipa', 'ruan'],
    },
    {
      email: 'angela@meyamusic.com.au',
      name: 'Angela Feng',
      nameZh: '冯安琪',
      bio: 'Angela Feng is a versatile musician specializing in yangqin, piano, and vocal instruction.',
      bioZh: '冯安琪是一位多才多艺的音乐家，专注于扬琴、钢琴和声乐教学。',
      slug: 'angela-feng',
      campuses: ['chatswood', 'burwood'],
      instrumentSlugs: ['yangqin', 'piano', 'vocal'],
    },
    {
      email: 'ashley@meyamusic.com.au',
      name: 'Ashley Sui',
      nameZh: '隋雅诗',
      bio: 'Ashley Sui is a dedicated erhu instructor with deep understanding of traditional and modern repertoire.',
      bioZh: '隋雅诗是一位专注的二胡教师，对传统和现代曲目都有深入理解。',
      slug: 'ashley-sui',
      campuses: ['chatswood'],
      instrumentSlugs: ['erhu'],
    },
  ];

  for (const td of teachersData) {
    const user = await prisma.user.upsert({
      where: { email: td.email },
      update: {},
      create: {
        email: td.email,
        password: teacherPassword,
        name: td.name,
        nameZh: td.nameZh,
        role: 'TEACHER',
      },
    });

    const teacher = await prisma.teacher.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        bio: td.bio,
        bioZh: td.bioZh,
        slug: td.slug,
        campuses: td.campuses,
      },
    });

    for (const slug of td.instrumentSlugs) {
      if (instruments[slug]) {
        await prisma.teacherInstrument.upsert({
          where: {
            teacherId_instrumentId: {
              teacherId: teacher.id,
              instrumentId: instruments[slug].id,
            },
          },
          update: {},
          create: {
            teacherId: teacher.id,
            instrumentId: instruments[slug].id,
          },
        });
      }
    }

    // Create sample schedules
    for (let day = 1; day <= 5; day++) {
      await prisma.schedule.create({
        data: {
          teacherId: teacher.id,
          dayOfWeek: day,
          startTime: '10:00',
          endTime: '12:00',
          isAvailable: true,
        },
      });
      await prisma.schedule.create({
        data: {
          teacherId: teacher.id,
          dayOfWeek: day,
          startTime: '14:00',
          endTime: '17:00',
          isAvailable: true,
        },
      });
    }

    console.log(`Teacher: ${td.name} (${td.email})`);
  }

  // Create sample students
  const studentPassword = await bcrypt.hash('student123', 12);
  const studentsData = [
    { email: 'student1@example.com', name: 'Lily Chen', nameZh: '陈莉莉', parentName: 'David Chen', age: 12, level: 'beginner' },
    { email: 'student2@example.com', name: 'James Wang', nameZh: '王杰', parentName: 'Susan Wang', age: 15, level: 'intermediate' },
    { email: 'student3@example.com', name: 'Emily Zhang', nameZh: '张艾米', parentName: null, age: 28, level: 'advanced' },
  ];

  for (const sd of studentsData) {
    const user = await prisma.user.upsert({
      where: { email: sd.email },
      update: {},
      create: {
        email: sd.email,
        password: studentPassword,
        name: sd.name,
        nameZh: sd.nameZh,
        role: 'STUDENT',
      },
    });

    await prisma.student.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        parentName: sd.parentName,
        age: sd.age,
        level: sd.level,
      },
    });

    console.log(`Student: ${sd.name} (${sd.email})`);
  }

  // Create sample events
  const eventsData = [
    {
      title: 'East Meets West: A Symphony of Cultures',
      titleZh: '东西合璧：文化交响曲',
      slug: 'east-meets-west-2025',
      date: new Date('2025-11-08T18:30:00'),
      time: '6:30 PM - 8:30 PM',
      venue: 'The Concourse Chatswood Concert Hall',
      venueZh: 'Chatswood音乐厅',
      description: 'Concert at the Concourse - a Traditional Chinese Music concert.',
      descriptionZh: '在Concourse音乐厅举办的传统中国音乐会。',
      ticketPrice: 39,
      published: true,
    },
  ];

  for (const ed of eventsData) {
    await prisma.event.upsert({
      where: { slug: ed.slug },
      update: {},
      create: ed,
    });
    console.log(`Event: ${ed.title}`);
  }

  console.log('\nSeed completed!');
  console.log('\nLogin credentials:');
  console.log('Admin:   admin@meyamusic.com.au / admin123');
  console.log('Teacher: meya@meyamusic.com.au / teacher123');
  console.log('Student: student1@example.com / student123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
