import getRequest from '../../../../api/globalApi/getRequest';


const getAppointment = (opk) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v2/admin-panel/appointment-details`, {}, {opk}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getAppointment;
