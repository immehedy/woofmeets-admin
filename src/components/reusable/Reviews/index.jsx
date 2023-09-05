import Modal from '../modal';
import ReactStars from 'react-stars';
import {format} from 'date-fns';

const Reviews = ({
    isOpen,
    closeModal,
    reviewedFor,
    rating,
    reviews
  }) => {
    console.log({reviewedFor, rating, reviews})
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
                        reviewedFor?.image
                        ? reviewedFor?.image?.url
                        : "/no_image.png"
                    }
                    alt="avatar"
                    className="w-full h-full rounded-full border-2"
                  />
                </div>
                <div className="flex-1 px-2">
                  <div className="md:flex items-center gap-2">
                    <p className="text-[14px] font-bold ">
                      {reviewedFor?.firstName} {reviewedFor?.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                      <ReactStars
                        count={5}
                        size={20}
                        value={rating?.average}
                        color2={"#FFA557"}
                        edit={false}
                        half={true}
                      />
                    </div>
                  </div>
                  <div  className="text-[14px]">
                  <p>
                      {reviewedFor?.basicInfo?.addressLine1}
                    </p>
                    <p>
                      {rating?.totalCount ? rating?.totalCount : 0} Reviews
                    </p>
                  </div>
                </div>
              </div>
              <div><h3 className='text-gray-600 font-bold underline mt-2'>Latest Reviews</h3></div>
          <div className={reviews?.length > 0 ? 'h-[200px] overflow-y-auto' : 'h-auto'}>
          {
            reviews?.length > 0 ? (
                reviews?.map((review, index) => (
              <div key={index} className="flex gap-4 lg:items-center px-4 py-1">
                <div className="w-[80px] h-[80px]">
                  <img
                    src={
                      review?.reviewedByIdUser?.image
                        ? review?.reviewedByIdUser?.image?.url
                        : "/no_image.png"
                    }
                    alt="avatar"
                    className="w-full h-full rounded-full border-2"
                  />
                </div>
                <div className="flex-1 px-2">
                  <div className="md:flex items-center gap-2">
                    <p className="text-[14px] font-bold ">
                      {review?.reviewedByIdUser?.firstName}{" "}
                      {review?.reviewedByIdUser?.lastName}{" "}
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

export default Reviews