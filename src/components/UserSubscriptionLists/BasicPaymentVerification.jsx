import Modal, { useModal } from "../reusable/modal";


const BasicPaymentVerification = ({changeVerificationPayment, basicVerification, setBasicVerification}) => {
    const {isOpen, openModal, closeModal } =useModal();
  return (
<>
<div className="flex items-center gap-4">
              <p className="text-gray-600">
                Basic Verification Payment : 
                
                <span className="border border-gray-400 rounded-md p-2 ml-2">
                  <span> $</span>
                  <input
                    type="number"
                    min="0"
                    className="max-w-[80px] outline-none active:outline-none"
                    onChange={(e) => {
                      setBasicVerification({
                          ...basicVerification,
                          amount: Math.abs(Number(e.target.value)),
                      });
                    }}
                    defaultValue={basicVerification?.amount}
                  />
                </span>
              </p>
              <button
                onClick={openModal}
                className="bg-orange-400 text-white px-2 py-1 rounded-md"
              >
                Update
              </button>
            </div>
  <Modal
  isOpen={isOpen}
  onClose={closeModal}
  title={"Basic Payment Verification"}
>
    <div>
      <p className="mb-4">Are you sure you want to update the Basic Verfication Payment?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={()=>{changeVerificationPayment(basicVerification); closeModal()}}
          className="bg-[#FFA557] text-white px-5 py-1 rounded-md"
        >
          Yes, Update
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-100 border-2 border-gray-300 px-5 py-1 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
 
</Modal>
</>
  
  
  )
}

export default BasicPaymentVerification