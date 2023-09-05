import getRequest from '../../../../api/globalApi/getRequest';
import postRequest from '../../../../api/globalApi/postRequest';


const getSitter = (email) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/provider-details`, {}, {email}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getSitter;

export const blockUser = (email) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/user/permanent-block`, {}, {email}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const upgradeBackgroundCheck = (email) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/provider/update/background-check`, {}, {email}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const blockService = (email, providerServiceId) => {
  return new Promise((resolve, reject) => {
    postRequest(`/v1/admin-panel/provider/service-approval`,{providerServiceId}, {}, {email}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
