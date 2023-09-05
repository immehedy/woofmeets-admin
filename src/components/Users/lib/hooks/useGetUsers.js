import getRequest from '../../../../api/globalApi/getRequest';


const getUsers = (page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel/all-users`, {}, {page, limit}, true)
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
    getRequest(`/v1/admin-panel/search/all-users`, {}, {searchString, page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const filterSearch = (page, take, searchString) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/admin-panel-v2/owners`, {}, {page, take, ...searchString}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export default getUsers;
