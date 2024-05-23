import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import ToolPanel from "./components/Panel";
import "./css/App.css";
import { useState } from "react";

const App: React.FC = () => {
  const [isTaskUpdated, setIsTaskUpdated] = useState(false);

  const handleTaskUpdate = () => {
    setIsTaskUpdated((prev) => !prev); // Toggle the state to trigger useEffect
  };

  return (
    <div className="bg-background fixed h-screen w-full font-Manrope">
      <Navbar />
      <ToolPanel handleTaskUpdate={handleTaskUpdate} />
      <TaskList
        isTaskUpdated={isTaskUpdated}
        handleTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default App;
