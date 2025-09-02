export default function ContestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contests & Awards</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">
          Throughout the year, we participate in speech contests that showcase our members' speaking abilities and provide opportunities for recognition.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Annual Contests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-900">International Speech Contest</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Our flagship speaking competition leading to the World Championship of Public Speaking
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-green-900">Table Topics Contest</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Impromptu speaking competition testing quick thinking and speaking skills
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-purple-900">Evaluation Contest</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Competition focused on giving constructive feedback and evaluation skills
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-red-900">Humorous Speech Contest</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Entertaining speeches that showcase wit and humor while delivering a message
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Educational Awards</h3>
            <p className="text-gray-600">
              Members earn recognition for completing educational goals in their chosen Pathways, 
              from Level 1 completion to the prestigious Distinguished Toastmaster (DTM) award.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}