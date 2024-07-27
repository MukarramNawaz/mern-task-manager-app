import React from 'react'
import '../index.css';
import {FaEdit, FaCheckDouble, FaTrashAlt} from 'react-icons/fa';
const Task = ({task, index, deleteTask, singleTask, isCompleted}) => {
  return (
    <div className={task.completed ? 'task completed' : 'task'}>
      <p>
        <b>
            {`${index + 1}. ${task.name}` }
        </b>
      
      </p>
      <div className='task-icons'> 
        <FaCheckDouble color='green' onClick={() => isCompleted(task)}/>
        <FaEdit color='blue' onClick={() => singleTask(task)}/>
        <FaTrashAlt color='red'onClick={() => deleteTask(task._id)}/>

      </div>
    </div>
  )
}

export default Task
