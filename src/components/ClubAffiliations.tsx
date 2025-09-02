import { Container } from "@/components/Container";

export function ClubAffiliations() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Club Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Club Affiliations</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Club Name:</span>
                <span className="text-gray-900 font-semibold">MLP London Bridge Speakers</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Club Number:</span>
                <span className="text-gray-900 font-semibold">760422</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Area:</span>
                <span className="text-gray-900 font-semibold">23</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Division:</span>
                <span className="text-gray-900 font-semibold">L</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">District:</span>
                <span className="text-gray-900 font-semibold">91</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Region:</span>
                <span className="text-gray-900 font-semibold">UK South</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700 font-medium">Parent Organization:</span>
                <span className="text-gray-900 font-semibold">Toastmasters International</span>
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Not Join Us!</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">When do we meet?</h4>
                <p className="text-gray-600">1st, 3rd & 5th Tuesday</p>
                <p className="text-gray-600">18:30 for 18:45 start</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Where do we meet?</h4>
                <p className="text-gray-600">St Christopher's Inn</p>
                <p className="text-gray-600">121 Borough High Street</p>
                <p className="text-gray-600">London SE1 1NP</p>
              </div>
              
              <div className="pt-4">
                <p className="text-accent-600 font-semibold mb-4">Be a guest at our next meeting!</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="/meetings" 
                    className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold text-center"
                  >
                    Visit as Guest
                  </a>
                  <a 
                    href="/contact" 
                    className="px-6 py-3 border border-accent-600 text-accent-600 rounded-lg hover:bg-accent-50 transition-colors font-semibold text-center"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}