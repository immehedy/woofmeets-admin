import getRequest from "../../../../api/globalApi/getRequest";

const getBadgeLists = (page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/badge`, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getBadgeLists;


export const searchBadge = (searchString, page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/badge/search`, {}, {searchString, page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
