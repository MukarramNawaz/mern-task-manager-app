import React, { useEffect, useState } from "react";
import "../index.css";
import TaskInputField from "./TaskInputField";
import Task from "./Task";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loadingImage from "../assets/loader.gif";
const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [completedColor, setCompletedColor] = useState("grey");
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const { name } = formData;

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/task`);
      setTasks(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/task/${id}`);
      toast.success("Task deleted successfully");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Task cannot be empty");
    }

    try {
      await axios.post(`${URL}/api/task`, formData);
      toast.success("Task added successfully");
      setFormData({ ...setFormData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const singleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false,
    });

    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    if (!isEditing) {
      toast.error("Please create a task first");
    } else {
      e.preventDefault();
      try {
        await axios.patch(`${URL}/api/task/${taskID}`, formData);
        toast.success("Task updated successfully");
        setFormData({ ...setFormData, name: "" });
        setIsEditing(false);
        getTasks();
      } catch (error) {}
    }
  };

  const isCompleted = async (task) => {
    if (!task.completed) {
      task.completed = true;

      try {
        await axios.patch(`${URL}/api/task/${task._id}`, task);
        toast.success("Task marked completed successfully");
        setCompletedColor("green");
        getTasks();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      task.completed = false;

      try {
        await axios.patch(`${URL}/api/task/${task._id}`, task);
        toast.success("Task updated successfully");
        setCompletedColor("grey");
        getTasks();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // const getCompletedTask = () => {

  //     try {
  //         axios.get(`${URL}/api/task/completed`)
  //         getTasks()
  //     } catch (error) {
  //         toast.error(error.message)
  //     }
  // }
  useEffect(() => {
    getTasks();
  }, []);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="task-container">
      <h2>Task Manager</h2>
      <TaskInputField
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {/* getCompletedTask={getCompletedTask} */}

      {
        tasks.length > 0 && (
          <div className="--flex-between --pb">
        <p>
          <b> Total Tasks: </b>{tasks.length}
        </p>

        <p>
          <b> Completed Tasks: </b>{tasks.filter((task) => task.completed).length}
        </p>
      </div>
        )
      }
      
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImage} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No tasks found</p>
      ) : (
        <>
          {tasks.map((task, index) => {
             
            return (
           
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                singleTask={singleTask}
                isCompleted={isCompleted}
                completedColor={completedColor}
              />
              
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskForm;
