import getRequest from "../../../../api/globalApi/getRequest";
import patchRequest from "../../../../api/globalApi/patchRequest";
import cogoToast from 'cogo-toast';

export const getLatestVersion = () => {
    return new Promise((resolve, reject) => {
      getRequest(`/v1/user-application-version`, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  
  export const updateVersion = (body) => {
    return new Promise((resolve, reject) => {
      patchRequest(`/v1/user-application-version`,body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('User Application Version Updated');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };