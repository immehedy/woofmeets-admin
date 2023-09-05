import React from 'react'

const PaymentDetails = ({item, currencyType}) => {
  return (
    <>
        {/* owner fee details  */}
        <div className="bg-gray-100 px-4 py-2 rounded-sm">
            <h4 className="font-bold py-1 underline">
              Owner Fee Information
            </h4>
            <div>
            <p className="flex justify-between">
            <span>Service rate :</span>
            <span>
            {currencyType}
              {item?.priceCalculationDetails?.sixtyMinutesRate
                ? item?.priceCalculationDetails?.subTotal -
                  item?.priceCalculationDetails?.sixtyMinutesRate?.rate
                    ?.amount *
                    item?.priceCalculationDetails?.sixtyMinutesRate?.count
                : item?.priceCalculationDetails?.subTotal}
            </span>
            </p>
            <p className="flex justify-between border-b">
            <span>Additional Rate : </span>
            <span>
            {item?.priceCalculationDetails?.sixtyMinutesRate
                ? '(+) '+ currencyType +
                  item?.priceCalculationDetails?.sixtyMinutesRate?.rate
                    ?.amount *
                    item?.priceCalculationDetails?.sixtyMinutesRate?.count
                : "N/A"}
            </span>
            </p>
            <p className="flex justify-between font-semibold">
            <span>Sub total : </span>
            <span>{currencyType}
              {item?.priceCalculationDetails?.subTotal}</span>
            </p>
            <p className="flex justify-between border-b">
            <span>Platform fee {'('+item?.priceCalculationDetails?.serviceChargeInParcentage+'%)'}:</span>
            <span className="text-green-600 font-extrabold">
             +{ currencyType + (item?.priceCalculationDetails?.subTotal * (item?.priceCalculationDetails?.serviceChargeInParcentage / 100))?.toFixed(2)}
            </span>
            </p>
            <p className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>
            {currencyType}
              {item?.priceCalculationDetails?.total}
            </span>
            </p>
            </div>
          </div>
          {/* owner fee details  */}
          {/* provider fee details  */}
          <div className="bg-gray-100 px-4 py-2 rounded-sm">
            <h4 className="font-bold py-1 underline">
              Provider Fee Information
            </h4>
            <div>
            <p className="flex justify-between">
            <span>Service rate :</span>
            <span>
            {currencyType}
              {item?.priceCalculationDetails?.sixtyMinutesRate
                ? item?.priceCalculationDetails?.subTotal -
                  item?.priceCalculationDetails?.sixtyMinutesRate?.rate
                    ?.amount *
                    item?.priceCalculationDetails?.sixtyMinutesRate?.count
                : item?.priceCalculationDetails?.subTotal}
            </span>
            </p>
            <p className="flex justify-between border-b">
            <span>Additional Rate : </span>
            <span>
            {item?.providerExtraFee
                  ? currencyType + item?.providerExtraFee
                  : "N/A"}
            </span>
            </p>
            <p className="flex justify-between font-semibold">
            <span>Sub total : </span>
            <span>{currencyType}
              {item?.priceCalculationDetails?.subTotal}</span>
            </p>
            <p className="flex justify-between border-b">
            <span>Platform fee {'('+item?.priceCalculationDetails?.providerFee?.subscriptionFeeInParcentage+'%)'}:</span>
            <span className="text-green-600 font-extrabold">
            -{ currencyType + item?.priceCalculationDetails?.providerFee?.subscriptionFee}
            </span>
            </p>
            <p className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>
            {currencyType}
            {item?.priceCalculationDetails?.providerFee?.providerTotal}
            </span>
            </p>
            </div>
          </div>
          {/* provider fee details  */}
          {/* platform fee details */}
          <div className="col-span-2 bg-gray-100 px-4 py-2 rounded-sm">
            <h4 className="font-bold py-1 underline">
              Platform Fee Information
            </h4>
            <div>
            <p className="flex justify-between">
            <span>Income from owner : </span>
            <span>{ currencyType + (item?.priceCalculationDetails?.subTotal * (item?.priceCalculationDetails?.serviceChargeInParcentage / 100))?.toFixed(2)} </span>
            </p>
            <p className="flex justify-between border-b">
            <span>Income from provider : </span>
            <span>{ currencyType + item?.priceCalculationDetails?.providerFee?.subscriptionFee} </span>
            </p>
            <p className="flex justify-between font-semibold">
            <span>Total:</span>
            <span className="text-green-600 font-extrabold">
            { currencyType + ((item?.priceCalculationDetails?.subTotal * (item?.priceCalculationDetails?.serviceChargeInParcentage / 100)) + item?.priceCalculationDetails?.providerFee?.subscriptionFee)?.toFixed(2)}
            </span>
            </p>
            </div>
          </div>
          {/* platform fee details */}
    </>
  )
}

export default PaymentDetails