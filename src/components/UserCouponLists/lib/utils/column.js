import {format} from "date-fns"

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Coupon Code',
    accessor: 'code',
  },
  {
    Header: 'Percentage',
    accessor: 'percentage',
  },
  {
    Header: 'Expire Date',
    accessor: 'expireDate',
    Cell: ({ value }) => {
      return format(new Date(value), 'yyyy-MM-dd')
    }
  },
  {
    Header: 'Coupon Type',
    accessor: 'couponType',
  },
]