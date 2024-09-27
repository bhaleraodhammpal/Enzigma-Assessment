import React, { useState } from 'react';
import TaskForm from './TaskForm';//import taskform

const ParentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log('New Task:', newTask); // For debugging
  };

  return (
    <div>
      <button onClick={handleOpen}>Add Task</button>
      <TaskForm isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
      
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.assignedTo} - {task.status} - {task.dueDate} - {task.priority}
            <p>{task.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;
