import React from "react";
import { CloseIcon } from "../Icons";

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface ModalBase extends ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalBase> = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 m-0">
      <div className="bg-white rounded-lg shadow-lg p-4 relative w-[90%] md:w-auto">
        <button className="absolute top-4 right-4" onClick={closeModal}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
