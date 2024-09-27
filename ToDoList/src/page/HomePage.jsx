
import React, { useState } from 'react';
// import './TaskManagement.css'; // Add your custom styles here

function HomePage() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentTaskName, setCurrentTaskName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTaskId) {
      const updatedTasks = tasks.map(task => 
        task.id === currentTaskId ? { ...newTask, id: currentTaskId } : task
      );
      setTasks(updatedTasks);
      setCurrentTaskId(null);
    } else {
      const task = { id: tasks.length + 1, ...newTask };
      setTasks([...tasks, task]);
    }

    setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setIsDeleteConfirmOpen(false);
  };

  const openEditModal = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setNewTask(taskToEdit);
    setCurrentTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (taskId, action) => {
    if (action === 'edit') {
      openEditModal(taskId);
    } else if (action === 'delete') {
      const taskToDelete = tasks.find(task => task.id === taskId);
      setCurrentTaskName(taskToDelete.assignedTo);
      setCurrentTaskId(taskId);
      setIsDeleteConfirmOpen(true);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="../image/logo192.png" alt="logo" style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft:'90px' }} />
          <h1 style={{ margin: 0 }}>Task</h1> 
          
        </div>
        
        <div>
          <button style={{ fontSize: '16px', padding: '10px 20px' ,backgroundColor: '#f2e233' }} onClick={() => setIsModalOpen(true)}>New Task</button>
          
          <button style={{ fontSize: '16px', padding: '10px 20px', marginLeft: '10px' , backgroundColor: '#f2e233' }} onClick={handleRefresh}>Refresh</button>
          
          <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ textAlign: 'center', marginBottom: '10px', width: '45%', fontSize: '16px', padding: '10px', marginTop:'10px' }}
        />

        </div>
        
      </nav>
      
      <div style={{ flex: 1, overflowY: 'hidden', padding: '10px' }}>
       
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Assigned To</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Due Date</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Priority</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Comments</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}></th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.assignedTo}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.status}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.dueDate}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.priority}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.comments}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <select onChange={(e) => handleDropdownChange(task.id, e.target.value)} defaultValue="">
                    <option value="" disabled>Select Action</option>
                    <option value="edit" style={{ backgroundColor: '#f2e233'}}>Edit</option>
                    <option value="delete" style={{ backgroundColor: '#f2e233'}}>Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<footer style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <span style={{ marginLeft: '10px' }}>Total Pages: {totalPages}</span>
  <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
    <span style={{ margin: '0 10px' }}> Page {currentPage} of {totalPages} </span>
  </div>
</footer>


      {isModalOpen && (
        <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', textAlign: 'left' }}>
            <h2 style={{textAlign:'center'}}>{currentTaskId ? 'Edit Task' : 'New Task'}</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <table className='modal-table' style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <label>
                        Assigned To:
                        <input
                          type="text"
                          name="assignedTo"
                          value={newTask.assignedTo}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </td>
                    <td>
                      <label>
                        Status:
                        <select
                          name="status"
                          value={newTask.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        Due Date:
                        <input
                          type="date"
                          name="dueDate"
                          value={newTask.dueDate}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </td>
                    <td>
                      <label>
                        Priority:
                        <select
                          name="priority"
                          value={newTask.priority}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Priority</option>
                          <option value="Low">Low</option>
                          <option value="Normal">Normal</option>
                          <option value="High">High</option>
                        </select>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <label>
                        Comments:
                        <textarea
                          name="comments"
                          value={newTask.comments}
                          onChange={handleChange}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      
                      <button type="button" className='btn' onClick={() => setIsModalOpen(false)}>Cancle</button>
                      <button type="submit" className='btn'>{currentTaskId ? 'Save' : ' Save'}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', borderRadius: '5px', textAlign: 'center' }}>
            <h1 style={{alignItems: 'center', backgroundColor:'red'}}>Delete</h1>
            <p>Do you want to delete task "{currentTaskName}"?</p>
            <button className='btn' style={{backgroundColor: '#325402'}} onClick={() => setIsDeleteConfirmOpen(false)}>No</button>
            <button className='btn' style={{backgroundColor: '#f2e233'}} onClick={() => handleDelete(currentTaskId)}>Yes</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
