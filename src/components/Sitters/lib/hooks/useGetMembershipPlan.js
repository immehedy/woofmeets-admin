import getRequest from "../../../../api/globalApi/getRequest";
import postRequest from "../../../../api/globalApi/postRequest";

export const getMembershipPlans = () => {
    return new Promise((resolve, reject) => {
        getRequest(`/v1/subscriptions/invisible-membership-plans-prices-admin`, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
    })
}

export const postMembershipPlan = (body) => {
    return new Promise((resolve, reject) => {
      postRequest(`/v1/subscriptions/admin-subscription-for-user`,body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };