import axiosInstance from './axiosInstance';
import getAuthKey from "../authentication/getAuthKey";
const postRequest = (
  url,
  body,
  headers,
  params,
  auth,
) => {
  let token = {};
  if (auth) {
    token.Authorization = getAuthKey();
  }

  return new Promise((resolve, reject) => {

    axiosInstance
      .post(url, body, {
        headers: { ...headers, ...token},
        params: { ...params },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err?.response);
      });
  });
};

export default postRequest;
