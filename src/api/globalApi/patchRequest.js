
import axiosInstance from './axiosInstance';
import getAuthKey from "../authentication/getAuthKey";
const patchRequest = (
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
      .patch(url, body, {
        headers: { ...headers, ...token },
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

export default patchRequest;
