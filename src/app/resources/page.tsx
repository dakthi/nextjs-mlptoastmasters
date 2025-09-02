export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Resources</h1>
      <div className="space-y-6">
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#" className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-blue-900">Meeting Agenda Template</h3>
              <p className="text-sm text-gray-600 mt-1">Standard template for our meeting structure</p>
            </a>
            <a href="#" className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-blue-900">Evaluation Forms</h3>
              <p className="text-sm text-gray-600 mt-1">Forms for evaluating speeches and roles</p>
            </a>
            <a href="#" className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-blue-900">Timer Instructions</h3>
              <p className="text-sm text-gray-600 mt-1">Guide for timing speeches and roles</p>
            </a>
            <a href="#" className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-blue-900">Role Descriptions</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed descriptions of meeting roles</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">External Resources</h2>
          <div className="space-y-3">
            <a 
              href="https://www.toastmasters.org/pathways-overview" 
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-blue-900">Pathways Learning Experience</h3>
              <p className="text-sm text-gray-600 mt-1">Official Toastmasters Pathways guide</p>
            </a>
            <a 
              href="https://d91toastmasters.org.uk" 
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-blue-900">District 91 Website</h3>
              <p className="text-sm text-gray-600 mt-1">News and events from our district</p>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}