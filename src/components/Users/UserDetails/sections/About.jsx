import { FiUser } from 'react-icons/fi';

const About = ({ user }) => {
  return (
    <div className="bg-white primary-shadow rounded-md">
      <div className="flex p-3 border-b items-center space-x-2 font-semibold text-gray-900 leading-8">
        <FiUser className="text-[20px]" />
        <span className="-mb-[4px]">About</span>
      </div>

      <div className="text-gray-700 py-3">
        <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">First Name</div>
            <div className="px-4 py-2">{user?.firstName}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Last Name</div>
            <div className="px-4 py-2">{user?.lastName}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Contact No.</div>
            <div className="px-4 py-2">
              {user?.contact ? user?.contact?.phone : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">DOB</div>
            <div className="px-4 py-2">
              {user?.basicInfo?.dob
                ? new Date(user?.basicInfo?.dob).toLocaleDateString()
                : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Current Address</div>
            <div className="px-4 py-2">
              {user?.basicInfo
                ? user?.basicInfo?.addressLine1 + ' ' + user?.basicInfo?.city
                : ' N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Email.</div>
            <div className="px-4 py-2">
              <a className="text-blue-800" href="mailto:jane@example.com">
                {user?.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
