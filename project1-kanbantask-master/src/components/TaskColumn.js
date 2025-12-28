import { useContext } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../context/TaskContext";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


function getStatusTitle(status) {
  switch (status) {
    case "To Do":
      return (
        <span className="flex items-center gap-2 text-blue-600 text-lg font-semibold ">
          <i className="fa-regular fa-square"></i> To Do
        </span>
      );
    case "In Progress":
      return (
        <span className="flex items-center gap-2 text-yellow-500 text-lg font-semibold">
          <i className="fa-solid fa-spinner animate-spin"></i> In Progress
        </span>
      );
    case "Done":
      return (
        <span className="flex items-center gap-2 text-green-600 text-lg font-semibold">
          <i className="fa-solid fa-check"></i> Done
        </span>
      );
    default:
      return status;
  }
}

function TaskColumn({ status }) {
  const { tasks } = useContext(TaskContext);
  const { setNodeRef, isOver } = useDroppable({ id: status });
  console.log(status, "isOver:", isOver);

  const filteredTasks = tasks.filter((task) => task.status === status);
  console.log("Rendering column:", status, "with tasks:", filteredTasks);

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          cardBorder: "border-t-4 border-blue-400",
        };
      case "In Progress":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          cardBorder: "border-t-4 border-yellow-400",
        };
      case "Done":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          cardBorder: "border-t-4 border-green-400",
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-200",
          cardBorder: "border-t-4 border-gray-300",
        };
    }
  };

  const statusColors = getStatusColor(status);


  return (
    <SortableContext
      items={filteredTasks.map((task) => String(task.id))}
      strategy={verticalListSortingStrategy}
    >

      <div ref={setNodeRef}
        className={`flex flex-col p-5 rounded-2xl
         shadow-md border ${statusColors.bg} ${statusColors.border} w-full max-w-sm mx-auto transition-all duration-300`}>
        <div className="flex justify-between items-center mb-4">
          <h2>{getStatusTitle(status)}</h2>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 pr-2">

          {filteredTasks.map((task) => (
            <div className={`rounded-xl shadow-sm p-2 ${statusColors.cardBorder}`}
              key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
      </div>
    </div>
    </SortableContext>
  );
}

export default TaskColumn;
