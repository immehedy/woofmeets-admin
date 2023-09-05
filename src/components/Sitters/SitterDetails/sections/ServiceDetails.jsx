import Modal, { useModal } from "../../../reusable/modal";
import ModalBoxData from "./ModalBoxData";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const ServiceDetails = ({ item, isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      showCloseButton
      title={"Service Details"}
      
    >
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className="text-gray-700">
          <div className="grid grid-cols-2 gap-x-4">
            <ModalBoxData
              heading="Full Time"
              icon={item?.fulltime ? <FaCheck className="text-green-400" /> : <ImCross className="text-red-400" />}
            />
            <ModalBoxData
              heading="Is Away"
              icon={item?.isAway ? <FaCheck className="text-green-400" /> : <ImCross className="text-red-400" />}
            />
            <ModalBoxData
              heading="Log Stay"
              icon={item?.logStay ? <FaCheck className="text-green-400" /> : <ImCross className="text-red-400" />}
            />
            <ModalBoxData
              heading="Potty Break"
              icon={item?.pottyBreak ? item?.pottyBreak : "N/A"}
            />
          </div>

          {item?.ServiceHasRates?.length === 0 ? (
            <div className="h-[40px] p-2 rounded-b-lg">
              <p className="text-red-500 text-[14px] text-center">
                No additional details found !!!
              </p>
            </div>
          ) : (
            item?.ServiceHasRates?.map((i, index) => (
              <ModalBoxData
                heading={i?.serviceTypeRate?.serviceRateType?.name}
                price={i?.amount}
                unit={i?.serviceTypeRate?.serviceRateType?.unitLabel}
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetails;
