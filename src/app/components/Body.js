"use client";

import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList"; 

const Body = () => {
  const [task, setTask] = useState(""); // task update
  const [desc, setDesc] = useState(""); // desc update
  const [maintask, setmainTask] = useState([]); // Stores the array of all tasks
  const [editIndex, setEditIndex] = useState(null); // Tracks which task is being edited (null means no edit)
  const [error, setError] = useState(""); // Stores error messages for form validation

  // Function to handle task deletion
  const deleteHandler = (i) => {
    let copytask = [...maintask]; // Create a copy of the main task array
    copytask.splice(i, 1); // Remove the task at index i
    setmainTask(copytask); // Update the main task list

    // If the deleted task was being edited, reset edit state (did not understand)
    if (editIndex === i) {
      setEditIndex(null);
      setTask("");
      setDesc("");
    }
  };

  // Function to handle form submission (both add and edit)
  const submitHandler = (e) => {
    e.preventDefault();

    // Validate that task name isn't empty (trim is used to remove spaces )
    if (!task.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    // If in edit mode (editIndex is not null)
    if (editIndex !== null) {
      const updatedTasks = [...maintask]; // Create a copy of the tasks array
      updatedTasks[editIndex] = { task, desc }; // Update the task at editIndex with new values
      setmainTask(updatedTasks); // Update the main task list
      setEditIndex(null); // Exit edit mode
    } else {
      // If not in edit mode, add a new task to the list
      setmainTask([...maintask, { task, desc }]);
    }

    // Reset form fields and error state
    setTask("");
    setDesc("");
    setError("");
  };

  // Function to handle editing a task
  const editHandler = (index) => {
    // Get the task to edit from the main list
    const taskToEdit = maintask[index];
    // Set form fields with the task's current values
    setTask(taskToEdit.task);
    setDesc(taskToEdit.desc);
    // Set the edit index to this task's index
    setEditIndex(index);
    // Clear any previous errors
    setError("");
  };

  return (
    <>
      <TaskForm
        onSubmit={submitHandler}
        task={task}
        desc={desc}
        onTaskChange={(e) => setTask(e.target.value)}
        onDescChange={(e) => setDesc(e.target.value)}
        error={error}
        isEditing={editIndex !== null}
      />

      <hr />

      <TaskList
        maintask={maintask}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default Body;
