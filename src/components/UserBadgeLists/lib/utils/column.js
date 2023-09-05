
export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => {
      return <p>{value.substr(0,20)}{value?.length > 20 && '...'}</p>
    },
  },
  {
    Header: 'Priority',
    accessor: 'priority',
  },
  {
    Header: 'Icon',
    accessor: 'icon',
    Cell: ({ value }) => {
      return <div className="flex justify-center"><img src={value ? value : "/no_image.png"} alt="profile" className="w-[50px] rounded-full"/></div>
    },
  },
  {
    Header: 'Image',
    accessor: 'image',
    Cell: ({ value }) => {
      return <div className="flex justify-center"><img src={value ? value : "/no_image.png"} alt="profile" className="w-[50px] rounded-full"/></div>
    },
  },
]