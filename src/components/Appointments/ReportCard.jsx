import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import {format} from "date-fns"
const ReportCard = ({item, number}) => {
    const [showService, setShowservice] = useState(false);
  return (
    <div
      className="shadow-md cursor-pointer my-2"
    >
      <div className="flex gap-2 items-center px-2 py-1 bg-orange-400 rounded-md" onClick={() => setShowservice(!showService)}>
        <div className="flex-1 text-white">
          <h4>Report No #{number++}</h4>
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
        <div className="grid grid-cols-2 gap-3 p-2">
            <div className=" bg-gray-200 rounded-sm px-2 py-1">
            {/* <h3 className="text-[15px] font-bold underline text-center">Report Images</h3> */}
            <div className="flex justify-center gap-2 py-2 flex-wrap">
            {
                item?.images.map((image, index) => (
                    <img key={index} src={image} alt="report-galery" className="w-full h-full rounded-md "/>
                ))
            }
            {
              item?.images?.length === 0 &&
              <img  src='/no_image.png' alt="report-galery" className="w-full h-full rounded-md "/>
            }
            </div>
            </div>
            <div>
                <h3 className="text-[15px] font-bold underline text-center">General Info</h3>
                <p>Medication: <span className="font-semibold">{item?.medication ? item?.medication : 'N/A'}</span></p>
                <p>Additional Notes: <span className="font-semibold">{item?.additionalNotes ? item?.additionalNotes : 'N/A'}</span></p>
                <p>Total Walk Time: <span className="font-semibold">{item?.totalWalkTime ? item?.totalWalkTime : "N/A"}</span></p>
                <p>Distance: <span className="font-semibold">{item?.distance ? item?.distance : "N/A"}</span> <span className="font-semibold">{item?.distance ? item?.distanceUnit : ""}</span></p>
                <p>Report Generated at: <span className="font-semibold">{item?.generateTime ? format(new Date(item?.generateTime), "MM-dd-yyyy") : 'N/A'}</span></p>
                <p>Report Submitted at: <span className="font-semibold">{item?.submitTime ? format(new Date(item?.submitTime), "MM-dd-yyyy") : 'N/A'}</span></p>
                <h3 className="text-[15px] font-bold underline text-center py-2">Pets Data</h3>
                <div className="h-[200px] overflow-y-auto flex gap-2">
                
                {
                    item?.petsData?.map((petData, index) => (
                        <div className="px-4 py-2 my-2 bg-orange-400 text-white rounded-md w-[200px]">
                         <span className="flex justify-center font-bold underline">{petData?.petDetails?.name}</span>
                        <p>Peed: <span className="font-bold">{petData?.pee ? petData?.pee +' time' : 'N/A'}</span></p>
                        <p>Pood: <span className="font-bold">{petData?.poo ? petData?.poo +' time' : 'N/A'}</span></p>
                        <p>Food: <span className="font-bold">{petData?.food ? petData?.food +' time' : 'N/A'}</span></p>
                        <p>Water: <span className="font-bold">{petData?.water ? petData?.water +' time' : 'N/A'}</span></p>
                        </div>
                    ))
                }
                {
                  item?.petsData?.length === 0 &&
                  <div className="w-full"><p className="text-red-400 text-center font-semibold">No pets data found !!!</p></div>
                }
            </div>
            </div>
            
        </div>
      )}
    </div>
  )
}

export default ReportCard