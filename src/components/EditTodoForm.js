import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditTodoForm = ({ editTask }) => {
  const [task, setTask] = useState({});
  const searchParam = useParams();
  const id = searchParam.id;
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const apiData = JSON.parse(localStorage.getItem("apiData"));
    userData.unshift(...apiData);

    setTask(userData?.filter((item) => String(item.id) === id)[0]);
  }, []);
  
  useEffect(() => {
    if(task){
      setValue(task.title)
    }
  }, [task]);

  const [value, setValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    // edit todo
    editTask(value, task.id);
    navigate("/")
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        maxLength={100}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
