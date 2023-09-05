import patchRequest from "../../../../../api/globalApi/patchRequest";

export const cancelSub = (userId, subId) => {
    return new Promise((resolve, reject) => {
      patchRequest(`/v1/admin-panel/downgrade-users-subscription?userId=${userId}&subscriptionId=${subId}`,{}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };