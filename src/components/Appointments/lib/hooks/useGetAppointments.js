import getRequest from "../../../../api/globalApi/getRequest";
import postRequest from "../../../../api/globalApi/postRequest";

const getAppointments = (page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/all-appointments`, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getAppointments;

export const searchUser = (searchString, page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/search/all-appointments`, {}, {searchString, page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const filterSearch = (searchString, page, limit) => {
  return new Promise((resolve, reject) => {
    postRequest(`/v1/admin-panel-v2/fliter-search/all-appointments`, searchString, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
