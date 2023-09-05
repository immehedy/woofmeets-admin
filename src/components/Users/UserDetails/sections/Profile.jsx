import BlockUser from './BlockUser';

const Profile = ({ user }) => {
  return (
    <div className="w-full md:w-3/12 md:mx-2">
      <div className="bg-white rounded-md overflow-hidden primary-shadow">
        <div className="image overflow-hidden">
          <img
            className="h-auto w-full rounded mx-auto"
            src={user?.image ? user?.image?.url : '/profileImageDummy.png'}
            alt=""
          />
        </div>
        <h1 className="text-gray-900 capitalize text-center font-bold text-xl leading-8 my-1">
          {user?.firstName} {user?.lastName}
        </h1>

        <ul className=" text-gray-600 border-t border-gray-200 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
          <li className="flex items-center py-1">
            <span className="font-medium">Member since - </span>
            <span className="ml-auto text-sm font-medium">
              {new Date(user?.createdAt).toDateString()}
            </span>
          </li>
        </ul>

        <BlockUser user={user} />
      </div>
    </div>
  );
};

export default Profile;
