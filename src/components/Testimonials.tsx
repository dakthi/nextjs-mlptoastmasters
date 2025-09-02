import React from "react";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";

interface Testimonial {
  id: number;
  content: string;
  name: string;
  role: string | null;
}

// Default fallback testimonials
const fallbackTestimonials = [
  {
    id: 1,
    content: "MLP London Bridge Speakers has transformed my confidence. The supportive environment and constructive feedback helped me overcome my fear of public speaking.",
    name: "Sarah Johnson",
    role: "Member since 2022"
  },
  {
    id: 2,
    content: "The leadership opportunities at MLP have been incredible. I've grown from a nervous speaker to serving as Area Governor, all thanks to the skills I learned here.",
    name: "David Chen",
    role: "Distinguished Toastmaster"
  },
  {
    id: 3,
    content: "The pathway program is brilliantly structured. I completed Dynamic Leadership and now mentor new members. The skills transfer directly to my professional role.",
    name: "Amira Hassan",
    role: "VP Education, Former President"
  },
];

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        content: true,
        name: true,
        role: true,
      }
    });

    // Return database testimonials if available, otherwise fallback
    return testimonials.length > 0 ? testimonials : fallbackTestimonials;
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    return fallbackTestimonials;
  }
}

export const Testimonials = async () => {
  const testimonials = await getTestimonials();
  
  return (
    <section className="py-16 bg-gray-50">
      <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What Our Community Says
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from our members about their transformative journey with MLP London Bridge Speakers
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard 
            key={testimonial.id}
            quote={testimonial.content}
            avatar="/img/placeholder.png"
            name={testimonial.name}
            title={testimonial.role || ""}
          />
        ))}
      </div>
      </Container>
    </section>
  );
};

function TestimonialCard({
  quote,
  avatar,
  name,
  title,
}: {
  quote: string;
  avatar: string;
  name: string;
  title: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full">
      <div>
        <p className="text-gray-800 text-base leading-relaxed lg:text-lg mb-6">
          "{quote}"
        </p>
      </div>
      <div className="border-t pt-4 flex items-center space-x-3">
        <img
          src={avatar}
          alt={`${name} avatar`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}