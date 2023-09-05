import Modal from "../../reusable/modal";
import { useEffect, useState } from "react";
import { toggleLockFn, payOutFn } from "../lib/hooks/useSetTransactionFn";
const ConfirmationModal = ({
  id,
  isOpen,
  closeModal,
  toggleLock,
  setToggleLock,
  setPayout,
  lockedReason,
  lockedAt,
}) => {
  const [lockedReasonData, setLockedReasonData] = useState(" ");
  useEffect(()=>{
    setLockedReasonData(lockedReason);
  }, [lockedReason])
  const modalCloseFn = () => {
    closeModal();
    setToggleLock(false);
    setPayout(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={modalCloseFn}
      title={"Transaction Confirmation"}
    >
      {toggleLock ? (
        <div>
          <p  className="mb-4">Why do you want to {lockedAt ? 'Unlock' : 'Lock'} this transaction?</p>
          <textarea
            value={lockedReasonData}
            onChange={(e) => setLockedReasonData(e.target.value)}
            className="px-2 outline-none border-b-2 w-full mb-4"
            placeholder="Locked transaction reason"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={()=>{toggleLockFn(id, lockedReasonData); modalCloseFn()}}
              className="bg-[#FFA557] text-white px-5 py-1 rounded-md"
            >
              Proceed
            </button>
            <button
              onClick={modalCloseFn}
              className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">Are you sure you want to dispatch the payment to this sitter? If yes please proceed or you can cancel</p>
          <div className="flex justify-center gap-4">
            <button
            onClick={()=>{payOutFn(id); modalCloseFn()}}
            className="bg-[#FFA557] text-white px-5 py-1 rounded-md"
            >
              Proceed
            </button>
            <button
              onClick={modalCloseFn}
              className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ConfirmationModal;
