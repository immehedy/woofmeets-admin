import getRequest from '../../../../api/globalApi/getRequest';


const getTransaction = (billingTransactionId) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/payment-dispatcher/get-single-transaction-info/{billingTransactionId}`, {}, {billingTransactionId}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getTransaction;
