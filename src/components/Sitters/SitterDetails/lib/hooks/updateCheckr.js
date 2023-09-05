import patchRequest from "../../../../../api/globalApi/patchRequest";

export const completeReport = (reportId) => {
    return new Promise((resolve, reject) => {
      patchRequest(`/v1/checkr/complete-candidates-report`,{}, {}, {reportId}, true)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };