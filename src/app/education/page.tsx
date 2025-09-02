export default function EducationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Educational Pathways</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">
          Toastmasters Pathways is our comprehensive learning experience that combines online learning with practical application in our meetings.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Communication Paths</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Presentation Mastery</li>
              <li>• Engaging Humor</li>
              <li>• Strategic Relationships</li>
              <li>• Persuasive Influence</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Leadership Paths</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Dynamic Leadership</li>
              <li>• Innovative Planning</li>
              <li>• Team Collaboration</li>
              <li>• Visionary Communication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}