import React from "react";

const AppointmentDetails = ({ item, number, currencyType }) => {
  return (
    <div className="shadow-md cursor-pointer my-2">
      <div className="flex gap-2 items-center px-2 py-1 bg-orange-400 rounded-md">
        <div className="flex-1 text-white">
          <h4>Appointment Final Proposal</h4>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-2">
        <div>
          <h4 className="font-bold py-1 underline">General Information</h4>
          <p>
            Appointment Type:{" "}
            {item?.appointmentserviceType
              ? item?.appointmentserviceType
              : "N/A"}
          </p>
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
          <p>
            Pet Price : {currencyType}{" "}
            {item?.priceCalculationDetails?.sixtyMinutesRate
              ? item?.priceCalculationDetails?.subTotal -
                item?.priceCalculationDetails?.sixtyMinutesRate?.rate?.amount *
                  item?.priceCalculationDetails?.sixtyMinutesRate?.count
              : item?.priceCalculationDetails?.subTotal}
          </p>
          <p>
            Additional Rate :{" "}
            {item?.priceCalculationDetails?.sixtyMinutesRate
              ? currencyType +
                item?.priceCalculationDetails?.sixtyMinutesRate?.rate?.amount *
                  item?.priceCalculationDetails?.sixtyMinutesRate?.count
              : "N/A"}
          </p>
          <p>
            Subtotal : {currencyType}
            {item?.priceCalculationDetails?.subTotal}
          </p>
          <p>
            Service Charge:{" "}
            {item?.priceCalculationDetails?.serviceChargeInParcentage}%
          </p>
          <p>
            Total: {currencyType}
            {item?.priceCalculationDetails?.total}
          </p>
        </div>
        <div>
          <h4 className="font-bold py-1 underline">Pet Information</h4>
          {item?.priceCalculationDetails?.petsRates?.map((pet) => (
            <div
              key={pet?.id}
              className="p-2 bg-gray-200 rounded-md my-2 w-auto"
            >
              <p className="break-words">Pet Name : {pet?.name}</p>
              <p>Rate Name : {pet?.rate?.name}</p>
              <p>
                Amount : {currencyType}
                {pet?.rate?.amount * pet?.count}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-bold py-1 underline">Provider Fee Information</h4>
          <div>
            <p>
              Total Amount: {currencyType}
              {item?.priceCalculationDetails?.providerFee?.providerTotal}
            </p>
            <p>
              Subscription Fee: {currencyType}
              {item?.priceCalculationDetails?.providerFee?.subscriptionFee}
            </p>
            <p>
              Subscription Type:{" "}
              {item?.priceCalculationDetails?.providerFee?.subscriptionType}
            </p>
            <p>
              Subscription Percentage:{" "}
              {
                item?.priceCalculationDetails?.providerFee
                  ?.subscriptionFeeInParcentage
              }
              %
            </p>
            <p>
              Extra Fee:{" "}
              {item?.providerExtraFee
                ? currencyType + item?.providerExtraFee
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
