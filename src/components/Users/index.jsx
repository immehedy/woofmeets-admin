import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import  {searchUser, filterSearch} from './lib/hooks/useGetUsers'
import {COLUMNS} from "./lib/utils/column"
import { filteredItems } from './lib/utils/filteredItem'
import PaginationTable from '../Table/PaginationTable'

const Userspage = () => {
  const [userLists, setUserLists] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const currentPage = localStorage.getItem('curr-page');
  const [pageNumber, setPage] = useState(currentPage ? currentPage : 1);
  const searchText = localStorage.getItem("search-data");
  const FilterSearchText = localStorage.getItem("filter-search-data");
  const [searchedData, setSearchedData] = useState(searchText ? searchText : "");
  const [searchString, setSearchString] = useState(FilterSearchText ? JSON.parse(FilterSearchText) : "");
  const [showCheckbox, setShowCheckbox] = useState(true);
  const [notificationIds, setNotificationIds] = useState('');

  useEffect(() => {
    if(searchedData !== ''){
      setLoading(true);
      searchUser(searchedData, pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            id: data?.id,
            ...data.user,
            image: data?.image?.url,
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            zipCode: data?.zipcode,
            timeZone: data?.timezone,
            phone: data?.contact?.phone,
            city: data?.basicInfo?.city,
          };
        });
        setUserLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {console.log(err); setPage(1);
        setLoading(false);});
    }
  }, [pageNumber,searchedData]);

  useEffect(() => {
    setLoading(true);
    filterSearch(pageNumber, 20, searchString)
    .then((res) => {
      const modify = res?.data.map((data, index) => {
        return {
          id: data?.id,
          ...data.user,
          image: data?.image?.url,
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
          zipCode: data?.zipcode,
          timeZone: data?.timezone,
          phone: data?.contact?.phone,
          city: data?.basicInfo?.city,
        };
      });
      setUserLists(modify);
      setLoading(false);
      setTotalPage(Math.ceil(res?.meta?.total / 20));
    })
    .catch((err) => {console.log(err); setPage(1);setLoading(false);});
  }, [searchString, pageNumber])

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const showDetails = (email) => {
    navigate(`/users/details?email=${email}`);
  };

  const search = (searchString) => {
    setSearchedData(searchString);
    localStorage.setItem('search-data', searchString);
    localStorage.removeItem('curr-page');
    localStorage.removeItem('ilter-search-data');
  }
  const searchByFilter = (queryData) => {
    localStorage.setItem('filter-search-data', JSON.stringify(queryData));
    localStorage.removeItem('curr-page');
    localStorage.removeItem('search-data');
    setSearchString(queryData);
  }

  return (
      <PaginationTable 
      filteredItems={filteredItems}
      columns={COLUMNS} 
      data={userLists} 
      pageNumber={pageNumber} 
      setPage={setPage} 
      totalPage={totalPage} 
      loading={loading} 
      showDetails={showDetails} 
      search={search} 
      searchByFilter={searchByFilter}
      grid={4}
      showCheckbox={showCheckbox}
      notificationIds={notificationIds}
      setNotificationIds={setNotificationIds}
      />
  )
}

export default Userspage;
