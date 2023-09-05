import { useState, useEffect } from "react";
import getUserSubscriptionLists, {getBasicPayment, changeBasicVerificationPayment, searchPayment} from "./lib/hooks/useUserSubscriptionList";
import {COLUMNS} from "./lib/utils/column";
import PaginationTable from "../Table/PaginationTable"

const UserSubsriptionListsPage = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState("paid");
  const [basicVerification, setBasicVerification] = useState({
    id: null,
    amount: 0,
  });

  useEffect(() => {
    getUserSubscriptionLists(pageNumber, 20, status)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            ...data,
            email: data?.user?.email,
            plan: data?.userSubscription?.membershipPlanPrice?.membershipPlan?.displayName
          };
        });
        setLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
        getBasicPayment().then((res) => {
          setBasicVerification({
            id: res?.data?.id,
            amount: res?.data?.amount
          });
        })
        .catch((err) => {console.log(err)})
      })
      .catch((err) => {console.log(err); setPage(1)});
  }, [pageNumber]);

const changeVerificationPayment = (basicVerification) => {
  console.log({basicVerification});
  changeBasicVerificationPayment(basicVerification?.id, basicVerification?.amount)
    .then((res) => {
      console.log({res});
    })
    .catch((err) => console.log(err));
}

const search = (searchString) => {
  searchPayment(searchString, pageNumber, 20)
    .then((res) => {
      const modify = res?.data.map((data, index) => {
        return {
          ...data,
          email: data?.user?.email,
          plan: data?.userSubscription?.membershipPlanPrice?.membershipPlan?.displayName
        };
      });
      setLists(modify);
      setLoading(false);
      setTotalPage(Math.ceil(res?.meta?.total / 20));
      getBasicPayment().then((res) => {
        setBasicVerification({
          id: res?.data?.id,
          amount: res?.data?.amount
        });
      })
    })
    .catch((err) => {console.log(err); setPage(1)});
}
  return (
    <PaginationTable columns={COLUMNS} data={lists} pageNumber={pageNumber} setPage={setPage} totalPage={totalPage} loading={loading} search={search} basicVerification={basicVerification} setBasicVerification={setBasicVerification} changeVerificationPayment={changeVerificationPayment}/>
  );
};

export default UserSubsriptionListsPage;
