import { useState, useEffect } from "react";
import {COLUMNS} from "./lib/utils/column";
import PaginationTable from "../Table/PaginationTable"
import getCouponLists, { searchCoupon } from "./lib/hooks/useCouponList";
import { useNavigate } from "react-router-dom";
import { deleteCoupon } from "./lib/hooks/useCreateCoupon";


const UserCouponListsPage = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentPage = localStorage.getItem("curr-page");
  const [pageNumber, setPage] = useState(currentPage ? currentPage : 1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  const getCoponLists = () => {
    setLoading(true);
    getCouponLists(pageNumber, 20)
      .then((res) => {
        const modify = res?.data.map((data, index) => {
          return {
            id: data?.id,
            code: data?.code,
            percentage: data?.percentage,
            expireDate: data?.expiresAt,
            couponType: data?.isPublic ? 'Public' : 'Private',
          };
        });
        setLists(modify);
        setLoading(false);
        setTotalPage(Math.ceil(res?.meta?.total / 20));
      })
      .catch((err) => {console.log(err); setPage(1);setLoading(false); setLists([])});
  }
  useEffect(() => {
    getCoponLists();
  }, [pageNumber]);

  const moveToCreateCoupon = () => {
    navigate("/user-coupon-create");
  }
  const moveToEditCoupon = (code) => {
    navigate(`/user-coupon-edit/coupon?code=${code}`);
  }
  const couponRemove = (id) => {
    deleteCoupon(id)
        .then((res) => {
          getCoponLists();
        }).
        catch((err) => {
          console.log({err})
        })
  }

  const search = (searchString) => {
    searchCoupon(searchString, pageNumber, 20)
    .then((res) => {
      const modify = res?.data.map((data, index) => {
        return {
          id: data?.id,
          code: data?.code,
          percentage: data?.percentage,
          expireDate: data?.expiresAt,
          couponType: data?.isPublic ? 'Public' : 'Private',
        };
      });
      setLists(modify);
      setLoading(false);
      setTotalPage(Math.ceil(res?.meta?.total / 20));
    })
    .catch((err) => {console.log(err); setPage(1);setLoading(false); setLists([])});
  }

  return (
        <div>
        <div className="flex justify-center">
          <button className="text-center rounded-md bg-orange-400 text-white px-4 py-2" onClick={moveToCreateCoupon}>Add Coupon</button>
        </div>
        <PaginationTable columns={COLUMNS} data={lists} pageNumber={pageNumber} setPage={setPage} totalPage={totalPage} loading={loading} search={search} removeItem={couponRemove} moveToEditPage={moveToEditCoupon}/>
        </div>
  );
};

export default UserCouponListsPage;
