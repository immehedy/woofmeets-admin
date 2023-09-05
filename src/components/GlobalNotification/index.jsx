import cogoToast from 'cogo-toast';
import { useState } from 'react';
import Modal, {useModal} from '../reusable/modal'
import ConfirmMessage from './ConfirmMessage';
import { sendMessage } from './lib/hooks/sendMessage';
import { messageData } from './lib/utils/defaultValues';
const GlobalNotification = ({
  users,
  isOpen,
  closeModal,
}) => {
    const {openModal:openConfirmModal, isOpen:isConfirmModalOpen, closeModal:closeConfirmModal} = useModal();
  const [loading, setLoading] = useState(false);
  const modalCloseFn = () => {
    closeModal();
  };

  const changeValue = (field, value) => {
    messageData[field] = value;
  };
  const submitMessage = () => {
    setLoading(true);
    sendMessage({users, ...messageData})
        .then((res) => {
            setLoading(false);
            modalCloseFn();
            closeConfirmModal();
            cogoToast.success(res?.message);
        }).
        catch((err) => {
          console.log({err})
          setLoading(false);
          modalCloseFn();
          closeConfirmModal();
        })
  }
  return (
    <>
    <Modal
      isOpen={isOpen}
      onClose={modalCloseFn}
      title={"Send Custom Notification"}
    >
      <div className="w-full max-w-xl mx-auto mt-8">
      <form className="bg-white shadow-lg rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={(e) => {e.preventDefault(); openConfirmModal();}}>
      <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-2">What type of message you want to send?</label>
            <select 
                onChange={(e) => changeValue('type', e.target.value)}
                id='type' 
                name='type'
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                required
                >
              <>
              <option value="">choose an option</option>
                <option value={'NOTIFICATION'}>Notification</option>
                <option value={'EMAIL'}>Email</option>
                <option value={'SMS'}>SMS</option>
              </>
            </select>
        </div>
      <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            onChange={(e) => changeValue("title", e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            type="text"
            placeholder="Short description of badge under 650 character"
            maxLength="650"
            rows="3"
            onChange={(e) => changeValue("message", e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center gap-4">
            <input
            type="submit"
            className="bg-[#FFA557] text-white px-5 py-1 rounded-md cursor-pointer w-auto"
            value={'Send'}
            />
            <button
              onClick={() => {modalCloseFn(); closeConfirmModal()}}
              className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
      </form>
      </div>
    </Modal>
    <ConfirmMessage
    isOpen={isConfirmModalOpen}
    submitMessage={submitMessage}
    loading={loading}
    closeConfirmModal={closeConfirmModal}
    modalCloseFn={modalCloseFn}
    />
    </>
  );
};

export default GlobalNotification;
