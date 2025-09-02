export default function MeetingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Meetings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          Join us for our regular Toastmasters meetings where members develop their public speaking and leadership skills.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Meeting Schedule</h3>
            <p className="text-gray-600">1st, 3rd & 5th Tuesday at 18:30</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            <p className="text-gray-600">St Christopher's Inn, 121 Borough High Street, London SE1 1NP</p>
          </div>
        </div>
      </div>
    </div>
  );
}