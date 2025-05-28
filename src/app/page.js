"use client";

import React, { useState } from "react";

const Page = () => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [maintask, setmainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // 👈 editing state
  const [error, setError] = useState(""); // 👈 error message state

  const deleteHandler = (i) => {
    let copytask = [...maintask];
    copytask.splice(i, 1);
    setmainTask(copytask);

    if (editIndex === i) {
      setEditIndex(null);
      setTask("");
      setDesc("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...maintask];
      updatedTasks[editIndex] = { task, desc };
      setmainTask(updatedTasks);
      setEditIndex(null);
    } else {
      setmainTask([...maintask, { task, desc }]);
    }

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
      <h1 className="bg-black text-white text-6xl m-0 p-3 text-center">
        Todo List
      </h1>

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

export default Page;
