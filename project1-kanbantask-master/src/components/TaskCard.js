import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useDraggable } from "@dnd-kit/core";
import TaskModal from "./TaskModal";



function TaskCard({ task }) {
    //creating state variables
    const { deleteTask } = useContext(TaskContext);
    const [showModal, setShowModal] = useState(false);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable(
        {
            id: String(task.id),
            // activationConstraint: {
            //     distance: 8, // Only start dragging if user moves mouse by 5px
            // },
        });


    // style for drag and drop
    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.5 : 1,
    };

    // function for edit button
    function handleEditClick(e) {
        e.stopPropagation(); // prevent drag trigger
        setShowModal(true);
    }

    //delete function
    function handleDeleteClick(e) {
        e.stopPropagation(); // prevent drag trigger
        deleteTask(task.id);
    }

    // Priority Badge UI
  function getPriorityBadge(priority) {
    switch (priority) {
      case "High":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ">
            🔥 High
          </span>
        );
      case "Medium":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            ⚠️ Medium
          </span>
        );
      case "Low":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            🟢 Low
          </span>
        );
      default:
        return null;
    }
  }


    return (
        <>
            <div

                style={style}
                className="bg-blue-100 p-3 rounded-lg shadow mb-2 transition-all"
            >

                {/* Drag Handle */}
                <div
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    className="cursor-grab active:cursor-grabbing mb-2 text-right text-gray-500 text-sm"
                >
                    <i className="fa-solid fa-grip-lines" />
                </div>


                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                {getPriorityBadge(task.priority)}

                <div className="flex items-center justify-end space-x-2 mt-2">
                    <button
                        onClick={handleEditClick}
                        className="text-blue-600 text-xs m-2 size-2xl"
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="text-red-500 text-xs"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            {showModal && (
                <TaskModal task={task} onClose={function () { setShowModal(false) }} />
            )}
        </>
    )
}

export default TaskCard;