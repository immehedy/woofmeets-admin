import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import PaymentDetails from "./PaymentDetails";
import { useModal } from "../reusable/modal"
import ShowPetReview from "../reusable/ShowPetReview";
import {format} from "date-fns"
import { BsStars } from "react-icons/bs";
const AppointmentProposal = ({ appointment, item, number, currencyCode, appointmentLength }) => {
  const [showService, setShowservice] = useState((number === appointmentLength ) ? true : false);
  const currencyType = currencyCode === "cad" ? "C$" : "$";
  const { isOpen, openModal, closeModal } = useModal();
  const [petData, setPetData] = useState(null);
  return (
    <div
      className="shadow-md cursor-pointer my-2"
    >
      <div className="flex gap-2 items-center px-2 py-1 bg-orange-400 rounded-md" onClick={() => setShowservice(!showService)}>
        <div className="flex-1 text-white">
          <h4>{(number === appointmentLength ) ? 'Final Proposal' : `Proposal No #${number++}`}</h4>
        </div>
        <div className="text-white">Created at : {format(new Date(item?.createdAt), 'MM-dd-yyyy')}</div>
        <button>
          {showService ? (
            <RiArrowUpSLine className="text-white font-bold text-[30px]"  />
          ) : (
            <RiArrowDownSLine className="text-white font-bold text-[30px]" />
          )}
        </button>
      </div>

      {showService && (
        <div className="grid grid-cols-5 gap-3 p-2">
        {/* general info  */}
          <div className="col-span-2 bg-orange-100 px-2 py-2">
        <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-100 text-gray-900 px-2 py-1 h-[200px] overflow-y-auto">
        <h4 className="font-bold py-1 underline">Apt. Info</h4>
        <p>Apt. ID: {appointment?.id ? appointment?.id : 'N/A'}</p>
        <p>Invoice: <span>{appointment?.invoiceNumber ? appointment?.invoiceNumber : 'N/A'}</span></p>
        <p>OPK: {appointment?.opk ? appointment?.opk : 'N/A'}</p>
        <p>
          Apt. Type:{" "}
            <span className="font-semibold">
            {appointment?.providerService?.serviceType?.displayName
            ? appointment?.providerService?.serviceType?.displayName
            : "N/A"}
            </span>
        </p>
        </div>
        <div className="bg-gray-100 text-gray-900 px-2 py-1 h-[200px] overflow-y-auto">
        <h4 className="font-bold py-1 underline">Apt. Dates</h4>
        {
          item?.priceCalculationDetails?.formatedDatesByZone?.length > 0 &&
          <span>
          <p>
          Start date:{" "}
            <span className="font-semibold">
            {item?.priceCalculationDetails?.formatedDatesByZone[0]?.localDate
            ? format(new Date(item?.priceCalculationDetails?.formatedDatesByZone[0]?.localDate), 'MM-dd-yyyy')
            : 'N/A'}
            </span>
            
        </p>
        <p>
          End date:{" "}
            <span className="font-semibold">
            {item?.priceCalculationDetails?.formatedDatesByZone[ item?.priceCalculationDetails?.formatedDatesByZone?.length - 1 ]?.localDate
            ? format(new Date(item?.priceCalculationDetails?.formatedDatesByZone[ item?.priceCalculationDetails?.formatedDatesByZone?.length - 1 ]?.localDate), 'MM-dd-yyyy')
            : 'N/A'}
            </span>
        </p>
          </span>
        }
        <p>Recurring Apt.: {" "}
        <span className="font-semibold">{appointment?.isRecurring ? 'YES' : 'NO'}</span>
        </p>
            {
              appointment?.isRecurring && 
              <div>
              <p>Recurring Starting date : {" "}
              <span className="font-bold">{item?.recurringStartDate ? format(new Date(item?.recurringStartDate.split("T")[0]), 'MM-dd-yyyy') : 'N/A'}</span>
              </p>
              <p className="flex flex-col gap-2 w-1/2 ">Recurring days : {
                item?.proposalVisits.map((visit, index) => (
                <span className="text-white bg-orange-400 px-2 py-1 rounded-md text-center" key={index}>{visit?.name}</span>
              ))
              }</p>
              
              </div>
            }
        </div>
        <div className="col-span-2 bg-gray-100 text-gray-900 px-2 py-1 h-[140px] overflow-y-auto">
        <h4 className="font-bold py-1 underline">Refund or Cancellation details</h4>
        <p>
          Refund Details:{" "}
          {item?.refundDetails ? (
            <div className="bg-red-200 rounded-md p-2">
            <p>Refund Type: {item?.refundDetails?.refundType}</p>
            <p>Refunded Amount :{item?.refundDetails?.userAmount}</p>
            </div>
          ) : (
             "N/A"
          )}
        </p>
            
        <p>Cancelled Reason: {appointment?.cancelReason ? appointment?.cancelReason : 'N/A'}</p>
        </div>
        </div>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <PaymentDetails item={item} currencyType={currencyType}/>
          </div>
          <div className="col-span-5">
            <h3 className="font-extrabold text-center text-lg underline mt-2 mb-4">Pet information</h3>
            <div className="flex gap-2 items-center">
                {
                  item?.appointmentPet.map((pet, i) => (
                    <div className="w-[400px] border bg-gray-100 rounded-sm px-4 py-2" key={i}>
                    <img className="mx-auto rounded-full w-[80px] h-[80px]" alt="pet" src={pet?.pet?.profile_image ? pet?.pet?.profile_image?.url : '/no_image.png'}/>
                      <p>Name : {pet?.pet?.name}</p>
                      <p>Age : {pet?.pet?.ageYear ? pet?.pet?.ageYear+' years' : '-'} {pet?.pet?.ageMonth ? pet?.pet?.ageMonth + ' months' : '-'}</p>
                      <p>weight: {pet?.pet?.weight}</p>
                      <p>Type: {pet?.pet?.type}</p>
                      <div className="mt-2 flex justify-center">
                      <button onClick={()=> {openModal(); setPetData(pet?.pet)}} className="flex items-center gap-1 bg-orange-400 text-white text-center px-4 py-1 rounded-md">
                      Reviews
                      <BsStars className='text-white'/>
                      </button>
                      </div>
                    </div>
                  ))
                }
                <ShowPetReview
                  isOpen={isOpen}
                  closeModal={closeModal}
                  petId = {petData?.id}
                  pet = {petData}
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentProposal;
