import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { BenefitLocation } from "@/components/BenefitLocation";
import { Testimonials } from "@/components/Testimonials";
import Faq from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { SplitBanner } from "@/components/SplitBanner";
import { ToastmastersMission } from "@/components/ToastmastersMission";
import { ToastmastersSkills } from "@/components/ToastmastersSkills";
import { ClubAffiliations } from "@/components/ClubAffiliations";
import AboutUs from "@/components/AboutUs";
import GoogleMap from "@/components/GoogleMap";
import ProgramSchedule from "@/components/ProgramSchedule";
import { getSettings } from "@/lib/settings";
import { getFeaturedPrograms, getActivePrograms } from "@/lib/actions";
import { generateLocalBusinessStructuredData, generateOrganizationStructuredData } from "@/lib/seo";

export const dynamic = 'force-dynamic';

// Static fallback if no dynamic facilities are available
const fallbackBenefitOne = {
  title: "Modern Facilities for Every Occasion",
  desc: "Our centre offers versatile spaces perfect for community events, fitness classes, children's parties, and group meetings.",
  image: "/img/placeholder.png",
  bullets: [
    {
      title: "Main Hall (120 capacity)",
      desc: "9.81m × 12.64m space perfect for large events, exercise classes, and community gatherings",
      icon: "■",
    },
    {
      title: "Small Hall (15 capacity)", 
      desc: "4.26m × 6.20m intimate space ideal for small group classes and meetings",
      icon: "▪",
    },
    {
      title: "Kitchen Facilities",
      desc: "Equipped with sink, power outlets, and seating area for catering needs",
      icon: "●",
    },
  ],
};



export default async function Home() {
  const settings = await getSettings();
  console.log('[Home] Settings loaded:', { 
    banner_programs_image: settings.banner_programs_image,
    site_title: settings.site_title 
  });
  
  // Fetch data using server actions
  const featuredPrograms = await getFeaturedPrograms()
  const activePrograms = await getActivePrograms(1)
  
  console.log('[Home] Data fetched:', {
    featuredPrograms: featuredPrograms.length,
    activePrograms: activePrograms.length,
    // facilityImages: removed - not using facilities
  });

  // Create dynamic split banner data
  const splitBannerData = [
    // Education section
    {
      id: "education",
      title: settings.banner_programs_title || "[to be updated]",
      subtitle: settings.banner_programs_subtitle || "[to be updated]",
      description: "Choose from 11 comprehensive Pathways designed to help you develop communication and leadership skills. From Presentation Mastery to Dynamic Leadership, each pathway offers structured learning with practical application.",
      image: settings.banner_programs_image || "/img/placeholder.png",
      buttonText: "EXPLORE PATHWAYS",
      buttonLink: "/education",
      features: "11 pathways available",
    },
    // Meetings section  
    {
      id: "meetings",
      title: settings.banner_facilities_title || "[to be updated]",
      subtitle: settings.banner_facilities_subtitle || "[to be updated]",
      description: "Experience our supportive learning environment where members practice speeches, receive constructive feedback, and develop leadership skills. Visitors always welcome at St Christopher's Inn, London Bridge.",
      image: "/img/placeholder.png",
      buttonText: "VISIT AS GUEST",
      buttonLink: "/meetings",
      features: "3 meetings per month",
    },
  ];

  // Community stats data for Toastmasters
  const communityStats = [
    {
      title: "50+",
      desc: "Members in our growing club",
    },
    {
      title: "3x",
      desc: "Meetings per month to practice skills",
    },
    {
      title: "15+",
      desc: "Years serving the London Bridge community",
    },
    {
      title: "Mon 7pm",
      desc: "Regular meeting time every week",
    },
  ];

  // Additional stats for extended content
  const extendedStats = [
    {
      title: "35+",
      desc: "Years serving the community",
    },
    {
      title: "1990",
      desc: "Year we started serving the community",
    },
    {
      title: "35+",
      desc: "Years of community service",
    },
    {
      title: "100%",
      desc: "Volunteer-run community organisation",
    },
  ];

  // Format programmes for ProgramSchedule component
  const programScheduleSections = featuredPrograms.length > 0 ? [
    {
      title: "Featured Programmes",
      items: featuredPrograms.slice(0, 6).map((program: any) => ({
        name: program.title,
        subtitle: program.instructor ? `with ${program.instructor}` : undefined,
        description: program.description || undefined,
        schedule: program.schedules.length > 0 
          ? program.schedules.map((s: any) => s.description).filter((desc: any) => desc !== null && desc !== undefined)
          : ["Schedule available upon inquiry"],
        price: program.price || undefined,
        contact: {
          email: program.contactEmail || undefined,
          phone: program.contactPhone || undefined,
          website: program.contactWebsite || undefined
        },
        ageGroup: program.ageGroup || undefined,
        instructor: program.instructor || undefined
      }))
    }
  ] : [];


  // Generate structured data
  const localBusinessData = generateLocalBusinessStructuredData({
    name: settings.site_title,
    description: settings.site_description,
    address: {
      streetAddress: settings.address.split(',')[0] || 'Churchill Gardens',
      addressLocality: 'West Acton',
      addressRegion: 'London',
      postalCode: 'W3 0PG',
      addressCountry: 'GB',
    },
    telephone: settings.contact_phone,
    email: settings.contact_email,
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://westactoncc.org.uk',
    openingHours: ['Mo-Su 07:00-23:00'],
    priceRange: '£-££',
    amenityFeature: [
      'WiFi',
      'Private Parking',
      'Wheelchair Access',
      'Kitchen Facilities',
      'Audio/Visual Equipment',
      'Sound System',
      'LED Lighting'
    ],
    image: [
      '/img/placeholder.png'
    ]
  });

  const organizationData = generateOrganizationStructuredData(settings);

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />

      {/* Hero + Split Banner */}
      <Hero 
        settings={settings} 
        backgroundImage={undefined}
      />
      <SplitBanner sections={splitBannerData} />
      
      {/* Community Impact Stats */}
      <Container>
        <SectionTitle
          preTitle="Community Impact"
          title="Serving West Acton Together"
        >
          {settings.site_title} is dedicated to improving wellbeing through education, 
          leisure, and recreational programmes. We work closely with local businesses and community members 
          to create a vibrant, supportive community.
        </SectionTitle>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-8 sm:mt-16">
          {communityStats.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center shadow-sm">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-primary-600 mb-1 sm:mb-2">
                {item.title}
              </p>
              <p className="text-sm sm:text-base text-gray-800 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* About Us Section */}
      <AboutUs />

      {/* Facilities section removed for Toastmasters site */}
      
      <BenefitLocation
        title="Convenient Location & Access"
        description="Located in Churchill Gardens, West Acton, we're easily accessible by public transport and offer onsite parking. Our central location makes us the perfect hub for West London community activities."
        contact="Find us at Churchill Gardens, West Acton, London W3 0PG"
        sectionHeading="Getting Here"
        image="/img/placeholder.png"
        benefits={[
          {
            title: "West Acton Station",
            desc: "Just minutes from West Acton Underground station on the Central line, providing direct access to Central London",
            icon: "●"
          },
          {
            title: "Bus Routes",
            desc: "Served by bus 218 and other local routes for easy access from across London and surrounding areas",
            icon: "●"
          },
          {
            title: "Private On-site Parking",
            desc: "Free private parking available for visitors and event attendees, with disabled access spaces",
            icon: "●"
          }
        ]}
        buttons={[
          {
            label: "Get Directions",
            href: "https://maps.google.com/?q=Churchill+Gardens+West+Acton+London+W3+0PG",
            variant: "primary" as const
          },
          {
            label: "Contact Us",
            href: "/contact",
            variant: "secondary" as const
          }
        ]}
      />

      {/* Featured Programs Preview */}
      {programScheduleSections.length > 0 && (
        <Container className="py-8 sm:py-16">
          <ProgramSchedule
            title="Featured Programmes This Week"
            sections={programScheduleSections}
          />
          <div className="text-center mt-6 sm:mt-8">
            <a
              href="/programs"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Programmes
            </a>
          </div>
        </Container>
      )}

      {/* Toastmasters Mission */}
      <ToastmastersMission />
      
      {/* Skills Development */}
      <ToastmastersSkills />
      
      {/* Club Affiliations */}
      <ClubAffiliations />
      
      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
