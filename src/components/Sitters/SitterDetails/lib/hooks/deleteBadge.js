import cogoToast from "cogo-toast";
import deleteRequest from "../../../../../api/globalApi/deleteRequest";

export const deleteBadge = (id) => {
    return new Promise((resolve, reject) => {
        deleteRequest(`/v1/badge/provider/delete/${id}`,{}, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
          cogoToast.success('Badge removed successfully');
        })
        .catch((error) => {
          reject(error);
        });
    });
  };