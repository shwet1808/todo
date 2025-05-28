"use client";

import React, { useState } from "react";

const Page = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [maintask, setmainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // 👈 new state for editing

  const deleteHandler = (i) => {
    let copytask = [...maintask];
    copytask.splice(i, 1);
    setmainTask(copytask);

    // If you're deleting the item being edited, reset the form
    if (editIndex === i) {
      setEditIndex(null);
      setTask("");
      setDesc("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // 👈 if editing, update the task
      const updatedTasks = [...maintask];
      updatedTasks[editIndex] = { task, desc };
      setmainTask(updatedTasks);
      setEditIndex(null); // exit edit mode
    } else {
      // 👈 otherwise, add a new task
      setmainTask([...maintask, { task, desc }]);
    }

    setTask("");
    setDesc("");
    console.log(maintask);
  };

  // console.log("Task:", task);
  // console.log("Description:", desc);

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
              setEditIndex(i); // enter edit mode
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
      <h1 className="bg-black text-white text-6xl m-0 p-3 text-center">
        Todo List
      </h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-2 border-zinc-800 m-2 p-4"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          maxLength={50}
        />

        <input
          type="text"
          className="text-2xl border-2 border-zinc-800 m-2 p-4"
          placeholder="Enter Description"
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
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      <hr />
      <div className="p-8 bg-slate-200 text-2xl">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
