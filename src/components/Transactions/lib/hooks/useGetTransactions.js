import getRequest from "../../../../api/globalApi/getRequest";

const getTransactions = (page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/payment-dispatcher/get-all-transactions`, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getTransactions;

export const searchTransaction = (searchString, page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/payment-dispatcher/search/get-all-transactions`, {}, {searchString, page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
