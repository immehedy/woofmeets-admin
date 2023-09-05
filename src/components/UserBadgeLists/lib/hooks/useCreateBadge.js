import getRequest from "../../../../api/globalApi/getRequest";
import postRequest from "../../../../api/globalApi/postRequest";
import patchRequest from "../../../../api/globalApi/patchRequest";
import deleteRequest from "../../../../api/globalApi/deleteRequest";
import cogoToast from 'cogo-toast';
  
  export const createBadge = (body) => {
    return new Promise((resolve, reject) => {
        postRequest(`/v1/badge`,body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('New badge added successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const updateBadge = (id, body) => {
    return new Promise((resolve, reject) => {
        patchRequest(`/v1/badge/${id}`,body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('Badge updated successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getBadge = (id) => {
    return new Promise((resolve, reject) => {
      getRequest(`/v1/badge/${id}`,{}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const deleteBadge = (id) => {
    return new Promise((resolve, reject) => {
        deleteRequest(`/v1/badge/${id}`,{}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('Badge deleted successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };