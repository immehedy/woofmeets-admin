import getRequest from '../../../../api/globalApi/getRequest';


const getUser = (email) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v2/admin-panel/user-details`, {}, {email}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

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

export default getUser;
