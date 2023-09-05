import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBadge, updateBadge } from "./lib/hooks/useCreateBadge";

const EditBadgePage = () => {
    const formData = new FormData();
    const [badgeData, setBadgeData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const moveBack = () => {
        navigate("/user-badge-lists");
    }
    const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  useEffect(() => {
    getBadge(id)
      .then((res) => {
        setBadgeData(res?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const changeValue = (field, value) => {
    badgeData[field] = value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("title", badgeData?.title);
        formData.append("description", badgeData?.description);
        formData.append("priority", badgeData?.priority);
        formData.append("icon", badgeData?.icon);
        formData.append("image", badgeData?.image);
    setLoading(true);
    updateBadge(badgeData?.id, formData)
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
      <div className="text-center"><h2 className="text-[30px] text-gray-600 font-bold">Update badge</h2></div>
        {/* Badge create form */}

        <div className="w-full max-w-xl mx-auto mt-8">
      <form className="bg-white shadow-lg rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            onChange={(e) => changeValue("title", e.target.value)}
            defaultValue={badgeData?.title}
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Short description of badge under 100 character"
            maxLength="100"
            rows="3"
            onChange={(e) => changeValue("description", e.target.value)}
            defaultValue={badgeData?.description}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priority"
          >
            Priority
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priority"
            type="number"
            min="1"
            max="100"
            placeholder="ex: 1, 2, 3"
            onWheel={(e) => e.target.blur()}
            onChange={(e) => changeValue("priority", e.target.value)}
            defaultValue={badgeData?.priority}
          />
        </div>
        <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload icon</label>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
        dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400" 
        aria-describedby="icon_input_help" 
        id="icon_input" 
        type="file"
        onChange={(e) => changeValue("icon", e.target.files[0])}
        />
        </div>
        <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload image</label>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
        dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400" 
        aria-describedby="file_input_help" 
        id="file_input" 
        type="file"
        onChange={(e) => changeValue("image", e.target.files[0])}
        />
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

export default EditBadgePage