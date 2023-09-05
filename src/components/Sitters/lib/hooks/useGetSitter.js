import getRequest from '../../../../api/globalApi/getRequest';
import postRequest from '../../../../api/globalApi/postRequest';


const getSitters = (page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/all-providers`, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getSitters;

export const approveUser = (email) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/provider/approval`, {}, {email}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const searchUser = (searchString, page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/search/all-providers`, {}, {searchString, page, limit}, true)
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
    postRequest(`/v1/admin-panel-v2/fliter-search/all-sitters`, searchString, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}