import cogoToast from "cogo-toast";
import postRequest from "../../../../../api/globalApi/postRequest";
import patchRequest from "../../../../../api/globalApi/patchRequest";

export const addSittersBadge = (body) => {
    return new Promise((resolve, reject) => {
        postRequest(`/v1/badge/provider/create`,body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('Badge added successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const replaceBadge = (providerBadgeId, badgeId) => {
    return new Promise((resolve, reject) => {
        patchRequest(`/v1/badge/provider/update/${providerBadgeId}`,{badgeId}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('Badge replaced successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };