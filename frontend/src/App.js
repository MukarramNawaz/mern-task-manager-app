import React from 'react';
import TaskForm from './components/TaskForm';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export const URL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <div className="App"> 
    
      <div className='task-container'>

        <TaskForm/>

      </div>
    <ToastContainer/>

    </div>
  );
}

export default App;
