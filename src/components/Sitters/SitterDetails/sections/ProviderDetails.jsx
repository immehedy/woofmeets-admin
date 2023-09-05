// TODO:
// -show provider details from api providerDetails section

import { BiDetail } from "react-icons/bi"

const ProviderDetails = ({details}) => {
    console.log({details});
  return (
    <div className="bg-white primary-shadow rounded-md">
      <div className="flex border-b p-3 items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
        <BiDetail className="text-[20px]" />
        <span className="tracking-wide">Details</span>
      </div>
      <div className="text-gray-700 pb-3 text-sm">
          <div className="px-4 py-2 ">
            <p className="font-semibold">Profile Heading - </p>
            <p className="p-2">{details?.headline ?? <span className="bg-red-400 text-white font-bold px-2 py-1 rounded-md mt-2">No info provided</span>}</p>
          </div>
          <div className="px-4 py-2">
            <p className="font-semibold">Experience ({details?.yearsOfExperience ? details?.yearsOfExperience + ' Years' : "n/a"}) - </p>
            <p className="p-2">{details?.about ?? details?.experienceDescription ?? <span className="bg-red-400 text-white font-bold px-2 py-1 rounded-md mt-2">No info provided</span> }</p>
          </div>
      </div>
    </div>
  )
}

export default ProviderDetails