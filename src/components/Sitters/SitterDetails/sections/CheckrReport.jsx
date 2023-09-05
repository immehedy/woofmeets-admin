import cogoToast from "cogo-toast";
import { BsPatchCheckFill } from "react-icons/bs"
import { HiDocumentReport } from "react-icons/hi"
import { completeReport } from "../lib/hooks/updateCheckr";

const CheckrReport = ({reports}) => {
    const complete = (reportId) => {
        completeReport(reportId)
      .then((res) => {
        cogoToast.success("Report completed successfully");
        window.location.reload();
      })
      .catch((err) => {console.log(err); cogoToast.error("Error occured")});
    }
  return (
    <>
        {
      reports?.map((report, i) => (
    <div className="bg-white primary-shadow rounded-md">
      <div className="flex p-3 border-b items-center ">
        <div className="flex flex-1 items-center space-x-2 font-semibold text-gray-900 leading-8">
        <HiDocumentReport className="text-[20px]" />
        <span className="-mb-[4px]">Checkr Report</span>
        </div>
        <div>
            <buton onClick={() => {complete(report?.reportId)}} disabled={report?.status !== 'pending' ? true : false } 
            className=
            {`
            ${report?.status === 'pending' ? 'text-orange-400 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}
            bg-gray-100 border font-semibold px-2 py-1 
            rounded-md flex gap-1 items-center 
            `}
            > 
            <BsPatchCheckFill/>Complete Report
            </buton>
        </div>
      </div>
            <div className={`text-gray-700 py-3 ${i > 0 && 'border-t'}`} key={i}>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Status</div>
            <div className="px-4 py-2">{report?.status}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Result</div>
            <div className="px-4 py-2">{report?.result ? report?.result : 'N/A'}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Assessment</div>
            <div className="px-4 py-2">
              {report?.assessment ? report?.assessment : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Package</div>
            <div className="px-4 py-2">
              {report?.package ? report?.package : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Adjudication</div>
            <div className="px-4 py-2">
            {report?.adjudication ? report?.adjudication : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Cancelled</div>
            <div className="px-4 py-2">
            {report?.includesCanceled ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
      
    </div>
        ))
      }
    </>
  )
}

export default CheckrReport