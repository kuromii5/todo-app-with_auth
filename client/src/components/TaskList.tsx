import React, { useState, useEffect, FormEvent } from "react";
import { useAuth } from "../context/Auth";
import TaskModalManager, { TaskModalType } from "./modals/TaskModalManager";

export interface Task {
  ID: number;
  title: string;
  description: string;
}
interface TaskListProps {
  isTaskUpdated: boolean;
  handleTaskUpdate: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  isTaskUpdated,
  handleTaskUpdate,
}) => {
  const [modalType, setModalType] = useState<TaskModalType>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        const data: Task[] = await response.json();
        const sortedData = data.sort((a: Task, b: Task) => a.ID - b.ID);
        setTasks(sortedData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated, isTaskUpdated]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const openModal = (type: TaskModalType, task: Task) => {
    setSelectedTask(task);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalType(null);
  };

  return (
    <div className="flex flex-col md:items-start pt-[100px] pb-[100px] md:pb-10 md:ml-10 w-full h-[100vh] overflow-y-auto">
      {error && <p className="text-red-500">{error}</p>}
      {isAuthenticated ? (
        tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task.ID || index + 1}
              className="w-[90%] mx-auto md:mx-0 mb-10 md:items-start md:w-[50%] bg-secondary rounded-3xl shadow-xl p-4 transform duration-300 ease-in-out hover:-translate-y-4"
            >
              <div className="flex flex-row justify-between w-full items-center">
                <div className="flex flex-col justify-between space-y-4 md:max-w-[80%] max-w-[70%]">
                  <h2 className="text-2xl uppercase py-2">
                    <div className="bg-primary flex flex-row items-center rounded-2xl py-2 px-4 text-background">
                      <div className="rounded-full flex justify-center items-center pb-1 bg-background text-text w-8 h-8">
                        {task.ID}
                      </div>
                      <p className="pl-2 break-words">{task.title}</p>
                    </div>
                  </h2>
                  <p className="text-xl text-text ml-2 break-words">
                    {task.description}
                  </p>
                </div>
                <div className="flex flex-col space-y-4 justify-center items-center">
                  <button
                    onClick={() => openModal("updateTask", task)}
                    className="flex bg-blue-500 text-text py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openModal("deleteTask", task)}
                    className="flex bg-red-400 text-text py-2 px-4 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="fixed inset-0 flex items-center justify-center">
            <h1 className="uppercase text-text text-[28px]">No tasks yet</h1>
          </div>
        )
      ) : (
        <div className="fixed inset-0 flex items-center justify-center">
          <h1 className="uppercase text-text text-[28px] text-center">
            log in to <span className="text-primary">CRUD</span>
            <br />
            your tasks
          </h1>
        </div>
      )}
      <TaskModalManager
        modalType={modalType}
        isOpen={!!modalType}
        closeModal={closeModal}
        handleTaskUpdate={handleTaskUpdate}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;
