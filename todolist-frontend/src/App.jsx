// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './COMPONENTS/TaskList';
import TaskForm from './COMPONENTS/TaskForm';
import { serverUrl } from './Services/serverURL';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from JSON Server on initial load
  useEffect(() => {
    axios.get(`${serverUrl}/data`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Add a new task
  const addTask = (task) => {
    axios.post(`${serverUrl}/data`, task)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`${serverUrl}/data/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="app">
      <h1>TO DO LIST</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
