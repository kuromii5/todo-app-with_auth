import React, { useState } from "react";
import UserModalManager, { UserModalType } from "./modals/UserModalManager";
import { MenuIcon } from "./Icons";
import { useAuth } from "../context/Auth";

const Navbar: React.FC = () => {
  const [modalType, setModalType] = useState<UserModalType>(null);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();

  const openModal = (type: UserModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <>
      <nav className="bg-secondary border-b border-text fixed top-0 w-full z-10">
        <div className="flex flex-row">
          <div className="flex md:flex-row md:justify-between md:mx-[10vh] flex-col w-full items-start ml-3">
            <h1 className="md:text-4xl text-2xl flex justify-center py-4 text-text font-bold">
              TO DO LIST APPLICATION
            </h1>
            <div className="md:flex flex-row space-x-8 py-3 px-2.5 hidden">
              <Buttons
                openModal={openModal}
                isAuthenticated={isAuthenticated}
                logout={logout}
              />
            </div>
          </div>
          <div className="md:hidden flex mr-2">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="text-text"
            >
              <MenuIcon isMenuOpen={isMenuOpen} />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-start space-y-4 py-3 px-2.5">
            <Buttons
              openModal={openModal}
              isAuthenticated={isAuthenticated}
              logout={logout}
            />
          </div>
        )}
      </nav>
      <UserModalManager
        modalType={modalType}
        isOpen={!!modalType}
        closeModal={closeModal}
      />
    </>
  );
};

interface UserButtonProps {
  openModal: (type: "signUp" | "logIn") => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const Buttons: React.FC<UserButtonProps> = ({
  openModal,
  isAuthenticated,
  logout,
}) => (
  <>
    {!isAuthenticated ? (
      <>
        <button className="button text-2xl" onClick={() => openModal("signUp")}>
          SIGN UP
        </button>
        <button className="button text-2xl" onClick={() => openModal("logIn")}>
          LOG IN
        </button>
      </>
    ) : (
      <button className="button text-2xl" onClick={logout}>
        LOGOUT
      </button>
    )}
  </>
);

export default Navbar;
