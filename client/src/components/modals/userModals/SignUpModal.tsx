import React, { FormEvent, useState } from "react";
import Modal from "../Modal";
import UserFields from "../../forms/UserFields";
import { ModalProps } from "../Modal";

const SignUpModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to sign up");
      }

      const data = await response.json();
      console.log("User registered:", data);
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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

export default SignUpModal;
