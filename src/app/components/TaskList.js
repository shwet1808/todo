"use client";

import React from "react";

const TaskList = ({ maintask, editHandler, deleteHandler }) => {
  return (
    <div className="p-8 bg-slate-200 text-2xl">
      {maintask.length === 0 ? (
        <h2>No Task Added</h2>
      ) : (
        <ul>
          {maintask.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b border-gray-300 py-1"
            >
              <div>
                <h5 className="text-xl font-semibold">{task.task}</h5>
                <p className="text-gray-600">{task.desc}</p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => editHandler(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteHandler(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
