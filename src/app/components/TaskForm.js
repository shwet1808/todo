"use client";

import React from "react";

const TaskForm = ({
  onSubmit,
  task,
  desc,
  onTaskChange,
  onDescChange,
  error,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="text-2xl border-2 border-zinc-800 m-2 p-4"
        placeholder="Enter Task"
        value={task}
        onChange={onTaskChange}
        maxLength={50}
      />
      {error && <p className="text-red-500 text-xl ml-4">{error}</p>}

      <input
        type="text"
        className="text-2xl border-2 border-zinc-800 m-2 p-2"
        placeholder="Enter Description"
        value={desc}
        onChange={onDescChange}
        maxLength={100}
      />

      <button
        type="submit"
        className={`${
          isEditing ? "bg-green-500" : "bg-black"
        } text-white px-4 py-3 text-2xl font-bold rounded m-5`}
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
