import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getTransactions, {
  searchTransaction,
} from "./lib/hooks/useGetTransactions";
import { COLUMNS } from "./lib/utils/column";
import PaginationTable from "../Table/PaginationTable";

const TransactionsPage = () => {
  const [transactionLists, setTransactionLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const currentPage = localStorage.getItem("curr-page");
  const [pageNumber, setPage] = useState(currentPage ? currentPage : 1);

  const [toggleLock, setToggleLock] = useState(false);
  const [payout, setPayout] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [lockedReason, setLockedReason] = useState("");
  const [lockedAt, setLockedAt] = useState(false);

  useEffect(() => {
    getTransactions(pageNumber, 20)
      .then((res) => {
        setTransactionLists(res?.data?.billingTransactions);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
        if (res?.data?.billingTransactions?.length === 0) {
          setPage(1);
        }
      })
      .catch((err) => {
        console.log(err);
        setPage(1);
      });
  }, [pageNumber]);
  const navigate = useNavigate();

  const showDetails = (id) => {
    navigate(`/transactions/details?id=${id}`);
  };
  const search = (searchString) => {
    searchTransaction(searchString, pageNumber, 20)
      .then((res) => {
        setTransactionLists(res?.data?.billingTransactions);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
        if (res?.data?.billingTransactions?.length === 0) {
          setPage(1);
        }
      })
      .catch((err) => {
        console.log(err);
        setPage(1);
      });
  };
  return (
    <PaginationTable
      columns={COLUMNS}
      data={transactionLists}
      pageNumber={pageNumber}
      setPage={setPage}
      totalPage={totalPage}
      loading={loading}
      showDetails={showDetails}
      search={search}
      payment={true}
      payout={payout}
      setPayout={setPayout}
      toggleLock={toggleLock}
      setToggleLock={setToggleLock}
      transactionId={transactionId}
      setTransactionId={setTransactionId}
      lockedReason={lockedReason}
      setLockedReason={setLockedReason}
      lockedAt={lockedAt}
      setLockedAt={setLockedAt}
    />
  );
};

export default TransactionsPage;
