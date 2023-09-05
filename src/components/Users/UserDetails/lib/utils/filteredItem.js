export const filteredItems = [
    {
        label: 'Owner Name',
        name: 'owner',
        type: 'text',
    },
    {
        label: 'Owner Email',
        name: 'ownerEmail',
        type: 'text',
    },
    {
        label: 'Sitter Name',
        name: 'sitter',
        type: 'text',
    },
    {
        label: 'Sitter Email',
        name: 'sitterEmail',
        type: 'text',
    },
    {
        label: 'Service',
        name: 'service',
        type: 'select',
        options:[
            {
                name: 'Boarding',
                value: 'Boarding',
            },
            {
                name: 'Pet Walking',
                value: 'Pet Walking',
            },
            {
                name: 'Day Care',
                value: 'Day Care',
            },
            {
                name: 'House Sitting',
                value: 'House Sitting',
            },
            {
                name: 'Drop-In Visits',
                value: 'Drop-In Visits',
            },
        ]
    },
    // {
    //     label: 'Start Date',
    //     name: 'startDate',
    //     type: 'date',
    // },
    // {
    //     label: 'End Date',
    //     name: 'endDate',
    //     type: 'date',
    // },
    {
        label: 'Appointment Status',
        name: 'status',
        type: 'select',
        options:[
            {
                name: 'Paid',
                value: 'PAID',
            },
            {
                name: 'Completed',
                value: 'COMPLETED',
            },
            {
                name: 'Canceled',
                value: 'CANCELLED',
            },
            {
                name: 'Proposal',
                value: 'PROPOSAL',
            },
            {
                name: 'Accepted',
                value: 'ACCEPTED',
            },
            {
                name: 'Rejected',
                value: 'REJECTED',
            },
        ]
    },
    {
        label: 'Payment Status',
        name: 'paymentStatus',
        type: 'select',
        options:[
            {
                name: 'Owner Paid',
                value: 'CUSTOMER_PAID',
            },
            {
                name: 'Full Refunded',
                value: 'FULL_REFUND',
            },
            {
                name: 'Partial Refunded',
                value: 'PARTIAL_REFUND',
            },
            {
                name: 'Paid Out',
                value: 'PAID_OUT',
            },
        ]
    },
]