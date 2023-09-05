import getRequest from "../../../../api/globalApi/getRequest";
import postRequest from "../../../../api/globalApi/postRequest";
import patchRequest from "../../../../api/globalApi/patchRequest";
import deleteRequest from "../../../../api/globalApi/deleteRequest";
import cogoToast from 'cogo-toast';
  
  export const createCoupon = (body) => {
    return new Promise((resolve, reject) => {
        postRequest(`/v1/coupons`,body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('New coupon added successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const updateCoupon = (id, body) => {
    return new Promise((resolve, reject) => {
        patchRequest(`/v1/coupons/update/${id}`,body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('Coupon updated successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getCoupon = (code) => {
    return new Promise((resolve, reject) => {
      getRequest(`/v1/coupons/get-one/${code}`,{}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const deleteCoupon = (id) => {
    return new Promise((resolve, reject) => {
        deleteRequest(`/v1/coupons/delete/${id}`,{}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('Coupon deleted successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };