import postRequest from "../../../../api/globalApi/postRequest";

export const sendMessage = (body) => {
    return new Promise((resolve, reject) => {
      postRequest(`/v1/admin-panel/send-notifications`, body, {}, {}, true)
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }