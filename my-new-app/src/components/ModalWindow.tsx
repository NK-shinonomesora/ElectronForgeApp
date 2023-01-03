import React from "react";
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById("root"));

interface ModalWindowProp {
  modalIsOpen: boolean
  closeModal: () => void
}

const ModalWindow: React.FC<ModalWindowProp> = ({ modalIsOpen, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal()}
        contentLabel="Example Modal"
      >
        <button onClick={() => closeModal()}>close</button>
        <div>I am a modal</div>
      </Modal>
    </div>
  )
}

export default ModalWindow;