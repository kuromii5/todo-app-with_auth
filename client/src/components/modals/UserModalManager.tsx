import React from "react";
import SignUpModal from "./userModals/SignUpModal";
import LogInModal from "./userModals/LogInModal";
import { ModalProps } from "./Modal";

export type UserModalType = "signUp" | "logIn" | null;

interface UserModalManagerProps extends ModalProps {
  modalType: UserModalType;
}

const UserModalManager: React.FC<UserModalManagerProps> = ({
  modalType,
  isOpen,
  closeModal,
}) => {
  switch (modalType) {
    case "signUp":
      return <SignUpModal isOpen={isOpen} closeModal={closeModal} />;
    case "logIn":
      return <LogInModal isOpen={isOpen} closeModal={closeModal} />;
    default:
      return null;
  }
};

export default UserModalManager;
