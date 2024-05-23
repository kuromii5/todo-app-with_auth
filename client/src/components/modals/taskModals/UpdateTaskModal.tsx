import { useState } from "react";
import TaskFields from "../../forms/TaskFields";
import Modal, { ModalProps } from "../Modal";
import { Task } from "../../TaskList";

interface UpdateTaskModalProps extends ModalProps {
  task: Task | null;
  handleTaskUpdate: () => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  isOpen,
  closeModal,
  task,
  handleTaskUpdate,
}) => {
  const [title, setTitle] = useState(task!.title);
  const [description, setDescription] = useState(task!.description);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/tasks/${task!.ID}`, {
        method: "PUT",
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
      console.log("Task updated:", data);
      handleTaskUpdate();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold mb-4">Update task</h2>
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

export default UpdateTaskModal;
