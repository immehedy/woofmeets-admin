
import Modal from '../modal';
import ReactStars from 'react-stars';
import { getPetReview } from './lib/useGetPetsReview';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const ShowPetReview = ({
    isOpen,
    closeModal,
    petId,
    pet
  }) => {
    const [reviews, setReviews] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true);
      getPetReview(petId)
          .then((res) => {
            setReviews(res?.data);
            setIsLoading(false);
          })
          .catch((err) => {console.log(err); setIsLoading(false)});
      }, [petId]);
  return (
    <Modal
        isOpen={isOpen}
        onClose={closeModal}
        showCloseButton
        title={'Pets review section'}
      >
      <div className="flex gap-4 lg:items-center px-4 py-2">
            <div className="w-[100px] h-[100px]">
              <img
                src={
                  pet?.profile_image
                    ? pet?.profile_image?.url
                    : "/no_image.png"
                }
                alt="avatar"
                className="w-full h-full rounded-full border-2"
              />
            </div>
            <div className="flex-1 px-2">
              <div className="md:flex items-center gap-2">
                <p className="text-[14px] font-bold ">
                  {pet?.name}
                </p>
                <div className="flex items-center gap-2">
                  <ReactStars
                    count={5}
                    size={20}
                    value={reviews?.rating?.average}
                    color2={"#FFA557"}
                    edit={false}
                    half={true}
                  />
                </div>
              </div>
              <div  className="text-[14px]">
                <p>
                {pet?.gender} {pet?.type}
                </p>
                <p>{pet?.ageYear} yr {pet?.ageMonth} month old and weighs {pet?.weight} {pet?.weightUnit}</p>
                <p>
                  {reviews?.rating?.totalCount ? reviews?.rating?.totalCount : 0} Reviews
                </p>
              </div>
            </div>
          </div>
          <div><h3 className='text-gray-600 font-bold underline mt-2'>Latest Reviews</h3></div>
      <div className={reviews?.petReviews?.length > 0 ? 'h-[200px] overflow-y-auto' : 'h-auto'}>
      {
        isLoading ? 
        <div>Loading...</div>
        :
        reviews?.petReviews?.length > 0 ? (
            reviews?.petReviews?.map((review, index) => (
          <div key={index} className="flex gap-4 lg:items-center px-4 py-1">
            <div className="w-[80px] h-[80px]">
              <img
                src={
                  review?.user?.image
                    ? review?.user?.image?.url
                    : "/no_image.png"
                }
                alt="avatar"
                className="w-full h-full rounded-full border-2"
              />
            </div>
            <div className="flex-1 px-2">
              <div className="md:flex items-center gap-2">
                <p className="text-[14px] font-bold ">
                  {review?.user?.firstName}{" "}
                  {review?.user?.lastName}{" "}
                </p>
                <div className="flex items-center gap-2">
                  <ReactStars
                    count={5}
                    size={20}
                    value={review?.rating}
                    color2={"#FFA557"}
                    edit={false}
                    half={true}
                  />
                </div>
              </div>
              <div className="text-[14px]">
                  {review?.comment}
                </div>
              <div>
                <p className="text-[12px] my-2 font-semibold">
                  {review?.createdAt
                    ? format(new Date(review?.createdAt), 'MM-dd-yyy')
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          
        ))
      ) : (
        <div className='text-center text-gray-600 font-bold'>No reviews Found</div>
      )
      }
      </div>
      </Modal>
  )
}

export default ShowPetReview