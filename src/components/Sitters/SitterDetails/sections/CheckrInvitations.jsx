import { useEffect, useState } from "react"
import { BsCardChecklist } from "react-icons/bs"
import PaginationTable from "../../../Table/PaginationTable"
import {InvitationHeader} from "../lib/utils/invitationColumn"

const CheckrInvitations = ({invitations}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        invitations?.map((invitation, i) => {
            return setData([...data, invitation?.src]);
        })
    },[]);
  return (
    <div className="col-span-2 bg-white primary-shadow rounded-md mb-5">
        <div className="flex p-3 border-b items-center space-x-2 font-semibold text-gray-900 leading-8">
          <BsCardChecklist className="text-[20px]" />
          <span>Invitation List</span>
        </div>

        <div className="p-3 pt-4">
          <PaginationTable
            columns={InvitationHeader}
            data={data}
            pageNumber={1}
            setPage={1}
            totalPage={1}
          />
        </div>
      </div>
  )
}

export default CheckrInvitations