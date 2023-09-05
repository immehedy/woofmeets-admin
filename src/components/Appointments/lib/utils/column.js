import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Owner",
    accessor: "owner",
  },
  {
    Header: "Owner Email",
    accessor: "ownerEmail",
  },
  {
    Header: "Sitter",
    accessor: "sitter",
  },
  {
    Header: "Sitter Email",
    accessor: "sitterEmail",
  },
  {
    Header: "Service",
    accessor: "service",
  },
  {
    Header: "Start Date",
    accessor: "startDate",
    Cell: ({ value }) => {
      return format(new Date(value), 'MM-dd-yyyy')
    }
  },
  {
    Header: "End Date",
    accessor: "endDate",
    Cell: ({ value }) => {
      return format(new Date(value), 'MM-dd-yyyy')
    }
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Payment Status",
    accessor: "paymentStatus",
  },
];
