import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const TodoWrapper = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("userData") && localStorage.getItem("apiData")) {
      props.setData(JSON.parse(localStorage.getItem("userData")));
      fetchTodo();
    } else {
      if (localStorage.getItem("userData")) {
        localStorage.setItem("apiData", JSON.stringify([]));
      } else if (localStorage.getItem("apiData")) {
        localStorage.setItem("userData", JSON.stringify([]));
      } else {
        localStorage.setItem("userData", JSON.stringify([]));
        localStorage.setItem("apiData", JSON.stringify([]));
      }
      fetchTodo();
    }
  }, [] );

  const fetchTodo = async () => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const presentUserData = JSON.parse(localStorage.getItem("userData"));
        const allData = presentUserData;
        const presentAPIData = JSON.parse(localStorage.getItem("apiData"));
        const fetchedAPIData = response.data;
        fetchedAPIData.map((element, i) => {
          presentAPIData.map((apiElement, j) => {
            apiElement.id === element.id && (fetchedAPIData[i] = apiElement);
          });
        });
        fetchedAPIData.map((element) => {
          allData.push(element);
        });

        props.setData(allData);
        localStorage.setItem("apiData", JSON.stringify(fetchedAPIData));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      title: todo,
      completed: false,
      isEditing: false,
    };
    // adding new todo to the state
    const newData = props.data;
    newData.unshift(newTodo);
    props.setData(newData);

    // adding new todo in the local storage
    const updatedUserData = JSON.parse(localStorage.getItem("userData"));
    updatedUserData.unshift(newTodo);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    // showing alert
    props.showAlert("Task has been added", "success");
  };

  const deleteTodo = (id) => {
    //deletign from state
    const updatedTodos = props.data.filter((todo) => todo.id !== id);
    props.setData(updatedTodos);
    // deleting from local storage user data
    const userData = JSON.parse(localStorage.getItem("userData"));
    const updatedUserData = userData.filter((todo) => todo.id !== id);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    // deleting from local storage api data
    const apiData = JSON.parse(localStorage.getItem("apiData"));
    const updatedAPIData = apiData.filter((todo) => todo.id !== id);
    localStorage.setItem("apiData", JSON.stringify(updatedAPIData));

    props.showAlert("Task has been deleted", "danger");
  };

  const toggleComplete = (id) => {
    const updatedTodos = props.data.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    props.setData(updatedTodos);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const updatedUserData = userData.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    const apiData = JSON.parse(localStorage.getItem("apiData"));
    const updatedAPIData = apiData.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem("apiData", JSON.stringify(updatedAPIData));

    props.showAlert("Task has been completed", "success");
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {loading && props.data.length === 0 ? (
        <h1>...loading</h1>
      ) : (
        props.data.map((todo) => {
          if (todo) {
            return (
              <Todo
                task={todo}
                key={todo?.id}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          }
        })
      )}
    </div>
  );
};
export default TodoWrapper;
