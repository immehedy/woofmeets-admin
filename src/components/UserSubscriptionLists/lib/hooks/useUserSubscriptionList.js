import getRequest from "../../../../api/globalApi/getRequest";
import patchRequest from "../../../../api/globalApi/patchRequest";
import cogoToast from 'cogo-toast';

const getUserSubscriptionLists = (page, limit, status): Promise => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/subscriptions/subscription-payment-lists`, {}, {page, limit, status}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



export default getUserSubscriptionLists;

export const getBasicPayment = (): Promise => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/subscriptions/basic-verification-payment-info`, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const searchPayment = (searchString, page, limit): promise => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/subscriptions/search/subscription-payment-lists`, {}, {searchString, page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const changeBasicVerificationPayment = (id, amount): Promise => {
  return new Promise((resolve, reject) => {
    patchRequest(`/v1/subscriptions/update-basic-verification-payment/${id}`,{amount}, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
        cogoToast.success('Basic Verification Payment amount changed');
      })
      .catch((error) => {
        reject(error);
      });
  });
};