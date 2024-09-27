
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';

const TaskForm = ({ isOpen, onClose, onSubmit }) => {
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [comments, setComments] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      assignedTo,
      status,
      dueDate,
      priority,
      comments,
    };

    onSubmit(newTask); // Pass the new task object to the onSubmit function
    onClose(); // Close the modal after submission

    // Clear the form
    setAssignedTo('');
    setStatus('');
    setDueDate('');
    setPriority('');
    setComments('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          />
          <textarea
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

TaskForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskForm;
