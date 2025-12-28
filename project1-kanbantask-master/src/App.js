import Header from "./components/Header";
import { TaskProvider, TaskContext } from "./context/TaskContext";
import TaskColumn from "./components/TaskColumn";
import { useState, useContext } from "react";
import TaskModal from "./components/TaskModal";
import { PointerSensor, useSensors, useSensor, DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";


function InnerApp() {
  const [showModal, setShowModal] = useState(false);
  const { tasks, updateTask } = useContext(TaskContext);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragStart(event) {
    const { active } = event;
    const task = tasks.find((t) => String(t.id) === active.id);
    if (task) {
      setActiveTask(task);
    }
  }


  function handleDragEnd(event) {
    const { active, over } = event;
    console.log("Dropped over:", over?.id);
    setActiveTask(null);
   if (over && active.id !== over.id) {
    const taskId = Number(active.id);
    updateTask(taskId, { status: over.id });
  }

    const draggedTask = tasks.find((t) => String(t.id) === active.id);
    if (!draggedTask || draggedTask.status === over.id) return;

    // Update task with new column (status)
    updateTask(active.id, { ...draggedTask, status: over.id });
    console.log(`Moved ${active.id} to ${over.id}`);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <Header onCreateClick={() => setShowModal(true)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 m-4 overflow:hidden">
          <TaskColumn status="To Do" />
          <TaskColumn status="In Progress" />
          <TaskColumn status="Done" />
        </div>
        {showModal && (
          <TaskModal
            task={{
              id: Date.now(),
              title: "",
              description: "",
              status: "To Do",
              priority: "Medium",
            }}
            onClose={() => setShowModal(false)}
          />
        )}
        {/* Drag Preview */}
        <DragOverlay>
          {activeTask && (
            <div className="bg-white border p-4 rounded shadow w-64">
              <h4 className="font-bold">{activeTask.title}</h4>
              <p className="text-sm">{activeTask.description}</p>
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  )
}


function App() {
  return (
    <TaskProvider>
      <InnerApp />
    </TaskProvider>
  );

}

export default App