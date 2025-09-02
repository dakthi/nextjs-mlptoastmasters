import { Container } from "@/components/Container";

export function ToastmastersMission() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Toastmasters Mission</h2>
          <p className="text-lg text-gray-600 mb-8 italic">A statement of shared values</p>
          
          <div className="bg-primary-50 border-l-4 border-primary-500 p-8 rounded-lg mb-12">
            <p className="text-xl text-primary-800 font-medium leading-relaxed">
              "We provide a supportive and positive learning experience in which members are empowered to develop communication and leadership skills, resulting in greater self-confidence and personal growth."
            </p>
          </div>
          
          <p className="text-gray-700 text-base leading-relaxed">
            Through this mission, each Toastmaster gains a clear understanding of the club's purpose, and the organization as a whole benefits from a shared set of values and goals.
          </p>
        </div>
      </Container>
    </section>
  );
}