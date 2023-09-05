import {
  getLatestVersion,
  updateVersion,
} from "./lib/hooks/useApplicationVersion";
import { useState, useEffect } from "react";
const UserApplicationVersionPage = () => {
  const [latestVersion, setLatestVersion] = useState({});
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState({
    listLoading : false,
    updateLoading : false,
  });
  const callGetVersionApi = () => {
    setLoading({loading, listLoading: true});
    getLatestVersion()
    .then((res) => {
      setVersion(res?.data?.version);
      setLatestVersion({
        iosForceUpdateVersion: res?.data?.iosForceUpdateVersion,
        androidForceUpdateVersion: res?.data?.androidForceUpdateVersion,
        androidStoreUrl: res?.data?.androidStoreUrl,
        iosStoreUrl: res?.data?.iosStoreUrl,
        meta: {},
      });
      setLoading({loading, listLoading: false});
    })
    .catch((err) => {
      console.log({ err });
    });
  }

  useEffect(() => {
    callGetVersionApi();
  }, []);
  const changeValue = (field, value) => {
    latestVersion[field] = value;
  };
  const handleSubmit = () => {
    setLoading({loading, updateLoading: true});
    updateVersion(latestVersion)
    .then((res) => {
      setLoading({loading, updateLoading: false});
      callGetVersionApi();
    }).
    catch((err) => {
      console.log({err})
    })
  };
  return (
    <>
    {
      loading.listLoading ?
      <div>Loading...</div>
      :
      <div className="w-full max-w-xl mx-auto mt-8">
      <form className="bg-white shadow-lg rounded-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="version"
          >
            Version
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:cursor-none"
            id="version"
            type="text"
            placeholder="Version"
            readonly={true}
            value={version}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="version"
          >
            IOS Force Update Version
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="version"
            type="text"
            placeholder="Version"
            defaultValue={latestVersion?.iosForceUpdateVersion}
            onChange={(e) => changeValue("iosForceUpdateVersion", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="version"
          >
            Android Force Update Version
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="version"
            type="text"
            placeholder="Version"
            defaultValue={latestVersion?.androidForceUpdateVersion}
            onChange={(e) => changeValue("androidForceUpdateVersion", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="version"
          >
            Androind Store URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="version"
            type="text"
            placeholder="Version"
            defaultValue={latestVersion?.androidStoreUrl}
            onChange={(e) => changeValue("androidStoreUrl", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="version"
          >
            IOS Store URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="version"
            type="text"
            placeholder="Version"
            defaultValue={latestVersion?.iosStoreUrl}
            onChange={(e) => changeValue("iosStoreUrl", e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={loading?.updateLoading}
            onClick={handleSubmit}
            className={`bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading?.updateLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            type="button"
          >
            {
              loading?.updateLoading ?
              <p className="animate-pulse">Updating...</p>
  :
  'Update'
            }
            
          </button>
        </div>
      </form>
    </div>

    
    }
    </>
    
  );
};

export default UserApplicationVersionPage;
