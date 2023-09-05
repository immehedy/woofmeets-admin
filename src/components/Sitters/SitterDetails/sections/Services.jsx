import { blockService } from '../../lib/hooks/useGetSitterDetails';
import { useState } from 'react';
import { useModal } from '../../../reusable/modal';
import ServiceDetails from './ServiceDetails';
import { BsJournalBookmarkFill } from 'react-icons/bs';

const Services = ({ user }) => {
  const { providerServices } = user;
  const { isOpen, openModal, closeModal } = useModal();
  const [openServiceDetails, setOpenServiceDetails] = useState(null);
  const handleBlockService = (e) => {
    const id = e.target.value;
    const providerServiceId = [Number(id)];
    blockService(user?.user?.email, providerServiceId)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white primary-shadow rounded-md mb-10">
      <div className="flex border-b p-3 items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
        <BsJournalBookmarkFill className="text-[20px]" />
        <span className="tracking-wide">Services</span>
      </div>
      <div className="text-gray-700 pb-3">
        <div className="text-sm">
          {providerServices.map((item, id) => (
            <div className="grid grid-cols-3 items-center" key={id}>
              <div
                className="px-4 py-2 underline text-blue-500 font-semibold hover:underline cursor-pointer"
                onClick={() => {
                  setOpenServiceDetails(item?.id);
                  openModal();
                }}
              >
                {item?.serviceType?.name}
              </div>
              <div className="px-4 py-2">
                <div className="mx-3 w-full">
                  <label
                    htmlFor={id}
                    className="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      onChange={handleBlockService}
                      type="checkbox"
                      value={item?.id}
                      id={id}
                      defaultChecked={item?.isApproved}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-400"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-500">
                      {!item?.isApproved
                        ? 'Unblock this service'
                        : 'Block this service'}
                    </span>
                  </label>
                </div>
              </div>
              <div>
                {item?.isAway || !item?.isActive ? (
                  <span className="bg-red-400 text-white px-2 py-1 rounded-md">
                    Deactivated by user
                  </span>
                ) : (
                  <span className="bg-green-400 text-white px-2 py-1 rounded-md">
                    Active
                  </span>
                )}
              </div>
              <ServiceDetails
                key={id}
                item={item}
                isOpen={isOpen && openServiceDetails === item?.id}
                closeModal={closeModal}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
