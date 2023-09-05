import postRequest from '../../../../api/globalApi/postRequest';
import patchRequest from '../../../../api/globalApi/patchRequest';
import cogoToast from 'cogo-toast';

export const toggleLockFn = (id, lockedReason) => {
    return new Promise((resolve, reject) => {
        patchRequest(`/v1/payment-dispatcher/change-locked-status/${id}`,{lockedReason}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          window.location.reload();
        })
        .catch((error) => {
          reject(error);
          cogoToast.error(error?.data?.message);
        });
    });
  };

export const payOutFn= (id)  => {
    return new Promise((resolve, reject) => {
      postRequest(`/v1/payment-dispatcher/Transfer-payment-to-provider/${id}`,{}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          window.location.reload();
        })
        .catch((error) => {
          reject(error);
          cogoToast.error(error?.data?.message);
        });
    });
  };
