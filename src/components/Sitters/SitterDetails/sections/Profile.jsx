import { upgradeBackgroundCheck } from "../../lib/hooks/useGetSitterDetails";
import { approveUser } from "../../lib/hooks/useGetSitter";
import BlockUser from "./BlockUser";
import BadgeSetter from "./BadgeSetter";
import { FaExternalLinkAlt } from "react-icons/fa";
import ConfirmMessage from "../../../GlobalNotification/ConfirmMessage";
import { useModal } from "../../../reusable/modal";
import { useState } from "react";
import { cancelSub } from "../lib/hooks/cancelSubsription";

const Profile = ({ user, active, setActive }) => {
  const { openModal, isOpen, closeModal } = useModal();
  const { openModal: openSubs, isOpen: isSubsOpen, closeModal: closeSubs } = useModal();
  const [loading, setLoading] = useState(false);
  const { backgroundCheck } = user;
  const upgradeChecker = () => {
    upgradeBackgroundCheck(user?.user?.email)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const approveSitter = (email) => {
    setLoading(true);
    approveUser(email)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const cancelSubsciption = () => {
    const userId = user?.user?.id;
    const subId =
      user?.user?.userSubscriptions[user?.user?.userSubscriptions.length - 1]
        ?.status === "active" &&
      user?.user?.userSubscriptions[user?.user?.userSubscriptions.length - 1]
        ?.deletedAt === null
        ? user?.user?.userSubscriptions[
            user?.user?.userSubscriptions.length - 1
          ]?.id
        : 0;

    setLoading(true);
    cancelSub(userId, subId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full md:w-3/12 md:mx-2">
      <div className="bg-white rounded-md overflow-hidden primary-shadow">
        <div className="image overflow-hidden">
          <img
            className="h-auto w-full mx-auto"
            src={
              user?.user?.image
                ? user?.user?.image?.url
                : "/profileImageDummy.png"
            }
            alt=""
          />
        </div>
        <div className="flex justify-center space-x-3 p-3 mt-2">
          <h1 className="text-gray-900 capitalize font-bold text-xl">
            {user?.user?.firstName} {user?.user?.lastName}
          </h1>
          <span
            className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${
              active || !user?.isApproved ? "text-gray-500 " : "text-green-500"
            } `}>
            {active || !user?.isApproved ? "Deactivated" : "Active"}
          </span>
        </div>
        <div className="flex gap-2 justify-center items-center underline hover:text-blue-400 mb-2">
          <FaExternalLinkAlt />
          <a
            href={`https://woofmeets.com/profile/view/${user?.user?.opk}`}
            rel="noreferrer"
            target="_blank">
            View profile
          </a>
        </div>

        <div className="px-3">
          {!user?.isApproved && (
            <button
              className="bg-green-400 text-white px-2 py-1 rounded-md w-full "
              onClick={openModal}>
              Approve
            </button>
          )}
        </div>

        <ul className="pt-2">
          <li className="flex border-t px-3 pt-4 pb-3 items-center">
            <span className="font-medium">Background Check</span>
            <span
              className={`ml-auto text-xs font-medium ${
                user?.backGroundCheck === backgroundCheck[0]?.type
                  ? "animate-none"
                  : "animate-bounce"
              }`}>
              <button
                onClick={upgradeChecker}
                className={`bg-[#FFA557] py-1 px-2 rounded text-white text-sm cursor-pointer`}>
                {user?.backGroundCheck === backgroundCheck[0]?.type
                  ? user?.backGroundCheck
                  : "Upgrade"}
              </button>
            </span>
          </li>
          <li className="flex border-t items-center px-3 py-3">
            <span className="font-medium">Member since - </span>
            <span className="ml-auto text-sm font-medium">
              {new Date(user?.user?.createdAt).toDateString()}
            </span>
          </li>
          <li className="flex border-t items-center px-3 py-3">
            <BadgeSetter user={user} />
          </li>
        </ul>
        <BlockUser user={user} active={active} setActive={setActive} />
        {(user?.subscriptionType === "PLATINUM" ||
          user?.subscriptionType === "GOLD") && (
          <div className="flex justify-center py-2">
            <button
              onClick={openSubs}
              className="text-red-700 text-center border-2 border-red-400 hover:bg-red-400 hover:text-white px-2 py-1 rounded-md">
              Cancelled subscription
            </button>
          </div>
        )}
      </div>
      <ConfirmMessage
        isOpen={isSubsOpen}
        submitMessage={cancelSubsciption}
        props={user?.user?.email}
        loading={loading}
        closeConfirmModal={closeSubs}
      />
      <ConfirmMessage
        isOpen={isOpen}
        submitMessage={approveSitter}
        props={user?.user?.email}
        loading={loading}
        closeConfirmModal={closeModal}
      />
    </div>
  );
};

export default Profile;
