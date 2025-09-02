export default function MembersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Members</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          Meet our diverse community of speakers and leaders who are passionate about personal development and communication excellence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Member cards would go here */}
          <div className="text-center text-gray-500 py-8 col-span-full">
            Member directory coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}