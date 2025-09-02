import { Container } from "@/components/Container";

export function ToastmastersSkills() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transform Your Communication & Leadership Skills
            </h2>
            <p className="text-lg text-gray-600">
              Looking to improve your speaking and leadership skills? Ignite your career? Gain the confidence to speak up?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - About Toastmasters */}
            <div>
              <div className="bg-primary-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-primary-800 mb-3">Since 1924</h3>
                <p className="text-primary-700">
                  Toastmasters International has helped more than 4 million people just like you, from around the world, become more confident speakers and leaders.
                </p>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="flex items-center">
                  <span className="text-accent-600 font-bold text-xl mr-3">364,000+</span>
                  Members worldwide
                </p>
                <p className="flex items-center">
                  <span className="text-accent-600 font-bold text-xl mr-3">16,200+</span>
                  Active clubs
                </p>
                <p className="flex items-center">
                  <span className="text-accent-600 font-bold text-xl mr-3">145</span>
                  Countries represented
                </p>
              </div>
            </div>

            {/* Right Column - Skills You'll Learn */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">You'll Learn How To:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Formulate and express your ideas effectively</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Be more persuasive and confident when giving presentations</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Improve your one-on-one dealings with others</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Become a better negotiator and gain trust</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700">Inspire your team through effective leadership</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-accent-50 rounded-lg border-l-4 border-accent-600">
                <p className="text-accent-800 font-medium">
                  "Toastmasters is the most efficient, enjoyable and affordable way of gaining great communication skills."
                </p>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-6">
              Don't delay! Become the speaker and leader you want to be. Confident, charismatic leaders weren't born that way.
            </p>
            <a 
              href="/meetings" 
              className="inline-block px-8 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold text-lg"
            >
              Visit Our Next Meeting - You Won't Regret It!
            </a>
          </div>

        </div>
      </Container>
    </section>
  );
}