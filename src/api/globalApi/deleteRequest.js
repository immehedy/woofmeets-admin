import getAuthKey from '../authentication/getAuthKey';
import axiosInstance from './axiosInstance';

const deleteRequest = (
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
      .delete(url, {
        data: body,
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

export default deleteRequest;
