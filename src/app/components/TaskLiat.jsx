"use client";

import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      {tasks.map((t, index) => (
        <div key={index} className="border-2 border-zinc-800 p-4 m-2">
          <h2 className="text-2xl font-bold">{t.task}</h2>
          <p className="text-lg">{t.desc}</p>
          <div className="mt-2">
            <button
              className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
              onClick={() => onEdit(index)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
