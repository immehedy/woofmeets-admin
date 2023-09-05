import { useState, useEffect } from 'react';
import getAppointment from './lib/hooks/useGetAppointmentDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import AppointmentProposal from './AppointmentProposal';
import { BsStars } from 'react-icons/bs';
import { useModal } from '../reusable/modal';
import Reviews from '../reusable/Reviews';
import ReportCard from './ReportCard';
const AppointmentDetailsPage = () => {
  const [appointment, setAppointment] = useState();
  const search = useLocation().search;
  const opk = new URLSearchParams(search).get('opk');
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();
  const [reviewedFor, setReviewedFor] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getAppointment(opk)
      .then((res) => {
        setAppointment(res?.data);
      })
      .catch((err) => console.log(err));
  }, [opk]);
  console.log({ appointment, opk });
  const showSitterDetails = (email) => {
    navigate(`/sitters/details?email=${email}`);
  };
  const showOwnerDetails = (email) => {
    navigate(`/users/details?email=${email}`);
  };
  const payoutRoute = (id) => {
    navigate(`/transactions/details?id=${id}`);
    return null;
  };
  const paymentStatus =
    appointment?.billing[0]?.appointmentBillingTransactions[0]?.state;
  return (
    <div className="container w-full bg-white rounded-sm p-2 grid md:grid-cols-2 gap-2 grid-cols-1">
      <div className="col-span-2 grid grid-cols-4 gap-2">
        <p className="font-bold text-[18px] text-gray-600 rounded-sm px-2 py-2 text-center shadow-md">
          Apt. Status :{' '}
          <span
            className={`
      ${appointment?.status === 'PENDING' && 'bg-red-200'} 
      ${appointment?.status === 'ACCEPTED' && 'bg-green-300'} 
      ${appointment?.status === 'PROPOSAL' && 'bg-blue-500'} 
      ${appointment?.status === 'REJECTED' && 'bg-red-500'} 
      ${appointment?.status === 'CANCELLED' && 'bg-red-300'} 
      ${appointment?.status === 'PAID' && 'bg-green-300'} 
      ${appointment?.status === 'COMPLETED' && 'bg-green-500'} 
      text-white px-3 py-1 rounded-full
      `}
          >
            {appointment?.status}
          </span>
        </p>
        <p className="font-bold text-[18px] text-gray-600 rounded-sm px-2 py-2 text-center shadow-md">
          Payment :{' '}
          <span
            className={`
      ${paymentStatus === 'CUSTOMER_PAID' && 'bg-green-300'} 
      ${paymentStatus === 'FULL_REFUND' && 'bg-red-500'} 
      ${paymentStatus === 'PARTIAL_REFUND' && 'bg-red-300'} 
      ${paymentStatus === 'PAID_OUT' && 'bg-green-500'} 
      text-white px-3 py-1 rounded-full
      `}
          >
            {paymentStatus === 'CUSTOMER_PAID' && 'Owner Paid'}
            {paymentStatus === 'FULL_REFUND' && 'Fully Refunded'}
            {paymentStatus === 'PARTIAL_REFUND' && 'Partially Refunded'}
            {paymentStatus === 'PAID_OUT' && 'Paid Out'}
          </span>
        </p>

        <button
          onClick={() =>
            payoutRoute(
              appointment?.billing[0]?.appointmentBillingTransactions[0]?.id
            )
          }
          className={`${
            appointment?.billing?.length > 0
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          } bg-blue-200 font-bold text-gray-600 rounded-sm px-2 py-2 shadow-md`}
        >
          Payout bill
        </button>
        <a
          href={`https://dashboard.stripe.com/payments/${appointment?.billing[0]?.appointmentBillingPayments[0]?.piId}`}
          rel="noreferrer"
          target="_blank"
          className={`${
            appointment?.billing?.length > 0
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          } bg-[#a288ef] font-bold text-gray-600 rounded-sm px-2 py-2 shadow-md text-center`}
        >
          Go to stripe
        </a>
      </div>
      <div className="col-span-2">
        <h3 className="font-bold text-[20px] underline py-2 mt-10">
          Appointment Booking Details
        </h3>
      </div>
      <div>
        <div className="flex gap-4 bg-orange-200 p-4 rounded-md">
          <img
            alt="owner_image"
            src={
              appointment?.user?.image?.url
                ? appointment?.user?.image?.url
                : '/profileImageDummy.png'
            }
            className="w-[100px] h-[100px] rounded-full"
          />
          <div className="flex-1">
            <p onClick={() => showOwnerDetails(appointment?.user?.email)}>
              Owner Name :{' '}
              <span className="hover:underline cursor-pointer text-blue-600">
                {appointment?.user?.firstName} {appointment?.user?.lastName}
              </span>
            </p>
            <p>Email : {appointment?.user?.email}</p>
            <p>
              Phone :{' '}
              {appointment?.user?.contact?.phone
                ? appointment?.user?.contact?.phone
                : 'N/A'}
            </p>
            <p>
              City :{' '}
              {appointment?.user?.basicInfo?.city
                ? appointment?.user?.basicInfo?.city
                : 'N/A'}
            </p>
            <p>
              Zipcode :{' '}
              {appointment?.user?.zipcode ? appointment?.user?.zipcode : 'N/A'}
            </p>
            <p>
              TimeZone :{' '}
              {appointment?.user?.timezone
                ? appointment?.user?.timezone
                : 'N/A'}
            </p>
            <button
              onClick={() => {
                openModal();
                setReviewedFor(appointment?.user);
                setRating(appointment?.userReview?.rating);
                setReviews(appointment?.userReview?.reviews);
              }}
              className="flex gap-1 items-center text-white bg-orange-500 rounded-md px-4 py-1 mt-2"
            >
              Reviews
              <BsStars className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-4 bg-orange-200 p-4 rounded-md">
          <img
            alt="sitter_image"
            src={
              appointment?.provider?.user?.image?.url
                ? appointment?.provider?.user?.image?.url
                : '/profileImageDummy.png'
            }
            className="w-[100px] h-[100px] rounded-full"
          />
          <div className="flex-1">
            <p
              onClick={() =>
                showSitterDetails(appointment?.provider?.user?.email)
              }
            >
              Sitter Name :{' '}
              <span className="hover:underline cursor-pointer text-blue-600">
                {appointment?.provider?.user?.firstName}{' '}
                {appointment?.provider?.user?.lastName}
              </span>
            </p>
            <p>Email : {appointment?.provider?.user?.email}</p>
            <p>
              Phone :{' '}
              {appointment?.provider?.user?.contact?.phone
                ? appointment?.provider?.user?.contact?.phone
                : 'N/A'}
            </p>
            <p>
              City :{' '}
              {appointment?.provider?.user?.basicInfo?.city
                ? appointment?.provider?.user?.basicInfo?.city
                : 'N/A'}
            </p>
            <p>
              Zipcode :{' '}
              {appointment?.provider?.user?.zipcode
                ? appointment?.provider?.user?.zipcode
                : 'N/A'}
            </p>
            <p>
              TimeZone :{' '}
              {appointment?.provider?.user?.timezone
                ? appointment?.provider?.user?.timezone
                : 'N/A'}
            </p>
            <button
              onClick={() => {
                openModal();
                setReviewedFor(appointment?.provider?.user);
                setRating(appointment?.providerReview?.rating);
                setReviews(appointment?.providerReview?.reviewsProvider);
              }}
              className="flex gap-1 items-center text-white bg-orange-500 rounded-md px-4 py-1 mt-2"
            >
              Reviews
              <BsStars className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <h3 className="font-bold text-[20px] py-2 mt-5">
          Appointment Proposals
        </h3>
        {appointment?.appointmentProposal
          ?.slice(0)
          ?.reverse()
          ?.map((proposal, index) => (
            <AppointmentProposal
              appointment={appointment}
              item={proposal}
              number={index + 1}
              currencyCode={proposal?.currency}
              appointmentLength={appointment?.appointmentProposal?.length}
            />
          ))}
      </div>
      <Reviews
        isOpen={isOpen}
        closeModal={closeModal}
        reviewedFor={reviewedFor}
        rating={rating}
        reviews={reviews}
      />
      {appointment?.appointmentCard?.length > 0 && (
        <div className="col-span-2">
          <h3 className="font-bold text-[20px] py-2 mt-5">Report Cards</h3>
          {appointment?.appointmentCard.map((card, index) => (
            <ReportCard item={card} number={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentDetailsPage;
