"use client";

import React, { useState } from "react";

const Body = () => {
  const [task, setTask] = useState("");                    // Stores & updates current task name being entered
  const [desc, setDesc] = useState("");                   // Stores & updates current description being entered
  const [maintask, setmainTask] = useState([]);           // Stores the array of all tasks
  const [editIndex, setEditIndex] = useState(null);      // Tracks which task is being edited (null means no edit)
  const [error, setError] = useState("");                // Stores error messages for form validation

  const deleteHandler = (i) => {
    let copytask = [...maintask]; // Create a copy of the tasks array
    copytask.splice(i, 1); // Remove the task at index i
    setmainTask(copytask); // Update state with the new array

    // If user is deleting the task being edited, reset the edit state ( didn't get that )
    if (editIndex === i) {
      setEditIndex(null);
      setTask("");
      setDesc("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate task isn't empty (task.trim removes spaces)
    if (!task.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    if (editIndex !== null) {
      // If editing an existing task
      const updatedTasks = [...maintask];
      updatedTasks[editIndex] = { task, desc }; // Update the task
      setmainTask(updatedTasks);
      setEditIndex(null); // Exit edit mode
    } else {
      // If adding a new task
      setmainTask([...maintask, { task, desc }]);
    }

    //used for clearing input and messege after uodate 
    setTask("");
    setDesc("");
    setError("");
  };

  let renderTask = <h2>No Task Added</h2>;

  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => (
      <li
        key={i}
        className="flex justify-between items-center border-b border-gray-300 py-1"
      >
        <div>
          <h5 className="text-xl font-semibold">{t.task}</h5>
          <p className="text-gray-600">{t.desc}</p>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => {
              setTask(t.task);
              setDesc(t.desc);
              setEditIndex(i);
              setError("");
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-2 border-zinc-800 m-2 p-4"
          placeholder=" Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          maxLength={50}
        />
        {error && <p className="text-red-500 text-xl ml-4">{error}</p>}

        <input
          type="text"
          className="text-2xl border-2 border-zinc-800 m-2 p-2"
          placeholder=" Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          maxLength={100}
        />

        <button
          type="submit"
          className={`${
            editIndex !== null ? "bg-green-500" : "bg-black"
          } text-white px-4 py-3 text-2xl font-bold rounded m-5`}
        >
          {editIndex !== null ? " Update Task" : " Add Task"}
        </button>
      </form>

      <hr />
      <div className="p-8 bg-slate-200 text-2xl">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Body;
