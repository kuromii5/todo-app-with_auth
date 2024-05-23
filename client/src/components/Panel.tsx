import { useState } from "react";
import { PlusIcon } from "./Icons";
import { useAuth } from "../context/Auth";
import TaskModalManager, { TaskModalType } from "./modals/TaskModalManager";

interface IsTasksUpdated {
  handleTaskUpdate: () => void;
}
const ToolPanel: React.FC<IsTasksUpdated> = ({ handleTaskUpdate }) => {
  const [modalType, setModalType] = useState<TaskModalType>(null);
  const { isAuthenticated } = useAuth();

  const openModal = (type: TaskModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <>
      {isAuthenticated ? (
        <div
          className="fixed md:right-0 md:top-0 md:h-screen md:w-[5vw] md:flex md:flex-col md:border-l md:border-t-0 md:space-y-4 md:space-x-0
        bottom-0 w-full h-[10vh] bg-black flex flex-row items-center justify-center border-t border-text z-[8]"
        >
          <button
            className="text-text mb-0 mx-2"
            onClick={() => openModal("createTask")}
          >
            <PlusIcon />
            Create
          </button>
          <TaskModalManager
            modalType={modalType}
            isOpen={!!modalType}
            closeModal={closeModal}
            handleTaskUpdate={handleTaskUpdate}
            task={null}
          />
        </div>
      ) : (
        <div
          className="fixed md:right-0 md:top-0 md:h-screen md:w-[20vw] md:flex md:flex-col md:border-l md:border-t-0 md:space-y-4 md:space-x-0
        bottom-0 w-full h-[10vh] bg-black flex flex-row items-center justify-center border-t border-text"
        >
          <p className="text-text">Please login to use this panel</p>
        </div>
      )}
    </>
  );
};

export default ToolPanel;
