import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
  const navigate = useNavigate();
  return (
    <div className="Todo container">
        <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.title}</p>
        <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/edit/${task.id}`)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
        </div>
    </div>
  )
}
