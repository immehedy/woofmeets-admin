import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import { couponData, tomorrowDate } from "./lib/utils/formDefaultValues";
import { createCoupon } from "./lib/hooks/useCreateCoupon";

const CreateCoupon = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const moveBack = () => {
        navigate("/user-coupon-lists");
    }
    const tomorrow = tomorrowDate();
    const changeValue = (field, value) => {
        couponData[field] = value;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log({couponData})
        if(couponData?.expiresAt === null){
            couponData['expiresAt'] = tomorrow;
        }
        setLoading(true);
        createCoupon(couponData)
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
        <button  onClick={moveBack} className="bg-orange-400 text-white px-2 py-1 rounded-md flex gap-1 items-center justify-center">
        <BiArrowBack/>
            <span>Back </span>
        </button>
        <div className="text-center"><h2 className="text-[30px] text-gray-600 font-bold">Create new coupon</h2></div>
        {/* coupon create form */}

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
            defaultValue={tomorrow}
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

export default CreateCoupon