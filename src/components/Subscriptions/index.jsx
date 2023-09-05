import { useState, useEffect } from "react";
import getSubscriptionLists, { searchSubscriptionLists } from "./lib/hooks/useSubscriptionList";
import { COLUMNS } from "./lib/utils/column";
import PaginationTable from "../Table/PaginationTable";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getSubscriptionLists(pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            firstName: data?.user?.firstName,
            lastName: data?.user?.lastName,
            email: data?.user?.email,
            subscriptionType: data?.membershipPlanPrice?.membershipPlan?.name,
            status: data?.status,
            paymentStatus: data?.paymentStatus,
          };
        });
        setLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {
        console.log(err);
        setPage(1);
      });
  }, [pageNumber]);

  const search = (searchString) => {
    searchSubscriptionLists(searchString, pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            firstName: data?.user?.firstName,
            lastName: data?.user?.lastName,
            email: data?.user?.email,
            subscriptionType: data?.membershipPlanPrice?.membershipPlan?.name,
            status: data?.status,
            paymentStatus: data?.paymentStatus,
          };
        });
        setLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {
        console.log(err);
        setPage(1);
      });
  };

  const showDetails = (email) => {
    navigate(`/sitters/details?email=${email}`);
  };

  return (
    <PaginationTable
      columns={COLUMNS}
      data={lists}
      pageNumber={pageNumber}
      search={search}
      setPage={setPage}
      totalPage={totalPage}
      showDetails={showDetails}
      loading={loading}
    />
  );
};

export default SubscriptionPage;
