import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskModal({ task, onClose }) {
    // create the state variables
    // const { updateTask } = useContext(TaskContext);
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "")
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority || "Medium");
    const { addTask, updateTask } = useContext(TaskContext);

    // save button
    function handleSave() {
        const updatedTask = {
            ...task,
            title: title,
            description: description,
            status: status,
            priority: priority
        };
        if (!task.title && !task.description) {
            // New task
            addTask({ ...updatedTask, id: Date.now() });
        } else {
            // Existing task
            updateTask(task.id, updatedTask);
        }

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-2">{task.title} </h2>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title of Task</label>
                <input
                    type="text"
                    value={title}
                    onChange={function (e) { setTitle(e.target.value); }}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter Title of Task"
                />
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    rows="4"
                    value={description}
                    onChange={function (e) { setDescription(e.target.value); }}
                >
                </textarea>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                    className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                    value={status}
                    onChange={function (e) { setStatus(e.target.value); }}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option><option></option>
                </select>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Priority of Task</label>
                <select
                    value={priority}
                    onChange={function (e) { setPriority(e.target.value); }}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal