import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting deployment seed with upserts...');

  // Create or update admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mlptoastmasters.org' },
    update: {
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
    create: {
      email: 'admin@mlptoastmasters.org',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });
  console.log('✓ Admin user upserted');

  // Upsert educational pathways
  const pathways = await Promise.all([
    prisma.educationalPathway.upsert({
      where: { name: 'Presentation Mastery' },
      update: {
        description: 'Build your skills as an accomplished public speaker',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Presentation Mastery',
        description: 'Build your skills as an accomplished public speaker',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Dynamic Leadership' },
      update: {
        description: 'Build your skills as a strategic leader',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Dynamic Leadership',
        description: 'Build your skills as a strategic leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Effective Coaching' },
      update: {
        description: 'Build your skills as a positive communicator and leader',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Effective Coaching',
        description: 'Build your skills as a positive communicator and leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Innovative Planning' },
      update: {
        description: 'Build your skills as a public speaker and leader',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Innovative Planning',
        description: 'Build your skills as a public speaker and leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Leadership Development' },
      update: {
        description: 'Build your skills as a communicator and leader',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Leadership Development',
        description: 'Build your skills as a communicator and leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Motivational Strategies' },
      update: {
        description: 'Build motivational leadership and communication skills',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Motivational Strategies',
        description: 'Build motivational leadership and communication skills',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Persuasive Influence' },
      update: {
        description: 'Build skills to positively influence others',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Persuasive Influence',
        description: 'Build skills to positively influence others',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Strategic Relationships' },
      update: {
        description: 'Build networking and leadership skills',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Strategic Relationships',
        description: 'Build networking and leadership skills',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Team Collaboration' },
      update: {
        description: 'Build collaborative leadership skills',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Team Collaboration',
        description: 'Build collaborative leadership skills',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Visionary Communication' },
      update: {
        description: 'Develop your communication as a leader',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Visionary Communication',
        description: 'Develop your communication as a leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.upsert({
      where: { name: 'Engaging Humor' },
      update: {
        description: 'Build humorous and engaging speaking skills',
        levels: 5,
        active: true,
      },
      create: {
        name: 'Engaging Humor',
        description: 'Build humorous and engaging speaking skills',
        levels: 5,
      },
    }),
  ]);
  console.log('✓ Educational pathways upserted');

  // Get the Presentation Mastery pathway for use in projects and members
  const presentationMastery = pathways[0];

  // Upsert pathway projects for Presentation Mastery
  await Promise.all([
    prisma.pathwayProject.upsert({
      where: { projectCode: 'PM-L1-P1' },
      update: {
        title: 'Ice Breaker',
        description: 'Introduce yourself to the club and learn the basic structure of a public speech',
        minDuration: 4,
        maxDuration: 6,
      },
      create: {
        pathwayId: presentationMastery.id,
        level: 1,
        projectNumber: 1,
        projectCode: 'PM-L1-P1',
        title: 'Ice Breaker',
        description: 'Introduce yourself to the club and learn the basic structure of a public speech',
        minDuration: 4,
        maxDuration: 6,
      },
    }),
    prisma.pathwayProject.upsert({
      where: { projectCode: 'PM-L1-P2' },
      update: {
        title: 'Evaluation and Feedback',
        description: 'Learn to give and receive feedback effectively',
        minDuration: 5,
        maxDuration: 7,
      },
      create: {
        pathwayId: presentationMastery.id,
        level: 1,
        projectNumber: 2,
        projectCode: 'PM-L1-P2',
        title: 'Evaluation and Feedback',
        description: 'Learn to give and receive feedback effectively',
        minDuration: 5,
        maxDuration: 7,
      },
    }),
    prisma.pathwayProject.upsert({
      where: { projectCode: 'PM-L1-P3' },
      update: {
        title: 'Researching and Presenting',
        description: 'Research and present on a topic',
        minDuration: 5,
        maxDuration: 7,
      },
      create: {
        pathwayId: presentationMastery.id,
        level: 1,
        projectNumber: 3,
        projectCode: 'PM-L1-P3',
        title: 'Researching and Presenting',
        description: 'Research and present on a topic',
        minDuration: 5,
        maxDuration: 7,
      },
    }),
  ]);
  console.log('✓ Pathway projects upserted');

  // Upsert MLP London Bridge Speakers club
  const club = await prisma.club.upsert({
    where: { clubNumber: '00760422' },
    update: {
      name: 'MLP London Bridge Speakers',
      charterDate: new Date('2005-06-24'),
      district: '91',
      area: 'L23',
      division: 'L',
      meetingDay: '1st, 3rd & 5th Tuesday',
      meetingTime: '18:30',
      meetingLocation: "St Christopher's Inn, 121 Borough High Street, London SE1 1NP",
      meetingFormat: 'In-person',
      description: 'A vibrant Toastmasters club in the heart of London, helping members develop public speaking and leadership skills since 2005',
      websiteUrl: 'https://mlptoastmasters.org',
      contactEmail: 'contact@mlptoastmasters.org',
      active: true,
    },
    create: {
      clubNumber: '00760422',
      name: 'MLP London Bridge Speakers',
      charterDate: new Date('2005-06-24'),
      district: '91',
      area: 'L23',
      division: 'L',
      meetingDay: '1st, 3rd & 5th Tuesday',
      meetingTime: '18:30',
      meetingLocation: "St Christopher's Inn, 121 Borough High Street, London SE1 1NP",
      meetingFormat: 'In-person',
      description: 'A vibrant Toastmasters club in the heart of London, helping members develop public speaking and leadership skills since 2005',
      websiteUrl: 'https://mlptoastmasters.org',
      contactEmail: 'contact@mlptoastmasters.org',
    },
  });
  console.log('✓ Club upserted');

  // Upsert members
  const members = await Promise.all([
    prisma.member.upsert({
      where: { memberId: 'MLP-001' },
      update: {
        firstName: 'James',
        lastName: 'Thompson',
        email: 'james.thompson@example.com',
        phone: '+447808811778',
        joinDate: new Date('2020-03-01'),
        membershipType: 'regular',
        membershipStatus: 'active',
        pathwayId: presentationMastery.id,
        currentLevel: 3,
        clubId: club.id,
        userId: adminUser.id,
      },
      create: {
        memberId: 'MLP-001',
        firstName: 'James',
        lastName: 'Thompson',
        email: 'james.thompson@example.com',
        phone: '+447808811778',
        joinDate: new Date('2020-03-01'),
        membershipType: 'regular',
        pathwayId: presentationMastery.id,
        currentLevel: 3,
        clubId: club.id,
        userId: adminUser.id,
      },
    }),
    prisma.member.upsert({
      where: { memberId: 'MLP-002' },
      update: {
        firstName: 'Emma',
        lastName: 'Williams',
        email: 'emma.williams@example.com',
        phone: '+447700900123',
        joinDate: new Date('2019-09-15'),
        membershipType: 'regular',
        membershipStatus: 'active',
        pathwayId: pathways[1].id,
        currentLevel: 4,
        clubId: club.id,
      },
      create: {
        memberId: 'MLP-002',
        firstName: 'Emma',
        lastName: 'Williams',
        email: 'emma.williams@example.com',
        phone: '+447700900123',
        joinDate: new Date('2019-09-15'),
        membershipType: 'regular',
        pathwayId: pathways[1].id,
        currentLevel: 4,
        clubId: club.id,
      },
    }),
    prisma.member.upsert({
      where: { memberId: 'MLP-003' },
      update: {
        firstName: 'Oliver',
        lastName: 'Davies',
        email: 'oliver.davies@example.com',
        phone: '+447700900456',
        joinDate: new Date('2021-01-10'),
        membershipType: 'regular',
        membershipStatus: 'active',
        pathwayId: pathways[2].id,
        currentLevel: 2,
        clubId: club.id,
      },
      create: {
        memberId: 'MLP-003',
        firstName: 'Oliver',
        lastName: 'Davies',
        email: 'oliver.davies@example.com',
        phone: '+447700900456',
        joinDate: new Date('2021-01-10'),
        membershipType: 'regular',
        pathwayId: pathways[2].id,
        currentLevel: 2,
        clubId: club.id,
      },
    }),
    prisma.member.upsert({
      where: { memberId: 'MLP-004' },
      update: {
        firstName: 'Sophie',
        lastName: 'Brown',
        email: 'sophie.brown@example.com',
        joinDate: new Date('2021-06-01'),
        membershipType: 'regular',
        membershipStatus: 'active',
        pathwayId: pathways[6].id,
        currentLevel: 2,
        clubId: club.id,
      },
      create: {
        memberId: 'MLP-004',
        firstName: 'Sophie',
        lastName: 'Brown',
        email: 'sophie.brown@example.com',
        joinDate: new Date('2021-06-01'),
        membershipType: 'regular',
        pathwayId: pathways[6].id,
        currentLevel: 2,
        clubId: club.id,
      },
    }),
    prisma.member.upsert({
      where: { memberId: 'MLP-005' },
      update: {
        firstName: 'William',
        lastName: 'Jones',
        email: 'william.jones@example.com',
        joinDate: new Date('2022-03-15'),
        membershipType: 'new',
        membershipStatus: 'active',
        pathwayId: presentationMastery.id,
        currentLevel: 1,
        clubId: club.id,
      },
      create: {
        memberId: 'MLP-005',
        firstName: 'William',
        lastName: 'Jones',
        email: 'william.jones@example.com',
        joinDate: new Date('2022-03-15'),
        membershipType: 'new',
        pathwayId: presentationMastery.id,
        currentLevel: 1,
        clubId: club.id,
      },
    }),
    prisma.member.upsert({
      where: { memberId: 'MLP-006' },
      update: {
        firstName: 'Charlotte',
        lastName: 'Taylor',
        email: 'charlotte.taylor@example.com',
        joinDate: new Date('2020-11-01'),
        membershipType: 'regular',
        membershipStatus: 'active',
        pathwayId: pathways[9].id,
        currentLevel: 3,
        clubId: club.id,
      },
      create: {
        memberId: 'MLP-006',
        firstName: 'Charlotte',
        lastName: 'Taylor',
        email: 'charlotte.taylor@example.com',
        joinDate: new Date('2020-11-01'),
        membershipType: 'regular',
        pathwayId: pathways[9].id,
        currentLevel: 3,
        clubId: club.id,
      },
    }),
  ]);
  console.log('✓ Members upserted');

  // Upsert site settings
  const siteSettings = [
    { key: 'club_name', value: 'MLP London Bridge Speakers', type: 'string', description: 'Club name displayed on the website' },
    { key: 'meeting_schedule', value: '1st, 3rd & 5th Tuesday at 18:30', type: 'string', description: 'Regular meeting schedule' },
    { key: 'meeting_location', value: "St Christopher's Inn, 121 Borough High Street, London SE1 1NP", type: 'string', description: 'Meeting venue address' },
    { key: 'contact_email', value: 'contact@mlptoastmasters.org', type: 'string', description: 'Main contact email' },
    { key: 'contact_phone', value: '+447808811778', type: 'string', description: 'Contact phone number' },
    { key: 'enable_guest_registration', value: 'true', type: 'boolean', description: 'Allow guests to register for meetings online' },
    { key: 'club_number', value: '00760422', type: 'string', description: 'Official Toastmasters International club number' },
    { key: 'district', value: '91', type: 'string', description: 'Toastmasters District number' },
    { key: 'area', value: 'L23', type: 'string', description: 'Toastmasters Area designation' },
  ];

  await Promise.all(
    siteSettings.map(setting =>
      prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: {
          value: setting.value,
          type: setting.type,
          description: setting.description,
        },
        create: setting,
      })
    )
  );
  console.log('✓ Site settings upserted');

  // Upsert announcements (only if they don't exist)
  await Promise.all([
    prisma.announcement.upsert({
      where: { 
        title: 'Area Contest - February 15th',
      },
      update: {},
      create: {
        title: 'Area Contest - February 15th',
        content: 'Our Area L23 contest will be held on February 15th at 2:00 PM. We need volunteers for timing, judging, and setup. Please contact our VP Education if you can help!',
        priority: 'high',
        expiresAt: new Date(2025, 1, 16), // Feb 16
        active: true,
      },
    }),
    prisma.announcement.upsert({
      where: { 
        title: 'New Member Welcome',
      },
      update: {},
      create: {
        title: 'New Member Welcome',
        content: 'Please join us in welcoming our newest member, William Jones! William joined us last month and has already signed up for his Ice Breaker speech.',
        priority: 'normal',
        active: true,
      },
    }),
    prisma.announcement.upsert({
      where: { 
        title: 'Meeting Venue Update',
      },
      update: {},
      create: {
        title: 'Meeting Venue Update',
        content: "St Christopher's Inn has confirmed our booking for all 2025 meetings. The venue remains the same: 121 Borough High Street, London SE1 1NP.",
        priority: 'normal',
        active: true,
      },
    }),
  ]);
  console.log('✓ Announcements upserted');

  // Upsert resources
  const resources = [
    {
      title: 'Meeting Agenda Template',
      description: 'Standard template for MLP London Bridge Speakers meeting agendas',
      category: 'meeting-resources',
      fileUrl: '/resources/mlp-agenda-template.pdf',
      accessLevel: 'member',
      displayOrder: 1,
    },
    {
      title: 'Speech Evaluation Form',
      description: 'Official evaluation form for prepared speeches',
      category: 'meeting-resources',
      fileUrl: '/resources/evaluation-form.pdf',
      accessLevel: 'member',
      displayOrder: 2,
    },
    {
      title: 'Pathways Navigator',
      description: 'Complete guide to all 11 Toastmasters Pathways',
      category: 'member-resources',
      linkUrl: 'https://www.toastmasters.org/pathways-overview',
      accessLevel: 'public',
      displayOrder: 1,
    },
    {
      title: 'Timer Instructions',
      description: 'Guide for timing speeches and signaling speakers',
      category: 'meeting-resources',
      fileUrl: '/resources/timer-guide.pdf',
      accessLevel: 'member',
      displayOrder: 3,
    },
    {
      title: 'District 91 Newsletter',
      description: 'Latest news and events from District 91',
      category: 'member-resources',
      linkUrl: 'https://d91toastmasters.org.uk/newsletter',
      accessLevel: 'public',
      displayOrder: 2,
    },
  ];

  await Promise.all(
    resources.map(resource =>
      prisma.resource.upsert({
        where: { 
          title_category: {
            title: resource.title,
            category: resource.category,
          }
        },
        update: {
          description: resource.description,
          fileUrl: resource.fileUrl || null,
          linkUrl: resource.linkUrl || null,
          accessLevel: resource.accessLevel,
          displayOrder: resource.displayOrder,
          active: true,
        },
        create: resource,
      })
    )
  );
  console.log('✓ Resources upserted');

  // Upsert FAQ items
  const faqItems = [
    {
      question: "What is Toastmasters?",
      answer: "Toastmasters International is a non-profit educational organization that teaches public speaking and leadership skills through a worldwide network of clubs.",
      category: "About Toastmasters",
      displayOrder: 1,
    },
    {
      question: "How much does it cost to join?",
      answer: "There are international dues paid to Toastmasters International, plus local club dues. Contact us for current pricing information.",
      category: "Membership",
      displayOrder: 1,
    },
    {
      question: "When and where do you meet?",
      answer: "We meet on the 1st, 3rd & 5th Tuesday of each month at 18:30 at St Christopher's Inn, 121 Borough High Street, London SE1 1NP.",
      category: "Meetings",
      displayOrder: 1,
    },
    {
      question: "Can I visit as a guest?",
      answer: "Absolutely! Guests are always welcome at our meetings. It's the best way to see what Toastmasters is all about and meet our members.",
      category: "Meetings",
      displayOrder: 2,
    },
    {
      question: "What are Pathways?",
      answer: "Pathways is Toastmasters' education program featuring 11 specialized learning paths that help you develop communication and leadership skills through hands-on learning.",
      category: "Education",
      displayOrder: 1,
    },
    {
      question: "Do I have to give a speech right away?",
      answer: "No! You can visit several times as a guest before joining. Once you become a member, you can take your time and give your first speech when you feel ready.",
      category: "Membership",
      displayOrder: 2,
    },
    {
      question: "What happens at a typical meeting?",
      answer: "Each meeting includes prepared speeches, impromptu speaking (Table Topics), speech evaluations, and various meeting roles. It's a supportive learning environment.",
      category: "Meetings",
      displayOrder: 3,
    },
    {
      question: "How long does it take to complete a pathway?",
      answer: "Most members complete a pathway in 18-24 months, but you can go at your own pace. There's no pressure to rush through the program.",
      category: "Education",
      displayOrder: 2,
    },
  ];

  await Promise.all(
    faqItems.map(faq =>
      prisma.faqItem.upsert({
        where: { 
          question_category: {
            question: faq.question,
            category: faq.category,
          }
        },
        update: {
          answer: faq.answer,
          displayOrder: faq.displayOrder,
          active: true,
        },
        create: faq,
      })
    )
  );
  console.log('✓ FAQ items upserted');

  console.log('✅ Deployment seed completed successfully!');
  console.log('Admin login: admin@mlptoastmasters.org / admin123');
}

main()
  .catch((e) => {
    console.error('Deployment seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });