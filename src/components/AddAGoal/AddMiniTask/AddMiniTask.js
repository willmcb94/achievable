import React, { useState } from 'react';

export default function AddMiniTask({ miniTasks, setMiniTasks }) {
  const [newTask, setNewTask] = useState('');
  // const [taskThreshold, setTaskThreshold] = useState('true');

  // if (miniTasks.length >= 5) {
  //   setTaskThreshold('false');
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (miniTasks) {
      setMiniTasks([...miniTasks, newTask]);
    } else {
      setMiniTasks([newTask]);
    }
  };
  return (
    <div>
      {miniTasks ? (
        <ul>
          {miniTasks.map((task, index) => {
            return <li key={index}>{task}</li>;
          })}
        </ul>
      ) : null}
      <label>
        Add any task which will help you achieve your goal below - (up to 5)
      </label>
      <textarea
        name="task"
        onChange={(e) => setNewTask(e.target.value)}
      ></textarea>
      <button
        // disable={taskThreshold}
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </div>
  );
}
