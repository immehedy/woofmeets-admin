import getRequest from "../../../../api/globalApi/getRequest";
import postRequest from "../../../../api/globalApi/postRequest";

const getSubscriptionLists = (page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/subscriptions/user-subscription-lists`, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getSubscriptionLists;

export const searchSubscriptionLists = (searchString, page, limit) => {
  return new Promise((resolve, reject) => {
    postRequest(`/v1/admin-panel-v2/fliter-search/all-subscription`, searchString, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
