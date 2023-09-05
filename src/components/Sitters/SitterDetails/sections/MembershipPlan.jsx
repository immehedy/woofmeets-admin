import { useEffect, useState } from 'react';
import {
  getMembershipPlans,
  postMembershipPlan,
} from '../../lib/hooks/useGetMembershipPlan';
import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { IoIosPaperPlane } from 'react-icons/io';

const MembershipPlan = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState();
  const [priceId, setPriceId] = useState(null);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [showPlan, setShowPlan] = useState(false);
  const { userId, subscriptionType } = user;
  console.log({ subscriptionType });
  useEffect(() => {
    getMembershipPlans()
      .then((res) => {
        setPlans(res?.data);
        setIdempotencyKey(uuidv4());
      })
      .catch((err) => console.log(err));
  }, []);

  const changeMembership = () => {
    const body = {
      subscriberId: userId,
      priceId: priceId,
      idempotencyKey: idempotencyKey,
    };
    setLoading(true);
    postMembershipPlan(body)
      .then((res) => {
        cogoToast.success('Membership plan changed');
        console.log({ res });
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        cogoToast.error(err?.data?.message);
      });
    setLoading(false);
  };

  return (
    <div className="primary-shadow rounded-md overflow-hidden">
      <div
        className="flex bg-white justify-between items-center  cursor-pointer px-3 py-4"
        onClick={() => setShowPlan(!showPlan)}
      >
        <div className="flex items-center space-x-2 font-semibold text-gray-900 ">
          <IoIosPaperPlane className="text-[20px]" />
          <span className="tracking-wide">Add Membership Plan</span>
        </div>
        {showPlan ? (
          <FaAngleUp className="text-[20px]" />
        ) : (
          <FaAngleDown className="text-[20px]" />
        )}
      </div>
      <div className={`  ${showPlan ? 'block' : 'hidden'}`}>
        <div
          className={`bg-white p-3 shadow-sm rounded-sm grid grid-cols-3 gap-2`}
        >
          {plans?.map((item, index) => (
            <label
              className="flex bg-gray-200 rounded-md p-2 w-auto cursor-pointer"
              key={index}
              htmlFor={`helper-radio-${index}`}
              onChange={(e) => {
                setPriceId(item?.id);
                setIdempotencyKey(uuidv4());
              }}
            >
              <div className="flex items-center h-5">
                <input
                  id={`helper-radio-${index}`}
                  aria-describedby="helper-radio-text"
                  type="radio"
                  name="membershipPlan"
                  value=""
                  className="w-4 h-4 text-orange-400 bg-gray-100 border-gray-300  dark:focus:ring-orange-600 "
                />
              </div>
              <div className="ml-2">
                <p className="font-bold">{item?.membershipPlan?.displayName}</p>
                <p className="text-sm h-10 overflow-y-auto my-2">
                  {item?.description}
                </p>
                <div className="flex gap-2 items-center">
                  <p className="line-through text-gray-600">
                    ${item?.rate}/ {item?.validity !== 1 ? item?.validity : ''}{' '}
                    month
                  </p>
                  <p className="font-bold text-gray-600">
                    ${item?.cropRate}/{' '}
                    {item?.validity !== 1 ? item?.validity : ''} month
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
        <div className="bg-white p-3">
          <button
            disabled={priceId === null || loading ? true : false}
            onClick={changeMembership}
            className={`px-4 py-2 bg-blue-400 text-white rounded-md ${
              priceId === null || loading
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            {loading ? 'saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlan;
