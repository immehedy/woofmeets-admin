import getRequest from '../../../../api/globalApi/getRequest';

export const getPastDate = (days) => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - days).toISOString();
}

export const getHompageData = (): Promise => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/home-page`, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getDashboardDateRange = (startDate, endDate): Promise => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/transaction-count-details`, {}, {startDate, endDate}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getSittersCountByCountry = (): Promise => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/country-wise-provider-count`, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



