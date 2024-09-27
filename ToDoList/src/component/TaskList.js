// src/components/TaskList.js
import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import './TaskList.css'; // Import the CSS file

const TaskList = () => {  
  const [tasks, setTasks] = useState([
    {
      "id": 2,
      "assignedTo": "John Dom",
      "status": "In Progress",
      "dueDate": "2024-09-27",
      "priority": "High",
      "comments": "Complete it on time."
    },
    {
      "id": 3,
      "assignedTo": "Andy Orten",
      "status": "Completed",
      "dueDate": "2024-10-27",
      "priority": "Low",
      "comments": "u can do it"
    }
  ]);  
  const [searchQuery, setSearchQuery] = useState('');  
  
  useEffect(() => {  
    axios.get('/api/tasks')  
      .then(response => {  
        setTasks(response.data);  
      })  
      .catch(error => {  
        console.error(error);  
      });  
  }, []);  
  
  const handleSearch = (event) => {  
    setSearchQuery(event.target.value);  
  };  
  
  const filteredTasks = tasks.filter(task => 
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||  
    task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||  
    task.dueDate.toLowerCase().includes(searchQuery.toLowerCase()) ||  
    task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||  
    task.comments.toLowerCase().includes(searchQuery.toLowerCase())
  );  
  
  return (  
    <div className="table-container">    
      <table>  
        <thead>  
          <tr>  
            <th>Assigned To</th>  
            <th>Status</th>  
            <th>Due Date</th>  
            <th>Priority</th>  
            <th>Comments</th>  
         
          </tr>  
        </thead>  
        <tbody>  
          {filteredTasks.map(task => (  
            <tr key={task.id}>  
              <td>{task.assignedTo}</td>  
              <td>{task.status}</td>  
              <td>{task.dueDate}</td>  
              <td>{task.priority}</td>  
              <td>{task.comments}</td>  
              <td className="actions">  
                <select name="" id="">
                  <option value=""></option>
                  <option value="Edit">Edit</option>
                  <option value="Delete">Delete</option>
                  </select>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
};  
  
export default TaskList;  
