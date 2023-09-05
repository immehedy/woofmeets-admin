import {format} from "date-fns"

export const COLUMNS = [
  {
    Header: "Billing Id",
    accessor: "billingId",
  },
  {
    Header: "Paid Amount",
    accessor: "paidAmount",
    Cell: ({ row }) => {
      return (<div className="text-gray-600">{row?.original?.currency === 'cad' ? 'C$' : '$'}{row?.values?.paidAmount}</div>)
    },
  },
  {
    Header: "Provider Subscription",
    accessor: "providerSubsStatus",
  },
  {
    Header: "Provider Percentage",
    accessor: "providerPercentage",
    Cell: ({ row }) => {
      return (<div className="text-gray-600">{row?.values?.providerPercentage}%</div>)
    },
  },
  {
    Header: "Provider Amount",
    accessor: "providerAmount",
    Cell: ({ row }) => {
      return (<div className="text-gray-600">{row?.original?.currency === 'cad' ? 'C$' : '$'}{row?.values?.providerAmount}</div>)
    },
  },
  {
    Header: "Release Date",
    accessor: "releaseDate",
    Cell: ({ value }) => {
      return format(new Date(value), 'MM-dd-yyyy')
    }
  },
  {
    Header: "State",
    accessor: "state",
  },
];
