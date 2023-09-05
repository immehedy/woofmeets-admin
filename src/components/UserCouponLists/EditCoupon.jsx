import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCoupon, updateCoupon } from "./lib/hooks/useCreateCoupon";
import { tomorrowDate } from "./lib/utils/formDefaultValues";
import {format} from "date-fns";

const EditCouponPage = () => {
    const [couponData, setCouponData] = useState();
    const [couponExpireDate, setCouponExpireDate] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const moveBack = () => {
        navigate("/user-coupon-lists");
    }
    const tomorrow = tomorrowDate();
    const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");
  useEffect(() => {
    getCoupon(code)
      .then((res) => {
        setCouponData(res?.data);
        setCouponExpireDate(format(new Date(res?.data?.expiresAt), 'yyyy-MM-dd').toString());
      })
      .catch((err) => console.log(err));
  }, [code]);
  const changeValue = (field, value) => {
    couponData[field] = value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(couponData?.expiresAt === null){
        couponData['expiresAt'] = tomorrow;
    }
    setLoading(true);
    updateCoupon(couponData?.id, couponData)
    .then((res) => {
        setLoading(false);
        moveBack();
    }).
    catch((err) => {
      console.log({err})
    })
  };
  return (

    <>
        <div className="text-center"><h2 className="text-[30px] text-gray-600 font-bold">Update coupon</h2></div>
    <div className="w-full max-w-xl mx-auto mt-8">
    <form className="bg-white shadow-lg rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="code"
        >
          Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="code"
          type="text"
          placeholder="Code"
          defaultValue={couponData?.code}
          onChange={(e) => changeValue("code", e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="percentage"
        >
          Percentage
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="percentage"
          type="number"
          min="0"
          max="100"
          defaultValue={couponData?.percentage}
          required
          placeholder="Percentage"
          onChange={(e) => changeValue("percentage", e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="expiresAt"
        >
          Expire Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="expiresAt"
          type="date"
          defaultValue={couponExpireDate}
          min={tomorrow}
          required
          onChange={(e) => changeValue("expiresAt", e.target.value)}
        />
      </div>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
<input type="checkbox" className="accent-orange-400" onChange={(e) => changeValue("isPublic", e.target.checked)} defaultChecked={couponData?.isPublic} /> Make it public
</label>
      </div>
      <div className="flex items-center justify-between">
        <input
value={`${loading ? 'submitting...' : 'Submit'}`}
          className={`bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
        />
      </div>
    </form>
  </div>
    </>
  )
}

export default EditCouponPage