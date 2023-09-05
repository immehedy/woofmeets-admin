import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {searchUser, filterSearch} from './lib/hooks/useGetAppointments'
import {COLUMNS} from './lib/utils/column'
import { filteredItems } from './lib/utils/filteredItem';
import PaginationTable from "../Table/PaginationTable"

const AppointmentsPage = () => {
    const [appointmentLists, setAppointmentLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const currentPage = localStorage.getItem("curr-page");
    const [pageNumber, setPage] = useState(currentPage ? currentPage : 1);
    const searchText = localStorage.getItem("search-data");
    const FilterSearchText = localStorage.getItem("filter-search-data");
    const [searchedData, setSearchedData] = useState(searchText ? searchText : "");
    const [searchString, setSearchString] = useState(FilterSearchText ? JSON.parse(FilterSearchText) : "");

  useEffect(() => {
    if(searchedData !== ''){
      setLoading(true);
      searchUser(searchedData, pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            id: data?.id,
            opk: data?.opk,
            owner: data?.user?.firstName + ' ' + data?.user?.lastName,
            ownerEmail: data?.user?.email  ,
            sitterEmail: data?.provider?.user?.email,
            sitter: data?.provider?.user?.firstName + ' ' + data?.provider?.user?.lastName,
            service: data?.providerService?.serviceType?.name,
            startDate: data?.appointmentProposal[0]?.priceCalculationDetails?.formatedDatesByZone[0]?.localDate,
            endDate: data?.appointmentProposal[0]?.priceCalculationDetails?.formatedDatesByZone[data?.appointmentProposal[0]?.priceCalculationDetails?.formatedDatesByZone?.length - 1]?.localDate,
            status: data?.status,
            paymentStatus: data?.billing[0]?.appointmentBillingTransactions[0]?.state,
          }
        })
        setAppointmentLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {console.log(err); setPage(1); setLoading(false)});
    }
  }, [pageNumber, searchedData]);

  useEffect(() => {
    setLoading(true);
    filterSearch(searchString, pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            id: data?.id,
            opk: data?.opk,
            owner: data?.user?.firstName + ' ' + data?.user?.lastName,
            ownerEmail: data?.user?.email  ,
            sitterEmail: data?.provider?.user?.email,
            sitter: data?.provider?.user?.firstName + ' ' + data?.provider?.user?.lastName,
            service: data?.providerService?.serviceType?.name,
            startDate: data?.appointmentProposal[0]?.priceCalculationDetails?.formatedDatesByZone[0]?.localDate,
            endDate: data?.appointmentProposal[0]?.priceCalculationDetails?.formatedDatesByZone[data?.appointmentProposal[0]?.priceCalculationDetails?.formatedDatesByZone?.length - 1]?.localDate,
            status: data?.status,
            paymentStatus: data?.billing[0]?.appointmentBillingTransactions[0]?.state === 'CUSTOMER_PAID' ? 'Owner Paid' :
            data?.billing[0]?.appointmentBillingTransactions[0]?.state === 'PAID_OUT' ? 'Paid Out' :
            data?.billing[0]?.appointmentBillingTransactions[0]?.state === 'FULL_REFUND' ? 'Fully Refunded' : 'Partially Refunded',
          }
        })
        setAppointmentLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {console.log(err); setPage(1); setLoading(false)});
  }, [pageNumber, searchString]);

  const navigate = useNavigate();
 
  const showDetails = (opk) => {
        navigate(`/appointments/details?opk=${opk}`);
        return null;
  }
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
    data={appointmentLists} 
    pageNumber={pageNumber} 
    setPage={setPage} 
    totalPage={totalPage} 
    loading={loading} 
    showDetails={showDetails} 
    search={search} 
    searchByFilter={searchByFilter}
    grid={4}
     />
  )
}

export default AppointmentsPage