"use client";

import React, { useEffect, useState } from "react";

// type Todo = {
//   title: string;
//   description: string;
//   timestamp: number
// }

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    // // Add new todo to list
    const newTodo = {
      title: title,
      description: description,
      timestamp: Date.now(),
    };

    setTodos([newTodo, ...todos]);

    // Clear input fields
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <h1 className="bg-black text-white text-6xl m-0 p-3 text-center">
        Todo List
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-2xl border-2 border-zinc-800 m-2 p-4"
          placeholder=" Enter Task"
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
        />
        <p className="text-red-500 text-xl ml-4"></p>

        <input
          type="text"
          className="text-2xl border-2 border-zinc-800 m-2 p-2"
          placeholder=" Enter Description"
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
        />

        <button
          type="submit"
          className="text-white px-4 py-3 text-2xl font-bold rounded m-5 bg-green-500"
        >
          Add Task
        </button>
        <button
          type="reset"
          className="text-white px-4 py-3 text-2xl font-bold rounded m-5 bg-green-500"
        >
          Reset
        </button>
      </form>

      <hr />
      <div className="p-8 bg-slate-200 text-2xl">
        <ul>
          {todos.map((todo) => (
            <li key={todo.timestamp}>
              {todo.title}: {todo.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
