import getRequest from "../../../../../api/globalApi/getRequest";

export const getBadges = () => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/badge`, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProviderBadges = (providerId) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/badge/provider/all/${providerId}`, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};