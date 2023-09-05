
export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'firstName',
    Cell: ({ row }) => {
      return (<div>{row?.original?.firstName} {row?.original?.lastName}</div>)
    },
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'contact',
  },
  {
    Header: 'TimeZone',
    accessor: 'timezone',
  },
  {
    Header: 'Subscription',
    accessor: 'subscriptionType',
  },
  {
    Header: 'Background Check',
    accessor: 'backGroundCheck',
  },
  {
    Header: 'Profile Complete',
    accessor: 'profileSubmitted',
    Cell: ({ row }) => {
      return (<div className={`${row?.values?.profileSubmitted === "Completed" ? "text-green-600 font-bold" : "text-gray-600 font-bold"}`}>{row?.values?.profileSubmitted}</div>)
    },
  },
]