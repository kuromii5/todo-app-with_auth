import { Task } from "../TaskList";
import DeleteTaskModal from "./taskModals/DeleteTaskModal";
import { ModalProps } from "./Modal";
import CreateTaskModal from "./taskModals/CreateTaskModal";
import UpdateTaskModal from "./taskModals/UpdateTaskModal";

export type TaskModalType = "createTask" | "updateTask" | "deleteTask" | null;
interface TaskModalManagerProps extends ModalProps {
  modalType: TaskModalType;
  handleTaskUpdate: () => void;
  task: Task | null;
}

const TaskModalManager: React.FC<TaskModalManagerProps> = ({
  modalType,
  isOpen,
  closeModal,
  handleTaskUpdate,
  task,
}) => {
  switch (modalType) {
    case "createTask":
      return (
        <CreateTaskModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleTaskUpdate={handleTaskUpdate}
        />
      );
    case "updateTask":
      return (
        <UpdateTaskModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleTaskUpdate={handleTaskUpdate}
          task={task}
        />
      );
    case "deleteTask":
      return (
        <DeleteTaskModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleTaskUpdate={handleTaskUpdate}
          task={task}
        />
      );
    default:
      return null;
  }
};

export default TaskModalManager;
