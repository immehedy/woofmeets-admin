import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLUMNS } from '../lib/utils/column';
import { filteredItems } from '../lib/utils/filteredItem';
import { filterSearch } from '../../../Appointments/lib/hooks/useGetAppointments';
import PaginationTable from '../../../Table/PaginationTable';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';

const UserAppointments = ({ userId }) => {
  const [appointmentLists, setAppointmentLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const currentPage = localStorage.getItem('curr-page');
  const [pageNumber, setPage] = useState(currentPage ? currentPage : 1);
  const FilterSearchText = localStorage.getItem('filter-search-data');
  const [searchString, setSearchString] = useState(
    FilterSearchText ? JSON.parse(FilterSearchText) : ''
  );

  useEffect(() => {
    setLoading(true);
    filterSearch({ appointmentUserId: userId, ...searchString }, pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            id: data?.id,
            opk: data?.opk,
            owner: data?.user?.firstName + ' ' + data?.user?.lastName,
            ownerEmail: data?.user?.email,
            sitterEmail: data?.provider?.user?.email,
            sitter:
              data?.provider?.user?.firstName +
              ' ' +
              data?.provider?.user?.lastName,
            service: data?.providerService?.serviceType?.name,
            startDate:
              data?.appointmentProposal[0]?.priceCalculationDetails
                ?.formatedDatesByZone[0]?.localDate,
            endDate:
              data?.appointmentProposal[0]?.priceCalculationDetails
                ?.formatedDatesByZone[
                data?.appointmentProposal[0]?.priceCalculationDetails
                  ?.formatedDatesByZone?.length - 1
              ]?.localDate,
            status: data?.status,
            paymentStatus:
              data?.billing[0]?.appointmentBillingTransactions[0]?.state ===
              'CUSTOMER_PAID'
                ? 'Owner Paid'
                : data?.billing[0]?.appointmentBillingTransactions[0]?.state ===
                  'PAID_OUT'
                ? 'Paid Out'
                : data?.billing[0]?.appointmentBillingTransactions[0]?.state ===
                  'FULL_REFUND'
                ? 'Fully Refunded'
                : 'Partially Refunded',
          };
        });
        setAppointmentLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {
        console.log(err);
        setPage(1);
        setLoading(false);
      });
  }, [pageNumber, userId, searchString]);

  const navigate = useNavigate();

  const showDetails = (opk) => {
    navigate(`/appointments/details?opk=${opk}`);
    return null;
  };

  const searchByFilter = (queryData) => {
    localStorage.setItem('filter-search-data', JSON.stringify(queryData));
    localStorage.removeItem('curr-page');
    localStorage.removeItem('search-data');
    setSearchString(queryData);
  };

  return (
    <>
      <div className="col-span-2 bg-white primary-shadow rounded-md mb-5">
        <div className="flex p-3 border-b items-center space-x-2 font-semibold text-gray-900 leading-8">
          <BsFillJournalBookmarkFill className="text-[20px]" />
          <span>Owner Appointment List</span>
        </div>

        <div className="p-3 pt-4">
          <PaginationTable
            filteredItems={filteredItems}
            columns={COLUMNS}
            data={appointmentLists}
            pageNumber={pageNumber}
            setPage={setPage}
            totalPage={totalPage}
            loading={loading}
            showDetails={showDetails}
            searchByFilter={searchByFilter}
            grid={4}
          />
        </div>
      </div>
    </>
  );
};

export default UserAppointments;
