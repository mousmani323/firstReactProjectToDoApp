import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = ({ data, setData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);

  const handleChange = (searchValue) => {
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    const localApiData = JSON.parse(localStorage.getItem("apiData"));
    for (let i = 0; i < localApiData.length; i++) {
      const element = localApiData[i];
      localStorageData.push(element);
    }
    const newData = localStorageData.map((todo) => {
      if (todo?.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return todo;
      } else {
        return null;
      }
    });
    if (searchValue === "") {
      setData(localStorageData);
    } else {
      setData(newData);
    }
    console.log(newData);
  };
  const handleCompleted = () => {
    setFilterApplied(!filterApplied)
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    const localApiData = JSON.parse(localStorage.getItem("apiData"));
    for (let i = 0; i < localApiData.length; i++) {
      const element = localApiData[i];
      localStorageData.push(element);
    }
    const newData = localStorageData.map((todo) => {
      if (todo?.completed) {
        return todo;
      } else {
        return null;
      }
    });

    if (filterApplied) {
      setData(localStorageData);
    } else {
      setData(newData);
    }

    console.log(newData);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            TO-DO App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchValue}
              onChange={(e) => {
                handleChange(e.target.value);
                setSearchValue(e.target.value);
              }}
            />
            <Button variant="secondary" onClick={handleCompleted}>
              {filterApplied ? "AllTasks" : "completed"}
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
