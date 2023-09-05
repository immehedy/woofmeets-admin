import { useState } from "react";

/**
 *
 * @returns {{isOpen: boolean, openModal: function, closeModal: function}}
 */
const useModal = () => {
  const [show, setShow] = useState(false);

  return {
    isOpen: show,
    openModal: () => setShow(true),
    closeModal: () => setShow(false),
  };
};

export default useModal;
