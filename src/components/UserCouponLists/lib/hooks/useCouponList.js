import getRequest from "../../../../api/globalApi/getRequest";

const getCouponLists = (page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/coupons/admin`, {}, {page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getCouponLists;


export const searchCoupon = (searchString, page, limit) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/coupons/search`, {}, {searchString, page, limit}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
