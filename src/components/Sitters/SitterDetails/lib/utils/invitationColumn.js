import { format } from 'date-fns';

export const InvitationHeader = [
  {
    Header: 'Candidate Id',
    accessor: 'candidate_id',
  },
  {
    Header: 'Package',
    accessor: 'package',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Completed At',
    accessor: 'completed_at',
    Cell: ({ value }) => {
      return format(new Date(value), 'MM-dd-yyyy');
    },
  },
  {
    Header: 'Expires At',
    accessor: 'expires_at',
    Cell: ({ value }) => {
      return format(new Date(value), 'MM-dd-yyyy');
    },
  }
];
