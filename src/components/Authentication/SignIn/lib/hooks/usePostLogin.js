import postRequest from '../../../../../api/globalApi/postRequest';


const login = (payload): Promise => {
  return new Promise((resolve, reject) => {
    postRequest(`/v1/admin-panel/log-in`, payload, {}, false)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default login;
