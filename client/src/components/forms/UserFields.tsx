import React, { FormEvent } from "react";
import { EyeIcon, EyeOffIcon } from "../Icons";

interface PasswordFieldProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  password: string;
  setPassword: (password: string) => void;
}

interface UsernameFieldProps {
  username: string;
  setUsername: (username: string) => void;
}

interface UserFieldsProps extends UsernameFieldProps, PasswordFieldProps {
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

const PasswordInput: React.FC<PasswordFieldProps> = ({
  showPassword,
  togglePasswordVisibility,
  password,
  setPassword,
}) => (
  <div className="w-full p-2 mb-4 border rounded-lg flex flex-row justify-between">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="flex-grow outline-none"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="flex items-center px-2"
    >
      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
    </button>
  </div>
);

const UsernameInput: React.FC<UsernameFieldProps> = ({
  username,
  setUsername,
}) => (
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="w-full p-2 mb-4 border rounded-lg outline-none"
  />
);

const UserFields: React.FC<UserFieldsProps> = ({
  handleSubmit,
  showPassword,
  togglePasswordVisibility,
  username,
  setUsername,
  password,
  setPassword,
  error,
}) => (
  <form onSubmit={handleSubmit}>
    {error && <p className="text-red-500">{error}</p>}
    <UsernameInput username={username} setUsername={setUsername} />
    <PasswordInput
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      password={password}
      setPassword={setPassword}
    />
    <button type="submit" className="button">
      Submit
    </button>
  </form>
);

export default UserFields;
