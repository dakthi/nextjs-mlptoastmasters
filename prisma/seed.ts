import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean existing data
  await prisma.memberAchievement.deleteMany();
  await prisma.evaluation.deleteMany();
  await prisma.speech.deleteMany();
  await prisma.meetingRole.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.clubOfficer.deleteMany();
  await prisma.pathwayProject.deleteMany();
  await prisma.member.deleteMany();
  await prisma.club.deleteMany();
  await prisma.educationalPathway.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@mlptoastmasters.org',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });

  // Create educational pathways
  const pathways = await Promise.all([
    prisma.educationalPathway.create({
      data: {
        name: 'Presentation Mastery',
        description: 'Build your skills as an accomplished public speaker',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Dynamic Leadership',
        description: 'Build your skills as a strategic leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Effective Coaching',
        description: 'Build your skills as a positive communicator and leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Innovative Planning',
        description: 'Build your skills as a public speaker and leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Leadership Development',
        description: 'Build your skills as a communicator and leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Motivational Strategies',
        description: 'Build motivational leadership and communication skills',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Persuasive Influence',
        description: 'Build skills to positively influence others',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Strategic Relationships',
        description: 'Build networking and leadership skills',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Team Collaboration',
        description: 'Build collaborative leadership skills',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Visionary Communication',
        description: 'Develop your communication as a leader',
        levels: 5,
      },
    }),
    prisma.educationalPathway.create({
      data: {
        name: 'Engaging Humor',
        description: 'Build humorous and engaging speaking skills',
        levels: 5,
      },
    }),
  ]);

  // Create pathway projects for Presentation Mastery
  const presentationMastery = pathways[0];
  await Promise.all([
    prisma.pathwayProject.create({
      data: {
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
    prisma.pathwayProject.create({
      data: {
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
    prisma.pathwayProject.create({
      data: {
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

  // Create MLP London Bridge Speakers club
  const club = await prisma.club.create({
    data: {
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

  // Create members
  const members = await Promise.all([
    prisma.member.create({
      data: {
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
    prisma.member.create({
      data: {
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
    prisma.member.create({
      data: {
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
    prisma.member.create({
      data: {
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
    prisma.member.create({
      data: {
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
    prisma.member.create({
      data: {
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

  // Create club officers
  const currentYear = new Date().getFullYear();
  await Promise.all([
    prisma.clubOfficer.create({
      data: {
        clubId: club.id,
        memberId: members[1].id, // Emma Williams
        position: 'President',
        termStart: new Date(currentYear, 6, 1), // July 1
        termEnd: new Date(currentYear + 1, 5, 30), // June 30
      },
    }),
    prisma.clubOfficer.create({
      data: {
        clubId: club.id,
        memberId: members[0].id, // James Thompson
        position: 'VP Education',
        termStart: new Date(currentYear, 6, 1),
        termEnd: new Date(currentYear + 1, 5, 30),
      },
    }),
    prisma.clubOfficer.create({
      data: {
        clubId: club.id,
        memberId: members[2].id, // Oliver Davies
        position: 'VP Membership',
        termStart: new Date(currentYear, 6, 1),
        termEnd: new Date(currentYear + 1, 5, 30),
      },
    }),
    prisma.clubOfficer.create({
      data: {
        clubId: club.id,
        memberId: members[3].id, // Sophie Brown
        position: 'VP PR',
        termStart: new Date(currentYear, 6, 1),
        termEnd: new Date(currentYear + 1, 5, 30),
      },
    }),
    prisma.clubOfficer.create({
      data: {
        clubId: club.id,
        memberId: members[5].id, // Charlotte Taylor
        position: 'Secretary',
        termStart: new Date(currentYear, 6, 1),
        termEnd: new Date(currentYear + 1, 5, 30),
      },
    }),
  ]);

  // Create meetings (1st, 3rd, and 5th Tuesdays)
  const meetings = await Promise.all([
    prisma.meeting.create({
      data: {
        clubId: club.id,
        meetingNumber: 501,
        meetingDate: new Date(2025, 0, 7, 18, 30), // Jan 7, 2025 (1st Tuesday)
        theme: 'New Year, New Goals',
        toastmaster: 'Emma Williams',
        generalEvaluator: 'James Thompson',
        status: 'completed',
      },
    }),
    prisma.meeting.create({
      data: {
        clubId: club.id,
        meetingNumber: 502,
        meetingDate: new Date(2025, 0, 21, 18, 30), // Jan 21, 2025 (3rd Tuesday)
        theme: 'Leadership in Action',
        toastmaster: 'Oliver Davies',
        generalEvaluator: 'Sophie Brown',
        status: 'scheduled',
      },
    }),
    prisma.meeting.create({
      data: {
        clubId: club.id,
        meetingNumber: 503,
        meetingDate: new Date(2025, 1, 4, 18, 30), // Feb 4, 2025 (1st Tuesday)
        theme: 'The Power of Storytelling',
        toastmaster: 'Charlotte Taylor',
        status: 'scheduled',
      },
    }),
    prisma.meeting.create({
      data: {
        clubId: club.id,
        meetingNumber: 504,
        meetingDate: new Date(2025, 1, 18, 18, 30), // Feb 18, 2025 (3rd Tuesday)
        theme: 'Innovation and Change',
        status: 'scheduled',
      },
    }),
  ]);

  // Create speeches for completed meeting
  const speech1 = await prisma.speech.create({
    data: {
      meetingId: meetings[0].id,
      speakerId: members[0].id,
      speechTitle: 'Setting SMART Goals',
      projectCode: 'PM-L3-P1',
      projectTitle: 'Effective Body Language',
      pathwayLevel: 3,
      duration: 7,
      actualTime: '6:52',
      completed: true,
    },
  });

  const speech2 = await prisma.speech.create({
    data: {
      meetingId: meetings[0].id,
      speakerId: members[4].id,
      speechTitle: 'My Journey to London',
      projectCode: 'PM-L1-P1',
      projectTitle: 'Ice Breaker',
      pathwayLevel: 1,
      duration: 6,
      actualTime: '5:45',
      completed: true,
    },
  });

  const speech3 = await prisma.speech.create({
    data: {
      meetingId: meetings[0].id,
      speakerId: members[5].id,
      speechTitle: 'The Art of Active Listening',
      projectCode: 'VC-L3-P2',
      projectTitle: 'Active Listening',
      pathwayLevel: 3,
      duration: 7,
      actualTime: '7:10',
      completed: true,
    },
  });

  // Create evaluations
  await Promise.all([
    prisma.evaluation.create({
      data: {
        speechId: speech1.id,
        evaluatorId: members[1].id,
        commendations: 'Excellent use of gestures, strong opening with personal story, clear structure with three main points',
        recommendations: 'Consider adding more vocal variety in the middle section, make eye contact with all areas of the room',
        overallScore: 4,
        timeUsed: '2:50',
      },
    }),
    prisma.evaluation.create({
      data: {
        speechId: speech2.id,
        evaluatorId: members[2].id,
        commendations: 'Very engaging personal story, good humor, confident delivery for first speech',
        recommendations: 'Work on reducing filler words, consider a stronger conclusion to tie back to opening',
        overallScore: 4,
        timeUsed: '2:30',
      },
    }),
    prisma.evaluation.create({
      data: {
        speechId: speech3.id,
        evaluatorId: members[3].id,
        commendations: 'Excellent demonstration of listening techniques, great audience interaction, powerful examples',
        recommendations: 'Could benefit from a visual aid to reinforce key points',
        overallScore: 5,
        timeUsed: '3:00',
      },
    }),
  ]);

  // Create meeting roles
  await Promise.all([
    // Completed meeting roles
    prisma.meetingRole.create({
      data: {
        meetingId: meetings[0].id,
        memberId: members[1].id,
        roleType: 'toastmaster',
        completed: true,
      },
    }),
    prisma.meetingRole.create({
      data: {
        meetingId: meetings[0].id,
        memberId: members[2].id,
        roleType: 'timer',
        completed: true,
      },
    }),
    prisma.meetingRole.create({
      data: {
        meetingId: meetings[0].id,
        memberId: members[3].id,
        roleType: 'ah-counter',
        completed: true,
      },
    }),
    prisma.meetingRole.create({
      data: {
        meetingId: meetings[0].id,
        memberId: members[5].id,
        roleType: 'grammarian',
        completed: true,
      },
    }),
    // Upcoming meeting roles
    prisma.meetingRole.create({
      data: {
        meetingId: meetings[1].id,
        memberId: members[2].id,
        roleType: 'toastmaster',
        completed: false,
      },
    }),
    prisma.meetingRole.create({
      data: {
        meetingId: meetings[1].id,
        memberId: members[4].id,
        roleType: 'timer',
        completed: false,
      },
    }),
  ]);

  // Create member achievements
  await Promise.all([
    prisma.memberAchievement.create({
      data: {
        memberId: members[0].id,
        achievementType: 'Level2',
        achievementDate: new Date('2023-06-15'),
        description: 'Completed Level 2 - Presentation Mastery',
      },
    }),
    prisma.memberAchievement.create({
      data: {
        memberId: members[1].id,
        achievementType: 'Level3',
        achievementDate: new Date('2023-09-20'),
        description: 'Completed Level 3 - Dynamic Leadership',
      },
    }),
    prisma.memberAchievement.create({
      data: {
        memberId: members[1].id,
        achievementType: 'Triple Crown',
        achievementDate: new Date('2024-01-10'),
        description: 'Triple Crown Award - Completed 3 awards in one year',
      },
    }),
    prisma.memberAchievement.create({
      data: {
        memberId: members[5].id,
        achievementType: 'Level2',
        achievementDate: new Date('2024-03-15'),
        description: 'Completed Level 2 - Visionary Communication',
      },
    }),
  ]);

  // Create announcements
  await Promise.all([
    prisma.announcement.create({
      data: {
        title: 'Area Contest - February 15th',
        content: 'Our Area L23 contest will be held on February 15th at 2:00 PM. We need volunteers for timing, judging, and setup. Please contact our VP Education if you can help!',
        priority: 'high',
        expiresAt: new Date(2025, 1, 16), // Feb 16
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'New Member Welcome',
        content: 'Please join us in welcoming our newest member, William Jones! William joined us last month and has already signed up for his Ice Breaker speech.',
        priority: 'normal',
      },
    }),
    prisma.announcement.create({
      data: {
        title: 'Meeting Venue Update',
        content: "St Christopher's Inn has confirmed our booking for all 2025 meetings. The venue remains the same: 121 Borough High Street, London SE1 1NP.",
        priority: 'normal',
      },
    }),
  ]);

  // Create resources
  await Promise.all([
    prisma.resource.create({
      data: {
        title: 'Meeting Agenda Template',
        description: 'Standard template for MLP London Bridge Speakers meeting agendas',
        category: 'meeting-resources',
        fileUrl: '/resources/mlp-agenda-template.pdf',
        accessLevel: 'member',
        displayOrder: 1,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Speech Evaluation Form',
        description: 'Official evaluation form for prepared speeches',
        category: 'meeting-resources',
        fileUrl: '/resources/evaluation-form.pdf',
        accessLevel: 'member',
        displayOrder: 2,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Pathways Navigator',
        description: 'Complete guide to all 11 Toastmasters Pathways',
        category: 'member-resources',
        linkUrl: 'https://www.toastmasters.org/pathways-overview',
        accessLevel: 'public',
        displayOrder: 1,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'Timer Instructions',
        description: 'Guide for timing speeches and signaling speakers',
        category: 'meeting-resources',
        fileUrl: '/resources/timer-guide.pdf',
        accessLevel: 'member',
        displayOrder: 3,
      },
    }),
    prisma.resource.create({
      data: {
        title: 'District 91 Newsletter',
        description: 'Latest news and events from District 91',
        category: 'member-resources',
        linkUrl: 'https://d91toastmasters.org.uk/newsletter',
        accessLevel: 'public',
        displayOrder: 2,
      },
    }),
  ]);

  // Create site settings
  await Promise.all([
    prisma.siteSetting.create({
      data: {
        key: 'club_name',
        value: 'MLP London Bridge Speakers',
        type: 'string',
        description: 'Club name displayed on the website',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'meeting_schedule',
        value: '1st, 3rd & 5th Tuesday at 18:30',
        type: 'string',
        description: 'Regular meeting schedule',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'meeting_location',
        value: "St Christopher's Inn, 121 Borough High Street, London SE1 1NP",
        type: 'string',
        description: 'Meeting venue address',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'contact_email',
        value: 'contact@mlptoastmasters.org',
        type: 'string',
        description: 'Main contact email',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'contact_phone',
        value: '+447808811778',
        type: 'string',
        description: 'Contact phone number',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'enable_guest_registration',
        value: 'true',
        type: 'boolean',
        description: 'Allow guests to register for meetings online',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'club_number',
        value: '00760422',
        type: 'string',
        description: 'Official Toastmasters International club number',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'district',
        value: '91',
        type: 'string',
        description: 'Toastmasters District number',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'area',
        value: 'L23',
        type: 'string',
        description: 'Toastmasters Area designation',
      },
    }),
  ]);

  // Create FAQ items
  await Promise.all([
    prisma.faqItem.create({
      data: {
        question: "What is Toastmasters?",
        answer: "Toastmasters International is a non-profit educational organization that teaches public speaking and leadership skills through a worldwide network of clubs.",
        category: "About Toastmasters",
        displayOrder: 1,
      },
    }),
    prisma.faqItem.create({
      data: {
        question: "How much does it cost to join?",
        answer: "There are international dues paid to Toastmasters International, plus local club dues. Contact us for current pricing information.",
        category: "Membership",
        displayOrder: 1,
      },
    }),
    prisma.faqItem.create({
      data: {
        question: "When and where do you meet?",
        answer: "We meet on the 1st, 3rd & 5th Tuesday of each month at 18:30 at St Christopher's Inn, 121 Borough High Street, London SE1 1NP.",
        category: "Meetings",
        displayOrder: 1,
      },
    }),
    prisma.faqItem.create({
      data: {
        question: "Can I visit as a guest?",
        answer: "Absolutely! Guests are always welcome at our meetings. It's the best way to see what Toastmasters is all about and meet our members.",
        category: "Meetings",
        displayOrder: 2,
      },
    }),
    prisma.faqItem.create({
      data: {
        question: "What are Pathways?",
        answer: "Pathways is Toastmasters' education program featuring 11 specialized learning paths that help you develop communication and leadership skills through hands-on learning.",
        category: "Education",
        displayOrder: 1,
      },
    }),
    prisma.faqItem.create({
      data: {
        question: "Do I have to give a speech right away?",
        answer: "No! You can visit several times as a guest before joining. Once you become a member, you can take your time and give your first speech when you feel ready.",
        category: "Membership",
        displayOrder: 2,
      },
    }),
    prisma.faqItem.create({
      data: {
        question: "What happens at a typical meeting?",
        answer: "Each meeting includes prepared speeches, impromptu speaking (Table Topics), speech evaluations, and various meeting roles. It's a supportive learning environment.",
        category: "Meetings",
        displayOrder: 3,
      },
    }),
    prisma.faqItem.create({
      data: {
        question: "How long does it take to complete a pathway?",
        answer: "Most members complete a pathway in 18-24 months, but you can go at your own pace. There's no pressure to rush through the program.",
        category: "Education",
        displayOrder: 2,
      },
    }),
  ]);

  console.log('Seed completed successfully!');
  console.log('Admin login: admin@mlptoastmasters.org / admin123');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });