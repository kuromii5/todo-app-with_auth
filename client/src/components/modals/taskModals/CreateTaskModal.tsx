import { FormEvent, useState } from "react";
import TaskFields from "../../forms/TaskFields";
import Modal, { ModalProps } from "../Modal";

interface TaskModalProps extends ModalProps {
  handleTaskUpdate: () => void;
}

const CreateTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  closeModal,
  handleTaskUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      console.log("Task created:", data);
      handleTaskUpdate();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold mb-4">Create new task</h2>
      <TaskFields
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        error={error}
      />
    </Modal>
  );
};

export default CreateTaskModal;
