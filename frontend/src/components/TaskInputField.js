import React from "react";
import "../index.css";
const TaskInputField = ({
  createTask,
  name,
  handleInputChange,
  isEditing,
  updateTask
}) => {
  return (
    <div>
      <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
        <input
          type="text"
          placeholder="Add a Task"
          name="name"
          value={name}
          onChange={handleInputChange}
        />

        <button type="submit">
          {`${
          isEditing ? "Edit Task" : "Add Task"
          }`}
        </button>
      </form>
    </div>
  );
};

export default TaskInputField;
