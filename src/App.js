import "./App.css";
import TodoWrapper from "./components/TodoWrapper";
import NavigationBar from "./components/Navbar";
import Alert from "./components/Alert";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { EditTodoForm } from "./components/EditTodoForm";

const App = () => {
  const [alert, setAlert] = useState(null);
  const [data, setData] = useState([]);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  const editTask = (title, id) => {
    const editedTodos = data.map((todo) =>
      todo.id === id ? { ...todo, title, isEditing: !todo.isEditing } : todo
    );
    setData(editedTodos);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const updatedUserData = userData.map((todo) =>
      todo.id === id ? { ...todo, title, isEditing: !todo.isEditing } : todo
    );
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    const apiData = JSON.parse(localStorage.getItem("apiData"));
    const updatedAPIData = apiData.map((todo) =>
      todo.id === id ? { ...todo, title, isEditing: !todo.isEditing } : todo
    );
    localStorage.setItem("apiData", JSON.stringify(updatedAPIData));
    showAlert("Task has been edited", "success");
  };

  return (
    <>
      <NavigationBar data={data} setData={setData} />
      <Alert alert={alert} />
      <Routes>
        <Route
          path="/"
          element={
            <TodoWrapper showAlert={showAlert} data={data} setData={setData} />
          }
        />     
        <Route
          path="/edit/:id"
          element={
            <EditTodoForm editTask={editTask} />
          }
        />

      </Routes>
    </>
  );
};

export default App;
