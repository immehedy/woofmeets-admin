import { GrDocumentText } from 'react-icons/gr';

const OtherInfo = ({ user }) => {
  return (
    <div className="bg-white primary-shadow rounded-md">
      <div className="flex border-b p-3 items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
        <GrDocumentText className="text-[20px]" />
        <span className="tracking-wide">Other Info</span>
      </div>
      <div className="text-gray-700 pb-3">
        <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Background Check</div>
            <div className="px-4 py-2">
              {user?.backGroundCheck ? user?.backGroundCheck : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Have Pets</div>
            <div className="px-4 py-2">
              {user?.havePets ? user?.havePets : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Home Type</div>
            <div className="px-4 py-2">
              {user?.homeType ? user?.homeType : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Subscription Type</div>
            <div className="px-4 py-2">
              {user?.subscriptionType ? user?.subscriptionType : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Safety Quiz</div>
            <div className="px-4 py-2">
              {user?.quizPassed ? 'Passed' : 'Not Yet'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Profile</div>
            <div className="px-4 py-2">
              {user?.profileSubmitted ? 'Completed' : 'In-complete'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
