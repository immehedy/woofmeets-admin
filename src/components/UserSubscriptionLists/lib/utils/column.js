import {format} from "date-fns"

export const COLUMNS = [
  {
    Header: 'User Id',
    accessor: 'userId',
  },
  {
    Header: 'Billing Date',
    accessor: 'billingDate',
    Cell: ({ value }) => {
      return format(new Date(value), 'MM-dd-yyyy')
    }
  },
  {
    Header: 'Name',
    accessor: 'customerName',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Plan',
    accessor: 'plan',
  },
  {
    Header: 'Currency',
    accessor: 'currency',
  },
  {
    Header: 'Total',
    accessor: 'total',
    Cell: ({ value }) => {
      return (<div className="text-gray-600">${value}</div>)
    },
  },
  {
    Header: 'Sub-Total',
    accessor: 'subTotal',
    Cell: ({ value }) => {
      return (<div className="text-gray-600">${value}</div>)
    },
  },
  {
    Header: 'Due',
    accessor: 'amountDue',
    Cell: ({ value }) => {
      return (<div className="text-gray-600">${value}</div>)
    },
  },
  {
    Header: 'Paid',
    accessor: 'amountPaid',
    Cell: ({ value }) => {
      return (<div className="text-gray-600">${value}</div>)
    },
  },
  {
    Header: 'Remaining',
    accessor: 'amountRemaining',
    Cell: ({ value }) => {
      return (<div className="text-gray-600">${value}</div>)
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
]