import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {searchUser, filterSearch} from "./lib/hooks/useGetSitter";
import {COLUMNS} from "./lib/utils/column"
import { filteredItems } from "./lib/utils/filteredItem";
import PaginationTable from '../Table/PaginationTable'
import {approveUser} from "./lib/hooks/useGetSitter";
const SittersPage = () => {
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [approve, setApprove] = useState(false);
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
    if(searchedData){
      setLoading(true);
      searchUser(searchedData, pageNumber, 20)
        .then((res) => {
          const modify = res?.data.map((data, index) => {
            return {
              id: index,
              ...data.user,
              profileSubmitted: data?.profileSubmitted
                ? 'Completed'
                : 'In-Complete',
              backGroundCheck: data?.backGroundCheck,
              isApproved: data?.isApproved,
              subscriptionType: data?.subscriptionType,
              contact: data?.user?.contact?.phone,
            };
          });
          setUserLists(modify);
          setLoading(false);
          setApproveLoading(false);
          setTotalPage(Math.ceil(res?.meta?.total / 20));
        })
        .catch((err) => {
          console.log(err);
          setPage(1);
          setLoading(false);
        });
    }
  }, [pageNumber, searchedData]);

  useEffect(() => {
    if(searchString?.isApproved !== undefined){
      (searchString?.isApproved === 'true') ? searchString.isApproved = true : searchString.isApproved = false;
    } 
    setLoading(true);
    filterSearch(searchString, pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            id: index,
            ...data.user,
            profileSubmitted: data?.profileSubmitted ? "Completed" : "In-Complete",
            backGroundCheck: data?.backGroundCheck,
            isApproved: data?.isApproved,
            subscriptionType: data?.subscriptionType,
            contact: data?.user?.contact?.phone,
          };
        });
        console.log({modify});
        setUserLists(modify);
        setLoading(false);
        setApproveLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {console.log(err); setPage(1);setLoading(false);});
  }, [pageNumber, searchString]);


  const navigate = useNavigate();
  const approveSitter = (email) => {
    setApproveLoading(true);
    approveUser(email)
      .then((res) => {
        setApprove(!approve);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const showDetails = (email) => {
    navigate(`/sitters/details?email=${email}`);
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
    approveSitter={approveSitter} 
    approveLoading={approveLoading} 
    search={search} 
    searchByFilter={searchByFilter}
    grid={4}
    showCheckbox={showCheckbox}
    notificationIds={notificationIds}
    setNotificationIds={setNotificationIds}
    />
  );
};

export default SittersPage;
