import getRequest from "../../../../api/globalApi/getRequest";


export const getPetReview = (petId) => {
  return new Promise((resolve, reject) => {
    getRequest(`/v1/pet-review/pet/${petId}`, {}, {}, true)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};