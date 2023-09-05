import Modal from '../reusable/modal'

const ConfirmMessage = ({submitMessage, isOpen, closeConfirmModal, modalCloseFn, loading, props}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeConfirmModal}
      title={""}
    >
        <div>
          <p className="mb-4">Are you sure you want to proceed?</p>
          <div className="flex justify-center gap-4">
            <button
            onClick={()=>{ submitMessage(props) }}
            className="bg-[#FFA557] text-white px-5 py-1 rounded-md"
            >
              {loading ? 'proceeding...' : 'Proceed'}
            </button>
            <button
              onClick={() => {closeConfirmModal()}}
              className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
    </Modal>
  )
}

export default ConfirmMessage