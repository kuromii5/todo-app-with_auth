import React, { FormEvent, useState } from "react";
import Modal from "../Modal";
import UserFields from "../../forms/UserFields";
import { ModalProps } from "../Modal";
import { useAuth } from "../../../context/Auth";

const LogInModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      console.log("User logged in:", data);
      login();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold mb-4">Log In</h2>
      <UserFields
        handleSubmit={handleSubmit}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
      />
    </Modal>
  );
};

export default LogInModal;
