import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();


function TaskProvider({ children }) {
    // const [tasks, setTasks] = useState([]);

    // storing the localstorage data
    const storedTasks = localStorage.getItem("tasks");
    const [tasks, setTasks] = useState(storedTasks ? JSON.parse(storedTasks) : []);

    // set local storage data
    useEffect(function () {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // adding the task
    function addTask(task) {
        setTasks(function (prevTasks) {
            return [...prevTasks, task];
        });
    }


    // update the task
    function updateTask(id, updatedTask) {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, ...updatedTask } : task
            )
        );
        console.log("Updating Task ID:", id, "New Data:", updatedTask);
    }


    // delete the task
    function deleteTask(id) {
        setTasks(function (prevTasks) {
            return prevTasks.filter(function (task) {
                return task.id !== id;
            });
        });
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskProvider };