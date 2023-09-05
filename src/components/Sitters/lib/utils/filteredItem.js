export const filteredItems = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
    },
    {
        label: 'Email',
        name: 'email',
        type: 'text',
    },
    {
        label: 'Phone',
        name: 'phone',
        type: 'text',
    },
    {
        label: 'Timezone',
        name: 'timezone',
        type: 'text',
    },
    {
        label: 'Subscription',
        name: 'subscription',
        type: 'select',
        options:[
            {
                name: 'NONE',
                value: 'NONE',
            },
            {
                name: 'BASIC',
                value: 'BASIC',
            },
            {
                name: 'GOLD',
                value: 'GOLD',
            },
            {
                name: 'PLATINUM',
                value: 'PLATINUM',
            },
        ]
    },
    {
        label: 'Background Check',
        name: 'backgroundCheck',
        type: 'select',
        options:[
            {
                name: 'NONE',
                value: 'NONE',
            },
            {
                name: 'BASIC',
                value: 'BASIC',
            },
            {
                name: 'GOLD',
                value: 'GOLD',
            },
            {
                name: 'PLATINUM',
                value: 'PLATINUM',
            },
        ]
    },
    {
        label: 'Profile',
        name: 'profile',
        type: 'select',
        options:[
            {
                name: 'Completed',
                value: 'Completed',
            },
            {
                name: 'In-Complete',
                value: 'In-Complete',
            },
        ]
    },
    {
        label: 'Profile Approved',
        name: 'isApproved',
        type: 'select',
        options:[
            {
                name: 'Approved',
                value: true,
            },
            {
                name: 'Pending',
                value: false,
            },
        ]
    },
]
