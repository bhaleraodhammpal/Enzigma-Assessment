import axios from 'axios';  
  
const TaskService = {  
  getTasks: async () => {  
   try {  
    const response = await axios.get('/api/tasks');  
    return response.data;  
   } catch (error) {  
    console.error(error);  
   }  
  },  
  
  createTask: async (newTask) => {  
   try {  
    const response = await axios.post('/api/tasks', newTask);  
    return response.data;  
   } catch (error) {  
    console.error(error);  
   }  
  },  
  
  updateTask: async (taskId, updatedTask) => {  
   try {  
    const response = await axios.put(`/api/tasks/${taskId}`, updatedTask);  
    return response.data;  
   } catch (error) {  
    console.error(error);  
   }  
  },  
  
  deleteTask: async (taskId) => {  
   try {  
    const response = await axios.delete(`/api/tasks/${taskId}`);  
    return response.data;  
   } catch (error) {  
    console.error(error);  
   }  
  }  
};  
  
export default TaskService;
