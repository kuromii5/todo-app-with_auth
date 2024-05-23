import { useState } from "react";
import Modal, { ModalProps } from "../Modal";
import { Task } from "../../TaskList";

interface DeleteTaskModalProps extends ModalProps {
  task: Task | null;
  handleTaskUpdate: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  closeModal,
  task,
  handleTaskUpdate,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${task!.ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      handleTaskUpdate();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold mb-4 pr-12">Delete this task?</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between space-x-4">
        <button
          onClick={closeModal}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
