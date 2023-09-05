import Modal from "../../../reusable/modal"
const BadgeModal = ({
    isOpen,
    closeModal,
    submitBadge,
    loading,
    removeIsOpen,
    removeCloseModal,
    removeBadge,
    editIsOpen,
    editCloseModal,
    setDataFile,
    addBadges,
    providerBadges,
    editBadge
}) => {
  return (
    <>
        {/* modal for adding badge */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div>
          <p className="mb-4">Are you sure you want to set this badge?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                submitBadge();
              }}
              className="bg-[#FFA557] text-white px-5 py-1 rounded-md">
              {loading ? "proceeding..." : "Proceed"}
            </button>
            <button
              onClick={() => {
                closeModal();
              }}
              className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* modal for deleting badge */}
      <Modal isOpen={removeIsOpen} onClose={removeCloseModal}>
        <div>
          <p className="mb-4">Are you sure you want to delete this badge?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                removeBadge();
              }}
              className="bg-[#FFA557] text-white px-5 py-1 rounded-md">
              {loading ? "proceeding..." : "Proceed"}
            </button>
            <button
              onClick={() => {
                removeCloseModal();
              }}
              className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* modal for replacing badge */}
      <Modal isOpen={editIsOpen} onClose={editCloseModal}>
        <div>
          <p className="mb-4">Are you sure you want to replace this badge? if yes, please select new badge.</p>
          <div>
          <label className="mb-1 flex flex-wrap gap-1 items-center">
              Replace Badge
      </label>
          <select
        onChange={(e) => {
          setDataFile({ badgeId: e.target.value });
        }}
        className="w-full py-1 px-2 text-gray-500 border-2 border-gray-200 rounded-md focus:outline-orange-400">
        <>
          <option disabled selected value="">
            Update Badge
          </option>
          {addBadges?.map((option, oi) => (
            <option
              disabled={providerBadges?.find(
                (item) => item?.badgeId === option?.id
              )}
              selected={providerBadges?.find(
                (item) => item?.badgeId === option?.id
              )}
              key={oi}
              value={option.id}>
              {option?.title}
            </option>
          ))}
        </>
      </select>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => {
                editBadge();
              }}
              className="bg-[#FFA557] text-white px-5 py-1 rounded-md">
              {loading ? "proceeding..." : "Proceed"}
            </button>
            <button
              onClick={() => {
                editCloseModal();
              }}
              className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BadgeModal