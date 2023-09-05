import { useState, useEffect } from "react";
import getTransaction from "../lib/hooks/useGetTransactionDetails";
import { useLocation } from "react-router-dom";
import Modal, { useModal } from "../../reusable/modal";
import { toggleLock } from "../lib/hooks/useSetTransactionFn";
import ConfirmationModal from "./ConfirmationModal";
import {format} from "date-fns"
import AppointmentDetails from "./AppointmentDetails"
import {FaUnlock} from 'react-icons/fa'

const TransactionDetailsPage = () => {
  const [transaction, setTransaction] = useState();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const { isOpen, openModal, closeModal } = useModal();
  const [toggleLock, setToggleLock] = useState(false);
  const [payout, setPayout] = useState(false);
  const [lockedAt, setLockedAt] = useState(false);

  useEffect(() => {
    getTransaction(id)
      .then((res) => {
        setTransaction(res?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const currencyCode = transaction?.currency === 'cad' ? 'C$' : '$';
  return (
    <div className="flex justify-center text-gray-600">
      <div className="w-2/3 bg-white shadow-lg rounded-md px-6 py-8">
        <div>
          <h2 className="text-[30px] font-bold text-gray-600 text-center my-4 ">
            Transaction History
          </h2>
        </div>
        <div className="col-span-2 mt-8">
          <h3 className="text-[20px] font-bold text-gray-600 ">Basic Info</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-semibold">
            <p>ID: {transaction?.provider?.user?.id}</p>
            <p>
              Provider : {transaction?.provider?.user?.firstName}{' '}
              {transaction?.provider?.user?.lastName}
            </p>
            <p>Email : {transaction?.provider?.user?.email}</p>
            <p>Subscription Plan : {transaction?.providerSubsStatus}</p>
          </div>
          <div className="text-right font-semibold">
            <p>
              <p>ID: {transaction?.billing?.appointment?.user?.id}</p>
              Client : {transaction?.billing?.appointment?.user?.firstName}{' '}
              {transaction?.billing?.appointment?.user?.lastName}
            </p>
            <p>Email : {transaction?.billing?.appointment?.user?.email}</p>
          </div>
          <div className="col-span-2 mt-8">
            <h3 className="text-[20px] font-bold text-gray-600 ">
              Appointment Details
            </h3>
          </div>
          <div>
            <p>Appointment ID : {transaction?.billing?.appointmentId}</p>
            <p>Opk : {transaction?.billing?.appointment?.opk}</p>
            <p>
              Invoice Number: {transaction?.billing?.appointment?.invoiceNumber}
            </p>
            <p>
              Start Date:{' '}
              {transaction?.startDate?.localDate
                ? format(new Date(transaction?.startDate?.localDate), 'MM-dd-yyyy')
                : transaction?.startDate?.date
                ? format(new Date(transaction?.startDate?.date.split('T')[0]), 'MM-dd-yyyy')
                : 'N/A'}
            </p>
          </div>
          <div className="text-right">
            <p>
              Last Status Changed By :{' '}
              {transaction?.billing?.appointment?.lastStatusChangedBy}
            </p>
            <p>
              Recurring:{' '}
              {transaction?.billing?.appointment?.isRecurring ? 'Yes' : 'No'}
            </p>
            <p>
              Cancellation Reason:{' '}
              {transaction?.billing?.appointment?.cancelReason
                ? transaction?.billing?.appointment?.cancelReason
                : 'N/A'}
            </p>
            <p>
              End Date:{' '}
              {transaction?.endDate?.localDate
                ? format(new Date(transaction?.endDate?.localDate), 'MM-dd-yyyy')
                : transaction?.endDate?.date
                ? format(new Date(transaction?.endDate?.date.split('T')[0]), 'MM-dd-yyyy')
                : 'N/A'}
            </p>
          </div>
          <div className="col-span-2 mt-8">
            <AppointmentDetails
              item={transaction?.appointmentProposal}
              currencyType={currencyCode}
            />
          </div>
          <div className="col-span-2 mt-8">
            <h3 className="text-[20px] font-bold text-gray-600">
              Billing Details
            </h3>
          </div>
          <div>
            <p>Billing Id : {transaction?.billingId}</p>
            <p>
              Release Date:{' '}
              {transaction?.releaseDate
                ? format(new Date(transaction?.releaseDate), 'MM-dd-yyyy')
                : 'N/A'}
            </p>

            <p>
              Current State : {transaction?.state ? transaction?.state : 'N/A'}
            </p>
            <p>
              Next State :{' '}
              {transaction?.nextState ? transaction?.nextState : 'N/A'}
            </p>
            <p>Number of Days : {transaction?.billing?.totalDayCount}</p>
          </div>
          <div className="text-right">
            <p>
              Subtotal : {currencyCode}
              {transaction?.billing?.subtotal}
            </p>
            <p>
              Service Charge: {currencyCode}
              {transaction?.billing?.serviceCharge} (
              {transaction?.billing?.serviceChargePercentage}%){' '}
            </p>
            <p className="border-t-2 my-2 font-bold">
              Total Paid : {currencyCode}
              {transaction?.billing?.total}
            </p>
            {transaction?.state === 'FULL_REFUND' ? (
              <p className="my-2 font-bold text-red-500">
                Refunded Amount : {currencyCode}
                {transaction?.userRefundAmount}
              </p>
            ) : (
              <div>
                <p>
                  Base amount : {currencyCode}
                  {transaction?.billing?.subtotal}
                </p>
                <p className="">
                  Provider Percentage : {transaction?.providerPercentage}%
                </p>
                <p className="border-t-2 my-2 font-bold">
                  Provider Payout Amount : {currencyCode}
                  {transaction?.providerAmount}
                </p>
                {transaction?.exchangeRate && (
                  <>
                    <p className="border-t-2 my-2 font-bold">
                      Exchange Rate : {(transaction?.exchangeRate).toFixed(2)}
                    </p>
                    <p className="border-t-2 my-2 font-bold">
                      Payout Amount in USD : $
                      {(
                        transaction?.providerAmount * transaction?.exchangeRate
                      ).toFixed(2)}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          {transaction?.deletedAt === null && !transaction?.releaseStatus && (
            <>
            <div className="py-2 w-full">
            <button
              className={`${
                transaction?.lockedAt ? "bg-green-500" : "bg-red-500"
              } text-white rounded-md px-2 py-1 w-full`}
              onClick={() => {
                openModal();
                setToggleLock(!toggleLock);
                setLockedAt(transaction?.lockedAt);
              }}
            >
              {transaction?.lockedAt ? "Unlock" : "Lock"} this transaction
            </button>
          </div>
          <div className="text-right w-full py-2">
            <button
              disabled={transaction?.lockedAt ? true : false}
              onClick={() => {
                openModal();
                setPayout(!payout);
              }}
              className={`${
                transaction?.lockedAt
                  ? "bg-gray-200"
                  : "bg-green-500 text-white"
              } rounded-md px-2 py-1 w-full ${
                transaction?.lockedAt ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Payout
            </button>
          </div>
            </>
          )}
        </div>
        <div className="text-center mt-2">
          {transaction?.lockedAt && (
            <p className="text-red-400 flex justify-center gap-2 items-center font-semibold">
              <span>
                <FaUnlock />
              </span>
              <span>Unlock this transaction to make payment</span>
            </p>
          )}
          {transaction?.state === 'CUSTOMER_PAID' && !transaction?.lockedAt && (
            <p className="text-gray-400 flex justify-center gap-2 items-center font-semibold">
              {/* <span><FaUnlock/></span> */}
              <span>
                *** The customer has paid the amount for this transaction
              </span>
            </p>
          )}
          {transaction?.state === 'PAID_OUT' && !transaction?.lockedAt && (
            <p className="text-green-600 flex justify-center gap-2 items-center font-semibold">
              {/* <span><FaUnlock/></span> */}
              <span>*** This transaction is paid out</span>
            </p>
          )}
          {transaction?.state === 'FULL_REFUND' && !transaction?.lockedAt && (
            <p className="text-red-400 flex justify-center gap-2 items-center font-semibold">
              {/* <span><FaUnlock/></span> */}
              <span>*** This transaction is fully refunded</span>
            </p>
          )}
          {transaction?.state === 'PARTIAL_REFUND' &&
            !transaction?.lockedAt && (
              <p className="text-red-400 flex justify-center gap-2 items-center font-semibold">
                {/* <span><FaUnlock/></span> */}
                <span>*** This transaction is partially refunded</span>
              </p>
            )}
        </div>

      </div>
      <ConfirmationModal
        id={transaction?.id}
        isOpen={isOpen}
        closeModal={closeModal}
        toggleLock={toggleLock}
        setToggleLock={setToggleLock}
        payout={payout}
        setPayout={setPayout}
        lockedReason={transaction?.lockedReason}
        lockedAt={lockedAt}
      />
    </div>
  );
};

export default TransactionDetailsPage;
